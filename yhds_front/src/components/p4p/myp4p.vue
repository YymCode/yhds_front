<template>
    <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
        <Breadcrumb-item>我的P4P</Breadcrumb-item>
      </Breadcrumb>

      <div class="main2">
        <div class="maintiele">
            <div>
              <p>账户信息：<span>&nbsp;&nbsp;&nbsp;{{uname}}</span>
                          <strong>{{accountlist.level}}</strong>
              </p>
              <p>
                现金:<span class="mainspan">&nbsp; ¥{{accountlist.balance}} </span>
                <a class="spanconten" href="https://hzmy.alibaba.com/saas/saas_order_detail.htm?product_code=gg020" target="_Blank">充值</a>
                <!--红包:<span class="mainspan">&nbsp;¥1325</span>-->
              </p>
            </div>
            <div>
              <p>关键词推广</p>
              <p>
                今日消耗:<span class="mainspan">&nbsp;¥{{accountlist.daycost}}</span>
                今日预算:<span class="mainspan">&nbsp;¥{{accountlist.budget}}</span>
                推广状态:<span v-if="accountlist.status">&nbsp;&nbsp;&nbsp;推广中</span>
                        <span v-else>&nbsp;&nbsp;&nbsp;未推广</span>
                <i-switch v-model="switch1" @on-change="switchchange">
                  <span slot="open">开</span>
                  <span slot="close">关</span>
                </i-switch>
              </p>
            </div>
        </div>

        <div class="mainconten">
          <div>
            <p class="mainspan">近七天数据 <router-link tag="span" to="/p4p/report">更多详情</router-link></p>
            <div class="maindiv maindiv2">
              <div>
                <span v-for="(item,index) in tieledata" @click="chaclick(item.val,index)" :class="{bgspan:classcolo==index}">{{item.name}}  </span>
              </div>
              <div id="Container">
                  <div id="myChart"  style="width: 100%;height:100%;">

                  </div>
              </div>
            </div>
            <div class="introduce">
              <p>
                  <span>
                    <strong>最高{{maxname}}</strong>
                    <br>
                     {{maxtiem}}
                  </span>

                  <b>{{arrmax}}</b>
              </p>
              <p class="flri">
                  <b>{{arrmin}}</b>
                  <span>
                    <strong>最底{{maxname}}</strong>
                    <br>
                    {{mintiem}}
                  </span>
              </p>
            </div>
          </div>

          <div>
            <p class="mainspan">星级分布  <router-link tag="span" to="/p4p/thesaurus">更多详情</router-link></p>
            <div class="maindiv" id="maindiv3">
              <div id="myChartdiv"  style="width: 100%;height:100%;">

              </div>
            </div>

            <div class="satdiv">
              <div>
                <span>三星以上占比</span>
                <b>{{stadata.threeUp}}%</b>
              </div>
              <div>
                <span>需优化词数</span>
                <b>{{stadata.optimized}}</b>
              </div>
            </div>
          </div>
        </div>

        <div class="mainfoot">
          <div>
            <div>
              <i-circle :percent="optimize1" :size="60" :trail-width="10" :stroke-width="10" class="yuan" stroke-color="#FF62A4">
                <span class="demo-Circle-inner" style="font-size:16px">{{optimize1}}%</span>
              </i-circle>
            </div>
            <p>
              <span>词覆盖</span>
              <br>
              <Button v-if="optimize1<85" @click="jumpUrl">一键优化</Button>
              <span  v-else>继续保持</span>
            </p>
          </div>
          <div>
            <div>
              <i-circle :percent="optimize2" :size="60" :trail-width="10" :stroke-width="10" class="yuan" stroke-color="#3B79DB">
                <span class="demo-Circle-inner" style="font-size:16px">{{optimize2}}%</span>
              </i-circle>
            </div>
            <p>
              <span>星级优化</span>
              <br>
              <router-link tag="Button" to="/p4p/optimize" v-if="optimize2<80">一键优化</router-link>
              <span  v-else>继续保持</span>
            </p>
          </div>
          <div>
            <div>
              <i-circle :percent="optimize3" :size="60" :trail-width="10" :stroke-width="10" class="yuan" stroke-color="#30C9C1">
                <span class="demo-Circle-inner" style="font-size:16px">{{optimize3}}%</span>
              </i-circle>
            </div>
            <p>
              <span>竞价时长</span>
              <br>
              <Button @click="itemmode" v-if="optimize3!=100">一键优化</Button>
              <span v-else>继续保持</span>
            </p>
          </div>
          <div>
            <div>
              <i-circle :percent="optimize4" :size="60" :trail-width="10" :stroke-width="10" class="yuan" stroke-color="#BD69F0">
                <span class="demo-Circle-inner" style="font-size:16px">{{optimize4}}%</span>
              </i-circle>
            </div>
            <p>

              <span>爆款打造</span>
              <br>
              <router-link tag="Button" to="/p4p/hot" v-if="optimize4<80">一键优化</router-link>
              <span v-else>继续保持</span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        switch1:true,
//        账号
        accountlist:"",
//        七天数据
        classcolo:0,
        tieledata:[
          {
            name:"曝光量",
            val:"impressionCnt"
          },
          {
            name:"点击量",
            val:"clickCnt"
          },
          {
            name:"点击率",
            val:"ctr"
          },
          {
            name:"花费",
            val:"cost"
          },
          {
            name:"平均点击花费",
            val:"clickCostAvg"
          },
        ],

        timeval:"",
        tiele:"",
        datatime:[],

        maxname:"",


        arrmin:"",
        arrmax:"",

        mintiem:"",
        maxtiem:"",


//        优化
        opdata:"",
        optimize1:0,
        optimize2:0,
        optimize3:0,
        optimize4:0,
        uname:"",

        potthreeUp:"",

        stadata:"",
      }
    },
    mounted(){
      this.timeinit();
      this.accountinit();
      this.chainit();
      this.pinit();
      this.sainit();
      this.nameinit();
    },
    methods: {
//        推广状态开关
      switchchange(status){
        var data;
        if(status){
            data="on"
        }else {
            data="off"
        }
        this.api.KeywordsStatus.data({params:[data]}).then((res) => {
          if(res.data.status==200){
            this.$Notice.success({
              title: '修改成功',
            });
            this.accountinit();
          }
        })
      },

//      账号信息
      accountinit(){
        this.api.accountp4p.data().then((res) => {
          if(res.data.status==200){
              console.log(res);
              this.accountlist=res.data.mapInfo;
              if(this.accountlist.status){
                  this.switch1=true;
              }else {
                this.switch1=false;
              }
          }
        })
      },
//      近七天数据
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
      chainit(name){
        if(name){
          this.tiele=name
        }else {
          this.tiele="impressionCnt";
          this.maxname="曝光量"
        }

        if(name=='impressionCnt'){

          this.maxname="曝光量"
        }
        if(name=='clickCnt'){

          this.maxname="点击量"
        }
        if(name=='ctr'){

          this.maxname="点击率"
        }
        if(name=='cost'){

          this.maxname="花费"
        }
        if(name=='clickCostAvg'){

          this.maxname="平均点击花费"
        }


          console.log(this.timeval);
        var myChart2 = document.getElementById('myChart');
        myChart2.style.width = myChart2.offsetWidth+'px';
        myChart2.style.height = myChart2.offsetHeight+'px';
        let myChart = this.$echarts.init(myChart2);
        var list=[];
        this.datatime=[];
        this.api.ReportData.find({reqData:{queryDays:7,endDate:this.timeval,}}).then((res) => {
            console.log(res);
          if (res.data.status == 200){
            for(var i=0; i<res.data.mapInfo.currentData.length;i++){
              list.push(Number(res.data.mapInfo.currentData[i][this.tiele]));
              this.datatime.push(res.data.mapInfo.currentData[i].statDate);
            }
              let option = {
                tooltip: {
                  trigger: 'axis'
                },
                grid: {
                  top:"10%",
                  left: '2%',
                  right: '2%',
                  bottom: '1%',
                  containLabel: true
                },

                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: this.datatime,
                  show: false,
                },
                yAxis: {
                  type: 'value',

                },
                series: [
                  {

                    type:'line',
                    stack: '总量',
                    smooth: true,
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
                  }
                ]
              };
              myChart.setOption(option);
              this.max(list);
              this.min(list);


            }
        });
      },
//          最小值


      min(arr) {
        var index=0;
        var min = arr[0];
        for (var i = 1; i < arr.length; i++){
          if (arr[i] < min){
            index=i;
            min = arr[i];
          }
          this.mintiem=this.datatime[index];
          this.arrmin = min;
        }
        console.log(this.datatime)
      },
//        最大值
      max(arr) {
          var index=0;
        var max = arr[0];
        for(var i=1;i<arr.length;i++){
          if(max<arr[i]){
              index=i;
              max=arr[i];
          };

          this.maxtiem=this.datatime[index];
          this.arrmax = max;
        }
        console.log(max);
        console.log(index);

      },

      chaclick(name,i){
          this.classcolo=i;
        this.chainit(name);
      },
//      优化

      pinit(){
        this.api.optimizep4p.data().then((res) => {
          if(res.data.status==200){
            this.opdata=res.data.mapInfo;

            this.optimize1=parseInt(this.opdata.cover);
            console.log(typeof(this.optimize1));

            this.optimize2=parseInt(this.opdata.star);
            this.optimize3=this.opdata.online/24*100;
            this.optimize3=parseInt(this.optimize3);

            this.optimize4=parseInt(this.opdata.explode)
            if(this.optimize4){
              this.optimize4=this.optimize4
            }else {
              this.optimize4=0
            }

          }
        })
      },

//        星级
     sainit(){
       var myChartdiv = document.getElementById('myChartdiv');
       myChartdiv.style.width = myChartdiv.offsetWidth+'px';
       myChartdiv.style.height = myChartdiv.offsetHeight+'px';
       let myChartd = this.$echarts.init(myChartdiv);

       this.api.keyStarsp4p.data().then((res) => {
           var data5,data4,data3,data10;
         if(res.data.status==200){
             this.stadata=res.data.mapInfo;
           this.potthreeUp=this.stadata.threeUp;
           console.log(this.potthreeUp);
           data5=parseInt(res.data.mapInfo.five);
           data4=parseInt(res.data.mapInfo.four);
           data3=parseInt(res.data.mapInfo.three);
           data10=parseInt(res.data.mapInfo.other);

           let option2 = {

             title: {
               text: '关键词总数'+res.data.mapInfo.total,
               left: 'left',
               top: 10,
               textStyle: {
                 color: '#495060',
                 fontSize:"16"
               }
             },

             series : [
               {
                 name:'访问来源',
                 type:'pie',
                 radius : '55%',
                 center: ['50%', '50%'],
                 data:[
                   {value:data5, name:'五星词'},
                   {value:data4, name:'四星词'},
                   {value:data3, name:'三星词'},
                   {value:data10, name:'其他'},
                 ].sort(function (a, b) { return a.value - b.value; }),

                 label: {
                   normal: {
                     textStyle: {
                       color: '#495060'
                     },
                     formatter: '{b|{b}：} {c}\n {per|{d}%}  ',

                     rich: {
                       per: {
                         color: '#495060',
                         padding: [2, 4],
                         borderRadius: 2
                       }
                     }
                   }
                 },
                 labelLine: {
                   normal: {
                     lineStyle: {
                       color: '#495060'
                     },
                     smooth: 0.2,
                     length: 10,
                     length2: 20
                   }
                 },
               }
             ]
           };
           myChartd.setOption(option2);
         }
       });


     },
     nameinit(){
       this.api.username.find().then((res)=>{
         if(res.data.status=="200"){
           this.uname=res.data.mapInfo.userName;

         }
       })
     },

     itemmode(){
       this.$Notice.info({
         title: '提高每日推广预算，可以提高推广时长',
         duration:0
       });
     },

    jumpUrl(){
      this.$router.push({
        path: '/p4p/thenext',
        name: 'thenext',
        params: {
          p4pName:"name2",
        }
      })
    },
    },

  }
</script>

<style>
.maindiv2{
  border: 1px solid #DDDDDD;
  border-top:none;
}
.maindiv2>div:first-child{
  border-top:1px solid #DDDDDD;

  background: #EBF0F4;
}
.maindiv2>div:first-child span{
  display: inline-block;
  width:15%;
  text-align: center;
  border-right: 1px solid #DDDDDD;
  padding:6px 0;
  cursor: pointer;
}

.maindiv2>div>.bgspan{
  background: #ffffff;

}

#Container{
  width:100%;
  height: calc(100% - 31px);
}

.main2{
  background: #F0F0F0;
  padding:0;
  height: calc(100% - 35px);
  overflow-y: hidden;
  overflow-x: hidden;
  /*-webkit-box-shadow: 0 0 10px #DDDDDD;*/
  /*box-shadow: 0 0 10px #DDDDDD;*/
  /*border-radius: 6px;*/
  /*padding: 25px 30px 15px 30px;*/
}
.main2>div{
  background: #ffffff;
  border-radius: 6px;
}

.maintiele{
  padding: 15px;
  overflow: hidden;
}
.maintiele>div{
  float: left;
  width:50%;
}
.maintiele>div:last-child{
  border-left:1px solid #DDDDDD;
  padding-left:30px;
}

.maintiele>div>p:first-child{
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.maintiele>div>p:last-child{
  color: #999999;
}
.maintiele>div>p:last-child span{
  margin-right: 15px;
}
.main2 .mainspan {
  font-size: 16px;
  color: #495060;
  padding-bottom:8px;
  overflow: hidden;
}
.main2 .mainspan>span{
  float: right;
  color: #0078f2;
  font-size: 12px;
  cursor: pointer;
}
.maintiele strong{
  display: inline-block;
  height: 40px;
  width:40px;
  vertical-align: middle;
  margin-left: 15px;
  background:url("../../common/images/username.jpg") no-repeat;
  background-size: 100%;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  padding-top: 4px;
}
.main2 .mainconten{
  overflow: hidden;
  background: #f0f0f0;
  padding:15px 0;
  height:calc(100% - 184px);
}
.spanconten{
  margin:0 15px;
  color: #0078f2;
}

.mainconten>div{
  width:49%;
  float: left;
  padding:10px 15px;
  background: #FFFFFF;
  box-shadow: 0 0 10px #DDDDDD;
  border-radius: 6px;
  height:100%;
}
.mainconten>div:first-child{
  margin-right:1%;
}
.mainconten>div:last-child{
  margin-left:1%;
}



.main2 .mainfoot{

  display: flex;
  justify-content:space-between;
  background: #f0f0f0;

}
.main2 .mainfoot>div{
  width:23.5%;
  height:80px;
  background: #FFFFFF;
  box-shadow: 0 0 10px #DDDDDD;
  border-radius: 6px;
  padding: 10px;
  overflow: hidden;
}
.mainfoot>div>p{
  float: left;
  height: 60px;
  line-height:25px;
  margin-top: 5px;
  margin-left: 30px;
}
.mainfoot>div>div{
  float: left;
}
.mainfoot>div>p>span:first-child{
  font-size: 18px;
  font-weight: 500;
}
.mainfoot>div>p>button:last-child {
  background: linear-gradient(to right, #0078f0 0%,#00a1ff 80%);
  cursor: pointer;
  color: #ffffff;
  border-radius: 15px;
}

.mainfoot>div>p>span:last-child {
  color: #0078f0;
}

.maindiv{
  height:calc(100% - 84px);
}


.introduce{
  width:100%;
  height: 60px;
  overflow: hidden;
}
.introduce>p{
  float: left;
  width:50%;
  height: 60px;
  line-height: 60px;
}
.introduce>p:last-child{
  text-align: right;
}
.introduce>p>span,.introduce>p>b{

  text-align: center;
  line-height: normal;
  float: left;
}
.introduce>p>span{
  color: #999;
  font-size: 14px;
  vertical-align: middle;
  margin-right:20px;
  margin-top:15px;
}
.introduce>p>b{
  font-size: 24px;
  font-weight: 500;
  margin-top: 20px;
}
.introduce>p>span>strong{
  font-size: 14px;
  color: #495060;
}

.introduce .flri>span,.introduce .flri>b{
  float: right;
}


#maindiv3{
 height: calc(100% - 92px);;
}
.satdiv{
  height: 60px;
  width:100%;
  overflow: hidden;
}
.satdiv>div:first-child{
  float: left;
  height: 60px;
  line-height: 60px;
}
.satdiv>div:last-child{
  float: right;
  height: 60px;
  line-height: 60px;
}
.satdiv>div>span{
  font-size: 14px;
}
.satdiv>div>b{
  display: inline-block;
  vertical-align: middle;
  font-weight: 500;
  font-size: 24px;
  margin-left:15px;
}
</style>
