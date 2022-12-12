<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import {
  Calendar,
  View,
  ChatLineRound,
  Sunrise,
} from "@element-plus/icons-vue";

import { personStore } from "../store/personStore";
const person = personStore();
const addVisitNumber = person.addVisitNumber;

const props = defineProps(["message"]);
const message = props.message;
// localStorage.setItem("visitNum", JSON.stringify(person.visitNum));
// localStorage.setItem("commentsNum", JSON.stringify(person.commentsNum));
// const visitNum = JSON.parse(localStorage.getItem("visitNum"));
// const commentsNum = JSON.parse(localStorage.getItem("commentsNum"));

const data = reactive({
  listAll: message, //所有数据
  showList: [], //要显示的数据
  contentHeight: 0, //可视区域高度
  itemHeight: 280, //每条数据所占高度
  showNum: 0, //可是区域显示的最大条数
  startOffset: 0, //偏移量
  scrollTop: 0, //卷起的高度
  startIndex: 0, //可视区域第一条数据的索引
  endIndex: 0, //可视区域最后一条数据后面那条数据的的索引
});

//偏移量对应的偏移样式
const getTransform = computed(() => {
  return `translate3d(0,${data.startOffset}px,0)`;
});

const contextBox = ref();
//虚拟列表计算
const scroll = () => {
  data.contentHeight = contextBox.value.clientHeight;
  data.scrollTop = contextBox.value.scrollTop;
  data.showNum = Math.ceil(data.contentHeight / data.itemHeight);
  data.startIndex = Math.floor(data.scrollTop / data.itemHeight);
  data.endIndex = data.startIndex + data.showNum;
  data.startOffset = data.scrollTop - (data.scrollTop % data.itemHeight);
  data.showList = data.listAll.slice(data.startIndex, data.endIndex);
};
//设置鼠标进入时图片模糊
const addimgBlur = (e) => {
  e.target.children[1].style.filter = "blur(1px)";
};
const clearimgBlur = (e) => {
  e.target.children[1].style.filter = "";
};
onMounted(() => {
  scroll();
});
</script>
<template>
  <div class="context" ref="contextBox" @scroll="scroll">
    <div
      :style="{
        transform: getTransform,
        height: `${data.itemHeight * data.listAll.length - data.startOffset}px`,
      }"
      class="context_box"
    >
      <div
        class="content"
        v-for="item in data.showList"
        :key="item.id"
        @mouseenter="addimgBlur($event)"
        @mouseleave="clearimgBlur($event)"
      >
        <div class="content_postion_box">
          <p>{{ item.name }}</p>
          <h1>{{ item.title }}</h1>
        </div>
        <img :src="item.img" alt="" />
        <div class="content_item">
          <div class="content_item_cont">
            <span>
              <el-icon><Calendar /></el-icon>
              {{ item.year }}.{{ item.month }}.{{ item.day }}
            </span>
            <span>
              <el-icon><ChatLineRound /></el-icon>
              {{ person.getcommentsNum(item.id).num }}次吐槽
            </span>
            <span>
              <el-icon><View /></el-icon>
              {{ person.getViewNum(item.id).num }}人围观
            </span>
          </div>
          <div class="content_item_btn">
            <router-link
              :to="{
                path: '/detail',
                query: { id: item.id },
              }"
              @click="addVisitNumber(item)"
              >点击阅读</router-link
            >
            <el-icon><Sunrise /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.context {
  width: 38%;
  /* border: 1px solid black; */
  height: 1100px;
  margin-top: 20px;
  overflow: auto;
}
.context::-webkit-scrollbar {
  width: 10px;
}
.context::-webkit-scrollbar-track {
  background-color: #ececec;
}
.context::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #bbb;
}
.context::-webkit-scrollbar-thumb:hover {
  background: rgba(23, 23, 24, 0.7);
}
.content {
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}
.content:hover {
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.9);
}
.content img {
  width: 100%;
  height: 250px;
  border-radius: 20px 20px 0 0;
}

.content .context_box {
  width: 100%;
  padding-bottom: 20px;
}
.content .content_postion_box {
  position: absolute;
  width: 100%;
  height: 74px;
  top: 74px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.content .content_postion_box > p {
  width: 60px;
  height: 24px;
  background-color: rgb(245, 65, 110);
  border-radius: 6px;
  text-align: center;
}
.content .content_postion_box h1 {
  font-size: 30px;
}
.content .content_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.content .content_item .content_item_cont {
  width: 45%;
  display: flex;
  justify-content: space-around;
}
.content_item_cont > span {
  color: #bbb;
  font-size: 14px;
}
.content_item_btn {
  margin-right: 15px;
}
.content_item_btn > a {
  font-size: 14px;
  color: black;
  margin-right: 5px;
  text-decoration: none;
}
.content_item_btn > a:hover {
  text-decoration: underline;
}
</style>
