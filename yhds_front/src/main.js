// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import "./common/styles/common.css"
import "../static/styles/iconfont.css"
import axios from 'axios'
import router from './router'
import * as util from './common/js/util' //什么都没有引入
import * as api from './api/index'  //引入http 和 urconfig
import echarts from 'echarts'




//ajax
import {http} from './ajax/ajax'

//引入百度富文本框
import '../static/Ueditor/ueditor.config'
import '../static/Ueditor/ueditor.all.min'
import '../static/Ueditor/lang/zh-cn/zh-cn'
import '../static/Ueditor/ueditor.parse.min'

//引入JQ加载进度条
import '../static/jq/pro-bars.min.css'



//引入公共的js方法
import './mock/mock'
import App from './App'
Vue.prototype.api=api;
Vue.prototype.util=util;
Vue.prototype.$axios=axios;
Vue.prototype.$echarts = echarts
Vue.use(iView);
Vue.config.productionTip = false;

Vue.$http = Vue.prototype.$http = http

/*过滤中文*/
Vue.filter('delChinese', function (value) {
  return value.replace(/[\u4e00-\u9fa5]/g, '')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

//router.beforeEach((to, from, next) => {
//	if (document.cookie.indexOf('token')==-1){
//		if(to.path=='/login'){ //如果是登录页面路径，就直接next()
//	        next();
//	    } else { //不然就跳转到登录；
//		    	iView.Notice.warning({
//		        title: '请先登陆您的账号',
//		      });
//	        next('/login');
//	    }
//	}
//	else{
//	    next()
//	}
//})