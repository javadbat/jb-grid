import "jb-button";
import CSS from "./style.css";
import { renderHTML } from "./render.js";
import { i18n } from "jb-core/i18n";
import { gridErrorDictionary } from "./i18n.js";

export { gridErrorDictionary, type JBGridErrorDictionary } from "./i18n.js";

type JBGridErrorElements = {
  title: HTMLElement;
  message: HTMLElement;
  refreshButton: HTMLElement;
  refreshButtonTitle: HTMLElement;
};

export class JBGridErrorWebComponent extends HTMLElement {
  #elements!: JBGridErrorElements;

  static get observedAttributes() {
    return ["title", "message", "refresh-button-title"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open", clonable: true, serializable: true });
    const template = document.createElement("template");
    template.innerHTML = `<style>${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.#elements = {
      title: shadowRoot.querySelector(".error-title")!,
      message: shadowRoot.querySelector(".error-message")!,
      refreshButton: shadowRoot.querySelector(".refresh-button")!,
      refreshButtonTitle: shadowRoot.querySelector(".refresh-button-title")!,
    };
    this.#elements.refreshButton.addEventListener("click", event => {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent("refresh", { bubbles: true, composed: true }));
    });
  }

  connectedCallback() {
    this.#renderContent();
  }

  attributeChangedCallback() {
    this.#renderContent();
  }

  #renderContent() {
    if (!this.#elements) {
      return;
    }
    this.#elements.title.textContent = this.getAttribute("title") ?? gridErrorDictionary.get(i18n, "title");
    this.#elements.message.textContent = this.getAttribute("message") ?? gridErrorDictionary.get(i18n, "message");
    this.#elements.refreshButtonTitle.textContent = this.getAttribute("refresh-button-title") ?? gridErrorDictionary.get(i18n, "refreshButtonTitle");
  }
}

if (!customElements.get("jb-grid-error")) {
  window.customElements.define("jb-grid-error", JBGridErrorWebComponent);
}
