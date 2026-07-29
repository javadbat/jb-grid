export function renderHTML(): string {
  return /* html */ `
    <div class="column-header" part="button">
      <span class="caption-wrapper" part="caption">
        <slot name="title"></slot>
      </span>
      <span class="sort-icon-wrapper" part="sort-icon" aria-hidden="true">
        <jb-icon-arrow-tailed direction="up" long></jb-icon-arrow-tailed>
      </span>
    </div>
      `;
}
