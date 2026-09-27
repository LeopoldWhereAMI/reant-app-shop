import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    environment: "jsdom",

    setupFiles: ["./src/tests/setup.ts"],

    env: {
      RENT_APP_API_URL: "https://example.com",
    },

    coverage: {
      reporter: ["text", "html"],
    },
  },
});
