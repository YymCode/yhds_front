<template>
    <div class="content-wrap">
      <div class="slide">
        <ul class="nav">
          <li>
            <span class="tit">同行分析</span>
            <ul class="nav-item">
              <!--<router-link class="nav-list" tag="li" to="/peerAnalysis/peerSituation" ><span class="iconfont icon-chaxun " style="font-size: 20px"></span>同行情况查询</router-link>-->
              <router-link class="nav-list" tag="li" to="/peerAnalysis/businessAnalysis" ><span class="iconfont icon-qushi-copy" style="font-size: 16px"></span>企业效果简析</router-link>
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
