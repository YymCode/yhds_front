<template>
  <div class="content-wrap">
    <div class="slide">
      <ul class="nav">
        <li>
          <span class="tit">产品管理</span>
          <ul class="nav-item">
            <router-link class="nav-list" tag="li" to="/productManagement/productMan" ><span class="iconfont icon-product"></span>产品管理</router-link>

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

  };
</script>
<style scope>

</style>
