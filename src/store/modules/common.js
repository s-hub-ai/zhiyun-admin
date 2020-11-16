import store from "@/utils/store";

export default {
 state: {
  fanClubRegion: [],
  fanClub: []
 },
 actions: {
  getFanClubRegion({
   commit
  }, form) {
   return this.$service.app.fanClubRegion.list().then((res) => {
    commit("SET_FANCLUBREGION", res);
    return res;
   });
  },
  getFanClub({
   commit
  }, form) {
   return this.$service.app.fanClub.list().then((res) => {
    commit("SET_FANCLUB", res);
    return res;
   });
  }
 },
 mutations: {
  SET_FANCLUBREGION(state, val) {
   state.fanClubRegion = val;
  },
  SET_FANCLUB(state, val) {
   state.fanClub = val;
  }
 }
};