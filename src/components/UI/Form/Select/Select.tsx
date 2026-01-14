"use client";
import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef, useState } from "react";
import type { ChangeEvent, ForwardedRef } from "react";

import BaseInput from "../BaseInput";

import styles from "./Select.module.scss";
import type { ISelectProps } from "./types";

const Select = forwardRef(({
  label,
  options,
  value: valueProp,
  defaultValue,
  onChange,
  name,
  ...props
}: ISelectProps, ref: ForwardedRef<HTMLInputElement>) => {
  const initialValue = (valueProp ?? defaultValue ?? options[0].value) as string;
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (val: string) => {
    setValue(val);

    if (!onChange) return;

    const syntheticEvent = {
      target: { name, value: val },
      currentTarget: { name, value: val },
    } as ChangeEvent<HTMLInputElement | HTMLSelectElement>;

    onChange(syntheticEvent);
  };

  return (
    <div className={styles.root}>
      <RadixSelect.Root value={value} onValueChange={handleValueChange}>
        <RadixSelect.Trigger className={styles.selectControl}>
          <RadixSelect.Value placeholder={label} />
          <RadixSelect.Icon className={styles.icon} />
        </RadixSelect.Trigger>
        <BaseInput
          tag="input"
          ref={ref}
          hidden
          name={name}
          value={value}
          defaultValue={defaultValue}
          readOnly
          {...props}
        />

        <RadixSelect.Portal>
          <RadixSelect.Content className={styles.dropdown} align="center" side="right">
            <RadixSelect.Viewport>
              {options.map((opt) => (
                <RadixSelect.Item key={opt.value} value={opt.value} className={styles.option}>
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator>✔</RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
});

Select.displayName = "@UI/Form/Select";
export default Select;
