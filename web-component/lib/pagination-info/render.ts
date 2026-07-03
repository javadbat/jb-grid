export function renderHTML(): string {
  return /* html */ `
    <section class="jb-pagination-info-web-component">
      <section class="page-size-section">
        <select class="page-size-select"></select>
      </section>
      <section class="items-information-section">
        <span class="start-item-index"></span>
        <span>-</span>
        <span class="end-item-index"></span>
        <span class="from-label"></span>
        <span class="total-items-count"></span>
      </section>
    </section>
      `;
}
