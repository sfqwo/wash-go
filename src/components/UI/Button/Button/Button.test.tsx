import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";
import styles from "./Button.module.scss";

describe("Button", () => {
  it("renders children content", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies the variant class", () => {
    render(<Button variant="secondary">Save</Button>);
    const button = screen.getByRole("button", { name: /save/i });
    expect(button.classList.contains(styles.secondary)).toBe(true);
    expect(button.classList.contains(styles.root)).toBe(true);
  });

  it("fires the onClick handler", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
