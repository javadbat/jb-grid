import { defineWebComponent, JBBaseComponent } from "jb-core";
import { renderHTML } from './render.js';
import CSS from './style.css';
import VariablesCSS from './variables.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type { JBRowElements, RowTemplate} from './types.js';
import { createTemplateStylesheet } from './utils.js';

export * from "./types.js"; 
export class JBRowWebComponent extends JBBaseComponent {
  static #detailsId = 0;
  #elements!: JBRowElements;
  #templateSheet = new CSSStyleSheet();
  #RowTemplate:RowTemplate = []
  #isOpen = false;
  get isOpen(){
    return this.#isOpen;
  }
  set isOpen(value:boolean){
    this.#isOpen = value;
    this.#elements.expandWrapper.setAttribute("aria-hidden", value ? "false" : "true");
    if(value){
      this.#elements.expandWrapper.classList.remove('--hidden');
      this.#elements.expandWrapper.removeAttribute('inert');
    }else{
      this.#elements.expandWrapper.classList.add('--hidden');
      this.#elements.expandWrapper.setAttribute('inert', '');
    }
  }
  get detailsId() {
    return this.#elements.expandRegion.id;
  }
  get detailsElement() {
    return this.#elements.expandRegion;
  }
  get rowTemplate(){
    return this.#RowTemplate
  }
  set rowTemplate(value:RowTemplate){
    this.#RowTemplate = value;
    createTemplateStylesheet(this.#templateSheet, value, {
      selector: ".grid-row",
      autoModeVariableName: "--jb-row-grid-mode"
    });
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
      expandWrapper: shadowRoot.querySelector(".expand-wrapper")!,
      expandRegion: shadowRoot.querySelector(".expand-region")!
    }
    this.#elements.expandRegion.id = `jb-row-details-${++JBRowWebComponent.#detailsId}`;
    createTemplateStylesheet(this.#templateSheet, null, {
      selector: ".grid-row",
      autoModeVariableName: "--jb-row-grid-mode"
    });
    this.#registerEventListener();
  }
  #render() {
    const html = `<style>${VariablesCSS} ${CSS}</style>\n${renderHTML()}`;
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
defineWebComponent('jb-row', JBRowWebComponent);
