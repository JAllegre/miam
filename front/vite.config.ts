import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
const nodeEnv = process.env.NODE_ENV || "development";
const env = loadEnv(nodeEnv, process.cwd());

console.log("vite.config.ts/FUNC | ", env);

export default defineConfig({
  base: nodeEnv === "production" ? "/miam" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: parseInt(env.VITE_PORT),
  },
});
