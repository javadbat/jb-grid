import { i18n } from "jb-core/i18n";
import { paginationDictionary } from "./i18n.js";

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-pagination-web-component">
    <nav class="page-navigator" aria-label="${paginationDictionary.get(i18n, "navigation")}">
      <jb-button class="first-page arrow-btn" type="button" variant="text" color="dark" aria-label="${paginationDictionary.get(i18n, "firstPage")}">
        <jb-icon-arrow direction="left" end-line></jb-icon-arrow>
      </jb-button>
      <jb-button class="prev-page arrow-btn" type="button" variant="text" color="dark" aria-label="${paginationDictionary.get(i18n, "previousPage")}">
        <jb-icon-arrow direction="left"></jb-icon-arrow>
      </jb-button>
      <div class="page-index-wrapper">
      </div>
      <jb-button class="next-page arrow-btn" type="button" variant="text" color="dark" aria-label="${paginationDictionary.get(i18n, "nextPage")}">
        <jb-icon-arrow direction="right"></jb-icon-arrow>
      </jb-button>
      <jb-button class="last-page arrow-btn" type="button" variant="text" color="dark" aria-label="${paginationDictionary.get(i18n, "lastPage")}">
        <jb-icon-arrow direction="right" end-line></jb-icon-arrow>
      </jb-button>
    </nav>
  </div>
      `;
}
