import { CalendarLocaleSupported } from "../locales";
export interface CalendarConfiguration {
    lang: CalendarLocaleSupported;
    translation: Record<string, string>;
}
export interface CalendarState {
    config: CalendarConfiguration;
}
export interface CalendarContextState {
    state: CalendarState;
    t(key: string): string;
}
