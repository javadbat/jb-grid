import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type { JBRowElements, RowTemplate} from './types.js';
import { createTemplateStylesheet } from './utils.js';

export * from "./types.js"; 
export class JBRowWebComponent extends HTMLElement {
  #elements!: JBRowElements;
  #templateSheet = new CSSStyleSheet();
  #RowTemplate:RowTemplate = []
  #isOpen = false;
  get isOpen(){
    return this.#isOpen;
  }
  set isOpen(value:boolean){
    this.#isOpen = value;
    if(value){
      this.#elements.expandWrapper.classList.remove('--hidden');
    }else{
      this.#elements.expandWrapper.classList.add('--hidden');
    }
  }
  get rowTemplate(){
    return this.#RowTemplate
  }
  set rowTemplate(value:RowTemplate){
    this.#RowTemplate = value;
    createTemplateStylesheet(this.#templateSheet,value);
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
      expandWrapper: shadowRoot.querySelector(".expand-wrapper")!
    }
    createTemplateStylesheet(this.#templateSheet,null);
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
const myElementNotExists = !customElements.get('jb-row');
if (myElementNotExists) {
  window.customElements.define('jb-row', JBRowWebComponent);
}