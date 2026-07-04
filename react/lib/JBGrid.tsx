import React, { type ReactNode, useEffect, useReducer } from 'react';
import JBGridViewModel, { JBGridContext } from './JBGridViewModel.js';
import CSS from './jb-grid.css?inline';
import VariablesCSS from './variables.css?inline';
import BlobCSS from './Components/blob-loading.css?inline';
import type { AnyObject, JBGridCallbacks, JBGridI18nConfig, JBGridRenderContext, JBGridRowData } from './types.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Content from './Content.js';
import { useInstance } from 'jb-core/react';
import { injectCss } from 'jb-core';

export {JBPagination, type Props as PaginationProps} from './Components/Pagination.js';
export * from './Components/PaginationInfo.js';
export * from './Components/RefreshIcon.js';
export * from './Components/FullscreenIcon.js';
export * from './Components/Row.js';
export * from './Components/TableHeader.js';
export * from './Components/ColumnHeader.js';
export * from './Components/Cell.js';
export * from './Components/ExpandRow.js';
export * from './Components/ExpandToggle.js';
export * from './types.js';
export type Props<T extends AnyObject> = {
  searchbarComponent?: ReactNode,
  tableHeader?: ReactNode,
  data: JBGridRowData<T>[],
  pageIndex: number,
  pageSize: number,
  totalItemsCount: number,
  totalPages?: number,
  startItemIndex?: number,
  endItemIndex?: number,
  isLoading?: boolean,
  isErrorOccurred?: boolean,
  isFullscreen?: boolean,
  className?: string,
  style?: React.CSSProperties,
  onFullscreen?: JBGridCallbacks["onFullscreen"],
  onPageIndexChange?: JBGridCallbacks["onPageIndexChange"],
  onPageSizeChange?: JBGridCallbacks["onPageSizeChange"],
  onRefresh?: JBGridCallbacks["onRefresh"],
  onExitFullscreen?: JBGridCallbacks["onExitFullscreen"],
  /**
   * @deprecated use onFullscreen and onExitFullscreen instead
   */
  onFullscreenChange?: JBGridCallbacks["onFullscreenChange"],
  title: string,
  i18n?: JBGridI18nConfig | null | undefined,
  contentError?: ReactNode,
  headerEndComponents?: ReactNode[] | ReactNode,
  children?: React.ReactNode | React.ReactNode[] | ((data: JBGridRowData<T>[], context: JBGridRenderContext) => React.ReactNode | React.ReactNode[])
}

injectCss(VariablesCSS as unknown as string);
injectCss(CSS as unknown as string);
injectCss(BlobCSS as unknown as string);

function JBGridComponent<T extends AnyObject>(props: Props<T>) {
  const [, forceUpdate] = useReducer((version: number) => version + 1, 0);
  const vm = useInstance(JBGridViewModel, [{
    onFullscreen: props.onFullscreen,
    onPageIndexChange: props.onPageIndexChange,
    onPageSizeChange: props.onPageSizeChange,
    onRefresh: props.onRefresh,
    onExitFullscreen: props.onExitFullscreen,
    onFullscreenChange: props.onFullscreenChange
  }, forceUpdate]);

  const totalPages = props.totalPages ?? Math.max(1, Math.ceil(props.totalItemsCount / props.pageSize));
  const startItemIndex = props.startItemIndex ?? ((props.pageIndex - 1) * props.pageSize) + (props.data.length > 0 ? 1 : 0);
  const endItemIndex = props.endItemIndex ?? ((props.pageIndex - 1) * props.pageSize) + props.data.length;

  vm.setGridState({
    pageIndex: props.pageIndex,
    pageSize: props.pageSize,
    totalPages,
    metaData: {
      startItemIndex,
      endItemIndex,
      totalItemsCount: props.totalItemsCount
    }
  });

  useEffect(() => {
    vm.setCallbacks({
      onFullscreen: props.onFullscreen,
      onPageIndexChange: props.onPageIndexChange,
      onPageSizeChange: props.onPageSizeChange,
      onRefresh: props.onRefresh,
      onExitFullscreen: props.onExitFullscreen,
      onFullscreenChange: props.onFullscreenChange
    });
  }, [vm, props.onFullscreen, props.onPageIndexChange, props.onPageSizeChange, props.onRefresh, props.onExitFullscreen, props.onFullscreenChange]);

  useEffect(() => {
    vm.setStateChangeCallback(forceUpdate);
    return () => {
      vm.setStateChangeCallback(undefined);
    };
  }, [vm, forceUpdate]);

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
  const renderContext: JBGridRenderContext = {
    refreshView: () => vm.notifyStateChange()
  };
  const contentChildren = typeof props.children === "function" ? props.children(props.data, renderContext) : props.children;
  return (
    <JBGridContext.Provider value={vm} key={"jb-grid-context"}>
      <div className={`jb-grid-wrapper ${props.className ?? ""}`} ref={vm.JBGridComponentDom} style={props.style}>
        <Header title={props.title} vm={vm} searchbarComponent={props.searchbarComponent} headerEndComponents={props.headerEndComponents}></Header>
        <Content i18n={vm.i18n} tableHeader={props.tableHeader} isErrorOccurred={props.isErrorOccurred ?? false} isLoading={props.isLoading ?? false} refreshBtnClick={vm.refreshBtnClick} errorComponent={props.contentError}>{contentChildren}</Content>
        <Footer isFullscreen={props.isFullscreen ?? false} vm={vm}></Footer>
      </div>
    </JBGridContext.Provider>
  );
}

export const JBGrid = JBGridComponent;
