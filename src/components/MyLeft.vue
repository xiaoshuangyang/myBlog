<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { personStore } from "../store/personStore";
import { animationStore } from "../store/animationStore";
import getNewTime from "../public/js/myLeftTime";
import { useRouter } from "vue-router";
import Box from "./box.vue";
const router = useRouter();
const person = personStore();

//文章浏览数
const visitNum = person.visitNum;
//获得随机图片
const imgAll = person.getImg;
//学习文章总数
const personListNum = person.getpersonlistNum;
//学习总评论数
const personCommentsNum = person.getcommentsAllNum;
//学习总浏览数
const personVisitNum = person.getvisitAllNum;
//前三浏览数的学习文章数据
const personThreeList = person.getViewThridList(3);
//动态最新的三个学习文章数据
const personNewtimeList = person.getNewtimeList;

const animation = animationStore();
//动漫文章总数
const animationListNum = animation.getanimatiomlistNum;
//动态最新的两个动漫数据
const animatioNewtimeList = animation.getNewtimeList;
//增加浏览数方法
const addVisitNumber = person.addVisitNumber;
const data = ref([
  {
    name: "文章",
    num: personListNum,
  },
  {
    name: "动漫",
    num: animationListNum,
  },
  {
    name: "评论",
    num: personCommentsNum,
  },
  {
    name: "浏览",
    num: personVisitNum,
  },
]);

const time = ref("");
const timer = ref();
const a = new Date().getTime();
time.value = getNewTime(a);

const contentBox = ref();
const enter = (e) => {
  e.target.children[0].firstChild.style.transform = `translate(-3px,-12px)`;
};
const leave = (e) => {
  e.target.children[0].firstChild.style.transform = `translate(0px,0px)`;
};

const goDetail = (item) => {
  addVisitNumber(item);
  router.push({
    path: "/detail",
    query: {
      id: item.id,
    },
  });
};

onMounted(() => {
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
</script>
<template>
  <div class="left">
    <div class="left_item_one">
      <img :src="imgAll" alt="" />
      <p>Adic Blog</p>
      <div class="content_describes">
        动漫、民谣吉他、前端编程，这是博主的三大标签。本站推荐博主喜欢的动漫、自己所总结的知识，也会分享一些日常心得~
      </div>
      <div class="content_items">
        <div v-for="item in data" :key="item.num" class="items">
          <div>{{ item.name }}</div>
          <div class="items_color">{{ item.num }}</div>
        </div>
      </div>
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
    <div class="left_item_two">
      <Box title="最新动态" />
      <div v-for="item in personNewtimeList" :key="item.id">
        <div class="content_items" @click="goDetail(item.id)">
          <p>{{ item.title }}</p>
          <span>
            {{ item.year }}-{{ item.month }}-{{ item.day }} {{ item.hours }}:{{
              item.minutes
            }}:{{ item.seconds }}
          </span>
        </div>
      </div>
    </div>
    <div class="left_item_three">
      <Box title="最受欢迎的文章" />
      <div class="content_items" ref="contentBox">
        <div
          class="items_flex"
          v-for="item in personThreeList"
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
    <div class="left_item_four">
      <Box title="最信推荐动漫" />
      <div class="content_items" ref="contentBox">
        <div
          class="items_flex"
          v-for="item in animatioNewtimeList"
          :key="item.id"
          @mouseenter="enter($event)"
          @mouseleave="leave($event)"
        >
          <div class="items_img" ref="img">
            <img :src="item.img" alt="" />
          </div>
          <div class="item">
            <span>{{ item.title }}</span>
            <p>{{ item.year }}.{{ item.month }}.{{ item.day }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left {
  width: 17%;
  height: 100%;
  /* border: 1px solid black; */
  border-radius: 4px;
  margin-right: 50px;
  /* background-color: #fff; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin-top: 20px;
}
.left .left_item_one {
  position: relative;
  width: 90%;
  height: 310px;
  background-color: #fff;
  border-radius: 20px;
}
.left .left_item_one > img {
  width: 100%;
  height: 135px;
  border-radius: 20px 20px 0 0;
}
.left .left_item_one > p {
  width: 100%;
  height: 35;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 16px;
  color: #08d9d6;
}
.left .left_item_one .content_describes {
  width: 100%;
  font-size: 12px;
  padding: 0 10px 10px;
  line-height: 18px;
}
.left .left_item_one .content_items {
  width: 99%;
  height: 69px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid #e3e3e3;
}
.left .left_item_one .content_items .items {
  width: 25%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: 14px;
  color: #999;
  border-right: 1px solid #e3e3e3;
}
.left .left_item_one .content_items .items .items_color {
  color: black;
}
.left .left_item_one .content_items div:nth-of-type(4) {
  border: none;
}
.left .left_item_one .content_time {
  position: absolute;
  width: 100%;
  height: 130px;
  top: 0;
  display: flex;
  color: #fff;
  justify-content: space-around;
  align-items: center;
}
.left .left_item_one .content_time > b {
  height: 70px;
  width: 16px;
  font-size: 30px;
  text-shadow: 0.8px 0 5px #333;
  text-align: center;
}
.left .left_item_one .content_time .content_time_item {
  width: 60px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.left .left_item_one .content_time .content_time_item > p {
  width: 45px;
  height: 46px;
  font-size: 40px;
}
.left .left_item_one .content_time .content_time_item > span {
  font-size: 12px;
}
.left .left_item_two {
  width: 90%;
  height: 230px;
  background-color: #fff;
  border-radius: 20px;
  margin-top: 16px;
}
.content_header {
  position: relative;
  top: 16px;
  left: 14px;
  width: 80%;
  height: 30px;
  border-bottom: 1px solid #e8e8e8;
  text-indent: 2px;
  color: #777;
  font-size: 14px;
  margin-bottom: 36px;
}
.content_header::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: red;
  border-radius: 3px;
}
.left .left_item_two .content_items {
  width: 100%;
  padding: 2px 14px;
  margin-bottom: 6px;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
}
.left .left_item_two .content_items:hover {
  background-color: rgb(241, 241, 241);
}
.left .left_item_two .content_items > p {
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  text-overflow: ellipsis;
  /* overflow: hidden; */
  white-space: pre-wrap;
  font-size: 14px;
  color: #333;
}
.left .left_item_two .content_items > span {
  font-size: 12px;
  color: #777;
}
.left .left_item_three {
  width: 90%;
  height: 275px;
  background-color: #fff;
  border-radius: 20px;
  margin-top: 16px;
}
.left .left_item_three .content_items {
  width: 100%;
  height: 185px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.left .left_item_three .content_items .items_flex {
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.left .left_item_three .content_items .items_img {
  height: 50px;
  width: 70px;
  text-align: center;
}
.left .left_item_three .content_items .items_img img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  transition: all 0.25s ease-in-out;
}
.left .left_item_three .content_items .item {
  width: 170px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.left .left_item_three .content_items .item > span {
  width: 100%;
  padding-right: 20px;
  margin-bottom: 6px;
  color: #768791;
  font-size: 11px;
}
.left .left_item_three .content_items .item > p {
  width: 100%;
  font-size: 11px;
  overflow: hidden;
  color: #c3ccd3;
}

.left .left_item_four {
  width: 90%;
  height: 215px;
  background-color: #fff;
  border-radius: 20px;
  margin-top: 16px;
}

.left .left_item_four .content_items {
  width: 100%;
  height: 125px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.left .left_item_four .content_items .items_flex {
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.left .left_item_four .content_items .items_img {
  height: 50px;
  width: 70px;
  text-align: center;
}
.left .left_item_four .content_items .items_img img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  transition: all 0.25s ease-in-out;
}
.left .left_item_four .content_items .item {
  width: 170px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.left .left_item_four .content_items .item > span {
  width: 100%;
  padding-right: 20px;
  margin-bottom: 6px;
  color: #768791;
  font-size: 11px;
}
.left .left_item_four .content_items .item > p {
  width: 100%;
  font-size: 11px;
  overflow: hidden;
  color: #c3ccd3;
}
</style>
