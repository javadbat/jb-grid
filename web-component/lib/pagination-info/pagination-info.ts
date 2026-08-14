import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import { enToFaDigits } from 'jb-core';
import type { JBPaginationInfoElements, JBPaginationInfoPageSizeChangeEventDetail } from './types.js';
import { i18n } from "jb-core/i18n";
import { paginationInfoDictionary } from "./i18n.js";

export * from "./types.js";
export { paginationInfoDictionary, type JBPaginationInfoDictionary } from "./i18n.js";

export class JBPaginationInfoWebComponent extends HTMLElement {
  #elements!: JBPaginationInfoElements;
  #pageSize = 20;
  #pageSizes = [20, 30, 50, 100];
  #startItemIndex = 0;
  #endItemIndex = 0;
  #totalItemsCount = 0;
  #pageItemCountTitle: string | null = null;
  #fromLabel: string | null = null;
  #currentAvailableItemTitle: string | null = null;
  #showPersianNumber = i18n.locale.numberingSystem == "arabext";
  #hasShowPersianNumberOverride = false;
  #unsubscribeLocaleChange: VoidFunction | null = null;

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
    return this.#pageItemCountTitle ?? paginationInfoDictionary.get(i18n, "pageItemCount");
  }

  set pageItemCountTitle(value: string) {
    this.#pageItemCountTitle = value || null;
    this.#renderLabels();
  }

  get fromLabel() {
    return this.#fromLabel ?? paginationInfoDictionary.get(i18n, "from");
  }

  set fromLabel(value: string) {
    this.#fromLabel = value || null;
    this.#renderLabels();
  }

  get currentAvailableItemTitle() {
    return this.#currentAvailableItemTitle ?? paginationInfoDictionary.get(i18n, "currentAvailableItem");
  }

  set currentAvailableItemTitle(value: string) {
    this.#currentAvailableItemTitle = value || null;
    this.#renderLabels();
  }

  get showPersianNumber() {
    return this.#showPersianNumber;
  }

  set showPersianNumber(value: boolean | undefined) {
    this.#hasShowPersianNumberOverride = value !== undefined;
    this.#setShowPersianNumber(value ?? i18n.locale.numberingSystem === "arabext");
  }

  #setShowPersianNumber(value: boolean) {
    this.#showPersianNumber = value;
    this.#renderPageSizeOptions();
    this.#renderMetaData();
  }

  constructor() {
    super();
    this.#init();
  }

  connectedCallback() {
    this.#unsubscribeLocaleChange?.();
    if (!this.#hasShowPersianNumberOverride) this.#setShowPersianNumber(i18n.locale.numberingSystem === "arabext");
    this.#unsubscribeLocaleChange = i18n.subscribe(() => {
      if (!this.#hasShowPersianNumberOverride) this.#setShowPersianNumber(i18n.locale.numberingSystem === "arabext");
      this.#renderLabels();
    });
  }

  disconnectedCallback() {
    this.#unsubscribeLocaleChange?.();
    this.#unsubscribeLocaleChange = null;
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
    this.#elements.pageSizeSection.title = this.pageItemCountTitle;
    this.#elements.pageSizeSelect.ariaLabel = this.pageItemCountTitle;
    this.#elements.fromLabel.textContent = ` ${this.fromLabel}`;
    this.#elements.totalItemsCount.title = this.currentAvailableItemTitle;
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
