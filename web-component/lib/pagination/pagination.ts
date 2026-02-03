import { renderHTML } from './render';
import CSS from './style.css';
export class JBPaginationWebComponent extends HTMLElement {
  pageIndex: number = 1;
  constructor() {
    super();
    this.#init();
  }
  #init() {
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.#render();
  }
  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }
  connectedCallback() {

  }
}

const myElementNotExists = !customElements.get('jb-pagination');
if (myElementNotExists) {
  window.customElements.define('jb-pagination', JBPaginationWebComponent);
}