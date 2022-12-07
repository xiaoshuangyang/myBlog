<script setup>
import { ref } from "vue";
import Box from "./box.vue";
defineProps({});
const TechnologyStack = ref([
  { Technology: "Vue2/3", color: "rgb(66, 183, 128)" },
  { Technology: "HTML5", color: "rgb(222, 234, 61)" },
  { Technology: "CSS3", color: "rgb(234, 61, 218)" },
  { Technology: "Less/Scss", color: "rgb(111, 183, 55)" },
  { Technology: "JavaScript", color: "rgb(143, 48, 140)" },
]);
</script>

<template>
  <div class="right">
    <div class="right_item_one">
      <div class="item_one_img">
        <img src="../public/personImage/24.jpg" alt="" />
      </div>
      <div class="item_one_headshot">
        <img src="../public/animationImage/35.jpg" alt="" />
      </div>
    </div>
    <div class="right_item_two">
      <Box title="关于我" />
      <ul class="item_two_content_box">
        <li class="item_fa_github">
          <i class="fa fa-github"></i>
          Github
        </li>
        <li class="item_fa_bilibili">
          <i class="fa fa-television"></i>
          bilibili
        </li>
        <li class="item_fa_jueji">
          <i class="fa fa-bookmark-o"></i>
          掘金
        </li>
        <li class="item_fa_npm">
          <i class="fa fa-link"></i>
          npm
        </li>
      </ul>
    </div>
    <div class="right_item_three">
      <Box title="我的技术栈" />
      <ul>
        <li v-for="(item, index) in TechnologyStack" :key="index">
          <i :style="{ backgroundColor: item.color }"></i>
          <span style="margin-left: 8px; color: #717171">{{
            item.Technology
          }}</span>
        </li>
      </ul>
    </div>
    <div class="right_item_four">
      <Box title="友情链接" />
      <ul>
        <li>Loid-全能工程师</li>
        <li>川教计科系工作室</li>
      </ul>
    </div>
    <div class="right_item_five">
      <Box title="最新评论" />
      <div class="right_five_content">
        <div class="content_item">
          <div><img src="../public/personImage/1.jpg" alt="" /></div>
          <div class="item_box">
            <p>Jay</p>
            <span>29 天前（9月22日）</span>
          </div>
        </div>
        <div class="item_box"><b>[文章]</b>来自&nbsp;:xxxx</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.right {
  width: 20%;
  /* border: 1px solid black; */
  border-radius: 4px;
  height: 100%;
  margin-left: 50px;
  margin-top: 20px;
  overflow: hidden;
}
.right ul {
  padding: 0 16px;
}
.right li {
  list-style: none;
}
.right .right_item_one {
  position: relative;
  display: block;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 1px 0 6px #0000000a;
}
.right .right_item_one .item_one_img {
  width: 100%;
  height: 120px;
}
.right .right_item_one .item_one_img > img {
  width: 100%;
  height: 100%;
  border-radius: 12px 12px 0 0;
  object-fit: cover;
}

.right .right_item_one .item_one_headshot {
  position: absolute;
  left: 0;
  right: 0;
  top: 86px;
  margin: 0 auto;
  width: 70px;
  height: 70px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
}
.right .right_item_one .item_one_headshot > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.right .right_item_two {
  width: 100%;
  background-color: #fff;
  display: block;
  margin-top: 16px;
  padding-bottom: 20px;
  border-radius: 12px;
  box-shadow: 1px 0 6px #0000000a;
}
.right .right_item_two .item_two_content_box {
  height: 164px;
}
.right .right_item_two .item_two_content_box li {
  padding: 10px 12px;
  font-size: 12px;
  color: #768791;
  transition: all 0.4s ease;
  background: #eeeeee70;
  border-radius: 6px;
  margin-bottom: 12px;
  cursor: pointer;
  list-style: none;
}
.right li:hover {
  background: #fff;
  box-shadow: 0px 3px 10px rgba(207, 207, 207, 0.9);
}
.right .right_item_two .item_two_content_box .fa {
  display: inline-flex;
  justify-content: center;
  width: 12px;
  margin-right: 4px;
}

.right .right_item_three {
  width: 100%;
  display: block;
  background-color: #fff;
  margin-top: 16px;
  padding-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 1px 0 6px #0000000a;
}
.right .right_item_three li {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 6px 8px;
  font-size: 14px;
  margin-right: 6px;
  margin-bottom: 8px;
  user-select: none;
}
.right .right_item_three li i {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.right .right_item_four {
  width: 100%;
  display: block;
  margin-top: 16px;
  padding-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 1px 0 6px #0000000a;
  background-color: #fff;
}

.right .right_item_four li {
  box-sizing: border-box;
  display: block;
  padding: 10px 12px;
  font-size: 12px;
  color: #768791;
  transition: all 0.4s ease;
  background: #eeeeee70;
  border-radius: 6px;
  margin-bottom: 12px;
  cursor: pointer;
}
.right .right_item_five {
  width: 100%;
  display: block;
  margin-top: 16px;
  padding-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 1px 0 6px #0000000a;
  background-color: #fff;
}
.right .right_item_five .right_five_content {
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px;
}
.right .right_item_five .right_five_content .content_item {
  height: 45px;
  display: flex;
}
.right .right_item_five .right_five_content .content_item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.right .right_item_five .right_five_content .content_item .item_box {
  color: #999;
  margin-left: 10px;
}
.right .right_item_five .right_five_content .content_item .item_box a {
  display: inline-block;
  width: 110px;
  font-size: 14px;
}
.right .right_item_five .right_five_content .content_item .item_box span {
  font-size: 12px;
}
.right .right_item_five .right_five_content .item_box {
  width: 100%;
}
.right .right_item_five .right_five_content .item_box {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  margin-left: 4px;
  cursor: pointer;
}
.item_box b {
  margin-right: 2px;
}
</style>
