<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { View, ChatLineRound, Timer } from "@element-plus/icons-vue";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import retraction from "../public/js/retraction";
import Box2 from "./box2.vue";
//引入组件
import Codemirror from "codemirror-editor-vue3";
// language
import "codemirror/mode/javascript/javascript.js";
//style
// import "codemirror/theme/abcdef.css";
//引入数据
import { personStore } from "../store/personStore";
import { personContentStore } from "../store/personContentStore";
import getNewTime from "../public/js/myLeftTime";
const person = personStore();
const personContent = personContentStore();
const route = useRoute();
const router = useRouter();
let id = ref();
id.value = route.query.id;

//前五浏览数的学习文章数据
const personFiveList = person.getViewThridList(5);
//头部数据
let personList = ref();
personList.value = person.getdetailList(id.value);
let visitNum = ref();
visitNum.value = person.getViewNum(id.value);
let commentsNum = ref();
commentsNum.value = person.getcommentsNum(id.value);
//主体数据
let personContentList = ref();
personContentList.value = personContent.getdetailList(id.value);
let content = ref();
content.value = personContentList.value.content;
//
const cmOptions = {
  mode: "text/javascript", // 语言模式
  theme: "default", // 主题
  tabSize: 2,
  smartIndent: false, // 是否智能缩进
  lineNumbers: true, // 显示行号
  readOnly: "nocursor",
};
//右边栏鼠标进图item图片移动方法
const enter = (e) => {
  e.target.children[0].firstChild.style.transform = `translate(-3px,-12px)`;
};
const leave = (e) => {
  e.target.children[0].firstChild.style.transform = `translate(0px,0px)`;
};

//跳转并增加浏览数方法
const addVisitNumber = person.addVisitNumber;
const goDetail = (item) => {
  if (id.value != item.id) {
    addVisitNumber(item);
  }
  router.push({
    path: "/detail",
    query: {
      id: item.id,
    },
  });
};
//点击目录滚动相应内容并添加目录样式
const content_box = ref();
const scroll = (selector, e) => {
  let element = document.querySelector(selector);
  content_box.value.scrollTo({
    left: 0,
    top: element.offsetTop - 5,
    behavior: "smooth",
  });
  divList.forEach((element) => {
    element.firstChild.removeAttribute("class");
    e.target.setAttribute("class", "span_color");
  });
};
const h3 = ref();
let divList = [];
//滚动时右边栏的样式
const onScroll = () => {
  for (let i = 0; i < h3.value.length; i++) {
    if (h3.value[i].getBoundingClientRect().top > 0) {
      divList.forEach((element) => {
        element.firstChild.removeAttribute("class");
        divList[i].firstChild.setAttribute("class", "span_color");
      });
      break;
    }
  }
};
const time = ref("");
const timer = ref();
const a = new Date().getTime();
time.value = getNewTime(a);
const second_content = ref();
onMounted(() => {
  //进入页面时加载第一个item样式
  const ang = () => {
    second_content.value[0].firstChild.setAttribute("class", "span_color");
  };
  ang();
  //获取目录列表,divList
  second_content.value.forEach((element) => {
    if (element.firstChild.firstChild) {
      divList.push(element);
    }
  });
  timer.value = setInterval(() => {
    const b = new Date().getTime();
    time.value = getNewTime(b);
  }, 1000);
});

onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});

onBeforeRouteUpdate((to, from) => {
  id.value = to.query.id;
  personList.value = person.getdetailList(to.query.id);
  visitNum.value = person.getViewNum(to.query.id);
  commentsNum.value = person.getcommentsNum(to.query.id);
  //主体数据
  personContentList.value = personContent.getdetailList(to.query.id);
  content.value = personContentList.value.content;
});
</script>
<template>
  <div class="container">
    <div class="box">
      <div class="box_img">
        <img :src="personList.img" alt="" />
      </div>
      <div class="content_box" ref="content_box" @scroll="onScroll">
        <div class="left">
          <div class="left_first">
            <Box2 title="更多推荐" />
            <div class="content_items" ref="contentBox">
              <div
                class="items_flex"
                v-for="item in personFiveList"
                :key="item.id"
                @mouseenter="enter($event)"
                @mouseleave="leave($event)"
                @click="goDetail(item)"
              >
                <div class="items_img" ref="img">
                  <img :src="item.img" alt="" />
                </div>
                <div class="item">
                  <span>{{ item.title }}</span>
                  <p>{{ person.getViewNum(item.id).num }} views</p>
                </div>
              </div>
            </div>
          </div>
          <div class="left_second"></div>
        </div>
        <div class="content">
          <div class="content_header">
            <h2 :id="personList.title">{{ personList.title }}</h2>
            <div class="content_item">
              <span>
                <b>#</b>
                {{ personList.name }}
              </span>
              <span>
                <el-icon><Timer /></el-icon>
                {{ personList.year }}年{{ personList.month }}月{{
                  personList.day
                }}日
              </span>
              <span>
                <el-icon><View /></el-icon>
                {{ visitNum.num }}次浏览
              </span>
              <span>
                <el-icon><ChatLineRound /></el-icon>
                {{ commentsNum.num }}次吐槽
              </span>
            </div>
            <hr />
          </div>
          <div class="content_mian">
            <div class="mian_box" v-for="(item, index) in content" :key="index">
              <h3 v-if="item.title" :id="item.title" ref="h3">
                {{ item.title }}
              </h3>

              <template v-if="item.p">
                <p v-for="(item, index) in item.p" :key="index">{{ item }}</p>
              </template>

              <template v-if="item.li">
                <ul>
                  <li v-for="(item, index) in item.li" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </template>

              <div v-if="item.pre">
                <Codemirror
                  :value="retraction(item.pre)"
                  :options="cmOptions"
                  border
                  :height="300"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="box_first">
            <img :src="personList.img" alt="" />
            <div class="content_time">
              <div class="content_time_item">
                <p>{{ time.hour }}</p>
                <span>hours</span>
              </div>
              <b>:</b>
              <div class="content_time_item">
                <p>{{ time.minute }}</p>
                <span>minutes</span>
              </div>
              <b>:</b>
              <div class="content_time_item">
                <p>{{ time.second }}</p>
                <span>seconds</span>
              </div>
            </div>
          </div>
          <div class="right_box">
            <div class="box_second">
              <header>导航目录</header>
              <div
                class="second_content"
                v-for="(item, index) in content"
                :key="index"
                ref="second_content"
              >
                <template v-if="item.title">
                  <span @click="scroll(`#${item.title}`, $event)">{{
                    item.title
                  }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  overflow-y: hidden;
}
.box {
  position: relative;
  width: 100%;
  height: 100%;
}
.box_img {
  position: absolute;
  top: -20;
  left: 0;
  width: 100%;
  height: 100%;
}
.box_img img {
  width: 100%;
  height: 100%;
  filter: sepia(20%);
}
.container .content_box {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  height: 90vh;
  overflow-y: auto;
}
.left {
  position: relative;
  top: 30px;
  width: 260px;
  min-height: 600px;
  border-radius: 12px;
}
.left .left_first {
  width: 100%;
  border-radius: 20px;
  margin-top: 16px;
  padding-top: 2px;
  padding-bottom: 15px;
  background: rgba(0, 0, 0, 0.3);
}
.left .left_first .content_items {
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.left .left_first .content_items .items_flex {
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.left .left_first .content_items .items_img {
  height: 50px;
  width: 70px;
  text-align: center;
}
.left .left_first .content_items .items_img img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  transition: transform 0.25s ease-in-out;
}
.left .left_first .content_items .item {
  width: 170px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.left .left_first .content_items .item > span {
  width: 100%;
  padding-right: 20px;
  margin-bottom: 6px;
  color: #08d9d6;
  font-size: 11px;
}
.left .left_first .content_items .item > p {
  width: 100%;
  font-size: 11px;
  overflow: hidden;
  color: #bbb;
}
.content {
  width: 45%;
  min-height: 600px;
  box-shadow: 0 15px 35px #32325d1a, 0 5px 15px #00000012;
  padding: 24px 40px 40px;
  color: #fff;
  border-radius: 12px;
  height: fit-content;
}

.container .content .content_header h2 {
  font-size: 34px;
  max-width: 90%;
}
.content .content_header .content_item {
  margin-top: 8px;
  height: 35px;
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  color: #a0a0a0;
  text-indent: 6px;
}
.content .content_header.content_item span {
  margin-right: 10px;
}

.content .content_mian h3 {
  margin-top: 1em;
  margin-bottom: 16px;
  font-weight: 700;
}
.content .content_mian ul {
  padding-left: 2em;
}
.content .content_mian p {
  line-height: 1.8;
  font-size: 14px;
}
.content .content_mian pre {
  margin-top: 0;
  margin-bottom: 16px;
}
.right {
  position: sticky;
  top: 30px;
  width: 260px;
  min-height: 600px;
  border-radius: 12px;
}
.right .right_box div {
  border-radius: 12px;
}
.right .right_box .box_second {
  width: 100%;
  background: #fff;
  opacity: 0.3;
  margin-top: 25px;
  padding: 14px;
  box-sizing: border-box;
}
.right .right_box .box_second header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 1rem;
  box-sizing: border-box;
}
.right .right_box .box_second .second_content span {
  margin: 6px 0;
  padding: 4px 0 4px 21px;
  display: block;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: #000;
  font-size: 14px;
  cursor: pointer;
}
.right .right_box .box_second .second_content span:hover {
  color: #007fff;
  background-color: #333;
  border-radius: 4px;
}
.right .right_box .box_second .second_content .span_color {
  color: #007fff;
  background-color: #333;
  border-radius: 4px;
}
.right .content_time {
  width: 100%;
  height: 130px;
  display: flex;
  color: #fff;
  justify-content: space-around;
  align-items: center;
}
.right .box_first img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 135px;
  border-radius: 20px;
  filter: blur(1px);
  z-index: -1;
}
.right .content_time > b {
  height: 70px;
  width: 16px;
  font-size: 30px;
  text-shadow: 0.8px 0 5px #333;
  text-align: center;
}
.right .content_time .content_time_item {
  width: 60px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.right .content_time .content_time_item > p {
  width: 45px;
  height: 46px;
  font-size: 40px;
}
.right .content_time .content_time_item > span {
  font-size: 12px;
}
</style>