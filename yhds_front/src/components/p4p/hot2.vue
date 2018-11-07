<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
      <Breadcrumb-item href="/p4p/hot">爆款打造</Breadcrumb-item>
      <Breadcrumb-item>设置产品</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="mainx">
      <div>
        <p style="margin-bottom:15px;">
          <router-link tag="span" to="/p4p/hot" style="margin-right: 20px; color: #007FF3; cursor: pointer"> << 返回上一级 </router-link>
          设置产品 [{{prodname}}] 优先推广
        </p>
        <div style="overflow: hidden">
          <Input v-model="value" placeholder="请输入产品标题" style="width:220px"></Input>
          <Button type="primary" shape="circle" style="margin:0 10px; padding: 8px 30px;" @click="search">搜索</Button>

          <p style="float: right">
            <Button type="primary" shape="circle" @click="pullstatus('Y')">打造爆款</Button>

            <Button type="warning" shape="circle" @click="pullstatus('N')">取消推广</Button>

            <Button type="primary" shape="circle" @click="allgroup">加入到已有策略</Button>
          </p>
        </div>
      </div>

      <div style="padding-top: 15px;">
        <Table :loading="loading" :height="tableHeight" border stripe :columns="columns" :data="datalist" @on-selection-change="handleSelectdata" @on-sort-change="sortChange"></Table>
        <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin-top: 5px"></Page>
      </div>

      <!--日曲线-->
      <Modal
        v-model="curve"
        title="价格走势"
        width="700"
        :styles="{top: '50px'}"
      >
        <div>关键词:{{curvetile}}</div>
        <div id="myChart" :style="{width: '500px', height: '300px'}" class="huitu">
        </div>
      </Modal>
      <!--选择策略-->
      <Modal
        title="选择策略"
        v-model="choose"
        width="660"
        @on-ok="increase"
        :styles="{top: '100px'}">

        <div class="groupx">
            <p>
              <span>选择</span>
              <span>策略名称</span>
              <span>状态</span>
              <span>价格上限</span>
              <span>排名倾向</span>
              <span>排名临界值</span>
              <span>排名临界比</span>
              <span>关键词个数</span>
            </p>
          <RadioGroup v-model="disabledGroup" style="width: 100%">
            <ul>
              <li v-for="item in grouplist">
                <span>
                   <Radio :label="item.psId">
                     <span></span>
                   </Radio>
                </span>
                <span>{{item.psName}}</span>
                <span v-if="item.psStatus==2">暂停</span>
                <span v-else>生效</span>
                <span>{{item.psPriceRange}}</span>
                <span>前{{item.psRankingTendency}}名</span>
                <span>{{item.psDiffPrice}}</span>
                <span>{{item.psDiffPriceProp}}</span>
                <span>{{item.psKeywordsCount}}</span>
              </li>
            </ul>
          </RadioGroup>
        </div>
      </Modal>
      <!--出价前五-->
      <Modal
        v-model="firstfive"
        title="出价详情"
        @on-ok="PriceList"
        :styles="{top: '50px'}"
       >
        <div class="curvecss">
          <ul>
            <li>
              <span>第一位</span>
              <span>第二位</span>
              <span>第三位</span>
              <span>第四位</span>
              <span>第五位</span>
            </li>
            <li>
              <span>{{front[0]}}</span>
              <span>{{front[1]}}</span>
              <span>{{front[2]}}</span>
              <span>{{front[3]}}</span>
              <span>{{front[4]}}</span>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
              prodname:'',
              prodid:"",
              keysId:[],

              tableHeight:580,
              loading:false,
              value:'',
              columns:[
                {
                  type: 'selection',
                  "width":60,
                  align: 'center'
                },
                {
                  title: '关键词',
                  key: 'pfpPkwKeywords',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '推广评分',
                  key: 'pfpPkwQsStar',
                  align: 'center',
                  "width":150,
                  sortable:"custom",
                  render: (h, params) => {
                    var imgurl;
                    if(params.row.pfpPkwQsStar==0){
                      imgurl=require("../../common/images/sta01.png");
                    }
                    if(params.row.pfpPkwQsStar==1){
                      imgurl=require("../../common/images/sta02.png");
                    }
                    if(params.row.pfpPkwQsStar==2){
                      imgurl=require("../../common/images/sta03.png");
                    }
                    if(params.row.pfpPkwQsStar==3){
                      imgurl=require("../../common/images/sta04.png");
                    }
                    if(params.row.pfpPkwQsStar==4){
                      imgurl=require("../../common/images/sta05.png");
                    }
                    if(params.row.pfpPkwQsStar==5){
                      imgurl=require("../../common/images/sta06.png");
                    }
                    return h('img', {
                      attrs:{
                        src:imgurl
                      },
                      style:{
                        width:'80px',
                        verticalAlign:'middle'
                      }
                    },);
                  }
                },
                {
                  title: '价格',
                  key: 'pfpPkwPrice',
                  align: 'center',
                  sortable:"custom",
                  render: (h, params) => {
                    if(params.row.pfpPkwPrice){
                      return h('div',[
                        h('span', {},params.row.pfpPkwPrice),
                        h('span', {
                          style: {
                            display:"inline-block",
                            margin:"0 5px",
                            color:"#0076e8",
                            cursor:"pointer"
                          },
                          on: {
                            click: () => {
                              this.PriceList(params.row.pfpPkwKeywords)
                            }
                          }
                        },"详情"),
//                      h('span', {
//                        style: {
////                            display:"inline-block",
////                            width:"50px",
//                          color:"#0076e8",
//                          cursor:"pointer"
//                        },
//                        on: {
//                          click: () => {
//                            this.curveok(params.row.pfpPkwKeywords);
//                          }
//                        }
//                      },"日曲线"),
                      ],);
                    }
                  }
                },
                {
                  title: '搜索热度',
                  key: 'pfpPkwSearchCount',
                  align: 'center',
                  "width":150,
                  sortable:"custom",
                  render: (h, params) => {
                    var imgurl;
                    if(params.row.pfpPkwSearchCount==0){
                      imgurl=require("../../common/images/hot01.png");
                    }
                    if(params.row.pfpPkwSearchCount==1){
                      imgurl=require("../../common/images/hot02.png");
                    }
                    if(params.row.pfpPkwSearchCount==2){
                      imgurl=require("../../common/images/hot03.png");
                    }
                    if(params.row.pfpPkwSearchCount==3){
                      imgurl=require("../../common/images/hot04.png");
                    }
                    if(params.row.pfpPkwSearchCount==4){
                      imgurl=require("../../common/images/hot05.png");
                    }
                    if(params.row.pfpPkwSearchCount==5){
                      imgurl=require("../../common/images/hot06.png");
                    }
                    if(params.row.pfpPkwSearchCount==6){
                      imgurl=require("../../common/images/hot07.png");
                    }
                    return h('img', {
                      attrs:{
                        src:imgurl
                      },
                      style:{
                        width:'80px',
                        verticalAlign:'middle'
                      }
                    },);
                  }
                },

                {
                  title: '购买热度',
                  key: 'pfpPkwPurchaseHot',
                  align: 'center',
                  "width":150,
                  sortable:"custom",
                  render: (h, params) => {
                    var imgurl;
                    if(params.row.pfpPkwPurchaseHot==0){
                      imgurl=require("../../common/images/hot01.png");
                    }
                    if(params.row.pfpPkwPurchaseHot==1){
                      imgurl=require("../../common/images/hot02.png");
                    }
                    if(params.row.pfpPkwPurchaseHot==2){
                      imgurl=require("../../common/images/hot03.png");
                    }
                    if(params.row.pfpPkwPurchaseHot==3){
                      imgurl=require("../../common/images/hot04.png");
                    }
                    if(params.row.pfpPkwPurchaseHot==4){
                      imgurl=require("../../common/images/hot05.png");
                    }
                    if(params.row.pfpPkwPurchaseHot==5){
                      imgurl=require("../../common/images/hot06.png");
                    }
                    if(params.row.pfpPkwPurchaseHot==6){
                      imgurl=require("../../common/images/hot07.png");
                    }
                    return h('img', {
                      attrs:{
                        src:imgurl
                      },
                      style:{
                        width:'80px',
                        verticalAlign:'middle'
                      }
                    },);
                  }
                },
                {
                  title: '所属策略',
                  key: 'pfpPkwStrategy',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '优先推广',
                  key: 'isPrefer',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '优先推广其他产品',
                  "width": 150,
                  key: 'isOtherPrefer',
                  align: 'center',
                  render: (h, params) => {
                    if(params.row.isOtherPrefer=='是'){
                      return h('div', {
                        style:{
                          color:"#0076e8",
                        },
                      },"是");
                    }else {
                        return h('div', {},"否");
                    }
                  }
                },
              ],
              datalist:[],

              totalCount:0,
              current:1,
              limit:15,
              offset:0,
              sortType:"",
              order:"",

//              曲线
              curve:false,
              curvetile:"",

//              查询关键词前5
              firstfive:false,
              front:[],

//              选择策略
              choose:false,
              disabledGroup:"",
              grouplist:[],
              kwId:[],

//              出价前五

            }
        },
        mounted(){
            this.tableHeight =this.$refs.mainx.offsetHeight -190;
            this.prodname=this.$route.params.name;
            this.prodid=this.$route.params.dataObj;
            this.init();

        },
        methods: {
            init(){
              this.loading=true;
              this.api.showProductKeysdata.data({reqData:{bepProductId:this.prodid,keywords:this.value,bepSubject:this.prodname,limit:this.limit,offset:this.offset,order:this.order,sort:this.sortType}}).then((res)=>{
                this.loading=false;
                if(res.data.status=="200"){
                    this.keysId=[];
                   this.datalist=res.data.rows;
                   this.totalCount=res.data.total
                }
              })
            },

            pullstatus(sta){
              if(this.keysId.length>0){
                var text=this.keysId.join(",");
                this.api.updateExplos.data({reqData:{bepProductId:this.prodid,keywordsId:text,status:sta}}).then((res)=>{
                  if(res.data.status=="200"){
                    this.$Notice.success({
                      title:'成功',
                    });
                    this.init();
                  }
                })
              }else {
                this.$Notice.warning({
                  title: '请选择关键词',
                });
              }
            },



          handleSelectdata(selection){
                this.keysId=[];
                this.kwId=[];
                console.log(selection);
                for(var i=0;i<selection.length;i++){
                    this.keysId.push(selection[i].pfpAlibabaKeyId);
                    this.kwId.push(selection[i].pfpPkwId);
                }
                console.log(this.keysId);
          },
          changePage(currentPage){
            this.offset = (currentPage-1)*this.limit;
            this.current = currentPage;
            this.init();
          },
          changePageSize(pageSize){
            this.limit = pageSize;
            this.init();
          },
          sortChange(column){
            console.log(column);
            this.sortType = column.key;
            console.log(this.sortType);
            this.order=column.order;
            if(this.order=="normal"){
              this.order="";
              this.sortType='';
            }
            this.$nextTick(function () {
              this.init();
            })
          },

          //          日曲线
          curveok(val){
            this.curve=true;
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            this.api.PriceTrade.data({reqData:{pptKeywords:val}}).then((res) => {
              if(res.data.status==200){
                var max=[];
                var min=[];
                for(var i=0;i<res.data.mapInfo.maxList.length;i++){
                  max.push(res.data.mapInfo.maxList[i].pptPrice);
                  min.push(res.data.mapInfo.minList[i].pptPrice);
                }
                let option = {
                  color:['#0076e8',"#000000"],
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data:['最大值','最小值']
                  },
                  xAxis: {
                    type: 'category',
                    data:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      name:"最大值",
                      data: max,
                      type: 'line',
                      smooth: true
                    },
                    {
                      name:"最小值",
                      data: min,
                      type: 'line',
                      smooth: true
                    }
                  ]
                };
                myChart.setOption(option)
              }
            });
          },
          //          查询关键词前5
          PriceList(val){
            this.firstfive=true;
            this.curvetile=val;
            this.api.showRank.find({reqData:{pfpPkwKeywords:val}}).then((res) => {
              if (res.data.status == 200) {
                this.front=res.data.rows;
              }
            })
          },
//          所有策略
          allgroup(){
            if(this.keysId.length>0){
              this.choose=true;
              this.disabledGroup="";
              this.api.AllStrategyList.data().then((res) => {
                if (res.data.status == 200) {
                  this.grouplist=res.data.rows;
                }
              })
            }else {
              this.$Notice.warning({
                title: '请选择关键词',
              });
            }

          },

//          策略加词
          increase(){
              var text=this.kwId.join(",");
              this.api.hotaddKeywordsToStrat.data({reqData:{keywordIds:text,stId:this.disabledGroup}}).then((res) => {
                if (res.data.status == 200) {
                  this.$Notice.success({
                    title: '添加成功',
                  });
                  this.init();
                }
              })
          },
//          搜索
          search(){
            this.totalCount=0;
            this.current=1;
            this.limit=15;
            this.offset=0;
            this.init();
          },


        }
    }
</script>
<style scoped>
  .huitu{
    width: 500px;
    height:300px;
    margin:0 auto;

  }


  .groupx{
    border:1px solid #DDDDDD;
    height:360px;
    overflow: auto;
  }
  .groupx>p,.curvecss ul>li:first-child{
    height: 40px;
    line-height: 40px;
    background:#ebf0f5;
  }
  .groupx ul>li{
    height: 40px;
    line-height: 40px;
    border-bottom:1px solid #DDDDDD;
  }
  .groupx>p>span,.groupx ul>li>span{
    display: inline-block;
    width:11%;
    text-align: center;
  }
  .groupx>p>span:nth-child(2),.groupx ul>li>span:nth-child(2){
    width:19%;
  }
  .curvecss ul>li{
    height: 40px;
    line-height: 40px;
  }
  .curvecss ul>li>span{
    display: inline-block;
    width:19.4%;
    text-align: center;
  }
  .curvecss{
    border: 1px solid #DDDDDD;
  }
</style>
