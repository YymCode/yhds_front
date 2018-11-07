<template>
    <div class="content-wrap">
      <div class="news">
        <div class="news-wrap">
          <ul class="tabs">
            <li class="tab-list active f_14">消息</li>
          </ul>
          <ul class="messages f_14">
            <li v-for="item in noticeList">
              <a :href="item.snLink?item.snLink:'javascript:;'" target="_blank" >
                <p v-html="item.snContent"></p>
                <p class="color4" style="text-align: right">{{item.createTime | fmt}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="full-height">
          <div class="main">
            <!--<button>-->
              <!--<a :href="cheshiurl">测试地址</a>-->
            <!--</button>-->
            <div class="pk-wrap">
              <div class="pk-inner">
                <div class="pk-before" v-if="pkStatus==0 || pkStatus==1">
                  <img src="../common/images/pk_icon.png" class="pk-icon" alt="" />
                  <div class="pk-group clr">
                    <div class="pk-left">
                      <div class="pic-box">
                        <img src="../common/images/avatar.png" title="我" alt="" />
                        <span class="round round-1"></span>
                        <span class="round round-2"></span>
                        <span class="round round-3"></span>
                        <span class="round round-4"></span>
                      </div>
                    </div>
                    <div class="pk-middele">
                      <img src="../common/images/pk_icon2.png" alt="" class="pk-icon2"/>
                    </div>
                    <div class="pk-right">
                      <div class="pics">
                        <div v-for="(item, index) in industryPkList" class="pic-box fl" :class="{'pic-box-small':(index==0 || index==2)}">
                          <img v-if="item.ipSort" src="../common/images/avatar.png" :title="item.ipWebsite"  alt="" />
                          <img  src="../common/images/add.png" v-if="!item.ipSort && pkStatus!=1" alt="" @click="showModal(index+1)" style="cursor: pointer"/>
                          <img  src="../common/images/add.png" v-if="!item.ipSort && pkStatus==1" alt="" @click="alert" style="cursor: pointer"/>
                          <span class="round round-1"></span>
                          <span class="round round-2"></span>
                          <span class="round round-3"></span>
                          <span class="round round-4"></span>
                          <span v-if="item.ipSort && pkStatus!==1" @click="deletePree(item.ipId)"><Icon type="close-circled" class="deletePree" ></Icon></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button class="pk-btn" v-if="pkStatus==0" @click="pk">开始PK</Button>
                  <Button disabled class="pk-btn" v-if="pkStatus==1" :loading="true">PK中</Button>
                  <!--<Button class="pk-btn" v-if="pkStatus==2">查看结果</Button>-->
                  <!--<Button class="pk-btn" v-if="pkStatus==3" @click="pk">PK失败,请重试</Button>-->
                </div>
                <div class="pk-after" v-else>
                  <h3>同行PK结果</h3>
                  <p class="fr" v-if="isDone==='Y'">数据分析完成 ！</p>
                  <p class="fr" v-else>数据分析中，分析结果逐步展示！</p>
                  <div class="result">
                    <div class="pic-box pic-box-small2 center">
                      <img src="../common/images/avatar.png" title="我" alt="" />
                      <span class="round2 round-1"></span>
                      <span class="round2 round-2"></span>
                      <span class="round2 round-3"></span>
                      <span class="round2 round-4"></span>
                    </div>
                    <img src="../common/images/pk_icon2.png" class="pk-after-icon2" width="55" alt="" />
                    <div class="clearfix flex mb_15">
                      <div class="pic-box pic-box-small2 fl " v-for="(item,index) in industryPkList2">
                        <img src="../common/images/avatar.png" :title="item.ipWebsite" alt="" />
                        <span class="round2 round-1"></span>
                        <span class="round2 round-2"></span>
                        <span class="round2 round-3"></span>
                        <span class="round2 round-4"></span>
                      </div>
                    </div>
                    <div class="clr flex f_12 color2">
                      <span class="flex1" v-for="(item,index) in industryPkList2">同行{{index+1}}</span>
                    </div>
                    <button class="pk-btn pk-btn2" id="pk2" @click="deleteAllPree">重新选择</button>
                  </div>
                  <div class="chart">
                    <div id="map1"></div>
                  </div>
                </div>
              </div>
            </div>


            <!--时间曲线数据-->
            <div class="map-wrap">
              <div style="padding: 10px 0;">
                <Dropdown trigger="click" style="margin-right: 40px;">
                  <a href="javascript:void(0)" style="color: #96ABC0;">
                    按月统计
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list" style="max-height: 200px;overflow: auto">
                    <DropdownItem v-for="item in curvelist" @click.native="toggleallindustry(item)">{{item}}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <span style="color:#A0A0A0">时间：{{startTime}}至{{endTime}}（太平洋时间,更新周期：北京时间每天9:00前）</span>
              </div>
              <div>
                <p class="chartile">
                  <span v-for="(item,index) in clickdata" :class="{bgcolor:digital==index}" @click="clickshow(index,item.val)">{{item.name}}</span>
                </p>
                  <p class="hangye" :class="{hanshow:fontShow,hanauto:!fontShow}">
                    <b>行业：</b>
                    <span v-for="(item,index) in industrydata" :class="{spancolor:industryindex==index}" @click="toggleclass(index,item.iiIndustryId,item.iiIndustryDesc)">{{item.iiIndustryDesc}}</span>
                    <strong v-if="fontShow" @click="fontShow=false">更多</strong>
                    <strong v-else @click="fontShow=true">隐藏</strong>
                  </p>

                  <div>
                      <div id="myChartweek" style="width: 100%;height: 100%;"></div>
                  </div>
              </div>
            </div>
          </div>
          <div class="tasks">
            <div class="task-inner f_14">
              <div class="task-tit f_20">任务模式</div>
              <div>
                <div class="task-list" @click="showTask('jzrw','建站任务')">
                  <img src="../common/images/task_icon1.png" alt="" />
                  <span class="txt f_16">建站任务</span>
                  <span class="icon " :class="{bg2:groupTaskStatus1==='进行中',bg1:groupTaskStatus1==='已完成',bg3:groupTaskStatus1==='未开始'}">
									<span class="rect">{{groupTaskStatus1}}</span>
									<span class="triangle"></span>
								</span>
                </div>
                <div class="task-list" @click="showTask2('yhrw','优化任务')">
                  <img src="../common/images/task_icon2.png" alt="" />
                  <span class="txt f_16">优化任务</span>
                  <span class="icon " :class="{bg2:groupTaskStatus2==='进行中',bg1:groupTaskStatus2==='已完成',bg3:groupTaskStatus2=='未开始'}">
									<span class="rect">{{groupTaskStatus2}}</span>
									<span class="triangle"></span>
								</span>
                </div>
                <div class="task-list" @click="showTask3('p4prw','P4P任务')">
                  <img src="../common/images/task_icon3.png"alt="" />
                  <span class="txt f_16">P4P任务</span>
                  <span class="icon" :class="{bg2:groupTaskStatus3==='进行中',bg1:groupTaskStatus3==='已完成',bg3:groupTaskStatus3==='未开始'}">
									<span class="rect">{{groupTaskStatus3}}</span>
									<span class="triangle"></span>
								</span>
                </div>
                <div class="task-list" @click="showTask4('zyrw','卓越任务')">
                  <img src="../common/images/task_icon4.png" alt="" />
                  <span class="txt f_16">卓越任务</span>
                  <span class="icon" :class="{bg2:groupTaskStatus4==='进行中',bg1:groupTaskStatus4==='已完成',bg3:groupTaskStatus4  ==='未开始'}">
									<span class="rect">{{groupTaskStatus4}}</span>
									<span class="triangle"></span>
								</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <Modal v-model="taskModal" :title="title" class-name="taskModal vertical-center-modal" width="820">
        <div class="task-wrap">
          <ul>
            <li v-for="item in taskList" v-if="item.taskInfo.bstType ===bstType">
              <h2 class="f_18 clr">
                <span class="fl color4">{{item.taskInfo.bstTitle}}</span>
                <span class="fr color3">
                  <span v-if="item.bstIsAccept=='Y'">
                    <span v-if="item.utStatus=='1'">未开始</span>
                    <span v-if="item.utStatus=='2'">进行中</span>
                    <span v-if="item.utStatus=='3'">已完成</span>
                  </span>
                  <span v-if="item.bstIsAccept=='N'">未领取</span>
                </span>
              </h2>
              <span class=" color3 f_16">{{item.taskInfo.bstContent}}</span>
            </li>
          </ul>
        </div>
        <div slot="footer">
          <Button v-if="!isAcceptTask" type="primary" shape="circle" class="my-btn" @click="acceptTask">领取任务</Button>
          <Button v-else disabled type="primary" shape="circle" class="my-btn" >已领取</Button>
        </div>
      </Modal>
      <Modal v-model="addBizIndustryPkModal" ref="addBizIndustryPkModal" title="请输入同行网站" class-name="small-btn-box vertical-center-modal" >
        <Input v-model="ipWebsite"  placeholder="请输入地址" class="width_300"></Input>
        <Button type="primary" shape="circle" class="my-btn ml_10" :loading="loading" @click="addBizIndustryPk">确定</Button>
        <div slot="footer"></div>
      </Modal>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        isDone:null,
        loading:false,
        isAcceptTask:false,
        groupTaskStatus1:'',
        groupTaskStatus2:'',
        groupTaskStatus3:'',
        groupTaskStatus4:'',

        mainChart:null,
        url:'',
        cheshiurl:"",

        noticeList:[],
        taskList:[],
        taskModal:false,
        title:'',
        bstType:'',
        //开始pk按钮的状态
        pkStatus:0,

        addBizIndustryPkModal:false,
        ipWebsite:'',
        ipSort:'',
        //同行信息
        industryPkList:[],
        industryPkList2:[],

//        同行数据曲线
        curvelist:[],
        timeFirst:"",

        industrydata:[],
        industryindex:0,
        industryId:"",
        industryname:"",

        digital:0,
        currentclick:"itcImps",
        clickdata:[
          {
            val:"itcImps",
            name:"曝光量"
          },
          {
            val:"itcClk",
            name:"点击量"
          },
          {
            val:"itcClkRate",
            name:"点击率"
          },
          {
            val:"itcVisitor",
            name:"访客量"
          },
          {
            val:"itcFb",
            name:"反馈量"
          },

        ],

        startTime:"",
        endTime:"",
        timenum:[],
        fontShow:true

      }
    },
    created(){
      this.loadNotice();
      this.loadTaskList();


    },
    mounted(){
      this.init();
      this.queueInfo();

      this.weekinit();
    },
    methods: {
      sequence(a,b){
        if (a>b) {
          return 1;
        }else if(a<b){
          return -1
        }else{
          return 0;
        }
      },
      initMap(arr){
        for(let i=0;i<arr.length;i++){
          if(arr[i].ipKeywordCover==null){
            arr[i].ipKeywordCover=0;
          }
          if(arr[i].ipP4pCount==null){
            arr[i].ipP4pCount=0;
          }
          if(arr[i].ipShowcaseCount==null){
            arr[i].ipShowcaseCount=0;
          }
          if(arr[i].ipTransactionLevel==null){
            arr[i].ipTransactionLevel=0;
          }
          if(arr[i].ipIndexKeyword==null){
            arr[i].ipIndexKeyword=0;
          }
        }
        let  myChart=document.getElementById('map1')
        let chartBox = document.getElementsByClassName('chart')[0]
        // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
        function resizeCharts () {
          myChart.style.width = chartBox.style.width + 'px'
          myChart.style.height = chartBox.style.height + 'px'
        }
        // 设置容器高宽
        resizeCharts()
        this.mainChart = this.$echarts.init(myChart);
        let legendData=[];
        let seriesData=[];
        //求最大值
        let ipKeywordCover=[];
        let ipP4pCount=[];
        let ipShowcaseCount=[];
        let ipTransactionLevel=[];
        let ipIndexKeyword=[];
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
              value : [arr[i].ipKeywordCover, arr[i].ipP4pCount, arr[i].ipShowcaseCount, arr[i].ipTransactionLevel, arr[i].ipIndexKeyword],
              name : '同行'+ Number(i),
              areaStyle:{
                normal:{
                  color:'rgba(217, 67, 67, 0.25)',
                }
              }
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
              value : [arr[i].ipKeywordCover, arr[i].ipP4pCount, arr[i].ipShowcaseCount, arr[i].ipTransactionLevel, arr[i].ipIndexKeyword],
              name : '我',
              areaStyle:{
                normal:{
                  color:'rgba(217, 67, 67, 0.25)',
                }
              }
            })
          }


          ipKeywordCover.push(Number(arr[i].ipKeywordCover))
          ipP4pCount.push(Number(arr[i].ipP4pCount))
          ipShowcaseCount.push(Number(arr[i].ipShowcaseCount))
          ipTransactionLevel.push(Number(arr[i].ipTransactionLevel))
          ipIndexKeyword.push(Number(arr[i].ipIndexKeyword))
        }
        console.log(ipKeywordCover.sort(this.sequence))
        let maxIpKeywordCover=ipKeywordCover.sort(this.sequence)[ipKeywordCover.length-1]+5;
        let maxIpP4pCount=ipP4pCount.sort(this.sequence)[ipP4pCount.length-1]+5;
        let maxIpShowcaseCount=ipShowcaseCount.sort(this.sequence)[ipShowcaseCount.length-1]+5;
        let maxIpTransactionLevel=ipTransactionLevel.sort(this.sequence)[ipTransactionLevel.length-1]+5;
        let maxIpIndexKeyword=ipIndexKeyword.sort(this.sequence)[ipIndexKeyword.length-1]+5;

        let option = {
          color:['#ff5c62','#3da9fd','#ffbc52','#3dc296'],
          tooltip: {},
          legend: {
            bottom:'6%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap:20,
            data:legendData
          },
          radar: {
            name: {
              textStyle: {
                color: '#999',
                backgroundColor: '#fff',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '关键词覆盖量',max: maxIpKeywordCover},
              { name: 'P4P竞价词数', max: maxIpP4pCount},
              { name: '橱窗数', max: maxIpShowcaseCount},
              { name: '交易等级', max: maxIpTransactionLevel},
              { name: '首页排名词', max: maxIpIndexKeyword},
            ]
          },
          series: [{
            name: '我 vs 同行',
            type: 'radar',
            symbolSize:0,
            data : seriesData
          }]
        };
        this.mainChart.setOption(option);
      },
      init(){
        var url ="?"+window.location.href.split("?")[1];
        if(url){
          var params ={};
          if(url.indexOf("?")!==-1)
          {
            var str = url.substr(1);　//去掉?号
            var strs = str.split("&");
            for(var i=0;i<strs.length;i++)
            {
              var name = strs[i].substring(0, strs[i].indexOf("="));
              var value = strs[i].substring(strs[i].indexOf("=")+1);
              params[name]=value;
            }
          }
          if(params.url){
              var accessToken=`${params.url}?accessToken=${params.accessToken}&alibabaUserId=${params.alibabaUserId}`;
              accessToken=unescape(accessToken);
              localStorage.setItem("url",accessToken);
          }else {
            this.cheshiurl=localStorage.getItem("url");
          }
        }

      },
      loadNotice(){
        this.api.getIndexNotice.list().then((res) => {
          if(res){
            this.noticeList = res.data.rows;
          }
        })
      },
      loadTaskList(){
        this.api.queryUserTask.list().then((res) => {
          if(res){
            let arr = res.data.rows
            this.taskList = arr;
            for(let i=0;i<arr.length;i++){
              if(arr[i].taskInfo.bstType==='jzrw'){
                this.groupTaskStatus1 = arr[i].groupTaskStatus;
              }else if(arr[i].taskInfo.bstType==='yhrw'){
                this.groupTaskStatus2 = arr[i].groupTaskStatus;
              }else if(arr[i].taskInfo.bstType==='p4prw'){
                this.groupTaskStatus3 = arr[i].groupTaskStatus;
              }else if(arr[i].taskInfo.bstType==='zyrw'){
                this.groupTaskStatus4 = arr[i].groupTaskStatus;
              }
            }
          }
        })
      },
      showTask(bstType,tit){
        this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;

        if(this.groupTaskStatus1!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask2(bstType,tit){
        this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;
        if(this.groupTaskStatus2!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask3(bstType,tit){
        this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;

        if(this.groupTaskStatus3!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask4(bstType,tit){
        this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;

        if(this.groupTaskStatus4!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      acceptTask(){
        if(this.bstType=='zyrw' && (this.groupTaskStatus1!='已完成' || this.groupTaskStatus2!='已完成' || this.groupTaskStatus3!='已完成')){
          this.$Notice.warning({
            title: '提示',
            desc: '其他任务完成之后才能领取卓越任务'
          });
        }else{
          this.api.acceptTask.change({
            params:[this.bstType]
          }).then((res) => {
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
              this.taskModal = false;
              this.loadTaskList()
            }
          })
        }
      },
      showModal(ipSort){
        this.ipSort = ipSort;
        this.ipWebsite='';
        this.addBizIndustryPkModal= true;
      },
      industryPkShowList(){
        this.api.industryPkShowList.list().then((res) => {
          if(res){
            console.log(1111111111111111)
            console.log(this.pkStatus)
            let count = 0;
            if(res.data.rows.length){
              for(let i=0;i<res.data.rows.length;i++){
                if(res.data.rows[i].isDone === 'Y' && res.data.rows[i].isoneself=='N'){
                  count++
                }
              }
              if(count===res.data.rows.length-1){
                this.isDone="Y";
              }

            }


            if(this.pkStatus==2 || this.pkStatus==3){

              this.initMap(res.data.rows)
            }


            let preeData=[];
            for(let i=0;i<res.data.rows.length;i++){
              if(res.data.rows[i].isoneself=='N'){
                preeData.push(res.data.rows[i])
              }
            }

            this.industryPkList2 = preeData;

            let arr = preeData;
            let arr2=[
              {
                ipId:null,
                ipSort:null
              },
              {
                ipId:null,
                ipSort:null
              },
              {
                ipId:null,
                ipSort:null
              },
            ]
            if(arr.length<3){
              for(let i=0;i<arr.length;i++){
                arr2[i].ipSort = arr[i].ipSort
                arr2[i].ipId = arr[i].ipId
                arr2[i].ipWebsite = arr[i].ipWebsite
              }
              this.industryPkList = arr2;
            }else{
              this.industryPkList = arr;
            }

          }
        })
      },
      queueInfo(){
        this.api.queueInfo.list({
          reqData:{
            ipqType:1
          }
        }).then((res) => {
          if(res){
            /*this.pkStatus = res.data.rows[0].ipqStatus;*/

            if(res.data.rows.length){
              this.pkStatus = res.data.rows[0].ipqStatus;
            }else{
              this.pkStatus = 0;
            }
            this.industryPkShowList();

          }

        })
      },
      addBizIndustryPk(){
        this.loading=true;
        this.api.addBizIndustryPk.add({
          reqData:{
            ipSort:this.ipSort,
            ipWebsite:this.ipWebsite
          }
        }).then((res) => {
          if(res){
            this.loading=false;
            this.addBizIndustryPkModal = false;
            this.$Notice.success({
              title: '提示',
              desc: res.data.info
            });
            this.industryPkShowList();
          }
        })
      },
      pk(){
        if(!this.industryPkList2.length){
          this.$Notice.warning({
            title: '提示',
            desc: '请选择PK对象'
          });
        }else{
          this.api.pk.list().then((res) => {
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
              this.pkStatus = 1;
            }
          })
        }
      },
      deletePree(ipId){
        this.api.industryPkDel.del({
          params:[ipId]
        }).then((res) => {
          if(res){
            this.$Notice.success({
              title: '提示',
              desc: res.data.info
            });
            this.industryPkShowList();
          }
        })
      },
      alert(){
        this.$Notice.success({
          title: '提示',
          desc: '当前正在pk，请等待！'
        });
      },
      deleteAllPree(){
        this.api.resetPk.del().then((res) => {
          if(res){
            this.$Notice.success({
              title: '提示',
              desc: res.data.info
            });
            this.queueInfo();
            this.industryPkShowList()
          }
        })
      },
//      店铺数据曲线

      weekinit(){
        this.api.queryTimeweek.data().then((res)=>{
          if(res.data.status=="200"){
            var timedata=[];
//            var number=[];

            console.log(res.data.rows);

            for(var i=0;i<res.data.rows.length;i++){
              timedata.push(res.data.rows[i].itcBeginTime);
              timedata.push(res.data.rows[i].itcEndTime);

              console.log(this.timeFormat(res.data.rows[i].itcBeginTime));

//              number.push(this.timeFormat(res.data.rows[i].itcBeginTime)+'~'+this.timeFormat(res.data.rows[i].itcEndTime));
            }
            var list=timedata.sort(this.sortNumber);
            var time1=this.timeFormat(list[0]);
            var time2=this.timeFormat(list[list.length-1]);
            if(time1){
              this.startTime=time1;
            }else {
              this.startTime="-"
            }
            if(time2){
              this.endTime=time2;
            }else {
              this.endTime="-";
            }

            this.timenum=res.data.rows;



            this.curvelist=this.getMonthAll(time1,time2);
            this.timeFirst=this.curvelist[this.curvelist.length-2];
            this.allindustry();
          }
        })

      },

      toggleallindustry(val){
        this.industryindex=0;
        this.timeFirst=val;
        this.allindustry();
      },
//      行业
      allindustry(){
        this.api.queryIndustrylist.data({reqData:{month:this.timeFirst}}).then((res)=>{
          if(res.data.status=="200"){
            this.industrydata=res.data.rows;
            if(this.industrydata){
              for(var i=0;i<this.industrydata.length;i++){
                if(this.industrydata[i].iiIndustryDesc=="All"){
                  this.industryId=this.industrydata[i].iiIndustryId;
                  this.industryname=this.industrydata[i].iiIndustryDesc;
                  this.industrydata.unshift(this.industrydata[i]);
                  this.industrydata.splice(i+1,1);
                  break
                }
              }
            }else {
              this.industryId='';
              this.industryname='';
            }

            this.showcurve();
          }
        })
      },
      toggleclass(i,id,name){
        this.industryindex=i;
        this.industryId=id;
        this.industryname=name;
        this.showcurve();
      },

      showcurve(){


        var monthData=[];
        for(var i=0;i<this.timenum.length;i++){

          if(this.timeFormat(this.timenum[i].itcBeginTime).substring(-1,7)==this.timeFirst){
              monthData.push(this.timeFormat(this.timenum[i].itcBeginTime)+'~'+this.timeFormat(this.timenum[i].itcEndTime))
          }

        }

        console.log(monthData);

        var myChartweek = document.getElementById('myChartweek');
        myChartweek.style.width = myChartweek.offsetWidth+'px';
        myChartweek.style.height = myChartweek.offsetHeight+'px';
        let myChartd = this.$echarts.init(myChartweek);
        var data=[];
        var list=[];
        this.api.IndustryPersformance.data({reqData:{month:this.timeFirst,iiIndustryId:this.industryId,iiIndustryDesc:this.industryname}}).then((res)=>{
          if(res.data.status=="200"){
            var foleng=res.data.mapInfo.nowData;
            let oldData= res.data.mapInfo.oldData;

            if(foleng){
              for(var i=0;i<foleng.length;i++){
                data.push(foleng[i][this.currentclick]);


              }
            }
            if(oldData){
              for(let i in oldData){
                list.push(oldData[i][this.currentclick]);
              }
            }
            console.log(data)
            console.log(list)
          }

          let option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              bottom:'0%',
              right:"38%",
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
                    color: '#666666'
                  }
                }]
            },
            grid: {
              left: '1%',
              right: '4%',
              top: '5%',
              bottom:"0%",
              containLabel: true
            },

            xAxis: {
              type: 'category',
              boundaryGap: false,
              data:monthData,
              show:false
            },
            yAxis: {
              type: 'value',

            },
            series: [
              {
                name:'目前数据',
                type:'line',
                data:data,
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
                data:list,
                lineStyle: {
                  normal: {
                    color: '#666666',
                    width: 3,
                    type: 'dashed'
                  }
                },
                itemStyle: {
                  normal: {
                    borderWidth: 3,
                    borderColor: '#666666',
                    color: '#666666'
                  }
                }
              }
            ]
          };
          myChartd.setOption(option);
        })
      },

//      点击率
      clickshow(i,val){
        this.digital=i;
        this.currentclick=val;
        this.showcurve();
      },



//      获取时间段所有月份
      getMonthAll(begin,end) {
    var d1 = begin;
    var d2 = end;
    var dateArry = new Array();
    var s1 = d1.split("-");
    var s2 = d2.split("-");
    var mCount = 0;
    if (parseInt(s1[0]) < parseInt(s2[0])) {
      mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1])+1;
    } else {
      mCount = parseInt(s2[1]) - parseInt(s1[1])+1;
    }
    if (mCount > 0) {
      var startM = parseInt(s1[1]);
      var startY = parseInt(s1[0]);
      for (var i = 0; i < mCount; i++) {
        if (startM < 12) {
          dateArry[i] = startY + "-" + (startM>9 ? startM : "0" + startM);
          startM += 1;
        } else {
          dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
          startM = 1;
          startY += 1;
        }
      }
    }
    return dateArry;
  },
//      数组排序
      sortNumber(a,b){return a - b},

//      时间格式
      timeFormat(input){
        let d = new Date(input);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month
        let day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        return year+ '-' + month + '-' + day;
      },
    },
    filters:{
      fmt:function (input) {
        let d = new Date(input);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month
        let day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        return year+ '-' + month + '-' + day;
      }
    }
  }
</script>
<style scoped>
  /*pk*/
  .flex1{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;

  }
  .deletePree{
    position: absolute;
    font-size: 25px;
    color: #999999;
    top: 5px;
    right: 8px;
    z-index: 99999;
  }
  .width_300{
    width: 300px;
  }
  .mb_15{
    margin-bottom: 15px;
  }
  .main{
    background: transparent;
    box-shadow:0 0 0 transparent;
    padding:0;
  }
  .pk-wrap{
    height: 55%;
    padding-bottom: 15px;

  }
  .pk-inner{
    padding: 15px 10px;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 5px #e1e2e2;
    border-radius:6px;
  }
  .pk-icon{
    display: block;
    width: 330px;
    max-width: 650px;
    margin: 0 auto;
  }
  .pk-icon2{
    width: 62px;
    display: inline-block;
    margin-top: 25px;
  }
  .pk-group{
    margin: 0 auto;
    text-align: center;
  }
  .pk-left,.pk-right{
    width: 40%;
    float: left;
  }
  .pk-middele{
    width: 20%;
    float: left;
  }
  .pic-box{
    width: 68px;
    height: 90px;
    /*width: 84px;
    height: 112px;*/
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 5px;
    background: linear-gradient(to bottom right, #107ed1 0%,#8a70ed 100%);
  }
  .pic-box img{
    max-width: 100%;
    max-height: 100%;
    height: 100%;
  }
  .pic-box-small{
    margin:0 10px;
    width: 60px;
    height: 80px;
    margin-top: 5px;
  }
  .pic-box-small2{
    width: 64px;
    height: 80px;
    padding: 3px;
  }
  .round{
    position: absolute;
    z-index: 999;
    width: 30px;
    height: 30px;
    display: block;
    background: #ffffff;
    border-radius: 50%;
    border: 5px solid #117ed1;
  }
  .round2{
    position: absolute;
    z-index: 999;
    width: 20px;
    height: 20px;
    display: block;
    background: #ffffff;
    border-radius: 50%;
    border: 3px solid #117ed1;
  }
  .round.round-1{
    left: -15px;
    top: -15px;
  }
  .round.round-2{
    right: -15px;
    top: -15px;
  }
  .round.round-3{
    left: -15px;
    bottom: -15px;
    border: 5px solid #4d77df;
  }
  .round.round-4{
    right: -15px;
    bottom: -15px;
    border: 5px solid #8570ec;
  }
  .round2.round-1{
    left: -10px;
    top: -10px;
  }
  .round2.round-2{
    right: -10px;
    top: -10px;
  }
  .round2.round-3{
    left: -10px;
    bottom: -10px;
    border: 3px solid #4d77df;
  }
  .round2.round-4{
    right: -10px;
    bottom: -10px;
    border: 3px solid #8570ec;
  }
  .pics{
    position: absolute;
  }
  .pk-btn{
    display: block;
    width: 110px;
    height: 36px;
    color: #FFFFFF;
    border: 0;
    border-radius: 2px;
    margin: 5px auto 0;
    font-size: 16px;
    box-shadow: 0 0 10px #b1d2f0;
    background: -moz-linear-gradient(right, #0077f0 0%, #00a0fe 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0077f0), color-stop(100%,#00a0fe));
    background: -webkit-linear-gradient(right, #0077f0 0%,#00a0fe 100%);
    background: -o-linear-gradient(right, #0077f0 0%,#00a0fe 100%);
    background: -ms-linear-gradient(right, #0077f0 0%,#00a0fe 100%);
    background: linear-gradient(to right, #0077f0 0%,#00a0fe 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0077f0', endColorstr='#00a0fe',GradientType=0 );
    box-shadow: 0px 2px 10px rgba(0, 152, 252, 0.4);
  }
  @media screen and (max-width: 1599px){
    .pic-box-small2 {
      width: 54px;
      height: 72px;
    }
    .pk-after-icon2{
      width: 42px;
      margin: 0px auto;
    }
    .pk-btn2 {
      margin: 0 auto 0;
    }
    .task-list span.txt{
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1600px) and (max-width: 1919px){
    .pk-icon{
      width:420px;
    }
    .pk-icon2{
      width: 70px;
      margin-top: 35px;
    }
    .pic-box{
      width: 90px;
      height: 120px;
    }
    .pic-box-small{
      width: 68px;
      height: 90px;
      margin: 15px 16px 0;
    }
    .pic-box-small2{
      width: 68px;
      height: 90px;
    }
    .pk-btn{
      width: 125px;
      height: 40px;
      margin:16px auto 0;
    }
    .pk-btn2{
      margin:5px auto 0;
    }
    .pk-after .result{
      margin-top: 20px;
    }
    .pk-after-icon2{
      width: 42px;
      margin: 5px auto;
    }
  }
  @media screen and (min-width: 1920px){
    .pk-icon{
      width:500px;
    }
    .pk-icon2{
      width: 88px;
      margin-top: 43px;
    }
    .pic-box{
      width: 112px;
      height: 150px;
    }
    .pic-box-small{
      width: 92px;
      height: 120px;
      margin: 20px 20px 0;
    }
    .pic-box-small2{
      width: 75px;
      height: 100px;
    }
    .pk-btn{
      width: 150px;
      height: 44px;
      margin:20px auto 0;
    }
    .pk-btn2{
      margin:20px auto 0;
    }
    .pk-after .result{
      margin-top: 40px;
    }
    .pk-after-icon2{
      width: 55px;
      margin: 5px auto;
    }

  }
  .pk-after{
    overflow: hidden;
    height: 100%;
  }
  .pk-after .result{
    border-right: 1px solid #ddd;
    width: 31%;
    text-align: center;
    overflow: hidden;
    float: left;
    /*margin-top: 15px;*/
  }
  .pk-after .chart{
    width: 69%;
    float: left;
    height: 100%;
  }
  .pk-after .chart>div{
    height: 95%;
    width: 100%;
  }
  .center{
    margin: 0 auto!important;
  }
  .flex{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    padding:0 7%;
  }
  .margin{
    margin: 12px 0;
  }







  .map-wrap{
    height: 45%;
    padding:5px 10px 15px 10px;
    background: #FFFFFF;
    box-shadow: 0px 2px 5px #e1e2e2;
    border-radius:6px;
  }
  .map-wrap>div:nth-child(2){
    height:calc(100% - 38px);
  }

  .map-wrap>div:nth-child(2)>.chartile{
    background: #EBF0F4;
  }
  .map-wrap>div:nth-child(2)>.chartile>span{
    display: inline-block;
    width:12%;
    text-align: center;
    padding:10px 0 ;
    border-right:1px solid #DDDDDD;
    cursor: pointer;
  }
  .map-wrap>div:nth-child(2)>div{
    height:calc(100% - 80px);
  }

  .chartile .bgcolor{
    background: #ffffff;
  }

  .hangye{
    padding:8px 0;
    padding-right:28px;
    position: relative;
  }

  .hanshow{
    height:30px;
    overflow: hidden;
  }

  .hanauto{
    height:50px;
    overflow-y: auto;
  }

  .hangye strong{
    position: absolute;
    top: 8px;
    right:0;
    color: #0091FA;
  }
  .hangye>span{
    padding:0 10px;
    border-right:1px solid #DDDDDD;
    cursor: pointer;
  }
  .hangye>span:hover{
    color: #FF7518;
  }
  .hangye>.spancolor{
    color: #FF7518;
  }


  .news{
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    display: block;
    float: left;
    width: 100%;
    max-width: 300px;
    padding: 20px 0 10px 10px;
    -moz-transition: all 300ms;
    -webkit-transition: all 300ms;
    transition: all 300ms;
    background: #F0F0F0;
  }
  .news-wrap{
    background: #FFFFFF;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow:0 0 10px #DDDDDD;;
    overflow: hidden;
  }
  .news-wrap .tabs{
    border-radius: 4px 4px 0 0;
    background: #ebf0f5;
    font-size: 0;
  }
  .news-wrap .tab-list{
    width: 25%;
    text-align: center;
    display: inline-block;
    color: #94acc3;
    padding: 12px 0;
    position: relative;
    cursor: pointer;
  }

  .news-wrap .tab-list.active{
    background: #FFFFFF;
    border-top: 2px solid #2b7bd7;
    margin-top: -2px;
    z-index: 999;
  }
  .news-wrap .messages{
    height: calc(100% - 45px);
    padding: 10px 0;
    overflow: auto;
  }

  .news-wrap .messages::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .news-wrap .messages::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .news-wrap .messages::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
  .news-wrap .messages li{
    padding-bottom: 10px;
    margin: 8px 20px;
    line-height: 22px;
    border-bottom: 1px dashed #DDDDDD;
  }
  .news-wrap .messages a{
    color: #666666;
  }
  .content{
    left: 300px;
  }
  .main{
    height:100%;
  }
  .full-height{
    display: flex;
  }
  @media screen and (min-width: 1920px){
    .content-wrap{
      height: calc(100% - 80px);
    }
    .news{
      max-width: 425px;
      top: 80px;
      padding: 20px 0 20px 15px;
    }
    .news-wrap .messages li{
      padding: 10px 15px;
    }
    .content{
      left: 425px;
      padding: 20px 0 20px 20px;
    }
  }
  .main{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .tasks{
    -moz-transition: all 300ms;
    -webkit-transition: all 300ms;
    transition: all 300ms;
    -webkit-box-flex: 0 0 330px;
    -moz-box-flex: 0 0 330px;
    -webkit-flex: 0 0 330px;
    -ms-flex:0 0 330px;
    flex: 0 0 330px;
    width: 330px;
    height: 100%;
    padding: 0 10px 0 15px;

  }
  .task-inner{
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 4px;
    box-shadow:0 0 10px #DDDDDD;
    padding:25px 30px 0;
  }
  .task-tit{
    background: url(../common/images/task_title.png) center no-repeat;
    background-size: 145px 40px;
    text-align: center;
    color: #FFFFFF;
    padding:7px 7px 14px 7px;
    margin-bottom: 25px;

  }
  .task-inner>div:nth-last-of-type(1){
    height: -moz-calc(100% - 65px);
    height: -webkit-calc(100% - 65px);
    height: calc(100% - 65px);
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .task-list{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    text-align: center;
    border-top: 1px solid #e6ecf1;
    position: relative;
    cursor: pointer;
  }
  .task-list img{
    margin-bottom: 10px;
  }
  .task-list span.txt{
    display: block;
    color: #444444;
  }
  .task-list .icon {
    position: absolute;
    right: -30px;
    bottom: 10%;
  }
  .rect {
    display: block;
    width: 42px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #FFFFFF;
  }
  .triangle {
    display: block;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    position: absolute;
    left: -8px;
    top: 0;
  }
  .bg1 {
    background: #aad5c0;
  }
  .bg2 {
    background: #e0d3bb;
  }
  .bg3 {
    background: #c1cfdb;
  }
  .bg1 .triangle {
    border-right: 8px solid #aad5c0;
  }
  .bg2 .triangle {
    border-right: 8px solid #e0d3bb;
  }
  .bg3 .triangle {
    border-right: 8px solid #c1cfdb;
  }
  @media screen and (max-width: 1024px) {
    .task-list img{
      width: 60px;
    }
  }
  @media screen and (min-width: 1025px) and (max-width: 1366px) {
    .task-list img{
      width: 65px;
      margin-bottom: 0;
    }
  }
  @media screen and (min-width: 1367px) and (max-width: 1680px) {
    .task-list img{
      width: 100px;
    }
  }
  @media screen and (min-width: 1681px) {
    .task-list img{
      width: 120px;
    }
  }



  .task-wrap{
    padding: 20px;
    text-align: center;
    max-height: 400px;
    overflow: auto;
  }
  .task-wrap::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .task-wrap::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .task-wrap::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
  .task-wrap ul li{
    position: relative;
    padding-left: 20px;
    border-bottom: 1px solid #d7e6f3;
    padding-bottom: 15px;
    margin-bottom: 15px;
    text-align: left;
  }
  .task-wrap ul li:before{
    content: "";
    position: absolute;
    left: 0;
    top: 5px;
    height: 10px;
    width: 10px;
    border: 2px solid #98b0c4;
    border-radius: 50%;
    background: #FFFFFF;
  }
  .task-wrap ul li h2{
    font-weight: normal;
    overflow: hidden;
    margin-bottom: 10px;
  }

</style>
