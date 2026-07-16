export function renderHTML(): string {
  return /* html */ `
    <div class="jb-viewport-web-component" part="container">
      <slot></slot>
    </div>
  `;
}
