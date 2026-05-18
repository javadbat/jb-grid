import React, { type HTMLAttributes, type PropsWithChildren } from 'react';

export function ExpandRow(props:Props) {
    const {children,...otherProps} = props;
    return (
       <div slot="expand" {...otherProps}>{children}</div>
    );
}
type Props= PropsWithChildren<React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>>

