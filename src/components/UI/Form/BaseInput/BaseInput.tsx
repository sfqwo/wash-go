import clsx from "clsx";
import { forwardRef } from "react";
import type { Ref, ForwardedRef } from "react";

import type { TBaseInputProps, TBaseInputRef, TBaseInputTag } from "./types";
import { isInput, isTextarea } from "./typeGuards";
import styles from "./BaseInput.module.scss";

const BaseInput = forwardRef(<T extends TBaseInputTag = 'input'>(
  props: TBaseInputProps<T>, ref?: Ref<TBaseInputRef<T>>,
) => {
  const clsxRoot = clsx(styles.root, props.hidden && styles.hidden);

  if (isInput(props)) {
    const {
      tag: Tag = 'input',
      type = "text",
      id = 'input',
      children,
      ...rest
    } = props;

    return (
      <div className={clsxRoot}>
        <Tag
          id={id}
          ref={ref as Ref<HTMLInputElement>}
          type={type}
          data-filled={!!rest.value}
          {...rest}
        />
        {children}
      </div>
    )
  }

  if (isTextarea(props)) {
    const {
      tag: Tag = 'textarea',
      id = 'textarea',
      children,
      wrap = "soft",
      ...rest
    } = props;

    return (
      <div className={clsxRoot}>
        <Tag
          id={id}
          wrap={wrap}
          ref={ref as Ref<HTMLTextAreaElement>}
          data-filled={!!rest.value}
          {...rest}
        />
        {children}
      </div>
    )
  }
  // eslint-disable-next-line no-console
  console.error('BaseInput "Tag" mismatch');
  return null;
});

BaseInput.displayName = '@UI/Form/BaseInput';

export default BaseInput as <T extends TBaseInputTag = 'input'>(
  props: TBaseInputProps<T> & {
    ref?: ForwardedRef<TBaseInputRef<T>>;
  },
) => ReturnType<typeof BaseInput>;
