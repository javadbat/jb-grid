import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import { JBRowWebComponent } from '../row/row.js';
import { i18n } from "jb-core/i18n";
import { dictionary } from "../i18n";
export class JBExpandToggleWebComponent extends HTMLElement {
  #internals?: ElementInternals;
  constructor() {
    super();
    if (typeof this.attachInternals === "function") {
      this.#internals = this.attachInternals();
      this.#internals.role = "button";
      this.#internals.ariaLabel = dictionary.get(i18n, "toggleRowDetails");
      this.#internals.ariaExpanded = "false";
    }
    this.#init();
  }
  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable:true, serializable:true });
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
  #parentRow:JBRowWebComponent|null = null;
  connectedCallback() {
    this.#parentRow = this.#findParentRow(this);
    if(this.#parentRow?.isOpen){
      this.setAttribute('open','');
      if (this.#internals) this.#internals.ariaExpanded = "true";
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
    this.addEventListener('click', ()=>this.toggle(), {passive:true});
  }
  toggle(){
    if(this.#parentRow){
      const value = !this.#parentRow?.isOpen;
      this.#parentRow.isOpen = value
      value?this.setAttribute('open',''):this.removeAttribute('open');
      if (this.#internals) this.#internals.ariaExpanded = value ? "true" : "false";
    }
  }
}
const myElementNotExists = !customElements.get('jb-expand-toggle');
if (myElementNotExists) {
  window.customElements.define('jb-expand-toggle', JBExpandToggleWebComponent);
}
