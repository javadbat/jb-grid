export function renderHTML(): string {
  return /* html */ `
    <div class="content-error" part="container">
      <slot name="icon">
        <div class="error-image" part="icon" aria-hidden="true">😬😓🤔</div>
      </slot>
      <slot name="title">
        <div class="error-title" part="title"></div>
      </slot>
      <slot name="message">
        <div class="error-message" part="message"></div>
      </slot>
      <slot name="refresh-button">
        <jb-button class="refresh-button" part="refresh-button" color="primary">
          <span class="refresh-button-title"></span>
        </jb-button>
      </slot>
    </div>
  `;
}
