import React, { useEffect, useImperativeHandle, useRef } from 'react';
import 'jb-grid';
import { useEvent } from 'jb-core/react';
import type { JBPaginationInfoAttributes } from './module-declaration.js';

type JBPaginationInfoWebComponent = HTMLElement & {
  pageSize: number,
  pageSizes: number[],
  startItemIndex: number,
  endItemIndex: number,
  totalItemsCount: number,
  pageItemCountTitle: string,
  fromLabel: string,
  currentAvailableItemTitle: string,
  showPersianNumber: boolean
}
type JBPaginationInfoPageSizeChangeEvent = CustomEvent<{
  pageSize: number
}>

export type PaginationInfoProps = Omit<JBPaginationInfoAttributes, "onPageSizeChange" | "ref"> & {
  pageSize: number,
  pageSizes?: number[],
  startItemIndex: number,
  endItemIndex: number,
  totalItemsCount: number,
  pageItemCountTitle?: string,
  fromLabel?: string,
  currentAvailableItemTitle?: string,
  showPersianNumber?: boolean,
  onPageSizeChange?: (event: JBPaginationInfoPageSizeChangeEvent) => void
}

export const JBPaginationInfo = React.forwardRef<JBPaginationInfoWebComponent | null, PaginationInfoProps>((props, ref) => {
  const {
    pageSize,
    pageSizes,
    startItemIndex,
    endItemIndex,
    totalItemsCount,
    pageItemCountTitle,
    fromLabel,
    currentAvailableItemTitle,
    showPersianNumber,
    onPageSizeChange,
    ...otherProps
  } = props;
  const element = useRef<JBPaginationInfoWebComponent | null>(null);
  useImperativeHandle(ref, () => element.current as JBPaginationInfoWebComponent, [element]);
  useEvent(element, 'page-size-change', onPageSizeChange);

  useEffect(() => {
    if (element.current) {
      element.current.showPersianNumber = showPersianNumber === true;
      element.current.pageSize = pageSize;
      element.current.pageSizes = pageSizes ?? [20, 30, 50, 100];
      element.current.startItemIndex = startItemIndex;
      element.current.endItemIndex = endItemIndex;
      element.current.totalItemsCount = totalItemsCount;
      element.current.pageItemCountTitle = pageItemCountTitle ?? "";
      element.current.fromLabel = fromLabel ?? "";
      element.current.currentAvailableItemTitle = currentAvailableItemTitle ?? "";
    }
  }, [pageSize, pageSizes, startItemIndex, endItemIndex, totalItemsCount, pageItemCountTitle, fromLabel, currentAvailableItemTitle, showPersianNumber]);

  return (
    <jb-pagination-info ref={element} {...otherProps}></jb-pagination-info>
  );
});

JBPaginationInfo.displayName = "JBPaginationInfo";
