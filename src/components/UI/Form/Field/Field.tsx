import styles from "./Field.module.scss";
import { TFieldProps, TFieldLabelProps, TFieldRef, TFieldTag, TFieldLabelCombinedProps } from "./types";
import { ForwardedRef, forwardRef, ChangeEvent } from "react";
import BaseInput from "../BaseInput";
import clsx from "clsx";

const LabelRequiredSymbol = ({ required }: Pick<TFieldLabelProps, 'required'>) => {
  if (!required) return null;
  return <span className={styles.label_required}>*</span>;
};

const LabelCombined = ({
  htmlFor,
  required,
  value,
  ...labelAttributes
}: TFieldLabelCombinedProps) => {
  const isLabelError = value?.isError || false;
  const labelText = isLabelError ? value.error : value.text;

  return (
    <label
      htmlFor={htmlFor}
      {...labelAttributes}
      data-error={isLabelError}
    >
      {labelText}
      <LabelRequiredSymbol required={required} />
    </label>
  );
};


export const Label = ({
  htmlFor,
  required,
  value,
  ...labelAttributes
}: TFieldLabelProps) => {
  if (!value) return null;
  const isSimpleLabel = typeof value === 'string';

  if (isSimpleLabel) {
    return (
      <label htmlFor={htmlFor} {...labelAttributes}>
        {value}
        <LabelRequiredSymbol required={required} />
      </label>
    );
  }

  return (
    <LabelCombined
      htmlFor={htmlFor}
      value={value}
      required={required}
      {...labelAttributes}
    />
  );
};

export const Field = forwardRef(<T extends TFieldTag = 'input'>({
  label, tag = 'input', className, required, onChange, ...props
}: TFieldProps<T>, ref?: ForwardedRef<TFieldRef<T>>) => {
  const clsxRoot = clsx(styles.input, className);

  const handleChange = (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => {
    const filled = !!e.target.value.trim();
    e.target.dataset.filled = String(filled);
    onChange?.(e);
  }

  return (
    <BaseInput
      tag={tag as T}
      ref={ref}
      className={clsxRoot}
      required={required}
      onChange={handleChange}
      {...props}
    >
      <Label htmlFor={props.id} required={required} value={label} className={styles.label} />
    </BaseInput>
  )
});

Field.displayName = '@UI/Form/Field';

export default Field as <T extends TFieldTag = 'input'>(
  props: TFieldProps<T> & {
    ref?: ForwardedRef<TFieldRef<T>>;
  },
) => ReturnType<typeof BaseInput>;
