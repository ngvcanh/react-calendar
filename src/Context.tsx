// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext } from "react";
import { CalendarContextState } from "./types";
import initialState from "./initialState";

const CalendarContext = createContext<CalendarContextState>({
  state: initialState,
  t: () => ''
});

export const CalendarConsumer = CalendarContext.Consumer;
export default CalendarContext;