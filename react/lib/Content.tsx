import React, { type ReactNode } from 'react';
import JBLoading from './Components/JBLoading.js';
import type { JBGridI18nConfig } from './types.js';
import ContentError from './Components/content-error/ContentError.js';
export type ContentProps = {
    children:React.ReactNode | React.ReactNode[],
    refreshBtnClick:()=>void,
    isErrorOccurred:boolean,
    isLoading:boolean,
    i18n:JBGridI18nConfig,
    errorComponent?:ReactNode,
    tableHeader?:ReactNode,
}
function Content(props:ContentProps) {
  const {refreshBtnClick,isErrorOccurred,isLoading,i18n} = props;
  const ErrorComponent = props.errorComponent || <ContentError onRefreshBtnClick={refreshBtnClick} message={i18n.messages?.serverErrorText} title={i18n.messages?.serverErrorTitle} refreshButtonTitle={i18n.messages!.serverErrorRefreshButtonTitle}></ContentError>;

  return (
    <section key={'jb-grid-content'} className={`jb-grid-content ${props.tableHeader ? "" : "without-table-header"}`}>
      {
        isErrorOccurred && 
                ErrorComponent
      }
      {
        !isErrorOccurred &&
                [
                  props.tableHeader && <section className="table-header" key='table-header'>{props.tableHeader}</section>
                  ,
                  <section className="table-content" key='table-content'>
                    <div className="table-content-wrapper">
                      {props.children}
                    </div>
                  </section>
                ]

      }

      {
        isLoading ? (
          <section className="loading">
            <div className="loading-content">
              <JBLoading></JBLoading>
            </div>
          </section>
        )
          : ''
      }
    </section>
  );
}

export default Content;
