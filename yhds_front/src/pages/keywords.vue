<template>
  <div class="content-wrap">
    <div class="slide">
      <ul class="nav">
        <li>
        	<span class="tit">产品素材库</span>
          <ul class="nav-item">
            <router-link class="nav-list" tag="li" to="/keywords/material" ><span class="iconfont icon-chanpin-copy"></span>我的素材</router-link>
          </ul>
          <span class="tit">采集关键词</span>
          <ul class="nav-item">
            <router-link class="nav-list" tag="li" to="/keywords/backstage" ><span class="iconfont icon-chanpin-copy"></span>后台关键词</router-link>
            <router-link class="nav-list" tag="li" to="/keywords/perr" ><span class="iconfont icon-chanpin-copy"></span>同行关键词</router-link>
            <router-link class="nav-list" tag="li" to="/keywords/product" ><span class="iconfont icon-chanpin-copy"></span>产品关键词</router-link>
            <router-link class="nav-list" tag="li" to="/keywords/enroll" ><span class="iconfont icon-daoru"></span>手动导入关键词</router-link>
          </ul>
        </li>
        <li>
          <span class="tit">违禁限售词库</span>
          <ul class="nav-item">
            <!--<router-link class="nav-list" tag="li" to="/keywords/lexicon"><span class="iconfont icon-cikuyouhua"></span>词库管理</router-link>-->
            <router-link class="nav-list" tag="li" to="/keywords/forbiddenWord"><span class="iconfont icon-cikuyouhua"></span>我的违禁词</router-link>
            <router-link class="nav-list" tag="li" to="/keywords/restrictedWords"><span class="iconfont icon-cikuyouhua"></span>品牌限售词</router-link>
          </ul>
        </li>
      </ul>
    </div>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>

    </div>
    <div class="video-icon" @click="play">
    	视<br>
      频<br>
      教<br>
      程
    </div>
    <Modal
	  	v-model="video"
	  	class-name="vertical-center-modal video"
	  	@on-ok=""
	  	title=" "
	  	width="1032"
	  >
	  	<div>
	  		<video src="http://www.inncms.com/video/%E7%B4%A0%E6%9D%90%E5%BA%93.mp4" autoplay controls style="max-width: 1000px;" ref="video">
	  			<source src="http://www.inncms.com/video/%E7%B4%A0%E6%9D%90%E5%BA%93.mp4" type="video/mp4" autoplay controls>
	  		</video>
	  	</div>
	  	<div slot="footer"></div>
	  </Modal>
  </div>
</template>
<script>
  export default {
		data(){
			return {
				video:window.sessionStorage.getItem('素材库')?false:true,
			}
		},
		watch:{
			video(){
    		if(!this.video){
    			this.$refs.video.pause()
    			window.sessionStorage.setItem('素材库','true')
    		}
    	}
		},
		methods:{
			play(){
				this.video=true
				this.$refs.video.play()
			}
		},
		mounted(){
			if(!window.sessionStorage.getItem('素材库')){
      	this.play()
      }
		}
  };
</script>
<style scope>

</style>
