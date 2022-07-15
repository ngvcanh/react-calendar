import { RefObject } from "react";
import { ScrollbarValues } from "./types";

export function getValues(viewRef: RefObject<HTMLDivElement>): ScrollbarValues{
  const {
      scrollLeft = 0,
      scrollTop = 0,
      scrollWidth = 0,
      scrollHeight = 0,
      clientWidth = 0,
      clientHeight = 0
  } = viewRef.current || {};

  return {
      left: (scrollLeft / (scrollWidth - clientWidth)) || 0,
      top: (scrollTop / (scrollHeight - clientHeight)) || 0,
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight
  };
}