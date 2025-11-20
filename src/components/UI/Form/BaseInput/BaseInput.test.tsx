import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BaseInput from "./BaseInput";

describe("BaseInput", () => {
  it("renders an input by default and sets data-filled", () => {
    render(<BaseInput id="username" defaultValue="John Doe" aria-label="username" />);

    const input = screen.getByLabelText("username");
    expect(input.tagName).toBe("INPUT");
    expect(input.dataset.filled).toBe("true");
  });

  it("renders a textarea when tag is textarea", () => {
    render(
      <BaseInput tag="textarea" id="message" aria-label="message" defaultValue="">
        <span>extra</span>
      </BaseInput>,
    );

    const textarea = screen.getByLabelText("message");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea.dataset.filled).toBe("false");
  });
});
