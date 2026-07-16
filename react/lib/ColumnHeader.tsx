import React, { useEffect, useImperativeHandle, useRef } from 'react';
import 'jb-grid';
import { useEvent } from 'jb-core/react';
import type { JBColumnHeaderAttributes } from './module-declaration.js';

type JBColumnHeaderSort = "asc" | "desc";
type JBColumnHeaderWebComponent = HTMLElement & {
  name: string,
  sortable: boolean,
  sort: JBColumnHeaderSort | null
}
type JBColumnHeaderSortEvent = CustomEvent<{
  name: string,
  sort: JBColumnHeaderSort
}>

export type ColumnHeaderProps = Omit<JBColumnHeaderAttributes, "name" | "onSort" | "ref" | "sort" | "sortable"> & {
  name: string,
  sortable?: boolean,
  sort?: JBColumnHeaderSort,
  onSort?: (event: JBColumnHeaderSortEvent) => void
}

export const JBColumnHeader = React.forwardRef<JBColumnHeaderWebComponent | null, ColumnHeaderProps>((props, ref) => {
  const { children, name, sortable, sort, onSort, ...otherProps } = props;
  const element = useRef<JBColumnHeaderWebComponent | null>(null);
  useImperativeHandle(ref, () => element.current as JBColumnHeaderWebComponent, [element]);
  useEvent(element, 'sort', onSort);

  useEffect(() => {
    if (element.current) {
      element.current.sortable = sortable === true;
      element.current.sort = sort ?? null;
    }
  }, [sortable, sort]);

  return (
    <jb-col-header ref={element} name={name} {...otherProps}>
      <span slot="title">{children}</span>
    </jb-col-header>
  );
});

JBColumnHeader.displayName = "JBColumnHeader";
