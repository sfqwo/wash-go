import { forwardRef } from 'react';
import type { ForwardedRef, Ref } from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import clsx from 'clsx';

import type { TAsProps, TButtonRef } from '../types';
import { isAnchor, isButton } from './typeGuards';
import type { TBaseButtonProps } from './types';
import styles from './BaseButton.module.scss';

const PrimitiveAnchor = Primitive.a;
const PrimitiveButton = Primitive.button;

const BaseButton = forwardRef(
  <T extends TAsProps = 'button'>(props: TBaseButtonProps<T>, ref?: Ref<TButtonRef<T>>) => {
    const clsxButton = clsx(styles.root, props.className, props.hidden && styles.hidden);
    if (isAnchor(props)) {
      const {
        children, size, href, ...rest
      } = props;
      return (
        <PrimitiveAnchor
          {...rest}
          className={clsxButton}
          data-size={size}
          href={href || undefined}
          ref={ref as Ref<HTMLAnchorElement>}
        >
          {children}
        </PrimitiveAnchor>
      );
    }

    if (isButton(props)) {
      const {
        type = 'button', disabled, children, size, ...rest
      } = props;
      return (
        <PrimitiveButton
          {...rest}
          type={type}
          disabled={disabled}
          className={clsxButton}
          data-size={size}
          ref={ref as Ref<HTMLButtonElement>}
        >
          {children}
        </PrimitiveButton>
      );
    }

    // eslint-disable-next-line no-console
    console.error('BaseButton "as" mismatch');

    return null;
  },
);

BaseButton.displayName = '@UI/BaseButton';

export default BaseButton as <T extends TAsProps = 'button'>(
  props: TBaseButtonProps<T> & {
    ref?: ForwardedRef<TButtonRef<T>>;
  },
) => ReturnType<typeof BaseButton>;
