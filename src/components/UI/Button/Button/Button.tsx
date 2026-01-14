import {
  forwardRef, memo, cloneElement, Children, isValidElement,
} from 'react';
import type { Ref, ForwardedRef, FC } from 'react';
import clsx from 'clsx';

import { BaseButton } from '../BaseButton';
import type { TAsProps, TButtonRef } from '../types';
import {
  isButtonPrimary,
  isButtonSecondary,
  isAsAnchor,
  isAsButton,
} from './typeGuards';
import type {
  TButtonProps,
  TOmitButtonCommonProps,
  TButtonChildrenProps,
} from './types';
import styles from './Button.module.scss';

const ButtonChildren: FC<TButtonChildrenProps> = ({
  children,
  asChild,
  ...rest
}) => {
  if (asChild && children && isValidElement(children)) {
    if (Children.count(children) > 1) {
      // eslint-disable-next-line no-console
      console.error('Only one child allowed');
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

const ButtonWithoutCommonProps = forwardRef(
  (props: TOmitButtonCommonProps, ref?: Ref<TButtonRef<'a' | 'button'>>) => {
    if (isAsAnchor(props)) {
      return (
        <BaseButton {...props} ref={ref as any}>
          <ButtonChildren asChild={props.asChild}>
            {props.children}
          </ButtonChildren>
        </BaseButton>
      );
    }

    if (isAsButton(props)) {
      return (
        <BaseButton {...props} ref={ref as any}>
          <ButtonChildren asChild={props.asChild}>
            {props.children}
          </ButtonChildren>
        </BaseButton>
      );
    }

    // eslint-disable-next-line no-console
    console.error('mismatch "as" props.');
    return null;
  },
);

const Button = forwardRef(
  <T extends TAsProps = 'button'>(props: TButtonProps<T>, ref?: Ref<TButtonRef<T>>) => {
    const clsxButton = clsx(
      styles.root,
      props.className,
      props.variant && styles[`${props.variant}Variant`],
      props.disabled && styles.disabled,
    );

    if (isButtonPrimary(props)) {
      const { variant, gradient = 'greenRadial', ...rest } = props;

      return (
        <ButtonWithoutCommonProps
          {...rest}
          className={clsxButton}
          data-gradient={gradient}
          data-variant={variant}
          ref={ref}
        />
      );
    }

    if (isButtonSecondary(props)) {
      const { variant, appearance = 'simple', ...rest } = props;

      return (
        <ButtonWithoutCommonProps
          {...rest}
          className={clsxButton}
          data-variant={variant}
          data-appearance={appearance}
          ref={ref}
        />
      );
    }

    // eslint-disable-next-line no-console
    console.error('Button variant mismatch');
    return null;
  },
);

Button.displayName = '@UI/Button';

export default memo(Button) as <T extends TAsProps = 'button'>(
  props: TButtonProps<T> & {
    ref?: ForwardedRef<TButtonRef<T>>;
  },
) => ReturnType<typeof BaseButton>;
