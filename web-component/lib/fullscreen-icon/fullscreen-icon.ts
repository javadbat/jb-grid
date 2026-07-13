import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type { JBFullscreenIconState } from './types.js';
import { i18n } from "jb-core/i18n";
import { dictionary } from "../i18n";

export * from "./types.js";

export class JBFullscreenIconWebComponent extends HTMLElement {
  #state: JBFullscreenIconState = "enter";
  #internals?: ElementInternals;

  /**
   * Describes the action represented by the icon.
   *
   * - `"enter"` means activating the control will enter fullscreen mode.
   * - `"exit"` means activating the control will exit fullscreen mode.
   */
  get state() {
    return this.#state;
  }

  set state(value: JBFullscreenIconState) {
    this.#state = value;
    if (this.#internals) this.#internals.ariaLabel = dictionary.get(i18n, value === "exit" ? "exitFullscreen" : "enterFullscreen");
    this.setAttribute("state", value);
  }

  static get observedAttributes() {
    return ["state"];
  }

  constructor() {
    super();
    if (typeof this.attachInternals === "function") {
      this.#internals = this.attachInternals();
      this.#internals.role = "img";
    }
    this.#init();
  }

  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable: true, serializable: true });
    registerDefaultVariables();
    this.#render();
    this.state = this.#normalizeState(this.getAttribute("state"));
  }

  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "state") {
      this.#state = this.#normalizeState(newValue);
      if (this.#internals) this.#internals.ariaLabel = dictionary.get(i18n, this.#state === "exit" ? "exitFullscreen" : "enterFullscreen");
    }
  }

  #normalizeState(value: string | null): JBFullscreenIconState {
    return value === "exit" ? "exit" : "enter";
  }
}

const myElementNotExists = !customElements.get('jb-fullscreen-icon');
if (myElementNotExists) {
  window.customElements.define('jb-fullscreen-icon', JBFullscreenIconWebComponent);
}
