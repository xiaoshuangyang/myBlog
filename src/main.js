import { createApp, createVNode, render } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import Element from "element-plus";
import "element-plus/dist/index.css";
import "./public/font-awesome-4.7.0/css/font-awesome.min.css";

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://abfd646cdf484ba58aaf722b57339f0b@o4504314509000704.ingest.sentry.io/4504314512867329",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
      logErrors: true,
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

//引入组件
import loadingBar from "./components/loadingBar.vue";
//创建虚拟dom并挂载到body中
const Vnode = createVNode(loadingBar);
render(Vnode, document.body);

//路由守卫
//跳转之前(全局钩子函数)
router.beforeEach((to, form, next) => {
  Vnode.component.exposed.startloading();
  next();
});
// 跳转之后
router.afterEach((to, form) => {
  Vnode.component.exposed.endloading();
});

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);
app.use(Element);
app.use(pinia);
app.use(router);
app.mount("#app");
