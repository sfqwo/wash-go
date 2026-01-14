import type { TAsProps } from "../types";

import type {
  TButtonProps,
  TOmitButtonCommonProps,
  TButtonPrimary,
  TButtonSecondary,
} from "./types";

/**
 * Type guards for implicit props types in factory Button. Depends on "variant" props
 */
export const isButtonPrimary = (props: TButtonProps<TAsProps>): props is TButtonPrimary<TAsProps> => props.variant === "primary";
export const isButtonSecondary = (props: TButtonProps<TAsProps>): props is TButtonSecondary<TAsProps> => props.variant === "secondary";
export const isAsAnchor = (props: TOmitButtonCommonProps): props is TButtonProps<"a"> => props.as === "a";
export const isAsButton = (props: TOmitButtonCommonProps): props is TButtonProps<"button"> => !props.as || props.as === "button";
