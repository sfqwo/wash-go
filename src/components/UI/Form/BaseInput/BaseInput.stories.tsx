import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BaseInput from "./BaseInput";

const meta: Meta<typeof BaseInput> = {
  title: "UI/Form/BaseInput",
  component: BaseInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    tag: {
      control: "radio",
      options: ["input", "textarea"],
    },
    type: {
      control: "select",
      options: ["text", "email", "tel", "number"],
      if: { arg: "tag", eq: "input" },
    },
    maxLength: {
      control: "number",
      if: { arg: "tag", eq: "textarea" },
    },
  },
  args: {
    tag: "input",
    type: "text",
    placeholder: "Enter your name",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

