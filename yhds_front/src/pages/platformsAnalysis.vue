<template>
  <div class="content-wrap">
    <div class="slide">
      <ul class="nav">
        <li>
          <span class="tit">平台分析</span>
          <ul class="nav-item">
            <!--<router-link class="nav-list" tag="li" to="/platformsAnalysis/dataAnalysis" ><span class="iconfont icon-shuju"></span>数据分析</router-link>-->
            <router-link class="nav-list" tag="li" to="/platformsAnalysis/report" ><span class="iconfont icon-pingtaiyingyong"></span>平台诊断报告</router-link>
            <router-link class="nav-list" tag="li" to="/platformsAnalysis/platAnalysis" ><span class="iconfont icon-chanpin"></span>产品优化分析器</router-link>
            <router-link class="nav-list" tag="li" to="/platformsAnalysis/plkeywords" ><span class="iconfont icon-guanjianci1"></span>关键词优化分析器</router-link>
          </ul>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <!--<div class="video-icon">
    	<img src="../common/images/video.png" width="40" />
    </div>-->
  </div>
</template>
<script>
  export default {
    data(){
      return {
        editor:null
      }
    },
    mounted(){

    },
  };
</script>
<style scope>

</style>
