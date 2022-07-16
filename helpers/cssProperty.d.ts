import { CSSProperties } from "react";
export default function cssProperty<T extends keyof CSSProperties>(element: HTMLElement, property: T, value?: CSSProperties[T]): string | number | CSSRule | ((index: number) => string) | ((property: string, value: string | null, priority?: string | undefined) => void) | null | undefined;
