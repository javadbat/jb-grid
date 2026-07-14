import { dictionary } from "../i18n";
import { i18n } from "jb-core/i18n";

export function renderHTML(): string {
  return /* html */ `
    <button class="toggle-button" type="button" aria-label="${dictionary.get(i18n, "toggleRowDetails")}" aria-expanded="false">
      <slot>
        <svg class="arrow-icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M35,10 L15,25 L35,40 Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="6"
          stroke-linejoin="round" />
        </svg>
      </slot>
    </button>
      `;
}
