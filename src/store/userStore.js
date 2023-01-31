import { defineStore } from "pinia";
export const userStore = defineStore("user", {
  state: () => ({
    user: "",
  }),
  getters: {},
  actions: {
    setUser(data) {
      this.user = data;
      // console.log(this.user);
    },
  },
});
