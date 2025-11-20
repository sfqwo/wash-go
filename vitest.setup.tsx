import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];

  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  disconnect() {}

  observe(target: Element) {
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          intersectionRatio: 1,
          time: Date.now(),
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: target.getBoundingClientRect(),
        },
      ],
      this,
    );
  }

  takeRecords() {
    return [];
  }

  unobserve() {}
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

vi.stubGlobal("ResizeObserver", class implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();

vi.mock("next/link", () => {
  const NextLink = React.forwardRef<HTMLAnchorElement, { href: string; children: React.ReactNode }>(
    ({ href, children, ...rest }, ref) => (
      <a href={href} ref={ref} {...rest}>
        {children}
      </a>
    ),
  );
  NextLink.displayName = "NextLinkMock";

  return {
    __esModule: true,
    default: NextLink,
  };
});
