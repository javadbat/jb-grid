import React, { type PropsWithChildren } from 'react';
import './ExpandRow.scss';
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
