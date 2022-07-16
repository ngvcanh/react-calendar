import { FC, PropsWithChildren } from "react";
import { PartialDeep } from 'type-fest';
import { CalendarState } from "./types";
export interface CalendarProviderProps {
    calendar?: PartialDeep<CalendarState>;
    translation?: Record<string, string>;
}
declare const CalendarProvider: FC<PropsWithChildren<CalendarProviderProps>>;
export default CalendarProvider;
