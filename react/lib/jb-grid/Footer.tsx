import React from 'react';
import type JBGridViewModel from './JBGridViewModel.js';
import { JBFullscreenIcon } from '../FullscreenIcon.js';
import { JBPagination } from '../Pagination.js';
import { JBPaginationInfo } from '../PaginationInfo.js';
import { JBRefreshIcon } from '../RefreshIcon.js';
import type { JBPaginationWebComponent } from 'jb-grid';
import { JBButton } from 'jb-button/react';
import type { JBGridI18nConfig } from './types.js';
type FooterProps = {
    vm:JBGridViewModel,
    isFullscreen:boolean,
    i18n?: JBGridI18nConfig | null
}
function Footer(props:FooterProps) {
  const {vm,isFullscreen} = props;
  return (
    <>
      {isFullscreen !== null && isFullscreen !== undefined && (
        <JBButton slot="footer-start" variant="ghost" onClick={() => vm.onFullScreenBtnClicked(isFullscreen)}>
          <JBFullscreenIcon state={isFullscreen ? "exit" : "enter"} />
        </JBButton>
      )}
      <JBButton slot="footer-start" variant="ghost" onClick={() => vm.refreshBtnClick()}>
        <JBRefreshIcon ref={vm.elements.refreshIcon} />
      </JBButton>
      <JBPaginationInfo
        slot="footer-end"
        pageSize={vm.page.size}
        pageSizes={[20, 30, 50, 100]}
        startItemIndex={vm.metaData.startItemIndex}
        endItemIndex={vm.metaData.endItemIndex}
        totalItemsCount={vm.metaData.totalItemsCount}
        pageItemCountTitle={props.i18n?.messages?.pageItemCount}
        fromLabel={props.i18n?.messages?.from}
        currentAvailableItemTitle={props.i18n?.messages?.currentAvailableItem}
        showPersianNumber={props.i18n?.showPersianNumber}
        onPageSizeChange={(e) => vm.setPageSize(e.detail.pageSize)}
      />
      <JBPagination slot="footer-end" pageIndex={vm.page.index} max={vm.page.totalPages} min={1} onChange={(e)=>vm.goToPage((e.target as JBPaginationWebComponent).pageIndex)} showPersianNumber={props.i18n?.showPersianNumber}/>
    </>
  );
}

export default Footer;
