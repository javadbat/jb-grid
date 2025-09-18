import React, { type PropsWithChildren } from 'react';
import CSS from './expand-row.css';
import { injectCss } from 'jb-core';

injectCss(CSS as unknown as string);
function ExpandRow(props:Props) {
    return (
        <section className={'jb-grid-expand-row' + (props.show?'':' --hidden')}>
            <div className={'expand-row-content' + (props.show?'':' --hidden')}>
                {props.children}
            </div>
        </section>
    );
}
type Props= PropsWithChildren< {
    show:boolean,
}>

export {ExpandRow};
