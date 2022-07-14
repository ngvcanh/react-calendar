import React from "react";
import Select from "./Select";
import CalendarProvider from "../Provider";
import { ComponentStory } from "@storybook/react";

export default {
  title: 'Components/Select',
  component: Select
}

const Template: ComponentStory<typeof Select> = args => {

  return <CalendarProvider>
    <Select />
  </CalendarProvider>

}

const Default = Template.bind({});

export { Default }