<template>
  <div class="content-wrap">
    <div class="slide">
      <ul class="nav">
        <li>
          <span class="tit">数据管家</span>
          <ul class="nav-item">
          <router-link class="nav-list" tag="li"  to="/dataManager"><span
            class="iconfont icon-digital"></span>数据管家
          </router-link>
        </ul>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="full-height">
        <Breadcrumb separator=">">
          <Breadcrumb-item>数据管家</Breadcrumb-item>
        </Breadcrumb>

        <div class="main" style="overflow: auto" ref="main">
          <div class="box">
            <div class="tit">PK情况</div>
            <div class="map-box">
              <div id="map1" class="map"></div>
              <div id="map2" class="map"></div>
              <div id="map3" class="map"></div>
              <div id="map4" class="map"></div>
              <div id="map5" class="map"></div>
            </div>
          </div>
          <div class="box mt_20">
            <div class="tit">任务进度</div>
            <ul class="jzrwli">
              <li>
                <span class="jz-title bkimg1">建站任务</span>
                <div v-for="item in taskList[0]" class="jz-rwbox" :title="item.taskInfo.bstTitle">
                  <div class="jz-status" :class="{bg1:item.utStatus==1,bg2:item.utStatus==2,bg31:item.utStatus==3}">{{item.utStatus | taskStatus}}</div>
                  <div class="jz-rwtitle">{{item.taskInfo.bstTitle}}</div>
                </div>
              </li>
              <li>
                <span class="jz-title bkimg2" >优化任务</span>
                <div v-for="item in taskList[1]" class="jz-rwbox" :title="item.taskInfo.bstTitle">
                  <div class="jz-status" :class="{bg1:item.utStatus==1,bg2:item.utStatus==2,bg32:item.utStatus==3}">{{item.utStatus | taskStatus}}</div>
                  <div class="jz-rwtitle">{{item.taskInfo.bstTitle}}</div>
                </div>
              </li>
              <li>
                <span class="jz-title bkimg3">P4P任务</span>
                <div v-for="item in taskList[2]" class="jz-rwbox" :title="item.taskInfo.bstTitle">
                  <div class="jz-status" :class="{bg1:item.utStatus==1,bg2:item.utStatus==2,bg33:item.utStatus==3}">{{item.utStatus | taskStatus}}</div>
                  <div class="jz-rwtitle">{{item.taskInfo.bstTitle}}</div>
                </div>
              </li>
              <li>
                <span class="jz-title bkimg4">卓越任务</span>
                <div v-for="item in taskList[3]" class="jz-rwbox" :title="item.taskInfo.bstTitle">
                  <div class="jz-status" :class="{bg1:item.utStatus==1,bg2:item.utStatus==2,bg34:item.utStatus==3}">{{item.utStatus | taskStatus}}</div>
                  <div class="jz-rwtitle" >{{item.taskInfo.bstTitle}}</div>
                </div>
              </li>

            </ul>
          </div>
          <br/>
          <Row>
            <Button class="my-btn fr" @click="exportData">导出数据</Button>
            <DatePicker class="fr" type="year" placeholder="请输入查询年份" :start-date="new Date(this.begin)" :options="options3"  :value="year" @on-change="changeYear"></DatePicker>
          </Row>
          <br/>
          <Row>
            <Col span="24" >
              <table class="table"   cellpadding="0" cellspacing="0" border="1" >
                <tr class="ivu-table-header"><th></th>
                  <th></th>
                  <th>1月</th>
                  <th>2月</th>
                  <th>3月</th>
                  <th>4月</th>
                  <th>5月</th>
                  <th>6月</th>
                  <th>7月</th>
                  <th>8月</th>
                  <th>9月</th>
                  <th>10月</th>
                  <th>11月</th>
                  <th>12月</th>
                </tr>
                <template>

                  <tr>
                    <td rowspan="9" >优化记录</td>
                    <td>登录次数</td>
                    <td v-for="item in data1">{{item.srLoginCnt}}</td>
                  </tr>

                  <tr>
                    <td>覆盖关键词数</td>
                    <td v-for="item in data1">{{item.srCoverKeywordsCnt}}</td>
                  </tr>
                  <tr>
                    <td>优化排名数</td>
                    <td v-for="item in data1">{{item.srOptimCnt}}</td>
                  </tr>
                  <tr>
                    <td>提升排名数</td>
                    <td v-for="item in data1">{{item.srImporveCnt}}</td>
                  </tr>
                  <tr>
                    <td>收集关键词数</td>
                    <td v-for="item in data1">{{item.srCollectKeywordsCnt}}</td>
                  </tr>
                  <tr>
                    <td>P4P加词数</td>
                    <td v-for="item in data1">{{item.srP4pAddCnt}}</td>
                  </tr>
                  <tr>
                    <td>星级提升数</td>
                    <td v-for="item in data1">{{item.srStarImproveCnt}}</td>
                  </tr>
                  <tr>
                    <td>爆款数</td>
                    <td v-for="item in data1">{{item.srSalesCnt}}</td>
                  </tr>
                  <tr>
                    <td>竞价前5词</td>
                    <td v-for="item in data1">{{item.srTopFiveCnt}}</td>
                  </tr>

                  <tr>
                    <td rowspan="7" >我的产品</td>
                    <td>产品总数</td>
                    <td v-for="item in data1">{{item.srProductCnt}}</td>
                  </tr>
                  <tr>
                    <td>有效产品数</td>
                    <td v-for="item in data1">{{item.srEffectProductCnt}}</td>
                  </tr>
                  <tr>
                    <td>曝光量</td>
                    <td v-for="item in data1">{{item.srExposureCnt}}</td>
                  </tr>
                  <tr>
                    <td>点击量</td>
                    <td v-for="item in data1">{{item.srClickCnt}}</td>
                  </tr>
                  <tr>
                    <td>反馈数</td>
                    <td v-for="item in data1">{{item.srFeedBackCnt}}</td>
                  </tr>
                  <tr>
                    <td>点击率</td>
                    <td v-for="item in data1">{{item.srClickProp}}<span v-if="item.srClickProp">%</span></td>
                  </tr>
                  <tr>
                    <td>反馈率</td>
                    <td v-for="item in data1">{{item.srFeedBackProp}}<span v-if="item.srFeedBackProp">%</span></td>
                  </tr>
                </template>


              </table>
            </Col>
          </Row>


        </div>
      </div>
    </div>
  </div>
</template>
<script>


  export default {

    data() {
      return {
        taskList: [],
        year:'',
        data1: [],
        begin:'',
        options3:{
          disabledDate (date) {
            return date && date.valueOf() > Date.now() ;
          }
        }
      }

    },
    mounted() {
      this.weekinit()
      this.industryPkShowList()
      /*this.pkdata();*/
      this.queueTaskInfo();
      this.year=new Date().getFullYear()+''
      this.loadList()
    },
    methods: {
      loadList(){
        this.api.findManagerReports.list({
          params:[this.year]
        }).then((res) => {
          if(res){
            if(res.data.rows){
              this.data1=res.data.rows
            }
          }
        })
      },
      changeYear(year){
        if(year){
          this.year=year;
          this.loadList()
        }

      },
      weekinit(){
        this.api.queryTimeweek.data().then((res)=>{
          if(res.data.status=="200"){
            let arr =[];
            for(let i=0;i<res.data.rows.length;i++){
              arr.push(new Date(res.data.rows[0].itcBeginTime).getFullYear())
            }
            arr=arr.sort(function (a,b) {
              return b-a
            })
            this.begin=arr[0];
          }
        })

      },
      initMap1(arr){
        var myChartdiv = document.getElementById('map1');
        let myChart = this.$echarts.init(myChartdiv);
        let legendData=[];
        let seriesData=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].isoneself=='N'){
            legendData.push({
              name:'同行'+ Number(i),
              icon: 'rect',
              textStyle: {
                color: '#999999',
              }
            });
            seriesData.push({
              data : [arr[i].ipKeywordCover],
              name : '同行'+ Number(i),
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }else{
            legendData.push({
              name:'我',
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipKeywordCover],
              name : '我',
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }
        }
        let option = {
          color:['#d97a80','#ffb880','#5bb0f0','#b6a2df'],
          tooltip: {
            position:'right'
          },
          legend: {
            bottom: '4%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            data: legendData
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: ['#bababa'],
              }
            },
            axisTick: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            data: ["关键词覆盖量"]
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
          },
          series:seriesData

        };
        myChart.setOption(option);
      },
      initMap2(arr){
        var myChartdiv = document.getElementById('map2');
        let myChart = this.$echarts.init(myChartdiv);
        let legendData=[];
        let seriesData=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].isoneself=='N'){
            legendData.push({
              name:'同行'+ Number(i),
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipP4pCount],
              name : '同行'+ Number(i),
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }else{
            legendData.push({
              name:'我',
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipP4pCount],
              name : '我',
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }
        }
        let option = {
          color:['#d97a80','#ffb880','#5bb0f0','#b6a2df'],
          tooltip: {},
          legend: {
            bottom: '4%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            data: legendData
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: ['#bababa'],
              }
            },
            axisTick: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            data: ["P4P竞价词数"]
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
          },
          series: seriesData
        };
        myChart.setOption(option);
      },
      initMap3(arr){
        var myChartdiv = document.getElementById('map3');
        let myChart = this.$echarts.init(myChartdiv);
        let legendData=[];
        let seriesData=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].isoneself=='N'){
            legendData.push({
              name:'同行'+ Number(i),
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipShowcaseCount],
              name : '同行'+ Number(i),
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }else{
            legendData.push({
              name:'我',
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipShowcaseCount],
              name : '我',
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }
        }
        let option = {
          color:['#d97a80','#ffb880','#5bb0f0','#b6a2df'],
          tooltip: {},
          legend: {
            bottom: '4%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            data: legendData
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: ['#bababa'],
              }
            },
            axisTick: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            data: ["橱窗数"]
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
          },
          series: seriesData
        };
        myChart.setOption(option);
      },
      initMap4(arr){
        var myChartdiv = document.getElementById('map4');
        let myChart = this.$echarts.init(myChartdiv);
        let legendData=[];
        let seriesData=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].isoneself=='N'){
            legendData.push({
              name:'同行'+ Number(i),
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipTransactionLevel],
              name : '同行'+ Number(i),
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }else{
            legendData.push({
              name:'我',
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipTransactionLevel],
              name : '我',
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }
        }
        let option = {
          color:['#d97a80','#ffb880','#5bb0f0','#b6a2df'],
          tooltip: {},
          legend: {
            bottom: '4%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            data: legendData
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: ['#bababa'],
              }
            },
            axisTick: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            data: ["交易等级"]
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
          },
          series: seriesData
        };
        myChart.setOption(option);
      },
      initMap5(arr){
        var myChartdiv = document.getElementById('map5');
        let myChart = this.$echarts.init(myChartdiv);
        let legendData=[];
        let seriesData=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].isoneself=='N'){
            legendData.push({
              name:'同行'+ Number(i),
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipIndexKeyword],
              name : '同行'+ Number(i),
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }else{
            legendData.push({
              name:'我',
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipIndexKeyword],
              name : '我',
              type: 'bar',
              barWidth:'22%',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            })
          }
        }
        let option = {
          color:['#d97a80','#ffb880','#5bb0f0','#b6a2df'],
          tooltip: {},
          legend: {
            bottom: '4%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            data: legendData
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: ['#bababa'],
              }
            },
            axisTick: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            data: ["首页排名词"]
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#ffffff'],
              }
            },
          },
          series: seriesData
        };
        myChart.setOption(option);
      },
      pkdata(arr) {

        var myChartdiv = document.getElementById('map1');
        let myChart = this.$echarts.init(myChartdiv);
        let legendData=[];
        let seriesData=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].isoneself=='N'){
            legendData.push({
              name:'同行'+ Number(i),
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipKeywordCover, arr[i].ipP4pCount, arr[i].ipShowcaseCount, arr[i].ipTransactionLevel, arr[i].ipIndexKeyword],
              name : '同行'+ Number(i),
              type: 'bar',
            })
          }else{
            legendData.push({
              name:'我',
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              data : [arr[i].ipKeywordCover, arr[i].ipP4pCount, arr[i].ipShowcaseCount, arr[i].ipTransactionLevel, arr[i].ipIndexKeyword],
              name : '我',
              type: 'bar',
            })
          }
        }
        let option = {

          tooltip: {},
          legend: {
            bottom: '4%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            data: legendData
          },
          xAxis: {
            data: ["关键词覆盖量", "P4P竞价词数", "橱窗数", "交易等级", "首页排名词"]
          },
          yAxis: {
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
            },
          series: seriesData
        };

        myChart.setOption(option);

      },
      industryPkShowList(){
        this.api.industryPkShowList.list().then((res) => {
          if(res){
            this.initMap1(res.data.rows)
            this.initMap2(res.data.rows)
            this.initMap3(res.data.rows)
            this.initMap4(res.data.rows)
            this.initMap5(res.data.rows)
          }
        })
      },
      queueTaskInfo() {
        this.api.queryUserTask.list().then((res) => {
          if (res) {
            var rows = res.data.rows;
            this.taskList = [[], [], [], []];

            for (let i = 0; i < rows.length; i++) {
              let task = rows[i];
              if (task.taskInfo.bstType == 'jzrw') {
                this.taskList[0].push(task);
              } else if (task.taskInfo.bstType == 'yhrw') {
                this.taskList[1].push(task);
              } else if (task.taskInfo.bstType == 'p4prw') {
                this.taskList[2].push(task);
              } else if (task.taskInfo.bstType == 'zyrw') {
                this.taskList[3].push(task);
              }
            }
            console.log(this.taskList)
          }
        })
      },
      //导出
      exportData() {
        if(!this.year){
          this.$Notice.warning({
            title: '提示',
            desc: '请选择日期'
          });
        }else{
          window.location.href=process.env.API_ROOT+'/alibaba/statisticsReports/exportManagerReports/'+this.year
        }
      },
    },
    filters: {
      taskStatus: function (value) {
        console.log(value);
        let status = '';
        if (value == 1) {
          status = '未完';
        } else if (value == 2) {
          status = '进行';
        } else if (value == 3) {
          status = '完成';
        }
        return status;
      }
    },


  };
</script>
<style scoped>
  .my-btn{
    background: #2d8cf0;
    color: #ffffff;
    border-radius: 6px;
    margin-left: 20px;
    line-height: 24px;
  }
  .box{
    width: 100%;
    height: 300px;
    border: 1px solid #DDDDDD;
    border-radius: 6px;
  }
  .box .tit{
    background: #ebf0f5;
    display: block;
    line-height: 46px;
    height: 46px;
    padding-left: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #000000;
  }
  .map-box{
    height: calc(100% - 46px);
    overflow: hidden;
  }
  .box .map{
    width: 20%;
    height: 100%;
    float: left;
  }

  .bkimg1 {
    background-image: url(../common/images/jzrw1.png);
  }

  .bkimg2 {
    background-image: url(../common/images/jzrw2.png);
  }

  .bkimg3 {
    background-image: url(../common/images/jzrw3.png);
  }

  .bkimg4 {
    background-image: url(../common/images/jzrw4.png);
  }

  .card {

    height: 400px;
    float: left;
    margin-right: 10px;
  }

  .ivu-card-head {
    background-color: #ebf0f5;

  }

  .jzrwli {
    margin: 5px;
  }

  .jzrwli li {
    display: block;
    width: 100%;
    overflow: hidden;
    margin: 10px 0px;
  }

  .jz-title {
    color: white;
    background-size: cover;
    width: 88px;
    height: 30px;
    display: block;
    float: left;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    text-indent: -10px;
    margin-right: 10px;
  }

  .jz-rwbox {
    float: left;
    margin: auto 15px;
    width: 45px;
  }

  .jz-status {
    height: 30px;
    width: 30px;
    border-radius: 15px;

    color: #FFFFFF;
    text-align: center;
    font-size: 10px;
    line-height: 30px;
    margin: 0 auto;
  }
  .bg1 {
    background: #c1cfdb;

  }
  .bg2 {
    background: #e0d3bb;
  }
  .bg31 {
    background: linear-gradient(to right, #ff875e 0%,#ff5fa9 100%);
  }
  .bg32 {
    background: linear-gradient(to right, #ea70e9 0%,#9f80f8 100%);
  }
  .bg33 {
    background: linear-gradient(to right, #3bcfc1 0%,#079ecd 100%);
  }
  .bg34 {
    background: linear-gradient(to right, #8d71ec 0%,#247cd5 100%);
  }

  .jz-rwtitle {
    margin: 0 auto;
    font-size: 10px;
    width: 55px;
    overflow: hidden;
    height: 20px;
    line-height: 20px;
  }

  .table{
    width: 100%;
    border: 1px solid #e9eaec;
    border-collapse:collapse;
  }
  .table td,.table th{
    min-width: 0;
    height: 48px;
    box-sizing: border-box;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #e9eaec;
    text-align: center;

  }

  .table th{
    min-width: 0;
    height: 48px;
    box-sizing: border-box;
    text-align: center;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #e9eaec;
    background: #f8f8f9;

  }
  .table td {
    transition: background-color .2s ease-in-out;


  }
</style>
