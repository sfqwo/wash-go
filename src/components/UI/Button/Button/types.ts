import type { PropsWithChildren } from 'react';

import type { TAsProps } from '../types';
import type { TBaseButtonProps } from '../BaseButton/types';

export const Variants = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export type TVariant = (typeof Variants)[keyof typeof Variants];

export type TButtonPrimary<T extends TAsProps = 'button'> = {
  variant: typeof Variants.Primary;
  gradient?: 'blueRadial' | 'pinkRadial' | 'greenRadial';
} & TBaseButtonProps<T>;

export type TButtonSecondary<T extends TAsProps = 'button'> = {
  variant: typeof Variants.Secondary;
  appearance?: 'simple' | 'outlined' | 'text';
} & TBaseButtonProps<T>;

export type TButtonVariants<T extends TAsProps> =
  | TButtonPrimary<T>
  | TButtonSecondary<T>

export type TButtonCommonProps = {
  /**
   *  Button disabled applyed as .disabled style
   */
  disabled?: boolean;
};

export type TButtonProps<T extends TAsProps = 'button'> = TButtonVariants<T> & TButtonCommonProps;

export type TButtonChildrenProps = PropsWithChildren<{
  asChild?: TButtonProps['asChild'];
}>;

export type TOmitButtonCommonProps = Omit<
  TButtonProps<'a' | 'button'>,
  keyof Omit<TButtonVariants<'a' | 'button'>, 'as'>
>;
