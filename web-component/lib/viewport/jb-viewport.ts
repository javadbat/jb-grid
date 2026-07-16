import CSS from "./style.css";
import { renderHTML } from "./render.js";

export class JBViewportWebComponent extends HTMLElement {
  get fullscreen() {
    return this.hasAttribute("fullscreen");
  }

  set fullscreen(value: boolean) {
    this.toggleAttribute("fullscreen", value);
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open", clonable: true, serializable: true });
    const template = document.createElement("template");
    template.innerHTML = `<style>${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

if (!customElements.get("jb-viewport")) {
  window.customElements.define("jb-viewport", JBViewportWebComponent);
}
