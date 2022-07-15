import React, { CSSProperties, forwardRef, HTMLAttributes, RefObject, useMemo } from "react";
import { CSS_CLASS_SCROLLBAR } from "../helpers/constant";
import { ScrollbarCommonProps, ScrollbarElementVariant } from "./types";
import mergeClass from "../helpers/mergeClass";
import useScrollbar from "./useScrollbar";
import merge from 'lodash/merge';

export interface ScrollbarTrackRef extends HTMLDivElement{}

export interface ScrollbarTrackProps 
  extends HTMLAttributes<HTMLDivElement>, ScrollbarCommonProps{
    variant: ScrollbarElementVariant;
    thumbRef?: RefObject<HTMLDivElement>;
  }

const ScrollbarTrack = forwardRef<ScrollbarTrackRef, ScrollbarTrackProps>(
  (props, ref) => {

    const {
      autoHide,
      autoHideDuration,
      universal,
      didMountUniversal,
      style,
      variant,
      thumbRef,
      ...rest
    } = props;
    const { getScrollbarWidth } = useScrollbar(props);

    const scrollbarWidth = getScrollbarWidth();
    const sbClass = mergeClass(CSS_CLASS_SCROLLBAR);

    const trackStyle: CSSProperties = useMemo(() => {
      return merge({}, style, {
        ...(autoHide && {
          transition: `opacity ${ autoHideDuration }ms`,
          opacity: 0
        }),
        ...((!scrollbarWidth || (universal && !didMountUniversal)) && {
          display: 'none'
        })
      })
    }, [
      autoHide,
      autoHideDuration,
      scrollbarWidth,
      universal,
      didMountUniversal,
      style
    ]);

    return <div 
      { ...rest }
      className={ `${ sbClass }-${ variant }-track` } 
      style={ trackStyle }
      ref={ ref }
    >
      <div className={ `${ sbClass }-${ variant }-thumb` } ref={ thumbRef } />
    </div>

  }
);

ScrollbarTrack.displayName = 'ScrollbarTrack';
export default ScrollbarTrack;