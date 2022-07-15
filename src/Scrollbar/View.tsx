import React, { CSSProperties, forwardRef, HTMLAttributes, PropsWithChildren, useMemo } from "react";
import { ScrollbarCommonProps, ScrollbarHeightProps } from "./types";
import { CSS_CLASS_SCROLLBAR } from "../helpers/constant";
import mergeClass from "../helpers/mergeClass";
import useScrollbar from "./useScrollbar";
import isString from 'lodash/isString';

export interface ScrollbarViewRef extends HTMLDivElement{}

export interface ScrollbarViewProps 
  extends HTMLAttributes<HTMLDivElement>, ScrollbarCommonProps, ScrollbarHeightProps{}

const ScrollbarView = forwardRef<ScrollbarViewRef, PropsWithChildren<ScrollbarViewProps>>(
  (props, ref) => {

    const {
      children,
      autoHeight,
      autoHeightMin,
      autoHeightMax,
      universal,
      didMountUniversal
    } = props;
    const { getScrollbarWidth } = useScrollbar(props);

    const scrollbarWidth = getScrollbarWidth();
    const sbClass = mergeClass(CSS_CLASS_SCROLLBAR);

    const viewStyle: CSSProperties = useMemo(() => {
      return {
        marginRight: scrollbarWidth ? -scrollbarWidth : 0,
        marginBottom: scrollbarWidth ? -scrollbarWidth : 0,
  
        ...(autoHeight && {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          minHeight: isString(autoHeightMin)
            ? `calc(${autoHeightMin} + ${scrollbarWidth}px)`
            : (autoHeightMin ?? 0) + scrollbarWidth,
          maxHeight: isString(autoHeightMax)
            ? `calc(${autoHeightMax} + ${scrollbarWidth}px)`
            : (autoHeightMax ?? 0) + scrollbarWidth,
  
          ...(universal && !didMountUniversal && {
            minHeight: autoHeightMin,
            maxHeight: autoHeightMax
          })
        }),
  
        ...(universal && !didMountUniversal && {
          overflow: 'hidden',
          marginRight: 0,
          marginBottom: 0,
        })
      }
    }, [
      scrollbarWidth,
      autoHeight,
      autoHeightMin,
      autoHeightMax,
      universal,
      didMountUniversal
    ])

    return <div className={ sbClass + '-view' } style={ viewStyle } ref={ ref }>
      { children }
    </div>

  }
);

ScrollbarView.displayName = 'ScrollbarView';
export default ScrollbarView;