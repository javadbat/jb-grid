export function renderHTML(): string {
  return /* html */ `
  <div class="jb-pagination-web-component">
    <section class="page-navigator">
      <button class="first-page arrow-btn">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><title>first page</title><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"></path></svg>
        </button>
        <button class="prev-page arrow-btn">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><title>prev page</title><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
      </button>
      <div class="page-index-wrapper">
      </div>
      <button class="next-page arrow-btn">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><title>previous page</title><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
        </button>
      <button class="last-page arrow-btn">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><title>last page</title><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"></path></svg>
      </button>
    </section>
  </div>
      `;
}