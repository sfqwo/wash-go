import type { Meta, StoryObj } from "@storybook/nextjs";

import { Footer } from "./Footer";
import { Header } from "./Header";

const meta: Meta = {
  title: "Layout/PageLayout",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Header />
      <main style={{ minHeight: "400px", padding: "2rem" }}>
        <p>Place your page content here.</p>
      </main>
      <Footer />
    </>
  ),
};
