import React, { forwardRef, HTMLAttributes } from "react";
import { CalendarConsumer } from "../Context";
import { CSS_CLASS_SELECT } from "../helpers";
import mergeClass from "../helpers/mergeClass";

export interface SelectRef extends HTMLDivElement{}

export interface SelectProps extends HTMLAttributes<HTMLDivElement>{}

const Select = forwardRef<SelectRef, SelectProps>(
  (props, ref) => {

    const { className, ...rest } = props;

    const selectClass = mergeClass(CSS_CLASS_SELECT, className);

    return <CalendarConsumer>
      {() => {
        return <div 
          { ...rest }
          className={ selectClass }
          ref={ ref }
        ></div>
      }}
    </CalendarConsumer>

  }
)

Select.displayName = 'Select';
export default Select;