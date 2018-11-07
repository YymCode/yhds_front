<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
      <Breadcrumb-item href="/p4p/thesaurus">词库管理</Breadcrumb-item>
      <Breadcrumb-item >新建关键词</Breadcrumb-item>
    </Breadcrumb>
    <div class="main">
      <div>
        <div class="head">加词清单（{{tabelwrod.length}}/500）</div>
        <div class="headsele">
          <Select v-model="modsele" style="width:150px">
            <Option v-for="item in cityList" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="conten">
          <ul>
            <li v-for="(item,index) in tabelwrod">
              <span>{{item}}</span>
              <span @click="deletabel(index)"><Icon type="close"></Icon></span>
            </li>
          </ul>
        </div>
        <div class="wrlod">
          <p>已选择{{tabelwrod.length}}个关键词</p>
          <Button :loading="bthloading" type="ghost" shape="circle" @click="Keywords()">完成</Button>
        </div>
      </div>

      <div>
        <Tabs :value="tabName" class="tabdiv">
          <TabPane label="综合推荐" name="name1" >
            <div class="search_tiele">
              <div>
                <Input v-model="search" placeholder="请输入关键词" style="width:200px"></Input>
                <Button type="primary" shape="circle" icon="ios-search" style="margin: 0 15px" @click="searchclick()">搜索</Button>
                <Checkbox v-model="single">精准查找</Checkbox>

              </div>

              <div>
                <Select v-model="sedata2" style="width:140px" placeholder="推广评分" @on-change="selechange()">
                  <Option v-for="item in options2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>

                <Button type="primary" shape="circle" class="btncir" @click="addnew">添加</Button>
              </div>

            </div>
            <div class="search_body">
              <Table  :loading="loading"  border stripe ref="selection" :columns="columns" :data="tabeldata"  @on-selection-change="tabelchange" @on-sort-change="sortChange"></Table>
            </div>
            <div>
              <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
            </div>
          </TabPane>

          <TabPane label="待添加关键词" name="name2">
            <div class="search_tiele">
              <div>
                <Input v-model="search2" placeholder="请输入关键词" style="width:200px"></Input>
                <Button type="primary" shape="circle" icon="ios-search" style="margin: 0 15px" @click="sousuo()">搜索</Button>
                <Checkbox v-model="single2">精准查找</Checkbox>
              </div>
              <div>
                <Select v-model="sedata3" style="width:140px" @on-change="mychange()">
                  <Option v-for="item in options3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button type="primary" shape="circle" class="btncir" @click="addnew">添加</Button>
              </div>

            </div>
            <div class="search_body">
              <Table  :loading="loading2"  border stripe ref="selection2" :columns="columns2" :data="tabeldata2"  @on-selection-change="tabelchange2" @on-sort-change="sortChange2"></Table>
            </div>
            <div>
              <Page v-if="totalCount2" :total="totalCount2" placement="top" :current="current2" :page-size="limit2" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage2" @on-page-size-change="changePageSize2"></Page>
            </div>
          </TabPane>
        </Tabs>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        bthloading:false,

        tabName:'name1',
        modsele:"",
        cityList:[],

//        搜索
        search:"",
        single:false,


        sedata2:'',

        options2:[
          {
            value: '',
            label: '推广评分'
          },
          {
            value: '0',
            label: '0星'
          },
          {
            value: '1',
            label: '1星'
          },
          {
            value: '2',
            label: '2星'
          },
          {
            value: '3',
            label: '3星'
          },
          {
            value: '4',
            label: '4星'
          },
          {
            value: '5',
            label: '5星'
          }
        ],
//        表格
        loading:false,
        columns:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '关键词',
            key: 'word',
            align: 'center',
            sortable:"custom",
          },
          {
            title: '推广评分',
            key: 'qsStar',
            align: 'center',
            sortable:"custom",
            render: (h, params) => {
              var imgurl=require("../../common/images/sta01.png");
              if(params.row.qsStar==0){
                imgurl=require("../../common/images/sta01.png");
              }
              if(params.row.qsStar==1){
                imgurl=require("../../common/images/sta02.png");
              }
              if(params.row.qsStar==2){
                imgurl=require("../../common/images/sta03.png");
              }
              if(params.row.qsStar==3){
                imgurl=require("../../common/images/sta04.png");
              }
              if(params.row.qsStar==4){
                imgurl=require("../../common/images/sta05.png");
              }
              if(params.row.qsStar==5){
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
            title: '搜索热度',
            key: 'searchCount',
            align: 'center',
            sortable:"custom",
            render: (h, params) => {
              var imgurl=require("../../common/images/hot02.png");
              if(params.row.searchCount==1){
                imgurl=require("../../common/images/hot02.png");
              }
              if(params.row.searchCount==2){
                imgurl=require("../../common/images/hot03.png");
              }
              if(params.row.searchCount==3){
                imgurl=require("../../common/images/hot04.png");
              }
              if(params.row.searchCount==4){
                imgurl=require("../../common/images/hot05.png");
              }
              if(params.row.searchCount==5){
                imgurl=require("../../common/images/hot06.png");
              }
              if(params.row.searchCount==6){
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
            key: 'buyCount',
            align: 'center',
            sortable:"custom",
            render: (h, params) => {
              var imgurl=require("../../common/images/hot02.png");
              if(params.row.buyCount==1){
                imgurl=require("../../common/images/hot02.png");
              }
              if(params.row.buyCount==2){
                imgurl=require("../../common/images/hot03.png");
              }
              if(params.row.buyCount==3){
                imgurl=require("../../common/images/hot04.png");
              }
              if(params.row.buyCount==4){
                imgurl=require("../../common/images/hot05.png");
              }
              if(params.row.buyCount==5){
                imgurl=require("../../common/images/hot06.png");
              }
              if(params.row.buyCount==6){
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
            title: '匹配产品数',
            key: 'matchCount',
            align: 'center',
          },
          {
            title: '低价',
            key: 'basePrice',
            align: 'center',

          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            sortable:"custom",
            render:(h, params) => {
              return h('span',this.formatTime(params.row.createTime))
            }
          },
        ],
        tabeldata:[],
        Technical:"",
        tabelwrod:[],

        //分页参数
        totalCount:0,
        current:1,
        limit:15,
        offset:0,

        sortType:'',
        order:"",

//        我的词库
        sedata3:'',
        options3:[],

        columns2:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '关键词',
            key: 'kwKeywords',
            sortable:'custom',
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
            title: '创建时间',
            key: 'createTime',
            sortable:'custom',
            align: 'center',
            render:(h, params) => {
              return h('span',this.formatTime(params.row.createTime))
            }
          }
        ],
        tabeldata2:[

        ],
        loading2:false,
        search2:"",
        single2:false,


        sortType2:'',
        order2:"",


        //分页参数
        totalCount2:0,
        current2:1,
        limit2:15,
        offset2:0,


        tabAnalysisType:"",
      }
    },
    created(){
    	if(this.$route.query.tabName){
    		this.tabName= this.$route.query.tabName
    	}
      if(this.$route.params.tabName){
        this.tabName= this.$route.params.tabName
      }
      if(this.$route.params.p4pName){
        this.tabName= this.$route.params.p4pName
      }
      if(this.$route.params.analysisType){
        this.tabAnalysisType= this.$route.params.analysisType
      }else {
        this.tabAnalysisType="";
      }
    },
    mounted(){
        this.grouping();
        this.initdata();
        this.thesaurus();
    },
    methods: {
//        综合推荐改变事件
      selechange(){
          this.totalCount=0;
          this.current=1;
          this.limit=15;
          this.offset=0;
          this.initdata();
      },
//      我的词库改变事件
      mychange(){
          this.totalCount2=0;
          this.current2=1;
          this.limit2=15;
          this.offset2=0;
          this.twoinit()
      },
//      搜索
      sousuo(){
        this.twoinit()
      },
//        分组
      grouping(){
        this.api.tabelAllGroup.del().then((res) => {
          if(res.data.status==200){
//            this.modsele=res.data.rows[0].name;
            this.modsele="请选择分组";


            var obj= {
                id: '请选择分组',
                name: '请选择分组'
            };
            this.cityList.push(obj);
            for(var i=0;i<res.data.rows.length;i++){
              this.cityList.push(res.data.rows[i])
            }

          }
        });
      },
      initdata(){
          var buer;
          if(this.single){
              buer=1
          }else {
              buer=0
          }
        this.api.Reckeywords.find({reqData:{keywords:this.search,isExactFind:buer,qsStar:this.sedata2,offset:this.offset,limit:this.limit,order:this.order,sort:this.sortType,}}).then((res) => {
          if(res.data.status==200){
             this.tabeldata=res.data.rows;
            this.totalCount = res.data.total;
          }
        });
      },
      formatTime(time){
        if(!time){
          return '-'
        }else{
          return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
        }
      },
      deletabel(index){
        this.tabelwrod.splice(index,1)
      },

      addnew(){
          if(this.tabelwrod.length>=500){
            this.$Notice.warning({
              title: '关键词数量超出限制',
            });
          }else {
          	var arr=[]
            for(var i=0;i<this.Technical.length;i++){
              if(this.Technical[i].word){
                if(this.Technical[i].word.length<64){
                	this.tabelwrod.push(this.Technical[i].word);
                	arr.push('')
                }
              }else {
              	if(this.Technical[i].kwKeywords.length<64){
              		this.tabelwrod.push(this.Technical[i].kwKeywords);
              		arr.push('')
              	}
              }
            }
            if(arr.length!=this.Technical.length){
            	this.$Notice.warning({
	              title: '提示',
	              desc:'有'+(this.Technical.length-arr.length)+'个词超过64字符，已被系统屏蔽。'
	            });
            }
            console.log(this.tabelwrod);
            this.tabelwrod =Array.from(new Set(this.tabelwrod));
          }

        this.$refs.selection.selectAll(false);
        this.$refs.selection2.selectAll(false);

      },
      Keywords(){
          if(this.tabelwrod.length==0){
            this.$Notice.info({
              title: '请选择关键词',
            });
          }else {
              if(this.modsele=="请选择分组"){
                this.$Notice.info({
                  title: '请选择分组',
                });
              }else {
                this.bthloading=true;
                var list=[];
                for(var i=0;i<this.tabelwrod.length;i++){
                  var obj={
                    keywords:this.tabelwrod[i],
//                  basePrice:this.tabelwrod[i].basePrice,
                    tagName:this.modsele,
                    analysisType:this.tabAnalysisType,
                  }
                  list.push(obj)
                }
                this.api.wordsToAd.find({reqData:list}).then((res) => {
                  this.bthloading=false;
                  if(res.data.status==200){
                    this.$Notice.success({
                      title: '添加成功',
                    });
                    this.tabelwrod=[];
                  }
                });
              }
          }

      },
      tabelchange(selection){
          console.log(selection);
          this.Technical=selection;
      },
      sortChange(column){
        this.sortType = column.key;
        console.log(this.sortType);
        this.order=column.order;
        if(this.order=="normal"){
          this.order="";
          this.sortType='';
        }
        this.$nextTick(function () {
          this.initdata()
        })
      },

      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
        this.initdata()
      },
      changePageSize(pageSize){
        this.limit = pageSize;
        this.initdata()
      },
      searchclick(){
        this.current=1,
        this.offset=0,
        this.initdata()
      },

//      我的词库
//      词库分组
      thesaurus(){
        this.api.group_Lexicon.find().then((res)=>{
          console.log(res);
          for(var i=0;i<res.data.rows.length;i++){
            var obj={
              value: res.data.rows[i].wgId,
              label: res.data.rows[i].wgName
            }
            this.options3.push(obj);
          }
          this.sedata3=res.data.rows[0].wgId;
          this.twoinit();
        })
      },
      tabelchange2(selection){
        console.log(selection);
        this.Technical=selection;
      },
      sortChange2(column){
        this.sortType2 = column.key;
        console.log(this.sortType2);
        this.order2=column.order;
        if(this.order2=="normal"){
          this.order2="";
          this.sortType2='';
        }
        this.$nextTick(function () {
          this.twoinit()
        })
      },
      twoinit(){
        var tt;
        if(this.single2){
            tt=1
        }else {
            tt=0
        }
        this.api.findMyKeyword.find({reqData:{tagIds:this.sedata3,isExactFind:tt,keywords:this.search2,sort:this.sortType2,order:this.order2,offset:this.offset2,limit:this.limit2}}).then((res) => {
          if(res.data.status==200){
              console.log(res.data.rows);
              this.tabeldata2=res.data.rows;
              this.totalCount2=res.data.total;
          }
        });
      },
      changePage2(currentPage){
        this.offset2 = (currentPage-1)*this.limit2;
        this.current2 = currentPage;
        this.twoinit();
      },
      changePageSize2(pageSize){
        this.limit2 = pageSize;
        this.twoinit();
      },
    }
  }
</script>
<style scoped>
  .ivu-tabs-content{
    height:calc(100% - 60px);
  }
  .btncir{
    padding:5px 23px;
    margin-left: 20px;
    border-color:#FFAA29;
    background: #FFAA29;
    color: #ffffff;
  }
  .conten li{
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
  .conten li>span:first-child{
    display: inline-block;
    width:70%;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .conten li>span:last-child{
    display: inline-block;
    width:20%;
    text-align: center;
  }
  .tabdiv{
    height:100%;
    overflow-y: auto;
  }
  .search_tiele{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .search_tiele>div:first-child{
    float: left;
  }
  .search_tiele>div:last-child{
    float: right;
  }
  .ivu-tabs-tabpane{
    padding:0 10px;
  }
  .conten{
    height:calc(100% - 185px);
    overflow-y: auto;
  }
  .headsele{
    text-align: center;
    padding: 10px 0;
  }
  .head{
    background: #ebf0f5;
    padding: 15px 10px;
    text-align: center;
    font-weight: bold;
  }
  .main>div{
    float: left;
    height:100%;
  }
  .main>div:first-child{
    width: 170px;
    margin-right:15px;
    border: 1px solid #dde3e8;
  }
  .main>div:last-child{
    width:calc(100% - 185px);
    border:1px solid #dde3e8;
  }
  .wrlod{
    text-align: center;
    border-top:1px solid #ebf0f5;
    padding: 10px 0;
  }
  .wrlod button{
    padding:5px 23px;
    margin-top: 10px;
    border-color:#FFAA29;
    background: #FFAA29;
    color: #ffffff;
  }
</style>
