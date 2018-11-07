import axios from 'axios'
import iView from 'iview'
import qs from 'qs'
import {Notice} from 'iview'

//请求url处理
function handlUrl(url,params) {
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
//return ajaxUrl; 
return ajaxUrl+'?token=9d21af7885914e8787a342a403932424';
}
//请求成功响应后，若接口内status不等于200，则弹窗提示
function checkStatus (response) {
  if(response && response.data.status==='200'){
    return response;
  }else{
    let desc =response.data.info
    if(response && response.data.status==='700000'){
      iView.Notice.warning({
        title: '提示',
        desc: desc
      });
    }
    if(response && response.data.status==='1005_0006'){
      iView.Notice.error({
        desc: response.data.info
      });
      return response;
    }
//  else{
//    if(response.data.MDC){
//      desc += '['+response.data.MDC+']'
//    }
//    iView.Notice.warning({
//      title: '提示',
//      desc: desc
//    });
//  }
//  if(response && response.data.status ==='1001_0011'){
//    console.log(localStorage.getItem("token"));
//    localStorage.removeItem("token");
//
//    window.location.href=process.env.API_ROOT+'/alibabaLogin/doLogin'
//  }
	}
} 


export default {
  //conf表示一个对象，params表示restful风格参数，reqData表示普通参数
  post (url, conf) {
    url=handlUrl(url,conf.params);
    console.log(conf.reqData)
    return axios({
      method: 'post',
      baseURL: process.env.API_ROOT,
      url,
      data: conf.reqData,
      timeout: 10000,
      headers: {
        // 'token':localStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    }).then(function(res){
      return checkStatus(res);
    })//.catch(function(err){
//    iView.Notice.warning({
//      title: '提示',
//      desc: '网络错误'
//    });
//  });
  },
  get (url, conf) {
    url=handlUrl(url,conf.params);
    console.log(conf.reqData)
    return axios({
      method: 'get',
      baseURL: process.env.API_ROOT,
      url,
      data: conf.reqData,
      timeout: 10000,
      headers: {
        // 'token':localStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest'
      },
    }).then(function(res){
      return checkStatus(res);
    })//.catch(function(err){
//    iView.Notice.warning({
//      title: '提示',
//      desc: '网络错误'
//    });
//  });
 },
// http (url, param = {}, enforce) {
//	  
//	
//	  var p
//	  if (Object.prototype.toString.call(param) === '[object Object]') {
//	    param = qs.stringify(param)
//	    p = axios.post(url, param).then(({data}) => data)
//	  } else {
//	    p = axios.post(url, param, {
//	      headers: {'Content-Type': 'multipart/form-data'}
//	    }).then(({data}) => data)
//	  }
//	
//	  return p
//	}
}
