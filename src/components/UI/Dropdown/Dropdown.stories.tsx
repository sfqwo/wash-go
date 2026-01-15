import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/UI/Button";

import { Dropdown, DropdownItem } from "./Dropdown";

const dropdownContent = (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
    <DropdownItem>
      <Button variant="secondary">Profile</Button>
    </DropdownItem>
    <DropdownItem>
      <Button variant="secondary" type="button">Order history</Button>
    </DropdownItem>
    <DropdownItem>
      <Button variant="secondary" type="button">Sign out</Button>
    </DropdownItem>
  </div>
);

const meta: Meta<typeof Dropdown> = {
  title: "UI/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: <Button variant="secondary">Open menu</Button>,
    content: dropdownContent,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
