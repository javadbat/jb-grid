import React, { createContext, useContext } from 'react';
import type { JBGridCallbacks, JBGridPaginationMeta } from './types.js';
import type { JBIconRefreshWebComponent } from "jb-icons/refresh";

type StateChangeCallback = (() => void) | undefined;
type HeaderSection = "MAIN" | "SEARCH";

export type JBGridState = {
  pageIndex: number,
  pageSize: number,
  totalPages: number,
  metaData: JBGridPaginationMeta
}

class JBGridViewModel {
  #onStateChange: StateChangeCallback;
  headerSection: HeaderSection = "MAIN";
  elements = {
    refreshIcon: React.createRef<JBIconRefreshWebComponent>()
  }
  callBacks: JBGridCallbacks = {}
  page = {
    index: 1,
    size: 20,
    totalPages: 1
  }
  metaData: JBGridPaginationMeta = {
    startItemIndex: 0,
    endItemIndex: 0,
    totalItemsCount: 0
  }
  constructor(callBacks: JBGridCallbacks | undefined, onStateChange?: () => void) {
    this.#onStateChange = onStateChange;
    this.bindMethods();
    this.callBacks = callBacks ?? {};
  }

  bindMethods() {
    this.refreshBtnClick = this.refreshBtnClick.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.openMainHeaderSection = this.openMainHeaderSection.bind(this);
    this.openSearchHeaderSection = this.openSearchHeaderSection.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
  }

  setStateChangeCallback(callback: StateChangeCallback) {
    this.#onStateChange = callback;
  }

  setCallbacks(callBacks: JBGridCallbacks | undefined) {
    this.callBacks = callBacks ?? {};
  }

  setGridState(state: JBGridState) {
    this.page = {
      index: state.pageIndex,
      size: state.pageSize,
      totalPages: state.totalPages
    };
    this.metaData = state.metaData;
  }

  notifyStateChange() {
    this.#onStateChange?.();
  }

  goToFirstPage() {
    if (this.page.index != 1) {
      this.goToPage(1);
    }
  }

  refreshBtnClick() {
    if (this.elements.refreshIcon.current) {
      this.elements.refreshIcon.current.isLoading = true;
    }
    Promise.resolve(this.callBacks.onRefresh?.()).finally(() => {
      if (this.elements.refreshIcon.current) {
        this.elements.refreshIcon.current.isLoading = false;
      }
    });
  }

  goToPage(destinationPageIndex: number) {
    this.callBacks.onPageIndexChange?.(destinationPageIndex);
  }

  onPageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newPageSize = parseInt(e.target.value);
    this.setPageSize(newPageSize);
  }

  setPageSize(newPageSize: number) {
    this.callBacks.onPageSizeChange?.(newPageSize);
  }

  onFullScreenBtnClicked(currentValue: boolean) {
    const newValue = !currentValue;
    if (newValue) {
      this.callBacks.onFullscreen?.();
    } else {
      this.callBacks.onExitFullscreen?.();
    }
    this.callBacks.onFullscreenChange?.(newValue);
  }

  openSearchHeaderSection() {
    this.headerSection = "SEARCH";
    this.notifyStateChange();
  }

  openMainHeaderSection() {
    this.headerSection = "MAIN";
    this.notifyStateChange();
  }

}

export default JBGridViewModel;
export const JBGridContext = createContext<JBGridViewModel | null>(null);
export const useJBGridVM = () => useContext(JBGridContext);
