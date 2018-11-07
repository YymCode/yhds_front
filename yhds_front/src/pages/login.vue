<template>
	<div class="login-bg">
		<div class="text-center">
			<h1>优化大师账号登陆</h1>
			<div class="form">
				<div class="mb_20 login-row">
					<div class="iconfont icon-yonghu input-icon fl" style="font-size: 36px;"></div>
					<input v-model="name" type="text" class="fl" placeholder="请输入账号" @keydown.enter="login" />
				</div>
				<div class="mb_20 login-row">
					<div class="iconfont icon-mima input-icon fl" style="font-size: 36px;"></div>
					<input v-model="password" type="password" class="fl" placeholder="请输入密码（不是阿里的密码）" @keydown.enter="login" />
				</div>
			</div>
			<div class="btn" @click="login">确认</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			name:'',
			password:'',
		}
	},
	methods:{
		login(){
			if(this.name!=''&&this.password!=''){
				this.$http('common/userLogin/login',{name:this.name,password:this.password}).then((res)=>{
					if(res.info!=0){
						this.$Notice.info({
							title:'登陆成功'
						})
						if(this.password=='123456'){
							this.$Notice.warning({
								title:'您的密码过于简单，建议您修改初始密码'
							})
							this.$router.replace('/setting')
						}else{
							this.$router.replace('/')
						}
					}else{
						this.$Notice.warning({
							title:'登陆失败，账号或密码错误'
						})
					}
				})
			}else{
				this.$Notice.warning({
					title:'请输入账号或者密码'
				})
			}
		}
	}
}
</script>

<style scoped="scoped">
	h1{
		font-weight: normal;
		font-size: 3.5em;
		letter-spacing: 2px;
		padding: 0 20px;
		margin-bottom: 50px;
	}
	.form{
		background: rgba(0,0,0,0.3);
		border-radius: 10px;
		padding: 25px 15px;
		margin-bottom: 50px;
	}
	.login-row{
		height: 36px;
		line-height: 36px;
	}
	.input-icon{
		width: 15%;
		margin-right: 10%;
	}
	input{
		width: 75%;
		height: 100%;
		line-height: 1;
		display: block;
		background: transparent;
		border: none;
		border-bottom: 1px solid #fff;
		outline: none;
		color: #fff;
		font-size: 16px;
	}
	input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	    color:    #fff;
	    font-size: 12px;
	}
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	   color:    #fff;
	   font-size: 12px;
	}
	input::-moz-placeholder { /* Mozilla Firefox 19+ */
	   color:    #fff;
	   font-size: 12px;
	}
	input:-ms-input-placeholder { /* Internet Explorer 10-11 */
	   color:    #fff;
	   font-size: 12px;
	}
	.btn{
		background: rgba(0,0,0,0.3);
		border-radius: 10px;
		text-align: center;
		padding: 10px;
		font-size: 18px;
		cursor: pointer;
	}
</style>