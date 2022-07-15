// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties } from "react";

let div: HTMLDivElement | null = null;
const prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ];

export default function prefixStyle(prop: keyof CSSProperties){
  if (!div) div = document.createElement('div');

  const { style } = div;
  if (prop in style) return prop;

  const titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (let i = prefixes.length; i >= 0; --i){
    const name = prefixes[i] + titleCase;
    if (name in style) return name;
  }

  return false;
}

// Source Github: https://github.com/mattdesl/prefix-style
// Source npm: https://www.npmjs.com/package/prefix-style