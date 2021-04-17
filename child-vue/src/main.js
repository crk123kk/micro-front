import Vue from 'vue';
import App from './App.vue';
import router from './router';

import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

const appOptions = {
  el: '#vue', // 挂载到父应用中的id为vue的标签中
  router,
  render: (h) => h(App),
};

// 通过singleSpaVue将对象包裹起来
// 这样内部就会封装出需要的 bootstrap \ mount \ unmount接口
const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions,
});

// 如果是父应用引用子应用，加载子应用的文件的时候可能会引用到父应用的路径
// 所以需要配置
if (window.singleSpaNavigate) {
  // 当webpack打包引入文件的时候，都会在加载的时候把这个路径加到加载的路径之前
  __webpack_public_path__ = 'http://localhost:10000/';
}

// 当不是通过父应用引用子应用的时候，子应用要可以独立打成一个包，独立运行
if (!window.singleSpaNavigate) {
  delete appOptions.el;
  new Vue(appOptions).$mount('#app');
}

// 协议接入 订好了协议 父应用会调用这些方法
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;

// 我们需要父应用加载子应用，将子应用打包成一个个lib去给父应用使用,通过webpack配置打包信息实现
