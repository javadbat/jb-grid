import { i18n } from "jb-core/i18n";
import { paginationDictionary } from "./i18n.js";

export function renderHTML(): string {
  return /* html */ `
  <div class="jb-pagination-web-component">
    <section class="page-navigator">
      <button class="first-page arrow-btn" type="button" aria-label="${paginationDictionary.get(i18n, "firstPage")}">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"></path></svg>
        </button>
        <button class="prev-page arrow-btn" type="button" aria-label="${paginationDictionary.get(i18n, "previousPage")}">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
      </button>
      <div class="page-index-wrapper">
      </div>
      <button class="next-page arrow-btn" type="button" aria-label="${paginationDictionary.get(i18n, "nextPage")}">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
        </button>
      <button class="last-page arrow-btn" type="button" aria-label="${paginationDictionary.get(i18n, "lastPage")}">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"></path></svg>
      </button>
    </section>
  </div>
      `;
}
