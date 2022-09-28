import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import Vuex from 'vuex';

import routes from './routes';
import common from './store/common';
import login from './store/login';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    common,
    login,
  },
});

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
