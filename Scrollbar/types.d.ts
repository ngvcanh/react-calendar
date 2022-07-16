import { HTMLAttributes } from "react";
import { Property } from 'csstype';
export interface ScrollbarCommonProps {
    autoHide?: boolean;
    autoHideDuration?: number;
    universal?: boolean;
    didMountUniversal?: boolean;
}
export interface ScrollbarHeightProps {
    autoHeight?: boolean;
    autoHeightMin?: Property.MinHeight;
    autoHeightMax?: Property.MaxHeight;
}
export declare type ScrollbarElementVariant = 'horizontal' | 'vertical';
export interface ScrollbarValues {
    top: number;
    left: number;
    clientWidth: number;
    clientHeight: number;
    scrollWidth: number;
    scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
}
export interface ScrollbarCallbackNoneHandle {
    (): void;
}
export interface ScrollbarCallbackHandler {
    (values: ScrollbarValues): void;
}
export interface ScrollbarRequestFrameCallback extends ScrollbarCallbackNoneHandle {
}
export interface ScrollbarRef extends HTMLDivElement {
    getScrollLeft(): number;
    getScrollTop(): number;
    getScrollWidth(): number;
    getScrollHeight(): number;
    getClientWidth(): number;
    getClientHeight(): number;
    getValues(): ScrollbarValues;
}
export interface ScrollbarProps extends HTMLAttributes<HTMLDivElement>, Omit<ScrollbarCommonProps, 'didMountUniversal'>, ScrollbarHeightProps {
    onScrollStart?: ScrollbarCallbackNoneHandle;
    onScrollFrame?: ScrollbarCallbackHandler;
    onScrollStop?: ScrollbarCallbackNoneHandle;
    onUpdate?: ScrollbarCallbackHandler;
    hideTracksWhenNotNeeded?: boolean;
    thumbSize?: number;
    thumbMinSize?: number;
    autoHideTimeout?: number;
}
