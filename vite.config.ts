import path from "path"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~app": path.resolve("src/app"),
      "~entities": path.resolve("src/entities"),
      "~features": path.resolve("src/features"),
      "~pages": path.resolve("src/pages"),
      "~shared": path.resolve("src/shared"),
      "~widgets": path.resolve("src/widgets"),
    },
  },
})
