<template>
  <div class="container">
    <el-card class="box-card">
      <div class="clearfix">
        <span>注册</span>
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
          v-model="password"
          show-password
          placeholder="请输入密码"
        />
        <span>再次输入密码：</span>
        <el-input
          type="password"
          class="input-item"
          v-model="pass"
          show-password
          placeholder="请再次输入密码"
        />
        <el-button @click="registered" class="btn">Sign up</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
let username = ref("");
let password = ref("");
let pass = ref("");

const registered = () => {
  axios
    .post("/api/users/register", {
      userName: username.value,
      password: password.value,
      pass: pass.value,
    })
    .then((res) => {
      // “001”代表注册成功，其他的均为失败
      if (res.data.code === "001") {
        // 弹出通知框提示注册成功信息
        ElMessage.success(res.data.msg);
      } else {
        // 弹出通知框提示注册失败信息
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
