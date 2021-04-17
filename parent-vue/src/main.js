import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { registerApplication, start } from 'single-spa';

Vue.config.productionTip = false;

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

registerApplication(
  'myVueApp',
  async () => {
    await loadScript(`http://localhost:10000/js/chunk-vendors.js`);
    await loadScript(`http://localhost:10000/js/app.js`);
    // bootstrap mount unmount
    return window.singleVue;
  },
  // 用户切换到 /vue的路径下，加载定义好的子应用
  (location) => location.pathname.startsWith('/vue')
);

start();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
