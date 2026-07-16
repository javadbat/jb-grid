import CSS from "./style.css";
import { renderHTML } from "./render.js";

export class JBGridLayoutWebComponent extends HTMLElement {
  constructor() {
    super();
    this.#init();
  }

  #init() {
    const shadowRoot = this.attachShadow({ mode: "open", clonable: true, serializable: true });
    const template = document.createElement("template");
    template.innerHTML = `<style>${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

const elementNotExists = !customElements.get("jb-grid-layout");
if (elementNotExists) {
  window.customElements.define("jb-grid-layout", JBGridLayoutWebComponent);
}
