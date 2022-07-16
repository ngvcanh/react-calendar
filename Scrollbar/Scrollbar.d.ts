import React from "react";
import { ScrollbarProps, ScrollbarRef } from "./types";
declare const Scrollbar: React.ForwardRefExoticComponent<ScrollbarProps & {
    children?: React.ReactNode;
} & React.RefAttributes<ScrollbarRef>>;
export default Scrollbar;
