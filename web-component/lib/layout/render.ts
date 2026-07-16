export function renderHTML(): string {
  return /* html */ `
    <div class="jb-grid-layout-web-component">
      <div class="header" part="header">
        <slot name="header">
          <div class="header-fallback" part="header-fallback">
            <div class="header-start" part="header-start">
              <slot name="header-start"></slot>
            </div>
            <div class="header-end" part="header-end">
              <slot name="header-end"></slot>
            </div>
          </div>
        </slot>
      </div>
      <div class="body" part="body">
        <slot name="body">
          <div class="body-fallback" part="body-fallback">
            <div class="table" part="table" role="table">
              <slot name="table-header"></slot>
              <div class="table-content" part="table-content" role="rowgroup">
                <slot name="body-content"></slot>
              </div>
            </div>
            <slot name="body-error"></slot>
            <slot name="body-loading"></slot>
          </div>
        </slot>
      </div>
      <div class="footer" part="footer">
        <slot name="footer">
          <div class="footer-fallback" part="footer-fallback">
            <div class="footer-start" part="footer-start">
              <slot name="footer-start"></slot>
            </div>
            <div class="footer-end" part="footer-end">
              <slot name="footer-end"></slot>
            </div>
          </div>
        </slot>
      </div>
    </div>
  `;
}
