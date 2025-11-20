import { fireEvent, render, screen } from "@testing-library/react";
import type { ChangeEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import Select from "./Select";

const options = [
  { value: "default", label: "Default" },
  { value: "express", label: "Express" },
];

describe("Select", () => {
  it("renders the placeholder label", () => {
    render(
      <Select
        id="plan"
        label="Choose plan"
        options={options}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveTextContent(/choose plan/i);
  });

  it("calls onChange when an option is selected", async () => {
    const handleChange = vi.fn();
    render(
      <Select
        id="plan"
        label="Choose plan"
        options={options}
        onChange={handleChange}
      />,
    );

    const trigger = screen.getByRole("combobox");

    fireEvent.click(trigger);
    const option = await screen.findByText(/express/i);
    fireEvent.click(option);

    expect(trigger).toHaveTextContent(/express/i);
    expect(handleChange).toHaveBeenCalledTimes(1);
    const event = handleChange.mock.calls[0][0] as ChangeEvent<HTMLInputElement>;
    expect(event.target.value).toBe("express");
  });
});
