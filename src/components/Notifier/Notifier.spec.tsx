import {
  render, screen, waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import {
  describe, it, beforeAll, beforeEach, expect, vi,
} from "vitest";

import { Notifier, showMessage } from "./Notifier";
import type { ICustomSnackbarContent } from "./types";

describe("Notifier", () => {
  beforeAll(() => {
    Element.prototype.hasPointerCapture = vi.fn<(pointerId: number) => void>();
    Element.prototype.releasePointerCapture = vi.fn<(pointerId: number) => void>();
  });

  beforeEach(() => {
    render(<Notifier />);
  });

  it("renders toast with provided message and variant", async () => {
    const args: ICustomSnackbarContent = {
      variant: "success",
      message: "All done!",
      duration: 20,
    };

    act(() => {
      showMessage(args);
    });

    const toastContent = await screen.findByText(args.message);
    const toastRoot = toastContent.closest("li");

    expect(toastRoot).not.toBeNull();
    await waitFor(() => {
      expect(toastRoot).toHaveAttribute("data-state", "open");
    });
    expect(toastRoot?.className).toContain("ToastRootVariants_success");
  });

  it("calls provided onClick handler when toast is clicked", async () => {
    const handleClick = vi.fn();
    const args: ICustomSnackbarContent = {
      variant: "error",
      message: "Something went wrong",
      onClick: handleClick,
    };

    act(() => {
      showMessage(args);
    });

    const toastContent = await screen.findByText(args.message);
    const toastRoot = toastContent.closest("li");
    expect(toastRoot).not.toBeNull();

    const user = userEvent.setup();
    await user.click(toastRoot as Element);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders multiple toasts when showMessage called repeatedly", async () => {
    const notifications: ICustomSnackbarContent[] = [
      { variant: "success", message: "First toast" },
      { variant: "error", message: "Second toast" },
      { variant: "success", message: "Third toast" },
    ];

    act(() => {
      notifications.forEach((args) => {
        showMessage(args);
      });
    });

    await Promise.all(
      notifications.map((args) => screen.findByText(args.message)),
    );

    await waitFor(() => {
      const openToasts = document.querySelectorAll('li[data-state="open"]');
      expect(openToasts).toHaveLength(notifications.length);
    });
  });
});
