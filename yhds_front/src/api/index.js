import url from './urlConfig';
import http from './http';



//素材库复制模板
export const copyTemplateInformation = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.COPYTEMPLATEINFORMATION,conf).then((response) => {
            return response;
        });
    }
};



//推广关键词曝光量
export const findUpKeyWOrds = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findUpKeyWOrds,conf).then((response) => {
            return response;
        });
    }
};

//推广关键词点击量
export const findUpKeyWOrdsClick = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findUpKeyWOrdsClick,conf).then((response) => {
            return response;
        });
    }
};

//推广关键词反馈量
export const findUpKeyWOrdsFb = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findUpKeyWOrdsFb,conf).then((response) => {
            return response;
        });
    }
};

//问题关键词点击量
export const findBadKeyWOrdsClick = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findBadKeyWOrdsClick,conf).then((response) => {
            return response;
        });
    }
};

//问题关键词反馈量
export const findBadKeyWOrdsFb = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findBadKeyWOrdsFb,conf).then((response) => {
            return response;
        });
    }
};

//问题关键词的曝光量
export const findExposureKeyWords = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findExposureKeyWords,conf).then((response) => {
            return response;
        });
    }
};

//建议竞价词预计提升曝光量
export const findmonthKeyWordsCost = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findmonthKeyWordsCost,conf).then((response) => {
            return response;
        });
    }
};

//建议竞价词预计提升点击量
export const findmonthKeyWordsClick = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findmonthKeyWordsClick,conf).then((response) => {
            return response;
        });
    }
};

//建议竞价词反馈
export const findmonthKeyWordsFb = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findmonthKeyWordsFb,conf).then((response) => {
            return response;
        });
    }
};

//推广时长P4P预计提升曝光量
export const findKeyWordsOptimize = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findKeyWordsOptimize,conf).then((response) => {
            return response;
        });
    }
};

//推广时长P4P预计提升点击量
export const findKeyWordsOptimizeClick = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findKeyWordsOptimizeClick,conf).then((response) => {
            return response;
        });
    }
};

//推广时长反馈量
export const findKeyWordsOptimizeFb = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.findKeyWordsOptimizeFb,conf).then((response) => {
            return response;
        });
    }
};








//首页竞价词数
export const findMonthWorkTotal = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.FINDMONTHWORKTOTAL,conf).then((response) => {
            return response;
        });
    }
};

//首页问题关键词数
export const findP4PTotal = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.FINDP4PTOTAL,conf).then((response) => {
            return response;
        });
    }
};


//素材库新增产品类型
export const savematerial = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.SAVEMATERIAL,conf).then((response) => {
            return response;
        });
    }
};

//素材库获取标题列表
export const findKeyWords = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.FINDKEYWORDS,conf).then((response) => {
            return response;
        });
    }
};

//素材库获取标题编辑
export const updateKeyWords = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.UPDATEKEYWORDS,conf).then((response) => {
            return response;
        });
    }
};

//素材库获取标题生成条件
export const findMaterial = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.FINDMATERIAL,conf).then((response) => {
            return response;
        });
    }
};






//产品优化分析器
export const selectGroup = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.SELECTGROUP,conf).then((response) => {
            return response;
        });
    }
};

export const addGroup = {
    data(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.ADDGROUP,conf).then((response) => {
            return response;
        });
    }
};




/**********************************关键词采集——后台关键词接口 author：xwy*****************************************/




//获取关键词列表
export const backKeyworld = {
    find(conf) {
        conf = conf || {
          params:[],
          reqData:{}
        }
        return http.post(url.BACK_FINDBACKKEYWORD,conf).then((response) => {
            return response;
        });
    }
};

//添加到词库
export const addToThesaurus = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BACK_ADDTOKEYWORDSGROUP,conf).then((response) => {
      return response;
    });
  }
};

//关键词过滤
export const filterKeywords = {
  filter(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BACK_FILTERKEYWORDS,conf).then((response) => {
      return response;
    });
  }
};
/***************************************关键词采集——同行关键词接口 author：xwy*************************/
//关键词查询类目
export const showCategroyList = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PERR_SHOWCATEGORYlIST,conf).then((response) => {
      return response;
    });
  }
};
//同行关键词队列列表
export const perrList = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PERR_SHOWlIST,conf).then((response) => {
      return response;
    });
  }
};
//删除同行关键词队列
export const perrListDel = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PERR_lISTDEL,conf).then((response) => {
      return response;
    });
  }
};
//根据队列查询同行关键词
export const findByQueue = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PERR_FINDBYQUEUE,conf).then((response) => {
      return response;
    });
  }
};
//根据队列查询同行关键词
export const filterIndustryKeywords = {
  filter(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PERR_FILTER,conf).then((response) => {
      return response;
    });
  }
};
//重新分析
export const reanalyseIndustryWords = {
  reanalyse(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PERR_REANALYSE,conf).then((response) => {
      return response;
    });
  }
};
/***************************************关键词采集——产品关键词接口 author：xwy*************************/
//产品关键词列表
export const productShowList = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCT_SHOWlIST,conf).then((response) => {
      return response;
    });
  }
};
//产品关键词删除
export const productDel = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCT_DEL,conf).then((response) => {
      return response;
    });
  }
};
//产品关键词查看
export const productWordList = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTWORD_SHOWlIST,conf).then((response) => {
      return response;
    });
  }
};
//产品关键词重新分析
export const productWordreanalyse = {
  reanalyse(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCT_REANALYSE,conf).then((response) => {
      return response;
    });
  }
};
//产品关键词过滤
export const productWordFilterKeywords = {
  filter(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCT_FILTERKEYWORDS,conf).then((response) => {
      return response;
    });
  }
};
/***************************************关键词采集——产品关键词接口 author：xwy*************************/
//查询品牌词或者违禁词
export const brandShowList = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BRAND_SHOWLIST,conf).then((response) => {
      return response;
    });
  }
};
//新增违禁词
export const addBizUserBrandWord = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BRAND_ADDBRANDWORD,conf).then((response) => {
      return response;
    });
  }
};
//改变白名单状态
export const changeWiteList = {
  change(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BRAND_CHANGEWITELIST,conf).then((response) => {
      return response;
    });
  }
};
//删除我的限售词
export const brandDel = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.BRAND_DEL,conf).then((response) => {
      return response;
    });
  }
};
//选择禁售词到本地
export const addMyBrand = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BRAND_ADDMYBRAND,conf).then((response) => {
      return response;
    });
  }
};
//查询常见限售词导出接口
export const queryBrandWord = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BRAND_QUERYBRANDWORD,conf).then((response) => {
      return response;
    });
  }
};
//查询限售词中文类目
export const findCategoryNames = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.BRAND_FINDCATEGORYNAMES,conf).then((response) => {
      return response;
    });
  }
};










/***************************************产品发布——选择分类 author：xwy*************************/
//根据类目ID查询下级类目
export const findCategory = {
  find(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_FINDCATEGORY,conf).then((response) => {
      return response;
    });
  }
};
//根据类目ID查询所有属性
export const getAttributes = {
  search(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_GETATTRIBUTES,conf).then((response) => {
      return response;
    });
  }
};
//查询所有分组信息
export const getAllGroups = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_GETGROUPS,conf).then((response) => {
      return response;
    });
  }
};
//查询运费模版
export const getListTemplates = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_GETLISTTEMPLATES,conf).then((response) => {
      return response;
    });
  }
};
//查询常用类目
export const findUsedCategorys = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTRELEASE_FINDUSEDCATEGORYS,conf).then((response) => {
      return response;
    });
  }
};
/***************************************产品发布——单个产品发布 author：xwy*************************/
//添加到发布任务
export const addProduct = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTRELEASE_ADDPRODUCT,conf).then((response) => {
      return response;
    });
  }
};
//获取货币种类 ，时间单位
export const dictionary = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_DICTIONARY,conf).then((response) => {
      return response;
    });
  }
};
//获取原产地信息,计量单位
export const findByType = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_FINDBYTYPE,conf).then((response) => {
      return response;
    });
  }
};
//关键词生成标题
export const titleRules = {
  rules(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_TITLERULES,conf).then((response) => {
      return response;
    });
  }
};
//解析同行放回属性
export const getPeerAttributes = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_GETPEERATTRIBUTES,conf).then((response) => {
      return response;
    });
  }
};
//搜索关键词
export const chooseKeyword = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTRELEASE_CHOOSEKEYWORD,conf).then((response) => {
      return response;
    });
  }
};
//查询多级类目名称
export const findByProCategory = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTRELEASE_FINDBYPROCATEGROY,conf).then((response) => {
      return response;
    });
  }
};
/***************************************产品发布——发布任务 author：xwy*************************/
//查询所有待发布任务
export const showWaitList = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTTASK_SHOWWAITLIST,conf).then((response) => {
      return response;
    });
  }
};

//删除待发布任务
export const productTaskDel = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTTASK_DEL,conf).then((response) => {
      return response;
    });
  }
};
//修改发布任务产品信息
export const productTaskModify = {
  edit(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTTASK_MODIFYPRODUCT,conf).then((response) => {
      return response;
    });
  }
};
//编辑发布任务
export const productTaskEdit = {
  edit(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.PRODUCTTASK_EDITPRODUCTINFO,conf).then((response) => {
      return response;
    });
  }
};
//确认发布
export const addProdunctToAlibaba = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTTASK_ADDPRODUCTTOALIBABA,conf).then((response) => {
      return response;
    });
  }
};
//查询产品详情模板
export const queryProductDetailTemplate = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTRELEASE_QUERYPRODUCTDETAIL,conf).then((response) => {
      return response;
    });
  }
};
//批量删除
export const delProductBatch = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTTASK_DELPRODUCTBATCH,conf).then((response) => {
      return response;
    });
  }
};


/*******************************批量产品发布*****************************/
//批量发布查询
export const queryGroupInformation = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BACTH_QUERYGROUPINFORMATION,conf).then((response) => {
      return response;
    });
  }
};
//查询模板信息
export const queryTemplate = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BACTH_QUERYGTEMPLATE,conf).then((response) => {
      return response;
    });
  }
};
//删除模版
export const templateDel = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.BACTH_QUERYGTEMPLATEDEL,conf).then((response) => {
      return response;
    });
  }
};
//保存为模板
export const addTemplateInformation = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BACTH_ADDTEMPLATEINFOMATION,conf).then((response) => {
      return response;
    });
  }
};
//导入线上模版
export const getOnlineTemplate = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BACTH_GETONLINETEMP,conf).then((response) => {
      return response;
    });
  }
};
//添加至发布任务
export const addBatchTask = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BACTH_ADDBATCHTASK,conf).then((response) => {
      return response;
    });
  }
};
//获取模版详情
export const getTemplateInfo = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.BACTH_GETTEMPLATEINFO,conf).then((response) => {
      return response;
    });
  }
};
//修改模版
export const modifyTemplateInfo = {
  modify(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.PRODUCTTASK_MODIFYTEMPLATEINFO,conf).then((response) => {
    	console.log(response);
      return response;
    });
  }
};
//查询列表+外来词
export const batchQueryGroupInfo = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.BACTH_QUERYGROUPINFO,conf).then((response) => {
      return response;
    });
  }
};


/*******************************首页*****************************/
//获取系统通知
export const getIndexNotice = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.INDEX_NOTICE,conf).then((response) => {
      return response;
    });
  }
};
//查询用户所有任务信息
export const queryUserTask = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.INDEX_QUERYUSERTASK,conf).then((response) => {
      return response;
    });
  }
};
//查询用户所有任务信息
export const acceptTask = {
  change(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.INDEX_ACCEPTTASK,conf).then((response) => {
      return response;
    });
  }
};
//新增同行pk
export const addBizIndustryPk = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.INDEX_ADDBIZINDUSTRYPK,conf).then((response) => {
      return response;
    });
  }
};
//开始pk
export const pk = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.INDEX_PK,conf).then((response) => {
      return response;
    });
  }
};
//查询pk队列信息
export const queueInfo = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.post(url.INDEX_QUEUEINFO,conf).then((response) => {
      return response;
    });
  }
};
//查询PK结果
export const industryPkShowList = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.INDEX_SHOWLIST,conf).then((response) => {
      return response;
    });
  }
};
//重新选择pk
export const industryPkDel = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.INDEX_DEL,conf).then((response) => {
      return response;
    });
  }
};
//删除pk
export const resetPk = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    }
    return http.get(url.INDEX_DELALL,conf).then((response) => {
      return response;
    });
  }
};





//  李天祥所需要接口

//    分组列表
export const group_Lexicon = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      }
    return http.post(url.wordGroup_query,conf).then((response) => {
      return response;
    });
  }
};

// 分组删除列表
export const group_Lexicon2 = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      }
    return http.post(url.wordGroup_del,conf).then((response) => {
      return response;
    });
  }
};


// 新建分组
export const group_Lexicon4 = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      }
    return http.post(url.wordGroup_add,conf).then((response) => {
      return response;
    });
  }
};
// 分组编辑接口2
export const group_Lexicon5 = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      }
    return http.post(url.wordGroup_modify,conf).then((response) => {
      return response;
    });
  }
};

// 用户退出接口
export const group_out = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.outer,conf).then((response) => {
      return response;
    });
  }
};


// 词库管理
export const group_Info = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.wordGroup_Group,conf).then((response) => {
      return response;
    });
  }
};

//删除我的词
export const group_delMyKeywords = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.wordGroup_delMyKeywords,conf).then((response) => {
      return response;
    });
  }
};
//分配我的词
export const group_assignKeywords = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.assignKeywords,conf).then((response) => {
      return response;
    });
  }
};

//手动导入
export const group_importKeywords = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.importKeywords,conf).then((response) => {
      return response;
    });
  }
};

// 分组添加关键词

export const group_batchAddKeywords = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.batchAddKeywords,conf).then((response) => {
      return response;
    });
  }
};


  // 产品发布接口 图片查看
export const imageslist = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showimages,conf).then((response) => {
      return response;
    });
  }
};
// 产品发布接口 图片删除
export const imagedele = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.deleimages,conf).then((response) => {
      return response;
    });
  }
};
// 产品发布接口 图片分配
export const imagepull = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.modifyBizImage,conf).then((response) => {
      return response;
    });
  }
};
// 图片银行分组

export const imgBreath = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.splitBreath,conf).then((response) => {
      return response;
    });
  }
};

// 图片银行分组查询数据

export const imgPicture = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.bankPicture,conf).then((response) => {
      return response;
    });
  }
};




//保存上传图片

export const imgsaveImage = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.saveImage,conf).then((response) => {
      return response;
    });
  }
};
//查询边框

export const border_showList = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showList,conf).then((response) => {
      return response;
    });
  }
};

//保存边框

export const border_saveFrame = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.saveFrame,conf).then((response) => {
      return response;
    });
  }
};

//保存编辑图片

export const border_editImage = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.editImage,conf).then((response) => {
      return response;
    });
  }
};





/*********************回收站 author：xwy**************/
//查询回收站所有产品
export const showRecycleBin = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGE_SHOWRECYCLEBIN,conf).then((response) => {
      return response;
    });
  }
};
//恢复删除的产品
export const renewProductInfo = {
  find(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PRODUCTMANNAGE_RENEWPRODUCTINFO,conf).then((response) => {
      return response;
    });
  }
};
//彻底删除
export const dropProductInfo = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGE_DROP,conf).then((response) => {
      return response;
    });
  }
};
//清空回收站
export const dropRecycleBin = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PRODUCTMANNAGE_DROPRECYCLEBIN,conf).then((response) => {
      return response;
    });
  }
};
/*********************产品管理 author：xwy**************/
//查询所有产品
export const showAllProduct = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGER_SHOWALLPRODUCT,conf).then((response) => {
      return response;
    });
  }
};

//查询所有负责人
export const findOwnerName = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PRODUCTMANNAGER_FINDOWNERNAME,conf).then((response) => {
      return response;
    });
  }
};
//同步阿里产品信息
export const synchronousProduct = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PRODUCTMANNAGER_SYNCHRONOUSPRODUCT,conf).then((response) => {
      return response;
    });
  }
};
//查询是否同步阿完成
export const findAsyncTask = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PRODUCTMANNAGER_FINDASYNCTASK,conf).then((response) => {
      return response;
    });
  }
};
//批量查询产品详情
export const findByIds = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGER_FINDBYIDS,conf).then((response) => {
      return response;
    });
  }
};
//批量修改产品信息
export const batchModify = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGER_BATCHMODIFY,conf).then((response) => {
      return response;
    });
  }
};
//修改产品信息
export const updateProduct = {
  edit(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGER_UPDATEPRODUCT,conf).then((response) => {
      return response;
    });
  }
};
//批量修改查询系统属性列表
export const findProAttrs = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGER_FINDPROATTRS,conf).then((response) => {
      return response;
    });
  }
};
//批量修改-查询自定义属性列表
export const findAttrs = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGER_FINDATTRS,conf).then((response) => {
      return response;
    });
  }
};
//批量修改-查询自定义属性值
export const findValues = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PRODUCTMANNAGER_FINDVALUES,conf).then((response) => {
      return response;
    });
  }
};






//p4p推广产品设置
export const ProductGroups = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findProductGroups,conf).then((response) => {
      return response;
    });
  }
};


//p4p 词库管理策略词
export const findPkwStrategy = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.FINDPKWSTRATEGY,conf).then((response) => {
      return response;
    });
  }
};

//p4p 词库管理高曝低点
export const findUpWords = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.FINDUPWORDS,conf).then((response) => {
      return response;
    });
  }
};

//p4p 词库管理高花费
export const findUpCost = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.FINDUPCOST,conf).then((response) => {
      return response;
    });
  }
};

//p4p 词库管理竞价词
export const findMonthWork = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.FINDMONTHWORK,conf).then((response) => {
      return response;
    });
  }
};

//p4p 词库管理添加
export const AddProducts = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showAddProducts,conf).then((response) => {
      return response;
    });
  }
};


//p4p分组下产品列表
export const tionList = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.PromotionList,conf).then((response) => {
      return response;
    });
  }
};

//p4p分组下产品状态
export const tionStatus = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.PromotionStatus,conf).then((response) => {
      return response;
    });
  }
};


//p4p词库管理表格
export const tabelList = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.tabelshowList,conf).then((response) => {
      return response;
    });
  }
};
//p4p词库管理删除
export const deltabelList = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.delKeywords,conf).then((response) => {
      return response;
    });
  }
};
//p4p词库管理查询分组
export const tabelAllGroup = {
  del(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.findAllGroup,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理关键词分配
export const modifyKeywords = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.modifyKeywordsGroup,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理同步关键词
export const chronize = {
  del(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.synchronize,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理新建分组
export const KeywordsGroup = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.createP4PKeywordsGroup,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 日曲线
export const PriceTrade = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.p4pPriceTrade,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 日曲线
export const CustomList = {
  del(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.ColumnCustom,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理保存自定义列
export const saveP4PColumn = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.saveP4PColumnCustom,conf).then((response) => {
      return response;
    });
  }
};
//p4p词库管理 查询账户余额
export const Balance = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.queryBalance,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 关键词前五
export const showRank = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showRankPriceList,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 关键词改价
export const fyPrice = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.modifyPrice,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 关键词列表
export const Reckeywords = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findSysReckeywords,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 添加关键词
export const wordsToAd = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.addKeywordsToAd,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 我的词库
export const findMyKeyword = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findMyKeywords,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 删除分组
export const p4pdele = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.p4pdelGroup,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 编辑分组
export const TagName = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.modifyTagName,conf).then((response) => {
      return response;
    });
  }
};

//p4p词库管理 关键词查询推广产品
export const ByKeywords = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showProductByKeywords,conf).then((response) => {
      return response;
    });
  }
};
//p4p词库管理 关键词优先推广
export const Preferential = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.updatePreferential,conf).then((response) => {
      return response;
    });
  }
};

//p4p 报告 月度报告
export const MonthReport = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findAccountMonthReport,conf).then((response) => {
      return response;
    });
  }
};

//p4p 报告 月度报告 详情
export const ReportDetails = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findAccountReportDetails,conf).then((response) => {
      return response;
    });
  }
};

//p4p 报告 账户详情
export const ReportData = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findAccountReportData,conf).then((response) => {
      return response;
    });
  }
};

//p4p 报告 后台详情
export const BackReport = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findAccountBackReport,conf).then((response) => {
      return response;
    });
  }
};

//p4p 报告 日消耗曲线
export const AccountDailyCost = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findAccountDailyCost,conf).then((response) => {
      return response;
    });
  }
};



//p4p 日志 出价
export const offershow = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.offershowList,conf).then((response) => {
      return response;
    });
  }
};

//p4p 日志 操作
export const OperateLog = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.bizOperateLog,conf).then((response) => {
      return response;
    });
  }
};




//p4p首页 账号
export const accountp4p = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.p4pIndex,conf).then((response) => {
      return response;
    });
  }
};

//p4p首页 状态
export const KeywordsStatus = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.updateKeywordsStatus,conf).then((response) => {
      return response;
    });
  }
};

//p4p首页 优化
export const optimizep4p = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.optimize,conf).then((response) => {
      return response;
    });
  }
};

//p4p首页 星级
export const keyStarsp4p = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.keyStars,conf).then((response) => {
      return response;
    });
  }
};


//p4p优化星级
export const StarOptimize = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.p4pStarOptimize,conf).then((response) => {
      return response;
    });
  }
};


//p4p策略列表
export const findAccountStrat = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findAccountStrategy,conf).then((response) => {
      return response;
    });
  }
};

//p4p查询策略高于出价状态
export const findBidSta = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.findBidStatus,conf).then((response) => {
      return response;
    });
  }
};

//p4p删除策略
export const Strategydel = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.p4pStrategydel,conf).then((response) => {
      return response;
    });
  }
};



//p4p批量更新策略状态
export const modifyStrategy = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.modifyStrategyStatus,conf).then((response) => {
      return response;
    });
  }
};


//p4p 新增策略
export const addNewStrat = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.addNewStrategy,conf).then((response) => {
      return response;
    });
  }
};

//p4p投放时间
export const findPutIn = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.findPutInArea,conf).then((response) => {
      return response;
    });
  }
};

//p4p投放列表
export const PutInAreaTimes = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.findPutInAreaTimes,conf).then((response) => {
      return response;
    });
  }
};

//p4p 策略 添加词列表
export const findP4pKeywordsFor = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
    };
    return http.post(url.findP4pKeywordsForStrategy,conf).then((response) => {
      return response;
    });
  }
};

//p4p 策略 移动策略顺序
export const moveStrategydata = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.moveStrategy,conf).then((response) => {
      return response;
    });
  }
};

//p4p策略添加全部关键词
export const selectAllKeywordsdel = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.selectAllKeywords,conf).then((response) => {
      return response;
    });
  }
};

//p4p 策略 优先策略
export const setFirstStrat = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.setFirstStrategy,conf).then((response) => {
      return response;
    });
  }
};

//p4p策略删除低星词
export const removeLowerStarKey = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.removeLowerStarKeywords,conf).then((response) => {
      return response;
    });
  }
};

//p4p策略 加词列表
export const KeywordsForStrategy = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.findKeywordsForStrategy,conf).then((response) => {
      return response;
    });
  }
};

//p4p策略 加词确定
export const addKeywordsToStra = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.addKeywordsToStrategy,conf).then((response) => {
      return response;
    });
  }
};

//p4p策略 批量修改投放时间
export const modifyPutInTimedata = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.modifyPutInTime,conf).then((response) => {
      return response;
    });
  }
};

//p4p策略 获取修改信息
export const getStrategyInfodata = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.getStrategyInfo,conf).then((response) => {
      return response;
    });
  }
};
//p4p策略  所有策略
export const AllStrategyList = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.findAllStrategyList,conf).then((response) => {
      return response;
    });
  }
};

//p4p策略  修改所有
export const modifyStrategypull = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.modifyStrategyInfo,conf).then((response) => {
      return response;
    });
  }
};

//p4p策略  移除关键词所属策略
export const delKeywordsFromStrat = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.delKeywordsFromStrategy,conf).then((response) => {
      return response;
    });
  }
};
//p4p策略  暂停非策略词
export const stopUnStrategyKeywordslist = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.stopUnStrategyKeywords,conf).then((response) => {
      return response;
    });
  }
};
//p4p策略  暂停
export const stopKeywords = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.stopKeywords,conf).then((response) => {
      return response;
    });
  }
};








//p4p爆款打造
export const hotExplosion = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.Explosion,conf).then((response) => {
      return response;
    });
  }
};
//p4p 爆款同步
export const hotsynchronizelist = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.hotsynchronize,conf).then((response) => {
      return response;
    });
  }
};

//p4p 爆款状态
export const updateExplos = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.updateExplosion,conf).then((response) => {
      return response;
    });
  }
};

//p4p 爆款关键词
export const showProductKeysdata = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showProductKeys,conf).then((response) => {
      return response;
    });
  }
};

//p4p 爆款加词
export const hotaddKeywordsToStrat = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.hotaddKeywordsToStrategy,conf).then((response) => {
      return response;
    });
  }
};

/*********************平台分析 author：xwy**************/
//曝光-曝光量总数
export const findKeywordsExposureTotal = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_FINDKEYWORDSEXPOSURETOTAL,conf).then((response) => {
      return response;
    });
  }
};
//曝光-关键词覆盖
export const findKeywordsNaturalCoverStatisticData = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_NATURALCOVERDATA,conf).then((response) => {
      return response;
    });
  }
};
//曝光-关键词排名
export const findKeywordsNaturalRankStatisticData = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_NATURALRANKDATA,conf).then((response) => {
      return response;
    });
  }
};
//曝光-p4p曝光量
export const findKeywordsP4pExposure = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PLATFORM_FINDKEYWORDP4PEXPOSURE,conf).then((response) => {
      return response;
    });
  }
};
//曝光-星级优化
export const findStarOptimization = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PLATFORM_FINDSTAROPTIMIZATION,conf).then((response) => {
      return response;
    });
  }
};
//曝光-自然-覆盖更多
export const findMyKeywordsForAnalysis = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_FINDKEYWORDFORANALYSIS,conf).then((response) => {
      return response;
    });
  }
};
//曝光-覆盖更多-同行
export const findIndustryKeywordsForAnalysis = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_FINDINDUSTRYFORANALYSIS,conf).then((response) => {
      return response;
    });
  }
};
//曝光-seo优化
export const findKeywordsRankList = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_FINDKEYWORDSRANKLIST,conf).then((response) => {
      return response;
    });
  }
};
//曝光-p4p-增加覆盖
export const findKeywordsIsNotP4p = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_FINDKEYWORDSNOTP4P,conf).then((response) => {
      return response;
    });
  }
};
//关键词覆盖曲线
export const findKeywordsCoverCurve = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_FINDKEYWORDSCOVERCURVE,conf).then((response) => {
      return response;
    });
  }
};
//关键词排名曲线
export const findKeywordsRankCurve = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_FINDKEYWORDSRANKCURVE,conf).then((response) => {
      return response;
    });
  }
};

//平台分析-同行关键词添加到词库
export const addKeywordsForIndustry = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_ADDKEYWORDSFORINDUSTRY,conf).then((response) => {
      return response;
    });
  }
};
//分析记录
export const findOptimizeRecord = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PLATFORM_FINDOPTIMIZERECORD,conf).then((response) => {
      return response;
    });
  }
};
//数据管家
export const findManagerReports = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PLATFORM_FINDMANAGERREPORTS,conf).then((response) => {
      return response;
    });
  }
};



//平台分析 关键词列表
export const bizKeywordsExten = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.bizKeywordsExtension,conf).then((response) => {
      return response;
    });
  }
};

//平台分析 产品分析列表列表
export const showProductListData = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showProductList,conf).then((response) => {
      return response;
    });
  }
};

//平台分析 产品分析列表列表
export const showP4pCoverData = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showP4pCover,conf).then((response) => {
      return response;
    });
  }
};

//平台分析 产品词覆盖
export const showProductCoverdata= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showProductCover,conf).then((response) => {
      return response;
    });
  }
};

//平台分析 关联更多关键
export const showConnectData= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showConnect,conf).then((response) => {
      return response;
    });
  }
};


//平台分析 关联关键词
export const cognateProductData= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.cognateProduct,conf).then((response) => {
      return response;
    });
  }
};

//平台分析 推广状态
export const updateProductStatusData= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.updateProductStatus,conf).then((response) => {
      return response;
    });
  }
};

//词库管理 已添加产品列表
export const showAddedData= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.showAdded,conf).then((response) => {
      return response;
    });
  }
};

//词库管理 添加产品
export const addProductsData= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.addProducts,conf).then((response) => {
      return response;
    });
  }
};





//报告 查询任务
export const updateTaskData= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.updateTask,conf).then((response) => {
      return response;
    });
  }
};

//产品设置 同步
export const updateProductPromotionsdata= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.updateProductPromotions,conf).then((response) => {
      return response;
    });
  }
};
//产品设置 同步状态
export const findUpdateStatusdata= {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.findUpdateStatus,conf).then((response) => {
      return response;
    });
  }
};













//首页  时间曲线
export const queryTimeweek = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.queryTimeCycle,conf).then((response) => {
      return response;
    });
  }
};

//首页  行业
export const queryIndustrylist = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.queryIndustry,conf).then((response) => {
      return response;
    });
  }
};
//首页  曲线
export const IndustryPersformance = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.queryIndustryPersformance,conf).then((response) => {
      return response;
    });
  }
};



//用户名
export const username = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.getUserInfo,conf).then((response) => {
      return response;
    });
  }
};

//完善用户信息
export const toreInfo = {
  find(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.addStoreInfo,conf).then((response) => {
      return response;
    });
  }
};
/*********************同行分析 author：xwy**************/

//根据关键词 查询同行，创建查询队列
export const queryIndustry = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PREEANALYSIS_QUERYINDUSTRY,conf).then((response) => {
      return response;
    });
  }
};
//删除同行队列
export const delQueueInfo = {
  del(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PREEANALYSIS_DELQUEUEINFO,conf).then((response) => {
      return response;
    });
  }
};
//根据关键词查询同行详情，队列id为必传
export const queryPkResult = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PREEANALYSIS_QUERYPKRESULT,conf).then((response) => {
      return response;
    });
  }
};

//开始分析同行详细信息
export const analysisIndustry = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PREEANALYSIS_ANALYSISINDUSTRY,conf).then((response) => {
      return response;
    });
  }
};

//新增 对比分析同行
export const pkComparison = {
  add(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.post(url.PREEANALYSIS_PKCOMPARISON,conf).then((response) => {
      return response;
    });
  }
};
//查询对比分析同行的详情
export const queryComparisonResult = {
  list(conf) {
    conf = conf || {
      params:[],
      reqData:{}
    };
    return http.get(url.PREEANALYSIS_PKCOMPARISONRESULT,conf).then((response) => {
      return response;
    });
  }
};

//帮助 侧边栏
export const queryAllDataByTypeData = {
  list(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.queryAllDataByType,conf).then((response) => {
      return response;
    });
  }
};

//帮助 查标题
export const bizHelpFaqData = {
  list(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.get(url.bizHelpFaq,conf).then((response) => {
      return response;
    });
  }
};

//帮助 查内容
export const findByFaqTypeData = {
  data(conf) {
    conf = conf || {
        params:[],
        reqData:{}
      };
    return http.post(url.findByFaqType,conf).then((response) => {
      return response;
    });
  }
};

