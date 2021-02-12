import Vue from 'vue';
import SemanticUI from 'semantic-ui-vue';
import App from './App.vue';
import router from './router';

import 'semantic-ui-css/semantic.min.css';

Vue.config.productionTip = false;

Vue.use(SemanticUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
