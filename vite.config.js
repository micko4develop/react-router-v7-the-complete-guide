import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  optimizeDeps: {
    include: ["styled-components"],
  },
  define: {
    global: "globalThis",
  },
  ssr: {
    noExternal: ["styled-components"],
  },
});
