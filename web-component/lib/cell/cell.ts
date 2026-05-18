import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type {JBCellElements} from './types.js';

export * from "./types.js"; 
export class JBCellWebComponent extends HTMLElement {
  #elements!: JBCellElements;
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
    this.#init();
  }
  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable:true, serializable:true });
    shadowRoot.adoptedStyleSheets = [this.#templateSheet];
    registerDefaultVariables();
    this.#render();
    this.#elements = {
    }
    this.#registerEventListener();
  }
  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }
  connectedCallback() {
  }
  #registerEventListener() {
    // this.#elements.nav.next.addEventListener('click', ()=>this.#goToNextPage(true));
  }
}
const myElementNotExists = !customElements.get('jb-cell');
if (myElementNotExists) {
  window.customElements.define('jb-cell', JBCellWebComponent);
}