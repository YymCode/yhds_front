<template>
    <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
        <Breadcrumb-item>日志</Breadcrumb-item>
      </Breadcrumb>
      <div class="main" id="body1" ref="maing">
        <Tabs value="name1" id="tabs">
          <TabPane label="出价日志" name="name1">
            <div>
              <Select v-model="modelsele" style="width:150px;margin-right: 20px" @on-change="changeLabel">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

              <DatePicker type="datetimerange" placeholder="请选择时间段" :value="timelast"  :clearable="false" @on-change="dayinit" style="width: 320px;margin-right:20px"></DatePicker>

              <Input v-model="keyname" placeholder="请输入关键词" style="width:200px" ></Input>

              <Button type="primary" shape="circle" style="margin:0 20px; padding: 8px 20px;" @click="offerinit">搜索</Button>

              <Checkbox v-model="single" style="margin-right:20px;">精准查找</Checkbox>

            </div>

            <div style="padding-top: 15px">
              <Table  :loading="loading" :height="tableHeight" border stripe :columns="columns" :data="datalist" @on-sort-change="sortChange"></Table>
              <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
            </div>

          </TabPane>
          <TabPane label="操作日志" name="name2">
            <div>
              <Select v-model="modelsele2" style="width:150px;margin-right: 10px" @on-change="operationType">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

              <Select v-model="modelsele3" style="width:150px;margin-right: 10px">
                <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

              <DatePicker type="datetimerange" placeholder="请选择时间段"  :value="opertime" :clearable="false" @on-change="operdayinit" style="width: 320px;margin-right:20px"></DatePicker>

              <Input v-model="keyname2" placeholder="请输入查找文字" style="width:200px" ></Input>

              <Button type="primary" shape="circle" style="margin:0 10px; padding: 8px 20px;" @click="operationinit">搜索</Button>

              <Checkbox v-model="single2" style="margin-right:10px;">精准查找</Checkbox>

            </div>

            <div style="padding-top: 15px">
              <Table  :loading="operloading" :height="tableHeight" border stripe :columns="opercolumns" :data="operdata" @on-sort-change="opersortChange"></Table>
              <Page v-if="opertotalCount"  :total="opertotalCount" placement="top" :current="opercurrent" :page-size="operlimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="operchangePage" @on-page-size-change="operchangePageSize"></Page>

            </div>

          </TabPane>
        </Tabs >

      </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
              tableHeight:580,
              modelsele:"0",
              cityList:[
                {
                  value: "0",
                  label: '全部策略'
                }
              ],

              keyname:"",
              single:false,
              timelast:[],

//              表格
              loading:false,
              datalist:[],
              columns:[
                {
                  type: 'index',
                  title: '序号',
                  width: 80,
                  align: 'center'
                },
                {
                  title: '时间',
                  key: 'createTime',
                  align: 'center',
                  sortable:"custom",
                  render:(h, params) => {
                    return h('span',this.formatTime(params.row.createTime))
                  }
                },
                {
                  title: '关键词',
                  key: 'bblKeyword',
                  align: 'center',
                  sortable:"custom",

                },
                {
                  title: '出价',
                  key: 'bblPrice',
                  align: 'center',
                  sortable:"custom",

                },
                {
                  title: '预估排名',
                  key: 'bblRanking',
                  align: 'center',
                  sortable:"custom",

                },
                {
                  title: '对应策略',
                  key: 'bblStrategy',
                  align: 'center',
                  sortable:"custom",

                },
                {
                  title: '是否出价成功',
                  key: 'bblSuccess',
                  width: 150,
                  align: 'center',
                  sortable:"custom",
                  render:(h, params) => {
                      if(params.row.bblSuccess=="Y"){
                        return h('span', "是")

                      }else {
                        return h('span', "否")
                      }

                  }
                },
              ],

              totalCount:0,
              current:1,
              limit:15,
              offset:0,
              sortType:0,
              order:"",
//            操作
              keyname2:"",
              single2:false,
              modelsele2:"0",
              modelsele3:"0",
              cityList2:[
                {
                  value: "0",
                  label: '全部操作'
                },
                {
                  value: "ccz",
                  label: '词操作'
                },
                {
                  value: "zcz",
                  label: '组操作'
                },
                {
                  value: "clcz",
                  label: '策略操作'
                },
                {
                  value: "yjyh",
                  label: '一键优化'
                }
              ],
              cityList3:[
                {
                  value: "0",
                  label: '全部执行人'
                },
                {
                  value: "系统",
                  label: '系统'
                },
                {
                  value: "PC",
                  label: 'PC'
                },
              ],

              opertime:[],

              operloading:false,
              operdata:[],
              opercolumns:[
                {
                  type: 'index',
                  title: '序号',
                  width: 80,
                  align: 'center'
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
                {
                  title: '操作类型',
                  key: 'bolType',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '执行人',
                  key: 'bolTransactor',
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '操作记录',
                  key: 'bolNote',
                  width: 200,
                  align: 'center',
                  sortable:"custom",
                },

              ],


              opertotalCount:0,
              opercurrent:1,
              operlimit:15,
              operoffset:0,
              opersortType:0,
              operorder:"",

            }
        },
        mounted(){
          this.offerinit();
          this.operationinit();
          this.tableHeight =this.$refs.maing.offsetHeight - 200;
          this.allgroup();
        },
        methods: {
          offerinit(){
            if(this.timelast[1]){
               this.timelast= this.timelast;
            }else {
              this.timelast.push(this.getNowFormatDate());
              this.timelast.push(this.getNowFormatDate2())
            }
            console.log(this.timelast);
            var list;
            if(this.single){
              var list=1
            }else {
              var list=0
            }
            this.loading=true
            this.api.offershow.find({reqData:{bblKeyword:this.keyname,psId:this.modelsele,beginTime:this.timelast[0],endTime:this.timelast[1],limit:this.limit,offset:this.offset,order:this.order,sort:this.sortType,accurate:list}}).then((res)=>{
              this.loading=false
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
              this.offerinit();
            })
          },
          formatTime(time){
            if(!time){
              return '-'
            }else{
              return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
            }
          },
          dayinit(name){
              if(name){
                this.timelast=name
              }else {
                this.timelast=this.timelast;
              }
            console.log(this.timelast)
            this.offerinit();
          },
          changePage(currentPage){
            this.offset = (currentPage-1)*this.limit;
            this.current = currentPage;
            this.offerinit();
          },
          changePageSize(pageSize){
            this.limit = pageSize;
            this.offerinit();
          },

//          操作
          operationType(){
            this.operationinit();
          },

          operationinit(){
            if(this.opertime[1]){
              this.opertime= this.opertime;
            }else {
              this.opertime.push(this.getNowFormatDate());
              this.opertime.push(this.getNowFormatDate2())
            }

            console.log(this.opertime);
            var list;
            if(this.single2){
                var list=1
            }else {
              var list=0
            }
            this.operloading=true;
            this.api.OperateLog.find({reqData:{bolNote:this.keyname2,bolType:this.modelsele2,bolTransactor:this.modelsele3,beginTime:this.opertime[0],endTime:this.opertime[1],limit:this.operlimit,offset:this.operoffset,order:this.operorder,sort:this.opersortType,accurate:list}}).then((res)=>{
              this.operloading=false;
              if(res.data.status=="200"){
                this.operdata=res.data.rows;
                this.opertotalCount=res.data.total

              }
            })

          },
          operdayinit(name){
            if(name){
              this.opertime=name;
            }else {
              this.opertime=this.opertime;
            }
            this.operationinit();
          },
          opersortChange(column){
            console.log(column);
            this.opersortType = column.key;
            console.log(this.opersortType);
            this.operorder=column.order;
            if(this.operorder=="normal"){
              this.operorder="";
              this.opersortType='';
            }
            this.$nextTick(function () {
              this.operationinit();
            })
          },
          operchangePage(currentPage){
            this.operoffset = (currentPage-1)*this.operlimit;
            this.opercurrent = currentPage;
            this.operationinit();
          },
          operchangePageSize(pageSize){
            this.operlimit = pageSize;
            this.operationinit();
          },

//          时间
          getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + " " + "00" + seperator2 + "00"
              + seperator2 + "00";
            return currentdate;

          },
          getNowFormatDate2() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + " " + date.getHours() + seperator2 + date.getMinutes()
              + seperator2 + date.getSeconds();
              return currentdate;

          },


//          所有策略
          allgroup(){
            this.modelsele="0";
            this.cityList=[
              {
                value: "0",
                label: '全部策略'
              }
            ];
            this.api.AllStrategyList.data().then((res) => {
              if (res.data.status == 200) {
                for(var i=0;i<res.data.rows.length;i++){
                    var obj={
                      value:res.data.rows[i].psId,
                      label:res.data.rows[i].psName,
                    }
                  this.cityList.push(obj)
                }
              }
            })
          },
          changeLabel(){
            this.totalCount=0;
            this.current=1;
            this.limit=15;
            this.offset=0;
            this.sortType=0;
            this.order="";
            this.offerinit();
          },
        }
    }
</script>
<style scoped>
  #body1{
    padding:0;
  }
  #tabs{
    height:100%;
  }

</style>
