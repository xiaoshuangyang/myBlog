<template>
  <div class="container">
    <el-card class="box-card">
      <div class="clearfix">
        <span>登录</span>
      </div>
      <div class="text item">
        <span>用户名：</span>
        <el-input
          type="text"
          class="input-item"
          v-model="username"
          clearable
          placeholder="请输入用户名"
        />
        <span>密码：</span>
        <el-input
          type="password"
          class="input-item"
          show-password
          v-model="password"
          placeholder="请输入密码"
        />
        <el-button @click="btn" class="btn">Login</el-button>
      </div>
      <div class="msg">
        没有账号?
        <router-link to="/registered">点击注册</router-link>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import axios from "axios";
import { userStore } from "../store/userStore";
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
const user = userStore();
const setUser = user.setUser;
let username = ref("");
let password = ref("");
const goPersonalPage = () => {
  router.push({ path: "/personalPage" });
};
const btn = () => {
  axios
    .post("/api/users/login", {
      userName: username.value,
      password: password.value,
    })
    .then((res) => {
      // “001”代表登录成功，其他的均为失败
      if (res.data.code === "001") {
        // 登录信息存到本地
        let user = JSON.stringify(res.data.user);
        sessionStorage.setItem("user", user);
        //  登录信息存到pinan
        setUser(res.data.user);
        ElMessage.success(res.data.msg);
        goPersonalPage();
      } else {
        ElMessage.error(res.data.msg);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.input-item {
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  font-size: 15px;
  outline: none;
}
.clearfix {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}

.box-card {
  margin: 100px auto;
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
}
.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 20px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}
.msg {
  text-align: center;
  line-height: 50px;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}
/deep/.el-input__inner {
  &::placeholder {
    font-size: 13px;
  }
}
</style>
