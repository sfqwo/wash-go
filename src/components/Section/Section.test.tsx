import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "./Section";
import styles from "./Section.module.scss";

describe("Section", () => {
  it("renders children inside the content container", () => {
    render(
      <Section>
        <span>My content</span>
      </Section>,
    );

    expect(screen.getByText("My content")).toBeInTheDocument();
  });

  it("uses the provided tag and background class", () => {
    const { container } = render(
      <Section as="header" bg="blue">
        <div>Header body</div>
      </Section>,
    );

    const header = container.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.classList.contains(styles.blue)).toBe(true);
  });

  it("marks the section as visible after the intersection observer fires", async () => {
    const { container } = render(
      <Section>
        <p>Observer content</p>
      </Section>,
    );

    await waitFor(() => {
      expect(container.firstElementChild).toHaveAttribute("data-section-visible", "true");
    });
  });
});
