import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Button from "../Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    gradient: {
      control: "select",
      options: ["blueRadial", "redRadial"],
      if: { arg: "variant", eq: "primary" },
    },
    appearance: {
      control: "select",
      options: ["outlined", "text"],
      if: { arg: "variant", eq: "secondary" },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
    appearance: "outlined",
  },
};
