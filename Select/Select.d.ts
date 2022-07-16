import React, { HTMLAttributes } from "react";
export interface SelectRef extends HTMLDivElement {
}
export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<SelectRef>>;
export default Select;
