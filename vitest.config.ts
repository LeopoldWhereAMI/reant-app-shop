import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    environment: "jsdom",
    globals: true,

    setupFiles: ["./src/tests/setup.ts"],

    env: {
      RENT_APP_API_URL: "https://example.com",
    },

    coverage: {
      reporter: ["text", "html"],
    },
  },
});
