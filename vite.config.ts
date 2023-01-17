import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 4000 },
  root: join(__dirname, "client"),
  publicDir: join(__dirname, "public"),
  build: { outDir: join(__dirname, "dist", "client") },
  plugins: [react()],
});
