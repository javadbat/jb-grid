import React, { type ReactElement, type ReactNode, useEffect, useRef } from 'react';
import type { JBGridI18nConfig } from './types.js';
export type ContentProps = {
    children:React.ReactNode | React.ReactNode[],
    refreshBtnClick:()=>void,
    isErrorOccurred:boolean,
    isLoading:boolean,
    i18n?:JBGridI18nConfig | null,
    errorComponent?:ReactNode,
    tableHeader?:ReactNode,
}
function Content(props:ContentProps) {
  const {refreshBtnClick,isErrorOccurred,isLoading,i18n} = props;
  const errorElement = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const element = errorElement.current;
    if (!element) {
      return;
    }
    element.addEventListener("refresh", refreshBtnClick);
    return () => element.removeEventListener("refresh", refreshBtnClick);
  }, [refreshBtnClick]);
  const ErrorComponent = props.errorComponent || (
    <jb-grid-error
      ref={errorElement}
      title={i18n?.messages?.serverErrorTitle}
      message={i18n?.messages?.serverErrorText}
      refresh-button-title={i18n?.messages?.serverErrorRefreshButtonTitle}
    ></jb-grid-error>
  );

  const tableHeader = React.isValidElement(props.tableHeader)
    ? React.cloneElement(props.tableHeader as ReactElement<{slot?: string}>, { slot: "table-header" })
    : props.tableHeader
      ? <div slot="table-header">{props.tableHeader}</div>
      : null;

  return (
    <>
      {!isErrorOccurred && tableHeader}
      {!isErrorOccurred && <div slot="body-content" className="table-content-wrapper">{props.children}</div>}
      {isErrorOccurred && <div slot="body-error">{ErrorComponent}</div>}
      {isLoading && <jb-grid-loading slot="body-loading"></jb-grid-loading>}
    </>
  );
}

export default Content;
