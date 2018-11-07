//去除数组中的空元素
export const removeEmptyArrayEle = (arr) =>{
  for(let i=0;i<arr.length;i++){
    if(!arr[i]){
      arr.splice(i,1);
      i = i - 1;
    }
  }
}
//判断数组元素是否重复
export const isArrayEleRepeat = (arr)=>{
  let hash = {};
  for(let i in arr) {
    if(hash[arr[i]])
      return true;
    hash[arr[i]] = true;
  }
  return false;
}
export const changeStr = (str) => {
  str = str.replace(/([A-Z])/g,"_$1").toLowerCase();
  return str;
}
//数组去重
export const distinct = (arr)=> {
  return Array.from(new Set(arr));
};
//数组去重
export const sequence = (a,b)=> {
  if (a>b) {
    return 1;
  }else if(a<b){
    return -1
  }else{
    return 0;
  }
};




//时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

