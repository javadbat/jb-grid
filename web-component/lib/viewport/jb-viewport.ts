import { defineWebComponent, JBBaseComponent, parseBooleanAttribute } from "jb-core";
import CSS from "./style.css";
import { renderHTML } from "./render.js";

export class JBViewportWebComponent extends JBBaseComponent {
  get fullscreen() {
    return parseBooleanAttribute(this.getAttribute("fullscreen"));
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

defineWebComponent("jb-viewport", JBViewportWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-viewport": JBViewportWebComponent;
  }
}
