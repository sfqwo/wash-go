import { HTMLAttributes, LabelHTMLAttributes, PropsWithChildren } from "react";
import { TBaseInputProps, TBaseInputTag, TBaseInputRef } from "../BaseInput/types";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TFieldTag = TBaseInputTag;

export type TFieldLabel =  {
  text: string;
  error?: string;
  isError?: boolean;
}

export type TFieldBaseLabel =  string;

export type TFieldProps<T extends TFieldTag> = Optional<TBaseInputProps<T>, 'tag'> & {
  label: TFieldBaseLabel | TFieldLabel;
}

export interface TFieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  value: TFieldBaseLabel | TFieldLabel;
  required?: boolean;
}

export interface TFieldLabelCombinedProps extends TFieldLabelProps {
  value: TFieldLabel;
}

export type TFieldRef<T extends TFieldTag = 'input'> = TBaseInputRef<T>;
