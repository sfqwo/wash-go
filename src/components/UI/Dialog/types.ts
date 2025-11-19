import type { DialogContentProps, DialogProps } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export interface IDialogContent extends Omit<DialogContentProps, "content"> {
  description: string;
};

export interface IDialog extends IDialogContent {
  content: ReactNode;
  defaultOpen?: DialogProps["defaultOpen"];
};