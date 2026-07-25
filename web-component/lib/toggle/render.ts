import { expandToggleDictionary } from "./i18n.js";
import { i18n } from "jb-core/i18n";

export function renderHTML(): string {
  return /* html */ `
    <button class="toggle-button" type="button" aria-label="${expandToggleDictionary.get(i18n, "toggleRowDetails")}" aria-expanded="false">
      <slot>
        <jb-icon-triangle class="arrow-icon" direction="inline-end"></jb-icon-triangle>
      </slot>
    </button>
      `;
}
