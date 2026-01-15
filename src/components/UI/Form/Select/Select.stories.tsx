import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Select from "./Select";

const sampleOptions = [
  { value: "default", label: "Not selected" },
  { value: "morning", label: "Morning (8AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 4PM)" },
  { value: "evening", label: "Evening (4PM - 8PM)" },
];

const meta: Meta<typeof Select> = {
  title: "UI/Form/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    defaultValue: { control: "text" },
  },
  args: {
    id: "pickupTime",
    label: "Preferred Time",
    options: sampleOptions,
    defaultValue: "default",
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
