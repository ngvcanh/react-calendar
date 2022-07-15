import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from "react";
import { CSS_CLASS_SCROLLBAR } from "../helpers";
import { Property } from 'csstype';
import mergeClass from "../helpers/mergeClass";
import merge from 'lodash/merge';
import isString from 'lodash/isString';
import useScrollbarWidth from "./useScrollbarWidth";

export interface ScrollbarRef extends HTMLDivElement{}

export interface ScrollbarProps extends HTMLAttributes<HTMLDivElement>{
  autoHeight?: boolean;
  autoHeightMin?: Property.MinHeight;
  autoHeightMax?: Property.MaxHeight;
  universal?: boolean;
  autoHide?: boolean;
  autoHideDuration?: number;
}

const Scrollbar = forwardRef<ScrollbarRef, PropsWithChildren<ScrollbarProps>>(
  (props, ref) => {

    const {
      className,
      children,
      autoHeight,
      autoHeightMin,
      autoHeightMax,
      universal,
      style,
      autoHide,
      autoHideDuration = 200,
      ...rest
    } = props;

    const sbRef = useRef<HTMLDivElement>(null);

    const [ didMountUniversal ] = useState(false);

    useEffect(() => {
      if (ref){
        (ref as MutableRefObject<ScrollbarRef>).current = sbRef.current!;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { getScrollbarWidth } = useScrollbarWidth();

    const sbClass = mergeClass(CSS_CLASS_SCROLLBAR);
    const scrollbarClass = mergeClass(CSS_CLASS_SCROLLBAR, className);

    const containerStyle: CSSProperties = merge({}, style, {
      ...(autoHeight && {
        height: 'auto',
        minHeight: autoHeightMin,
        maxHeight: autoHeightMax
      })
    });

    const scrollbarWidth = getScrollbarWidth();

    const viewStyle: CSSProperties = merge({
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
    });

    const trackHorizontalStyle = {
      ...(autoHide && trackAutoHeightStyle),
      ...((!scrollbarWidth || (universal && !didMountUniversal)) && {
          display: 'none'
      })
    };

    return <div
      { ...rest }
      ref={ sbRef }
      className={ scrollbarClass }
      style={ containerStyle }
    >
      <div className={ sbClass + '-view' } style={ viewStyle }>
        { children }
      </div>
      <div className={ sbClass + '-horizontal-track' }>
        <div className={ sbClass + '-horizontal-thumb' } />
      </div>
      <div className={ sbClass + '-vertical-track' }>
        <div className={ sbClass + 'vertical-thumb' } />
      </div>
    </div>

  }
)

Scrollbar.displayName = 'Scrollbar';
export default Scrollbar;