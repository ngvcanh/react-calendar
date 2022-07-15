import React, {
  CSSProperties,
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useState
} from "react";
import { ScrollbarCommonProps, ScrollbarProps, ScrollbarRef } from "./types";
import { CSS_CLASS_SCROLLBAR } from "../helpers";
import View, { ScrollbarViewProps } from "./View";
import merge from 'lodash/merge';
import Track from "./Track";
import mergeClass from "../helpers/mergeClass";
import useScrollbar from "./useScrollbar";

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
      hideTracksWhenNotNeeded,
      onScroll,
      onScrollFrame,
      onUpdate,
      ...rest
    } = props;

    const {
      viewRef,
      scrollbarRef,
      horizontalThumbRef,
      horizontalTrackRef,
      verticalThumbRef,
      verticalTrackRef,
      update,
      getValues
    } = useScrollbar(props);

    const [ didMountUniversal ] = useState(universal);

    useEffect(() => {
      if (ref){
        (ref as MutableRefObject<ScrollbarRef>).current = merge({}, scrollbarRef.current, {
          getScrollLeft(){
            return viewRef.current?.scrollLeft ?? 0;
          },
          getScrollTop(){
            return viewRef.current?.scrollTop ?? 0;
          },
          getScrollWidth(){
            return viewRef.current?.scrollWidth ?? 0;
          },
          getScrollHeight(){
            return viewRef.current?.scrollHeight ?? 0;
          },
          getClientWidth(){
            return viewRef.current?.clientWidth ?? 0;
          },
          getClientHeight(){
            return viewRef.current?.clientHeight ?? 0;
          },
          getValues: getValues
        });
      }console.log('hahaha')
      update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sbClass = mergeClass(CSS_CLASS_SCROLLBAR, className);

    const containerStyle: CSSProperties = merge(style, {
      ...(autoHeight && {
        height: 'auto',
        minHeight: autoHeightMin,
        maxHeight: autoHeightMax
      })
    });

    const trackProps: ScrollbarCommonProps = {
      autoHide,
      autoHideDuration,
      universal,
      didMountUniversal
    }

    const viewProps: ScrollbarViewProps = merge({}, trackProps, {
      autoHeight,
      autoHeightMin,
      autoHeightMax
    })

    return <div 
      { ...rest } 
      ref={ scrollbarRef } 
      className={ sbClass } 
      style={ containerStyle }
    >
      <View { ...viewProps } ref={ viewRef }>
        { children }
      </View>
      <Track 
        { ...trackProps } 
        variant="horizontal" 
        ref={ horizontalTrackRef } 
        thumbRef={ horizontalThumbRef } 
      />
      <Track 
        { ...trackProps } 
        variant="vertical" 
        ref={ verticalTrackRef } 
        thumbRef={ verticalThumbRef }
      />
    </div>

  }
)

Scrollbar.displayName = 'Scrollbar';
export default Scrollbar;