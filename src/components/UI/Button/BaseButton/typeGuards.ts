import type { TAsProps, TProps } from '../types';

/**
 * Type guards for implicit props types in factory BaseButton. Depends on "as" props
 */
export const isAnchor = (props: TProps<TAsProps>): props is TProps<'a'> => props.as === 'a';
export const isButton = (props: TProps<TAsProps>): props is TProps<'button'> => !props.as || props.as === 'button';
