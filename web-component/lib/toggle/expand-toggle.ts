import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import { JBRowWebComponent } from '../row/row.js';
export class JBExpandToggleWebComponent extends HTMLElement {
  constructor() {
    super();
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
    }
  }
}
const myElementNotExists = !customElements.get('jb-expand-toggle');
if (myElementNotExists) {
  window.customElements.define('jb-expand-toggle', JBExpandToggleWebComponent);
}