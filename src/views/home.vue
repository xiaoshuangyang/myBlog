<script setup>
import MyLeft from "../components/MyLeft.vue";
import MyMain from "../components/MyMain.vue";
import MyRight from "../components/MyRight.vue";
import { personStore } from "../store/personStore";
const person = personStore();
const message = person.presonList;
//初始化浏览数
const getvisitNumber = person.getvisitNumber;
getvisitNumber(message);
//初始化评论数
const getcommentsNumber = person.getcommentsNumber;
getcommentsNumber(message);
// console.log(window.a.b);
</script>

<template>
  <div class="container">
    <MyLeft />
    <MyMain :message="message" />
    <MyRight />
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f4f5f7;
}
</style>
