// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties } from "react";
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';
import cssProperty from "./cssProperty";

export default function setCss<T extends keyof CSSProperties>(
  element: HTMLElement, 
  properties: CSSProperties | string | T, 
  value?: CSSProperties[T]
){
  if (isString(properties)){
    if (isUndefined(value)){
      element.style.cssText = properties;
    }
    else{
      cssProperty(element, properties as keyof CSSProperties, value);
    }
  }
  else{
    for (const k in properties){
      properties.hasOwnProperty(k) &&
      cssProperty(element, k as keyof CSSProperties, properties[k as keyof CSSProperties]);
    }
  }
}

// Source Github: https://github.com/mattdesl/dom-css
// Source npm: https://www.npmjs.com/package/dom-css