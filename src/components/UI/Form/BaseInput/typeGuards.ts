import type { TBaseInputProps, TBaseInputTag } from './types';

/**
 * Type guards for implicit props types in factory BaseButton. Depends on "as" props
 */
export const isInput = (props: TBaseInputProps<TBaseInputTag>): props is TBaseInputProps<'input'> => !props.tag || props.tag === 'input';
export const isTextarea = (props: TBaseInputProps<TBaseInputTag>): props is TBaseInputProps<'textarea'> => props.tag === 'textarea';
