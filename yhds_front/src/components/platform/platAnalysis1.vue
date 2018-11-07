<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/platformsAnalysis">平台分析</Breadcrumb-item>
      <Breadcrumb-item>产品分析器</Breadcrumb-item>
    </Breadcrumb>
    <div class="main">
      <div style="margin-bottom: 15px">
        <Input v-model="keyname" placeholder="请输入产品名称" style="width:200px" ></Input>
        <Button type="primary" shape="circle" style="margin:0 20px; padding: 8px 20px;" @click="initsearch">搜索</Button>
      </div>
      <div ref="tebdiv" style="height: calc(100% - 130px)" class="tebdivscroll">
        <Table  :loading="loading" :height="tableHeight" border stripe :columns="columns" :data="datalist"></Table>
      </div>
      <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit"  show-elevator  @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    </div>

    <Modal
      v-model="modalsta"
      title="P4P词覆盖"
      width="700px"
      :styles="{top: '50px'}"
      >
      <div>
        <p style="margin-bottom: 15px">
          <Input v-model="p4pkeyname" placeholder="请输入关键词" style="width:200px" ></Input>
          <Button type="primary" shape="circle" style="margin:0 20px; padding: 8px 20px;" @click="p4psearch">搜索</Button>
        </p>
        <div>
          <Table  :loading="p4ploading" height="500" border stripe :columns="p4pcolumns" :data="p4pdatalist"></Table>
        </div>
        <p>
          <Page v-if="p4ptotalCount" :total="p4ptotalCount" placement="top" :current="p4pcurrent" :page-size="p4plimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="p4pchangePage" @on-page-size-change="p4pchangePageSize"></Page>
        </p>
      </div>
      <div slot="footer"></div>
    </Modal>
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
    <!--产品词覆盖-->
    <Modal
      v-model="prodmode"
      title="产品词覆盖"
      width="700px"
      :styles="{top: '60px'}"
      >
      <div>
        <Table  :loading="prodloading" height="500" border stripe :columns="prodcolumns" :data="proddatalist"></Table>
        <Page v-if="prodtotalCount" :total="prodtotalCount" placement="top" :current="prodcurrent" :page-size="prodlimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="prodchangePage" @on-page-size-change="prodchangePageSize"></Page>
      </div>
      <div slot="footer"></div>
    </Modal>


    <!--更多产品关联词-->
    <Modal
      v-model="moremdel"
      title="关联更多关联词"
      width="600px"
      :styles="{top: '50px'}"
    >
      <div>
        <div style="margin-bottom: 15px">
          <Input v-model="morekeyname" placeholder="请输入关键词" style="width:200px" ></Input>
          <Button type="primary" shape="circle" style="margin:0 20px; padding: 8px 20px;" @click="moresearch">搜索</Button>
          <span style="color: #999999">(一次只能关联一个关键词)</span>
        </div>
        <div class="moreclass">
          <div>
            <p style="line-height: 46px;background: #ebf0f5; text-align: center">分组</p>
            <ul >
              <li :class="{gcolor:groupindex==index}" v-for="(item,index) in viewlist" @click="changeclass(item.wgId,index)" style="cursor: pointer">{{item.wgName}}</li>
            </ul>
          </div>
          <div>
            <Table  :loading="moreloading" height="450px" border stripe :columns="morecolumns" :data="moredatalist"></Table>
          </div>
        </div>
        <Page v-if="moretotalCount" :total="moretotalCount" placement="top" :current="morecurrent" :page-size="morelimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="morechangePage" @on-page-size-change="morechangePageSize"></Page>

      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          operation:"",//产品操作  产品ID

          p4pproId:"",
          keyname:"",
          tableHeight:580,
          loading:false,
          columns:[
            {
              title: '产品标题',
              key: 'productTitle',
              "width": 320,
              align: 'center',
            },
            {
              title: '总热度',
              "width": 140,
              key: 'searchHot',
              align: 'center',
            },
            {
              title: '总竞争度',
              "width": 150,
              key: 'companyCnt',
              align: 'center',
            },
            {
              title: '总橱窗数',
              "width": 150,
              key: 'showwinCnt',
              align: 'center',
            },
            {
              title: '产品覆盖词',
              "width": 150,
              key: 'keyCover',
              align: 'center',
              render: (h, params) => {
                return h('div', {
                  style:{
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.prodtiele=params.row.productTitle;
                      this.prodinit();
                    }
                  }
                },params.row.keyCover);
              }
            },
            {
              title: '产品操作',
              "width": 160,
              key: 'keyCover',
              align: 'center',
              render: (h, params) => {
                return h('div', {
                  style:{
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.operation=params.row.productId;
                      this.moretiele=params.row.productTitle;
                      this.moremdel=true;
                      this.morekwKeywordsStatus=true;
                      this.viewgrouping();
                      this.moreinit();
                    }
                  }
                },"增加产品覆盖词");
              }
            },
            {
              title: 'P4P覆盖词',
              "width": 120,
              key: 'p4pKeyCover',
              align: 'center',
              render: (h, params) => {
                return h('div', {
                  style:{
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.p4pdata=params.row.productTitle;
                      this.p4pproId=params.row.proId;
                      this.modalsta=true;
                      this.p4pinit();
                    }
                  }
                },params.row.p4pKeyCover);
              }
            },
            {
              title: 'P4P操作',
              key: 'productStatus',
              width:200,
              align: 'center',
              render: (h, params) => {
//                if(!params.row.ppId){
//                  return h('div',[
//                    h('span', {
//                      style: {
//                        display:"inline-block",
//                        width:"80px",
//                        color:"#0076e8",
//                        cursor:"pointer"
//                      },
//                      on:{
//                        click: () => {
//
//                        }
//                      }
//                    },"打造爆款"),
//                    h('span', {
//                      style: {
//                        display:"inline-block",
//                        width:"80px",
//                        color:"#0076e8",
//                        cursor:"pointer"
//                      },
//                      on:{
//                        click: () => {
//
//                        }
//                      }
//                    },)
//                  ]);
//                }
                if(params.row.status=="disabled"){
                  return h('div',[
                    h('span', {
                      style: {
                        display:"inline-block",
                        width:"80px",
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
//                          this.$router.push({
//                            path: 'hot',
//                            name: 'hot2',
//                            params: {
//                              dataObj:params.row.ppId,
//                              name:params.row.productTitle,
//                            }
//                          })
                        }
                      }
                    },),
                    h('span', {
                      style: {
                        display:"inline-block",
                        width:"80px",
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.getinfo(params.row.proId,"enabled")
                        }
                      }
                    },"产品推广")
                  ]);
                }
                if(params.row.status=="enabled"){
                  return h('div',[
                    h('span', {
                      style: {
                        display:"inline-block",
                        width:"80px",
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {

                          this.$router.push({
                            path: 'hot',
                            name: 'hot2',
                            params: {
                              dataObj:params.row.proId,
                              name:params.row.productTitle,
                            }
                          })
                        }
                      }
                    },"打造爆款"),
                    h('span', {
                      style: {
                        display:"inline-block",
                        width:"80px",
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.getinfo(params.row.proId,"disabled")
                        }
                      }
                    },"取消推广")
                  ]);
                }

              }
            },
            {
              title: '橱窗建议',
              key: 'keyCover',
              "width":180,
              align: 'center',
              render: (h, params) => {
                if(params.row.advice==1){
                  return h('div', {
                  },"建议设置为橱窗产品");
                }
                if(params.row.advice==2){
                  return h('div', {
                  },);
                }

              }
            },
          ],
          datalist:[],
          totalCount:0,
          current:1,
          limit:5,
          offset:0,
//          词覆盖
          p4pkeyname:"",
          modalsta:false,
          p4ploading:false,
          p4pcolumns:[
            {
              title: '关键词',
              key: 'pfpPkwKeywords',
              "width":200,
              align: 'center',
            },
            {
              title: '星级',
              key: 'pfpPkwQsStar',
              align: 'center',
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
              render: (h, params) => {
                return h('div', {
                  style:{
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.price=true;
                      this.lowprice=params.row.pfpPkwBasePrice;
                      this.wordsprice=params.row.pfpPkwKeywords;
                      this.pricevalue=params.row.pfpPkwPrice;
                      this.PriceList(params.row.pfpPkwKeywords)
                    }
                  }
                },params.row.pfpPkwPrice);

              }
            },
            {
              title: '排名',
              key: 'pfpPkwRankings',
              align: 'center',
              sortable:"custom",
              render: (h, params) => {
               if(params.row.pfpPkwRankings && params.row.pfpPkwRankings!=-1){
                 return h('div', {},params.row.pfpPkwRankings);
               }else {
                 return h('div', {},"其他位置");
               }

              }
            },
            {
              title: '优先推广',
              key: 'pfpPkwStatus',
              align: 'center',
              "width":160,
              sortable:"custom",
              render: (h, params) => {
                if(params.row.pfpPkwStatus=="N"){
                  return h('div',[
                    h('span', {
                      style: {
                        display:"inline-block",
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.pullstatus('Y',params.row.pfpAlibabaKeyId)
                        }
                      }
                    },"设置产品推广")
                  ]);
                }
                if(params.row.pfpPkwStatus=="Y"){
                  return h('div',[
                    h('span', {
                      style: {
                        display:"inline-block",
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.pullstatus('N',params.row.pfpAlibabaKeyId)
                        }
                      }
                    },"取消优先推广")
                  ]);
                }
              }
            },
          ],
          p4pdatalist:[],
          p4ptotalCount:0,
          p4pcurrent:1,
          p4plimit:15,
          p4poffset:0,

          p4psortType:"",
          p4porder:"",
          p4pdata:"",
//          修改价格
          price:false,
          pricevalue:"",
          wordsprice:"",
          lowprice:"",
          money:"",
          front:[],
//          产品词覆盖
          prodmode:false,
          prodloading:false,
          prodcolumns:[
            {
              title: '关键词',
              key: 'keywords',
              align: 'center',
            },
            {
              title: '排名',
              key: 'ranking',
              "width": 200,
              align: 'center',
            },
          ],
          proddatalist:[],

          prodtotalCount:0,
          prodcurrent:1,
          prodlimit:15,
          prodoffset:0,
          prodtiele:"",
//          关联更多关联词
          moremdel:false,
          morekeyname:"",
          moreloading:false,

          moretotalCount:0,
          morecurrent:1,
          morelimit:15,
          moreoffset:0,
          moretiele:"",
          morekwId:'',
          morecolumns:[
            {
              title: '关键词',
              key: 'kwKeywords',
              align: 'center',
            },
            {
              title: '操作',
              key: 'kwKeywords',
              "width":150,
              align: 'center',
              render: (h, params) => {
                if(this.morekwKeywordsStatus){
                  return h('div', {
                    style:{
                      color:"#0076e8",
                      cursor:"pointer"
                    },
                    on:{
                      click: () => {
                        this.morekwKeywordsStatus=false;
                        this.morekwId=params.row.kwKeywords;
                        this.associated()
                      }
                    }
                  },"关联");
                }else {
                  return h('div', {
                    style:{
                      color:"#ccc",
                    },
                    on:{
                      click: () => {

                      }
                    }
                  },"关联");
                }
              }
            },

          ],
          moredatalist:[],
          morekwKeywordsStatus:true,

          viewlist:[],
          groupingId:"",
          groupindex:0,
        }
      },
      mounted(){
        this.tableHeight =this.$refs.tebdiv.offsetHeight;
        this.init();
        this.viewgrouping();
      },
      methods: {

//        设置优先推广
        pullstatus(sta,id){
          this.api.updateExplos.data({reqData:{bepProductId:this.p4pproId,keywordsId:id,status:sta}}).then((res)=>{
            if(res.data.status=="200"){
              this.$Notice.success({
                title:'成功',
              });
              this.p4pinit();
            }
          })
        },

        viewgrouping(){
          this.api.group_Lexicon.find().then((res) => {
            if(res.data.status==200){
              console.log(res.data.rows);
              this.viewlist=res.data.rows;
              this.moretotalCount=0;
              this.morecurrent=1;
              this.morelimit=15;
              this.moreoffset=0;
              this.groupindex=0,
              this.groupingId=this.viewlist[0].wgId;
//              this.init();
            }
          });
        },
        init(){
          this.loading=true;
          this.api.showProductListData.data({reqData:{productTitle:this.keyname,offset:this.offset,limit:this.limit}}).then((res)=>{
            this.loading=false;
            if(res.data.status=="200"){
              this.datalist=res.data.rows;
              console.log(this.datalist);
              this.totalCount=res.data.total;
            }
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
        initsearch(){
          this.totalCount=0;
          this.current=1;
          this.limit=5;
          this.offset=0;
          this. init();
        },
//        p4p词覆盖
        p4pinit(){
          this.p4ploading=true;
          this.api.showP4pCoverData.data({reqData:{proId:this.p4pproId,productTitle:this.p4pdata,sort:this.p4psortType,order:this.p4porder,keywords:this.p4pkeyname,offset:this.p4poffset,limit:this.p4plimit}}).then((res)=>{
            this.p4ploading=false;
            if(res.data.status=="200"){
              this.p4pdatalist=res.data.rows;
              this.p4ptotalCount=res.data.total;
            }
          })
        },
        p4pchangePage(currentPage){
          this.p4poffset = (currentPage-1)*this.p4plimit;
          this.p4pcurrent = currentPage;
          this.p4pinit()
        },
        p4pchangePageSize(pageSize){
          this.p4plimit = pageSize;
          this.p4pinit()
        },
        p4psearch(){
          this.p4ptotalCount=0;
          this.p4pcurrent=1;
          this.p4plimit=15;
          this.p4poffset=0;
          this.p4pinit()
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
                this.p4pinit()
              }
            })
          }


        },
        //          查询关键词前5
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

//        产品词覆盖
        prodinit(){
            this.prodloading=true;
          this.prodmode=true;
          this.api.showProductCoverdata.data({reqData:{productTitle:this.prodtiele,offset:this.prodoffset,limit:this.prodlimit}}).then((res) => {
            if (res.data.status == 200) {
                this.proddatalist=res.data.rows;
              this.prodtotalCount=res.data.total;
              this.prodloading=false
            }
          })
        },

        prodchangePage(currentPage){
          this.prodoffset = (currentPage-1)*this.prodlimit;
          this.prodcurrent = currentPage;
          this.prodinit()
        },
        prodchangePageSize(pageSize){

          this.prodlimit = pageSize;
          this.prodinit()
        },

//        关联更多关键词
        moreinit(){
          this.moreloading=true;
          this.api.showConnectData.data({reqData:{wgId:this.groupingId,productTitle:this.moretiele,offset:this.moreoffset,limit:this.morelimit,keywords:this.morekeyname,}}).then((res) => {
            this.moreloading=false;
            if (res.data.status == 200) {
              this.moredatalist=res.data.rows;
              this.moretotalCount=res.data.total;
            }
          })
        },
        morechangePage(currentPage){
          this.moreoffset = (currentPage-1)*this.morelimit;
          this.morecurrent = currentPage;
          this.moreinit()
        },
        morechangePageSize(pageSize){
          this.morelimit = pageSize;
          this.moreinit()
        },

        moresearch(){
          this.moretotalCount=0;
          this.morecurrent=1;
          this.morelimit=15;
          this.moreoffset=0;
          this.moreinit();
        },

        changeclass(id,i){
          this.groupingId=id;
          this.groupindex=i;
          this.moretotalCount=0;
          this.morecurrent=1;
          this.morelimit=15;
          this.moreoffset=0;
          this.moreinit()
        },

//    关联
        associated(){
          this.api.cognateProductData.data({reqData:{productId:this.operation,keywords1:this.morekwId,}}).then((res) => {
            if (res.data.status == 200) {
              this.$Notice.success({
                title:res.data.info,
              });
            }
          })
        },

//        推广状态
        getinfo(id,sta){
          this.api.tionStatus.find({reqData:{analysisType:"",productIds:id,status:sta,groupId:""}}).then((res)=>{
            if(res.data.status=="200"){
              this.$Notice.info({
                title:"修改成功",
              });
              this.init()
            }
          })


//          this.api.updateProductStatusData.data({reqData:{productIds:id,status:sta,}}).then((res) => {
//            if (res.data.status == 200) {
//              this.$Notice.success({
//                title: '修改成功',
//              });
//              this.init()
//            }
//          })
        },
      }
    }
</script>
<style scoped>
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

  .moreclass{
    height: 450px;
    width: 100%
  }
  .moreclass>div{
    float: left;
  }
  .moreclass>div:first-child{
    width:30%;
    height:100%;
    border: 1px solid #DDDDDD;
    border-right:none;
  }
  .moreclass>div:last-child{
    width:70%;
    height:100%;
  }
  .gcolor{
    color: #0078f0;
  }
  .moreclass ul{
    height:calc(100% - 46px);
    overflow: auto;
  }
  .moreclass li{
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #DDDDDD;
  }
</style>
