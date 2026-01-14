import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { PromoCarousel } from "./PromoCarousel";

describe("PromoCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders the initial slide", () => {
    render(<PromoCarousel />);
    expect(screen.getByRole("heading", { name: /50% off first order/i })).toBeInTheDocument();
    expect(screen.getByText(/new customers get half off/i)).toBeInTheDocument();
  });

  it("navigates to the next slide when buttons are pressed", () => {
    render(<PromoCarousel />);
    fireEvent.click(screen.getByRole("button", { name: /next slide/i }));
    expect(screen.getByRole("heading", { name: /free pickup & delivery/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /previous slide/i }));
    expect(screen.getByRole("heading", { name: /50% off first order/i })).toBeInTheDocument();
  });

  it("auto advances slides on the timer", () => {
    render(<PromoCarousel />);
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByRole("heading", { name: /free pickup & delivery/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByRole("heading", { name: /premium dry cleaning/i })).toBeInTheDocument();
  });

  it("announces slide changes via aria-live region", () => {
    render(<PromoCarousel />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(/slide 1 of 3/i);

    fireEvent.click(screen.getByRole("button", { name: /next slide/i }));
    expect(status).toHaveTextContent(/slide 2 of 3/i);
  });

  it("allows keyboard arrow navigation regardless of focus", () => {
    render(<PromoCarousel />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: /free pickup & delivery/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByRole("heading", { name: /50% off first order/i })).toBeInTheDocument();
  });
});
