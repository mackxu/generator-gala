import Vue from 'vue';
import vmLog from 'plugins/log';
import App from './App';
// import './helper/test-api';

Vue.use(vmLog);

new Vue({
  render: h => h(App),
}).$mount('#app');
