import React, { HTMLAttributes, RefObject } from "react";
import { ScrollbarCommonProps, ScrollbarElementVariant } from "./types";
export interface ScrollbarTrackRef extends HTMLDivElement {
}
export interface ScrollbarTrackProps extends HTMLAttributes<HTMLDivElement>, ScrollbarCommonProps {
    variant: ScrollbarElementVariant;
    thumbRef?: RefObject<HTMLDivElement>;
}
declare const ScrollbarTrack: React.ForwardRefExoticComponent<ScrollbarTrackProps & React.RefAttributes<ScrollbarTrackRef>>;
export default ScrollbarTrack;
