<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
      <Breadcrumb-item >报告</Breadcrumb-item>
    </Breadcrumb>

    <div class="main" >
      <Tabs value="AccountReport" @on-click="zhanhu">

        <TabPane label="账户报告" name="AccountReport">
          <div class="chekde">
            <div>
              <RadioGroup v-model="animal">
                <Radio label="曝光量" ></Radio>
                <Radio label="点击量" ></Radio>
                <Radio label="点击率" ></Radio>
                <Radio label="花费" ></Radio>
                <Radio label="平均点击花费" ></Radio>
                <Radio label="推广时长" ></Radio>
              </RadioGroup>
            </div>
            <div>
              <DatePicker type="date" placeholder="选择时间" style="width: 160px" :options="time" :value="timeval" :clearable="false" @on-change="initx"></DatePicker>
              <Select v-model="modelsele" style="width:140px" @on-change="initx()">
                <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="vasconten">
            <div id="myChart" :style="{height:'350px'}">
            </div>
          </div>

          <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="4"></Col>
            <Col span="6">
              <span>
                最高{{maxname}}
                <br>
                <span>
                 {{maxtiem}}
                </span>
              </span>
              <b>{{arrmax}}</b>
            </Col>
            <Col span="6">
              <span>
                最底{{maxname}}
                <br>
                <span>
                 {{mintiem}}
                </span>
              </span>
            <b>{{arrmin}}</b>
            </Col>
            <Col span="4"></Col>
          </Row>
        </TabPane >

        <TabPane label="月度报告" name="MonthReport" >
          <Table :loading="loading" border :columns="columns" :data="datalist" @on-sort-change="sortChange"></Table>
          <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </TabPane>

        <TabPane label="后台详情" name="BackstageDetails">
          <div style="text-align: right">
            <Button type="primary" shape="circle" class="my-btn" @click="exportclick">导出后台详情</Button>
          </div>
          <div style="margin-top: 10px;">
            <Table :loading="loading2" border stripe height="350" :columns="bgcolumns" :data="bgdata" @on-sort-change="bgsortChange"></Table>
          </div>
          <Page style="margin-top: 5px;" v-if="bgtotalCount" :total="bgtotalCount" placement="top" :current="bgcurrent" :page-size="bglimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="bgchangePage" @on-page-size-change="bgchangePageSize"></Page>
        </TabPane>


        <TabPane label="日消耗曲线" name="DayConsume">
          <div>
            <Select v-model="selelast" style="width:140px" @on-change="dayinit()">
              <Option v-for="item in citylast" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <DatePicker type="date" placeholder="选择时间" style="width: 160px" :options="time2" :value="timelast" :clearable="false" @on-change="dayinit"></DatePicker>
          </div>

          <div style="margin-top: 10px">
            <div id="myChart1" :style="{height:'380px'}">
            </div>
          </div>
        </TabPane>
      </Tabs>

      <Modal
        v-model="monthlist"
        title="查看详情"
        :styles="{top: '60px'}"
        width="1000"
        >
        <div style="padding: 10px 0; text-align: right">
          <Button type="primary" @click="monthexport">导出</Button>
        </div>
       <div>
         <Table :loading="monthloading" border stripe :columns="monthcolumns" :data="monthdatalist" @on-sort-change="monthsortChange"></Table>
         <Page  v-if="monthtotalCount" :total="monthtotalCount" placement="top" :current="monthcurrent" :page-size="monthlimit"  show-elevator  @on-change="monthchangePage" @on-page-size-change="monthchangePageSize"></Page>
       </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
//                单选框  账户报告
              animal:"曝光量",
              modelsele:'7',
              cityList:[
                {
                  value: '7',
                  label: '7天'
                },
                {
                  value: '30',
                  label: '一个月'
                },

              ],
              time: {
                disabledDate (date) {
                  return date && date.valueOf()> Date.now()-172800000 ;
                }
              },
              timeval:"",
              datatime:[],

              arrmin:"",
              arrmax:"",
              mintiem:'',
              maxtiem:'',

              maxname:"",
              tiele:" ",


//              月度报告
              loading:false,
              columns: [
                {
                  type: 'index',
                  title: '序号',
                  width: 80,
                  align: 'center'
                },
                {
                  title: '月份',
                  key: 'prmMonth',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '曝光量',
                  key: 'prmImpressionCnt',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '点击量',
                  key: 'prmClickCnt',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '点击率',
                  key: 'prmCtr',
                  align: 'center',
                  sortable:"custom",
                  render: (h, params) => {
                    return h('div', {
                    },params.row.prmCtr+"%");
                  }
                },
                {
                  title: '花费',
                  key: 'prmCost',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '平均点击花费',
                  key: 'prmClickCostAvg',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '在线时长',
                  key: 'prmOnlineTime',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '操作',
                  align: 'center',
                  sortable:"custom",
                  render: (h, params) => {
                    return h('div', {
                      style:{
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                            this.dataprmId=params.row.prmId;
                          this.monthshow();
                        }
                      }
                    },"查看详情");
                  }
                }
              ],
              datalist:[],
              //分页参数
              totalCount:0,
              current:1,
              limit:15,
              offset:0,

              order:"",
              sortType:'',

//              月度报告模态框
              monthlist:false,
              monthloading:false,
              monthtotalCount:0,
              monthcurrent:1,
              monthlimit:10,
              monthoffset:0,

              monthorder:"",
              monthsortType:'',

              monthcolumns:[
                {
                  type: 'index',
                  title: '序号',
                  width: 80,
                  align: 'center'
                },
                {
                  title: '日期',
                  key: 'prdDate',
                  align: 'center',
                  sortable:"custom",
//                  render:(h, params) => {
//                    return h('span',this.formatTime(params.row.createTime))
//                  }
                },
                {
                  title: '曝光量',
                  key: 'prdImpressionCnt',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '点击量',
                  key: 'prdClickCnt',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '点击率',
                  key: 'prdCtr',
                  align: 'center',
                  sortable:"custom",
                  render: (h, params) => {
                    return h('div', {
                    },params.row.prdCtr+"%");
                  }
                },
                {
                  title: '花费',
                  key: 'prdCost',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '平均点击花费',
                  key: 'prdClickCostAvg',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '推广时长',
                  key: 'prdOnlineTime',
                  align: 'center',
                  sortable:"custom",
                },
              ],
              monthdatalist:[],
              monthId:"",

              dataprmId:"",

//              后台详情
              loading2:false,
              bgcolumns:[
                {
                  type: 'index',
                  title: '序号',
                  "fixed": "left",
                  width: 80,
                  align: 'center'
                },
                {
                  title: '周期',
                  key: 'pbdStartTime',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                  render:(h, params) => {
                    return h('span',this.formatTime(params.row.pbdStartTime)+"-"+this.formatTime(params.row.pbdEndTime))
                  }
                },
                {
                  title: '等级',
                  key: 'pbdLevel',
                  width: 150,
                  align: 'center',
                  sortable:"custom",
                  render: (h, params) => {
                    return h('div', {
                    },params.row.pbdLevel);
                  }
                },
                {
                  title: '等级分',
                  key: 'pbdLevelScore',
                  width: 150,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: 'p4p曝光(日均)',
                  key: 'pbdImpressionCnt',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: 'p4p点击量(日均)',
                  key: 'pbdClickCnt',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: 'p4p点击率(日均)',
                  key: 'pbdCtr',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: 'p4p消耗(日均)',
                  key: 'pbdCost',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '平均点击花费(日均)',
                  key: 'pbdClickCostAvg',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '推广时长(日均)',
                  key: 'pbdOnlineTime',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '推广中的关键词数',
                  key: 'pbdP4pKeywordsCnt',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '三星以上关键词占比',
                  key: 'pbdThressStarProp',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '推广中的产品数',
                  key: 'pbdP4pProductCnt',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },
              ],
              bgdata:[],
              //分页参数
              bgtotalCount:0,
              bgcurrent:1,
              bglimit:15,
              bgoffset:0,

              bgorder:"",
              bgsortType:'',


//              日消耗曲线
              selelast:"7",
              citylast:[
                {
                  value: '7',
                  label: '7天'
                },
                {
                  value: '30',
                  label: '一个月'
                },

              ],
              time2: {
                disabledDate (date) {
                  return date && date.valueOf()> Date.now() ;
                }
              },
              timelast:"",

              xiaodata:{}

            }
        },
        mounted(){
          this.timeinit();
          this.timeinit2();
          this.initx();
          this.monthinit();
          this.bginit();
          this.dayinit();

          this.zhanhu("AccountReport")
        },
        methods: {
            zhanhu(name){
                console.log(name);
              this.api.updateTaskData.data({params:[name]}).then((res) => {
                if (res.data.status == 200) {
                }
              })

            },



//          账户报告

          initx(name){
              if(name){
                  this.timeval=name;
              }else {
                  this.timeval=this.timeval;
              }
              console.log(1111111111)
             if(this.tiele!=" "){
               this.tiele=this.tiele
             }else {
               this.tiele="impressionCnt";
               this.maxname="曝光量"
             }
             console.log( this.tiele);

            let myChart = this.$echarts.init(document.getElementById('myChart'));
             var data=[];
             var list=[];
            this.datatime=[];
             console.log(this.timeval);
            this.api.ReportData.find({reqData:{queryDays:this.modelsele,endDate:this.timeval}}).then((res) => {
              if (res.data.status == 200) {
                console.log(res.data.mapInfo.oldData);
                console.log(res.data.mapInfo.currentData);
//                console.log("xxxxxxxxxxxxx")
                for(var i=0; i<res.data.mapInfo.currentData.length;i++){
//                    console.log(res.data.mapInfo.currentData[i][this.tiele])
//                    console.log(res.data.mapInfo.oldData[i][this.tiele])
//                    console.log(i)
                  data.push(res.data.mapInfo.oldData[i][this.tiele]);
                  list.push(Number(res.data.mapInfo.currentData[i][this.tiele]));
                  this.datatime.push(res.data.mapInfo.currentData[i].statDate);
                }
                console.log(data);
                console.log(list);
                console.log(this.datatime);
                let option = {
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    top:'0%',
                    right:"5%",
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap:60,
                    data:[
                      {
                        name: '目前数据',
                        icon: 'rect',
                        textStyle: {
                          color: '#999999'
                        }
                      },
                      {
                        name: '软件使用前数据',
                        icon: 'rect',
                        textStyle: {
                          color: '#999999'
                        }
                      }]
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },

                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.datatime
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      name:'目前数据',
                      type:'line',
                      data:list,
                      lineStyle: {
                        normal: {
                          color: '#00A3F4',
                          width: 3,
                        }
                      },
                      itemStyle: {
                        normal: {
                          borderWidth: 3,
                          borderColor: '#00A3F4',
                          color: '#00A3F4'
                        }
                      }
                    },
                    {
                      name:'软件使用前数据',
                      type:'line',
                      data:data,
                      lineStyle: {
                        normal: {
                          color: '#dddddd',
                          width: 3,
                          type: 'dashed'
                        }
                      },
                      itemStyle: {
                        normal: {
                          borderWidth: 3,
                          borderColor: '#dddddd',
                          color: '#dddddd'
                        }
                      }
                    }
                  ]
                };
                myChart.setOption(option);

                this.min(list);
                this.max(list);
              }
            });
          },
          timeinit(){
            var n = 2;
            var d = new Date();
            var year = d.getFullYear();
            var mon=d.getMonth()+1;
            var day=d.getDate();
            if(day <= n){
              if(mon>1) {
                mon=mon-1;
              }
              else {
                year = year-1;
                mon = 12;
              }
            }
            d.setDate(d.getDate()-n);
            year = d.getFullYear();
            mon=d.getMonth()+1;
            day=d.getDate();
            this.timeval = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
            console.log(this.timeval);
          },
          timeinit2(){
            var n = 0;
            var d = new Date();
            var year = d.getFullYear();
            var mon=d.getMonth()+1;
            var day=d.getDate();
            if(day <= n){
              if(mon>1) {
                mon=mon-1;
              }
              else {
                year = year-1;
                mon = 12;
              }
            }
            d.setDate(d.getDate()-n);
            year = d.getFullYear();
            mon=d.getMonth()+1;
            day=d.getDate();
            this.timelast = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
            console.log(this.timelast);
          },

//          最小值
          min(arr) {
            var index=0;
            var min = arr[0];
            var len = arr.length;
            for (var i = 1; i < len; i++){
              if (arr[i] < min){
                index=i
                min = arr[i];

              }
              this.arrmin = min;
              this.mintiem=this.datatime[index]
            }
          },
//        最大值
          max(arr) {
            var index=0;
            var max = arr[0];
            for(var i=1;i<arr.length;i++){
              if(max<arr[i]){
                index=i
                max=arr[i];

              };
              this.maxtiem=this.datatime[index];
              this.arrmax = max;
            }
          },

//          月度报告
          monthinit(){
            this.loading=true;
            this.api.MonthReport.find({reqData:{sort:this.sortType,order:this.order,offset:this.offset,limit:this.limit,}}).then((res) => {
              this.loading=false;
              if (res.data.status == 200) {
                  this.datalist=res.data.rows;
                  this.totalCount=res.data.total;
              }
            })
          },
          changePage(currentPage){
            this.offset = (currentPage-1)*this.limit;
            this.current = currentPage;
            this.monthinit();
          },
          changePageSize(pageSize){
            this.limit = pageSize;
            this.monthinit();
          },
          sortChange(column){
            console.log(column)
            this.sortType = column.key;
            console.log(this.sortType);
            this.order=column.order;
            if(this.order=="normal"){
              this.order="";
              this.sortType='';
            }
            this.$nextTick(function () {
              this.monthinit();
            })
          },

          monthshow(id){
            this.monthlist=true;
            this.monthloct(id);
            this.monthId=id;
          },
          monthloct(){
            this.monthloading=true;
            this.api.ReportDetails.find({reqData:{sort:this.monthsortType,order:this.monthorder,offset:this.monthoffset,limit:this.monthlimit,prmId:this.dataprmId,}}).then((res) => {
              this.monthloading=false;
              if (res.data.status == 200) {
                this.monthdatalist=res.data.rows;
                this.monthtotalCount=res.data.total;
              }
            })

          },

          monthexport(){
            window.location.href=process.env.API_ROOT+'/alibaba/p4PReportData/exportMonthReportData/'+this.dataprmId
          },

          monthchangePage(currentPage){
            this.monthoffset = (currentPage-1)*this.monthlimit;
            this.monthcurrent = currentPage;
            this.monthloct();
          },
          monthchangePageSize(pageSize){
            this.monthlimit = pageSize;
            this.monthloct();
          },
          monthsortChange(column){
            console.log(column);
            this.monthsortType = column.key;
            console.log(this.monthsortType);
            this.monthorder=column.order;
            if(this.monthorder=="normal"){
              this.monthorder="";
              this.monthsortType='';
            }
            this.$nextTick(function () {
              this.monthloct();
            })
          },


//          后台详情
          bginit(){
            this.api.BackReport.find({reqData:{sort:this.bgsortType,order:this.bgorder,offset:this.bgoffset,limit:this.bglimit}}).then((res) => {
              this.loading2=false;
              if (res.data.status == 200) {
                this.bgdata=res.data.rows;
                this.bgtotalCount=res.data.total;
              }
            })
          },
          bgchangePage(currentPage){
            this.bgoffset = (currentPage-1)*this.bglimit;
            this.bgcurrent = currentPage;
            this.bginit();
          },
          bgchangePageSize(pageSize){
            this.bglimit = pageSize;
            this.bginit();
          },
          bgsortChange(column){
            this.bgsortType = column.key;
            this.bgorder=column.order;
            if(this.bgorder=="normal"){
              this.bgorder="";
              this.bgsortType='';
            }
            this.$nextTick(function () {
              this.bginit();
            })

          },
          formatTime(time){
            if(!time){
              return '-'
            }else{
              return this.util.formatDate(new Date(time),'yyyy-MM-dd')
            }
          },

          exportclick(){
            window.location.href=process.env.API_ROOT+'/alibaba/p4PReportData/exportBackReportData'
          },

//          日消耗曲线
          dayinit(name){
              if(name){
                this.timelast=name;
              }else {
                this.timelast=this.timelast;
              }
//              this.timelast
            let myChart = this.$echarts.init(document.getElementById('myChart1'));

            this.api.AccountDailyCost.find({reqData:{queryDays:this.selelast,endDate:this.timelast}}).then((res) => {
              if (res.data.status == 200) {
                  console.log(res);
                  this.xiaodata=res.data.mapInfo;
                  var data= [];
                  var tiem=[];
                  var list=[];
                  var list2=[];

                  console.log("我曹");
                  for(var i in this.xiaodata){
                    tiem.push(i);
                    list=[];

                    var obj={
                        name:i,
                        type:'line',
                        data:[]
                    };
                    for (var t=0;t<this.xiaodata[i].length;t++){
                      list.push(this.xiaodata[i][t].pdcTime);

                      obj.data.push(parseInt(this.xiaodata[i][t].pdcCost))
                    }
                    if(list.length>0){
                      list2=list;
                      console.log(list2)
                    }
                    console.log(list);
                    data.push(obj);
                  }

                  console.log(data)
                let option = {
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 5,
                    top: 10,
                    bottom: 20,
                    data:tiem
                  },
                  grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                  },

                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:list2
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: data
                };
                myChart.setOption(option,true);
              }
            });

          },
        },
      watch:{
        animal(){
          var tiele;
          if(this.animal=='曝光量'){
            this.tiele='impressionCnt'
            this.maxname="曝光量"
          }
          if(this.animal=='点击量'){
            this.tiele='clickCnt'
            this.maxname="点击量"
          }
          if(this.animal=='点击率'){
            this.tiele='ctr'
            this.maxname="点击率"
          }
          if(this.animal=='花费'){
            this.tiele='cost'
            this.maxname="花费"
          }
          if(this.animal=='平均点击花费'){
            this.tiele='clickCostAvg'
            this.maxname="平均点击花费"
          }
          if(this.animal=='推广时长'){
            this.tiele='onlineTime'
            this.maxname="推广时长"
          }
          this.initx();
        },
      }
    }
</script>
<style scoped>
  .main{
    padding:0;
  }
  .chekde{
    overflow: hidden;
    height: 40px;
    line-height: 40px;
  }
  .chekde label{
    margin-right: 15px;
  }
  .chekde>div:first-child{
    float: left;
  }
  .chekde>div:last-child{
    float: right;
  }
  .vasconten{
    padding-top:15px;

  }
  .code-row-bg span{
    display: inline-block;
  }
  .code-row-bg>div>span{
    font-size: 16px;
    font-weight: 400;
    vertical-align: middle;
    margin-right: 8px;
    text-align: center;
  }
  .code-row-bg>div>span>span{
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  .code-row-bg>div>b{
    font-size: 30px;
    font-weight:500;
  }
</style>
