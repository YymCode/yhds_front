<template>
  <div class="content-wrap">
    <div class="help_class">
      <div class="slide_help">
        <Menu :theme="theme2"  style="width: 100%">
          <Submenu :name="index" v-for="(item,index) in titleData">
            <template slot="title">
              {{item.dicName}}
            </template>
            <MenuItem :name="index+'-'+i" v-for="(val,i) in item.children" @click.native="queryContent(val.dicId)">{{val.dicName}}</MenuItem>
          </Submenu>

        </Menu>
      </div>

      <div class="content_help" v-if="show">
        <ul>
          <li v-for="(item,index) in articleData" @click="text(item.faqContent)">{{item.faqTitle}}</li>
        </ul>
      </div>

      <div class="content_text" v-else>
        <p @click="show=true"> << 返回上级 </p>
        <div v-html="htmlText">

        </div>
      </div>
    </div>

    <!--<Modal-->
      <!--title="批量编辑产品图片"-->
      <!--v-model="editImageData"-->
      <!--width="780"-->
      <!--:styles="{top: '60px'}">-->

      <!--<div>-->

        <!--<div>-->
          <!--<p class="img_serial">-->
            <!--<span>序号</span>-->
            <!--<span>产品名称</span>-->
            <!--<span>图片修改前</span>-->
            <!--<span>图片修改后</span>-->
          <!--</p>-->

          <!--<ul class="img_ul">-->
            <!--<li v-for="(item,index) in datalist">-->
              <!--<span>{{index+1}}</span>-->
              <!--<span>{{item.subject}}</span>-->
              <!--<CheckboxGroup v-model="fruit_order" style="margin-right: 15px" @on-change="imageGroupChange">-->
                <!--<Checkbox :label="index+'.'+0">-->
                  <!--<img :src="item.images[0].imageUrl" v-if="item.images[0]">-->
                  <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--</Checkbox>-->

                <!--<Checkbox :label="index+'.'+1">-->
                  <!--<img :src="item.images[1].imageUrl"  v-if="item.images[1]">-->
                  <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--</Checkbox>-->

                <!--<Checkbox :label="index+'.'+2">-->
                  <!--<img :src="item.images[2].imageUrl"  v-if="item.images[2]">-->
                  <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--</Checkbox>-->

                <!--<Checkbox :label="index+'.'+3">-->
                  <!--<img :src="item.images[3].imageUrl"  v-if="item.images[3]">-->
                  <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--</Checkbox>-->
                <!--<Checkbox :label="index+'.'+4">-->
                  <!--<img :src="item.images[4].imageUrl"  v-if="item.images[4]">-->
                  <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--</Checkbox>-->
                <!--<Checkbox :label="index+'.'+5">-->
                  <!--<img :src="item.images[5].imageUrl"  v-if="item.images[5]">-->
                  <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--</Checkbox>-->
              <!--</CheckboxGroup>-->

              <!--<div class="imgarr">-->
                <!--<img :src="imglist[index].images[0].imageUrl" v-if="imglist[index].images[0]">-->
                <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--<img :src="imglist[index].images[1].imageUrl" v-if="imglist[index].images[1]">-->
                <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--<img :src="imglist[index].images[2].imageUrl" v-if="imglist[index].images[2]">-->
                <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--<img :src="imglist[index].images[3].imageUrl" v-if="imglist[index].images[3]">-->
                <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--<img :src="imglist[index].images[4].imageUrl" v-if="imglist[index].images[4]">-->
                <!--<img  src="../common/images/bg_img.png" v-else>-->
                <!--<img :src="imglist[index].images[5].imageUrl" v-if="imglist[index].images[5]">-->
                <!--<img  src="../common/images/bg_img.png" v-else>-->
              <!--</div>-->

            <!--</li>-->

          <!--</ul>-->
        <!--</div>-->
        <!--<p style="padding: 5px 0;display: flex;justify-content: space-between">-->
          <!--<Button type="primary" shape="circle" @click="replaceImg">替换</Button>-->
          <!--<Button type="warning" shape="circle" @click="removeImg">删除</Button>-->
        <!--</p>-->

        <!--<div style="padding-top: 15px;border: 1px solid #DDDDDD">-->
          <!--<div class="img_body">-->
            <!--<p>-->
              <!--<Upload-->
                <!--:show-upload-list="false"-->
                <!--multiple-->
                <!--:action="aurl+'/alibaba/imageUpload/doFileUpload'"-->
                <!--accept="image/png,image/jpeg,image/jpg"-->
                <!--:max-size="5120"-->
                <!--multiple-->
                <!--:on-success="handleSuccess"-->
                <!--:on-error="handleError"-->
                <!--style="display: inline-block"-->
               <!--&gt;-->
                <!--<Button type="primary" shape="circle">添加图片</Button>-->
              <!--</Upload>-->




              <!--<span @click="library">从图片库选取</span>-->
              <!--<span @click="bank">从图片银行选取</span>-->
            <!--</p>-->
            <!--<p>-->
              <!--<RadioGroup v-model="animal_order">-->
                <!--<Radio label="顺序使用"></Radio>-->
                <!--<Radio label="随机使用"></Radio>-->
              <!--</RadioGroup>-->
            <!--</p>-->
          <!--</div>-->

          <!--<div class="img_tiele">-->
            <!--<p>-->
              <!--<span>序号</span>-->
              <!--<span>图片</span>-->
              <!--<span>操作</span>-->
            <!--</p>-->

            <!--<ul>-->
              <!--<li v-for="(item,index) in imgAll">-->
                <!--<span>{{index+1}}</span>-->
                <!--<span><img :src="item" ></span>-->
                <!--<span>-->

                  <!--<b @click="word_upRecord(index)">-->
                    <!--<Icon type="ios-arrow-thin-up"></Icon>-->
                  <!--</b>-->
                  <!--<b @click="word_downRecord(index)">-->
                    <!--<Icon type="ios-arrow-thin-down"></Icon>-->
                  <!--</b>-->

                <!--</span>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->


      <!--<div slot="footer">-->
        <!--<Button type="primary" shape="circle" @click="ImgAgain">重来</Button>-->
        <!--<Button type="primary" shape="circle" @click="ModifyImgOk">确定</Button>-->
        <!--<Button type="warning" shape="circle" @click="CancelImg">取消</Button>-->
      <!--</div>-->
    <!--</Modal>-->

    <!--<b-images ref="child" @imgBank="acceptBank"></b-images>-->
    <!--<l-images ref="child2" @imgLib="accept"></l-images>-->

  </div>
</template>

<script>
  import BImages from "../components/imageVue/imageBank.vue"
  import LImages from "../components/imageVue/imageLibrary.vue"

    export default {
      components:{
          BImages,
          LImages,
      },
      data () {
        return {
          show:true,
          theme2: 'light',
          titleData:[],

          articleId:"",
          articleData:[],
          htmlText:"",

//          编辑图片

//          aurl:process.env.API_ROOT,
//
//
//          editImageData:false,
//          animal_order:"顺序使用",
//          fruit_order:[],
//
//          imglist:[],
//          datalist:[],
//
//          imgAll:[],

        }
      },
      mounted(){

        this.init();
        this.queryContent();

      },
      methods: {
       init(){
         this.api.queryAllDataByTypeData.list({params:["helpType"]}).then((res)=>{
           if(res.data.status=="200"){
             console.log(res.data.rows);
             this.titleData=res.data.rows
           }
         })
       },
       queryTitle(){
         this.api.bizHelpFaqData.list({params:[]}).then((res)=>{
           if(res.data.status=="200"){
             console.log(res.data.rows);

           }
         })
       },
       queryContent(id){
          if(id){
            this.articleId=id
          }else {
            this.articleId=""
          }
         this.api.findByFaqTypeData.data({reqData:{faqType:this.articleId}}).then((res)=>{
           if(res.data.status=="200"){
             console.log(res.data.rows);
             this.articleData=res.data.rows;
             this.show=true
           }
         })
       },
       text(cont){
        this.show=false;
        this.htmlText=cont;
        },

//
////      接受图片库子组件参数
//        library(){
////          console.log(this.$refs.child);
//          this.$refs.child2.MsgLibrary();
//        },
//
//        accept(msg){
//          console.log(msg);
//          for(var i=0;i<msg.length;i++){
//              this.imgAll.push(msg[i])
//          }
//        },
////      接受图片银行子组件参数
//        bank(){
//          this.$refs.child.msgBank();
//        },
//
//        acceptBank(msg){
//          console.log(msg);
//          for(var i=0;i<msg.length;i++){
//            this.imgAll.push(msg[i])
//          }
//        },
//
//
//        imageGroupChange(name){
//        	console.log(this.fruit_order);
//          this.fruit_order=this.fruit_order.sort(function(a,b){return a-b})
//        },
//
////        替换图片
//        replaceImg(){
//
//          if(this.imgAll.length>0){
//            //          顺序使用
//            if(this.animal_order=="随机使用"){
//
//              for(var i=0;i<this.fruit_order.length;i++){
//                var randomNum=Math.floor((Math.random()*this.imgAll.length));
//                var arrindex=this.fruit_order[i].split(".")[0];
//                var childindex=this.fruit_order[i].split(".")[1];
//                console.log(222)
//                if(!this.imglist[arrindex].images[childindex]) {//判断选中图片是否存在，不存新建图片存在直接替换
//                  var obj= {
//                    imageId:"",//图片库ID
//                    imageUrl:this.imgAll[randomNum],
//                    imageSequnce:""  //-----图片排序(1:主图)
//                  };
//                  this.imglist[arrindex].images.push(obj);
//                }else {
//                  this.imglist[arrindex].images[childindex].imageUrl=this.imgAll[randomNum];
//                }
//
//                console.log(this.imglist)
//              }
//            }else {
//              var index=0;
//              for(var i=0;i<this.fruit_order.length;i++){
//                var arrindex=this.fruit_order[i].split(".")[0];
//                var childindex=this.fruit_order[i].split(".")[1];
//                if(this.imgAll[index]){
//
//                  if(!this.imglist[arrindex].images[childindex]){//判断选中图片是否存在，不存新建图片存在直接替换
//                    var obj= {
//                      imageId:"",//图片库ID
//                      imageUrl:this.imgAll[index],
//                      imageSequnce:""  //-----图片排序(1:主图)
//                    };
//                    this.imglist[arrindex].images.push(obj);
//                  }else {
//                    this.imglist[arrindex].images[childindex].imageUrl=this.imgAll[index];
//                  }
//                  index++
//                }else {
//                  index=0;
//
//                  if(!this.imglist[arrindex].images[childindex]){//判断选中图片是否存在，不存新建图片存在直接替换
//                    var obj= {
//                      imageId:"",//图片库ID
//                      imageUrl:this.imgAll[index],
//                      imageSequnce:""  //-----图片排序(1:主图)
//                    };
//                    this.imglist[arrindex].images.push(obj);
//                  }else {
//                    this.imglist[arrindex].images[childindex].imageUrl=this.imgAll[index];
//                  }
//
//                  index++;
//                }
//              }
//            }
//          }else {
//            this.$Notice.warning({
//              title: '请添加图片',
//            });
//          }
//
//
//
//        },
//
////        删除图片
//        removeImg(){
//          for(var i=0;i<this.fruit_order.length;i++){
//            var arrindex=this.fruit_order[i].split(".")[0];
//            var childindex=this.fruit_order[i].split(".")[1];
//            this.imglist[arrindex].images.splice(childindex,1);
//            this.imglist[arrindex].images[childindex]="";
//          }
//
//          console.log(this.imglist);
//
//          for(var i=0;i<this.imglist.length;i++){
//              for(var t=0;t<this.imglist[i].images.length;t++){
//                  if(this.imglist[i].images[t]==""){
//                    this.imglist[i].images.splice(t,1);
//                    t=t-1;
//                  }
//              }
//          }
//        },
//
////         上下移
//        word_swapItems(index,index2){
//          this.imgAll[index] = this.imgAll.splice(index2, 1, this.imgAll[index])[0];
//
//          console.log(this.imgAll);
//        },
//        word_upRecord($index){
//          console.log(1)
//          if($index == 0) {
//            return;
//          }
//          this.word_swapItems($index, $index - 1);
//
//        },
//        word_downRecord($index){
//          console.log(2)
//          if($index == this.imgAll.length -1) {
//            return;
//          }
//          this.word_swapItems($index, $index + 1);
//        },
////        图片上传
//        handleSuccess(res,file){
//          if(res.status=="200"){
//          this.imgAll.push(res.rows[1]);
//          }else {
//            this.$Notice.success({
//              title: res.info,
//              desc:"错误代码"+res.MDC
//            });
//          }
//        },
//        handleError(error,file){
//          this.$Notice.error({
//            title: file.name+'上传失败',
//          });
//        },
////        重来
//        ImgAgain(){
//          this.imgAll=[];
//          this.fruit_order=[];
//          var ImgData=JSON.parse(JSON.stringify(this.datalist));//深拷贝数组
//          console.log(ImgData);
//          this.imglist=ImgData;
//
//
//        },
//        ModifyImgOk(){
//          this.editImageData=false;
//        },
//        CancelImg(){
//          this.editImageData=false;
//        },
      }
    }
</script>
<style scoped>
  .help_class{
    margin:0 auto;
    width: 1200px;
    height:97%;
    padding-top:2%;
    padding-bottom: 1%;
    background: #f0f0f0;
  }
  .slide_help{
    width: 260px;
    margin-right: 20px;
    height:100%;
    overflow: auto;
    background: #ffffff;
  }
  .help_class>div{
    float: left;
  }

  .content_help,.content_text{
    width:920px;
    height:100%;
    padding:30px;
    background: #ffffff;
    overflow: auto;
  }
  .content_help>ul>li{
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    color: #2d8cf0;
    cursor: pointer;
    font-size: 14px;
  }
  .content_text>p{
    color:#2d8cf0;
    cursor: pointer;
    line-height: 40px;
  }



  /*图片*/
  .img_serial{
    height: 40px;
    line-height: 40px;
    background: #ebf0f5;
  }
  .img_serial>span{
    display: inline-block;
    text-align: center;
  }
  .img_serial>span:first-child{
    width:6%;
  }
  .img_serial>span:nth-child(2){
    width:18%;
  }
  .img_serial>span:nth-child(3){
    width:37%;
  }
  .img_serial>span:nth-child(4){
    width:37%;
  }



  .img_ul{
    height: 210px;
    overflow: auto;
  }

  .img_ul li{
    width: 830px;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #DDDDDD;
  }
  .img_ul li>span{
    display: inline-block;
    text-align: center;
  }
  .img_ul li>span:first-child{
    width: 44.5px;
  }

  .img_ul li>span:nth-child(2){
    width: 134.5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .img_ul li>div{
    display: inline-block;
    height: 70px;
    line-height: 70px;
    vertical-align: middle;
    width:310px;
    padding-top: 13px;
  }
  .img_ul li>div>label{
    width: 45px;
    height: 45px;
    margin-right:2px;
    border: 1px solid #DDDDDD;
    text-align: right;
  }
  .img_ul li>div>label img{
    width:100%;
    height:100%;
    margin-left: -45px;
  }

  .imgarr{
    display: inline-block;
    height: 70px;
    line-height: 70px;
    vertical-align: middle;
    width:310px;
    padding-top: 13px;
  }
  .imgarr>img{
    display: inline-block;
    width: 45px;
    height: 45px;
    margin-right:2px;
    border: 1px solid #DDDDDD;
  }

  .img_body{
    height: 50px;
    line-height: 50px;
    overflow: hidden;
  }
  .img_body>p:first-child{
    float: left;
  }
  .img_body>p:first-child>span:nth-child(2){
    border-right: 1px solid #CCCCCC;
  }
  .img_body>p:first-child>span{
    padding:0 15px;
    color:#2d8cf0;
    cursor: pointer;
  }
  .img_body>p:last-child{
    float: right;
  }
  .img_tiele>p{
    height: 40px;
    line-height: 40px;
    background: #ebf0f5;
  }
  .img_tiele>p>span,.img_tiele li>span{
    display: inline-block;
    text-align: center;
  }

  .img_tiele>p>span:first-child{
    width:7%;
  }
  .img_tiele>p>span:nth-child(2){
    width:68%;
  }
  .img_tiele>p>span:nth-child(3){
    width:24%;
  }
  .img_tiele li{
    padding: 5px 0;
    height: 70px;
    line-height: 60px;
    border-bottom:1px solid #CCCCCC;
  }

  .img_tiele ul{
    max-height: 210px;
    overflow-y: auto;
  }

  .img_tiele li img{
    height: 60px;
    max-width: 100%;
    vertical-align: middle;
  }

  .img_tiele li>span:first-child{
    width:7%;
  }
  .img_tiele li>span:nth-child(2){
    width:68%;
  }
  .img_tiele li>span:nth-child(3){
    width:24%;
  }
  .img_tiele li>span>b{
    font-size: 16px;

    padding: 5px 15px;
    cursor: pointer;
  }
  .img_tiele li>span>b:hover{
    color: #00a1ff;
  }
</style>
