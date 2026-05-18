export function renderHTML(): string {
  return /* html */ `
  <div class="jb-row-web-component">
    <div class="grid-row" part="row">
      <slot name="cell"></slot>
    </div>
    <div class="expand-wrapper --hidden">
      <slot name="expand"></slot>
    </div>
  </div>
      `;
}