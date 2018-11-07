<template>
    <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/keywords">关键字采集</Breadcrumb-item>
        <Breadcrumb-item>词库管理</Breadcrumb-item>
      </Breadcrumb>
      <div class="main" ref="main">
        <div ref="search">

          <Row class="overhide">
              <Col span="4">
                  <div>
                    <Button type="primary" shape="circle" @click="newfile()"><span class="iconfont icon-caozuo"></span>新建分组</Button>
                  </div>
              </Col>
              <Col span="20">
                  <div class="head-btn">
                      <Button type="primary" shape="circle" class="my-btn" @click="clickFn()">添加</Button>
                      <Button type="warning" shape="circle" class="my-btn" @click="thesaurus_show()">删除</Button>
                      <Button type="primary" shape="circle" class="my-btn" @click="distribution_show()">分配</Button>
                  </div>
              </Col>
          </Row>
        </div>
        <Row class="head-mag">
            <Col span="4" class="headspan">
                <div>
                    <div class="head">
                      <span class="fl color_blue" @click="pullshow()"><Icon type="edit" class="f_14"></Icon> 编辑</span>
                      <span class="fr color_red" @click="delehtml()"><span class="iconfont icon-shanchu f_14"></span> 删除</span>
                    </div>

                    <ul class="group">
                      <li :class="{color_blue:index==addstyle}" v-for="(item,index) in styledata" @click="addclass(index)">{{item.wgName}}</li>
                    </ul>
                </div>
            </Col>
            <Col span="18" offset="2">
                <Table  border stripe :height="tableHeight"  :loading="loading" ref="table" :columns="columns4" :data="data1" no-data-text="暂无数据" @on-selection-change="change" @on-sort-change="sortChange"></Table>
                <Page  v-if="totalCount>0" :total="totalCount" placement="top" :current="current" show-elevator show-sizer  :page-size="limit" :page-size-opts=[15,30,50]  @on-change="changePage" @on-page-size-change="changePageSize"></Page>
            </Col>
        </Row>

        <!--新建分组模态框-->
        <Modal
          ref="modal1"
          v-model="modal1"
          title="新建分组"
          :styles="{top: '40px'}"
          @on-ok="modelok"
        >
            <div>
                <p class="mag-p">分组名称</p>
                <Input placeholder="请输入分组名称" v-model="htmlname"></Input>
            </div>
            <p class="mag-p">选词条件</p>
            <div class="mod-bor" v-for="(item,index) in htmldata">
                <p>
                  <Select  v-model="seledata1[index]" size="large" id="selewid3">
                    <Option v-for="item in selelist1" :value="item.value" :key="item.id">{{ item.label}}</Option>
                  </Select >
                  <Input style="width:60%" v-model="htmldata[index]" id="selewid4"></Input>
                  <span @click="deleioc(index,htmldata)">
                    <Icon type="ios-trash-outline" class="delete" ></Icon>
                  </span>
                </p>
            </div>
            <Select v-model="seledata" id="sele">
              <Option v-for="(item,index) in selelist" :value="item.value" :key="item.id">{{ item.label }}</Option>
            </Select>
            <span class="iconfont icon-caozuo color1" @click="addhtml(htmldata,seledata1)" v-if="htmldata.length<5"></span>
        </Modal>
        <!--编辑分组模态框-->
        <Modal
          ref="modal2"
          v-model="modal2"
          title="编辑分组"
          :styles="{top: '40px'}"
          @on-ok="pullok"
        >
            <div>
                <p class="mag-p">分组名称</p>
                <Input placeholder="请输入分组名称"  v-model="pullname"></Input>
            </div>
            <p class="mag-p">选词条件</p>
            <div class="mod-bor" v-for="(item,index) in seledata2">
                <p>
                  <Select   size="large"  v-model="seledata2[index]" id="selewid1">
                    <Option v-for="item in pullsle" :value="item.value" :key="item.id">{{ item.label}}</Option>
                  </Select >
                  <Input  v-model="input2[index]" id="selewid2"></Input>
                  <span @click="deleioc2(index,seledata2,input2)">
                    <Icon type="ios-trash-outline" class="delete"></Icon>
                  </span>
                </p>
            </div>
            <Select v-model="operatorLogic" id="sele1">
                <Option v-for="(item,index) in pullselect" :value="item.value" :key="item.id">{{item.label}}</Option>
            </Select>
            <span class="iconfont icon-caozuo color1" v-if="seledata2.length<5" @click="addhtml(input2,seledata2)"></span>
        </Modal>
        <!--是否删除弹框-->
        <Modal v-model="modal3" width="360" title="删除该分组">
            <div style="text-align:center">
                <p>
                  <Checkbox @on-change="chebox" v-model="chebul">
                    是否同时删除该分组关键词
                  </Checkbox>
                </p>
            </div>
            <div slot="footer" style="text-align: center">
               <Button type="error" size="large"  @click="delearr()">确定</Button>
            </div>
        </Modal>


      <!--词库表所需模态框-->
            <!--词库删除模态框-->
      <Modal
        v-model="thesaurus"
        title="删除热词"
        width="360px"
        >
        <div style="text-align:center">
          <p>是否确定删除选中的选项</p>
        </div>
        <div slot="footer" style="text-align: center">
          <Button type="error" size="large"  @click="thesaurus_dele()">确定</Button>
        </div>
      </Modal>

      <!--词库分配模态框-->
      <Modal
        ref="distribution"
        v-model="distribution"
        title="分配词库关键词"
        :styles="{top:'40px'}"
        width="420px"
        @on-ok="distribution_ok"
      >
        <div class="mode-conten">
          <RadioGroup v-model="animal" vertical :loading="loading" id="group">
            <Radio :label="item.wgId" v-for="item in groulist" :key="item.wgId" class="inupuradio">
              <span>{{item.wgName}}</span>
            </Radio>
          </RadioGroup>
        </div>
      </Modal>

        <Modal
          ref="clickFndata"
          v-model="clickFndata"
          title="添加关键词"
          @on-ok="clickFnok"
          :styles="{top:'70px'}"
          >
          <div>
            <Input v-model="textareavalue" type="textarea" :autosize="{minRows:16,maxRows:16}" placeholder="关键词格式：每行输入一个关键词，以回车键分隔" style="min-width: 100%"></Input>
          </div>
        </Modal>
        <!--添加推广-->
        <Modal
          v-model="promote"
          title="添加推广"
          @on-ok="promoteok"
          :styles="{top: '60px'}"
        >
         <div class="promoteclass">
           <RadioGroup v-model="verpromote">
             <Radio :label="item.name" v-for="item in promoteData">
               <span>{{item.name}}</span>
             </Radio>
           </RadioGroup>
         </div>

        </Modal>
      </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              textareavalue:"",
              clickFndata:false,//添加关键词
              tableHeight:580,
              addstyle:0,//控制样式切换
              modal1:false,//模态框一
              htmldata:[''],
              seledata:"and",
              selelist: [
                {
                  value: 'and',
                  label: '使用上述所有条件',
                  id:"yes",
                },
                {
                  value: 'or',
                  label: '使用上述任一条件',
                  id:"no"
                },
              ],
              seledata1:["Y"],
              selelist1: [
                {
                  value: 'Y',
                  label: '包含',
                  id:"contain"
                },
                {
                  value: 'N',
                  label: '不包含',
                  id:"ncontain"
                },
              ],
              htmlname:'',
              modal2:false,//模态框二
              modal3:false,//是否删除弹框

              columns4: [
                  {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                  },
                  {
                    title: '关键词',
                    key: 'kwKeywords',
                    align: 'center',

                  },
                  {
                    title: '搜索热度',
                    key: 'kwSearchHot',
                    sortable:'custom',
                    align: 'center',

                  },
                  {
                    title: '竞争度',
                    key: 'kwCompanyCnt',
                    sortable:'custom',
                    align: 'center',

                  },
                  {
                    title: '橱窗数',
                    key: 'kwShowwinCnt',
                    sortable:'custom',
                    align: 'center',

                  },
                  {
                    title: 'P4P推广',
                    key: 'P4P推广',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                      if(params.row.kwToPromote==1){
                        return h('div', [
                          h('Button', {
                            props: {
                              type: 'primary',
                              size: 'small'
                            },
                            style: {
                              marginRight: '5px'
                            },
                            on: {
                              click: () => {
//                              this.show(params.index)
                                console.log(params);
                              }
                            }
                          }, '推广中')
                        ]);
                      }else {
                        return h('div', [
                          h('Button', {
                            props: {
                              type: 'primary',
                              size: 'small'
                            },
                            style: {
                              marginRight: '5px'
                            },
                            on: {
                              click: () => {
                                this.promoName=params.row.kwKeywords;
                                this.promotefun();
                              }
                            }
                          }, '添加推广')
                        ]);
                      }

                    }
                  }
              ],
              data1: [],
              styledata:[],  //分组查询接口参数
              pullname:"",
              pullmodel:[],
              pullselect: [
                {
                  value: 'and',
                  label: '使用上述所有条件',
                  id:"yes1",
                },
                {
                  value: 'or',
                  label: '使用上述任一条件',
                  id:"no2"
                },
              ],
              pullsle: [
                {
                  value: 'Y',
                  label: '包含',
                  id:"contain1"
                },
                {
                  value: 'N',
                  label: '不包含',
                  id:"ncontain2"
                },
              ],

//              删除接口参数
              single:0,//是否删除分组
              chebul:false,
              deleId:"",//删除分组id
              pulldata:[],//编辑模态框数据
              seledata2:[],
              input2:[],
              operatorLogic:"",
              state:1,

//           词库表删除所需变量
              thesaurus:false,
              thesaurus_list:[],

//             词库分配
              groulist:'',
              distribution:false,
              animal:'',
              radiaoval:"",

              //分页参数
              totalCount:0,
              current:1,
              limit:15,
              offset:0,
              //排序
              sortType:"",
              order:'',
              loading:false,

//              添加推广
              promote:false,
              promoName:"",
              promoteData:[],
              verpromote:"",
            }
        },
        mounted(){
            this.init();
            this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-130;

        },
        methods: {
            chebox(val){
                if(val){
                    this.single=1
                }else {
                  this.single=0
                }
                console.log(this.single)
            },
            //分组模块方法
            init(){//查看分组接口
              this.api.group_Lexicon.find().then((res)=>{
                  console.log(res);
                  this.styledata=res.data.rows;
                  this.deleId= this.styledata[this.addstyle].wgId;
                  console.log(this.deleId);
                  this.listloading();
              })
            },
            newfile(){//新建分组
              this.modal1 = true;
              this.htmlname='';
              this.htmldata=[""];
            },
            arrnull(arr,tilete){
              for(var i = 0;i<arr.length;i++){
                if(arr[i]==''||arr[i]==null||typeof(arr[i])==undefined){
                   this.state=2;
                    break
                }
              }
              if(!tilete){
                this.state=2;
              }

              console.log(this.state);
            },
            addclass(index){//切换class
              this.addstyle=index;
              this.deleId=this.styledata[index].wgId;
              console.log(this.deleId);
              this.offset=0;
              this.listloading();
              this.thesaurus_list=[];
            },
            modelok () {//新建分组模态框，点击确定按钮事件
              this.arrnull(this.htmldata,this.htmlname);//判断数据中是否有空
              var list=[];
              //todo 请求参数格式方法可以优化
              for(var i = 0;i<this.htmldata.length;i++){
                  var arrobj={
                    wgrName:this.htmldata[i],
                    wgrIscontain:this.seledata1[i],
                  };
                  list.push(arrobj);
              }
              console.log(list);
              if(this.state==1){
                this.api.group_Lexicon4.find({reqData:{wgName:this.htmlname,operatorLogic:this.seledata,wordGroupRules:list}}).then((res)=>{
                  console.log(res);
                  if(res.data.info=="添加成功"){
                    this.init();
                    this.$Notice.success({
                      title: '新增成功',
                    });
                  }
                })
              }else {
                this.$refs.modal1.visible = true;
                  this.modal1 = true;
                  this.$Notice.warning({
                  title: '分组名或条件值不能为空',
                });
                this.state=1

              }

            },
            addhtml(list,sele){//添加input框方法
              list.push("");
              sele.push("Y");
              console.log(11)
            },
            pullshow(){//编辑分组模态框
              if(this.styledata.length>0&&this.styledata[this.addstyle].wgIsdefault!="Y"){
                this.modal2=true;
              }else {
                this.$Notice.warning({
                  title: '没有分组或默认分组不可编辑',
                });
              }

              this.seledata2=[],
              this.input2=[],
              console.log(this.deleId);
              this.pulldata=this.styledata[this.addstyle];
              this.pullname=this.pulldata.wgName;
              this.pullmodel=this.pulldata.wordGroupRules;
              this.operatorLogic=this.pullmodel[0].wgrOperatorLogic;

              console.log(this.operatorLogic);


              //todo select 和 input 绑定可以优化一下
              for(var i=0;i<this.pullmodel.length;i++){
                this.seledata2[i]=this.pullmodel[i].wgrIscontain;
                this.input2[i]=this.pullmodel[i].wgrName;
              }
            },
            pullok(){
//              console.log(this.pullmodel.join(","));
              this.arrnull(this.input2,this.pullname);
              let list=[];
              //todo 请求参数格式方法可以优化

              if(this.state==1){
                for(var i = 0;i<this.input2.length;i++){
                  var arrobj={
                    wgrName:this.input2[i],
                    wgrIscontain:this.seledata2[i],
                  };
                  list.push(arrobj);
                }
                console.log(list);
                this.api.group_Lexicon5.find({reqData:{wgId:this.deleId,wgName:this.pullname,operatorLogic:this.operatorLogic,wordGroupRules:list}}).then((res)=>{
                  console.log(res);
                  if(res.data.status=="200"){
                    this.init();
                    this.$Notice.success({
                      title: '编辑成功',
                    });
                  }
                });
              }else {
                this.$Notice.warning({
                  title: '分组名或条件值不能为空',
                });
                this.state=1;
                this.$refs.modal2.visible = true;
                this.modal2=true
              }

            },

            delehtml(){//删除接口模态框
                this.chebul=false;
                this.single=0
                if(this.styledata[this.addstyle].wgIsdefault!="Y"){
                  this.modal3 = true
                }else {
                  this.$Notice.warning({
                    title: '默认分组不可删除',
                  });
                }
            },
            delearr(){//删除接口方法
              console.log(this.single);
              this.api.group_Lexicon2.find({params:[this.deleId,this.single]}).then((res)=>{
                console.log(res);
                if(res.data.status=="200"){
                  this.modal3=false;
                  this.init();
                  this.$Notice.success({
                    title: '删除成功',
                  });
                }
              });
            },
            deleioc(i,val){//删除新增input
                if(val.length<2){
                  this.$Notice.info({
                    title: '最少包含一个条件',
                  });
                }else {
                  val.splice(i,1)
                }

            },
            deleioc2(i,val,sele){//删除编辑 input select
              if(val.length<2){
                this.$Notice.info({
                  title: '最少包含一个条件',
                });
              }else {
                val.splice(i,1);
                sele.splice(i,1);
              }
          },



//          词库表加载分组列表
          thesaurus_init(){
            this.loading =true;
            this.api.group_Lexicon.find().then((res)=>{
              console.log(res);
              this.groulist=res.data.rows;
              this.loading =false;
            })
          },

//          词库表删除所需方法
          change(selection){//input框改变时触发事件
              console.log(selection);
              var list=[];
              for(var i=0;i<selection.length;i++){
                list.push(selection[i].kwId)
              }
            this.thesaurus_list=list.join(",");
              console.log(this.thesaurus_list);
          },
          thesaurus_dele(){//删除词库表
            this.api.group_delMyKeywords.find({reqData:{keywordsIds:this.thesaurus_list}}).then((res)=>{
              console.log(res);
              this.thesaurus=false;
              this.listloading();
              this.$Notice.success({
                title: '删除成功',
              });
              this.thesaurus_list=[]
            });
          },
          thesaurus_show(){
              if(this.thesaurus_list.length>0){
                this.thesaurus=true;
              }else {
                this.$Notice.info({
                  title: '请勾选需要删除的选项',
                });
              }
          },
//          词库表分配所需方法
          distribution_show(){
            this.animal='';
//            this.radiaoval='';
            if(this.thesaurus_list.length>0){
              this.distribution=true;
              this.thesaurus_init();
            }else {
              this.$Notice.info({
                title: '请勾选需要分配的选项',
              });
            }
          },
//          randiochange(val){
//              this.radiaoval=val;
//              console.log(this.animal);
//          },
          distribution_ok(){
              if(!this.animal){
                this.$Notice.info({
                  title: '请选择分组',
                });
                this.$refs.distribution.visible = true;
                this.distribution=true
              }else {
                this.api.group_assignKeywords.find({reqData:{keywordsIds:this.thesaurus_list,wgId:this.animal,}}).then((res)=>{
                  console.log(res);
                  if(this.offset>0){
                    this.offset=this.offset-this.limit;
                  }
                  this.$Notice.success({
                    title: '分配成功',
                  });
                  this.thesaurus_list=[];
                  this.listloading();
                });
              }
          },

//          词库表数据加载
          listloading(){
            this.loading = true;
            this.api.group_Info.find({
              reqData:{
                wgId:this.deleId,
                offset:this.offset,
                limit:this.limit,
                sort:this.sortType,
                order:this.order
              }}).then((res)=>{
              console.log(res);
              this.data1=res.data.rows;
              this.totalCount = Number(res.data.total);
              this.loading =false;
            })
          },
          //分页
          changePage(currentPage){
            this.offset = (currentPage-1)*this.limit;
            this.current = currentPage;
          },
          //切换每页显示的条数
          changePageSize(pageSize){
            this.limit = pageSize;
            console.log("切换每页显示的条数");
            this.listloading();
          },
          //排序
          sortChange(column){
            //column->{column:{title: "搜索热度", key: "bkwSearchHot", align: "center", sortable: true},key:"bkwSearchHot",order:"desc"}
            this.sortType = column.key;
            console.log(this.sortType);
            this.order=column.order;
            if(this.order=="normal"){
              this.order="";
              this.sortType='';
            }
            this.offset=0;
            this.current=1;
            this.$nextTick(function () {
              this.listloading()
            })

          },
//          添加关键词
          clickFn(){
            this.clickFndata=true;
            this.textareavalue="";
          },

          clickFnok(){
            console.log(this.textareavalue);
            var temp = this.textareavalue.split(/[\n,]/g);
            for(var i =0;i<temp.length;i++){
              if(temp[i] == ""){
                temp.splice(i, 1);
                //删除数组索引位置应保持不变
                i--;
              }
            }
            console.log(temp+"zzz");
            var test=1
            for(var i=0;i<temp.length;i++){
              if(temp[i].match(/^\s+$/)){
                test=2
              }

            }

            if(test==2||temp==""){
              this.$Notice.error({
                title: "请输入关键词或关键词不能为空",
              });
              this.$refs.clickFndata.visible = true;
              this.clickFndata=true
            }else {
              temp=temp.join(",");
              console.log(temp);
              this.api.group_batchAddKeywords.find({reqData:{keywords:temp,wgId:this.deleId}}).then((res)=>{
                console.log(res);
                if(res.data.info=="添加成功"){
                  this.listloading();
                  this.$Notice.success({
                    title: '添加成功',
                  });
                }

              })
            }

          },

//          添加推广
          promotefun(){
            this.promote=true;
            this.verpromote="",
            this.api.tabelAllGroup.del().then((res) => {
              if(res.data.status==200){
                this.promoteData=res.data.rows
              }
            });
          },

          promoteok(){
            if(!this.verpromote){
              this.$Notice.info({
                title: '请选择关键词分组',
              });
            }else {
                var list=[];
                var obj={
                  keywords:this.promoName,
                  tagName:this.verpromote
                };
                list.push(obj);
                this.api.wordsToAd.find({reqData:list}).then((res) => {
                  this.bthloading=false;
                  if(res.data.status==200){
                    this.$Notice.success({
                      title: '添加成功',
                    });
                    this.init();
                  }
                });

            }

          },

        },
        watch:{
          offset(){
            this.listloading()
          }
        }
    }
</script>
<style scoped>
  .headspan,.headspan>div{
    height:100%;
  }
  .headspan>div>div{
    height: 55px;
  }
  .headspan>div>ul{
    height:calc( 100% - 55px);
    overflow-y: auto;
  }
  .overhide{
    height:6%;
  }
  .head-mag{
    height:92%;
  }
  .head-btn{
    text-align: right;
  }
  .head{
    overflow: hidden;
    background: #ebf0f5;
    padding: 15px 10px;

    border: 1px solid #dde3e8;
    border-bottom: 0;
    font-size: 14px;
  }
  .group .color_blue{
    color: #0076e8;
  }
  .color_red{
    color: #f73838;
  }
  .group{
    border: 1px solid #dde3e8;
    border-top: 0;
    text-align: center;
  }
  .group li{
    line-height: 40px;
    font-size: 14px;
    color: #444444;
    border-bottom: 1px dashed  #dde3e8;
  }
  .group li:last-child{
    border-bottom: none;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
    cursor: pointer;
  }

  .head-mag{
    margin-top: 24px;
    cursor: pointer;
  }
  .mod-bor{
    border: 1px dashed #DDDDDD;
    padding: 10px 10px 15px;
    margin-bottom: 10px;
  }
  .color1{
    color: #0076e8;
    vertical-align: middle;
  }
  .mag-p{
    margin:10px 0;
  }
  #sele,#sele1{
    width:90%;
    margin-right: 15px;
  }

  #selewid1,#selewid3{
    width:30%;
  }
  #selewid2,#selewid4{
    width:60%;
  }
  .group li{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .mode-conten{
    text-align: left;
    margin-left: 15px;
    max-height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .mode-conten::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .mode-conten::-webkit-scrollbar {/*滚动条整体样式*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .mode-conten::-webkit-scrollbar {/*滚动条整体样式*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
  .headspan::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .headspan::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .headspan::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }

  .inupuradio>span:first-child{
    width:6%;
  }
  .inupuradio>span:last-child{
    display: inline-block;
    width:94%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  #group{
    width:100%;
  }
  .promoteclass label{
    width:23%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 30px;
  }
</style>
