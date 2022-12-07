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
    host: "0.0.0.0", //ip地址
    port: 8080, //端口号
    open: false, //启动后是否自动打开浏览器
  },
});
