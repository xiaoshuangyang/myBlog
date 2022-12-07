<script setup>
defineProps({
  title: String,
});
</script>
<template>
  <div class="content_header">{{ title }}</div>
</template>
<style scoped>
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
</style>