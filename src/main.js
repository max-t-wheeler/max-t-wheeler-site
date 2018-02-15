import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
