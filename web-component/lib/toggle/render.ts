import { expandToggleDictionary } from "./i18n.js";
import { i18n } from "jb-core/i18n";
import "jb-icons/triangle";

export function renderHTML(): string {
  return /* html */ `
    <button class="toggle-button" type="button" aria-label="${expandToggleDictionary.get(i18n, "toggleRowDetails")}" aria-expanded="false">
      <slot>
        <jb-icon-triangle class="arrow-icon" direction="inline-end" round="60"></jb-icon-triangle>
      </slot>
    </button>
      `;
}
