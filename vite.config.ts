import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  root: "client",
  build: { outDir: "dist/client" },
  plugins: [react()],
});
