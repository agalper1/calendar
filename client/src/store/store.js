import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);


export const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
})],
  state:{
    token: null,
    username: null,
    activeDate: null,
    weekNr: null,
  },
  mutations:{
      setToken(state,token){
        state.token = token;
      },
      setUsername(state,username){
        state.username = username;
      },
      setDate(state,activeDate){
        state.activeDate = activeDate;
      },
      setWeekNr(state,weekNr){
        state.weekNr = weekNr;
      }
    },
  actions:{
    updateDate: function ({commit}, payload) {
      commit('setDate', payload)
   },
    updateWeekNr: function ({commit}, payload) {
      commit('setWeekNr', payload)
   }
  }
})

