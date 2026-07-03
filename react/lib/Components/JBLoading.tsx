import React from 'react';
import CSS from './blob-loading.css?inline';
import { injectCss } from 'jb-core';

injectCss(CSS as unknown as string);
class JBLoading extends React.Component {
    render() {
        const renderDom = (
            <output className="jb-loading" aria-label="Loading">
                <div className="blobs">
                    <div className="blob-center"></div>
                    <div className="blob"></div>
                    <div className="blob"></div>
                    <div className="blob"></div>
                    <div className="blob"></div>
                    <div className="blob"></div>
                    <div className="blob"></div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="style-svg">
                <title>loading svg</title>
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
            </output>
        );
        return (renderDom);
    }
}
export default JBLoading;
