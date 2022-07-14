import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
  useState
} from "react";

import { PartialDeep } from 'type-fest';
import { CalendarState } from "./types";

import CalendarContext from "./Context";
import merge from 'lodash/merge';
import isEqual from 'lodash/isEqual';
import calendarReducer from "./reducer";
import initialState from "./initialState";
import locales from "./locales";

export interface CalendarProviderProps{
  calendar?: PartialDeep<CalendarState>;
  translation?: Record<string, string>;
}

const CalendarProvider: FC<PropsWithChildren<CalendarProviderProps>> = props => {

  const { calendar, children } = props;
  
  const [ currentState, setCurrentState ] = useState(() => {
    const state = merge({}, initialState, calendar);
    const originTrans = locales[state.config.lang];
    const combineTrans = merge({}, originTrans, state.config.translation);
    return merge(state, { config: { translation: combineTrans } });
  });
  
  const [ state ] = useReducer(calendarReducer, merge({}, initialState, currentState));

  useEffect(() => {
    const newState = merge({}, currentState, calendar)
    isEqual(newState, currentState) || setCurrentState(newState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ calendar,  ]);

  const trans = (key: string) => state.config.translation[key] ?? key;

  return <CalendarContext.Provider value={{
    state,
    t: trans
  }}>
    { children }
  </CalendarContext.Provider>

}

export default CalendarProvider;