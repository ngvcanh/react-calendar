// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { RefObject, useEffect } from "react";

export type ClickOutsideEvent = MouseEvent | TouchEvent;

export interface ClickOutsideEventHandler{
  (event: ClickOutsideEvent): void;
}

export default function useOnClickOutside<
  E extends HTMLElement = HTMLElement
>(
  ref: RefObject<E>, 
  handler: ClickOutsideEventHandler
){

  useEffect(() => {
    const listener = (event: ClickOutsideEvent) => {
      ref.current && !ref.current.contains(event.target as Node) && handler(event);
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    }
  }, [ ref, handler ]);

}