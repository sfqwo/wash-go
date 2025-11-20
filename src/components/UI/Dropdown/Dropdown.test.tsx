import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { Dropdown, DropdownItem } from "./Dropdown";

describe("Dropdown", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("renders trigger content and toggles dropdown menu", async () => {
    render(
      <Dropdown content={<div data-testid="menu-content">Menu Item</div>}>
        <button>Toggle menu</button>
      </Dropdown>
    );

    expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));

    expect(await screen.findByTestId("dropdown-content")).toBeInTheDocument();
  });

  it("closes the menu after selecting an item", async () => {
    render(
      <Dropdown
        content={
          <div>
            <DropdownItem>
              <button type="button">Profile</button>
            </DropdownItem>
          </div>
        }
      >
        <button type="button">Open menu</button>
      </Dropdown>
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    const profileButton = await screen.findByText(/profile/i);
    await user.click(profileButton);

    await waitFor(() => {
      expect(screen.queryByTestId("dropdown-content")).toBeNull();
    });
  });
});
