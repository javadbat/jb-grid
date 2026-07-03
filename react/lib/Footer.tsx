import React from 'react';
import type JBGridViewModel from './JBGridViewModel.js';
import CSS from './footer.css?inline';
import { injectCss } from 'jb-core';
import { JBFullscreenIcon, JBPagination, JBPaginationInfo, JBRefreshIcon } from './JBGrid.js';
import type { JBPaginationWebComponent } from 'jb-grid';
import { JBButton } from 'jb-button/react';
injectCss(CSS as unknown as string);
type FooterProps = {
    vm:JBGridViewModel,
    isFullscreen:boolean
}
function Footer(props:FooterProps) {
  const {vm,isFullscreen} = props;
  return (
    <section key={'jb-grid-footer'} className="jb-grid-footer">
      <section className="btn-wrapper-section">
        {
          isFullscreen !== null && isFullscreen !== undefined && (
            <JBButton className="btn full-screen-button" variant="text" onClick={() => vm.onFullScreenBtnClicked(isFullscreen)}>
              <JBFullscreenIcon state={isFullscreen ? "exit" : "enter"} />
            </JBButton>
          )}
        <JBButton className="btn refresh-btn" variant="text" onClick={() => vm.refreshBtnClick()}>
          <JBRefreshIcon ref={vm.elements.refreshIcon} />
        </JBButton>
      </section>
      <section className="page-section">
        <JBPaginationInfo
          pageSize={vm.page.size}
          pageSizes={[20, 30, 50, 100]}
          startItemIndex={vm.metaData.startItemIndex}
          endItemIndex={vm.metaData.endItemIndex}
          totalItemsCount={vm.metaData.totalItemsCount}
          pageItemCountTitle={vm.i18n.messages!.pageItemCount}
          fromLabel={vm.i18n.messages!.from}
          currentAvailableItemTitle={vm.i18n.messages!.currentAvailableItem}
          showPersianNumber={vm.i18n.showPersianNumber}
          onPageSizeChange={(e) => vm.setPageSize(e.detail.pageSize)}
        />
        <section className="navigation-section nav-btn">
          <nav>
            <JBPagination pageIndex={vm.page.index} max={vm.page.totalPages} min={1} onChange={(e)=>vm.goToPage((e.target as JBPaginationWebComponent).pageIndex)} showPersianNumber={vm.i18n.showPersianNumber}/>
          </nav>
        </section>
      </section>

    </section>
  );
}

export default Footer;
