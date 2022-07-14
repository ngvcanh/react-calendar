import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { createPortal } from "react-dom";
import { CalendarConsumer } from "../Context";
import { CSS_CLASS_POPOVER } from "../helpers/constant";
import useOnClickOutside, { ClickOutsideEvent } from "../useOnClickOutside";
import mergeClass from "../helpers/mergeClass";
import isUndefinded from 'lodash/isUndefined';
import merge from 'lodash/merge';

export interface PopoverRef extends HTMLDivElement{}

export interface PopoverProps extends HTMLAttributes<HTMLDivElement>{
  open: boolean;
  onClose?(e: ClickOutsideEvent): void;
  anchor: HTMLElement;
  anchorPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  width?: number;
  height?: number;
}

const { innerWidth, innerHeight } = window;

const Popover = forwardRef<PopoverRef, PropsWithChildren<PopoverProps>>(
  (props, ref) => {

    const {
      className,
      children,
      open,
      onClose,
      anchor,
      anchorPosition = 'bottom-right',
      style,
      width,
      height,
      ...rest
    } = props;

    const [ isOpen, setIsOpen ] = useState(open);
    const [ popWidth, setPopWidth ] = useState(width);
    const [ popHeight, setPopHeight ] = useState(height);
    const popRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ open ]);

    useEffect(() => {
      if (ref){
        (ref as MutableRefObject<PopoverRef>).current = popRef.current!;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useOnClickOutside(popRef, e => {
      setIsOpen(false);
      onClose && onClose(e);
    });

    const popCss = useMemo(() => {
      const rs: CSSProperties = {};
      if (!isOpen) return {};

      const { top, left, bottom, right } = anchor.getBoundingClientRect();
      
      switch(anchorPosition){
        
        case 'bottom-left':
          merge(rs, { top: bottom, left });
          break;

        case 'top-left':
          merge(rs, { bottom: innerHeight - bottom, left });
          break;

        case 'top-right':
          merge(rs, { bottom: top, right: innerWidth - right });
          break;

        default:
          merge(rs, { top: bottom, right: innerWidth - right });

      }

      return rs;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ anchor, isOpen ]);
  
    const popClass = mergeClass(CSS_CLASS_POPOVER);
    const boxClass = mergeClass(CSS_CLASS_POPOVER, className);

    !isUndefinded(popWidth) && popWidth > 0 && merge(popCss, { width: popWidth });
    !isUndefinded(popHeight) && popHeight > 0 && merge(popCss, { height: popHeight });

    return <CalendarConsumer>
      {() => {
        if (!isOpen) return null;

        return createPortal(
          <div
            { ...rest }
            style={ merge({}, style, popCss) }
            ref={ popRef }
            className={ boxClass }
          >
            <div className={ popClass + '-container' }>
              { children }
            </div>
          </div>,
          document.body
        )
      }}
    </CalendarConsumer>

  }
)

Popover.displayName = 'Popover';
export default Popover;