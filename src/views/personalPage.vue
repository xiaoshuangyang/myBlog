<template>
  <div class="container">
    <div>
      <div class="container-header">
        <div class="header-img">
          <img src="../public/animationImage/37.jpg" alt="" />
        </div>
        <div class="header-mian">
          <b>Boom</b>
          <p>用户</p>
          <p>性别：男</p>
        </div>
        <el-button @click="signOut">退出登录</el-button>
      </div>
      <div class="container-main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="主页" name="first">主页</el-tab-pane>
          <el-tab-pane label="收藏" name="second">收藏</el-tab-pane>
          <el-tab-pane label="个人信息" name="third">
            <div class="mian-third">
              <div class="third-content">
                <em>点击相应信息进行修改</em>
                <el-input
                  type="button"
                  value="修改"
                  class="sub"
                  v-if="show"
                  @click="
                    () => {
                      show = false;
                      edit = false;
                    }
                  "
                />
                <el-input
                  type="button"
                  value="确定修改"
                  class="sub"
                  v-else
                  @click="revise"
                />
                <h3>账号信息<a href="">(无法修改)</a></h3>
                <div class="group" v-for="item in accountInformation">
                  <b>{{ item.b }}</b>
                  <div class="msg">{{ item.div }}</div>
                </div>
                <h3>基本信息</h3>
                <div class="group" v-for="item in basicInformation">
                  <b>{{ item.b }}</b>
                  <div class="check-input">
                    <el-input
                      :disabled="edit"
                      placeholder="请输入"
                      v-model="item.div"
                    ></el-input>
                  </div>
                </div>
                <h3>联系方法</h3>
                <div class="group" v-for="item in contactMethod">
                  <b>{{ item.b }}</b>
                  <div class="check-input">
                    <el-input
                      :disabled="edit"
                      placeholder="请输入"
                      v-model="item.div"
                    />
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { userStore } from "../store/userStore";
const user = userStore();
const setUser = user.setUser;
const router = useRouter();
const signOut = () => {
  sessionStorage.setItem("user", "");
  setUser("");
  ElMessage.success("退出成功");
  router.push({ path: "/login" });
};
let activeName = "third";
let accountInformation = [
  {
    b: "权限",
    div: user.user.user_permissions,
  },
  {
    b: "账号",
    div: user.user.userName,
  },
  {
    b: "账号id",
    div: user.user.user_id,
  },
  {
    b: "注册时间",
    div: user.user.registration_time,
  },
];
let basicInformation = ref([
  {
    b: "昵称",
    div: user.user.user_nickname,
    model: "nickname",
  },
  {
    b: "性别",
    div: user.user.user_gender,
    model: "gender",
  },
  {
    b: "年龄",
    div: user.user.user_age,
    model: "age",
  },
  {
    b: "身份",
    div: user.user.user_identity,
    model: "identity",
  },
]);
let contactMethod = ref([
  {
    b: "手机号",
    div: user.user.userPhoneNumber,
    model: "userPhoneNumber",
  },
]);
let edit = ref(true);
let show = ref(true);
const revise = () => {
  edit.value = true;
  show.value = true;
  axios
    .post("/api/users/edit", {
      userData: basicInformation.value,
      userPhone: contactMethod.value,
      userName: user.user.userName,
    })
    .then((res) => {
      if (res.data.code === "001") {
        let user = res.data.user;
        delete user.password;
        sessionStorage.setItem("user", JSON.stringify(user));
        //  登录信息存到pinan
        setUser(res.data.user);
        ElMessage.success(res.data.msg);
      } else {
        ElMessage.error(res.data.msg);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  console.log(basicInformation);
};
</script>
<style scoped lang="less">
/deep/ .el-tabs__item {
  font-size: 16px;
  font-weight: 700;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #f4f5f7;
  & > div {
    width: 1200px;
    margin: 0 auto;
    .container-header {
      width: 100%;
      display: flex;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      /deep/ .el-button {
        align-self: flex-end;
        position: relative;
        left: 790px;
        width: 76px;
        height: 28px;
        border-radius: 44px;
        background: #ee5757;
        border: none;
        color: #fff;
        cursor: pointer;
      }
      .header-img {
        width: 100px;
        height: 100px;
        box-sizing: border-box;
        border: 2px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.25s;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .header-mian {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        b {
          font-size: 20px;
          color: #000000e0;
        }
        p {
          font-size: 14px;
          color: #5c5c5c;
        }
      }
    }
    .container-main {
      width: 100%;
      .mian-third {
        width: 100%;
        position: relative;
        .third-content {
          position: relative;
          background: #fff;
          padding: 40px 30px 20px;
          border-radius: 10px;
          /deep/.sub .el-input__inner {
            position: absolute;
            right: 100px;
            top: 20px;
            display: block;
            width: 76px;
            height: 28px;
            border-radius: 44px;
            background: #ee5757;
            border: none;
            color: #fff;
            cursor: pointer;
          }
          h3 {
            border-left: 3px solid #009688;
            margin-top: 60px;
            margin-bottom: 20px;
            text-indent: 10px;
            user-select: none;
            a {
              font-size: 12px;
              color: #999;
              text-decoration: none;
            }
          }
          .group {
            margin: 10px 0;
            display: flex;
            justify-content: flex-start;
            border-bottom: 1px solid #e6e9f0;
            width: 100%;
            height: -webkit-fit-content;
            b {
              user-select: none;
              display: flex;
              align-items: center;
              width: 120px;
              height: 40px;
            }
            .msg {
              width: 100%;
              display: flex;
              align-items: center;
              margin-left: 200px;
            }
            .check-input {
              position: relative;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
              height: 40px;
              margin-bottom: 30px;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
}
</style>