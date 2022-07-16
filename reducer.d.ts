import { Reducer } from "react";
import { CalendarState } from "./types";
import CalendarAction from "./Action";
export interface CalendarReducer extends Reducer<CalendarState, CalendarAction> {
}
declare const calendarReducer: CalendarReducer;
export default calendarReducer;
