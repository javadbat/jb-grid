import { i18n } from "jb-core/i18n";
import { gridLoadingDictionary } from "./i18n.js";

export function renderHTML(): string {
  return /* html */ `
    <div class="loading-content" part="content" role="status" aria-label="${gridLoadingDictionary.get(i18n, "loading")}">
      <div class="blobs" part="blobs" aria-hidden="true">
        <div class="blob-center" part="blob-center"></div>
        <div class="blob" part="blob"></div>
        <div class="blob" part="blob"></div>
        <div class="blob" part="blob"></div>
        <div class="blob" part="blob"></div>
        <div class="blob" part="blob"></div>
        <div class="blob" part="blob"></div>
      </div>
      <svg aria-hidden="true" class="filter-definition">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  `;
}
