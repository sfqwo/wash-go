import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

export interface ISection extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>>{
  bg?: 'white' | 'gray' | 'blue' | 'yellow' | 'green' | 'black';
  as?: 'header' | 'footer' | 'section';
}