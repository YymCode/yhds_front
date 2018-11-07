<template>

  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
      <Breadcrumb-item>推广产品设置</Breadcrumb-item>
    </Breadcrumb>

    <div class="main">

      <Row class="tiele">
        <Col span="5" class="grouplist">
          <div>产品分组</div>
          <div>
            <ul>
              <li v-for="(item,index) in listshow" :class="{lipaad:item.childGroup.length==0,color_bule:addclass==index}" @click="addinit(index,item.groupId,item.parentId,item)">
                <span  v-if="item.childGroup.length!=0" @click.stop="childerinit(index)" >
                     <Icon type="chevron-right" :class="{aa:showindex==index}"></Icon>
                </span>
                {{item.groupName}}
                <span>&nbsp;&nbsp;&nbsp;({{item.inPromCount+"/"+(item.inPromCount+item.unPromCount)}})</span>
                <ul v-if="showindex==index">
                  <li v-for="(val,index) in item.childGroup" :class="{childerclass:lower==val.groupId}" @click.stop="addstyle(val.groupId,val.parentId,item)">
                    {{val.groupName}}
                    <span>&nbsp;&nbsp;&nbsp;({{val.inPromCount+"/"+(val.inPromCount+val.unPromCount)}})</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Col>
        <Col span="19" class="product">
          <div class="tuiguang">
            <span>推广产品设置</span>
            <!--<span>推广产品数:272(共123)个</span>|-->
            <!--<span>新增产品默认:-->
              <!--加入推广-->
              <!--<i-switch v-model="switch1" @on-change="switchchange"></i-switch>-->
            <!--</span>-->
          </div>
          <div>
            <div class="tielequery">
              <!--<span>-->
                <!--账户：-->
                 <!--<Select v-model="account" style="width:100px">-->
                    <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
              <!--</span>-->

              <span>
                推广状态：
                 <Select v-model="state" style="width:100px">
                    <Option v-for="item in statelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </span>
              <span>
                产品名称：
                 <Input v-model="pname" placeholder="请输入产品名称" style="width: 200px"></Input>
              </span>
              <Button type="primary" @click="search()">查询</Button>
              <Button type="primary" @click="synchronous" style="float: right" :loading="statusLongin">同步产品</Button>
            </div>
            <div class="join">
              <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选 &nbsp;&nbsp;</Checkbox>
              <span>已选({{checkAllGroup.length}})</span>
              <Button type="primary" @click="allstatus('enabled')">加入推广</Button>
              <Button type="warning" @click="allstatus('disabled')">取消推广</Button>
            </div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" class="imgdiv">
              <div style="text-align: center" v-for="(item,index) in datalist">
                <div class="showimg">
                  <img :src="item.ppProductImage" alt="" style="width: 130px; height: 130px;">
                  <div class="hoverimg" v-if="item.ppProductStatus=='disabled'"> <span @click="pstatus('enabled',item.ppProductId)">加入推广</span></div>
                  <div class="hoverimg"  v-else> <span  @click="pstatus('disabled',item.ppProductId)">取消推广</span></div>
                </div>
                <div  class="hide">
                  <Checkbox :label="item.ppProductId">
                    {{item.ppProductName}}
                  </Checkbox>

                </div>
                <div v-if="item.ppProductStatus=='disabled'">未加入推广</div>
                <div style="color: #00a1ff" v-else>已加入推广</div>
              </div>

            </CheckboxGroup>

            <div class="footer">
              <Page id="pagemag" v-if="totalCount>0" :total="totalCount"  :current="current" show-elevator  :page-size="limit"  @on-change="changePage" ></Page>
            </div>

          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
              statusLongin:false,
              hasLeaf:"",
              showindex:"-1",
//            分组列表
              childershow:[],
              listshow:[],
//                全选
              indeterminate: false,
              checkAll: false,
              checkAllGroup: [],
              chelist:[],
//              账户
//              account:"所有账户",
//              cityList: [
//                {
//                  value: '所有账户',
//                  label: '所有账户'
//                },
//                {
//                  value: 'New York',
//                  label: 'New York'
//                },
//                {
//                  value: 'Sydney',
//                  label: 'Sydney'
//                },
//              ],
//              推广状态
              state:'all',
              statelist:[
                {
                  value: 'all',
                  label: '全部状态'
                },
                {
                  value: 'enabled',
                  label: '推广中'
                },
                {
                  value: 'disabled',
                  label: '未推广'
                }
              ],
//              产品名称
              pname:'',

//              groupid:"",
              addclass:0,
              lower:1,
              parentname:"",

//              图片列表
              datalist:[],

              datatext:"",
              itemid:'',
              //分页参数
              totalCount:0,
              current:1,
              limit:16,
              offset:0,


              tabAnalysisType:"",
            }
        },
        mounted(){
          if(this.$route.params.analysisType){
            this.tabAnalysisType= this.$route.params.analysisType
          }else {
            this.tabAnalysisType="";
          }
          this.synchronousStatus();
          this.init()
        },
        methods: {
//            同步
          synchronous(){
            this.api.updateProductPromotionsdata.data().then((res)=>{
              if(res.data.status=="200"){
                this.$Notice.success({
                  title: '正在同步，请稍后',
                });
                this.statusLongin=true;
              }
            })
          },
          //            同步状态
          synchronousStatus(){
              console.log(11111111);
            this.api.findUpdateStatusdata.data().then((res)=>{
              if(res.data.status=="200"){
                  if(res.data.mapInfo.update_status.taskStatus==1){
                    this.statusLongin=false;

                  }
                if(res.data.mapInfo.update_status.taskStatus==2){
                  this.statusLongin=false;
                  this.$Notice.error({
                    title: '同步失败，请重新同步',
                  });

                }
                if(res.data.mapInfo.update_status.taskStatus==0){
                  this.statusLongin=true;
                  this.$Notice.info({
                    title: '正在同步，请稍后',
                  });
                }

              }
            })
          },


//          查看分组列表
          childerinit(val){
            if(this.showindex==val){
                this.showindex="-1"
            }else {
              this.showindex=val;
            }

          },
          init(){
            this.api.ProductGroups.find().then((res)=>{
              if(res.data.status=="200"){
                this.listshow=res.data.rows;
                this.itemid=this.listshow[0].groupId;
                this.parentname=this.listshow[0].parentId;
                if(this.listshow[0].childGroup.length>0){
                    this.hasLeaf="1";
                }else {
                  this.hasLeaf="0";
                }
                this.imglist();
              }
            })
          },
          addinit(index,val,name,all){
              if(all.childGroup.length>0){
                this.hasLeaf="1";
              }else {
                this.hasLeaf="0";
              }


            this.addclass=index;
            this.lower=1;
             this.itemid=val;
            console.log(this.itemid);
            this.parentname=name;
            console.log(this.parentname);
            this.current=1;
            this.offset=0;
            this.limit=16;
            this.imglist()
          },
          addstyle(id,name,all){
            this.hasLeaf="0";
            this.lower=id;
            this.itemid=id;
            this.addclass="x";
            this.parentname=name;
            console.log(this.parentname);
            console.log(this.itemid);
            this.current=1;
            this.offset=0;
            this.limit=16;
            this. imglist()
          },
//          查看图片列表
          imglist(){
            this.api.tionList.find({reqData:{hasLeaf:this.hasLeaf,groupId:this.itemid,parentId:this.parentname,status:this.state,productName:this.pname, offset: this.offset,limit:this.limit}}).then((res)=>{
              console.log(res);
              this.chelist=[];
              this.indeterminate=false;
              this.checkAll=false;
              this.checkAllGroup=[];
              this.datalist=res.data.rows;
              for(var i=0;i<this.datalist.length;i++){
                this.chelist.push(this.datalist[i].ppProductId);
              }
              console.log(this.chelist);
              this.totalCount = Number(res.data.total);
            })
          },
//          搜索图片列表
          search(){
            this.offset=0;
            this.totalCount=0;
            this.current=1;
            this.limit=16;
            this.imglist();
          },
//          修改产品状态
          pstatus(text,id){
            this.api.tionStatus.find({reqData:{analysisType:this.tabAnalysisType,productIds:id,status:text,groupId:this.itemid}}).then((res)=>{
                if(res.data.status=="200"){
                  this.indeterminate=false;
                  this.checkAll=false;
                  this.checkAllGroup=[];
                  this.$Notice.info({
                    title:"修改成功",
                  });
                  this.api.ProductGroups.find().then((res)=>{
                    if(res.data.status=="200"){
                      this.listshow=res.data.rows;
                      this.imglist();
                    }
                  });
                }
            })
          },
          allstatus(text){
              console.log(text);
            if(this.checkAllGroup.length==0){
              this.$Notice.warning({
                title:"请选择产品",
              });
            }else {
              var alldata=this.checkAllGroup.join(",");
              this.api.tionStatus.find({reqData:{analysisType:this.tabAnalysisType,productIds:alldata,status:text,groupId:this.itemid}}).then((res)=>{
                if(res.data.status=="200"){
                  this.indeterminate=false;
                  this.checkAll=false;
                  this.checkAllGroup=[];
                  this.$Notice.info({
                    title:"修改成功",
                  });
                  this.imglist();
                }
              })
            }

          },
          //分页
          changePage(currentPage){
            this.offset = (currentPage-1)*this.limit;
            this.current = currentPage;
            this.imglist();
          },
//            全选
          handleCheckAll () {
            if (this.indeterminate) {
              this.checkAll = false;
            } else {
              this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
              this.checkAllGroup = this.chelist;
              console.log(this.chelist)
            } else {
              this.checkAllGroup = [];
              console.log(this.checkAllGroup)
            }
          },
          checkAllGroupChange (data) {
            this.checkAllGroup=data;
              console.log(data);
            if (data.length === 16) {
              this.indeterminate = false;
              this.checkAll = true;
            } else if (data.length > 0) {
              this.indeterminate = true;
              this.checkAll = false;
            } else {
              this.indeterminate = false;
              this.checkAll = false;
            }
          },
        },
//        filters:{
//          discount(val){
//              return val
//          }
//        },

    }
</script>
<style scoped>
  .hide{
    padding-left:20px;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  #pagemag{
    margin-top:0;
  }
  .color_bule{
    color: #0076e8;
  }
  .color_bule li{
    color: #495060;
  }
  .grouplist .childerclass{
    color: #0076e8;
  }
  .lipaad{
    padding-left: 35px;
  }


  .aa{
    transform:rotate(90deg);
  }



  .grouplist li{
    min-height: 32px;
    line-height: 32px;
    cursor: pointer;
    min-width: 210px;
  }
  .grouplist li>ul{
    padding-left:60px;
  }
  .grouplist li>span{

    width:30px;
    height:30px;
    display: inline-block;
    vertical-align: middle
  }
  .showimg{
    position: relative;
    border: 1px solid #DDDDDD;
    margin: auto;
    width: 140px;
    height: 140px;
    padding: 5px;
    background:#FFFFFF;
  }
  .showimg:hover .hoverimg{
    width: 100%;
    height: 100%;
    display: block;
  }
  .hoverimg{
    line-height:140px;
    position: absolute;
    color: #FFFFFF;
    background: rgba(0,0,0,.5);
    z-index: 100;
    top: 0;
    left: 0;
    width:0;
    height:0;
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
  }
  .hoverimg span{
    cursor: pointer;
  }
  #page1{
    margin-top: 0;
  }
  .imgdiv{
    height:calc(100% - 150px);
    width:100%;
    overflow-y: auto;
  }
  .imgdiv>div{
    float: left;
    width:25%;
    height:180px;
    margin-bottom:1%;
  }
  .footer{
    height:50px;
    line-height: 50px;
  }
  .join{
    height: 45px;
    line-height: 45px;
    text-align: right;
  }
  .tielequery{
    height: 55px;
    border-bottom: 1px solid #DDDDDD;
  }
  .tielequery>span{
    margin-right: 20px;
  }
  .tiele>div:first-child{
    padding:0 10px;
  }
  .tiele>div,.tiele{
    height:100%;
  }
  .grouplist>div:first-child{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #DDDDDD;
  }
  .grouplist>div:nth-child(2){
    height:calc(100% - 40px);
  }
  .grouplist>div:nth-child(2)>ul{
    height:100%;
    overflow: auto;
  }
  .product>div:first-child{
    height: 40px;
    line-height: 40px;
  }

  .product>div:nth-child(2){
    height:calc(100% - 40px);
    border: 1px solid #DDDDDD;
    padding:15px 10px 0 10px;
  }
  .tuiguang>span:first-child{
    font-size: 16px;
    margin-right: 15px;
  }
  .tuiguang>span:nth-child(2){
    margin-right: 10px;
  }
  .tuiguang>span:nth-child(3){
    margin-left: 10px;
  }
</style>
