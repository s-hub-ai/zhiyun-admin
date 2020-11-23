import store from "@/utils/store";

export default {
 state: {
  defaultColumn: []
 },
 actions: {
  setDefaultcolumn({
   commit
  }, array) {
   commit("SET_DEFAULTCOLUMN", array);

  }
 },
 mutations: {
  SET_DEFAULTCOLUMN(state, val) {
   state.defaultColumn = val;
  }
 }
};