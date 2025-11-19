
export interface IOption {
  value: string;
  label: string;
}

export interface ISelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: IOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
