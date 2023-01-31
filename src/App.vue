<template>
  <div class="container">
    <div class="header">
      <router-link to="/">首页</router-link>
      <router-link to="/login" v-if="!show">登录</router-link>
      <router-link to="/personalPage">我的主页</router-link>
    </div>

    <div
      class="main"
      style="background-image: linear-gradient(to right, #fbc2eb, #a6c1ee)"
    >
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { personStore } from "./store/personStore";
import { personContentStore } from "./store/personContentStore";
import { ref, onMounted, onUnmounted } from "vue";
import { userStore } from "./store/userStore";
let show = ref("");

show.value = JSON.parse(sessionStorage.getItem("user"));

axios.get("/api/articleRouter").then((result) => {
  userStore().setUser(show);
  personStore().presonList = result.data.data;
});
axios.get("/api/articleDetailRouter").then((result) => {
  personContentStore().data = result.data.data;
});
// let beforeUnloadTime = ref(0);
// let gapTime = ref(0);

// const beforeunloadHandler = () => {
//   beforeUnloadTime.value = new Date().getTime();
// };

// const unloadHandler = () => {
//   gapTime.value = new Date().getTime() - beforeUnloadTime.value;
//   //判断是窗口关闭还是刷新
//   if (gapTime.value <= 5) {
//     //浏览器关闭
//     localStorage.setItem("user", "");
//   }
// };
// onMounted(() => {
//   //监听页面卸载（关闭）或刷新
//   window.addEventListener("beforeunload", () => beforeunloadHandler());

//   window.addEventListener("unload", () => unloadHandler());
// });
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
body {
  background-color: #ececec;
}
body::-webkit-scrollbar {
  display: none;
}
.container {
  background-color: #ececec;
}
.header {
  position: fixed;
  width: 100%;
  height: 70px;
  line-height: 70px;
  background-color: white;
  color: #333;
  border-radius: 5px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.9); /*阴影出现在元素下方*/
  margin-bottom: 10px;
  margin-top: 3px;
  z-index: 1;
}
.header > a {
  text-decoration: none;
  color: #333;
}
.main {
  position: absolute;
  border-radius: 4px;
  width: 100%;
  top: 70px;
}
</style>
