// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties } from "react";
import isUndefined from 'lodash/isUndefined';
import toCamelCase from "./toCamelCase";
import prefixStyle from "./prefixStyle";
import addPxToStyle from "./addPxToStyle";
import merge from "lodash/merge";

const cache = { float: 'cssFloat' };

function detect(cssProp: keyof CSSProperties){
  var camel = toCamelCase(cssProp as string);
  var result = prefixStyle(camel as keyof CSSProperties);
  cache[camel as keyof typeof cache] = 
    cache[cssProp as keyof typeof cache] = 
    cache[result as keyof typeof cache] = result as string;

  return result
}

export default function cssProperty<T extends keyof CSSProperties>(
  element: HTMLElement, 
  property: T, 
  value?: CSSProperties[T]
){
  let camel = cache[property as keyof typeof cache];
  if (isUndefined(camel)) camel = detect(property) as string;

  if (camel){
    if (isUndefined(value)){
      return element.style[camel as keyof CSSStyleDeclaration];
    }

    merge(element.style, { [camel]: addPxToStyle(camel, value) });
  }
}

// Source Github: https://github.com/mattdesl/dom-css