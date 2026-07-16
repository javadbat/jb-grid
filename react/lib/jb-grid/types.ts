export type AnyObject = Record<string,any>
export type JBGridRowData<T extends AnyObject> = T;

export type JBGridResponseData<T extends AnyObject> = {
    pageIndex: number,
    startItemIndex: number,
    endItemIndex: number,
    totalItemsCount: number,
    totalPages: number,
    content: JBGridRowData<T>[],
}
export type JBGridPaginationMeta = {
    startItemIndex: number,
    endItemIndex: number,
    totalItemsCount: number
}
export type JBGridI18nMessage = {
    closeFilters?: string,
    openFilters?: string,
    refresh?: string,
    enterFullscreen?: string,
    exitFullscreen?: string,
    serverErrorText?: string,
    serverErrorTitle?: string,
    serverErrorRefreshButtonTitle?: string,
    currentAvailableItem?: string,
    pageItemCount?:string,
    from?:string
}
export type JBGridI18nConfig = {
    messages?: JBGridI18nMessage,
    showPersianNumber?: boolean
}
export type JBGridRenderContext = Readonly<{
    refreshView: () => void
}>
export type JBGridCallbacks = {
    /**
     * @deprecated use onFullscreen and onExitFullscreen instead
     */
    onFullscreenChange?: (isFullscreen: boolean) => unknown,
    onFullscreen?: () => unknown,
    onPageIndexChange?: (newPageIndex: number) => unknown,
    onPageSizeChange?: (newPageSize: number) => unknown,
    onRefresh?: () => unknown | Promise<unknown>,
    onExitFullscreen?: () => unknown
}
