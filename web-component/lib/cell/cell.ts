import { defineWebComponent, JBBaseComponent } from "jb-core";
import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';

export * from "./types.js"; 
export class JBCellWebComponent extends JBBaseComponent {
  #internals?: ElementInternals;
  #templateSheet = new CSSStyleSheet();
  get name(){
    return this.getAttribute("name")||""
  }
  set name(value:string){
    this.setAttribute("name",value);
    this.#templateSheet.replace(`
      :host{ grid-area:${value?value:"none"}}
      @container (style(--jb-row-grid-mode: auto)) {
        :host{ grid-area:auto }
      }
    `);
  }
  constructor() {
    super();
    if (typeof this.attachInternals === "function") {
      this.#internals = this.attachInternals();
      this.#internals.role = "cell";
    }
    this.#init();
  }
  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable:true, serializable:true });
    shadowRoot.adoptedStyleSheets = [this.#templateSheet];
    registerDefaultVariables();
    this.#render();
    this.#registerEventListener();
  }
  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }
  connectedCallback() {
    if (!this.#internals && !this.hasAttribute("role")) {
      this.setAttribute("role", "cell");
    }
  }
  #registerEventListener() {
    // this.#elements.nav.next.addEventListener('click', ()=>this.#goToNextPage(true));
  }
}
defineWebComponent('jb-cell', JBCellWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-cell": JBCellWebComponent;
  }
}
