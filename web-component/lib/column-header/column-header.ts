import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type { JBColumnHeaderElements, JBColumnHeaderSort, JBColumnHeaderSortEventDetail } from './types.js';

export * from "./types.js";

export class JBColumnHeaderWebComponent extends HTMLElement {
  #internals?: ElementInternals;
  #elements!: JBColumnHeaderElements;
  #templateSheet = new CSSStyleSheet();

  get name() {
    return this.getAttribute("name") || "";
  }

  set name(value: string) {
    this.setAttribute("name", value);
    this.#setGridArea(value);
  }

  get sortable() {
    return this.hasAttribute("sortable");
  }

  set sortable(value: boolean) {
    if (value) {
      this.setAttribute("sortable", "");
    } else {
      this.removeAttribute("sortable");
    }
  }

  get sort() {
    return this.getAttribute("sort") as JBColumnHeaderSort | null;
  }

  set sort(value: JBColumnHeaderSort | null | undefined) {
    if (value) {
      this.setAttribute("sort", value);
      if (this.#internals) this.#internals.ariaSort = value === "asc" ? "ascending" : "descending";
    } else {
      this.removeAttribute("sort");
      if (this.#internals) this.#internals.ariaSort = "none";
    }
  }

  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();
    if (typeof this.attachInternals === "function") {
      this.#internals = this.attachInternals();
      this.#internals.role = "columnheader";
      this.#internals.ariaSort = "none";
    }
    this.#init();
  }

  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable: true, serializable: true });
    shadowRoot.adoptedStyleSheets = [this.#templateSheet];
    registerDefaultVariables();
    this.#render();
    this.#elements = {
      wrapper: shadowRoot.querySelector(".column-header")!
    };
    this.#setGridArea(this.name);
    this.#registerEventListener();
  }

  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "name") {
      this.#setGridArea(newValue || "");
    }
  }

  #registerEventListener() {
    this.#elements.wrapper.addEventListener("click", () => this.#onClick());
  }

  #onClick() {
    if (!this.sortable) {
      return;
    }
    const newSort: JBColumnHeaderSort = this.sort === "asc" ? "desc" : "asc";
    this.sort = newSort;
    this.dispatchEvent(new CustomEvent<JBColumnHeaderSortEventDetail>("sort", {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        sort: newSort
      }
    }));
  }

  #setGridArea(value: string) {
    this.#templateSheet.replace(`
      :host{ grid-area:${value ? value : "none"}}
    `);
  }
}

const myElementNotExists = !customElements.get('jb-col-header');
if (myElementNotExists) {
  window.customElements.define('jb-col-header', JBColumnHeaderWebComponent);
}
