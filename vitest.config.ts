import fs from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const tmpDir = path.resolve(__dirname, ".tmp");
try {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  process.env.TMPDIR = tmpDir;
} catch {
  // Ignore if the directory cannot be created in read-only sandboxes.
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.tsx"],
    css: true,
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
