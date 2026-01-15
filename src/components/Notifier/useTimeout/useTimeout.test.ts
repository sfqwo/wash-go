import { renderHook, act } from "@testing-library/react";
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from "vitest";

import { useTimeout } from "./useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("runs the callback after the specified delay", () => {
    const { result } = renderHook(() => useTimeout());
    const callback = vi.fn();

    act(() => {
      result.current.start(callback, 500);
    });

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancels the active timeout when reset is called", () => {
    const { result } = renderHook(() => useTimeout());
    const callback = vi.fn();

    act(() => {
      result.current.start(callback, 300);
    });
    act(() => {
      result.current.reset();
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("clears pending timeouts on unmount", () => {
    const { result, unmount } = renderHook(() => useTimeout());
    const callback = vi.fn();

    act(() => {
      result.current.start(callback, 300);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
