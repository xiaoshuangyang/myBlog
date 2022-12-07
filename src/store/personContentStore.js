import { defineStore } from "pinia";
import { data } from "../assets/json/personContent.json";
const list = JSON.parse(JSON.stringify(data));
export const personContentStore = defineStore("personContent", {
  state: () => ({
    data: list,
  }),
  actions: {
    //根据id获取数据
    getdetailList(id) {
      let list = null;
      this.data.forEach((element) => {
        if (id == element.id) {
          list = element;
        }
      });
      return list;
    },
  },
});
