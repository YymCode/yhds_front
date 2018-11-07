<template>
  <div class="header">

    <div class="">
      <div class="left">
        <div class="header-left">
          <div class="logo">
            <img src="../common/images/LOGO.jpg" style="width: 100%; height: 100%;">
          </div>
          <!--<img src="images/log.png" width="170" height="60" class="fl" />-->
          <div class="color1 f_14">
            <div class="item">
              <span>{{loginnum}}</span>
              <span>登录次数</span>
            </div>
            <!--<div class="item">-->
              <!--<span>{{optimizenum}}</span>-->
              <!--<span>优化次数</span>-->
            <!--</div>-->

          </div>
          <div>
          	<span class="iconfont icon-shezhi" style="cursor: pointer;" @click="$router.push({name:'setting'})"></span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header-right f_16">
          <ul class="nav">
            <router-link tag="li" to="/index">首页</router-link>
            <router-link tag="li" to="/peerAnalysis">同行分析</router-link>
            <router-link tag="li" to="/keywords">素材库</router-link>
            <router-link tag="li" to="/platformsAnalysis">平台分析</router-link>
            <router-link tag="li" to="/productRelease">产品发布</router-link>
            <router-link tag="li" to="/productManagement">产品管理</router-link>
            <router-link tag="li" to="/p4p">P4P</router-link>
            <!--<router-link tag="li" to="/dataManager">数据管家</router-link>-->
            <li>
              <Button type="primary" @click="btnlick()">
                <span class="userid">{{uname}}</span><br>
                <span>退出登录</span>
              </Button>

            </li>
          </ul>
        </div>
      </div>


      <Modal
        v-model="modal"
        title="请完善信息"
        :styles="{top: '60px'}"
        :closable="false"
        :mask-closable="false"
        >
       <div>
         <Form  ref="formLeft" :model="formLeft" :rules="ruleInline"  label-position="left" :label-width="100">
           <FormItem label="公司名称" prop="input1">
             <Input v-model="formLeft.input1"  placeholder="请填写公司名称"></Input>
           </FormItem>
           <FormItem label="QQ">
             <Input v-model="formLeft.input2"  placeholder="请填写QQ"></Input>
           </FormItem>
           <FormItem label="邮箱">
             <Input v-model="formLeft.input3" placeholder="请填写邮箱"></Input>
           </FormItem>
           <FormItem label="电话"  prop="input4">
             <Input v-model="formLeft.input4" placeholder="请填写联系电话"></Input>
           </FormItem>
           <FormItem label="联系人">
             <Input v-model="formLeft.input5" placeholder="请填写联系人"></Input>
           </FormItem>
           <FormItem label="旺铺地址"  prop="input6">
             <Input v-model="formLeft.input6" placeholder="请填写旺铺地址"></Input>
           </FormItem>

           <FormItem style="text-align: center">
             <Button type="primary" @click="handleSubmit('formLeft')">确定</Button>
           </FormItem>
         </Form>
       </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                var reg=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
              if (!reg.test(value)) {
                callback(new Error('Please enter your password'));
              } else {
                callback();
              }
            };
            return {
              formLeft: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: ''
              },
              ruleInline: {
                input1: [
                  { required: true, message: '请填写公司名称', trigger: 'blur' }
                ],
                input4: [
                  { validator:validatePass,required: true, message: '请填写正确电话号码', trigger: 'blur' },
                ],
                input6: [
                  { required: true, message: '请填写旺铺地址', trigger: 'blur' },
                ]
              },
              uname:"",
              optimizenum:"",
              loginnum:"",
              modal:false
            };
        },
        mounted() {
            this.init()
        },
        methods:{
            btnlick(){
            	this.$http('alibabaLogin/loginOut').then(res =>{
            		this.$router.replace('/login')
            	})
//            window.location.href="https://www.alibaba.com/";
            },
            init(){
              this.api.username.find().then((res)=>{
                if(res.data.status=="200"){
                    this.loginnum=res.data.mapInfo.loginTimes;
                    this.uname=res.data.mapInfo.userName;
                    this.optimizenum=res.data.mapInfo.yhTimes;
                   console.log(res.data.mapInfo.hasStoreInfo);
                   if(!res.data.mapInfo.hasStoreInfo){
                       this.modal=true;
                   }

                }
              })
            },
            handleSubmit(name){
              this.$refs[name].validate((valid) => {
                if (valid) {
                  this.api.toreInfo.find({reqData:{siCompanyNameZh:this.formLeft.input1,siQq:this.formLeft.input2,siEmail:this.formLeft.input3,siTel:this.formLeft.input4,siWebsite:this.formLeft.input6,siLinkMan:this.formLeft.input5,}}).then((res)=>{
                    if(res.data.status=="200"){
                      this.$Notice.success({
                        title: '编写成功',
                      });
                      this.modal=false;
                    }
                  })
                } else {
                  this.$Notice.warning({
                    title: '请完善信息',
                  });
                }
              })
            }
        },
    };
</script>

<style scoped>
  .nav>li{
    cursor: pointer;
  }
  .userid{
    display: inline-block;
    max-width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .header{
    overflow: hidden;
    padding-right: 25px;
    box-shadow: 0px 2px 5px #e1e2e2;
    position: fixed;
    z-index:1000;
    background: #ffffff;
    width: 100%;
  }
  .header .left{
    width: 30%;
    float: left;
  }
  .header .right{
    width: 57%;
    float: right;
  }
  .header .header-left{
    -js-display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .header .header-left .logo{
    -webkit-box-flex: 0 0 200px;
    -moz-box-flex: 0 0 200px;
    -webkit-flex: 0 0 200px;
    -ms-flex:0 0 200px;
    flex: 0 0 200px;
    height: 60px;
    width: 200px;
    background: #019bfd;
    line-height: 60px;
    text-align: center;
    color: #FFFFFF;
    font-size: 24px;
  }
  .header .header-left .logo span{
    margin: 0 auto;
  }
  .header .header-left>div{
    -js-display: flex;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -moz-align-items: center;
    -webkit-align-items: center;
    -ms-align-items: center;
    align-items: center;
  }
  .header .item{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 14px;
    /*text-align: center;*/
    /*border-right: 1px solid #DDDDDD;*/
  }
  .header .item span{
    display: block;
    color: #7d7d7d;
  }
  .header .item span:nth-of-type(1){
    font-size: 15px;
  }
  .header .nav{
    -js-display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .header .nav li{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    line-height: 60px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #7994ae;
    font-size: 16px;
  }

  .router-link-active{
    background: -moz-linear-gradient(top, #0078f2 0%, #01a1ff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0078f2), color-stop(100%,#01a1ff));
    background: -webkit-linear-gradient(top, #0078f2 0%,#01a1ff 100%);
    background: -o-linear-gradient(top, #0078f2 0%,#01a1ff 100%);
    background: -ms-linear-gradient(top, #0078f2 0%,#01a1ff 100%);
    background: linear-gradient(to bottom, #0078f2 0%,#01a1ff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0078f2', endColorstr='#01a1ff',GradientType=0 );
    color: #FFFFFF!important;
  }
  @media screen and (min-width: 1920px) {
    .header .header-left .logo{
      -webkit-box-flex: 0 0 240px;
      -moz-box-flex: 0 0 240px;
      -webkit-flex: 0 0 240px;
      -ms-flex:0 0 240px;
      flex: 0 0 240px;
      width: 240px;
      height: 80px;
    }
    .header .nav li{
      line-height: 80px;
    }
  }
</style>
