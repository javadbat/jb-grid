import { i18n } from "jb-core/i18n";
import { expandToggleDictionary } from "../toggle/i18n.js";

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-row-web-component">
    <div class="grid-row" part="row" role="row">
      <slot name="cell"></slot>
    </div>
    <div class="expand-wrapper --hidden" role="row" aria-hidden="true" inert>
      <div class="expand-cell" role="cell">
        <div class="expand-region" role="region" aria-label="${expandToggleDictionary.get(i18n, "rowDetails")}">
          <slot name="expand"></slot>
        </div>
      </div>
    </div>
  </div>
      `;
}
