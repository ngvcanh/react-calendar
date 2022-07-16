import React, { HTMLAttributes } from "react";
import { ScrollbarCommonProps, ScrollbarHeightProps } from "./types";
export interface ScrollbarViewRef extends HTMLDivElement {
}
export interface ScrollbarViewProps extends HTMLAttributes<HTMLDivElement>, ScrollbarCommonProps, ScrollbarHeightProps {
}
declare const ScrollbarView: React.ForwardRefExoticComponent<ScrollbarViewProps & {
    children?: React.ReactNode;
} & React.RefAttributes<ScrollbarViewRef>>;
export default ScrollbarView;
