import React, { useEffect, useImperativeHandle, useRef } from 'react';
import 'jb-grid';
import type { JBFullscreenIconAttributes } from './module-declaration.js';

type JBFullscreenIconState = "enter" | "exit";
type JBFullscreenIconWebComponent = HTMLElement & {
  state: JBFullscreenIconState
}

export type FullscreenIconProps = Omit<JBFullscreenIconAttributes, "ref" | "state"> & {
  state?: JBFullscreenIconState
}

export const JBFullscreenIcon = React.forwardRef<JBFullscreenIconWebComponent | null, FullscreenIconProps>((props, ref) => {
  const { state, ...otherProps } = props;
  const element = useRef<JBFullscreenIconWebComponent | null>(null);
  useImperativeHandle(ref, () => element.current as JBFullscreenIconWebComponent, [element]);

  useEffect(() => {
    if (element.current) {
      element.current.state = state ?? "enter";
    }
  }, [state]);

  return <jb-fullscreen-icon ref={element} {...otherProps}></jb-fullscreen-icon>;
});

JBFullscreenIcon.displayName = "JBFullscreenIcon";
