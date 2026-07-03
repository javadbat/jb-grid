import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import { enToFaDigits } from 'jb-core';
import type { JBPaginationInfoElements, JBPaginationInfoPageSizeChangeEventDetail } from './types.js';

export * from "./types.js";

export class JBPaginationInfoWebComponent extends HTMLElement {
  #elements!: JBPaginationInfoElements;
  #pageSize = 20;
  #pageSizes = [20, 30, 50, 100];
  #startItemIndex = 0;
  #endItemIndex = 0;
  #totalItemsCount = 0;
  #pageItemCountTitle = "";
  #fromLabel = "";
  #currentAvailableItemTitle = "";
  #showPersianNumber = false;

  get pageSize() {
    return this.#pageSize;
  }

  set pageSize(value: number) {
    this.#pageSize = value;
    this.#syncSelectValue();
  }

  get pageSizes() {
    return this.#pageSizes;
  }

  set pageSizes(value: number[]) {
    this.#pageSizes = value;
    this.#renderPageSizeOptions();
  }

  get startItemIndex() {
    return this.#startItemIndex;
  }

  set startItemIndex(value: number) {
    this.#startItemIndex = value;
    this.#renderMetaData();
  }

  get endItemIndex() {
    return this.#endItemIndex;
  }

  set endItemIndex(value: number) {
    this.#endItemIndex = value;
    this.#renderMetaData();
  }

  get totalItemsCount() {
    return this.#totalItemsCount;
  }

  set totalItemsCount(value: number) {
    this.#totalItemsCount = value;
    this.#renderMetaData();
  }

  get pageItemCountTitle() {
    return this.#pageItemCountTitle;
  }

  set pageItemCountTitle(value: string) {
    this.#pageItemCountTitle = value;
    this.#renderLabels();
  }

  get fromLabel() {
    return this.#fromLabel;
  }

  set fromLabel(value: string) {
    this.#fromLabel = value;
    this.#renderLabels();
  }

  get currentAvailableItemTitle() {
    return this.#currentAvailableItemTitle;
  }

  set currentAvailableItemTitle(value: string) {
    this.#currentAvailableItemTitle = value;
    this.#renderLabels();
  }

  get showPersianNumber() {
    return this.#showPersianNumber;
  }

  set showPersianNumber(value: boolean) {
    this.#showPersianNumber = value;
    this.#renderPageSizeOptions();
    this.#renderMetaData();
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable: true, serializable: true });
    registerDefaultVariables();
    this.#render();
    this.#elements = {
      pageSizeSelect: shadowRoot.querySelector(".page-size-select")!,
      pageSizeSection: shadowRoot.querySelector(".page-size-section")!,
      startItemIndex: shadowRoot.querySelector(".start-item-index")!,
      endItemIndex: shadowRoot.querySelector(".end-item-index")!,
      fromLabel: shadowRoot.querySelector(".from-label")!,
      totalItemsCount: shadowRoot.querySelector(".total-items-count")!,
    };
    this.#registerEventListener();
    this.#renderPageSizeOptions();
    this.#renderLabels();
    this.#renderMetaData();
  }

  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }

  #registerEventListener() {
    this.#elements.pageSizeSelect.addEventListener("change", () => {
      const pageSize = Number(this.#elements.pageSizeSelect.value);
      this.pageSize = pageSize;
      this.dispatchEvent(new CustomEvent<JBPaginationInfoPageSizeChangeEventDetail>("page-size-change", {
        bubbles: true,
        composed: true,
        detail: { pageSize }
      }));
    });
  }

  #renderPageSizeOptions() {
    if (!this.#elements) {
      return;
    }
    this.#elements.pageSizeSelect.replaceChildren(...this.#pageSizes.map((pageSize) => {
      const option = document.createElement("option");
      option.value = pageSize.toString();
      option.textContent = this.#formatNumber(pageSize).toString();
      return option;
    }));
    this.#syncSelectValue();
  }

  #syncSelectValue() {
    if (!this.#elements) {
      return;
    }
    this.#elements.pageSizeSelect.value = this.#pageSize.toString();
  }

  #renderLabels() {
    if (!this.#elements) {
      return;
    }
    this.#elements.pageSizeSection.title = this.#pageItemCountTitle;
    this.#elements.fromLabel.textContent = ` ${this.#fromLabel}`;
    this.#elements.totalItemsCount.title = this.#currentAvailableItemTitle;
  }

  #renderMetaData() {
    if (!this.#elements) {
      return;
    }
    this.#elements.startItemIndex.textContent = this.#formatNumber(this.#startItemIndex).toString();
    this.#elements.endItemIndex.textContent = ` ${this.#formatNumber(this.#endItemIndex)} `;
    this.#elements.totalItemsCount.textContent = ` ${this.#formatNumber(this.#totalItemsCount)} `;
  }

  #formatNumber(value: number) {
    return this.#showPersianNumber ? enToFaDigits(value) : value;
  }
}

const myElementNotExists = !customElements.get('jb-pagination-info');
if (myElementNotExists) {
  window.customElements.define('jb-pagination-info', JBPaginationInfoWebComponent);
}
