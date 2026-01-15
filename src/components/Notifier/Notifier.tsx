"use client";
import * as ToastPrimitive from "@radix-ui/react-toast";
import type { ToastProps } from "@radix-ui/react-toast";
import clsx from "clsx";
import type { FC } from "react";
import {
  forwardRef, useState, useImperativeHandle, useRef, useEffect, useCallback, memo,
} from "react";


import styles from "./Notifier.module.scss";
import type {
  ICustomSnackbarContent, IShowMessage, TToastRef, TToastCmpProps,
} from "./types";
import { useTimeout } from "./useTimeout";

const DEFAULT_DURATION = 5000;
const CLOSING_ANIMATION_TIME = 100;
const noop = () => {};

export const ToastProvider = ToastPrimitive.Provider;

const ToastCmp: TToastCmpProps = memo((props) => {
  const {
    duration = DEFAULT_DURATION,
    className,
    onClick,
    variant,
    children,
    ...toastProps
  } = props;
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (evt: never) => {
    closeBtnRef.current?.click();
    onClick?.(evt);
  };

  return (
    <ToastPrimitive.Root
      className={clsx(styles.ToastRoot, styles[`ToastRootVariants_${variant}`], className)}
      {...toastProps}
      duration={duration}
      onClick={handleClick}
    >
      <ToastPrimitive.Description className={styles.ToastDescription}>
        {children}
      </ToastPrimitive.Description>
      <ToastPrimitive.Close
        ref={closeBtnRef}
        className={styles.ToastCloseButton}
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      />
    </ToastPrimitive.Root>
  );
});
ToastCmp.displayName = "@Notifier/ToastCmp";

export const Toast = forwardRef<TToastRef, ToastProps>((props, forwardedRef) => {
  const [messages, setMessages] = useState<Array<ICustomSnackbarContent | undefined>>([]);
  const { start } = useTimeout();

  useImperativeHandle(forwardedRef, () => ({
    publish: (payload) => {
      setMessages((pv) => [...pv, payload]);
    },
  }));

  const handleClose = useCallback((index: number) => (state: boolean) => {
    start(() => {
      if (!state) {
        setMessages((pv) => {
          if (pv.filter(Boolean).length === 1) return [];

          return pv.map((message, messageIndex) => (
            messageIndex === index ? undefined : message
          ));
        });
      }
    }, CLOSING_ANIMATION_TIME);
  }, [start]);

  return (
    <>
      {messages.map((messageContent, index) => {
        const { message, ...rest } = messageContent ?? {};

        return (
          <ToastCmp
            key={index}
            {...props}
            {...rest}
            onOpenChange={handleClose(index)}
          >
            {message}
          </ToastCmp>
        );
      })}
      <ToastPrimitive.Viewport className={styles.ToastViewport} />
    </>
  );
});
Toast.displayName = "@Notifier/Toast";

let showMessageFn: ((props: ICustomSnackbarContent) => void | IShowMessage) | undefined = noop;

export const Notifier: FC = () => {
  const savedRef = useRef<TToastRef>(null);

  useEffect(() => {
    const publish: ((props: ICustomSnackbarContent) => void | IShowMessage) | undefined = savedRef.current?.publish;
    showMessageFn = publish ?? noop;

    return () => {
      showMessageFn = noop;
    };
  }, []);

  return (
    <ToastProvider swipeDirection="up" duration={DEFAULT_DURATION}>
      <Toast ref={savedRef} />
    </ToastProvider>
  );
};

export const showMessage: IShowMessage = (props) => {
  showMessageFn?.(props);
};
