import React, { type HTMLAttributes, type PropsWithChildren } from 'react';

export function ExpandRow(props:ExpandRowProps) {
    const {children,...otherProps} = props;
    return (
       <div slot="expand" {...otherProps}>{children}</div>
    );
}
export type ExpandRowProps= PropsWithChildren<React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>>

