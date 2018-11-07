import axios from 'axios'
import qs from 'qs'
// import store from '../store'
import Vue from 'vue'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL=process.env.API_ROOT
var lastUrl = ''
var lastTime = ''
function http (url, param = {}, enforce) {
	let ajaxUrl;
  //接口有参数
  if (url.indexOf(':') !== -1) {
    let urlParamLength = url.split(':').length - 1;
    if (params && params.length === urlParamLength) {
      ajaxUrl = url.substring(0, url.indexOf(':')) + params.join('/');
    } else {
      console.error('参数个数与api参数个数不一致');
    }
  } else {
  ajaxUrl = url;
  }
ajaxUrl+='?token=9d21af7885914e8787a342a403932424';
  var p
  if (Object.prototype.toString.call(param) === '[object Object]') {
    param = qs.stringify(param)
    p = axios.post(ajaxUrl, param).then(({data}) => data)
  } else {
    p = axios.post(ajaxUrl, param, {
//    headers: {'Content-Type': 'multipart/form-data'}
	  headers: {
        // 'token':localStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    }).then(({data}) => data)
  }
  
  Promise.resolve(p).catch(({message, response: {data}}) => {
    message = data.info || message
    if (data.code === 700000) {
      return iView.Notice.warning({
        title: '提示',
        desc: message
      });
    }
  })
  
  return p
}

export {
  http
}
