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
import Transition, { TransitionStatus } from 'react-transition-group/Transition';
import useOnClickOutside, { ClickOutsideEvent } from "../useOnClickOutside";
import isUndefinded from 'lodash/isUndefined';
import mergeClass from "../helpers/mergeClass";
import merge from 'lodash/merge';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

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
    const containerRef = useRef<HTMLDivElement>(null);
    const popResetRef = useRef(false);

    useEffect(() => {
      open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ open ]);

    useEffect(() => {
      isOpen ? resetShow() : resetHide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isOpen ]);

    useEffect(() => {
      isOpen ? resetShow() : resetHide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ popWidth, popHeight ]);

    useEffect(() => {
      if (ref){
        (ref as MutableRefObject<PopoverRef>).current = popRef.current!;
      }

      resetShow();

      return () => {
        resetHide();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetShow = () => {
      if (containerRef.current){
        const { innerWidth, innerHeight } = window;

        if (!popWidth || !popHeight){
          const { scrollWidth, scrollHeight } = containerRef.current;

          setPopWidth(scrollWidth);
          setPopHeight(scrollHeight);
        }
        else if (popWidth > innerWidth - 32 || popHeight > innerHeight - 32){
          setPopWidth(innerWidth - 32);
          setPopHeight(innerHeight - 32);
        }
      }
    }

    const resetHide = () => {
      popResetRef.current = false;

      if (containerRef.current){
        containerRef.current.style.width = '';
        containerRef.current.style.height = '';
      }
    }

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

    const transitionStyles: Record<TransitionStatus, CSSProperties> = {
      entering: { width: popWidth, height: popHeight },
      entered:  { width: popWidth, height: popHeight },
      exiting:  { width: '', height: '' },
      exited:  { width: '', height: '' },
      unmounted: {}
    };

    return <CalendarConsumer>
      {() => {
        if (!isOpen) return null;

        return createPortal(

          <TransitionGroup>
            <CSSTransition timeout={ 500 } classNames="transition">
              <div
                { ...rest }
                style={ merge({}, style, popCss) }
                ref={ popRef }
                className={ boxClass }
              >
                <div 
                  className={ popClass + '-container' } 
                  ref={ containerRef }
                >
                  { children }
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>,
          document.body
        )
      }}
    </CalendarConsumer>

  }
)

Popover.displayName = 'Popover';
export default Popover;