import React, { type ReactNode, useEffect, useReducer } from 'react';
import JBGridViewModel, { JBGridContext } from './JBGridViewModel.js';
import type { AnyObject, JBGridCallbacks, JBGridI18nConfig, JBGridRenderContext, JBGridRowData } from './types.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Content from './Content.js';
import { useInstance } from 'jb-core/react';
import 'jb-grid';
import '../module-declaration.js';
import { JBViewport } from '../Viewport.js';
import { JBGridLayout } from '../GridLayout.js';

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

  const renderContext: JBGridRenderContext = {
    refreshView: () => vm.notifyStateChange()
  };
  const contentChildren = typeof props.children === "function" ? props.children(props.data, renderContext) : props.children;
  return (
    <JBGridContext.Provider value={vm} key={"jb-grid-context"}>
      <JBViewport fullscreen={props.isFullscreen === true}>
        <JBGridLayout aria-busy={props.isLoading ? "true" : "false"} aria-label={props.title} className={`jb-grid-wrapper ${props.className ?? ""}`} style={props.style}>
          <Header title={props.title} vm={vm} i18n={props.i18n} searchbarComponent={props.searchbarComponent} headerEndComponents={props.headerEndComponents}></Header>
          <Content i18n={props.i18n} tableHeader={props.tableHeader} isErrorOccurred={props.isErrorOccurred ?? false} isLoading={props.isLoading ?? false} refreshBtnClick={vm.refreshBtnClick} errorComponent={props.contentError}>{contentChildren}</Content>
          <Footer i18n={props.i18n} isFullscreen={props.isFullscreen ?? false} vm={vm}></Footer>
        </JBGridLayout>
      </JBViewport>
    </JBGridContext.Provider>
  );
}

export const JBGrid = JBGridComponent;
