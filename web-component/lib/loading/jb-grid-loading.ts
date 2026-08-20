import { defineWebComponent, JBBaseComponent } from "jb-core";
import CSS from "./style.css";
import { renderHTML } from "./render.js";

export { gridLoadingDictionary, type JBGridLoadingDictionary } from "./i18n.js";

export class JBGridLoadingWebComponent extends JBBaseComponent {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open", clonable: true, serializable: true });
    const template = document.createElement("template");
    template.innerHTML = `<style>${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

defineWebComponent("jb-grid-loading", JBGridLoadingWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-grid-loading": JBGridLoadingWebComponent;
  }
}
