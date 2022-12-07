import { defineStore } from "pinia";
import { person } from "../assets/json/person.json";
const list = JSON.parse(JSON.stringify(person));
export const personStore = defineStore("person", {
  state: () => ({
    //文章数据
    presonList: list,
    //浏览数
    visitNum: [],
    //评论数
    commentsNum: [],
  }),
  persist: {
    //  固化插件
    enabled: true, // 开启存储
    strategies: [
      // 指定存储的位置以及存储的变量都有哪些，该属性可以不写，
      //在不写的情况下，默认存储到 sessionStorage 里面,默认存储 state 里面的所有数据。
      {
        storage: localStorage,
        paths: ["visitNum", "commentsNum"],
      },
      // paths 是一个数组，如果写了 就会只存储 count 变量，当然也可以写多个。
    ],
  },
  getters: {
    //获取文章总数
    getpersonlistNum(state) {
      return state.presonList.length;
    },
    //获取总评论数
    getcommentsAllNum(state) {
      return state.commentsNum.reduce((total, item) => {
        return (total += item.num);
      }, 0);
    },
    //获取总浏览数
    getvisitAllNum(state) {
      return state.visitNum.reduce((total, item) => {
        return (total += item.num);
      }, 0);
    },
    //获取最新的三个数据对象数组
    getNewtimeList(state) {
      let list = [];
      state.presonList.forEach((element) => {
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
      return list.slice(0, 3);
    },
    // 随机获取数据中的一张图片
    getImg(state) {
      let list = [];
      state.presonList.forEach((element) => {
        list.push(element.img);
      });
      return list[Math.floor(Math.random() * 30)];
    },
  },
  actions: {
    //初始化浏览数
    getvisitNumber(pro) {
      pro.forEach((element) => {
        const product = this.visitNum.find((item) => item.id === element.id);
        if (!product) {
          this.visitNum.push({ id: element.id, num: 0 });
        }
      });
    },
    //增加浏览数
    addVisitNumber(pro) {
      const product = this.visitNum.find((item) => item.id === pro.id);
      if (product) {
        product.num++;
      }
    },
    //初始化评论数
    getcommentsNumber(pro) {
      pro.forEach((element) => {
        const product = this.commentsNum.find((item) => item.id === element.id);
        if (!product) {
          this.commentsNum.push({ id: element.id, num: 0 });
        }
      });
    },
    //增加文章评论数
    addcommentsNum(pro) {
      const product = this.commentsNum.find((item) => item.id === pro.id);
      if (product) {
        product.num++;
      }
    },
    //根据id获取数据
    getdetailList(id) {
      let list = null;
      this.presonList.forEach((element) => {
        if (id == element.id) {
          list = element;
        }
      });
      return list;
    },
    //根据id获取浏览数
    getViewNum(id) {
      let list = null;
      this.visitNum.forEach((element) => {
        if (element.id == id) {
          list = element;
        }
      });
      return list;
    },
    // 根据id获取评论数
    getcommentsNum(id) {
      let list = null;
      this.commentsNum.forEach((element) => {
        if (element.id == id) {
          list = element;
        }
      });
      return list;
    },
    //获取浏览数前三的数据对象数组
    getViewThridList(num) {
      let list = [];
      this.presonList.forEach((element) => {
        list.push(element);
      });
      list.sort((a, b) => {
        return b.visitNumber - a.visitNumber;
      });
      return list.slice(0, num);
    },
  },
});
