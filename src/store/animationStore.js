import { defineStore } from "pinia";
import { animation } from "../assets/json/animation.json";
const list = JSON.parse(JSON.stringify(animation));
export const animationStore = defineStore("animatiom", {
  state: () => ({
    animatiomList: list,
  }),
  getters: {
    //获取文章总数
    getanimatiomlistNum(state) {
      return state.animatiomList.length;
    },
    //获取最新的两个数据对象数组
    getNewtimeList(state) {
      let list = [];
      state.animatiomList.forEach((element) => {
        list.push(element);
      });
      list.sort((a, b) => {
        if (b.year - a.year == 0) {
          return b.year - a.year != 0
            ? b.year - a.year
            : b.month - a.month != 0
            ? b.month - a.month
            : b.day - a.day != 0
            ? b.day - a.day
            : b.hours - a.hours != 0
            ? b.hours - a.hours
            : b.minutes - a.minutes != 0
            ? b.minutes - a.minutes
            : b.seconds - a.seconds;
        }
      });
      return list.slice(0, 2);
    },
  },
  actions: {},
});
