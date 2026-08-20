import { defineWebComponent, JBBaseComponent } from "jb-core";
import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import { JBRowWebComponent } from '../row/row.js';
import type { JBIconTriangleWebComponent } from "jb-icons/triangle";
export { expandToggleDictionary, type JBExpandToggleDictionary } from "./i18n.js";
export class JBExpandToggleWebComponent extends JBBaseComponent {
  #button!: HTMLButtonElement;
  #triangle!: JBIconTriangleWebComponent;
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable: true, serializable: true });
  }
  #isOpen: boolean = false;
  get isOpen(): boolean {
    return this.#isOpen
  }
  set isOpen(value: boolean) {
    this.#isOpen = value;
    value ? this.setAttribute('open', '') : this.removeAttribute('open');
    this.#button.setAttribute("aria-expanded", value ? "true" : "false");
    this.#spinIcon(value);
  }
  #init() {
    const shadowRoot = this.shadowRoot!;
    registerDefaultVariables();
    this.#render();
    this.#button = shadowRoot.querySelector(".toggle-button")!;
    this.#triangle = shadowRoot.querySelector("jb-icon-triangle")!;
    this.#registerEventListener();
  }
  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }
  #parentRow: JBRowWebComponent | null = null;
  connectedCallback() {
    this.#init();

    this.#parentRow = this.#findParentRow(this);
    if (this.#parentRow) {
      this.#button.setAttribute("aria-controls", this.#parentRow.detailsId);
      this.#button.ariaControlsElements = [this.#parentRow.detailsElement];
    }
    if (this.#parentRow?.isOpen) {
      this.setAttribute('open', '');
      this.#button.setAttribute("aria-expanded", "true");
      this.#spinIcon(true);
    }
  }
  #findParentRow(element: Element | null): JBRowWebComponent | null {
    if (!element || !element.parentElement) {
      return null;
    }
    if (element.parentElement instanceof JBRowWebComponent) {
      return element.parentElement
    } else {
      return this.#findParentRow(this.parentElement!);
    }
  }
  #registerEventListener() {
    this.#button.addEventListener('click', () => this.toggle());
  }
  toggle() {
    if (this.#parentRow) {
      const value = !this.#parentRow?.isOpen;
      this.#parentRow.isOpen = value
      this.isOpen = value;
    }
  }
  #spinIcon(open: boolean) {
    const openSpin = getComputedStyle(this).direction === "rtl" ? -90 : 90;
    this.#triangle.spin = open ? openSpin : 0;
  }
}
defineWebComponent('jb-expand-toggle', JBExpandToggleWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-expand-toggle": JBExpandToggleWebComponent;
  }
}
