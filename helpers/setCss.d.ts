import { CSSProperties } from "react";
export default function setCss<T extends keyof CSSProperties>(element: HTMLElement, properties: CSSProperties | string | T, value?: CSSProperties[T]): void;
