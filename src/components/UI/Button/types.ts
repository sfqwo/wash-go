import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type TAnchorElementProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export type TButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type TAsProps = "a" | "button";

export type TProps<T extends TAsProps> = {
  as?: T;
} & (T extends "button" ? TButtonElementProps : TAnchorElementProps);

export type TButtonRef<T extends TAsProps = "button"> = T extends "button"
  ? HTMLButtonElement
  : HTMLAnchorElement;

export type TSize = "S" | "M";
