<template>
	<div class="login-bg">
		<div class="text-center">
			<h1>优化大师账号设置</h1>
			<div class="form">
				<div class="mb_20 login-row">
					<div class="iconfont icon-mima input-icon fl" style="font-size: 36px;"></div>
					<input v-model="password" type="password" class="fl" placeholder="请设置优化大师的密码（不是阿里的密码）" @keydown.enter="setting" />
				</div>
				<div class="login-row">
					<div class="iconfont icon-mima input-icon fl" style="font-size: 36px;"></div>
					<input v-model="password2" type="password" class="fl" placeholder="请确认密码" @keydown.enter="setting" />
				</div>
			</div>
			<div class="btn" @click="setting">确认</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			password:'',
			password2:'',
		}
	},
	methods:{
		setting(){
			if(this.password!=''&&this.password2!=''){
				if(this.password==this.password2){
					this.$http('common/userLogin/updatePassWord',{password:this.password}).then((res)=>{
						if(res.info==1){
							this.$Notice.info({
								title:'设置成功'
							})
							this.$router.replace('/')
						}else{
							this.$Notice.warning({
								title:'未知的错误，请稍后再试 或联系客服'
							})
						}
					})
				}else{
					this.$Notice.warning({
						title:'两次密码输入不一致，请重新输入'
					})
				}
			}else{
				this.$Notice.warning({
					title:'请输入密码'
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