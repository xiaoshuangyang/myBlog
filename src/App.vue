<template>
  <div class="container">
    <div class="header">
      <router-link to="/">首页123</router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

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
