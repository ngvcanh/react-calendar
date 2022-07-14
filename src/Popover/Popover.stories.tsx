import { ComponentStory } from "@storybook/react";
import React, { useRef, useState } from "react";
import CalendarProvider from "../Provider";
import Popover from "./Popover";

export default {
  title: 'Components/Popover',
  component: Popover
}

const Template: ComponentStory<typeof Popover> = args => {

  const [ open, setOpen ] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = () => setOpen(!open);
  const onClose = () => setOpen(false);

  return <CalendarProvider>
    <button onClick={ onClick } ref={ buttonRef }>Open Popover</button>
    <Popover 
      open={ open } 
      onClose={ onClose } 
      anchor={ buttonRef.current as HTMLButtonElement }
    >
      Content of the popover
    </Popover>
  </CalendarProvider>

}

const Default = Template.bind({});

export { Default }