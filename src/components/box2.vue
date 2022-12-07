<script setup>
defineProps({
  title: String,
});
</script>
<template>
  <h4>{{ title }}</h4>
</template>
<style scoped>
h4 {
  position: relative;
  border-left: 3px solid #08d9d6;
  padding: 0 4px;
  margin: 16px 10px 20px 16px;
  font-size: 14px;
  text-indent: 6px;
}
h4::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 90%;
  height: 1px;
  background: #eee;
}
</style>