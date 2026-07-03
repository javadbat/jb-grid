import React, { createContext, useContext, type RefObject } from 'react';
import type { JBGridCallbacks, JBGridI18nConfig, JBGridPaginationMeta } from './types.js';
import type { JBRefreshIconWebComponent } from './Components/module-declaration.js';
import { defaultI18n } from './i18n.js';
import { assign } from 'lodash';

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
    refreshIcon: React.createRef<JBRefreshIconWebComponent>()
  }
  JBGridComponentDom: RefObject<HTMLDivElement | null> = React.createRef();
  gridWrapperElement: HTMLElement | null = null;
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
  i18n!: JBGridI18nConfig;

  constructor(callBacks: JBGridCallbacks | undefined, onStateChange?: () => void) {
    this.#onStateChange = onStateChange;
    this.bindMethods();
    this.setI18n({}, false);
    this.callBacks = callBacks ?? {};
  }

  bindMethods() {
    this.exitFullScreenGrid = this.exitFullScreenGrid.bind(this);
    this.fullScreenGrid = this.fullScreenGrid.bind(this);
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

  setI18n(newValue: JBGridI18nConfig, notifyStateChange = true) {
    this.i18n = assign({}, defaultI18n, newValue);
    if (notifyStateChange) {
      this.notifyStateChange();
    }
  }

  goToFirstPage() {
    if (this.page.index != 1) {
      this.goToPage(1);
    }
  }

  refreshBtnClick() {
    this.elements.refreshIcon.current?.play();
    Promise.resolve(this.callBacks.onRefresh?.()).finally(() => {
      this.elements.refreshIcon.current?.stop();
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

  onFullscreenChanged(newValue: boolean) {
    if (newValue == true) {
      this.fullScreenGrid();
    } else {
      this.exitFullScreenGrid();
    }
  }

  fullScreenGrid() {
    const container = document.createElement('div');
    container.classList.add('jb-grid-full-screen-container');
    document.body.append(container);
    this.gridWrapperElement = this.JBGridComponentDom!.current!.parentElement!;
    container.append(this.JBGridComponentDom.current as Node);
  }

  exitFullScreenGrid() {
    const container = document.querySelector('.jb-grid-full-screen-container') as HTMLDivElement;
    if (this.gridWrapperElement) {
      this.gridWrapperElement.append(this.JBGridComponentDom.current!);
    }
    container?.remove();
  }

  changePageNumberToInput() {
    const pageNumber: string | null = prompt(this.i18n.messages?.EnterPageNumberMessage, this.page.totalPages.toString());
    if (pageNumber && Number(pageNumber) > 0 && Number(pageNumber) < this.page.totalPages) {
      this.goToPage(Number(pageNumber));
    }
  }

  openSearchHeaderSection() {
    this.headerSection = "SEARCH";
    this.notifyStateChange();
  }

  openMainHeaderSection() {
    this.headerSection = "MAIN";
    this.notifyStateChange();
  }

  get paginationDisplayNumbers() {
    return {
      currentPage: this.toPersianNumber(this.page.index),
      nextPage: this.page.index + 1 <= this.page.totalPages ? this.toPersianNumber(this.page.index + 1) : "",
      next2Page: this.page.index + 2 <= this.page.totalPages ? this.toPersianNumber(this.page.index + 2) : "",
      prevPage: this.page.index - 1 > 0 ? this.toPersianNumber(this.page.index - 1) : "",
      prev2Page: this.page.index - 2 > 0 ? this.toPersianNumber(this.page.index - 2) : "",
      totalItemsCount: this.toPersianNumber(this.metaData.totalItemsCount),
      startItemIndex: this.toPersianNumber(this.metaData.startItemIndex),
      endItemIndex: this.toPersianNumber(this.metaData.endItemIndex),
      pageSizes: [this.toPersianNumber(20), this.toPersianNumber(30), this.toPersianNumber(50), this.toPersianNumber(100)]
    };
  }

  toPersianNumber(input: string | number) {
    if (this.i18n.showPersianNumber) {
      const inputString = input.toString();
      const correctedString = inputString.replace(/[0-9]/g, function (word) {
        return String.fromCharCode(1776 + Number(word));
      });
      return correctedString;
    }
    return input;
  }
}

export default JBGridViewModel;
export const JBGridContext = createContext<JBGridViewModel | null>(null);
export const useJBGridVM = () => useContext(JBGridContext);
