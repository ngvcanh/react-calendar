// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Reducer } from "react";
import { CalendarState } from "./types";
import CalendarAction from "./Action";
import merge from 'lodash/merge';

export interface CalendarReducer extends Reducer<CalendarState, CalendarAction>{}

const calendarReducer: CalendarReducer = (state, action) => {

  const newState = merge({}, state);

  switch(action.type){

    default:
      return newState;

  }

}

export default calendarReducer;