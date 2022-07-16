import React, { HTMLAttributes } from "react";
import { ClickOutsideEvent } from "../useOnClickOutside";
export interface PopoverRef extends HTMLDivElement {
}
export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean;
    onClose?(e: ClickOutsideEvent): void;
    anchor: HTMLElement;
    anchorPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    width?: number;
    height?: number;
}
declare const Popover: React.ForwardRefExoticComponent<PopoverProps & {
    children?: React.ReactNode;
} & React.RefAttributes<PopoverRef>>;
export default Popover;
