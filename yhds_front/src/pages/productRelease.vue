<template>
  <div class="content-wrap">
    <div class="slide">
      <ul class="nav">
        <li>
          <span class="tit">产品发布</span>
          <ul class="nav-item">
            <router-link class="nav-list" tag="li" to="/productRelease/batch" ><span class="iconfont icon-fabu"></span>批量产品发布</router-link>
            <router-link class="nav-list" tag="li" to="/productRelease/chooseCategory/0" ><span class="iconfont icon-fabu"></span>单个产品发布</router-link>
<!--            <router-link class="nav-list" tag="li" to="/productRelease/pictureLibrary" ><span class="iconfont icon-tupian"></span>图片库</router-link>-->
            <router-link class="nav-list" tag="li" to="/productRelease/releaseTask" ><span class="iconfont icon-web-icon-"></span>发布任务</router-link>
            <router-link class="nav-list" tag="li" to="/productRelease/recycleBin" ><span class="iconfont icon-icon--"></span>回收站</router-link>
          </ul>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>

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
	  		<video src="http://www.inncms.com/video/%E4%BA%A7%E5%93%81%E5%8F%91%E5%B8%83%20.mp4" autoplay controls style="max-width: 1000px;" ref="video">
	  			<source src="http://www.inncms.com/video/%E4%BA%A7%E5%93%81%E5%8F%91%E5%B8%83%20.mp4" type="video/mp4" autoplay controls>
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
				video:window.sessionStorage.getItem('产品发布')?false:true,
			}
		},
		watch:{
			video(){
    		if(!this.video){
    			this.$refs.video.pause()
    			window.sessionStorage.setItem('产品发布','true')
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
			if(!window.sessionStorage.getItem('产品发布')){
      	this.play()
      }
		}
  };
</script>
<style scope>

</style>
