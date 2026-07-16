import { renderHTML } from './render.js';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import { i18n } from "jb-core/i18n";
import { refreshIconDictionary } from "./i18n.js";

export { refreshIconDictionary, type JBRefreshIconDictionary } from "./i18n.js";

export class JBRefreshIconWebComponent extends HTMLElement {
  #internals?: ElementInternals;
  #icon!: SVGSVGElement;
  #animation: Animation | null = null;
  #animationDuration = 400;

  constructor() {
    super();
    if (typeof this.attachInternals === "function") {
      this.#internals = this.attachInternals();
      this.#internals.role = "img";
      this.#internals.ariaLabel = refreshIconDictionary.get(i18n, "refreshData");
      this.#internals.ariaBusy = "false";
    }
    this.#init();
  }

  #init() {
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true, clonable: true, serializable: true });
    registerDefaultVariables();
    this.#render();
    this.#icon = shadowRoot.querySelector(".refresh-icon")!;
  }

  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }

  play() {
    if (this.#internals) this.#internals.ariaBusy = "true";
    if (!this.#animation) {
      this.#animation = this.#icon.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        { id: "rotate", duration: this.#animationDuration, direction: "reverse", iterations: Infinity }
      );
      return;
    }
    this.#animation.effect?.updateTiming({ iterations: Infinity });
    this.#animation.onfinish = null;
    this.#animation.play();
  }

  pause() {
    this.#animation?.pause();
  }

  stop() {
    if (!this.#animation) {
      return;
    }
    const animation = this.#animation;
    const currentTime = typeof animation.currentTime === "number" ? animation.currentTime : 0;
    const nextIteration = Math.max(1, Math.floor(currentTime / this.#animationDuration) + 1);

    animation.effect?.updateTiming({ iterations: nextIteration });
    animation.onfinish = () => {
      if (this.#animation === animation) {
        animation.cancel();
        this.#animation = null;
        if (this.#internals) this.#internals.ariaBusy = "false";
      }
    };
    animation.play();
  }
}

const myElementNotExists = !customElements.get('jb-refresh-icon');
if (myElementNotExists) {
  window.customElements.define('jb-refresh-icon', JBRefreshIconWebComponent);
}
