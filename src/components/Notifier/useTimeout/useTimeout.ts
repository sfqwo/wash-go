import { useEffect, useRef } from "react";

type TimeoutCallback = () => void;

export const useTimeout = () => {
  const timeoutRef = useRef<number | undefined>(undefined);
  const reset = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
  };
  const start = (fn: TimeoutCallback, timeout: number) => {
    timeoutRef.current = window.setTimeout(fn, timeout);
  };

  useEffect(() => reset, []);

  return { reset, start, id: timeoutRef.current };
};
