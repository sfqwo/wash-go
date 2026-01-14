import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";
import styles from "./Button.module.scss";

describe("Button", () => {
  it("renders a primary button with default gradient and classes", () => {
    render(<Button variant="primary">Call to action</Button>);

    const button = screen.getByRole("button", { name: /call to action/i });
    expect(button).toHaveAttribute("data-variant", "primary");
    expect(button).toHaveAttribute("data-gradient", "greenRadial");
    expect(button).toHaveClass(styles.root);
    expect(button).toHaveClass(styles.primaryVariant);
    expect(button).not.toHaveAttribute("data-appearance");
  });

  it("overrides the gradient and forwards click handlers", () => {
    const onClick = vi.fn();
    render(
      <Button variant="primary" gradient="pinkRadial" onClick={onClick}>
        Submit
      </Button>,
    );

    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute("data-gradient", "pinkRadial");
  });

  it("renders a secondary anchor with the requested appearance", () => {
    render(
      <Button as="a" href="/pricing" variant="secondary" appearance="outlined">
        Pricing
      </Button>,
    );

    const anchor = screen.getByRole("link", { name: /pricing/i });
    expect(anchor).toHaveAttribute("href", "/pricing");
    expect(anchor).toHaveAttribute("data-variant", "secondary");
    expect(anchor).toHaveAttribute("data-appearance", "outlined");
    expect(anchor).toHaveClass(styles.root);
    expect(anchor).toHaveClass(styles.secondaryVariant);
  });

  it("passes button attributes to custom children via asChild", () => {
    render(
      <Button variant="primary" asChild>
        <span data-testid="custom-child">Wrapped</span>
      </Button>,
    );

    const [slot] = screen.getAllByTestId("custom-child");
    expect(slot).toHaveTextContent("Wrapped");
    expect(slot).toHaveAttribute("data-variant", "primary");
    expect(slot).toHaveAttribute("data-gradient", "greenRadial");
    expect(slot).toHaveClass(styles.root);
    expect(slot).toHaveClass(styles.primaryVariant);
  });
});
