import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/UI/Button";

import { Dialog } from "./Dialog";

const dialogContent = (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    <p>
      We will confirm your pickup time within 15 minutes. Feel free to add
      special instructions before submitting the form.
    </p>
    <Button variant="primary">Confirm pickup</Button>
    <Button variant="secondary" appearance="outlined">Cancel pickup</Button>
  </div>
);

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    defaultOpen: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    title: "Schedule confirmation",
    description: "Double-check your pickup slot",
    content: dialogContent,
    children: <Button variant="secondary">Open dialog</Button>,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
