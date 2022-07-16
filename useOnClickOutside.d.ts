import { RefObject } from "react";
export declare type ClickOutsideEvent = MouseEvent | TouchEvent;
export interface ClickOutsideEventHandler {
    (event: ClickOutsideEvent): void;
}
export default function useOnClickOutside<E extends HTMLElement = HTMLElement>(ref: RefObject<E>, handler: ClickOutsideEventHandler): void;
