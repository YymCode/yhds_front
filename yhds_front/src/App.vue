<template>
  <div id="app" @click="$route.name!='setting'&&$route.name!='login'?pofixedHidden():''">
    <m-header v-if="$route.name!='setting'&&$route.name!='login'"></m-header>
    <router-view/>

    <div class="pofixed" @click.stop="pofixed()" v-if="$route.name!=='login'&&$route.name!=='setting'">
      <!--<a href="tencent://message/?uin=843130867">打开</a>-->
      联 <br>
      系<br>
      客<br>
      服

      <div class="pofixed_show" ref="pofixed_show">
        <p>联系客服</p>

        <p>
          联系电话：<span>0731-89722416</span>
        </p>
        <p>
          企业邮箱：<span><a href="mailto:services@sonnynet.com">services@sonnynet.com</a></span>
        </p>
        <p>
           客服QQ：<span><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2950802618&site=qq&menu=yes">客服1</a></span>
          <span><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2638591786&site=qq&menu=yes">客服2</a></span>
          <span><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3061872178&site=qq&menu=yes">客服3</a></span>
        </p>

        <p>
          <router-link  tag="span" to="/help"> 帮助 </router-link>
        </p>
      </div>
    </div>
    

  </div>
</template>

<script>
import MHeader from './components/header.vue'
export default {
  name: 'app',
  components:{
    MHeader
  },
  methods:{
  	pofixed(){
  		this.$refs.pofixed_show.style.width='280px'
  		this.$refs.pofixed_show.style.height='260px'
  		this.$refs.pofixed_show.style.opacity='1'
  	},
  	pofixedHidden(){
  		this.$refs.pofixed_show.style.width='0'
  		this.$refs.pofixed_show.style.height='0'
  		this.$refs.pofixed_show.style.opacity='0'
  	}
  },
  mounted(){
//		if(document.cookie.indexOf('token')==-1){
//			this.$Notice.warning({
//				title:'请先登陆您的账号'
//			})
//			this.$router.replace('/login')
//		}
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.pofixed{
  text-align: center;
  position: fixed;
  right:-1px;
  top:150px;
  width: 40px;
  line-height: 30px;
  background: #ffffff;
  z-index: 10000;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  box-shadow: 0px 1px 10px #666;
  font-weight: 700;
}
/*.pofixed:hover .pofixed_show{
  display: block;
  width:280px;
  height: 260px;
  opacity: 1;
}*/
.pofixed_show{
  -webkit-transition: all .5s linear;
  -moz-transition: all .5s linear;
  -o-transition: all .5s linear;
  transition: all .5s linear;
  position: fixed;
  right: 0;
  top:14%;
  width: 0;
  height: 0;
  opacity: 0;
  border: 2px solid #DDDDDD;
  z-index: 10010;
  background:#ffffff;
  /*display: none;*/
  padding:20px 30px;
  overflow: hidden;
}
.pofixed_show>p:first-child{
  font-size: 16px;
  font-weight: 700;
}
.pofixed_show>p:nth-child(2),.pofixed_show>p:nth-child(4),.pofixed_show>p:nth-child(3){
  text-align: left;
  padding: 10px 0;
}
.pofixed_show>p:nth-child(2) span,.pofixed_show>p:nth-child(4) span,.pofixed_show>p:nth-child(3) span{
  font-weight: 700;
  margin-left: 6px;
  margin-right: 6px;
}

.pofixed_show>p:last-child{
  text-align: right;
  padding: 10px 0;
}
.pofixed_show>p:last-child span{
  color: #2d8cf0;
  cursor: pointer;
}
.ivu-form-item-content{
  position: static;
}
</style>
