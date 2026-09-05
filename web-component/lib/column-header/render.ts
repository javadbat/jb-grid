export function renderHTML(): string {
  return /* html */ `
    <div class="column-header">
      <span class="caption-wrapper" part="title">
        <slot name="title"></slot>
      </span>
      <span class="sort-icon-wrapper" part="sort-icon" aria-hidden="true">
        <jb-icon-arrow-tailed direction="up" long></jb-icon-arrow-tailed>
      </span>
    </div>
      `;
}
