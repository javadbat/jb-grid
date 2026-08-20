import { defineWebComponent, JBBaseComponent } from "jb-core";
import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type { TableHeaderTemplate } from './types.js';
import { createTemplateStylesheet } from '../utils.js';

export * from "./types.js";

export class JBTableHeaderWebComponent extends JBBaseComponent {
  #internals?: ElementInternals;
  #templateSheet = new CSSStyleSheet();
  #headerTemplate: TableHeaderTemplate = [];

  get headerTemplate() {
    return this.#headerTemplate;
  }

  set headerTemplate(value: TableHeaderTemplate) {
    this.#headerTemplate = value;
    createTemplateStylesheet(this.#templateSheet, value, {
      selector: ".table-header-row"
    });
  }

  constructor() {
    super();
    if (typeof this.attachInternals === "function") {
      this.#internals = this.attachInternals();
      this.#internals.role = "rowgroup";
    }
    this.#init();
  }

  connectedCallback() {
    if (!this.#internals && !this.hasAttribute("role")) {
      this.setAttribute("role", "rowgroup");
    }
  }

  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable: true, serializable: true });
    shadowRoot.adoptedStyleSheets = [this.#templateSheet];
    registerDefaultVariables();
    this.#render();
    createTemplateStylesheet(this.#templateSheet, null, {
      selector: ".table-header-row"
    });
  }

  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }
}

defineWebComponent('jb-table-header', JBTableHeaderWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-table-header": JBTableHeaderWebComponent;
  }
}
