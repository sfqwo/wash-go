import type { ToastProps } from "@radix-ui/react-toast";
import type { FC } from "react";

export interface INotifierProps {
  open: boolean;
  message: string;
  variant: "error" | "success";
  onClick?: () => void;
  duration?: number;
}

export interface ICustomSnackbarContent {
  message: string;
  variant?: INotifierProps["variant"];
  onClick?: INotifierProps["onClick"];
  duration?: INotifierProps["duration"];
}

export interface IShowMessage {
  (props: ICustomSnackbarContent): void;
}

export type TToastRef = {
  publish: (props: ICustomSnackbarContent) => void | IShowMessage;
};

export type TToastCmpProps = FC<ToastProps & Omit<ICustomSnackbarContent, "message" | "onClick">>;
