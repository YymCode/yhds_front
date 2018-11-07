import url from '../api/urlConfig';
const devServerRoot = "http://127.0.0.1:8888";
const Mock = require('mockjs');

//TODO 优化apimoke的方式，不要在底层http.js中判断环境,路径配置正则表达式，mack数据用js文件保存
//处理mock的url
function handMockUrl(path) {
  let ajaxUrl;
  if(path.indexOf(':')!==-1){
    var params=[];
    let urlParamLength=path.split(':').length-1;
    for(let i=0 ; i <urlParamLength ; i++){
      params[i]=".*"
    }
    ajaxUrl = path.substring(0,path.indexOf(':'))+params.join('/');
  }else{
    ajaxUrl=path

  }
  return new RegExp(devServerRoot+ajaxUrl);
}


//用户名
const UserInfo= function() {
  return {
    "status": "200",
    "info": "操作成功",
    "mapInfo": {
      "userName": "hndomestic",
      "yhTimes": "123",
      "loginTimes": "123",
      "hasStoreInfo":true,
    }
  }
};
Mock.mock(handMockUrl(url.getUserInfo),UserInfo);



/*******************关键词采集——后台关键词接口 author：xwy***************/
//搜索关键词
const backKeyword = function() {
  return {
    "status": "200",
    "page": null,
    "info": "获取成功",
    "mapInfo": {},
    "rows": [{
      "bkwId":"111",
      "bkwKeywords": "mp3",
      "bkwSearchHot": "1",
      "bkwCompanyCnt": "1",
      "bkwShowwinCnt": "1"
    },{
      "bkwId":"222",
      "bkwKeywords": "mp4",
      "bkwSearchHot": "2",
      "bkwCompanyCnt": "4",
      "bkwShowwinCnt": "3"
    },{
      "bkwId":"333",
      "bkwKeywords": "mp4",
      "bkwSearchHot": "2",
      "bkwCompanyCnt": "4",
      "bkwShowwinCnt": "3"
    }],
    "total": 98
  }
}
Mock.mock(handMockUrl(url.BACK_FINDBACKKEYWORD), backKeyword);

//添加到词库
const addToThesaurus = function () {
  return {
    "status": "200",
    "page": null,
    "info": "添加成功",
    "mapInfo": {},
    "rows": null,
    "total":  null
  }
}
Mock.mock(handMockUrl(url.BACK_ADDTOKEYWORDSGROUP), addToThesaurus);

//关键词过滤
const filterKeywords = function () {
  return {
    "status": "200",
    "page": null,
    "info": "获取成功",
    "mapInfo": {},
    "rows": [{
      "bkwId":"123",
      "bkwKeywords": "mp3",
      "bkwSearchHot": 1,
      "bkwCompanyCnt": 1,
      "bkwShowwinCnt": 1
    }],
    "total": 2
  }
}
Mock.mock(handMockUrl(url.BACK_FILTERKEYWORDS), filterKeywords);

/*********************关键词采集——产品关键词接口 author：xwy**************/
//关键词查询
const productShowList = function () {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "createBy": "hndomestic",
      "createTime": 1516627121000,
      "updateBy": "hndomestic",
      "updateTime": 1516627121000,
      "offset": "",
      "limit": 10,
      "sqId": "ae159d13885a478f8e2d81b437606539",
      "alibabaUserId": "3369982826",
      "sqWord": "mp3",
      "sqBeginTime": null,
      "sqEndTime": 1516627121000,
      "sqVersion": 201809011411,
      "sqStatus": 3
    },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478ewqewqqf8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": 1516627121000,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 2
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },
      {
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      },{
        "createBy": "hndomestic",
        "createTime": 1516627121000,
        "updateBy": "hndomestic",
        "updateTime": 1516627121000,
        "offset": "",
        "limit": 10,
        "sqId": "ae159d13885a478f8e2d81b437606539",
        "alibabaUserId": "3369982826",
        "sqWord": "mp3",
        "sqBeginTime": null,
        "sqEndTime": 1516627121000,
        "sqVersion": 201809011411,
        "sqStatus": 1
      }],
    "total": 1
  }
}
Mock.mock(handMockUrl(url.PRODUCT_SHOWlIST), productShowList);
//关键词删除
const productDel = function () {
  return {
    "status": "200",
    "info": "成功删除1条数据",
    "mapInfo": [{}]
  }
}
Mock.mock(handMockUrl(url.PRODUCT_DEL), productDel);
//关键词查看
const productView = function () {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "0704a6b182004856b91315f64a015ab5",
        "pkwKeywords": "bulk footballs",
        "pkwCompanyCnt": "64",
        "pkwShowwinCnt": "1",
        "pkwSearchHot": "70",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "119c579fa095472997edb5bddc051c59",
        "pkwKeywords": "football training",
        "pkwCompanyCnt": "91",
        "pkwShowwinCnt": "8",
        "pkwSearchHot": "450",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "1cd9437c4a8e4c9498d67ba00e89149b",
        "pkwKeywords": "new soccer ball designs football design",
        "pkwCompanyCnt": "126",
        "pkwShowwinCnt": "9",
        "pkwSearchHot": "4",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "22270ba50fd34ed5b06a8d815421a163",
        "pkwKeywords": "football soccer",
        "pkwCompanyCnt": "174",
        "pkwShowwinCnt": "9",
        "pkwSearchHot": "3300",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "25d07ca15523473b95a4330934e9f9c0",
        "pkwKeywords": "soccer goal",
        "pkwCompanyCnt": "232",
        "pkwShowwinCnt": "43",
        "pkwSearchHot": "840",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "331938533eea42519362cfb8b1b862f9",
        "pkwKeywords": "thermal bonded soccer ball",
        "pkwCompanyCnt": "35",
        "pkwShowwinCnt": "7",
        "pkwSearchHot": "60",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "336cec566f544634ae1d12edd1237980",
        "pkwKeywords": "led glow",
        "pkwCompanyCnt": "10",
        "pkwShowwinCnt": "1",
        "pkwSearchHot": "80",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "4fe6021e5bca4b03b3a16a0d8ba415fd",
        "pkwKeywords": "training soccer",
        "pkwCompanyCnt": "30",
        "pkwShowwinCnt": "1",
        "pkwSearchHot": "31",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "50b79848f866455ebbecd40c6085c678",
        "pkwKeywords": "match soccer ball",
        "pkwCompanyCnt": "136",
        "pkwShowwinCnt": "14",
        "pkwSearchHot": "90",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "56724eed45fc43bfbd838db30864f548",
        "pkwKeywords": "soccer balls made in pakistan",
        "pkwCompanyCnt": "6",
        "pkwShowwinCnt": "1",
        "pkwSearchHot": "38",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      }
    ],
    "total": 31
  }
}
Mock.mock(handMockUrl(url.PRODUCTWORD_SHOWlIST), productView);
//关键词重新分析
const productReanalyse = function () {
  return {
    "status": "200",
    "page": null,
    "info": "操作成功",
    "mapInfo": {},
    "rows": null,
    "total":  null
  }
}
Mock.mock(handMockUrl(url.PRODUCT_REANALYSE), productReanalyse);
//关键词过滤
const productFilterKeywords = function () {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "0704a6b182004856b91315f64a015ab5",
        "pkwKeywords": "bulk footballs",
        "pkwCompanyCnt": "64",
        "pkwShowwinCnt": "1",
        "pkwSearchHot": "70",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      },
      {
        "createBy": "system_user",
        "createTime": 1516869527000,
        "updateBy": "system_user",
        "updateTime": 1516869527000,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "pkwId": "119c579fa095472997edb5bddc051c59",
        "pkwKeywords": "football training",
        "pkwCompanyCnt": "91",
        "pkwShowwinCnt": "8",
        "pkwSearchHot": "450",
        "sqId": "5f3dd2a58209425aaa382708bfc20a96"
      }
    ],
    "total": 2
  }
}
Mock.mock(handMockUrl(url.PRODUCT_FILTERKEYWORDS), productFilterKeywords);

/*********************关键词采集——同行关键词接口 author：xwy**************/
//
const showCategroyList = function () {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "ZOc5MXjJHaKv5VYEzABE",
        "cateCode": "221840607",
        "cateName": "For Apple spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 83604,
        "cateAddTime": 1517019410468,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "1T72VJ22G3LayXmW2I7D",
        "cateCode": "221840608",
        "cateName": "For Samsung spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 389646,
        "cateAddTime": 1517019410469,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "lcBrfV0uj2iOFdxE5T0H",
        "cateCode": "221840610",
        "cateName": "For Sony spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 587322,
        "cateAddTime": 1517019410469,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "tIu4rtoXHA5yebVgXiwt",
        "cateCode": "221840609",
        "cateName": "For LG spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 996026,
        "cateAddTime": 1517019410469,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "9vza3eYKfzFQaqUme0aJ",
        "cateCode": "221904469",
        "cateName": "For HTC spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 341804,
        "cateAddTime": 1517019410469,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "kdSQ9NvviykmH8JW6uaf",
        "cateCode": "801410321",
        "cateName": "For Moto spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 845939,
        "cateAddTime": 1517019410469,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "fFdLsHcZPKmsysslY6wt",
        "cateCode": "221904471",
        "cateName": "For Blackberry spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 800008,
        "cateAddTime": 1517019410469,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "ZNv1KMGjLvbQCFearYXt",
        "cateCode": "804125253",
        "cateName": "For Huawei spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 564566,
        "cateAddTime": 1517019410469,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "XDME0uodUuGVa8pqfbCw",
        "cateCode": "221896602",
        "cateName": "For Nokia spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 292232,
        "cateAddTime": 1517019410469,
        "cateUser": null
      },
      {
        "createBy": "hndomestic",
        "createTime": null,
        "updateBy": "hndomestic",
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "cateId": "ZtaMMYlHzcZ2yiJpnrMX",
        "cateCode": "221922621",
        "cateName": "For Asus spare part",
        "cateUrl": "https://joyking.en.alibaba.com/",
        "cateOperationBatch": 941630,
        "cateAddTime": 1517019410469,
        "cateUser": null
      }
    ],
    "total": 10
  }
}
Mock.mock(handMockUrl(url.PERR_SHOWCATEGORYlIST), showCategroyList);
//同行关键词队列列表
const perrList = function () {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "kwqId": "8ba6655c38c04f44bbed6679faa42848",
        "alibabaUserId": "3369982826",
        "kwqLink": "https://joyking.en.alibaba.com",
        "kwqCategrates": "",
        "kwqProductCount": "1",
        "kwqStartTime": "",
        "kwqEndTime": "",
        "kwqVersion": "201801271357",
        "kwqStatus": "1",
        "createBy": "hndomestic",
        "createTime": "2018-01-27 13:57:40",
        "updateBy": "hndomestic",
        "updateTime": "2018-01-27 13:57:40"
      }
    ],
    "total": 1
  }
}
Mock.mock(handMockUrl(url.PERR_SHOWlIST), perrList);
//删除同行关键词队列
const perrListDel = function () {
  return {
    "status": "200",
    "info": "成功删除1条数据",
    "mapInfo": [{}]
  }
}
Mock.mock(handMockUrl(url.PERR_lISTDEL), perrListDel);






/***************************************产品发布——选择分类 author：xwy*************************/
//选择分类
const findCategory = function () {
  return {
    "status": "200",
    "page": null,
    "info": "查询成功",
    "mapInfo": {},
    "rows": [
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "30",
        "categoryName": "Security & Protection",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "3030, 3008, 3011, 3009, 301002, 301001, 3010, 301003, 3016, 3005, 3015, 3012, 3014, 3019, 3006, 3007"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "26",
        "categoryName": "Toys & Hobbies",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "2621, 100001698, 100001741, 2622, 2624, 100001715, 2605, 100001714, 2601, 100001763, 100001740, 100009508, 100001764, 2610, 100001719, 100001716, 2629, 100006336, 2614, 100001718, 2607, 2631, 100001781, 100001717, 100006335"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "3",
        "categoryName": "Apparel",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "280503, 355, 333, 311, 313, 100005744, 100005726, 307, 328, 100005875, 100005753, 310, 317, 100005742, 314, 33801, 345, 348, 335, 318, 353, 100005743, 349, 100005794, 301, 100005769, 316, 321, 100008574, 354, 350, 312, 100005773, 337, 352, 320, 100005786"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "339",
        "categoryName": "Fashion Accessories",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "33913, 32801, 33911, 33912, 33903, 324, 33904, 33905, 33906"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "2829",
        "categoryName": "Service Equipment",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "281919, 282914, 282904, 510, 2826, 282999, 2406, 282903, 282901, 282905, 2818"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "1503",
        "categoryName": "Furniture",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100003020, 100003019, 150301, 3712, 150306, 3708, 150303, 150399, 150302"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "44",
        "categoryName": "Consumer Electronics",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100000305, 629, 7, 100005069, 100000308, 100001205, 4499, 100000306, 100000310"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "2",
        "categoryName": "Food & Beverage",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "204, 100009004, 218, 207, 214, 100009028, 236, 209, 100009061, 208, 100000380, 100002821, 238, 100009057, 216, 235, 225, 109, 212, 100009103, 202, 100007269, 100002841"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "12",
        "categoryName": "Transportation",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "1219, 100001050, 1218, 1204, 1228, 1222, 120703, 1227, 122704, 100001627, 1205, 190000191, 1221, 100001745, 100001604, 1225, 1206002, 100001648, 100001700, 1239, 1232, 1238, 100005311, 1206001, 1206, 1223, 1231, 1230"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "80",
        "categoryName": "Rubber & Plastics",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "8004, 8005, 8006, 807, 8007, 8008, 8009, 8011, 8012, 8013, 808, 8014"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "4",
        "categoryName": "Textiles & Leather Products",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100000681, 100000266, 415, 100000687, 414, 405, 100000688, 402, 100000692, 100000689, 280504, 417, 427, 408"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "8",
        "categoryName": "Chemicals",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100007202, 100003089, 100003087, 100003086, 190000040, 100003090, 817, 100003469, 833, 100004068, 82102, 100003084, 826, 824, 100006083, 830, 190000096, 100003664, 100003091, 100006082, 190000079"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "13",
        "categoryName": "Construction & Real Estate",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "1341, 100006264, 100006265, 100005320, 1315, 100007099, 1340, 131210, 100005265, 1343, 100007064, 153803, 100005281, 100007065, 100007066, 100007073, 100007067, 100005288, 100007069, 100006266, 1353, 1356, 1335, 100005291, 100006324, 1330, 131211, 100005264, 1320, 1316, 1338, 1325, 1333, 100005310, 1312, 31, 100005334, 100007071, 131207, 100007082, 100006285, 100005335, 131205, 1303, 100005344"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "42",
        "categoryName": "Hardware",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "4204, 1428, 4201, 1455, 4202, 1459, 4206, 4203, 4209, 4299, 100011035, 1466, 100011037, 100011036, 4207"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "10",
        "categoryName": "Energy",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100002827, 100002825, 122, 1002, 1005, 100107, 100110, 1004, 100002888, 1003, 1011, 1001, 1007, 100002824"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "11",
        "categoryName": "Environment",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "1103, 1102, 1107, 3299, 1105, 1106, 1104, 1101"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "23",
        "categoryName": "Packaging & Printing",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "230620, 100000343, 230606, 230603, 230604, 232002, 232004, 23190405, 100000379, 232007, 100001210, 23190204, 231906, 23190903, 230608, 230616, 23190303, 230609, 232006, 231910, 230699, 190000086, 2302, 2303, 230107, 2305, 100001208, 2316, 2312, 23190206, 2318, 232003, 100001126, 23190403, 230607, 2311, 100005067, 3597, 230615, 230111, 2314"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "28",
        "categoryName": "Business Services",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "2819, 2833, 2804, 2802, 2803, 24, 2834, 2842, 2841, 2806, 280604, 2831, 2815, 2206, 2813, 2840, 2839, 2807, 2825, 2812, 2805, 2903, 2838, 2823, 2832, 2843, 100007865, 100004560, 25, 2811"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "17",
        "categoryName": "Gifts & Crafts",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "1730, 1706, 150404, 100001404, 100001824, 1733, 100001768, 1735, 100001776, 100001780, 1732, 100001782, 1736, 1737, 1729, 1704, 1905, 100001788"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "43",
        "categoryName": "Machinery",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100010631, 100010652, 4314, 100010655, 1408, 100010639, 1326, 100007236, 100010703, 1530, 100010667, 100007188, 1426, 4399, 100010668, 100010696, 100010697, 100010695, 100007142, 1431"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "6",
        "categoryName": "Home Appliances",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100000037, 100000038, 614, 100000039, 631, 100000040, 100000041, 100000042, 628, 100000136, 100000043, 100000044, 648"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "322",
        "categoryName": "Shoes & Accessories",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "32203, 32204, 32213, 100001636, 100004067, 100001647, 32299, 32205, 32209, 32210, 100004559, 32220, 32221, 32216, 32206, 32208, 100001656, 32217"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "509",
        "categoryName": "Telecommunications",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "5092101, 100001204, 100001202"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "1524",
        "categoryName": "Luggage, Bags & Cases",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "3807, 4348, 152409, 3801, 3802, 100001865, 152404, 3810, 152499, 3805, 3806, 3803"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "41",
        "categoryName": "Mechanical Parts & Fabrication Services",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100004576, 100004507, 1456, 100004565, 146907, 1433, 4113, 4101, 4111, 4108, 4102, 190000179, 100007519, 100004516, 100007210, 100007152, 100007157, 1458, 4107, 131006, 1473, 1469, 100008951, 1407, 4106, 4109, 100004465, 1460, 1427"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "16",
        "categoryName": "Health & Medical",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100002907, 100009256, 100002908, 100008884, 100002906, 100002903, 100003664"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "34",
        "categoryName": "Automobiles & Motorcycles",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "3411, 100001610, 100010932, 120203, 3404, 1202, 100002895, 120688, 100010933, 1213, 1212, 3407, 3406, 1203, 100004517, 121888, 12809, 1215, 3409, 3408"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "21",
        "categoryName": "Office & School Supplies",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "211111, 211112, 212002, 100003132, 2114, 2202, 501, 150415, 21200204, 100003125, 211106, 2139, 21111107, 100003135, 2142, 100003177, 211110, 2110, 2213, 2209, 21110706, 100003155, 100003134, 100003129, 100003131, 100003126, 2112, 2115, 211103, 100003150, 2102, 211107, 2103, 2113, 2138, 2117, 2140, 21110709, 100001129"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "1420",
        "categoryName": "Tools",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "142016, 12503, 142003, 126986065, 100009282, 100007498, 100010815, 127054037, 142099, 127058040, 100007488, 1417, 127040001, 190000106, 142014, 142001, 142015, 100007504, 142011, 100007485, 142012"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "36",
        "categoryName": "Timepieces, Jewelry, Eyewear",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "1512, 1509, 1511"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "502",
        "categoryName": "Electronic Components & Supplies",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "4001, 150412, 4003, 504, 150407, 4002, 515, 4004, 4099, 4005"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "32",
        "categoryName": "Excess Inventory",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "631, 153714"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "5",
        "categoryName": "Electrical Equipment & Supplies",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "528, 141914, 14190406, 526, 141905, 150512, 4103, 540, 141902, 516, 141913, 4105, 141911, 527, 141909, 141906, 141907, 141904, 14190403"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "9",
        "categoryName": "Minerals & Metallurgy",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "936, 944, 941, 146701, 902, 100009172, 146703, 90902, 935, 90901, 1406, 90903, 90904, 921, 917, 939, 90905, 911, 110502, 916, 90906, 100010574, 940, 908, 904, 918, 943, 942, 90907, 922, 90908, 100000317, 937, 100007334, 903, 938"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "39",
        "categoryName": "Lights & Lighting",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100010565, 150403, 150406, 100010467, 530, 150402, 3999, 100010530, 100010540"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "1",
        "categoryName": "Agriculture",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100004477, 138, 134, 100006071, 100002818, 100002874, 105, 10502, 10503, 115, 129, 103, 10202, 101, 100009208, 106, 104, 100002200, 135, 136, 100001862, 100009254, 10508"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "15",
        "categoryName": "Home & Garden",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100003040, 100003052, 100003467, 100003238, 152303, 125, 3710, 1541, 100003864, 1514, 100004776, 100003268, 1516, 100006664, 1522"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "18",
        "categoryName": "Sports & Entertainment",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "100005410, 100005421, 100005371, 100005396, 100005360, 100005427, 100005481, 100005714, 100005528, 2042, 2031, 100005588, 100005607, 100005650, 100005657, 100005679"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "66",
        "categoryName": "Beauty & Personal Care",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "660201, 660101, 660105, 100000617, 100000618, 660102, 660204, 100000615, 660301, 660103, 660104, 3308, 3305, 660199, 1513, 660302, 3306, 100000616"
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "catId": null,
        "categoryId": "1537",
        "categoryName": "Measurement & Analysis Instruments",
        "parentIds": "0",
        "leafCategory": "0",
        "childIds": "153701, 153702, 153703, 505, 153704, 153713, 153705, 153717, 153718, 153714, 142006, 1904, 153712, 153706, 153708, 153709, 153710, 620, 153715, 153711"
      }
    ],
    "total": null
  }
}
Mock.mock(handMockUrl(url.PRODUCTRELEASE_FINDCATEGORY), findCategory);
//产品发布固定属性
const getAttributes = function () {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {

    },
    "rows": [
      {
        "attrId": 100007008,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 100018730,
            "catId": null,
            "childAttrs": [
              100007705
            ],
            "enName": "In-Stock Items",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100018731,
            "catId": null,
            "childAttrs": null,
            "enName": "OEM Service",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Supply Type",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": true,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 100007705,
        "attributeValues": null,
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Available Quantity",
        "inputType": "input",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "input",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": 100018730
      },
      {
        "attrId": 100002057,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 4,
            "catId": null,
            "childAttrs": null,
            "enName": "Other",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 9126,
            "catId": null,
            "childAttrs": null,
            "enName": "Spandex / Polyester",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361836,
            "catId": null,
            "childAttrs": null,
            "enName": "100% Polyester",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 6828,
            "catId": null,
            "childAttrs": null,
            "enName": "Synthetic Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5228,
            "catId": null,
            "childAttrs": null,
            "enName": "Polyester / Cotton",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361835,
            "catId": null,
            "childAttrs": null,
            "enName": "100% Cotton",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5362,
            "catId": null,
            "childAttrs": null,
            "enName": "Faux Fur",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 1042,
            "catId": null,
            "childAttrs": [
              100008126,
              19122
            ],
            "enName": "Genuine Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361975,
            "catId": null,
            "childAttrs": null,
            "enName": "Nylon / Cotton",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5269,
            "catId": null,
            "childAttrs": null,
            "enName": "Polyester / Nylon",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 360787,
            "catId": null,
            "childAttrs": [
              100008127,
              19122
            ],
            "enName": "Fur",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7322,
            "catId": null,
            "childAttrs": null,
            "enName": "Wool / Viscose",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7326,
            "catId": null,
            "childAttrs": null,
            "enName": "Wool / Polyester",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Shell Material",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 100008127,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 3744,
            "catId": null,
            "childAttrs": null,
            "enName": "Sheep",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 3745,
            "catId": null,
            "childAttrs": null,
            "enName": "Fox",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 3747,
            "catId": null,
            "childAttrs": null,
            "enName": "Muskrat",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361830,
            "catId": null,
            "childAttrs": null,
            "enName": "Mink",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100020386,
            "catId": null,
            "childAttrs": null,
            "enName": "Beavers",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5369,
            "catId": null,
            "childAttrs": null,
            "enName": "Chinchilla",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 3771,
            "catId": null,
            "childAttrs": null,
            "enName": "Horse",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 3743,
            "catId": null,
            "childAttrs": null,
            "enName": "Rabbit",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Fur Type",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": 360787
      },
      {
        "attrId": 19122,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 361831,
            "catId": null,
            "childAttrs": null,
            "enName": "Raw",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100020388,
            "catId": null,
            "childAttrs": null,
            "enName": "One Whole Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100020389,
            "catId": null,
            "childAttrs": null,
            "enName": "Double Face Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 580,
            "catId": null,
            "childAttrs": null,
            "enName": "Dyed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 2356,
            "catId": null,
            "childAttrs": null,
            "enName": "Embossed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100020387,
            "catId": null,
            "childAttrs": null,
            "enName": "Shearing",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 365663,
            "catId": null,
            "childAttrs": null,
            "enName": "Knitted",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Processing Type",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": 1042
      },
      {
        "attrId": 100008126,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 7284,
            "catId": null,
            "childAttrs": null,
            "enName": "Calf Skin",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7285,
            "catId": null,
            "childAttrs": null,
            "enName": "Chamois Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7286,
            "catId": null,
            "childAttrs": null,
            "enName": "Ostrich Skin",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 362163,
            "catId": null,
            "childAttrs": null,
            "enName": "Cow Skin",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 4519,
            "catId": null,
            "childAttrs": null,
            "enName": "Pig Skin",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7287,
            "catId": null,
            "childAttrs": null,
            "enName": "Salmon Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7288,
            "catId": null,
            "childAttrs": null,
            "enName": "Fish Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7289,
            "catId": null,
            "childAttrs": null,
            "enName": "Lizard Skin",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7290,
            "catId": null,
            "childAttrs": null,
            "enName": "Snake Skin",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 604,
            "catId": null,
            "childAttrs": null,
            "enName": "Sheep Skin",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 605,
            "catId": null,
            "childAttrs": null,
            "enName": "Stingray Skin",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Leather Type",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": 1042
      },
      {
        "attrId": 19122,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 929,
            "catId": null,
            "childAttrs": null,
            "enName": "Coated",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7297,
            "catId": null,
            "childAttrs": null,
            "enName": "Tanned",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 362164,
            "catId": null,
            "childAttrs": null,
            "enName": "Bonded",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7298,
            "catId": null,
            "childAttrs": null,
            "enName": "Finished",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 372,
            "catId": null,
            "childAttrs": null,
            "enName": "Polished",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 2356,
            "catId": null,
            "childAttrs": null,
            "enName": "Embossed",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Processing Type",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": 360787
      },
      {
        "attrId": 100002012,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 529,
            "catId": null,
            "childAttrs": null,
            "enName": "Canvas",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100005988,
            "catId": null,
            "childAttrs": null,
            "enName": "Corduroy",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100005990,
            "catId": null,
            "childAttrs": null,
            "enName": "Denim",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 360758,
            "catId": null,
            "childAttrs": null,
            "enName": "Oxford",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 4,
            "catId": null,
            "childAttrs": null,
            "enName": "Other",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 1910,
            "catId": null,
            "childAttrs": null,
            "enName": "Velour",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 60,
            "catId": null,
            "childAttrs": null,
            "enName": "Fleece",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100005993,
            "catId": null,
            "childAttrs": null,
            "enName": "Satin",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100005995,
            "catId": null,
            "childAttrs": null,
            "enName": "Worsted",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100005994,
            "catId": null,
            "childAttrs": null,
            "enName": "Woolen",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Fabric Type",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 100002054,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 4,
            "catId": null,
            "childAttrs": null,
            "enName": "Other",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006541,
            "catId": null,
            "childAttrs": null,
            "enName": "Down Feather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361836,
            "catId": null,
            "childAttrs": null,
            "enName": "100% Polyester",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Filling Material",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 284,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 100006039,
            "catId": null,
            "childAttrs": null,
            "enName": "Unisex",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006038,
            "catId": null,
            "childAttrs": null,
            "enName": "Men",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006040,
            "catId": null,
            "childAttrs": null,
            "enName": "Women",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Gender",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 263,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 96,
            "catId": null,
            "childAttrs": null,
            "enName": "Yarn Dyed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 4,
            "catId": null,
            "childAttrs": null,
            "enName": "Other",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 6214,
            "catId": null,
            "childAttrs": null,
            "enName": "Washed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006012,
            "catId": null,
            "childAttrs": null,
            "enName": "Plain Dyed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 541,
            "catId": null,
            "childAttrs": null,
            "enName": "Embroidered",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 77,
            "catId": null,
            "childAttrs": null,
            "enName": "Printed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006011,
            "catId": null,
            "childAttrs": null,
            "enName": "Garment Dyed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006010,
            "catId": null,
            "childAttrs": null,
            "enName": "Beaded",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Technics",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 100002013,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 6209,
            "catId": null,
            "childAttrs": null,
            "enName": "Breathable",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 6177,
            "catId": null,
            "childAttrs": null,
            "enName": "Eco-Friendly",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5076,
            "catId": null,
            "childAttrs": null,
            "enName": "Anti-Wrinkle",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006209,
            "catId": null,
            "childAttrs": null,
            "enName": "Quick Dry",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 708,
            "catId": null,
            "childAttrs": null,
            "enName": "Waterproof",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 4,
            "catId": null,
            "childAttrs": null,
            "enName": "Other",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100005997,
            "catId": null,
            "childAttrs": null,
            "enName": "Maternity",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006540,
            "catId": null,
            "childAttrs": null,
            "enName": "Reversible",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100005999,
            "catId": null,
            "childAttrs": null,
            "enName": "Plus Size",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006312,
            "catId": null,
            "childAttrs": null,
            "enName": "Anti-Shrink",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Feature",
        "inputType": "multi_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "check_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 1,
        "attributeValues": null,
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Place of Origin",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 2,
        "attributeValues": null,
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Brand Name",
        "inputType": "input",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "input",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 3,
        "attributeValues": null,
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Model Number",
        "inputType": "input",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "input",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      },
      {
        "attrId": 327,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 100006582,
            "catId": null,
            "childAttrs": null,
            "enName": "Blazer",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006589,
            "catId": null,
            "childAttrs": null,
            "enName": "Overcoat",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006367,
            "catId": null,
            "childAttrs": null,
            "enName": "Jackets",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100006590,
            "catId": null,
            "childAttrs": null,
            "enName": "Poncho",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Style",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null,
        "parentId": null
      }
    ],
    "total": null
  }

}
Mock.mock(handMockUrl(url.PRODUCTRELEASE_GETATTRIBUTES), getAttributes);

//批量发布查询
const queryGroupInformation = function () {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "offset": "",
      "limit": 10,
      "order": "desc",
      "sort": "create_time",
      "isSelectAll": "",
      "wgId": "09d5993d94e04ea5a4b89465b2895aca",
      "wgName": "ceramicmug",
      "alibabaUserId": "3369982826",
      "groupKeywordsNumber": 31,
      "groupImagesNumber": "",
      "keywordsNumber": "0",
      "imagesNumber": "0",
      "selectAll": ""
    },
      {
        "offset": "",
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "isSelectAll": "",
        "wgId": "09d5993d94e04ea5a4b89465b2895aca",
        "wgName": "ceramicmug",
        "alibabaUserId": "3369982826",
        "groupKeywordsNumber": 31,
        "groupImagesNumber": "",
        "keywordsNumber": "0",
        "imagesNumber": "0",
        "selectAll": ""
      }],
    "total": 1
  }

}
Mock.mock(handMockUrl(url.BACTH_QUERYGROUPINFORMATION), queryGroupInformation);
//获取所有分组
const getAllGroup = function (){
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "children": [],
        "value": 806129471,
        "label": "clothing"
      },
      {
        "children": [],
        "value": 805496433,
        "label": "3d embossed  mug"
      },
      {
        "children": [
          {
            "children": [],
            "value": 805462495,
            "label": "7oz"
          },
          {
            "children": [],
            "value": 805463299,
            "label": "8oz"
          },
          {
            "children": [],
            "value": 805464074,
            "label": "9oz"
          },
          {
            "children": [],
            "value": 805254965,
            "label": "10oz"
          },
          {
            "children": [],
            "value": 805354872,
            "label": "11oz"
          },
          {
            "children": [],
            "value": 805251791,
            "label": "12oz"
          },
          {
            "children": [],
            "value": 805358822,
            "label": "14oz"
          },
          {
            "children": [],
            "value": 805354066,
            "label": "15oz"
          },
          {
            "children": [],
            "value": 805255737,
            "label": "16oz"
          },
          {
            "children": [],
            "value": 805252579,
            "label": "20oz"
          }
        ],
        "value": 805252550,
        "label": "mug size"
      },
      {
        "children": [
          {
            "children": [],
            "value": 805572415,
            "label": "color changing mug"
          },
          {
            "children": [],
            "value": 805225745,
            "label": "new bone china"
          },
          {
            "children": [],
            "value": 805253161,
            "label": "stoneware"
          },
          {
            "children": [],
            "value": 805353290,
            "label": "porcelain"
          }
        ],
        "value": 805311038,
        "label": "mug type"
      },
      {
        "children": [],
        "value": 805353262,
        "label": "cup with saucer"
      },
      {
        "children": [],
        "value": 805356421,
        "label": "mug with silicone"
      },
      {
        "children": [],
        "value": 805351691,
        "label": "mug with lid"
      },
      {
        "children": [],
        "value": 805310270,
        "label": "plate"
      },
      {
        "children": [],
        "value": 805356463,
        "label": "bowl"
      },
      {
        "children": [],
        "value": 805255740,
        "label": "dinner set"
      },
      {
        "children": [],
        "value": 805293945,
        "label": "coffee set/tea set"
      }
    ],
    "total": null
  }

}
Mock.mock(handMockUrl(url.PRODUCTRELEASE_GETGROUPS), getAllGroup);

const showWaitList = function () {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {

    },
    "rows": [
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "proId": "203ad1fd5cc54fdab0fd358246a36018",
        "alibabaUserId": null,
        "productId": null,
        "subject": "第一个发布的产品",
        "productType": "sourcing",
        "keywords1": "苹果",
        "keywords2": "红苹果",
        "keywords3": "大苹果",
        "groupId": 100,
        "categoryId": 1735,
        "description": "111111",
        "market": "main",
        "extraContext": "{}",
        "proStatus": "0",
        "status": null,
        "proCategory": "3,2,3",
        "language": "ENGLISH",
        "proFrom": "1",
        "proAttributes": "{}",
        "discountPrices": [
          {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "offset": 0,
            "limit": 10,
            "order": null,
            "sort": null,
            "ids": null,
            "isSelectAll": 0,
            "dpId": "47b04dd2f3694eaea1e0d526dd53d2be",
            "startQuantity": 1,
            "price": "222222",
            "proId": "203ad1fd5cc54fdab0fd358246a36018",
            "selectAll": false
          },
          {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "offset": 0,
            "limit": 10,
            "order": null,
            "sort": null,
            "ids": null,
            "isSelectAll": 0,
            "dpId": "e98960d91b50498da7497660a7f34f02",
            "startQuantity": 2,
            "price": "333333",
            "proId": "203ad1fd5cc54fdab0fd358246a36018",
            "selectAll": false
          }
        ],
        "attributes": [
          {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "offset": 0,
            "limit": 10,
            "order": null,
            "sort": null,
            "ids": null,
            "isSelectAll": 0,
            "attId": "142a59e858064a34ab28fbe0188cefcd",
            "attributeId": 45435,
            "attributeName": "sfsd",
            "valueId": 3543,
            "valueName": "fewrwer",
            "proId": "203ad1fd5cc54fdab0fd358246a36018",
            "attType": "1",
            "selectAll": false
          },
          {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "offset": 0,
            "limit": 10,
            "order": null,
            "sort": null,
            "ids": null,
            "isSelectAll": 0,
            "attId": "ab368bc693044c119fcf0111ecec55a9",
            "attributeId": 33333,
            "attributeName": "wwwww",
            "valueId": 4444,
            "valueName": "eeeee",
            "proId": "203ad1fd5cc54fdab0fd358246a36018",
            "attType": "2",
            "selectAll": false
          }
        ],
        "images": [
          {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "offset": 0,
            "limit": 10,
            "order": null,
            "sort": null,
            "ids": null,
            "isSelectAll": 0,
            "pimId": "41b92b4f16d647cface663806b52dcaa",
            "proId": "203ad1fd5cc54fdab0fd358246a36018",
            "imageUrl": "http://g01.s.alicdn.com/kf/HTB11JPtXGLN8KJjSZFGq6zjrVXaE/231051214/HTB11JPtXGLN8KJjSZFGq6zjrVXaE.jpg",
            "imageId": "9d6abb744d3142f2b6a62c4f6cc1c8df",
            "imageSequnce": 1,
            "selectAll": false
          },
          {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "offset": 0,
            "limit": 10,
            "order": null,
            "sort": null,
            "ids": null,
            "isSelectAll": 0,
            "pimId": "8f20313fb9cb409ab019411c6eeec001",
            "proId": "203ad1fd5cc54fdab0fd358246a36018",
            "imageUrl": "http://g01.s.alicdn.com/kf/HTB1Da3.SpXXXXaHaXXX760XFXXXg/230906577/HTB1Da3.SpXXXXaHaXXX760XFXXXg.png",
            "imageId": "ad48e008ba3348798cff0ac157634b23",
            "imageSequnce": 2,
            "selectAll": false
          }
        ],
        "sourcingTrad": {
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "pstId": "203ad1fd5cc54fdab0fd358246a54654",
          "proId": "203ad1fd5cc54fdab0fd358246a36018",
          "fobCurrency": "33",
          "fobMinPrice": "33",
          "fobMaxPrice": "33",
          "fobUnitType": "3",
          "paymentMethods": "33",
          "minOrderQuantity": "33",
          "minOrderUnitType": "33",
          "supplyQuantity": "33",
          "supplyUnitType": "33",
          "supplyPeriodType": "33",
          "deliveryPort": "33",
          "deliveryTime": "33",
          "packagingDesc": "33",
          "selectAll": false
        },
        "wholesaleTrade": null,
        "groupName": null,
        "selectAll": false
      }
    ],
    "total": null
  }

}
Mock.mock(handMockUrl(url.PRODUCTTASK_SHOWWAITLIST), showWaitList);

const titleRules = function () {
  return {
    a:'sssssssssssssssssss'
  }
}
Mock.mock(handMockUrl(url.PRODUCTRELEASE_TITLERULES), titleRules);
//  李天祥所需要接口
//    分组列表
const Lexicon_list = function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {

    },
    "rows": [


      {
        "attrId": 100002057,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 4,
            "catId": null,
            "childAttrs": null,
            "enName": "Other",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 9126,
            "catId": null,
            "childAttrs": null,
            "enName": "Spandex / Polyester",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361836,
            "catId": null,
            "childAttrs": null,
            "enName": "100% Polyester",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 6828,
            "catId": null,
            "childAttrs": null,
            "enName": "Synthetic Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5228,
            "catId": null,
            "childAttrs": null,
            "enName": "Polyester / Cotton",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361835,
            "catId": null,
            "childAttrs": null,
            "enName": "100% Cotton",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5362,
            "catId": null,
            "childAttrs": null,
            "enName": "Faux Fur",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 1042,
            "catId": null,
            "childAttrs": [
              100008126,
              19122
            ],
            "enName": "Genuine Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361975,
            "catId": null,
            "childAttrs": null,
            "enName": "Nylon / Cotton",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5269,
            "catId": null,
            "childAttrs": null,
            "enName": "Polyester / Nylon",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 360787,
            "catId": null,
            "childAttrs": [
              100008127,
              19122
            ],
            "enName": "Fur",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7322,
            "catId": null,
            "childAttrs": null,
            "enName": "Wool / Viscose",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 7326,
            "catId": null,
            "childAttrs": null,
            "enName": "Wool / Polyester",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Shell Material",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null
      },
      {
        "attrId": 100008127,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 3744,
            "catId": null,
            "childAttrs": null,
            "enName": "Sheep",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 3745,
            "catId": null,
            "childAttrs": null,
            "enName": "Fox",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 3747,
            "catId": null,
            "childAttrs": null,
            "enName": "Muskrat",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 361830,
            "catId": null,
            "childAttrs": null,
            "enName": "Mink",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100020386,
            "catId": null,
            "childAttrs": null,
            "enName": "Beavers",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 5369,
            "catId": null,
            "childAttrs": null,
            "enName": "Chinchilla",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 3771,
            "catId": null,
            "childAttrs": null,
            "enName": "Horse",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 3743,
            "catId": null,
            "childAttrs": null,
            "enName": "Rabbit",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Fur Type",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null
      },
      {
        "attrId": 19122,
        "attributeValues": [
          {
            "attrId": null,
            "attrValueId": 361831,
            "catId": null,
            "childAttrs": null,
            "enName": "Raw",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100020388,
            "catId": null,
            "childAttrs": null,
            "enName": "One Whole Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100020389,
            "catId": null,
            "childAttrs": null,
            "enName": "Double Face Leather",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 580,
            "catId": null,
            "childAttrs": null,
            "enName": "Dyed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 2356,
            "catId": null,
            "childAttrs": null,
            "enName": "Embossed",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 100020387,
            "catId": null,
            "childAttrs": null,
            "enName": "Shearing",
            "skuValue": false
          },
          {
            "attrId": null,
            "attrValueId": 365663,
            "catId": null,
            "childAttrs": null,
            "enName": "Knitted",
            "skuValue": false
          }
        ],
        "catid": null,
        "cnName": null,
        "customizeImage": false,
        "customizeValue": false,
        "enName": "Processing Type",
        "inputType": "single_select",
        "keyAttr": null,
        "locator": null,
        "order": null,
        "parentValue": null,
        "required": false,
        "showType": "list_box",
        "skuAttribute": false,
        "units": null,
        "valueType": "string",
        "selectedId": null,
        "valueName": null,
        "selectedIdArr": null
      }

    ],
    "total": null
  }
}
Mock.mock(handMockUrl(url.wordGroup_query), Lexicon_list);

// 分组删除列表
const Lexicon_list2 = function() {
  return {
    "status": "200",
    "info": "成功删除1条数据",
    "mapInfo": [{}]
  }
}
Mock.mock(handMockUrl(url.wordGroup_del), Lexicon_list2);


// 新建分组
const Lexicon_list4= function() {
  return {
    "status": "200",
    "info": "成功新增数据",
    "mapInfo": [{}]
  }
};
Mock.mock(handMockUrl(url.wordGroup_add), Lexicon_list4);

// 分组编辑接口2
const Lexicon_list5= function() {
  return {
    "status": "200",
    "info": "修改成功",
    "mapInfo": [{}]
  }
};
Mock.mock(handMockUrl(url.wordGroup_modify), Lexicon_list5);

// 退出接口

const outuser= function() {
  return {
    "status": "200",
    "info": "退出成功",
    "mapInfo": [{}]
  }
};
Mock.mock(handMockUrl(url.outer),outuser);

// 词库管理
const Group= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "createBy": "3369982826",
        "createTime": 1516592409000,
        "updateBy": "3369982826",
        "updateTime": 1516592409000,
        "kwId": "26fbe1dcbfce469cad54965b0d3695ea",
        "alibabaUserId": "3369982826",
        "kwKeywords": "atlas copco ga11 air compressor",
        "kwCompanyCnt": "12",
        "kwShowwinCnt": "0",
        "kwSearchHot": "19",
        "kwWordsSource": 1,
        "wgId": "3aad8382b75848f9b77cc0ada0cc7ec7"
      },
      {
        "createBy": "3369982826",
        "createTime": 1516592409000,
        "updateBy": "3369982826",
        "updateTime": 1516592409000,
        "kwId": "4c843114c68948f1b4ada5bb8cb07dc7",
        "alibabaUserId": "3369982826",
        "kwKeywords": "11oz porcelain mug",
        "kwCompanyCnt": "44",
        "kwShowwinCnt": "2",
        "kwSearchHot": "1",
        "kwWordsSource": 1,
        "wgId": "d785e66e2fbe4e432bc5a3bdd5cb10fd"
      }
    ],
    "total": 2
  }
};
Mock.mock(handMockUrl(url.wordGroup_Group),Group);

//删除我的词

const delMyKeywords= function() {
  return {
    "status": "200",
    "page": null,
    "info": "删除成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.wordGroup_delMyKeywords),delMyKeywords);

//分配词库

const Keywords= function() {
  return {
    "status": "200",
    "page": null,
    "info": "分配成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.assignKeywords),Keywords);

//添加到词库

const batchAdd= function() {
  return {
    "status":"200",
    "page":null,
    "info":"添加成功",
    "mapInfo":{},
    "rows":null,
    "total":null
  }
};
Mock.mock(handMockUrl(url.batchAddKeywords),batchAdd);


// 手动导入
const importKey= function() {
  return {
    "status": "200",
    "page": null,
    "info": "导入成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.importKeywords),importKey);

//产品发布     图片查看接口
const imageKey= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "createBy": "3369982826",
      "createTime": 1516947834000,
      "updateBy": "3369982826",
      "updateTime": 1516947834000,
      "offset": "",
      "limit": 10,
      "imageId": "24e0c638bbe3453fbcde3bfa8d01502e1",
      "alibabaUserId": "3369982826",
      "imageUrl": "localhost:1088/78e3d5f1cf405c391f0d00a0984978807f428c09image80126-1aec844cb64ecb941e93e83495618d5eb36625578042678ded12522ed8a492.jpg",
      "imageType": "N",
      "imageEdit": "N",
      "wgId": "xxxx",
      "imageSize": 0.744140625
    },
      {
        "createBy": "3369982826",
        "createTime": 1516947834000,
        "updateBy": "3369982826",
        "updateTime": 1516947834000,
        "offset": "",
        "limit": 10,
        "imageId": "24e0c638bbe3453fbcde3bfa8d01502e2",
        "alibabaUserId": "3369982826",
        "imageUrl": "localhost:1088/78e3d5f1cf405c391f0d00a0984978807f428c09image80126-1aec844cb64ecb941e93e83495618d5eb36625578042678ded12522ed8a492.jpg",
        "imageType": "N",
        "imageEdit": "N",
        "wgId": "xxxx",
        "imageSize": 0.744140625
      },
      {
        "createBy": "3369982826",
        "createTime": 1516947834000,
        "updateBy": "3369982826",
        "updateTime": 1516947834000,
        "offset": "",
        "limit": 10,
        "imageId": "24e0c638bbe3453fbcde3bfa8d01502e3",
        "alibabaUserId": "3369982826",
        "imageUrl": "localhost:1088/78e3d5f1cf405c391f0d00a0984978807f428c09image80126-1aec844cb64ecb941e93e83495618d5eb36625578042678ded12522ed8a492.jpg",
        "imageType": "N",
        "imageEdit": "N",
        "wgId": "xxxx",
        "imageSize": 0.744140625
      }],
    "total": 4
  }
};
Mock.mock(handMockUrl(url.showimages),imageKey);

// 图片删除

const imagedele= function() {
  return {
    "status": "200",
    "page": null,
    "info": "删除成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.deleimages),imagedele);

// 图片分组

const imagepull= function() {
  return {
    "status": "200",
    "info": "修改成功",
    "mapInfo": [{}]
  }
};
Mock.mock(handMockUrl(url.modifyBizImage),imagepull);

// 图片银行分组

const Breathdata= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [
      {
        "photoAlbumGroup": {
          "id": 308257395,
          "level1": 3,
          "level2": null,
          "level3": null,
          "name": "auto horn"
        },
        "groups": []
      },
      {
        "photoAlbumGroup": {
          "id": 308736631,
          "level1": 2,
          "level2": null,
          "level3": null,
          "name": "auto sensor"
        },
        "groups": [
          {
            "photoAlbumGroup": {
              "id": 308728748,
              "level1": 2,
              "level2": 1,
              "level3": null,
              "name": "ABS sensor"
            },
            "groups": [
              {
                "photoAlbumGroup": {
                  "id": 309569160,
                  "level1": 2,
                  "level2": 1,
                  "level3": 1,
                  "name": "jijijiji"
                },
                "groups": null
              }
            ]
          },
          {
            "photoAlbumGroup": {
              "id": 308257393,
              "level1": 2,
              "level2": 8,
              "level3": null,
              "name": "Brake & Reverse Light Switch"
            },
            "groups": null
          },
          {
            "photoAlbumGroup": {
              "id": 308469799,
              "level1": 2,
              "level2": 3,
              "level3": null,
              "name": "camshaft sensor"
            },
            "groups": null
          },
          {
            "photoAlbumGroup": {
              "id": 308481626,
              "level1": 2,
              "level2": 4,
              "level3": null,
              "name": "crankshaft positon sensor"
            },
            "groups": null
          },
          {
            "photoAlbumGroup": {
              "id": 308473671,
              "level1": 2,
              "level2": 7,
              "level3": null,
              "name": "oil pressure switch"
            },
            "groups": null
          },
          {
            "photoAlbumGroup": {
              "id": 308469800,
              "level1": 2,
              "level2": 5,
              "level3": null,
              "name": "oxygen sensor"
            },
            "groups": null
          },
          {
            "photoAlbumGroup": {
              "id": 308257391,
              "level1": 2,
              "level2": 6,
              "level3": null,
              "name": "thermo swith"
            },
            "groups": null
          },
          {
            "photoAlbumGroup": {
              "id": 308257388,
              "level1": 2,
              "level2": 2,
              "level3": null,
              "name": "water temperature sensor"
            },
            "groups": null
          }
        ]
      },
      {
        "photoAlbumGroup": {
          "id": 309117950,
          "level1": 5,
          "level2": null,
          "level3": null,
          "name": "benner"
        },
        "groups": []
      },
      {
        "photoAlbumGroup": {
          "id": 308457851,
          "level1": 1,
          "level2": null,
          "level3": null,
          "name": "car dvd player"
        },
        "groups": []
      },
      {
        "photoAlbumGroup": {
          "id": 308473673,
          "level1": 4,
          "level2": null,
          "level3": null,
          "name": "fuel injector"
        },
        "groups": []
      }
    ]
  }
};
Mock.mock(handMockUrl(url.splitBreath),Breathdata);


// 图片银行分组查询数据

const Picturedata= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      "http://g04.s.alicdn.com/kf/HTB15erRd7fb_uJjSsD4q6yqiFXad/231051214/HTB15erRd7fb_uJjSsD4q6yqiFXad.jpg",
      "http://g03.s.alicdn.com/kf/HTB1jLVdnznD8KJjSspbq6zbEXXae/231051214/HTB1jLVdnznD8KJjSspbq6zbEXXae.jpg",
      "http://g04.s.alicdn.com/kf/HTB1dLY9ndbJ8KJjy1zjq6yqapXaZ/231051214/HTB1dLY9ndbJ8KJjy1zjq6yqapXaZ.jpg",
      "http://g02.s.alicdn.com/kf/HTB1YfdsaPgy_uJjSZKP761GlFXau/231051214/HTB1YfdsaPgy_uJjSZKP761GlFXau.png",
      "http://g02.s.alicdn.com/kf/HTB1.VXBaPgy_uJjSZLe761PlFXaS/231051214/HTB1.VXBaPgy_uJjSZLe761PlFXaS.png",
      "http://g04.s.alicdn.com/kf/HTB1JF_9eL2H8KJjy0Fc761DlFXa6/231051214/HTB1JF_9eL2H8KJjy0Fc761DlFXa6.png",
      "http://g01.s.alicdn.com/kf/HTB1tSJibxk98KJjSZFo760S6pXaL/231051214/HTB1tSJibxk98KJjSZFo760S6pXaL.png",
      "http://g02.s.alicdn.com/kf/HTB1EL0ybBLN8KJjSZPh763.spXag/231051214/HTB1EL0ybBLN8KJjSZPh763.spXag.png",
      "http://g03.s.alicdn.com/kf/HTB1YWLEXqzB9uJjSZFM760q4XXaf/231051214/HTB1YWLEXqzB9uJjSZFM760q4XXaf.png",
      "http://g02.s.alicdn.com/kf/HTB1vCfoXTfN8KJjSZFjq6xGvpXaw/231051214/HTB1vCfoXTfN8KJjSZFjq6xGvpXaw.jpg",
      "http://g02.s.alicdn.com/kf/HTB1PgxDXcic_eJjSZFnq6xVwVXap/231051214/HTB1PgxDXcic_eJjSZFnq6xVwVXap.jpg",
      "http://g02.s.alicdn.com/kf/HTB1ESPtXFLM8KJjSZFBq6xJHVXaj/231051214/HTB1ESPtXFLM8KJjSZFBq6xJHVXaj.jpg",
      "http://g04.s.alicdn.com/kf/HTB12g_oXRfM8KJjSZFOq6xr5XXap/231051214/HTB12g_oXRfM8KJjSZFOq6xr5XXap.jpg",
      "http://g02.s.alicdn.com/kf/HTB1MjYZahrI8KJjy0Fpq6z5hVXao/231051214/HTB1MjYZahrI8KJjy0Fpq6z5hVXao.jpg",
      "http://g01.s.alicdn.com/kf/HTB11JPtXGLN8KJjSZFGq6zjrVXaE/231051214/HTB11JPtXGLN8KJjSZFGq6zjrVXaE.jpg",
      "http://g01.s.alicdn.com/kf/HTB1fOjIaf2H8KJjy0Fcq6yDlFXaJ/231051214/HTB1fOjIaf2H8KJjy0Fcq6yDlFXaJ.jpg",
      "http://g01.s.alicdn.com/kf/HTB1.CbFadbJ8KJjy1zjq6yqapXaS/231051214/HTB1.CbFadbJ8KJjy1zjq6yqapXaS.jpg",
      "http://g01.s.alicdn.com/kf/HTB1D.LIahrI8KJjy0Fpq6z5hVXaS/231051214/HTB1D.LIahrI8KJjy0Fpq6z5hVXaS.jpg"
    ],
    "total": 18
  }
};
Mock.mock(handMockUrl(url.bankPicture),Picturedata);

//保存上传图片

const BreaImage= function() {
  return {
    "status": "200",
    "info": "添加成功",
    "mapInfo": [{}]
  }
};
Mock.mock(handMockUrl(url.saveImage),BreaImage);

//查询边框

const border= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "createBy": "ewe",
      "createTime": 1502208000000,
      "updateBy": "exs",
      "updateTime": 1502208000000,
      "offset": "",
      "limit": 10,
      "frameId": "dsd",
      "frameSize": 23,
      "frameUrl": "dsdsd",
      "alibabaUserId": "dsds",
      "frameDefault": "N"
    }],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.showList),border);


//保存边框

const border_saveFrame= function() {
  return {
    "status": "200",
    "info": "添加成功",
    "mapInfo": [{}]
  }
};
Mock.mock(handMockUrl(url.saveFrame),border_saveFrame);

//保存编辑图片



const border_edit= function() {
  return {
    "status": "200",
    "info": "编辑成功",
    "mapInfo": [{}]
  }
};
Mock.mock(handMockUrl(url.editImage),border_edit);



//p4p推广产品设置  分组

const findProduct= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "groupId": 805363217,
        "groupName": "Auto Horn",
        "parentId": "-1",
        "unPromCount":123,
        "inPromCount":12,
        "childGroup": []
      },
      {
        "groupId": 805441817,
        "groupName": "Other products",
        "parentId": "-1",
        "unPromCount":123,
        "inPromCount":12,
        "childGroup": []
      },
      {
        "groupId": 805214020,
        "groupName": "Car DVD Player",
        "parentId": "-1",
        "unPromCount":123,
        "inPromCount":12,
        "childGroup": []
      },
      {
        "groupId": 805131168,
        "groupName": "Fuel Injector",
        "parentId": "-1",
        "unPromCount":123,
        "inPromCount":12,
        "childGroup": []
      },
      {
        "groupId": 805990602,
        "groupName": "Car DVD",
        "parentId": "-1",
        "unPromCount":123,
        "inPromCount":12,
        "childGroup": [
          {
            "groupId": 806092912,
            "groupName": "Car DVD For Benz",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806084317,
            "groupName": "Car DVD For VW",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806084319,
            "groupName": "Car DVD For Kia",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806110326,
            "groupName": "Car DVD For Nissan",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806078733,
            "groupName": "Car DVD For Ford",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806143725,
            "groupName": "Car DVD For BMW",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806214022,
            "groupName": "Universal 2 Din Car DVD",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806094514,
            "groupName": "Car DVD For Audi",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806078734,
            "groupName": "Car DVD For Hyundai",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 806144517,
            "groupName": "Car DVD For Toyota",
            "parentId": "805990602",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          }
        ]
      },
      {
        "groupId": 805579778,
        "groupName": "Auto Switch",
        "parentId": "-1",
        "unPromCount":123,
        "inPromCount":12,
        "childGroup": [
          {
            "groupId": 805695691,
            "groupName": "Brake/Reverse light switch",
            "parentId": "805579778",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 805558554,
            "groupName": "Oil pressure switch",
            "parentId": "805579778",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 805842454,
            "groupName": "Thermo switch",
            "parentId": "805579778",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          }
        ]
      },
      {
        "groupId": 805241256,
        "groupName": "Auto Sensor",
        "parentId": "-1",
        "unPromCount":123,
        "inPromCount":12,
        "childGroup": [
          {
            "groupId": 805871700,
            "groupName": "Crankshaft  sensor",
            "parentId": "805241256",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 805497247,
            "groupName": "Oxygen sensor",
            "parentId": "805241256",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 805871697,
            "groupName": "Camshaft  sensor",
            "parentId": "805241256",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 805044245,
            "groupName": "ABS sensor",
            "parentId": "805241256",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 805145172,
            "groupName": "Temperature Sensor",
            "parentId": "805241256",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 805693278,
            "groupName": "PDC sensor",
            "parentId": "805241256",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          },
          {
            "groupId": 805576624,
            "groupName": "Knock sensor",
            "parentId": "805241256",
            "unPromCount":123,
            "inPromCount":12,
            "childGroup": null
          }
        ]
      },
      {
        "groupId": 805701254,
        "groupName": "Window Regulator",
        "parentId": "-1",
        "unPromCount":123,
        "inPromCount":12,
        "childGroup": []
      }
    ],
    "total": 8
  }

};
Mock.mock(handMockUrl(url.findProductGroups),findProduct);

//p4p推广产品设置  列表

const Promotion= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60702066226",
        "ppProductMixId": null,
        "ppProductName": "Loftox wholesale auto pdc sensor 66216902180",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g02.s.alicdn.com/kf/HTB1dchHl8cHL1JjSZFB761iGXXa9/Loftox-wholesale-auto-pdc-sensor-66216902180.png",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60760730417",
        "ppProductMixId": null,
        "ppProductName": "04226-0l010 04226-0l020 04465-02070 04465-02220 04465-02240 Left Front Abs Sensor",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g02.s.alicdn.com/kf/HTB1DbUDXiOYBuNjSsD4q6zSkFXaE/04226-0l010-04226-0l020-04465-02070-04465.jpg",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60726651541",
        "ppProductMixId": null,
        "ppProductName": "0232103033 0232103033 22731-1f710 0232103048 6d15 Position Sensor 6d16 Camshaft",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g02.s.alicdn.com/kf/HTB10mbIdjgy_uJjSZJnq6zuOXXaM/0232103033-0232103033-22731-1f710-0232103048-6d15-Position.jpg",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60695304179",
        "ppProductMixId": null,
        "ppProductName": "Reply In 12 Hours 06A906262CT 06A906262CM China suppliers car parts 4wires NTK oxygen lambda sensor for Audi VW Skoda Seat",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g04.s.alicdn.com/kf/HTB1dnkKnCfD8KJjSszhq6zIJFXaf/Reply-In-12-Hours-06A906262CT-06A906262CM-China.jpg",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60728518293",
        "ppProductMixId": null,
        "ppProductName": "0041538728 33220-76g11 31935-1xf01 319351xf01 Crankshaft Sensor",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g02.s.alicdn.com/kf/HTB1CzUblf2H8KJjy0Fcq6yDlFXaB/0041538728-33220-76g11-31935-1xf01-319351xf01-Crankshaft.jpg",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60728004392",
        "ppProductMixId": null,
        "ppProductName": "57450-SWA-003 57455-SWA-003 auto spare parts front abs sensor for honda crv",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g01.s.alicdn.com/kf/HTB1pYO_l_nI8KJjSszgq6A8ApXaY/57450-SWA-003-57455-SWA-003-auto.jpg",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60683700210",
        "ppProductMixId": null,
        "ppProductName": "GE7C-43-72YB GE7C-43-72YC MAZDA spare parts car speed sensor abs sensor from China",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g02.s.alicdn.com/kf/HTB1TrEtbvxNTKJjy0Fj7606yVXaZ/GE7C-43-72YB-GE7C-43-72YC-MAZDA.png",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60729591356",
        "ppProductMixId": null,
        "ppProductName": "md615571 md628053 md628059 md628204 md628227 md703270 Vehicle Speed Sensor",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g03.s.alicdn.com/kf/HTB1AVF7lsnI8KJjSspeq6AwIpXaA/md615571-md628053-md628059-md628204-md628227-md703270-Vehicle.jpg",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60728714230",
        "ppProductMixId": null,
        "ppProductName": "5716a031xa 5716a065 5716a132xa 5716a551 5716a555 High Quality Abs Wheel Speed Sensor",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g02.s.alicdn.com/kf/HTB1NiWNlr_I8KJjy1Xaq6zsxpXaG/5716a031xa-5716a065-5716a132xa-5716a551-5716a555-High-Quality.jpg",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      },
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "offset": 0,
        "limit": 10,
        "order": null,
        "sort": null,
        "ids": null,
        "isSelectAll": 0,
        "ppId": null,
        "ppProductId": "60729616171",
        "ppProductMixId": null,
        "ppProductName": "8301b587 8301b588 8301b623 8301b902 8301c204 8301c337 Abs Wheel Speed Sensor",
        "ppProductStatus": "enabled",
        "ppProductImage": "http://g04.s.alicdn.com/kf/HTB1KW.pj7fb_uJjSsrbq6z6bVXas/8301b587-8301b588-8301b623-8301b902-8301c204-8301c337-Abs.jpg",
        "pgGroupId": null,
        "alibabaUserId": null,
        "selectAll": false
      }
    ],
    "total": 570
  }
};
Mock.mock(handMockUrl(url.PromotionList),Promotion);


//p4p推广产品设置  状态
const PromotionSta= function() {
  return {
    "status": "200",
    "page": null,
    "info": "修改成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.PromotionStatus),PromotionSta);



//p4p词库管理 搜索表格
const listshow= function() {
  return {
    "status": "200",
    "page": null,
    "info": "null",
    "mapInfo": {
      dataList:[
        {

          "pfpPkwId": "123456789",
          "pfpPkwKeywords": "mp3",
          "pfpPkwStrategy": "",
          "pfpPkwSearchCount": "5",
          "pfpPkwQsStar": "5",
          "pfpPkwPurchaseHot": "1",
          "pfpPkwPrice": "3.5",
          "pfpPkwImpressionCnt": "100",
          "pfpPkwClickCnt": "100",
          "pfpPkwOnlineTime": "3.5",
          "pfpPkwStatus": "in_promotion",
          "pfpPkwRankings": "1",
          "pfpPkwProducts": "10",
          "pfpPkwCtr": "3.75",
          "pfpPkwCost": "100",
          "pfpPkwCreateTime": "2008-08-01",
          "pfpPkwAveClick": "3.75",
          "pfpPkwBasePrice": "3.5",
          "pfpPkwTagList": "\"tag1\",\"tag2\"",
          "pfpPkwMatchCount": "10",
          "pfpPkwBuyCount": "1",
          "alibabaUserId": "12324567899",
          "pfpPwkPriceStatus":null,
          "pfpAlibabaKeyId": "123"
        },
        {

          "pfpPkwId": "123456789",
          "pfpPkwKeywords": "mp3",
          "pfpPkwStrategy": "",
          "pfpPkwSearchCount": "4",
          "pfpPkwQsStar": "4",
          "pfpPkwPurchaseHot": "1",
          "pfpPkwPrice": "3.5",
          "pfpPkwImpressionCnt": "100",
          "pfpPkwClickCnt": "100",
          "pfpPkwOnlineTime": "3.5",
          "pfpPkwStatus": "in_promotion",
          "pfpPkwRankings": "1",
          "pfpPkwProducts": "10",
          "pfpPkwCtr": "3.75",
          "pfpPkwCost": "100",
          "pfpPkwCreateTime": "2008-08-01",
          "pfpPkwAveClick": "3.75",
          "pfpPkwBasePrice": "3.5",
          "pfpPkwTagList": "\"tag1\",\"tag2\"",
          "pfpPkwMatchCount": "10",
          "pfpPkwBuyCount": "1",
          "alibabaUserId": "12324567899",
          "pfpPwkPriceStatus": "2",
          "pfpAlibabaKeyId": "123"
        }
      ],
      titleList:[
        {
          "createBy": "hndomestic",
          "createTime": 1517912388000,
          "updateBy": "hndomestic",
          "updateTime": 1517912390000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "2e8f8a6f8db54b709161ada782bac95a",
          "dicName": "平均点击花费",
          "dicCode": "pfpPkwAveClick",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517909703000,
          "updateBy": "hndomestic",
          "updateTime": 1517909706000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "5271753f49274127b3e9b52f69dd5013",
          "dicName": "点击量",
          "dicCode": "pfpPkwClickCnt",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517905012000,
          "updateBy": "hndomestic",
          "updateTime": 1517905017000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "6f797f31b65a40e188a5d08c2ea379c6",
          "dicName": "所属策略",
          "dicCode": "pfpPkwStrategy",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517910427000,
          "updateBy": "hndomestic",
          "updateTime": 1517910430000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "8a520f54131e416e902dcc23d9d107f7",
          "dicName": "预估排名",
          "dicCode": "pfpPkwRankings",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517909500000,
          "updateBy": "hndomestic",
          "updateTime": 1517909502000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "9645ac95004141ab911376e43d18dfba",
          "dicName": "购买热度",
          "dicCode": "pfpPkwPurchaseHot",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517912182000,
          "updateBy": "hndomestic",
          "updateTime": 1517912184000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "a087db38b70a4c46a5b7facfe742a588",
          "dicName": "花费",
          "dicCode": "pfpPkwCost",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517905157000,
          "updateBy": "hndomestic",
          "updateTime": 1517905160000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "a39ddfa1ca274f289e1d18365e6918fb",
          "dicName": "搜索热度",
          "dicCode": "pfpPkwSearchCount",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517909638000,
          "updateBy": "hndomestic",
          "updateTime": 1517909624000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "b8f93530d9a2450e847c592b40281342",
          "dicName": "价格",
          "dicCode": "pfpPkwPrice",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517911921000,
          "updateBy": "hndomestic",
          "updateTime": 1517911923000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "c0627328a9b34500b305771b11eda354",
          "dicName": "匹配产品数",
          "dicCode": "pfpPkwMatchCount",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517912326000,
          "updateBy": "hndomestic",
          "updateTime": 1517912329000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "c8144b44fc014654a624fbe5d81710df",
          "dicName": "创建时间",
          "dicCode": "pfpPkwCreateTime",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517904919000,
          "updateBy": "hndomestic",
          "updateTime": 1517904923000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "ca74a1c72d9c44469efed2be8928813a",
          "dicName": "关键词",
          "dicCode": "pfpPkwKeywords",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517912082000,
          "updateBy": "hndomestic",
          "updateTime": 1517912084000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "da0805851daf4d3b848c51c97763904c",
          "dicName": "点击率",
          "dicCode": "pfpPkwCtr",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517906529000,
          "updateBy": "hndomestic",
          "updateTime": 1517906532000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "e20a6a2d700a49e0a4d8f9c10f534fe1",
          "dicName": "推广评分",
          "dicCode": "pfpPkwQsStar",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517909821000,
          "updateBy": "hndomestic",
          "updateTime": 1517909824000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "e3629faa202047b2b1d4204c23eb8693",
          "dicName": "状态",
          "dicCode": "pfpPkwStatus",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517909754000,
          "updateBy": "hndomestic",
          "updateTime": 1517909756000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "f31114b452b64605bd5ed66d89f841d8",
          "dicName": "推广时长",
          "dicCode": "pfpPkwOnlineTime",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        },
        {
          "createBy": "hndomestic",
          "createTime": 1517909650000,
          "updateBy": "hndomestic",
          "updateTime": 1517909652000,
          "offset": 0,
          "limit": 10,
          "order": null,
          "sort": null,
          "ids": null,
          "isSelectAll": 0,
          "dicId": "fc2d9352c48f4952aaa2eae6747e9efb",
          "dicName": "曝光量",
          "dicCode": "pfpPkwImpressionCnt",
          "dicType": "p4pkeywords",
          "dicParentId": null,
          "dicSequnce": null,
          "dicSpare": null,
          "selectAll": false
        }
      ],
    },
    "rows":null,

    "total": 1
  }
};
Mock.mock(handMockUrl(url.tabelshowList),listshow);

//p4p词库管理 删除表格
const listdel= function() {
  return {
    "status": "200",
    "page": null,
    "info": "删除成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.delKeywords),listdel);


//p4p词库管理 查看分组
const tabelAll= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "count": 7,
        "id": 75877901819,
        "isRead": null,
        "name": "0星词"
      },
      {
        "count": 0,
        "id": 75877901816,
        "isRead": null,
        "name": "1-2星词"
      },
      {
        "count": 0,
        "id": 75877901813,
        "isRead": null,
        "name": "3-5星词"
      },
      {
        "count": 7,
        "id": 75877901803,
        "isRead": null,
        "name": "价格不变词"
      },
      {
        "count": 4,
        "id": 75877901806,
        "isRead": null,
        "name": "价格常变词"
      },
      {
        "count": 0,
        "id": 75877901808,
        "isRead": null,
        "name": "核心效果词"
      },
      {
        "count": 0,
        "id": 75877901822,
        "isRead": null,
        "name": "淘词盒子加词"
      },
      {
        "count": 0,
        "id": 75877901811,
        "isRead": null,
        "name": "蓝海词"
      },
      {
        "count": 0,
        "id": 75877901802,
        "isRead": null,
        "name": "高价词"
      },
      {
        "count": 12,
        "id": 75951600071,
        "isRead": null,
        "name": "abs sensor"
      },
      {
        "count": 12,
        "id": 75950500430,
        "isRead": null,
        "name": "auto horn"
      },
      {
        "count": 6,
        "id": 75950600442,
        "isRead": null,
        "name": "Brake light switch"
      },
      {
        "count": 35,
        "id": 76056000176,
        "isRead": null,
        "name": "car dvd"
      },
      {
        "count": 24,
        "id": 75950600444,
        "isRead": null,
        "name": "fuel injector"
      },
      {
        "count": 6,
        "id": 75957300716,
        "isRead": null,
        "name": "knock sensor"
      },
      {
        "count": 5,
        "id": 75950400395,
        "isRead": null,
        "name": "oil pressure switch"
      },
      {
        "count": 9,
        "id": 75950600428,
        "isRead": null,
        "name": "Oxygen sensor"
      },
      {
        "count": 18,
        "id": 75957200758,
        "isRead": null,
        "name": "parking sensor"
      },
      {
        "count": 8,
        "id": 75950600432,
        "isRead": null,
        "name": "sensor"
      },
      {
        "count": 7,
        "id": 75950600412,
        "isRead": null,
        "name": "temperature sensor"
      },
      {
        "count": 10,
        "id": 75964501810,
        "isRead": null,
        "name": "window regulator"
      },
      {
        "count": 0,
        "id": 75943301845,
        "isRead": null,
        "name": "数据管家2017-09-24"
      },
      {
        "count": 1,
        "id": 75959801203,
        "isRead": null,
        "name": "数据管家2017-10-24"
      },
      {
        "count": 2,
        "id": 75969700969,
        "isRead": null,
        "name": "数据管家2017-11-12"
      },
      {
        "count": 4,
        "id": 76043201152,
        "isRead": null,
        "name": "数据管家2018-01-27"
      },
      {
        "count": 682,
        "id": 76035300469,
        "isRead": null,
        "name": "新增auto horn"
      },
      {
        "count": 0,
        "id": 75878902186,
        "isRead": null,
        "name": "直通车App"
      },
      {
        "count": 5,
        "id": 76056200350,
        "isRead": null,
        "name": "防阿三"
      },
      {
        "count": 863,
        "id": -1,
        "isRead": null,
        "name": "所有关键词"
      },
      {
        "count": 11,
        "id": 0,
        "isRead": null,
        "name": "未分组"
      }
    ],
    "total": 30
  }
};
Mock.mock(handMockUrl(url.findAllGroup),tabelAll);

//p4p词库管理分配
const KeywordsGroup= function() {
  return {
    "status": "200",
    "page": null,
    "info": "分配成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.modifyKeywordsGroup),KeywordsGroup);

//p4p词库管理同步
const synchron= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.synchronize),synchron);

//p4p词库管理新建分组
const createP4P= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.createP4PKeywordsGroup),createP4P);

//p4p词库管理日曲线
const p4pPrice= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {
      "maxList": [{
      "alibabaUesrId": "12345",
      "pptTime": "2010-01-01",
      "pptPrice": "100",
      "pptMinMax": "2",
      "pptKeywords": "MP3",
      "pptId": "123456789"
    }],
    "minList": [{
      "alibabaUesrId": "12345",
      "pptTime": "2010-01-01",
      "pptPrice": "10",
      "pptMinMax": "2",
      "pptKeywords": "MP3",
      "pptId": "123456789"
    }]
    },
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.p4pPriceTrade),p4pPrice);

//p4p词库管理自定义列
const Column= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo":null,
    "rows": [
        {
          "pccIsChoose": "1",
          "dicName": "9",
          "dicCode": "pfpPkwKeywords",
          "dicType": "p4pkeywords",
          "dicId": "12345678",
          "pccId": "0d46394605eb4acd88fdeaaee603e2c0"
        },
      {
        "pccIsChoose": "1",
        "dicName": "7",
        "dicCode": "pfpPkwKeywords",
        "dicType": "p4pkeywords",
        "dicId": "12345678",
        "pccId": "0d46394605eb4acd88fdeaaee603e2c0"
      },
      {
        "pccIsChoose": "1",
        "dicName": "1",
        "dicCode": "pfpPkwKeywords",
        "dicType": "p4pkeywords",
        "dicId": "12345678",
        "pccId": "0d46394605eb4acd88fdeaaee603e2c0"
      },
      {
        "pccIsChoose": "1",
        "dicName": "2",
        "dicCode": "pfpPkwKeywords",
        "dicType": "p4pkeywords",
        "dicId": "12345678",
        "pccId": "0d46394605eb4acd88fdeaaee603e2c0"
      },
      {
        "pccIsChoose": "1",
        "dicName": "3",
        "dicCode": "pfpPkwKeywords",
        "dicType": "p4pkeywords",
        "dicId": "12345678",
        "pccId": "0d46394605eb4acd88fdeaaee603e2c0"
      },
      {
        "pccIsChoose": "1",
        "dicName": "5",
        "dicCode": "pfpPkwKeywords",
        "dicType": "p4pkeywords",
        "dicId": "12345678",
        "pccId": "0d46394605eb4acd88fdeaaee603e2c0"
      },
    ],
    "total": null
  }
};
Mock.mock(handMockUrl(url.ColumnCustom),Column);

//p4p词库管理保存自定义列
const saveP4P= function() {
  return {
    "status": "200",
    "page": null,
    "info": "修改成功",
    "mapInfo": {},
    "rows": null,
    "total":  null
  }
};
Mock.mock(handMockUrl(url.saveP4PColumnCustom),saveP4P);


//p4p词库管理查询账户余额

const queryBala= function() {
  return {
    "status": "200",
    "page": null,
    "mapInfo": {},
    "rows":[132],
    "total":  null
  }
};
Mock.mock(handMockUrl(url.queryBalance),queryBala);

//p4p词库管理查询账户余额
const RankPriceList= function() {
  return {
    "status": "200",
    "page": null,
    "mapInfo": {},
    "rows":{
      "def":[11,22,33,44,55]
    },
    "total":  null
  }
};
Mock.mock(handMockUrl(url.showRankPriceList),RankPriceList);

//p4p词库管理修改价格
const modify= function() {
  return {
    "status": "200",
    "page": null,
    "mapInfo": {},
    "rows":null,
    "total":  null
  }
};
Mock.mock(handMockUrl(url.modifyPrice),modify);

//p4p词库管理关键词列表
const Reckeywords= function() {
  return {

    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "avgPrice": "3.0",
        "basePrice": "3.0",
        "buyCount": "1",
        "isAdded": "N",
        "matchCount": 5,
        "qsStar": 2,
        "searchCount": "4",
        "word": "bluetooth car radio for toyota corolla",
        "wordType": null,
        "createTime": 1517648001026
      },
      {
        "avgPrice": "3.0",
        "basePrice": "3.0",
        "buyCount": "1",
        "isAdded": "N",
        "matchCount": 6,
        "qsStar": 4,
        "searchCount": "6",
        "word": "audi a3 multimedia",
        "wordType": null,
        "createTime": 1517648001028
      },
      {
        "avgPrice": "3.5",
        "basePrice": "3.5",
        "buyCount": "1",
        "isAdded": "N",
        "matchCount": 5,
        "qsStar": 1,
        "searchCount": "6",
        "word": "car dab",
        "wordType": null,
        "createTime": 1517648001030
      },
      {
        "avgPrice": "3.1",
        "basePrice": "3.0",
        "buyCount": "3",
        "isAdded": "N",
        "matchCount": 10,
        "qsStar": 4,
        "searchCount": "3",
        "word": "audi a4 android",
        "wordType": null,
        "createTime": 1517648001032
      },
      {
        "avgPrice": "3.5",
        "basePrice": "3.0",
        "buyCount": "5",
        "isAdded": "N",
        "matchCount": 8,
        "qsStar": 4,
        "searchCount": "6",
        "word": "car multimedia player with gps",
        "wordType": null,
        "createTime": 1517648001034
      },
      {
        "avgPrice": "4.9",
        "basePrice": "4.7",
        "buyCount": "6",
        "isAdded": "N",
        "matchCount": 5,
        "qsStar": 2,
        "searchCount": "6",
        "word": "motor cars",
        "wordType": null,
        "createTime": 1517648001037
      },
      {
        "avgPrice": "4.5",
        "basePrice": "3.8",
        "buyCount": "6",
        "isAdded": "N",
        "matchCount": 5,
        "qsStar": 2,
        "searchCount": "6",
        "word": "usb player",
        "wordType": null,
        "createTime": 1517648001039
      },
      {
        "avgPrice": "8.9",
        "basePrice": "5.0",
        "buyCount": "6",
        "isAdded": "N",
        "matchCount": 5,
        "qsStar": 1,
        "searchCount": "6",
        "word": "electric lift",
        "wordType": null,
        "createTime": 1517648001041
      },
      {
        "avgPrice": "3.3",
        "basePrice": "3.0",
        "buyCount": "6",
        "isAdded": "N",
        "matchCount": 61,
        "qsStar": 4,
        "searchCount": "6",
        "word": "android car",
        "wordType": null,
        "createTime": 1517648001043
      },
      {
        "avgPrice": "3.9",
        "basePrice": "3.0",
        "buyCount": "6",
        "isAdded": "N",
        "matchCount": 5,
        "qsStar": 2,
        "searchCount": "6",
        "word": "audi parts",
        "wordType": null,
        "createTime": 1517648001045
      }
    ],
    "total": 271
  }
};
Mock.mock(handMockUrl(url.findSysReckeywords),Reckeywords);

//p4p词库管理添加关键词
const addKeywords= function() {
  return {
    "status": "200",
    "page": null,
    "info": "添加成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.addKeywordsToAd),addKeywords);

//p4p词库管理我的词库
const MyKeywords= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "buyCount": "1",
        "qsStar": 2,
        "searchCount": "4",
        "word": "bluetooth car radio for toyota corolla",
        "createTime": 1517648001026
      }
    ],
    "total": 271
  }
};
Mock.mock(handMockUrl(url.findMyKeywords),MyKeywords);

//p4p词库管理我的词库
const p4pdelGrou= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows":null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.p4pdelGroup),p4pdelGrou);

//p4p词库管理编辑分组名
const modifyTag= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows":null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.modifyTagName),modifyTag);

//p4p关键词查询推广产品
const showProductBy= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows":[{
      "isForceMatch": "Y",
      "isOffer": "n",
      "isPreferential": "Y",
      "subject": "mp3",
      "qsStar": "4",
      "productId": "123",
      "productImage": "",
      "operator": "sysuser"
    }],
    "total": 50
  }
};
Mock.mock(handMockUrl(url.showProductByKeywords),showProductBy);

//p4p关键词优先推广
const updatePre= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows":[],
    "total": 50
  }
};
Mock.mock(handMockUrl(url.updatePreferential),updatePre);

//p4p报告 月度报告
const findAccountMonth= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "prmMonth": "201802",
        "prmImpressionCnt": "4468",
        "prmCost": "141.32",
        "prmStatDate": null,
        "prmCtr": "0.54",
        "prmClickCostAvg": "5.89",
        "prmOnlineTime": "12.4",
        "prmClickCnt": "24",
        "alibabaUserId": "3338940129",
        "selectAll": false
      }
    ],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.findAccountMonthReport),findAccountMonth);

//p4p 报告详情
const findAccount= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },

      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "offset": 0,
        "limit": 10,
        "order": "desc",
        "sort": "create_time",
        "ids": null,
        "isSelectAll": 0,
        "prdId": "72606bcd2c7147adba318771930d163e",
        "prdDate": "2018-02-22",
        "prdImpressionCnt": "4468",
        "prdCost": "141.32",
        "prdStatDate": "2018-02-22",
        "prdCtr": "0.54",
        "prdClickCostAvg": "5.89",
        "prdOnlineTime": "12.4",
        "prdClickCnt": "24",
        "alibabaUserId": "3338940129",
        "prmId": "4aceae9e8eea497896ffcaff1cdc2fa1",
        "selectAll": false
      },
    ],
    "total": 11
  }
};
Mock.mock(handMockUrl(url.findAccountReportDetails),findAccount);



//p4p 日消耗曲线
const findAccountDaily= function() {
  return {
    "status": "200",
    "page": null,
    "info": "获取成功",
    "mapInfo": {
      "2018-01-01": [
        {
          "pdcCost": "29",
          "pdcTime": "12:00-13:00",
          "pdcDate": "2018-01-01",
          "pdcId": "123456"
        },
        {
          "pdcCost": "29",
          "pdcTime": "13:00-14:00",
          "pdcDate": "2018-01-01",
          "pdcId": "123456"
        }
      ],
      "2018-01-02": [
        {
          "pdcCost": "29",
          "pdcTime": "14:00-15:00",
          "pdcDate": "2018-01-02",
          "pdcId": "123456"
        },
        {
          "pdcCost": "29",
          "pdcTime": "13:00-14:00",
          "pdcDate": "2018-01-02",
          "pdcId": "123456"
        }
      ]
    },
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.findAccountDailyCost),findAccountDaily);

//p4p 账户详情
const findAccountReport= function() {
  return {
    "status": "200",
    "page": null,
    "info": "获取成功",
    "mapInfo": {
      "oldData": [
        {
          "clickCnt": "17",
          "clickCostAvg": "10.01",
          "cost": "170.13",
          "ctr": "0.50",
          "impressionCnt": "3380",
          "onlineTime": "24.0",
          "statDate": "2018-01-22"
        },
        {
          "clickCnt": "5",
          "clickCostAvg": "12.09",
          "cost": "60.46",
          "ctr": "0.16",
          "impressionCnt": "3161",
          "onlineTime": "24.0",
          "statDate": "2018-01-21"
        },
        {
          "clickCnt": "14",
          "clickCostAvg": "14.10",
          "cost": "197.45",
          "ctr": "0.40",
          "impressionCnt": "3505",
          "onlineTime": "24.0",
          "statDate": "2018-01-20"
        },
        {
          "clickCnt": "5",
          "clickCostAvg": "13.86",
          "cost": "69.32",
          "ctr": "0.15",
          "impressionCnt": "3346",
          "onlineTime": "24.0",
          "statDate": "2018-01-19"
        },
        {
          "clickCnt": "23",
          "clickCostAvg": "7.54",
          "cost": "173.49",
          "ctr": "0.62",
          "impressionCnt": "3718",
          "onlineTime": "24.0",
          "statDate": "2018-01-18"
        },
        {
          "clickCnt": "31",
          "clickCostAvg": "9.55",
          "cost": "296.06",
          "ctr": "0.55",
          "impressionCnt": "5686",
          "onlineTime": "24.0",
          "statDate": "2018-01-17"
        },
        {
          "clickCnt": "23",
          "clickCostAvg": "9.22",
          "cost": "212.06",
          "ctr": "0.34",
          "impressionCnt": "6817",
          "onlineTime": "24.0",
          "statDate": "2018-01-16"
        },
        {
          "clickCnt": "20",
          "clickCostAvg": "9.84",
          "cost": "196.82",
          "ctr": "0.29",
          "impressionCnt": "6822",
          "onlineTime": "24.0",
          "statDate": "2018-01-15"
        }
      ],
      "currentData": [
        {
          "clickCnt": "29",
          "clickCostAvg": "7.82",
          "cost": "226.76",
          "ctr": "0.63",
          "impressionCnt": "4638",
          "onlineTime": "17.4",
          "statDate": "2018-02-23"
        },
        {
          "clickCnt": "24",
          "clickCostAvg": "5.89",
          "cost": "141.32",
          "ctr": "0.54",
          "impressionCnt": "4468",
          "onlineTime": "12.4",
          "statDate": "2018-02-22"
        },
        {
          "clickCnt": "35",
          "clickCostAvg": "6.61",
          "cost": "231.22",
          "ctr": "0.60",
          "impressionCnt": "5827",
          "onlineTime": "20.6",
          "statDate": "2018-02-21"
        },
        {
          "clickCnt": "35",
          "clickCostAvg": "4.81",
          "cost": "168.33",
          "ctr": "0.70",
          "impressionCnt": "5018",
          "onlineTime": "20.0",
          "statDate": "2018-02-20"
        },
        {
          "clickCnt": "0",
          "clickCostAvg": "0.00",
          "cost": "0.00",
          "ctr": "0.00",
          "impressionCnt": "1",
          "onlineTime": "<1",
          "statDate": "2018-02-19"
        },
        {
          "clickCnt": "55",
          "clickCostAvg": "4.80",
          "cost": "263.73",
          "ctr": "0.70",
          "impressionCnt": "7881",
          "onlineTime": "19.7",
          "statDate": "2018-02-18"
        },
        {
          "clickCnt": "56",
          "clickCostAvg": "4.85",
          "cost": "271.49",
          "ctr": "0.65",
          "impressionCnt": "8588",
          "onlineTime": "24.0",
          "statDate": "2018-02-17"
        },
        {
          "clickCnt": "44",
          "clickCostAvg": "4.92",
          "cost": "216.60",
          "ctr": "0.67",
          "impressionCnt": "6558",
          "onlineTime": "18.2",
          "statDate": "2018-02-16"
        }
      ]
    },
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.findAccountReportData),findAccountReport);


//p4p 后台详情
const findAccountBack= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "createBy": "loftox",
        "createTime": 1519452824000,
        "updateBy": "loftox",
        "updateTime": 1519452824000,
        "pbdId": "72606bcd2c7147adba318771930d163e",
        "pbdImpressionCnt": "4468",
        "pddCost": "141.32",
        "pddStatDate": "2018-02-22",
        "pddCtr": "0.54",
        "pddClickCostAvg": "5.89",
        "pddOnlineTime": "12.4",
        "pddClickCnt": "24",
        "alibabaUserId": "3338940129",
        "pbdP4pKeywordsCnt":"",
        "pbdThressStarProp":"",
        "pdbP4pProductCnt":"",
        "pbdLevel":"",
        "pbdLevelScore":"",
        "pbdStartTime":"",
        "pbdEndTime":"",
        "selectAll": false
      },

    ],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.findAccountBackReport),findAccountBack);







//p4p 首页
const p4pdata= function() {
  return {
    "status": 200,
    "page": null,
    "info": null,
    "mapInfo": {
      "balance": "7495.69",
      "daycost": "0.00",
      "level": {
        "growthLevel": "L4",
        "levelScore": 33811
      },
      "budget": "300",
      "status": false
    },
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.p4pIndex),p4pdata);


//p4p 首页 状态
const updateKeywords= function() {
  return {
    "status": "200",
    "page": null,
    "info": "修改成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.updateKeywordsStatus),updateKeywords);

//p4p 首页 优化
const optimizelist= function() {
  return {
    "status": "200",
    "mapInfo": [{
      "cover": "100%",
      "star": "50%",
      "online": 15.57,
      "explode": "80%"
    }]
  }
};
Mock.mock(handMockUrl(url.optimize),optimizelist);


//p4p 首页 星级
const keyStarsdata= function() {
  return {
    "status": 200,
    "page": null,
    "info": null,
    "mapInfo": {
      "other": "1.00%",
      "total": 5106,
      "four": "1.00%",
      "optimized": 5106,
      "threeUp": "0.00%",
      "five": "1.00%",
      "three": "1.00%"
    },
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.keyStars),keyStarsdata);



//p4p 日志 出价
const fershowList= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "createBy": "tzm",
      "createTime": 1519804892000,
      "updateBy": "tzm",
      "updateTime": 1519804897000,
      "offset": "",
      "limit": 10,
      "order": "desc",
      "sort": "create_time",
      "isSelectAll": "",
      "bblId": "test",
      "bblKeyword": "test_key",
      "bblPrice": "100",
      "bblRanking": 1,
      "bblStrategy": "高价词",
      "psId": "1",
      "bblSuccess": "Y",
      "alibabaUserId": "test",
      "selectAll": ""
    }],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.offershowList),fershowList);

//p4p 日志 操作
const bizOperate= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "createBy": "tzm",
      "createTime": 1519725170000,
      "updateBy": "tzm",
      "updateTime": 1519725174000,
      "offset": "",
      "limit": 10,
      "order": "desc",
      "sort": "create_time",
      "isSelectAll": "",
      "bolId": "1",
      "bolType": "词操作",
      "bolTransactor": "tzm",
      "bolNote": "testccz",
      "alibabaUserId": "1",
      "selectAll": ""
    }],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.bizOperateLog),bizOperate);

//p4p 优化星级
const p4pStar= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "kwId": "72606bcd2c7147adba318771930d163e",
      "kwKeywords": "keywords",
      "kwCompanyCnt": "141",
      "kwShowwinCnt": "2018",
      "kwSearchHot": "22"
    }],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.p4pStarOptimize),p4pStar);


//p4p 爆款打造
const plosion= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "expProId": "123456",
      "alibabaUserId": "123456",
      "bepProductId": "123456",
      "bepSubject": "mp3",
      "bepImpressionCnt": "10",
      "bepClickCostAvg": " 3.75",
      "bepClickCnt": "100",
      "bepCost": "3.75",
      "bepCtr": "3.75",
      "bepKeywordsCount": "100",
      "bepPromotionCount": "100",
      "bepFive": "100",
      "bepFour": "100",
      "bepThree": "100",
      "bepOther": "100",
      "createBy": "admin",
      "createTime": "12335444522",
      "updateBy": "admin",
      "updateTime": "12321212210",
      "bepStatDate": "2008-01-02"
    }],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.Explosion),plosion);

//p4p 策略列表
const findAccountStr= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [{
      "expProId": "123456",
      "alibabaUserId": "123456",
      "bepProductId": "123456",
      "bepSubject": "mp3",
      "bepImpressionCnt": "10",
      "bepClickCostAvg": " 3.75",
      "bepClickCnt": "100",
      "bepCost": "3.75",
      "bepCtr": "3.75",
      "bepKeywordsCount": "100",
      "bepPromotionCount": "100",
      "bepFive": "100",
      "bepFour": "100",
      "bepThree": "100",
      "bepOther": "100",
      "createBy": "admin",
      "createTime": "12335444522",
      "updateBy": "admin",
      "updateTime": "12321212210",
      "bepStatDate": "2008-01-02"
    }],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.findAccountStrategy),findAccountStr);

//p4p 策略列表
const BidStatus= function() {
  return {
    "status": "200",
    "mapInfo": [{}],
    "rows": [
      {
        "dicId": "f97e84199db64a7984f53518c8e62f35",
        "dicName": "保持原价",
        "dicCode": "KEEP_PRICE",
        "dicType": "bidType",
        "dicSequnce": 1,
      },
      {
        "dicId": "a03dc6c7d2fd46fe9251ea961471c9ec",
        "dicName": "上限出价",
        "dicCode": "MAX_PRICE",
        "dicType": "bidType",
        "dicSequnce": 2
      },
      {
        "dicId": "ea9626d4e4d24228b1eaa53539444a16",
        "dicName": "暂停推广",
        "dicCode": "PAUSSE",
        "dicType": "bidType",
        "dicSequnce": 3
      },
      {
        "dicId": "240e8220255d4a3e9c54b7cc1d1cd6c9",
        "dicName": "底价出价",
        "dicCode": "MIN_PRICE",
        "dicType": "bidType",
        "dicSequnce": 4
      }
    ],
    "total": 1
  }
};
Mock.mock(handMockUrl(url.findBidStatus),BidStatus);

//p4p 批量更新策略状态
const StrategyStatus= function() {
  return {
    "status": "200",
    "page": null,
    "info": "更新成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.modifyStrategyStatus),StrategyStatus);

//p4p 策略删除
const Strategydeldata= function() {
  return {
    "status": "200",
    "page": null,
    "info": "删除成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.p4pStrategydel),Strategydeldata);

//p4p 策略新增
const addNewdata= function() {
  return {
    "status": "200",
    "page": null,
    "info": "新增成功",
    "mapInfo": {},
    "rows": null,
    "total": null
  }
};
Mock.mock(handMockUrl(url.addNewStrategy),addNewdata);

//p4p 投放时间
const PutInArea= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "dicId": "3d73a16063c342b8be0bb0a9b6301d97",
        "dicName": "北美东部",
        "dicCode": "bmdb",
        "dicType": "putInArea",
        "dicSequnce": 1
      },
      {
        "dicId": "26e8d55903054dfa93aef94dfc7b01ef",
        "dicName": "北美中部",
        "dicCode": "bmzb",
        "dicType": "putInArea",
        "dicSequnce": 2
      },
      {
        "dicId": "596f37b58f9d453ea4d1d9b2fafb817d",
        "dicName": "北美西部",
        "dicCode": "bmxb",
        "dicType": "putInArea",
        "dicSequnce": 3
      },
      {
        "dicId": "c918397e127949429e18ec52adb433b4",
        "dicName": "南美西部",
        "dicCode": "nmxb",
        "dicType": "putInArea",
        "dicSequnce": 4
      },
      {
        "dicId": "9d66ad8612024dab93e3e7182495a1f1",
        "dicName": "南美中部",
        "dicCode": "nmzb",
        "dicType": "putInArea",
        "dicSequnce": 5
      }
    ],
    "total": 17
  }
};
Mock.mock(handMockUrl(url.findPutInArea),PutInArea);

//p4p 投放时间列表
const findPutInAreaT= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [
      {
        "atId": "02fbb90cf6644ddab84733e22c08ea83",
        "dicCode": "bmxb",
        "atStartTime": "17:30",
        "atEndTime": "24:00"
      },
      {
        "atId": "417dd08137d7454b9bb93906bda596ff",
        "dicCode": "bmxb",
        "atStartTime": "00:00",
        "atEndTime": "01:30"
      }
    ],
    "total": 2
  }
};
Mock.mock(handMockUrl(url.findPutInAreaTimes),findPutInAreaT);

//p4p 投放时间列表
const KeywordsForStrategy= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [],
    "total": 2
  }
};
Mock.mock(handMockUrl(url.findP4pKeywordsForStrategy),KeywordsForStrategy);


//p4p 移动策略顺序
const moveStrate= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows": [],
    "total": 2
  }
};
Mock.mock(handMockUrl(url.moveStrategy),moveStrate);









//完善用户信息
const addStoreIn= function() {
  return {
    "status": "200",
    "page": null,
    "info": null,
    "mapInfo": {},
    "rows":[],
    "total": 50
  }
};
Mock.mock(handMockUrl(url.addStoreInfo),addStoreIn);
