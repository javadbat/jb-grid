import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type { JBColumnHeaderElements, JBColumnHeaderSort, JBColumnHeaderSortEventDetail } from './types.js';
import "jb-icons/arrow-tailed";
import { parseBooleanAttribute } from "jb-core";

export * from "./types.js";

export class JBColumnHeaderWebComponent extends HTMLElement {
  #internals?: ElementInternals;
  #isConstructed = false;
  #elements!: JBColumnHeaderElements;
  #sortIconRotation = 0;
  #templateSheet = new CSSStyleSheet();
  #enableSortingRemoval: boolean = false;

  get name() {
    return this.getAttribute("name") || "";
  }

  set name(value: string) {
    this.setAttribute("name", value);
    this.#setGridArea(value);
  }

  get sortable() {
    return parseBooleanAttribute(this.getAttribute("sortable"));
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
    return ["name", "sort", "sortable"];
  }
  get enableSortingRemoval() {
    return this.#enableSortingRemoval;
  }
  set enableSortingRemoval(value: boolean) {
    this.#enableSortingRemoval = value;
  }
  constructor() {
    super();
    if (typeof this.attachInternals === "function") {
      this.#internals = this.attachInternals();
      this.#internals.role = "columnheader";
      this.#internals.ariaSort = "none";
    }
    this.#init();
    this.#isConstructed = true;
  }

  connectedCallback() {
    if (!this.#internals && !this.hasAttribute("role")) {
      this.setAttribute("role", "columnheader");
    }
    this.#syncSortSemantics(this.sort);
  }

  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable: true, serializable: true });
    shadowRoot.adoptedStyleSheets = [this.#templateSheet];
    registerDefaultVariables();
    this.#render();
    this.#elements = {
      wrapper: shadowRoot.querySelector(".column-header")!,
      sortIcon: shadowRoot.querySelector("jb-icon-arrow-tailed")!,
    };
    this.#setGridArea(this.name);
    this.#syncSortableSemantics();
    this.#syncSortSemantics(this.sort);
    this.#syncSortIcon(this.sort);
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
    if (name === "sortable") {
      this.#syncSortableSemantics();
    }
    if (name === "sort") {
      this.#syncSortSemantics(newValue);
      this.#syncSortIcon(newValue);
    }
  }

  #syncSortIcon(value: string | null | undefined) {
    const nextRotation = value === "desc" ? 180 : 0;
    const spin = nextRotation - this.#sortIconRotation;
    this.#sortIconRotation = nextRotation;
    if (spin !== 0) {
      this.#elements.sortIcon.spin = spin;
    }
  }

  #syncSortSemantics(value: string | null | undefined) {
    const ariaSort = value === "asc"
      ? "ascending"
      : value === "desc"
        ? "descending"
        : "none";
    if (this.#isConstructed) {
      this.setAttribute("aria-sort", ariaSort);
    }
    if (this.#internals) {
      this.#internals.ariaSort = ariaSort;
    }
  }

  #registerEventListener() {
    this.#elements.wrapper.addEventListener("click", () => this.#onClick());
    this.#elements.wrapper.addEventListener("keydown", event => {
      if (!this.sortable || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }
      event.preventDefault();
      this.#onClick();
    });
  }

  #syncSortableSemantics() {
    if (!this.#elements) {
      return;
    }
    if (this.sortable) {
      this.#elements.wrapper.setAttribute("role", "button");
      this.#elements.wrapper.tabIndex = 0;
    } else {
      this.#elements.wrapper.removeAttribute("role");
      this.#elements.wrapper.removeAttribute("tabindex");
    }
  }

  #onClick() {
    if (!this.sortable) {
      return;
    }
    let newSort: JBColumnHeaderSort | null = null;
    if (this.#enableSortingRemoval) {
      switch (this.sort) {
        case 'asc':
          newSort = 'desc';
          break;
        case 'desc':
          newSort = null
          break;
        case null:
          newSort = 'asc'
          break;
      }
    } else {
      newSort = this.sort === "asc" ? "desc" : "asc";
    }
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
