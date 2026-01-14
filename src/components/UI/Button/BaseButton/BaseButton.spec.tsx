import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import BaseButton from "./BaseButton";
import styles from "./BaseButton.module.scss";

describe("BaseButton", () => {
  it("renders an anchor when requested", () => {
    render(
      <BaseButton as="a" href="/home" size="M">
        Click me
      </BaseButton>,
    );

    const anchor = screen.getByRole("link", { name: "Click me" });
    expect(anchor.tagName).toBe("A");
    expect(anchor).toHaveAttribute("href", "/home");
    expect(anchor).toHaveAttribute("data-size", "M");
  });

  it("renders a native button by default and forwards click events", () => {
    const handleClick = vi.fn();
    render(<BaseButton onClick={handleClick}>Click me</BaseButton>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button).not.toHaveAttribute("data-size");
  });

  it("applies the hidden class when hidden prop is true", () => {
    render(<BaseButton hidden>Hidden Button</BaseButton>);

    const button = screen.getByText("Hidden Button");
    expect(button).toHaveClass(styles.hidden);
  });

  it("omits hidden class when hidden prop is false or omitted", () => {
    render(
      <>
        <BaseButton>Visible Button</BaseButton>
        <BaseButton hidden={false}>Visible Button with hidden prop</BaseButton>
      </>,
    );

    expect(screen.getByText("Visible Button")).not.toHaveClass(styles.hidden);
    expect(screen.getByText("Visible Button with hidden prop")).not.toHaveClass(styles.hidden);
  });

  it("does not render data-size when size is undefined but adds it when provided", () => {
    render(
      <>
        <BaseButton>Default Button</BaseButton>
        <BaseButton as="a" href="/cta" size="S">
          Sized Link
        </BaseButton>
      </>,
    );

    expect(screen.getByText("Default Button")).not.toHaveAttribute("data-size");
    expect(screen.getByRole("link", { name: "Sized Link" })).toHaveAttribute("data-size", "S");
  });

  it("omits href attribute when an anchor is rendered without an href value", () => {
    render(
      <BaseButton as="a" href="">
        Click me
      </BaseButton>,
    );

    const anchor = screen.getByText("Click me");
    expect(anchor.tagName).toBe("A");
    expect(anchor).not.toHaveAttribute("href");
  });
});
