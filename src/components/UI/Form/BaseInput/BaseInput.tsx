"use client";
import clsx from "clsx";
import { forwardRef, useState } from "react";
import type { Ref, ForwardedRef, ChangeEventHandler } from "react";

import styles from "./BaseInput.module.scss";
import { isInput, isTextarea } from "./typeGuards";
import type { TBaseInputProps, TBaseInputRef, TBaseInputTag } from "./types";

const BaseInput = forwardRef(<T extends TBaseInputTag = "input">(
  props: TBaseInputProps<T>, ref?: Ref<TBaseInputRef<T>>,
) => {
  const resolvedValue = String(props.value ?? props.defaultValue ?? "");
  const [symbolsAmount, setSymbolsAmount] = useState(resolvedValue.length);
  const clsxRoot = clsx(styles.root, props.hidden && styles.hidden);
  const isFilled = resolvedValue.trim().length > 0;

  if (isInput(props)) {
    const {
      tag: Tag = "input",
      type = "text",
      id = "input",
      children,
      defaultValue,
      ...rest
    } = props;

    return (
      <div className={clsxRoot}>
        <Tag
          id={id}
          ref={ref as Ref<HTMLInputElement>}
          type={type}
          data-filled={isFilled}
          defaultValue={defaultValue}
          {...rest}
        />
        {children}
      </div>
    );
  }

  if (isTextarea(props)) {
    const {
      tag: Tag = "textarea",
      id = "textarea",
      children,
      wrap = "soft",
      defaultValue,
      maxLength = 300,
      onChange,
      ...rest
    } = props;

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setSymbolsAmount(e.target.value.trim().length);
      onChange?.(e);
    };

    return (
      <div className={clsxRoot}>
        <Tag
          id={id}
          wrap={wrap}
          ref={ref as Ref<HTMLTextAreaElement>}
          data-filled={isFilled}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          {...rest}
        />
        {children}
        <span
          aria-label="Character count"
          aria-live="polite"
          aria-atomic="true"
          className={styles.counter}
        >
          {symbolsAmount}
          /
          {maxLength}
        </span>
      </div>
    );
  }
   
  console.error('BaseInput "Tag" mismatch');
  return null;
});

BaseInput.displayName = "@UI/Form/BaseInput";

export default BaseInput as <T extends TBaseInputTag = "input">(
  props: TBaseInputProps<T> & {
    ref?: ForwardedRef<TBaseInputRef<T>>;
  },
) => ReturnType<typeof BaseInput>;
