export type TBaseInputTag = 'input' | 'textarea';

export type TBaseInputProps<T extends TBaseInputTag> = {
  tag: T;
} & (T extends 'input' ? React.InputHTMLAttributes<HTMLInputElement> : React.TextareaHTMLAttributes<HTMLTextAreaElement>);

export type TBaseInputRef<T extends TBaseInputTag = 'input'> = T extends 'input'
  ? HTMLInputElement
  : HTMLTextAreaElement;
