import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@@": resolve(__dirname, "public"),
    },
  },
  base: "/weather-forecast",
});
