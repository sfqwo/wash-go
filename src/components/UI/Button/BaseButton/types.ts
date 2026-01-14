import type { PropsWithChildren } from 'react';
import type { PrimitivePropsWithRef } from '@radix-ui/react-primitive';

import type { TAsProps, TSize, TProps } from '../types';

export type TAsChild = {
  asChild?: PrimitivePropsWithRef<'button'>['asChild'];
};

export type TDefaultButtonProps = {
  /**
   * Change font, line-height, height
   */
  size?: TSize;
  /**
   * Hides component by styles
   */
  hidden?: boolean;
};

export type TBaseButtonProps<T extends TAsProps = 'button'> = PropsWithChildren<TProps<T>> &
  TDefaultButtonProps &
  TAsChild;
