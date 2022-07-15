// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useRef, useState, UIEvent, CSSProperties } from "react";
import requestAnimationFrame, { cancel } from "../helpers/requestAnimationFrame";
import {
  ScrollbarCallbackHandler,
  ScrollbarProps,
  ScrollbarRequestFrameCallback,
  ScrollbarValues
} from "./types";
import { getValues } from "./getValues";
import setCss from "../helpers/setCss";
import isEqual from 'lodash/isEqual';
import isUndefined from "lodash/isUndefined";
import getInnerWidth from "../helpers/getInnerWidth";
import getInnerHeight from "../helpers/getInnerHeight";

export default function useScrollbar(props: ScrollbarProps){

  const [ currentProps, setCurrentProps ] = useState(props);
  const [, updateState] = useState<any>();

  const widthRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const scrollTopRef = useRef(0);
  const lastScrollLeft = useRef(0);
  const lastScrollTop = useRef(0);
  const prevPageXRef = useRef(0);
  const prevPageYRef = useRef(0);

  const scrollingRef = useRef(false);
  const draggingRef = useRef(false);
  const trackMouseOverRef = useRef(false);

  const requestFrameRef = useRef<number>();
  const hideTrackTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const detectScrollingRef = useRef<ReturnType<typeof setInterval>>();

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const horizontalThumbRef = useRef<HTMLDivElement>(null);
  const verticalTrackRef = useRef<HTMLDivElement>(null);
  const verticalThumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isEqual(props, currentProps) || setCurrentProps(props);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props ]);

  useEffect(() => {
    if (isUndefined(document) || !viewRef.current) return;
    viewRef.current.addEventListener('scroll', handleScroll);

    if (!getScrollbarWidth()){
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        viewRef.current?.removeEventListener('scroll', handleScroll);
      }
    }
console.log('herrererer')
    horizontalTrackRef.current?.addEventListener('mouseenter', handleTrackMouseEnter);
    horizontalTrackRef.current?.addEventListener('mouseleave', handleTrackMouseLeave);
    horizontalTrackRef.current?.addEventListener('mousedown', handleHorizontalTrackMouseDown);

    verticalTrackRef.current?.addEventListener('mouseenter', handleTrackMouseEnter);
    verticalTrackRef.current?.addEventListener('mouseleave', handleTrackMouseLeave);
    verticalTrackRef.current?.addEventListener('mousedown', handleVerticalTrackMouseDown);
    
    horizontalThumbRef.current?.addEventListener('mousedown', handleHorizontalThumbMouseDown);
    verticalThumbRef.current?.addEventListener('mousedown', handleVerticalThumbMouseDown);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      viewRef.current?.addEventListener('scroll', handleScroll);
      
      horizontalTrackRef.current?.removeEventListener('mouseenter', handleTrackMouseEnter);
      horizontalTrackRef.current?.removeEventListener('mouseleave', handleTrackMouseLeave);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      horizontalTrackRef.current?.removeEventListener('mousedown', handleHorizontalTrackMouseDown);
      
      verticalTrackRef.current?.removeEventListener('mouseenter', handleTrackMouseEnter);
      verticalTrackRef.current?.removeEventListener('mouseleave', handleTrackMouseLeave);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      verticalTrackRef.current?.removeEventListener('mousedown', handleVerticalTrackMouseDown);
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      horizontalThumbRef.current?.removeEventListener('mousedown', handleHorizontalThumbMouseDown);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      verticalThumbRef.current?.removeEventListener('mousedown', handleVerticalThumbMouseDown);
      
      window.removeEventListener('resize', handleWindowResize);

      teardownDragging();
      requestFrameRef.current && cancel(requestFrameRef.current);

      hideTrackTimeoutRef.current && clearTimeout(hideTrackTimeoutRef.current);
      detectScrollingRef.current && clearInterval(detectScrollingRef.current);
    }
  });

  const forceUpdate = useCallback(() => updateState({}), []);

  const getScrollbarWidth = useCallback((cacheEnabled = true) => {
    if (cacheEnabled && widthRef.current !== 0) return widthRef.current;
    
    if (!isUndefined(document)){
      const div = document.createElement('div');
      setCss(div, {
        width: 100,
        height: 100,
        position: 'absolute',
        top: -9999,
        overflow: 'scroll',
        msOverflowStyle: 'scrollbar'
      });

      document.body.appendChild(div);
      widthRef.current = (div.offsetWidth - div.clientWidth);
      document.body.removeChild(div);
    }
    else{
      widthRef.current = 0;
    }

    return widthRef.current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const raf = (callback: ScrollbarRequestFrameCallback) => {
    if (requestFrameRef.current) cancel(requestFrameRef.current);
    requestFrameRef.current = requestAnimationFrame(() => {
      requestFrameRef.current = undefined;
      callback();
    });
  }

  const getScrollLeftForOffset = (offset: number) => {
    const { scrollWidth = 0, clientWidth = 0 } = viewRef.current ?? {};
    const trackWidth = getInnerWidth(horizontalTrackRef.current!);
    const thumbWidth = getThumbHorizontalWidth();
    return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
  }

  const getScrollTopForOffset = (offset: number) => {
    const { scrollHeight = 0, clientHeight = 0 } = viewRef.current ?? {};
    const trackHeight = getInnerHeight(verticalTrackRef.current!);
    const thumbHeight = getThumbVerticalHeight();
    return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
  }

  const handleWindowResize = () => {
    getScrollbarWidth(false);
    forceUpdate();
  }

  const handleVerticalThumbMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    handleDragStart(event);
    
    const { target, clientY } = event;
    const { offsetHeight } = target as HTMLElement;
    const { top } = (target as HTMLElement).getBoundingClientRect();
    
    prevPageYRef.current = offsetHeight - (clientY - top);
  }

  const handleDrag = (event: MouseEvent) => {
    if (prevPageXRef.current) {
      const { clientX } = event;
      const { left: trackLeft } = horizontalTrackRef.current!.getBoundingClientRect();

      const thumbWidth = getThumbHorizontalWidth();
      const clickPosition = thumbWidth - prevPageXRef.current;
      const offset = -trackLeft + clientX - clickPosition;

      viewRef.current!.scrollLeft = getScrollLeftForOffset(offset);
    }

    if (prevPageYRef.current) {
      const { clientY } = event;
      const { top: trackTop } = verticalTrackRef.current!.getBoundingClientRect();

      const thumbHeight = getThumbVerticalHeight();
      const clickPosition = thumbHeight - prevPageYRef.current;
      const offset = -trackTop + clientY - clickPosition;

      viewRef.current!.scrollTop = getScrollTopForOffset(offset);
    }
    return false;
  }

  const teardownDragging = () => {
    setCss(document.body, { userSelect: '' as CSSProperties['userSelect'] });
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.onselectstart = null;
  }

  const handleDragEndAutoHide = () => currentProps.autoHide && hideTracks();

  const handleDragEnd = () => {
    draggingRef.current = false;
    prevPageXRef.current = prevPageYRef.current = 0;

    teardownDragging();
    handleDragEndAutoHide();
  }

  const setupDragging = () => {
    setCss(document.body, { userSelect: '' as CSSProperties['userSelect'] });
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.onselectstart = () => false;
  }

  const handleDragStart = (event: MouseEvent) => {
    draggingRef.current = true;
    event.stopImmediatePropagation();
    setupDragging();
  }

  const handleHorizontalThumbMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    handleDragStart(event);

    const { target, clientX } = event;
    const { offsetWidth } = target as HTMLElement;

    const { left } = (target as HTMLElement).getBoundingClientRect();
    prevPageXRef.current = offsetWidth - (clientX - left);
  }

  const handleVerticalTrackMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      if (!viewRef.current) return;

      const { target, clientY } = event;
      const { top: targetTop } = (target as HTMLElement).getBoundingClientRect();

      const thumbHeight = getThumbVerticalHeight();
      const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;

      viewRef.current.scrollTop = getScrollTopForOffset(offset);
  }

  const handleHorizontalTrackMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if (!viewRef.current) return;
    
    const { target, clientX } = event;
    const { left: targetLeft } = (target as HTMLElement).getBoundingClientRect();

    const thumbWidth = getThumbHorizontalWidth();
    const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
    viewRef.current.scrollLeft = getScrollLeftForOffset(offset);
  }

  const handleTrackMouseEnter = () => {
    trackMouseOverRef.current = true;
    handleTrackMouseEnterAutoHide();
  }

  const handleTrackMouseEnterAutoHide = () => currentProps.autoHide && showTracks();

  const handleTrackMouseLeave = () => {
    trackMouseOverRef.current = false;
    handleTrackMouseLeaveAutoHide();
  }

  const handleTrackMouseLeaveAutoHide = () => currentProps.autoHide && hideTracks();

  const getThumbHorizontalWidth = () => {
    const { thumbSize, thumbMinSize } = currentProps;
    const { scrollWidth, clientWidth } = viewRef.current!;

    const trackWidth = getInnerWidth(horizontalTrackRef.current!);
    const width = Math.ceil(clientWidth / scrollWidth * trackWidth);

    if (trackWidth <= width) return 0;
    if (thumbSize) return thumbSize;

    return Math.max(width, thumbMinSize ?? 0);
  }

  const getThumbVerticalHeight = () => {
    const { thumbSize, thumbMinSize } = currentProps;
    const { scrollHeight, clientHeight } = viewRef.current!;

    const trackHeight = getInnerHeight(verticalTrackRef.current!);
    const height = Math.ceil(clientHeight / scrollHeight * trackHeight);

    if (trackHeight <= height) return 0;
    if (thumbSize) return thumbSize;

    return Math.max(height, thumbMinSize ?? 0);
  }

  const updateVerticalTrack = (values: ScrollbarValues) => {
    const { clientHeight, scrollHeight } = values;

    setCss(verticalTrackRef.current!, {
      visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
    });
  }

  const updateHorizontalTrack = (values: ScrollbarValues) => {
    const { clientWidth, scrollWidth } = values;

    setCss(horizontalTrackRef.current!, {
      visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
    });
  }

  const updateVerticalThumb = (values: ScrollbarValues) => {
    const { scrollTop, clientHeight, scrollHeight } = values;

    const thumbHeight = getThumbVerticalHeight();
    const trackHeight = getInnerHeight(verticalTrackRef.current!);

    const thumbY = scrollTop / (scrollHeight - clientHeight) * (trackHeight - thumbHeight);

    setCss(verticalThumbRef.current!, {
      height: trackHeight,
      transform: `translateY(${ thumbY }px)`
    });
  }

  const updateHorizontalThumb = (values: ScrollbarValues) => {
    const { scrollLeft, clientWidth, scrollWidth } = values;

    const trackWidth = getInnerWidth(horizontalTrackRef.current!);
    const thumbWidth = getThumbHorizontalWidth();
    const thumbX = scrollLeft / (scrollWidth - clientWidth) * (trackWidth - thumbWidth);

    setCss(horizontalThumbRef.current!, {
      width: thumbWidth,
      transform: `translateX(${ thumbX }px)`
    });
  }

  const updateScrollbar = (callback?: ScrollbarCallbackHandler) => {
    const { hideTracksWhenNotNeeded, onUpdate } = currentProps;
    const values = getValues(viewRef);

    if (getScrollbarWidth()) {
      if (hideTracksWhenNotNeeded){
        updateVerticalTrack(values);
        updateHorizontalTrack(values);
      }

      updateHorizontalThumb(values);
      updateVerticalThumb(values);
    }

    onUpdate && onUpdate(values);
    callback && callback(values);
  }

  const update = (callback?: ScrollbarCallbackHandler) => {
    raf(() => updateScrollbar(callback));
  }

  const showTracks = () => {
    hideTrackTimeoutRef.current && clearTimeout(hideTrackTimeoutRef.current);
    setCss(horizontalTrackRef.current!, { opacity: 1 });
    setCss(verticalTrackRef.current!, { opacity: 1 });
  }

  const hideTracks = () => {
    if (draggingRef.current || scrollingRef.current || trackMouseOverRef.current) return;
    
    const { autoHideTimeout = 1000 } = currentProps;
    clearTimeout(hideTrackTimeoutRef.current);

    hideTrackTimeoutRef.current = setTimeout(() => {
      setCss(horizontalTrackRef.current!, { opacity: 0 });
      setCss(verticalTrackRef.current!, { opacity: 0 });
    }, autoHideTimeout);
  }

  const handleScrollStartAutoHide = () => currentProps.autoHide && showTracks();
  const handleScrollStopAutoHide = () => currentProps.autoHide && hideTracks();

  const handleScrollStart = () => {
    const { onScrollStart } = currentProps;
    if (onScrollStart) onScrollStart();
    handleScrollStartAutoHide();
  }

  const handleScrollStop = () => {
    const { onScrollStop } = currentProps
    onScrollStop && onScrollStop();
    handleScrollStopAutoHide();
  }

  const detectScrolling = () => {
    if (scrollingRef.current) return;

    scrollingRef.current = true;
    handleScrollStart();
    
    detectScrollingRef.current = setInterval(() => {
      if (
        lastScrollLeft.current === scrollLeftRef.current && 
        lastScrollTop.current === scrollTopRef.current
      ){
        clearInterval(detectScrollingRef.current);
        scrollingRef.current = false;
        handleScrollStop();
      }

      lastScrollLeft.current = scrollLeftRef.current;
      lastScrollTop.current = scrollTopRef.current;
    }, 100);
  }

  const handleScroll = (event: Event) => {
    const { onScroll, onScrollFrame } = currentProps;
    onScroll && onScroll(event as unknown as UIEvent<HTMLDivElement>);
    update(values => {
        const { scrollLeft, scrollTop } = values;
        scrollLeftRef.current = scrollLeft;
        scrollTopRef.current = scrollTop;
        onScrollFrame && onScrollFrame(values);
    });
    detectScrolling();
  }

  return {
    getScrollbarWidth,
    getValues: () => getValues(viewRef),
    getThumbHorizontalWidth,
    getThumbVerticalHeight,
    getScrollLeftForOffset,
    update,
    updateScrollbar,
    updateVerticalTrack,
    updateHorizontalTrack,
    updateHorizontalThumb,
    updateVerticalThumb,
    detectScrolling,
    handleScroll,
    handleScrollStart,
    handleScrollStop,
    handleScrollStartAutoHide,
    handleScrollStopAutoHide,
    handleTrackMouseEnter,
    handleTrackMouseEnterAutoHide,
    handleTrackMouseLeave,
    handleTrackMouseLeaveAutoHide,
    handleHorizontalTrackMouseDown,
    handleVerticalTrackMouseDown,
    handleHorizontalThumbMouseDown,
    handleVerticalThumbMouseDown,
    handleDragStart,
    showTracks,
    hideTracks,
    raf,
    scrollbarRef,
    viewRef,
    horizontalTrackRef,
    horizontalThumbRef,
    verticalTrackRef,
    verticalThumbRef,
    scrollLeftRef,
    scrollTopRef,
  }

}