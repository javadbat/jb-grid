import { defineWebComponent, JBBaseComponent } from "jb-core";
import CSS from "./style.css";
import { renderHTML } from "./render.js";

export class JBGridLayoutWebComponent extends JBBaseComponent {
  #table!: HTMLElement;

  static get observedAttributes() {
    return ["aria-busy", "aria-label"];
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    const shadowRoot = this.attachShadow({ mode: "open", clonable: true, serializable: true });
    const template = document.createElement("template");
    template.innerHTML = `<style>${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.#table = shadowRoot.querySelector(".table")!;
    this.#syncAccessibleName();
    this.#syncBusyState();
  }

  attributeChangedCallback(name: string) {
    if (name === "aria-label") {
      this.#syncAccessibleName();
    }
    if (name === "aria-busy") {
      this.#syncBusyState();
    }
  }

  #syncAccessibleName() {
    const label = this.getAttribute("aria-label")?.trim();
    if (label) {
      this.#table.setAttribute("aria-label", label);
    } else {
      this.#table.removeAttribute("aria-label");
    }
  }

  #syncBusyState() {
    const isBusy = this.getAttribute("aria-busy") === "true";
    this.#table.setAttribute("aria-busy", isBusy ? "true" : "false");
  }
}

defineWebComponent("jb-grid-layout", JBGridLayoutWebComponent);
