import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("opens when trigger is clicked", () => {
    render(
      <Dialog
        title="Need Help?"
        description="Let us know how we can help you"
        content={<p>Dialog body content</p>}
      >
        <button type="button">Open dialog</button>
      </Dialog>,
    );

    expect(screen.queryByText(/dialog body content/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /open dialog/i }));

    expect(screen.getByText(/need help/i)).toBeInTheDocument();
    expect(screen.getByText(/dialog body content/i)).toBeInTheDocument();
  });

  it("closes when the close button is pressed", async () => {
    render(
      <Dialog
        title="Support"
        description="Reach out to us"
        content={<p>Support content</p>}
      >
        <button type="button">Launch dialog</button>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole("button", { name: /launch dialog/i }));
    await screen.findByText(/support content/i);

    const closeButton = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/support content/i)).not.toBeInTheDocument();
    });
  });
});
