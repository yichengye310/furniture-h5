import "babel-polyfill";//es6转es5兼容IE
import "url-search-params-polyfill";//让ie兼容new URLSearchParams()
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
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
