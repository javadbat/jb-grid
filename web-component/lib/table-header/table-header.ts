import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type { TableHeaderTemplate } from './types.js';
import { createTemplateStylesheet } from '../utils.js';

export * from "./types.js";

export class JBTableHeaderWebComponent extends HTMLElement {
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
    this.#init();
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

const myElementNotExists = !customElements.get('jb-table-header');
if (myElementNotExists) {
  window.customElements.define('jb-table-header', JBTableHeaderWebComponent);
}
