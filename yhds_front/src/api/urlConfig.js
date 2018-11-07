let url = {
  /*******************用户名接口 author：ltx***************/
  getUserInfo:'/alibaba/user/getUserInfo',

  /*******************完善用户信息 author：ltx***************/
  addStoreInfo:'/alibaba/user/addStoreInfo',

		/**素材库**/
		SAVEMATERIAL:'/alibaba/material/saveMaterial',//增加产品类型
		FINDKEYWORDS:'/alibaba/material/selectPage',//获取标题列表
		UPDATEKEYWORDS:'/alibaba/material/updateKeyWords',//编辑单个标题
		FINDMATERIAL:'/alibaba/material/findMaterial',//获取标题生成条件
		COPYTEMPLATEINFORMATION:'alibaba/productTemplate/copyTemplateInformation',//获取标题生成条件
		
	
		/**首页竞价词数**/
		FINDMONTHWORKTOTAL:'alibaba/p4pKeywords/findMonthWorkTotal',
		/**首页问题关键词数**/
		FINDP4PTOTAL:'alibaba/p4pKeywords/findP4PTotal',
		
//		alibaba/p4pKeywords
		findUpKeyWOrds:'alibaba/p4pKeywords/findUpKeyWOrds',//推广关键词曝光量
		findUpKeyWOrdsClick:'alibaba/p4pKeywords/findUpKeyWOrdsClick',//推广关键词点击量
		findUpKeyWOrdsFb:'alibaba/p4pKeywords/findUpKeyWOrdsFb',//推广关键词反馈量
		findBadKeyWOrdsClick:'alibaba/p4pKeywords/findBadKeyWOrdsClick',//问题关键词点击量
		findBadKeyWOrdsFb:'alibaba/p4pKeywords/findBadKeyWOrdsFb',//问题关键词反馈量
		findExposureKeyWords:'alibaba/p4pKeywords/findExposureKeyWords',//问题关键词的曝光量
		findmonthKeyWordsCost:'alibaba/p4pKeywords/findmonthKeyWordsCost',//建议竞价词预计提升曝光量
		findmonthKeyWordsClick:'alibaba/p4pKeywords/findmonthKeyWordsClick',//建议竞价词预计提升点击量
		findmonthKeyWordsFb:'alibaba/p4pKeywords/findmonthKeyWordsFb',//建议竞价词反馈
		findKeyWordsOptimize:'alibaba/p4pKeywords/findKeyWordsOptimize',//推广时长P4P预计提升曝光量
		findKeyWordsOptimizeClick:'alibaba/p4pKeywords/findKeyWordsOptimizeClick',//推广时长P4P预计提升点击量
		findKeyWordsOptimizeFb:'alibaba/p4pKeywords/findKeyWordsOptimizeFb',//推广时长反馈量
		
		
		
		
		
		
    /*******************关键词采集——后台关键词接口 author：xwy***************/
    BACK_FINDBACKKEYWORD:'/alibaba/backKeywords/findBackKeyworld',//后台关键词查询
    BACK_ADDTOKEYWORDSGROUP:'/alibaba/keywords/addToKeywordsGroup',//添加到词库
    BACK_FILTERKEYWORDS:'/alibaba/backKeywords/filterKeywords',//关键词过滤
    BACK_EXPORTKEYWORDSEXCEL:'/alibaba/backKeywords/exportKeywordsExcel',//导出
    /*********************关键词采集——产品关键词接口 author：xwy**************/
    // PRODUCT_SHOWlIST:'/alibaba/searchWordQueue/showList',//产品关键词列表
    PRODUCT_SHOWlIST:'/alibaba/wordsCollectQueue/showList',//产品关键词列表
    PRODUCT_DEL:'/alibaba/searchWordQueue/del/:keys',         //产品关键词删除
    PRODUCTWORD_SHOWlIST:'/alibaba/productKeywords/showList', //查看
    PRODUCT_REANALYSE:'/alibaba/searchWordQueue/reanalyseProductKeywords',//重新分析
    PRODUCT_FILTERKEYWORDS:'/alibaba/productKeywords/filterKeywords',//过滤
    /*********************关键词采集——同行关键词接口 author：xwy**************/
    PERR_SHOWCATEGORYlIST:'/alibaba/industryCategory/showList',//产品关键词类目
    // PERR_SHOWlIST:'/alibaba/industryWordsQueue/showList',//同行关键词队列列表
    // PERR_lISTDEL:'/alibaba/industryWordsQueue/del/:keys',//删除同行关键词队列
    PERR_SHOWlIST:'/alibaba/wordsCollectQueue/showIndustryList',//同行关键词队列列表
    PERR_lISTDEL:'/alibaba/wordsCollectQueue/del/:keys',//删除同行关键词队列
    PERR_FINDBYQUEUE:'/alibaba/industryKeywords/findByQueue',//根据队列查询同行关键词
    PERR_FILTER:'/alibaba/industryKeywords/filterIndustryKeywords',//根据同行关键词过滤
    PERR_REANALYSE:'/alibaba/industryWordsQueue/reanalyseIndustryWords',//重新分析


    /*********************关键词采集——违禁词和限售词接口 author：xwy**************/

    BRAND_SHOWLIST:'/alibaba/userBrandWord/showList',//查询品牌词或者违禁词
    BRAND_ADDBRANDWORD:'/alibaba/userBrandWord/addBizUserBrandWord',//新增违禁词
    BRAND_CHANGEWITELIST:'/alibaba/userBrandWord/changeWiteList',//改变白名单状态
    BRAND_DEL:'/alibaba/userBrandWord/del/:ids',//删除我的限售词
    BRAND_ADDMYBRAND:'/alibaba/userBrandWord/addMyBrand',//选择禁售词到本地
    BRAND_QUERYBRANDWORD:'/alibaba/userBrandWord/queryBrandWord',//查询常见限售词导出接口
    BRAND_FINDCATEGORYNAMES:'/alibaba/userBrandWord/findCategoryNames',//查询限售词中文类目


  /*******************关键词采集——词组分组接口 author：ltx***************/
  wordGroup_query:"/alibaba/wordGroup/queryAllWordGroup",//热词分组显示
  wordGroup_del:"/alibaba/wordGroup/del/:keys/:type",//热词分组删除接口
  // wordGroup_edit:"/admin/wordGroupRules/editForm/:id",//热词分组编辑接口1
  wordGroup_add:"/alibaba/wordGroup/addBizWordGroup",//新增分组接口
  wordGroup_modify:"/alibaba/wordGroup/modifyBizWordGroup",//热词分组编辑接口2
  // 退出登录
  outer:"alibabaLogin/loginOut",

  /*******************关键词采集——词库管理 author：ltx***************/
  wordGroup_Group:"/alibaba/keywords/findKeywordsInfoByGroup",//词库列表接口
  wordGroup_delMyKeywords:"/alibaba/keywords/delMyKeywords",//删除我的词
  assignKeywords:"/alibaba/keywords/assignKeywords",//分配我的词
  importKeywords:"/alibaba/keywords/importKeywords",//手动导入接口
  batchAddKeywords:"/alibaba/keywords/batchAddKeywords",//关键词

  /*********************产品发布——选择分类 author：xwy**************/
  PRODUCTRELEASE_FINDCATEGORY:'/alibaba/productCategory/findCategory/:keys',//根据类目ID查询下级类目
  PRODUCTRELEASE_GETATTRIBUTES:'/alibaba/productCategory/getAttributes/:keys',//根据类目ID查询所有属性
  PRODUCTRELEASE_GETGROUPS:'/alibaba/productCategory/getGroups/:key',//查询所有分组信息
  PRODUCTRELEASE_GETLISTTEMPLATES:'/alibaba/productCategory/getListTemplates/:keys1/:keys2',//查询运费模版
  PRODUCTRELEASE_FINDUSEDCATEGORYS:'/alibaba/productCategory/findUsedCategorys',//查询常用类目

  /*********************产品发布——单个产品发布 author：xwy**************/
  PRODUCTRELEASE_ADDPRODUCT:'/alibaba/productInfo/addProduct',//添加到发布任务
  PRODUCTRELEASE_DICTIONARY:'/alibaba/dataDictionary/queryDataByType/:d',//获取货币种类 ，时间单位
  PRODUCTRELEASE_FINDBYTYPE:'/alibaba/dataDictionary/findByType/:d',//获取原产地信息,计量单位
  PRODUCTRELEASE_TITLERULES:'/alibaba/productInfo/titleRules/:keys',//关键词生成标题
  PRODUCTRELEASE_GETPEERATTRIBUTES:'/alibaba/productInfo/getPeerAttributes/:keys',//解析同行放回属性
  PRODUCTRELEASE_CHOOSEKEYWORD:'/alibaba/keywords/shouList',//搜索关键词
  PRODUCTRELEASE_QUERYPRODUCTDETAIL:'/alibaba/productDetailTemplate/queryProductDetailTemplate',//查询产品详情模板
  PRODUCTRELEASE_FINDBYPROCATEGROY:'/alibaba/productCategory/findByProCategory/:keys',//查询多级类目名称


  /*********************产品发布——批量产品发布 author：xwy**************/
  BACTH_QUERYGROUPINFORMATION:'/alibaba/productTemplate/queryGroupInformation',//批量发布查询
  BACTH_QUERYGTEMPLATE:'/alibaba/productTemplate/showList',//查询模版信息
  BACTH_QUERYGTEMPLATEDEL:'/alibaba/productTemplate/del/:d',//删除模版
  BACTH_ADDTEMPLATEINFOMATION:'/alibaba/productTemplate/addTemplateInformation',//保存为模板
  BACTH_GETONLINETEMP:'/alibaba/productTemplate/getOnlineTemplate',//导入线上模版
  BACTH_ADDBATCHTASK:'/alibaba/productInfo/addBatchTask',//添加至发布任务
  BACTH_GETTEMPLATEINFO:'/alibaba/productTemplate/getTemplateInfo/:keys',//获取模版详情
  BACTH_QUERYGROUPINFO:'/alibaba/productTemplate/queryGroupInfo',//查询列表+外来词

  /*********************产品发布——发布任务 author：xwy**************/
  PRODUCTTASK_SHOWWAITLIST:'/alibaba/productInfo/showWaitList',//查询所有待发布任务
  PRODUCTTASK_DEL:'/alibaba/productInfo/delProductInfo/:keys',//删除待发布任务
  PRODUCTTASK_MODIFYPRODUCT:'/alibaba/productInfo/modifyProduct',//修改发布任务产品信息
  PRODUCTTASK_EDITPRODUCTINFO:'/alibaba/productInfo/findProductInfo/:keys',//编辑发布任务
  PRODUCTTASK_ADDPRODUCTTOALIBABA:'/alibaba/productInfo/addProdunctToAlibaba',//确认发布
  PRODUCTTASK_MODIFYTEMPLATEINFO:'/alibaba/productTemplate/modifyTemplateInfo',//修改模版
  PRODUCTTASK_DELPRODUCTBATCH:'/alibaba/productInfo/delProductBatch',//批量删除

  /*********************产品发布--图片库 author：ltx**************/
  showimages:'/alibaba/Image/showList',//图片列表和编辑图片列表
  deleimages:'/alibaba/Image/del/:del',//删除上传图片和编辑图片
  modifyBizImage:'/alibaba/Image/modifyBizImage',//分配图片分组
  splitBreath:"/alibaba/Image/splitBreath",//图片银行分组
  bankPicture:'/alibaba/Image/bankPicture',//图片银行分组查询
    saveImage:'/alibaba/imageUpload/saveImage',// 保存图片
  showList:'/alibaba/frame/showList',// 查询边框
  saveFrame:'/alibaba/frame/saveFrame',// 保存边框
  editImage:'/alibaba/Image/editImage',// 保存编辑图片

  /*********************回收站 author：xwy**************/
  PRODUCTMANNAGE_SHOWRECYCLEBIN:'/alibaba/productInfo/showRecycleBin',//查询回收站所有产品
  PRODUCTMANNAGE_RENEWPRODUCTINFO:'/alibaba/productInfo/renewProductInfo/:keys',//恢复删除的产品
  PRODUCTMANNAGE_DROP:'/alibaba/productInfo/dropProductInfo',//彻底删除
  PRODUCTMANNAGE_DROPRECYCLEBIN:'/alibaba/productInfo/dropRecycleBin',//清空回收站

  /*********************产品管理 author：xwy**************/
  PRODUCTMANNAGER_SHOWALLPRODUCT:'/alibaba/productInfo/showAllProduct',//查询所有产品
  PRODUCTMANNAGER_FINDOWNERNAME:'/alibaba/productInfo/findOwnerName',//查询所有负责人
  PRODUCTMANNAGER_SYNCHRONOUSPRODUCT:'/alibaba/productInfo/synchronousProduct',//同步阿里产品信息
  PRODUCTMANNAGER_FINDASYNCTASK:'/alibaba/productInfo/findAsyncTask',//查询是否同步阿完成
  PRODUCTMANNAGER_FINDBYIDS:'/alibaba/productInfo/findByIds',//批量查询产品详情
  PRODUCTMANNAGER_BATCHMODIFY:'/alibaba/productInfo/batchModify',//批量修改产品信息
  PRODUCTMANNAGER_UPDATEPRODUCT:'/alibaba/productInfo/updateProduct',//修改产品信息
  PRODUCTMANNAGER_FINDPROATTRS:'/alibaba/productInfo/findProAttrs',//批量修改查询系统属性列表
  PRODUCTMANNAGER_FINDATTRS:'/alibaba/productAttribute/findAttrs',//批量修改-查询自定义属性列表
  PRODUCTMANNAGER_FINDVALUES:'/alibaba/productAttribute/findValues',//批量修改-查询自定义属性值




  /*********************p4p--推广产品设置 author：ltx**************/
  findProductGroups:'/alibaba/productPromition/findProductGroups',

  /*********************p4p--分组下产品列表 author：ltx**************/
  PromotionList:'/alibaba/productPromition/findProductPromotionList',


  /*********************p4p--分组修改产品状态 author：ltx**************/
  PromotionStatus:'/alibaba/productPromition/modifyProductPromotionStatus',

  /*********************p4p--词库管理策略词 author：zx**************/
  FINDPKWSTRATEGY:'/alibaba/p4pKeywords/findPkwStrategy',
  
  /*********************p4p--词库管理高曝低点 author：zx**************/
  FINDUPWORDS:'/alibaba/p4pKeywords/findUpWords',
  
  /*********************p4p--词库管理高花费 author：zx**************/
  FINDUPCOST:'/alibaba/p4pKeywords/findUpCost',
  
  /*********************p4p--词库管理竞价词 author：zx**************/
  FINDMONTHWORK:'/alibaba/p4pKeywords/findMonthWork',

  /*********************p4p--词库管理搜索表格 author：ltx**************/
  tabelshowList:'/alibaba/p4pKeywords/showList',
  /*********************p4p--词库管理删除表格 author：ltx**************/
  delKeywords:'/alibaba/p4pKeywords/delKeywords',
  /*********************p4p--词库管理查询分组 author：ltx**************/
  findAllGroup:'/alibaba/addNewKeywords/findAllGroup',
  /*********************p4p--词库管理关键词分配 author：ltx**************/
  modifyKeywordsGroup:'/alibaba/p4pKeywords/modifyKeywordsGroup',
  /*********************p4p--词库管理同步关键词 author：ltx**************/
  synchronize:'/alibaba/p4pKeywords/synchronize',
  /*********************p4p--词库管理新建分组  author：ltx**************/
  createP4PKeywordsGroup:'/alibaba/p4pKeywords/createP4PKeywordsGroup',
  /*********************p4p--词库管理日曲线  author：ltx**************/
  p4pPriceTrade:'/alibaba/p4pPriceTrade/showList',
  /*********************p4p--词库管理自定义列  author：ltx**************/
  ColumnCustom:'/alibaba/p4pColumnCustom/showList/:type',

  /*********************p4p--词库管理自定义列保存  author：ltx**************/
  saveP4PColumnCustom:'/alibaba/p4pColumnCustom/saveP4PColumnCustom',

  /*********************p4p--词库管理查询账户余额  author：ltx**************/
  queryBalance:'/alibaba/p4pKeywords/queryBalance',
  /*********************p4p--词库管理关键词前五  author：ltx**************/
  showRankPriceList:'/alibaba/p4pKeywords/showRankPriceList',

  /*********************p4p--词库管理修改价格  author：ltx**************/
  modifyPrice:'/alibaba/p4pKeywords/modifyPrice',

  /*********************p4p--词库管理关键词列表  author：ltx**************/
  findSysReckeywords:'/alibaba/addNewKeywords/findSysReckeywords',

  /*********************p4p--词库管理添加关键词  author：ltx**************/
  addKeywordsToAd:'/alibaba/addNewKeywords/addKeywordsToAd',

  /*********************p4p--词库管理我的词库  author：ltx**************/
  findMyKeywords:'/alibaba/addNewKeywords/findMyKeywords',

  /*********************p4p--词库管理删除分组  author：ltx**************/
  p4pdelGroup:'/alibaba/p4pKeywords/delGroup',

  /*********************p4p--词库管理修改分组名  author：ltx**************/
  modifyTagName:'/alibaba/p4pKeywords/modifyTagName',

  /*********************p4p--关键词查询推广产品  author：ltx**************/
  showProductByKeywords:'/alibaba/p4pKeywords/showProductByKeywords',

  /*********************p4p--关键词设置优先推广 author：ltx**************/
  updatePreferential:'/alibaba/p4pKeywords/updatePreferential',


  /*********************p4p--已添加产品列表 author：ltx**************/
  showAdded:'/alibaba/p4pKeywords/showAdded',


  /*********************p4p--添加产品 author：ltx**************/
  addProducts:'/alibaba/p4pKeywords/addProducts',


  /*********************p4p--报告 月度报告 author：ltx**************/
  findAccountMonthReport:'/alibaba/p4PReportData/findAccountMonthReport',


  /*********************p4p--报告 月度报告详情 author：ltx**************/
  findAccountReportDetails:'/alibaba/p4PReportData/findAccountReportDetails',

  /*********************p4p--报告 账户详情 author：ltx**************/
  findAccountReportData:'/alibaba/p4PReportData/findAccountReportData',

  /*********************p4p--报告 后台详情 author：ltx**************/
  findAccountBackReport:'/alibaba/p4PReportData/findAccountBackReport',

  /*********************p4p--报告 日消耗曲线 author：ltx**************/
  findAccountDailyCost:'/alibaba/p4PReportData/findAccountDailyCost',


  /*********************p4p--日志 出价日志 author：ltx**************/
  offershowList:'/alibaba/bidLog/showList',

  /*********************p4p--日志 操作日志 author：ltx**************/
  bizOperateLog:'/alibaba/operateLog/showList',


  /*********************p4p--优化星级 author：ltx**************/
  p4pStarOptimize:'/alibaba/p4pStarOptimize/findStarKeywords',





  /*********************p4p--首页 首页账号信息 author：ltx**************/
  p4pIndex:'/alibaba/p4pIndex/account',

  /*********************p4p--首页 状态 author：ltx**************/
  updateKeywordsStatus:'/alibaba/p4pIndex/updateKeywordsStatus/:status',


  /*********************p4p--首页 优化 author：ltx**************/
  optimize:'/alibaba/p4pIndex/optimize',


  /*********************p4p--首页 星级 author：ltx**************/
  keyStars:'/alibaba/p4pIndex/keyStars',


  /*********************p4p--爆款打造 产品列表 author：ltx**************/
  Explosion:'/alibaba/explosionProduct/showProduct',

  /*********************p4p--爆款打造 同步产品 author：ltx**************/
  hotsynchronize:'/alibaba/explosionProduct/synchronize',

  /*********************p4p--爆款打造 状态 author：ltx**************/
  updateExplosion:'/alibaba/explosionProduct/updateExplosion',

  /*********************p4p--爆款打造 关键词 author：ltx**************/
  showProductKeys:'/alibaba/explosionProduct/showProductKeys',

  /*********************p4p--爆款打造 加词 author：ltx**************/
  hotaddKeywordsToStrategy:'/alibaba/p4pStrategy/addKeywordsToStrategy',




  /*********************p4p--策略  策略列表author：ltx**************/
  findAccountStrategy:'/alibaba/p4pStrategy/findAccountStrategy',

  /*********************p4p--策略  新增策略author：ltx**************/
  addNewStrategy:'/alibaba/p4pStrategy/addNewStrategy',

  /*********************p4p--策略  查询策略高于出价状态author：ltx**************/
  findBidStatus:'/alibaba/p4pStrategy/findBidStatus',
  /*********************p4p--策略  查询策略高于出价状态author：ltx**************/
  modifyStrategyStatus:'/alibaba/p4pStrategy/modifyStrategyStatus',
  /*********************p4p--策略  删除策略author：ltx**************/
  p4pStrategydel:'/alibaba/p4pStrategy/del/:ids',
  /*********************p4p--策略  投放时间author：ltx**************/
  findPutInArea:'/alibaba/p4pStrategy/findPutInArea',
  /*********************p4p--策略  投放时间列表author：ltx**************/
  findPutInAreaTimes:'/alibaba/p4pStrategy/findPutInAreaTimes/:dicCode',

  /*********************p4p--策略  p4p加词列表 author：ltx**************/
  findP4pKeywordsForStrategy:'/alibaba/p4pStrategy/findP4pKeywordsForStrategy',
  /*********************p4p--策略  移动策略顺序 author：ltx**************/
  moveStrategy:'/alibaba/p4pStrategy/moveStrategy',

  /*********************p4p--策略  添加全部关键词 author：ltx**************/
  selectAllKeywords:'/alibaba/p4pStrategy/selectAllKeywords',

  /*********************p4p--策略  优先策略 author：ltx**************/
  setFirstStrategy:'/alibaba/p4pStrategy/setFirstStrategy',

  /*********************p4p--策略  移除抵星词 author：ltx**************/
  removeLowerStarKeywords:'/alibaba/p4pStrategy/removeLowerStarKeywords',

  /*********************p4p--策略  加词列表接口 author：ltx**************/
  findKeywordsForStrategy:'/alibaba/p4pStrategy/findKeywordsHasAdded/:psId',

  /*********************p4p--策略  加词列表接口 author：ltx**************/
  addKeywordsToStrategy:'/alibaba/p4pStrategy/addKeywordsToStrategy',

  /*********************p4p--策略  批量修改投放时间 author：ltx**************/
  modifyPutInTime:'/alibaba/p4pStrategy/modifyPutInTime',

  /*********************p4p--策略  批量修改投放时间 author：ltx**************/
  getStrategyInfo:'/alibaba/p4pStrategy/getStrategyInfo/:psId',
  /*********************p4p--策略  所有策略 author：ltx**************/
  findAllStrategyList:'/alibaba/p4pStrategy/findAllStrategyList',

  /*********************p4p--策略  策略修改所有 author：ltx**************/
  modifyStrategyInfo:'/alibaba/p4pStrategy/modifyStrategyInfo',

  /*********************p4p--策略  移除关键词所属策略 author：ltx**************/
  delKeywordsFromStrategy:'/alibaba/p4pStrategy/delKeywordsFromStrategy',
  /*********************p4p--策略  暂停非策略词 author：ltx**************/
  stopUnStrategyKeywords:'/alibaba/p4pKeywords/stopUnStrategyKeywords',
  /*********************p4p--策略  暂停 author：zx**************/
  stopKeywords:'/alibaba/p4pKeywords/stopKeywords',


  /*********************平台分析  暂关键词分析器列表 author：ltx**************/
  bizKeywordsExtension:'/alibaba/keywordsExtension/showList',



  /*********************平台分析  产品分析器列表 author：ltx**************/
  showProductList:'/alibaba/keywordsExtension/showProductList',
  /*********************平台分析  p4p词覆盖 author：ltx**************/
  showP4pCover:'/alibaba/keywordsExtension/showP4pCover',

  /*********************平台分析  产品词覆盖 author：ltx**************/
  showProductCover:'/alibaba/keywordsExtension/showProductCover',
  /*********************平台分析  关联跟多关键词 author：ltx**************/
  showConnect:'/alibaba/keywordsExtension/showConnect',

  /*********************平台分析  关联关键词 author：ltx**************/
  cognateProduct:'/alibaba/productInfo/cognateProduct',
  /*********************平台分析  推广状态 author：ltx**************/
  updateProductStatus:'/alibaba/keywordsExtension/updateProductStatus',




  /*********************报告  查询任务 author：ltx**************/
  updateTask:'/alibaba/p4PReportData/updateTask/:keys',





  /*********************产品设置 同步 author：ltx**************/
  updateProductPromotions:'/alibaba/productPromition/updateProductPromotions',

  /*********************产品设置 同步状态 author：ltx**************/
  findUpdateStatus:'/alibaba/productPromition/findUpdateStatus',

  /*********************P4P 词库管理 author：ltx**************/
  showAddProducts:'/alibaba/p4pKeywords/showAddProducts',








  /*********************首页 author：ltx**************/
  queryTimeCycle:'/alibaba/industryPerformance/queryTimeCycle',//时间
  queryIndustry:'/alibaba/industryPerformance/queryIndustry',//行业
  queryIndustryPersformance:'alibaba/industryPerformance/queryIndustryPersformance',//曲线


  /*********************首页 author：xwy**************/
  INDEX_NOTICE:'/alibaba/bizSystemNotice/queryNotice',//获取系统通知
  INDEX_QUERYUSERTASK:'/alibaba/userTask/queryUserTask',//查询用户所有任务信息
  INDEX_ACCEPTTASK:'/alibaba/userTask/acceptTask/:xxxxx',//领取任务

  INDEX_ADDBIZINDUSTRYPK:'/alibaba/industryPk/addBizIndustryPk',//新增同行pk
  INDEX_PK:'/alibaba/industryPk/pk',//开始pk
  INDEX_QUEUEINFO:'/alibaba/industryPk/queueInfo/showList',//查询pk队列信息
  INDEX_SHOWLIST:'/alibaba/industryPk/showList',//查询PK结果
  INDEX_DEL:'/alibaba/industryPk/del/:ids',//重新选择pk
  INDEX_DELALL:'/alibaba/industryPk/resetPk',//删除pk









  /*********************同行分析 author：xwy**************/
  PREEANALYSIS_QUERYINDUSTRY:'/alibaba/industryPk/queryIndustry',//根据关键词 查询同行，创建查询队列
  PREEANALYSIS_DELQUEUEINFO:'/alibaba/industryPk/delQueueInfo/:ids',//删除同行队列
  PREEANALYSIS_QUERYPKRESULT:'/alibaba/industryPk/queryPkResult',//根据关键词查询同行详情，队列id为必传
  PREEANALYSIS_ANALYSISINDUSTRY:'/alibaba/industryPk/analysisIndustry/:id',//开始分析同行详细信息

  PREEANALYSIS_PKCOMPARISON:'/alibaba/industryPk/pkComparison',//新增 对比分析同行
  PREEANALYSIS_PKCOMPARISONRESULT:'/alibaba/industryPk/queryComparisonResult/:queueId',//查询对比分析同行的详情


  /*********************平台分析 author：xwy**************/
  PLATFORM_FINDKEYWORDSEXPOSURETOTAL:'/alibaba/analysisExposure/findKeywordsExposureTotal',//曝光-曝光量总数
  PLATFORM_NATURALCOVERDATA:'/alibaba/analysisExposure/findKeywordsNaturalCoverStatisticData',//曝光-关键词覆盖
  PLATFORM_NATURALRANKDATA:'/alibaba/analysisExposure/findKeywordsNaturalRankStatisticData',//曝光-关键词排名
  PLATFORM_FINDKEYWORDP4PEXPOSURE:'/alibaba/analysisExposure/findKeywordsP4pExposure',//曝光-p4p曝光量
  PLATFORM_FINDSTAROPTIMIZATION:'/alibaba/analysisExposure/findStarOptimization/:qsStar',//曝光-星级优化

  PLATFORM_FINDKEYWORDFORANALYSIS:'/alibaba/analysisExposure/findMyKeywordsForAnalysis',//曝光-自然-覆盖更多
  PLATFORM_FINDINDUSTRYFORANALYSIS:'/alibaba/analysisExposure/findIndustryKeywordsForAnalysis',//曝光-覆盖更多-同行
  PLATFORM_FINDKEYWORDSRANKLIST:'/alibaba/analysisExposure/findKeywordsRankList',//曝光-seo优化
  PLATFORM_FINDKEYWORDSNOTP4P:'/alibaba/analysisExposure/findKeywordsIsNotP4p',//曝光-p4p-增加覆盖
  PLATFORM_FINDKEYWORDSCOVERCURVE:'/alibaba/analysisExposure/findKeywordsCoverCurve',//平台分析-关键词覆盖曲线
  PLATFORM_FINDKEYWORDSRANKCURVE:'/alibaba/analysisExposure/findKeywordsRankCurve',//平台分析-关键词排名曲线
  PLATFORM_ADDKEYWORDSFORINDUSTRY:'/alibaba/analysisExposure/addKeywordsForIndustry',//平台分析-同行关键词添加到词库

  PLATFORM_FINDOPTIMIZERECORD:'/alibaba/optimizeRecord/findOptimizeRecord',//平台分析-分析记录



  PLATFORM_FINDMANAGERREPORTS:'/alibaba/statisticsReports/findManagerReports/:year',//数据管家


  //平台帮助接口
  queryAllDataByType:'/alibaba/dataDictionary/queryAllDataByType/:keys',//侧边栏
  bizHelpFaq:'/alibaba/bizHelpFaq/find/:id',//查标题
  findByFaqType:'/alibaba/bizHelpFaq/findByFaqType',//查内容



};


export default url;

