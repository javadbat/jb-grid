export function renderHTML(): string {
  return /* html */ `
  <div class="jb-table-header-web-component">
    <div class="table-header-row" part="row" role="row">
      <slot></slot>
    </div>
  </div>
      `;
}
