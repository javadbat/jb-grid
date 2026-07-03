import React from 'react';
import CSS from './content-error.css?inline';
import { injectCss } from 'jb-core';
import { JBButton } from 'jb-button/react';

injectCss(CSS as unknown as string);
type ContentErrorProps = {
    onRefreshBtnClick: () => unknown,
    message?: string,
    title?: string,
    refreshButtonTitle?: string,
}
function ContentError(props: ContentErrorProps) {
    return (
        <div className="content-error">
            <div className="error-image">😬😓🤔</div>
            <div className="error-text" style={{ padding: " 0 0 0 0" }}>{props.title}</div>
            <div className="error-text">{props.message}</div>
            <div className="error-button">
                <JBButton color="positive" onClick={props.onRefreshBtnClick}>{props.refreshButtonTitle}</JBButton>
            </div>
        </div>
    );
}

export default ContentError;
