import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import { JBRowWebComponent } from '../row/row.js';
export { expandToggleDictionary, type JBExpandToggleDictionary } from "./i18n.js";
export class JBExpandToggleWebComponent extends HTMLElement {
  #button!: HTMLButtonElement;
  constructor() {
    super();
    this.#init();
  }
  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable:true, serializable:true });
    registerDefaultVariables();
    this.#render();
    this.#button = shadowRoot.querySelector(".toggle-button")!;
    this.#registerEventListener();
  }
  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }
  #parentRow:JBRowWebComponent|null = null;
  connectedCallback() {
    this.#parentRow = this.#findParentRow(this);
    if (this.#parentRow) {
      this.#button.setAttribute("aria-controls", this.#parentRow.detailsId);
      this.#button.ariaControlsElements = [this.#parentRow.detailsElement];
    }
    if(this.#parentRow?.isOpen){
      this.setAttribute('open','');
      this.#button.setAttribute("aria-expanded", "true");
    }
  }
  #findParentRow(element:Element|null):JBRowWebComponent|null{
    if(!element || !element.parentElement){
      return null;
    }
    if(element.parentElement instanceof JBRowWebComponent){
      return element.parentElement
    }else{
      return this.#findParentRow(this.parentElement!);
    }
  }
  #registerEventListener() {
    this.#button.addEventListener('click', ()=>this.toggle());
  }
  toggle(){
    if(this.#parentRow){
      const value = !this.#parentRow?.isOpen;
      this.#parentRow.isOpen = value
      value?this.setAttribute('open',''):this.removeAttribute('open');
      this.#button.setAttribute("aria-expanded", value ? "true" : "false");
    }
  }
}
const myElementNotExists = !customElements.get('jb-expand-toggle');
if (myElementNotExists) {
  window.customElements.define('jb-expand-toggle', JBExpandToggleWebComponent);
}
