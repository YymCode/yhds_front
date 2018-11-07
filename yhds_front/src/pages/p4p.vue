<template>
  <div class="content-wrap">
    <div class="slide">
      <ul class="nav">
        <li>
          <span class="tit">P4P</span>
          <ul class="nav-item">
            <router-link class="nav-list" tag="li" to="/p4p/myp4p" ><span class="iconfont icon-zhitongche"></span>我的P4P</router-link>
            <router-link class="nav-list" tag="li" to="/p4p/thesaurus" ><span class="iconfont icon-cikuyouhua"></span>词库管理</router-link>
            <router-link class="nav-list" tag="li" to="/p4p/price" ><span class="iconfont icon-strategy"></span>出价策略</router-link>
            <router-link class="nav-list" tag="li" to="/p4p/promote" ><span class="iconfont icon-shezhi"></span>推广产品设置</router-link>
            <router-link class="nav-list" tag="li" to="/p4p/report" ><span class="iconfont icon-baogao"></span>报告</router-link>
            <router-link class="nav-list" tag="li" to="/p4p/hot" ><span class="iconfont icon-baokuan"></span>爆款打造</router-link>
            <router-link class="nav-list" tag="li" to="/p4p/optimize" ><span class="iconfont icon-favorite"></span>优化星级</router-link>
            <router-link class="nav-list" tag="li" to="/p4p/notepad" ><span class="iconfont icon-rizhi1"></span>日志</router-link>
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
	  		<video src="http://www.inncms.com/video/007P4P(%E6%9C%80%E6%96%B0).mp4" autoplay controls style="max-width: 1000px;" ref="video">
	  			<source src="http://www.inncms.com/video/007P4P(%E6%9C%80%E6%96%B0).mp4" type="video/mp4" autoplay controls>
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
					video:window.sessionStorage.getItem('p4p')?false:true,
				}
			},
			watch:{
				video(){
	    		if(!this.video){
	    			this.$refs.video.pause()
	    			window.sessionStorage.setItem('p4p','true')
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
var str = "https://sourcing.en.alibaba.com/?spm=a2700.details.cordpanyb.1.59b23409aAgprH";
console.log(str.substr(0,(str.indexOf('com')+3)))
				if(!window.sessionStorage.getItem('p4p')){
	      	this.play()
	      }
			}
    };
</script>
<style scope>

</style>
