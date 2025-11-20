import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Field from "./Field";

describe("Field", () => {
  it("renders a label from string prop", () => {
    render(
      <Field id="email" label="E-mail" aria-label="E-mail" />,
    );

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
  });

  it("renders complex label with error state", () => {
    render(
      <Field
        id="name"
        label={{
          text: "Name",
          isError: true,
          error: "Name is required",
        }}
        aria-label="Name"
      />,
    );

    const label = screen.getByText(/name is required/i);
    expect(label).toHaveAttribute("data-error", "true");
  });

  it("updates data-filled attribute and calls onChange", () => {
    const handleChange = vi.fn();
    render(
      <Field
        id="notes"
        label="Notes"
        aria-label="Notes"
        onChange={handleChange}
      />,
    );

    const input = screen.getByLabelText(/notes/i);
    fireEvent.change(input, { target: { value: "Some note" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.dataset.filled).toBe("true");
  });
});
