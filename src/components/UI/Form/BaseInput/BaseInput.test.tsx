import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BaseInput from "./BaseInput";

describe("BaseInput", () => {
  it("renders an input by default and sets data-filled", () => {
    render(<BaseInput id="username" defaultValue="John Doe" aria-label="username" />);

    const input = screen.getByLabelText("username");
    expect(input.tagName).toBe("INPUT");
    expect(input.dataset.filled).toBe("true");
    expect(screen.queryByLabelText("Character count")).toBeNull();
  });

  it("renders a textarea with a character counter", () => {
    render(
      <BaseInput tag="textarea" id="message" aria-label="message" defaultValue="" maxLength={120}>
        <span>extra</span>
      </BaseInput>,
    );

    const textarea = screen.getByLabelText("message");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea.dataset.filled).toBe("false");
    expect(textarea).toHaveAttribute("maxLength", "120");

    const counter = screen.getByLabelText("Character count");
    expect(counter).toHaveTextContent("0/120");
  });

  it("updates the textarea counter as the user types", () => {
    render(<BaseInput tag="textarea" id="notes" aria-label="notes" defaultValue="Hi" maxLength={10} />);

    const textarea = screen.getByLabelText("notes");
    const counter = screen.getByLabelText("Character count");
    expect(counter).toHaveTextContent("2/10");

    fireEvent.change(textarea, { target: { value: "Welcome" } });
    expect(counter).toHaveTextContent("7/10");
  });
});
