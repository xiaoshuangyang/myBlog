<template>
  <div class="wraps">
    <div class="bar" ref="bar"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      speed: 1,
      timer: 0,
    };
  },
  expose: ["startloading", "endloading"],
  methods: {
    startloading() {
      let dom = this.$refs.bar;
      let _this = this;
      _this.timer = window.requestAnimationFrame(function fn() {
        if (_this.speed < 90) {
          _this.speed += 1;
          dom.style.width = _this.speed + "%";
          _this.timer = window.requestAnimationFrame(fn);
        } else {
          _this.speed = 1;
          window.cancelAnimationFrame(_this.timer);
        }
      });
    },
    endloading() {
      setTimeout(() => {
        window.requestAnimationFrame(() => {
          let speed = (this.speed = 100);
          this.$refs.bar.style.width = speed + "%";
        });
      }, 500);
    },
  },
};
</script>

<style scoped>
.wraps {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2px;
}
.wraps .bar {
  height: inherit;
  width: 0;
  background: blue;
}
</style>