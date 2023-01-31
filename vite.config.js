import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    host: "0.0.0.0", //ip地址
    port: 4000, //端口号
    open: false, //启动后是否自动打开浏览器
  },
});
