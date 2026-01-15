import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Field from "./Field";

const meta: Meta<typeof Field> = {
  title: "UI/Form/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    tag: {
      control: "radio",
      options: ["input", "textarea"],
    },
    label: { control: "text" },
    required: { control: "boolean" },
  },
  args: {
    id: "name",
    label: "Full name",
    placeholder: "Jane Doe",
    required: true,
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Textarea: Story = {
  args: {
    tag: "textarea",
    id: "instructions",
    label: "Delivery instructions",
    placeholder: "Leave the bag near the entrance",
    required: false,
  },
};
