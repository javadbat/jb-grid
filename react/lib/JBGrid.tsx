import React, { type ReactNode, useEffect, useReducer } from 'react';
import JBGridViewModel, { JBGridContext } from './JBGridViewModel.js';
import CSS from './jb-grid.css';
import BlobCSS from './Components/blob-loading.css';
export { JBGridData } from './JBGridData.js';
import 'jb-searchbar';
import type { AnyObject, JBGridBridgeClassInterface, JBGridConfig, JBGridI18nConfig, JBGridRenderContext, JBGridRowData, SearchbarConfig } from './types.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Content from './Content.js';
import { useInstance } from 'jb-core/react';
import { injectCss } from 'jb-core';

export {JBPagination, type Props as PaginationProps} from './Components/Pagination.js';
export * from './Components/Row.js';
export * from './Components/Cell.js';
export * from './Components/ExpandRow.js';
export * from './Components/ExpandToggle.js';
export * from './types.js';
export type Props<T extends AnyObject> = {
  searchbarConfig?: SearchbarConfig | null | undefined,
  config: JBGridConfig<T>,
  bridge: JBGridBridgeClassInterface,
  isFullscreen?: boolean,
  className?: string,
  style?: React.CSSProperties,
  onFullscreenChange?: (isFullscreen: boolean) => void,
  title: string,
  i18n?: JBGridI18nConfig | null | undefined,
  contentError?: ReactNode,
  headerEndComponents?: ReactNode[] | ReactNode,
  children?: React.ReactNode | React.ReactNode[] | ((data: JBGridRowData<T>[], context: JBGridRenderContext) => React.ReactNode | React.ReactNode[])
}

injectCss(CSS as unknown as string);
injectCss(BlobCSS as unknown as string);

function JBGridComponent<T extends AnyObject>(props: Props<T>) {
  const [, forceUpdate] = useReducer((version: number) => version + 1, 0);
  const vm = useInstance(JBGridViewModel<AnyObject>, [props.onFullscreenChange, props.config, props.bridge, forceUpdate]);
  useEffect(() => {
    vm.setStateChangeCallback(forceUpdate);
    return () => {
      vm.setStateChangeCallback(undefined);
    };
  }, [vm, forceUpdate]);

  useEffect(() => {
    vm.onComponentDidMount(props.searchbarConfig || null);
  }, []);

  useEffect(() => {
    if(props.i18n){
      vm.setI18n(props.i18n);
    }
  }, [props.i18n]);

  useEffect(() => {
    if (props.isFullscreen !== null && props.isFullscreen !== undefined) {
      vm.onFullscreenChanged(props.isFullscreen);
    }
  }, [props.isFullscreen]);
  if (!vm.config) {
    return (<></>);
  }
  const renderContext: JBGridRenderContext = {
    refreshView: () => vm.notifyStateChange()
  };
  const contentChildren = typeof props.children === "function" ? props.children(vm.config.data.data as JBGridRowData<T>[], renderContext) : props.children;
  return (
    <JBGridContext.Provider value={vm} key={"jb-grid-context"}>
      <div className={`jb-grid-wrapper ${props.className ?? ""}`} ref={vm.JBGridComponentDom} style={props.style}>
        <Header title={props.title} vm={vm} searchbarConfig={props.searchbarConfig} headerEndComponents={props.headerEndComponents}></Header>
        <Content i18n={vm.i18n} config={vm.config} isErrorOccurred={vm.isErrorOccurred} isLoading={vm.isLoading} refreshBtnClick={vm.refreshBtnClick} setSortColumn={vm.setSortColumn} styles={vm.styles} errorComponent={props.contentError}>{contentChildren}</Content>
        <Footer isFullscreen={props.isFullscreen ?? false} vm={vm}></Footer>
      </div>
    </JBGridContext.Provider>
  );
}

export const JBGrid = JBGridComponent;
