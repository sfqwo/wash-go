"use client";
import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef, useRef, useState } from "react";
import type { ChangeEvent, ForwardedRef } from "react";

import BaseInput from "../BaseInput";

import styles from "./Select.module.scss";
import type { ISelectProps } from "./types";

const Select = forwardRef(({
  label, options, value: valueProp, onChange, ...props
}: ISelectProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [value, setValue] = useState(valueProp || "");
  const rootRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (val: string) => {
    if (!rootRef.current) return;
    setValue(val);

    const event = new Event("change", { bubbles: true });
    Object.defineProperty(event, "target", {
      value: { name, value: val },
      writable: false,
    });

    rootRef.current.dispatchEvent(event);
    onChange?.(event as unknown as ChangeEvent<HTMLInputElement | HTMLSelectElement>);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <RadixSelect.Root value={value} onValueChange={handleValueChange}>
        <RadixSelect.Trigger className={styles.selectControl}>
          <RadixSelect.Value placeholder={label} />
          <RadixSelect.Icon className={styles.icon} />
        </RadixSelect.Trigger>
        <BaseInput tag='input' ref={ref} hidden { ...props}>{value} </BaseInput>

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
