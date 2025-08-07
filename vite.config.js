import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/product-list-with-cart/",
  plugins: [tailwindcss()],
});
