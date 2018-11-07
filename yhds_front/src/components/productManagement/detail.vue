<template>
    <div>
      <Modal v-model="show" title="批量编辑详情描述" width="1000" class-name="small-btn-box" :styles="{top: '30px'}" @on-cancel="cancel">
        <Table height="300" :loading="loading2" :columns="columns" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
        <div class="box" style="position: relative">
          <Tabs :value="tabName" class="tabs clr" @on-click="clickTab">
            <TabPane label="查找与替换" name="tab1">
              <span>查找HTML源码或文字内容：</span>
              <Input v-model="findCon" type="textarea" :rows="4" class="mt_10 mb_20"></Input>
              <p class="clr">替换为HTML源码或文字内容：</p>
              <Input v-model="replaceCon" type="textarea" :rows="4" class="mt_10"></Input>
            </TabPane>
            <TabPane label="使用新内容" name="tab2">
                <div class="flex-box">
                  <div>
                    <Checkbox v-model="seoOption" >SEO设置</Checkbox>
                    <span @click="tofullScreen" class="curson" ref="enfullScreen">全屏</span>
                    <span @click="miniScreen" class="curson" ref="disfullScreen" style="display: none">取消全屏</span>
                    <div id="editorTem2" style="width:100%;height: 100%;overflow: hidden;margin-right: 30px;"></div>
                  </div>
                  <div ref="templateWrap">
                    <div class="template-wrap" >
                      <div class="template-title">
                        模板列表
                      </div>
                      <div class="template-box">
                        <ul>
                          <li class="nav-list" :class="{active:index==activeIndex}" v-for="(item,index) in navList" @click="changePdtType(item.dicCode,index)">{{item.dicName}}</li>
                        </ul>
                        <div class="clr">
                          <div class="template-list" v-for="item in tmplates">
                            <img :src="item.pdtImg?item.pdtImg:noImg" alt="" />
                            <span class="add" @click="addTemplateToUE(item.pdtContent)">添加</span>
                          </div>
                        </div>
                        <Page v-if="totalCount3" :total="totalCount3" placement="top" :current="current3" :page-size="limit3" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage3" @on-page-size-change="changePageSize3" ></Page>
                      </div>
                    </div>
                  </div>
                </div>
                <!--<Col span="12" ref="editorbox">

                </Col>
                <Col span="12">
                <div class="template-wrap">
                  <div class="template-title">
                    模板列表
                  </div>
                  <div class="template-box">
                    <ul>
                      <li class="nav-list" :class="{active:index==activeIndex}" v-for="(item,index) in navList" @click="changePdtType(item.dicCode,index)">{{item.dicName}}</li>
                    </ul>
                    <div class="clr">
                      <div class="template-list" v-for="item in tmplates">
                        <img :src="item.pdtImg?item.pdtImg:noImg" alt="" />
                        <span class="add" @click="addTemplateToUE(item.pdtContent)">添加</span>
                      </div>
                    </div>
                    <Page v-if="totalCount3" :total="totalCount3" placement="top" :current="current3" :page-size="limit3" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage3" @on-page-size-change="changePageSize3" ></Page>
                  </div>
                </div>
                </Col>-->
            </TabPane>
            <TabPane label="批量编辑图片" name="tab3">
              <Row>
                <Col span="7">
                <ul class="imgList">
                  <li v-for="(item,index) in imgList" :class="{active:index==activeIndex2}" @click="chooseImg(item.val,index)">
                    <span class="img" v-html="item.val">
                      <!--<img :src="item.val" alt="">-->
                    </span>
                    <span class="count">被使用次数：{{item.count}}</span>
                  </li>
                </ul>
                </Col>
                <Col span="17">
                  <div class="modifyPicType">
                    <RadioGroup v-model="modifyPicType" @on-change="changeType">
                      <Radio label="del">从所有产品中删除当前选中的图片</Radio>
                      <Radio label="replacePic">替换为另一张图片</Radio>
                      <!--<Radio label="replaceList">用图片列表替换</Radio>-->
                      <Radio label="addPic">添加新图片</Radio>
                    </RadioGroup>
                    <div class="modifybox clr" v-if="modifyPicType=='replacePic' || modifyPicType=='addPic'">
                      <div class="modifybox-left">
                        <img :src="currentImg?currentImg:defaultImg" alt="">
                        <p>新的图片</p>
                      </div>
                      <div class="modifybox-right">
                        <Button type="primary" shape="circle" class="my-btn " @click="library">从图片库选取</Button>
                        <Button type="primary" shape="circle" class="my-btn ml_10" @click="bank">从图片银行选取</Button>
                        <RadioGroup v-model="addPosition" vertical v-if="modifyPicType=='addPic'" style="margin-top: 30px">
                          <Radio label="addInAfter">在当前选中的图片下方添加</Radio>
                          <Radio label="addInEnd">在详细描述末尾添加</Radio>
                        </RadioGroup>
                      </div>
                    </div>

                  </div>

                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
        <p class="tips" >提示：使用此高级功能面向HTML源码，操作不慎可能导致页面显示异常</p>
        <div slot="footer" class="clr center">
          <Button type="primary" shape="circle" class="my-btn " @click="preview">预览</Button>
          <Button type="primary" shape="circle" :loading="loading2" class="my-btn ml_10 " @click="modify">确定</Button>
          <Button type="primary" shape="circle" class="my-btn ml_10 " @click="resetModifyModal">重置</Button>
          <Button type="warning" shape="circle" class="my-btn ml_10 " @click="cancel">取消</Button>
        </div>
      </Modal>
      <Modal v-model="showPriview" title="预览" width="1000" class-name="myModal " :styles="{top: '30px'}">
        <div class="box">
          <Row>
            <Col span="6">
            <ul class="nav">
              <li class="tab-list">产品标题</li>
              <li class="tab-list" :class="{active:activeIndex3==index}" v-for="(item,index) in tableData2" @click="changeSubject(item.description2,index)">{{item.subject}}</li>
            </ul>
            </Col>
            <Col span="18">
            <div class="con" v-html="initCon"></div>
            </Col>
          </Row>
        </div>
        <div slot="footer"></div>
      </Modal>
      <!--<preview :showPriview=showPriview :list="tableData2" v-on:hidePreview="showPriview=false"></preview>-->
      <b-images ref="child" @imgBank="acceptBank"></b-images>
      <l-images ref="child2" @imgLib="accept"></l-images>
    </div>
</template>

<script>
    import Preview from './preview'
    import BImages from "../../components/imageVue/imageBank.vue"
    import LImages from "../../components/imageVue/imageLibrary.vue"
    export default {
      components:{
        Preview,
        BImages,
        LImages,
      },
      props:["showDetail","tableData","navList"],

      data(){
        return {
          loading2:true,
          show:this.showDetail,
          columns:[
            {
              title: '序号',
              key: 'index',
              align: 'center',
              render:(h, params) => {
                return h('span', params.index+1)
              }
            },
            {
              title: '产品名称',
              key: 'subject',
              align: 'center',
            },
            {
              title: '匹配情况',
              key: 'subject2',
              align: 'center',
              width:250,
              render:(h, params) => {
                let count=this.patch(this.findCon,params.row.description)
                return h('span', '匹配到'+count+'个')
              }
            },
          ],
          tableData2:[],
          findCon:'',
          replaceCon:'',
          //详情模版
          pdtType:'qyxc',
          activeIndex:0,
          tmplateEditer:null,
          xqmbflArr:[],
          tmplates:[],
          noImg:require('../../common/images/noImg.png'),
          totalCount3:0,
          current3:1,
          limit3:4,
          offset3:0,
          tabName:'tab1',
          seoOption:false,

          //子组件
          showPriview:false,
          activeIndex3:0,
          initCon:'',
          //编辑图片
          imgList:[],
          modifyPicType:'del',
          imgAll:[],
          currentImg:'',
          defaultImg:require('../../common/images/default.png'),
          activeIndex2:0,
          currentImgStr:'',
          addPosition:'addInAfter',
        }
      },
      watch:{
        showDetail(val){
          this.show=val;
          this.resetModifyModal()
        },
        tableData(val){
          this.tableData2=val;
          this.loading2=false
          this.matchAllImg();
        }
      },
      mounted(){
        this.tmplateEditer=UE.getEditor('editorTem2',{
          toolbars: [
            [ 'source', 'undo', 'redo'],
            ['bold', 'italic', 'underline', 'fontborder','fontfamily','fontsize','link','simpleupload', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc','inserttable', 'deletetable', 'insertparagraphbeforetable',]
          ],
          initialFrameWidth: '100%',
          initialFrameHeight:250,
          autoHeightEnabled:false,
          zIndex:999999,
        });

      },
      methods:{
        tofullScreen(){
          this.$refs.templateWrap.style.display='none';
          this.$refs.enfullScreen.style.display='none';
          this.$refs.disfullScreen.style.display='inline-block';
        },
        miniScreen(){
          this.$refs.templateWrap.style.display='block';
          this.$refs.enfullScreen.style.display='inline-block';
          this.$refs.disfullScreen.style.display='none';
        },

        patch(reg,str){
          reg=eval("/"+reg+"/ig");
          if(reg && str.match(reg)){
            return str.match(reg).length
          }else{
            return 0
          }

        },
        cancel(){
          this.$emit("hidePreview")
        },
        clickTab(name){
          this.tabName=name;
        },
        //详情模板
        loadDetailTem(){
          this.api.queryProductDetailTemplate.list({
            reqData:{
              pdtType:this.pdtType,
              limit:this.limit3,
              offset:this.offset3
            }
          }).then((res) => {
            if(res){
              console.log(res)
              this.tmplates = res.data.rows;
              this.totalCount3 = res.data.total;
            }
          })

        },
        //添加详情模板
        addTemplateToUE(con){
          if(con){
            UE.getEditor('editorTem2').setContent(con, true);
          }
        },
        //切换模板分类
        changePdtType(type,index){
          this.pdtType = type;
          this.activeIndex = index;
          this.loadDetailTem()
        },
        changePage3(currentPage){
          this.offset3 = (currentPage-1)*this.limit3;
          this.current3 = currentPage;
          this.loadDetailTem()
        },
        changePageSize3(pageSize){
          this.limit3 = pageSize;
          this.loadDetailTem()
        },
        /*查找所有使用的图片以及次数*/
        matchAllImg(){
          var re=/<img\b[^>]*>/g;
          /*let re=/src=[\'\"]?([^\'\"]*)[\'\"]?/g;*/
          let str=''
          for(let i=0;i<this.tableData2.length;i++){
            str+=this.tableData2[i].description
          }

          let arr = str.match(re);
          let arr2=[];
          for(let i=0;i<arr.length;i++){
            arr2.push(arr[i].split('"')[1])
          }
          this.imgList=this.uniqueCount(arr)
          console.log(this.uniqueCount(arr))
          if(this.imgList.length){
            this.currentImgStr=this.imgList[0].val;
          }

        },
        //数组对象去重
        uniqueCount(arr){
          let result = [], count = {};
          let result2=[],myArr=[];
          for(let i = 0, len = arr.length; i < len; i++){
            let temp = arr[i];
            if (!count[temp]) {
              result.push(temp);
              count[temp] = 1;
            }else {
              count[temp]++;
            }
          }
          for (let i in count) {
            result2.push(count[i]+','+i);
          }
          for(let i=0;i<this.unique(result2).length;i++){
            myArr.push({
              count:this.unique(result2)[i].split(',')[0],
              val:this.unique(result2)[i].split(',')[1]
            })
          }
          return myArr;
        },
        unique(arr){
          let newArr = [];
          let len = arr.length;
          for(let i = 0;i < len; i++){
            if(newArr.indexOf(arr[i]) == -1){
              newArr.push(arr[i]);
            }
          }
          return newArr;
        },
        caculateTableData2(){
          let con = UE.getEditor('editorTem2').getContent();
          for(let i=0;i<this.tableData2.length;i++){
            let mainImg=''
            if(this.seoOption && this.tableData2[i].images.length){
              mainImg='<img  src='+this.tableData2[i].images[0].imageUrl+'>';
            }
            if(this.tabName==='tab1'){
              if(this.findCon && this.replaceCon){
                this.tableData2[i].description2=this.tableData2[i].description.replace(new RegExp(this.findCon,'g'),this.replaceCon)
              }
            }else if(this.tabName==='tab2'){
              if(con){
                this.tableData2[i].description2=mainImg+con;
              }else{
                this.tableData2[i].description2=mainImg+this.tableData2[i].description
              }

            }else{
              if(this.modifyPicType==='del'){
                this.tableData2[i].description2=this.tableData2[i].description.replace(new RegExp(this.currentImgStr,'g'),'')
              }else if(this.modifyPicType==='replacePic'){
                if(this.currentImg){
                  this.tableData2[i].description2=this.tableData2[i].description.replace(new RegExp(this.currentImgStr,'g'),'<img src='+this.currentImg+'>')
                }
              }else if(this.modifyPicType==='addPic'){
                if(this.currentImg){
                  if(this.addPosition==='addInAfter'){
                    this.tableData2[i].description2=this.tableData2[i].description.replace(new RegExp(this.currentImgStr,'g'),this.currentImgStr+'<img src='+this.currentImg+'>')
                  }else{
                    this.tableData2[i].description2=this.tableData2[i].description+'<img src='+this.currentImg+'>'
                  }
                }
              }
            }
          }
          this.initCon=this.tableData2[0].description2;
        },
        preview(){
          this.caculateTableData2();

          this.activeIndex3=0;
          this.showPriview=true;


        },
        modify(){
          this.caculateTableData2()
          let reqData = [];
          for(let i=0;i<this.tableData2.length;i++){
            reqData.push({
              groupId:this.tableData2[i].groupId,
              subject:this.tableData2[i].subject,
              proId:this.tableData2[i].proId,
              productId:this.tableData2[i].productId,
              keywords1:this.tableData2[i].keywords1,
              keywords2:this.tableData2[i].keywords2,
              keywords3:this.tableData2[i].keywords3,
              categoryId:this.tableData2[i].categoryId,
              language:this.tableData2[i].language,
              productType:this.tableData2[i].productType,
              market:this.tableData2[i].market,
              description:this.tableData2[i].description2
            })
          }
          this.loading2 = true;
          console.log(reqData)
          this.api.batchModify.list({
            reqData:reqData
          }).then((res) => {
            this.loading2 = false;
            if(res){
              this.$emit("hidePreview")
              this.$emit('reload',res.data.rows)
              if(res.data.status!=='200') {
                this.$Notice.success({
                  title: '提示',
                  desc: res.data.info
                });
              }
            }
          })
        },
        resetModifyModal(){
          this.seoOption=false;
          this.findCon='';
          this.replaceCon='';
          this.changePdtType('qyxc',0);
          UE.getEditor('editorTem2').setContent('') ;

          this.tabName='tab1';
          for(let i=0;i<this.tableData2.length;i++){
            this.tableData2[i].description2=this.tableData2[i].description
          }
          this.currentImg='';
          this.modifyPicType='del';
          this.addPosition='addInAfter'
        },
        changeType(){
          this.currentImg='';
          this.addPosition='addInAfter'
        },
        changeSubject(con,index){
          if(con){
            this.initCon=con;
          }
          this.activeIndex3=index;
        },

        /*****************************编辑图片*********************/
        // 接受图片库子组件参数
        library(){
          this.$refs.child2.MsgLibrary();
        },
        accept(msg){
          for(var i=0;i<msg.length;i++){
            this.imgAll.push(msg[i])
          }
          if(this.imgAll.length){
            this.currentImg=this.imgAll[this.imgAll.length-1]
          }
        },
        //接受图片银行子组件参数
        bank(){
          this.$refs.child.msgBank();
        },
        acceptBank(msg){
          console.log(msg);
          for(var i=0;i<msg.length;i++){
            this.imgAll.push(msg[i])
          }
          if(this.imgAll.length){
            this.currentImg=this.imgAll[this.imgAll.length-1]
          }
        },
        //选中需要修改的图片
        chooseImg(str,index){
          this.activeIndex2=index;
          this.currentImgStr=str;

        }
      },
      destroyed() {
        this.tmplateEditer.destroy();
      }
    }
</script>

<style scoped>
  .flex-box{
    display: flex;
  }
  .flex-box>div{
    flex: 1;
  }
  .curson{
    cursor: pointer;
  }
  .tips{
    margin: 5px 0;
    color: red;
    font-size: 14px;
  }
  .box{
    height: 450px;
    border: 1px solid #DDDDDD;
    margin-top: 10px;
  }
  .template-wrap{
    margin-left: 20px;
    border:1px solid #DDDDDD;
  }
  .template-title{
    background: #ebf0f5;
    padding: 13px 15px;
  }
  .template-box{
    padding: 15px;
  }
  .template-box ul{
    overflow: hidden;
  }
  .nav-list {
    list-style: none;
    color: #7994ae;
    float: left;
    margin-right: 36px;
    margin-bottom: 12px;
  }
  .nav-list.active{
    color: #000000;
  }
  .template-list {
    width: 25%;
    float: left;
    padding: 0 15px 15px 0;
    position: relative;
  }
  .template-list img {
    width: 100%;
    height: 100px;
    border: 1px solid #d9e3ed;
  }
  .template-list .add {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 15px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #FFFFFF;
    font-size: 16px;
    background: rgba(0, 123, 241, 0.5);
  }
  .ivu-row,.ivu-row>div{
    height: 380px;
  }
  .ivu-tabs .ivu-tabs-tabpane:nth-of-type(3){
    padding-left: 0;
  }
  .imgList{
    overflow: auto;
    height: 100%;
    border-right: 1px solid #DDDDDD;
  }
  .imgList li{
    margin-bottom: 10px;
    padding-left: 5px;
    cursor: pointer;
  }
  .imgList li.active{
    background: #57a3f3;
  }
  .imgList li.active .count{
    color: #ffffff;
  }
  .imgList .img{
    display: inline-block;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border: 1px solid #DDDDDD;
    margin-right: 10px;

  }
  .imgList .count{
    line-height: 70px;
    vertical-align: bottom;
  }
  .imgList .img img{
    height: 100% !important;
    width: 100% !important;
  }
  .modifyPicType{
    padding: 10px;
    padding-left: 30px;
    overflow: hidden;
  }
  .ivu-radio-wrapper{
    width: 47%;
    margin-bottom: 10px;
  }
  .modifybox{
    border-top: 1px solid #DDDDDD;
    padding-top: 20px;
    margin-top: 10px;
  }
  .modifybox-left{
    width: 200px;
    float: left;
    text-align: center;
    margin-right: 20px;
  }
  .modifybox-left img{
    width: 100%;
    border: 1px solid #DDDDDD;
    height: 200px;
  }
  .modifybox-right{
    width: 60%;
    float: left;
  }

  .myModal .box{
    height: 850px;
    border: 0;
  }
  .myModal .ivu-row,.myModal .ivu-row>div,.myModal .nav,.myModal .con{
    height: 100%;
  }
  .myModal .nav{
    overflow: auto;
    border: 1px solid #DDDDDD;
  }
  .myModal .tab-list{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #DDDDDD;
    text-align: center;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .myModal .tab-list:nth-of-type(1){
    background: #ebf0f5;
    line-height: 50px;
    padding-top: 0;
  }
  .myModal .tab-list.active{
    color: #2d8cf0;
  }
  .myModal .con{
    border: 1px solid #DDDDDD;
    margin-left: 20px;
    overflow: auto;
  }
</style>
