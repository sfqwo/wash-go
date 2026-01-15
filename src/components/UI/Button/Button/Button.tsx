import clsx from "clsx";
import {
  forwardRef, memo, cloneElement, Children, isValidElement,
} from "react";
import type { Ref, ForwardedRef, FC } from "react";

import { BaseButton } from "../BaseButton";
import type { TAsProps, TButtonRef } from "../types";

import styles from "./Button.module.scss";
import {
  isButtonPrimary,
  isButtonSecondary,
  isAsAnchor,
  isAsButton,
} from "./typeGuards";
import type {
  TButtonProps,
  TOmitButtonCommonProps,
  TButtonChildrenProps,
} from "./types";

const ButtonChildren: FC<TButtonChildrenProps> = ({
  children,
  asChild,
  ...rest
}) => {
  if (asChild && children && isValidElement(children)) {
    if (Children.count(children) > 1) {
       
      console.error("Only one child allowed");
      return null;
    }
    return cloneElement(
      children,
      {
        ...rest,
      },
      <>
        {children}
      </>,
    );
  }

  return (
    <>
      {children}
    </>
  );
};

const ButtonWithoutCommonProps = forwardRef<TButtonRef<"a" | "button">, TOmitButtonCommonProps>(
  (props, ref) => {
    if (isAsAnchor(props)) {
      return (
        <BaseButton {...props} ref={ref as Ref<TButtonRef<"a">>}>
          <ButtonChildren asChild={props.asChild}>
            {props.children}
          </ButtonChildren>
        </BaseButton>
      );
    }

    if (isAsButton(props)) {
      return (
        <BaseButton {...props} ref={ref as Ref<TButtonRef<"button">>}>
          <ButtonChildren asChild={props.asChild}>
            {props.children}
          </ButtonChildren>
        </BaseButton>
      );
    }

     
    console.error('mismatch "as" props.');
    return null;
  },
);
ButtonWithoutCommonProps.displayName = "@UI/ButtonWithoutCommonProps";

const Button = forwardRef(
  <T extends TAsProps = "button">(props: TButtonProps<T>, ref?: Ref<TButtonRef<T>>) => {
    const clsxButton = clsx(
      styles.root,
      props.className,
      props.variant && styles[`${props.variant}Variant`],
      props.disabled && styles.disabled,
    );

    if (isButtonPrimary(props)) {
      const { variant, gradient = "blueRadial", size = "M", ...rest } = props;

      return (
        <ButtonWithoutCommonProps
          {...rest}
          className={clsxButton}
          data-gradient={gradient}
          data-variant={variant}
          size={size}
          ref={ref}
        />
      );
    }

    if (isButtonSecondary(props)) {
      const { variant, appearance = "outlined", size = "M", ...rest } = props;

      return (
        <ButtonWithoutCommonProps
          {...rest}
          className={clsxButton}
          data-variant={variant}
          data-appearance={appearance}
          size={size}
          ref={ref}
        />
      );
    }

     
    console.error("Button variant mismatch");
    return null;
  },
);
Button.displayName = "@UI/Button";

export default memo(Button) as <T extends TAsProps = "button">(
  props: TButtonProps<T> & {
    ref?: ForwardedRef<TButtonRef<T>>;
  },
) => ReturnType<typeof BaseButton>;
