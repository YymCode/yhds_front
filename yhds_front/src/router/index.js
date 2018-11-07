import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'
import PeerAnalysis from '../pages/peerAnalysis'
import Keywords from '../pages/keywords'
import PlatformsAnalysis from '../pages/platformsAnalysis'
import ProductRelease from '../pages/productRelease'
import ProductManagement from '../pages/productManagement'
import DataManager from '../pages/dataManager'
import P4p from '../pages/p4p'
import erorr from '../pages/erorr'
import Help from '../pages/help'

// 关键词子路由
import Material from '../components/keywords/material'
import Backstage from '../components/keywords/backstage'
import Product from '../components/keywords/product'
import Perr from '../components/keywords/perr'
import Enroll from '../components/keywords/enroll'
import Lexicon from '../components/keywords/lexicon'
import Keywordlist from '../components/keywords/keywordlist'
import Keywordlist2 from '../components/keywords/perr_keywordlist'
import ForbiddenWord from '../components/keywords/forbiddenWord'
import RestrictedWords from '../components/keywords/restrictedWords'
//产品发布子路由
import Batch from '../components/productRelease/batch'
import Single from '../components/productRelease/single'
import PictureLibrary from '../components/productRelease/pictureLibrary '
import ReleaseTask  from '../components/productRelease/releaseTask'
import ChooseCategory  from '../components/productRelease/choose-category'
//P4P子路由
import Hot from '../components/p4p/hot.vue'
import Myp4p from '../components/p4p/myp4p.vue'
import Notepad from '../components/p4p/notepad.vue'
import Optimize from '../components/p4p/optimize.vue'
import Price from '../components/p4p/price.vue'
// import Price2 from '../components/p4p/price2.vue'
import Promote from '../components/p4p/promote.vue'
import Report from '../components/p4p/report.vue'
import Thesaurus from '../components/p4p/thesaurus.vue'
import Thenext from '../components/p4p/thenext.vue'
import Hot2 from '../components/p4p/hot2.vue'

//产品管理子路由
import ProductMan from '../components/productManagement/product'
import RecycleBin from '../components/productManagement/recycleBin'

//同行分析子路由
import PeerSituation from '../components/peerAnalysis/peerSituation'
import PeerReport from '../components/peerAnalysis/peerReport'
import BusinessAnalysis from '../components/peerAnalysis/businessAnalysis'
import PeerSituationDetail from '../components/peerAnalysis/peerSituationDetail'
import BusinessAnalysisDetail from '../components/peerAnalysis/businessAnalysisDetail'

//平台分析子路由
import Plkeywords from '../components/platform/plkeywords.vue'
import DataAnalysis from '../components/platform/dataAnalysis'
import  PlatAnalysis from '../components/platform/platAnalysis.vue'
//8.14新增品台分析路由
import  PlatReprot from '../components/platform/report.vue'


//账户登陆和设置页面
import  Setting from '../pages/setting.vue'
import  Login from '../pages/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
    },
    {
      path: '/erorr',
      name:'erorr',
      component: erorr
    },
    {
      path: '/help',
      name:'help',
      component: Help
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path:'/peerAnalysis',
      name:'peerAnalysis',
      component:PeerAnalysis,
      redirect:'peerAnalysis/businessAnalysis',
      children:[
        {
          path: 'peerSituation',
          name:'peerSituation',
          component:PeerSituation,
        },
        {
          path: 'peerSituationDetail/:ipqId',
          name:'peerSituationDetail',
          component:PeerSituationDetail,
        },
        {
          path: 'businessAnalysis',
          name:'businessAnalysis',
          component:BusinessAnalysis,
        },
        {
          path: 'businessAnalysisDetail/:target1iptId/:ipqId2/:target1WebSite',
          name:'businessAnalysisDetail',
          component:BusinessAnalysisDetail,
        },
        {
          path: 'peerReport',
          name:'peerReport',
          component:PeerReport,
        },
      ]
    },
    {
      path:'/keywords',
      name:'keywords',
      component:Keywords,
      redirect:'keywords/material',
      children: [
        {
          path: 'backstage',
          name:'backstage',
          component:Backstage,
          meta:{keepAlive: false}
        },
        {
          path: 'product',
          name:'product',
          component:Product,
          meta:{keepAlive: false}
        },
        {
          path: 'perr',
          name:'perr',
          component:Perr,
          meta:{keepAlive: false}
        },
        {
          path: 'enroll',
          name:'enroll',
          component:Enroll,
          meta:{keepAlive: false}
        },
        {
          path: 'lexicon',
          name: 'lexicon',
          component:Lexicon,
          meta:{keepAlive: false}
        },
        {
          path: 'keywordlist/:sqId',
          name:'keywordlist',
          component:Keywordlist,
          meta:{keepAlive: false}
        },
        {
          path: 'perr_keywordlist/:kwqId',
          name:'keywordlist2',
          component:Keywordlist2,
          meta:{keepAlive: false}
        },
        {
          path: 'forbiddenWord',
          name:'forbiddenWord',
          component:ForbiddenWord,
          meta:{keepAlive: false}
        },
        {
          path: 'restrictedWords',
          name: 'restrictedWords',
          component:RestrictedWords,
          meta:{keepAlive: false}
        },
				{
          path: 'material',
          name: 'material',
          component:Material,
          meta:{keepAlive: true}
        },
      ]
    },
    {
      path:'/platformsAnalysis',
      name:'platformsAnalysis',
      component:PlatformsAnalysis,
      redirect:'platformsAnalysis/report',
      children:[
        {
          path: 'dataAnalysis',
          name:'dataAnalysis',
          component:DataAnalysis,
        },
        {
          path: 'plkeywords',
          name: 'plkeywords',
          component: Plkeywords
        },
        {
          path: 'platAnalysis',
          name: 'platAnalysis',
          component: PlatAnalysis
        },
        {
          path: 'report',
          name: 'report',
          component: PlatReprot
        },
      ]
    },
    {
      path:'/productRelease',
      name:'productRelease',
      component:ProductRelease,
      redirect:'productRelease/batch',
      children: [
        {
          path: 'batch',
          name:'batch',
          component:Batch
        },
        {
          path: 'chooseCategory/:wordGroupId',
          name:'chooseCategory',
          component:ChooseCategory,
          children:[

          ]
        },
        {
          path: 'single/:categoryId/:proCategory/:proId/:temId/:wordGroupId/:aliProId',
          name:'single',
          component:Single
        },
//      {
//        path: 'single1',
//        name:'single1',
//        component:Single
//      },
        {
          path: 'pictureLibrary',
          name:'pictureLibrary',
          component:PictureLibrary
        },
        {
          path: 'releaseTask',
          name:'releaseTask',
          component:ReleaseTask
        },
        {
          path: 'recycleBin',
          name:'recycleBin',
          component:RecycleBin
        }
      ]
    },
    {
      path:'/productManagement',
      name:'productManagement',
      component:ProductManagement,
      redirect:'productManagement/productMan',
      children: [
        {
          path: 'productMan',
          name:'productMan',
          component:ProductMan
        },

      ]
    },
    {
      path:'/dataManager',
      name:'dataManager',
      component:DataManager,
    },
    {
      path:'/p4p',
      name:'p4p',
      component:P4p,
      redirect:'p4p/myp4p',
      children:[
        {
          path: 'hot',
          name:'hot',
          component:Hot
        },
        {
          path: 'myp4p',
          name:'myp4p',
          component:Myp4p
        },
        {
          path: 'notepad',
          name:'notepad',
          component:Notepad
        },
        {
          path: 'optimize',
          name:'optimize',
          component:Optimize
        },
        {
          path: 'price',
          name:'price',
          component:Price
        },
        {
          path: 'promote',
          name:'promote',
          component:Promote
        },
        {
          path: 'report',
          name:'report',
          component:Report
        },
        {
          path: 'thesaurus',
          name:'thesaurus',
          component:Thesaurus
        },
        {
          path: 'thenext',
          name:'thenext',
          component:Thenext
        },
        {
          path: 'hot2',
          name:'hot2',
          component:Hot2
        },
      ]
    }
  ]
})
