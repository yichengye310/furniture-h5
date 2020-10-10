import "babel-polyfill";//es6转es5兼容IE
import "url-search-params-polyfill";//让ie兼容new URLSearchParams()
import Vue from 'vue'
import App from './App.vue'
import router from './router';
//import store from './store'; //彭惠修改，解决首次登录token失效问题
import store from '@/store/index.js';
import config from './assets/js/conf/config';
import utils from './assets/js/utils';
import axios from 'axios';
import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
// import $ from 'jquery'

Vue.prototype.$ajax = axios


Vue.config.productionTip = false;


Vue.prototype.$config=config;
Vue.prototype.$utils=utils;

//彭惠修改，解决首次登录token失效问题
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if(store.state.user.authToken){
    config.headers.token=store.state.user.authToken;
  }
   
  return config;
  }, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// Vue.prototype.resetSetItem = function (key, newVal) {
//   if (key === 'flage') {

//       // 创建一个StorageEvent事件
//       var newStorageEvent = document.createEvent('StorageEvent');
//       const storage = {
//           setItem: function (k, val) {
//               sessionStorage.setItem(k, val);

//               // 初始化创建的事件
//               newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

//               // 派发对象
//               window.dispatchEvent(newStorageEvent)
//           }
//       }
//       return storage.setItem(key, newVal);
//   }
// }

import Back from './assets/js/utils/wulifanhui.js'

axios.defaults.headers = {
	// "Content-Type": "application/json",
	// 'Content-Type': 'application/x-www-form-urlencoded',
	"token": localStorage['authToken'],
}


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
