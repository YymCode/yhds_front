<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/platformsAnalysis">平台分析</Breadcrumb-item>
      <Breadcrumb-item>关键词分析器</Breadcrumb-item>
    </Breadcrumb>
    <div class="main">
      <div class="firstline">
        <Input v-model="keyname" placeholder="请输入关键词" style="width:200px;margin-right: 20px;" ></Input>

        <Select v-model="groupingId" placeholder="请选择分组" style="width:170px;margin-right: 20px;" @on-change="indexChange">
          <Option v-for="item in viewlist" :value="item.wgId" :key="item.value">{{item.wgName }}</Option>
        </Select>

        <Button type="primary" shape="circle" style="margin:0 20px; padding: 8px 20px;" @click="search">搜索</Button>
        <p>

          <Button type="primary" shape="circle" style="margin:0 20px; padding: 8px 20px;" @click="again">产品重发</Button>
          <!--<Button type="primary" shape="circle" style="margin:0 20px; padding: 8px 20px; background:#F57201; border-color: #F57201" >橱窗设置</Button>-->
        </p>
      </div>
      <div class="gfenzu" ref="maing">
        <!--<div>-->
          <!--<p style="background: #ebf0f5;text-align: center;line-height: 40px">分组列表</p>-->
          <!--<ul>-->
            <!--<li v-for="(item,index) in viewlist" :class="{gcolor:groupindex==index}" @click="indexChange(item.wgId,index)">-->
              <!--{{item.wgName}}-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <div>
          <Table  :loading="loading" :height="tableHeight" border stripe :columns="columns" :data="datalist" @on-sort-change="sortChange" @on-selection-change="handleSelectdata"></Table>
        </div>
      </div>
      <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit"  show-elevator  @on-change="changePage" @on-page-size-change="changePageSize"></Page>


      <!--修改价格-->
      <Modal
        ref="price"
        v-model="price"
        title="修改价格"
        width="400"
        @on-ok="priceok"
        :styles="{top: '50px'}"
      >
        <div class="modprice">
          <p>关键词：{{wordsprice}}</p>
          <p>
            <span> 低价：¥{{lowprice}}</span>
            <span> 余额：¥{{money}}</span>
          </p>
          <p>
            <Input v-model="pricevalue"  style="width:230px;margin-right: 15px;"></Input>
            <Button type="primary"><a href="https://topranking.alibaba.com/index.htm?spm=a276j.9715717.topranking.1.6dac48b1UNUCcT" style="color: #ffffff">包月抢第一</a></Button>
          </p>
          <p>
            价格必须介于低价与余额之间<br>
            当日出价高于当日余额时，按当日余额进行排名
          </p>
          <div>
            <p>此刻进前五名所需最低价</p>
            <div>
              <p>
                <span>排名</span>
                <span  v-for="(item,index) in front">{{index+1}}</span>
              </p>
              <p>
                <span>出价</span>
                <span v-for="item in front" style="cursor: pointer" @click="replace(item)">{{item}}</span>
              </p>
            </div>
          </div>
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
            loading:false,
            tableHeight:580,
            keyname:"",
//            表格
            columns:[
              {
                type: 'selection',
                "width": 60,
                fixed: 'left',
                align: 'center'
              },
              {
                title: '关键词',
                key: 'kwKeywords',
                align: 'center',
                "width":200,
                sortable:"custom",
              },
              {
                title: '搜索热度',
                key: 'kwSearchHot',
                "width": 120,
                align: 'center',
                sortable:"custom",
              },
              {
                title: '竞争度',
                key: 'kwCompanyCnt',
                "width":120,
                align: 'center',
                sortable:"custom",
              },
              {
                title: '橱窗数',
                key: 'kwShowwinCnt',
                "width": 120,
                align: 'center',
                sortable:"custom",
              },
              {
                title: '自然排名',
                key: 'ranking',
                "width":150,
                align: 'center',
                sortable:"custom",
              },
              {
                title: '标题',
                key: 'subject',
                "width":150,
                align: 'center',
                sortable:"custom",
              },
              {
                title: '加入P4P推广',
                key: 'isInP4p',
                "width":150,
                align: 'center',
                sortable:"custom",
                render:(h,params)=>{
                  if(params.row.isInP4p=="未加入"){
                    return h('div', {
                      style:{
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.promoName=params.row.kwKeywords;
                          this.promotefun();
                        }
                      }
                    },params.row.isInP4p);
                  }else {
                    return h('div', {},params.row.isInP4p);
                  }
                }
              },
              {
                title: 'P4P排名',
                key: 'pfpPkwRankings',
                "width":150,
                align: 'center',
                sortable:"custom",
                render: (h, params) => {
                  if(params.row.pfpPkwRankings>0){
                    return h('div', {
                      style:{
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.price=true;
                          this.lowprice=params.row.pfpPkwBasePrice;
                          this.wordsprice=params.row.kwKeywords;
                          this.pricevalue=params.row.pfpPkwPrice;
                          this.PriceList(params.row.kwKeywords);
                        }
                      }
                    },params.row.pfpPkwRankings);
                  }
                  if(params.row.pfpPkwRankings<0){
                    return h('div', {
                      style:{

                      },
                      on:{
                        click: () => {

                        }
                      }
                    },"-");
                  }

                  if(!params.row.pfpPkwRankings && params.row.isInP4p!="未加入"){
                    return h('div', {
                      style:{
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.price=true;
                          this.lowprice=params.row.pfpPkwBasePrice;
                          this.wordsprice=params.row.kwKeywords;
                          this.pricevalue=params.row.pfpPkwPrice;
                          this.PriceList(params.row.kwKeywords)
                        }
                      }
                    },"其他位置");
                  }
                }
              },
              {
                title: '标题',
                key: 'p4pProductTitle',
                "width":150,
                align: 'center',
                sortable:"custom",
              },
              {
                title: 'P4P曝光量',
                key: 'pfpPkwImpressionCnt',
                "width":150,
                align: 'center',
                sortable:"custom",
              },
              {
                title: 'P4P点击量',
                key: 'pfpPkwClickCnt',
                "width":150,
                align: 'center',
                sortable:"custom",
              },
              {
                title: 'P4P点击率',
                key: 'pfpPkwClickCnt',
                "width":150,
                align: 'center',
                sortable:"custom",
                render: (h, params) => {
                    if(params.row.pfpPkwClickCnt){
                      return h('div', {},params.row.pfpPkwClickCnt+"%");
                    }

                }
              },
            ],
            datalist:[],
//            分页
            totalCount:0,
            current:1,
            limit:5,
            offset:0,

            sortType:null,
            order:"",

            viewlist:[],
            groupingId:"",
            groupindex:0,

            againdata:[],

//            修改价格
            price:false,
            lowprice:"",
            wordsprice:"",
            pricevalue:"",
            money:"",
            front:[],

//            加入推广
            promoName:"",
            promoteData:"",
            verpromote:"",
            promote:false,

          }
      },
      mounted(){
        this.tableHeight =this.$refs.maing.offsetHeight-30;
        this.viewgrouping();
      },
      methods: {

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
                this.viewgrouping();
              }
            });

          }

        },


        init(){
          this.loading=true;
          this.api.bizKeywordsExten.data({reqData:{kwKeywords:this.keyname,wgId:this.groupingId,sort:this.sortType,order:this.order,offset:this.offset,limit:this.limit}}).then((res)=>{
            this.loading=false;
            if(res.data.status=="200"){
              this.datalist=res.data.rows;
              this.totalCount=res.data.total
            }
          })
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
        changePage(currentPage){
          this.offset = (currentPage-1)*this.limit;
          this.current = currentPage;
          this.init();
        },
        changePageSize(pageSize){
          this.limit = pageSize;
          this.init();
        },

//        查看分组
        viewgrouping(){
          this.api.group_Lexicon.find().then((res) => {
            if(res.data.status==200){
              console.log(res.data.rows);
              this.viewlist=res.data.rows;

              this.init();
            }
          });
        },
        indexChange(){
          this.totalCount=0;
          this.current=1;
          this.limit=5;
          this.offset=0;
          this.init();
        },

        search(){
          this.totalCount=0;
          this.current=1;
          this.limit=5;
          this.offset=0;
          this.init()
        },

        handleSelectdata(selection){
          console.log(selection);
          this.againdata=selection;
        },

        again(){
          if(this.againdata.length>0){
             var id=[];
             for(var i=0;i<this.againdata.length;i++){
                 id.push(this.againdata[i].kwId);
             };

           console.log(id);
            this.$router.push({
              path: 'productRelease/batch',
              name: 'batch',
              params: {
                kwIds:id,
                type:4,
              }
            })
          }else {
            this.$Notice.warning({
              title: '请选择关键词',
            });
          }
        },


        PriceList(val){
          this.api.showRank.find({reqData:{pfpPkwKeywords:val}}).then((res) => {
            if (res.data.status == 200) {
              this.front=res.data.rows;
              this.balanceof();

            }
          })
        },
//        余额
        balanceof(){
          this.api.accountp4p.data().then((res) => {
            if(res.data.status==200){
              this.money=Number(res.data.mapInfo.budget)-Number(res.data.mapInfo.daycost)
//                this.word_money=res.data.rows[0];
            }
          })
        },
        //        修改价格
        replace(val){
          this.pricevalue=val;
        },
        priceok(){
          var pricenum=Number(this.pricevalue);
          var pricenum2=Number(this.lowprice);

          if(!this.pricevalue){
            this.$refs.price.visible = true;
            this.price = true;
            this.$Notice.warning({
              title: '请填写价格',
            });

            console.log(this.lowprice);
          }else if(pricenum<pricenum2){
            this.$refs.price.visible = true;
            this.price = true;
            this.$Notice.warning({
              title: '价格不能低于低价',
            });
          }else if(pricenum>this.money){
            this.$refs.price.visible = true;
            this.price = true;
            this.$Notice.warning({
              title: '价格超出余额',
            });
          }else {
            this.api.fyPrice.find({reqData:{pfpPkwKeywords:this.wordsprice,pfpPkwPrice:this.pricevalue}}).then((res) => {
              if (res.data.status == 200) {
                this.$Notice.success ({
                  title: '修改成功',
                });
                this.init()
              }
            })
          }


        },
      }
    }
</script>
<style scoped>
.firstline{
  height: 40px;
  width:100%;
  line-height: 40px;
  margin-bottom: 15px;
}
.firstline>p{
  float: right;
}
.gfenzu{
  width: 100%;
  height:calc(100% - 125px);
  overflow: hidden;
}
/*.gfenzu>div:first-child{*/
  /*float: left;*/
  /*width: 200px;*/
  /*border:1px solid #DDDDDD;*/
  /*margin-right:15px;*/
  /*height:100%;*/
/*}*/
.gfenzu>div{
 width: 100%;
}
.gfenzu ul{
  height:calc(100% - 40px);
  overflow: auto;
}
.gfenzu ul>li{
  border-bottom:1px solid #DDDDDD;
  line-height: 40px;
  text-align: center;
}
.gfenzu ul> .gcolor{
  color: #0078f0;
}


.modprice>div>div>p:first-child{
  background:#ebf0f5;
}
.modprice>div>div{
  border: 1px solid #ebf0f5;
}
.modprice>div>div>p span{
  display: inline-block;
  width:15%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.modprice>p{
  margin-bottom:15px;
}
.modprice>p:first-child,.modprice>p:nth-child(2){
  font-size: 16px;
}
.modprice>p:nth-child(2) span{
  margin-right: 40px;
}
.modprice>p:nth-child(4){
  color: #cccccc;
}

.promoteclass label{
  width:23%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  line-height: 30px;
}
</style>
