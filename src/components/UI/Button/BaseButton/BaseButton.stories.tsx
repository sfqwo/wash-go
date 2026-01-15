import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import BaseButton from "./BaseButton";

const meta: Meta<typeof BaseButton> = {
  title: "UI/BaseButton",
  component: BaseButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    as: {
      control: "radio",
      options: ["button", "a"],
    },
    size: {
      control: "radio",
      options: ["S", "M"],
    },
    hidden: { control: "boolean" },
    href: {
      control: "text",
      if: { arg: "as", eq: "a" },
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      if: { arg: "as", eq: "button" },
    },
  },
  args: {
    as: "button",
    size: "M",
    children: "Base button",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonVariant: Story = {};

export const AnchorVariant: Story = {
  args: {
    as: "a",
    href: "#",
    children: "Base anchor",
  },
};
