<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
      <Breadcrumb-item>爆款打造</Breadcrumb-item>
    </Breadcrumb>
    <div class="main">
      <div>
        <div>
          <Input v-model="value" placeholder="请输入产品标题" style="width:220px"></Input>
          <Button type="primary" shape="circle" style="margin:0 10px; padding: 8px 30px;" @click="init()">搜索</Button>

        </div>

        <div>
           <span>最近一次同步时间：{{recentlyTime}}(数据每周自动更新一次)
            <strong @click="synchronous">
              马上同步
            </strong>
           </span>
        </div>

        <div>
          <Button type="primary" shape="circle" style="margin:0 10px; padding: 8px 10px;" @click="exportclick">导出产品效果数据</Button>
        </div>
      </div>
      <div ref="main6" id="w_13">
        <Table :height="tableHeight" :columns="columns" border stripe :data="datatabel" @on-sort-change="sortChange"></Table>
        <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      </div>

    </div>
  </div>

</template>

<script>
    export default {

        data () {
            return {
              recentlyTime:"",
              tableHeight:580,
              value:"",

              loading:false,
              columns:[
                {
                  type: 'index',
                  title: '序号',
                  "width": 80,
                  align: 'center'
                },
                {
                  title: '产品ID',
                  key: 'bepProductId',
                  "width": 150,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '产品标题',
                  key: 'bepSubject',
                  width: 360,
                  align: 'center',
                  sortable:"custom",
                  render: (h, params) => {
                    return h('div',[
                      h('span', {
                        style: {
                          display:"inline-block",
                          color:"#0076e8",
                          cursor:"pointer"
                        },
                        on: {
                          click: () => {
                            window.open(params.row.bepProductUrl);
                          }
                        }
                      },params.row.bepSubject),

                    ],);
                  }
                },
                {
                  title: '曝光量',
                  key: 'bepImpressionCnt',
                  "width": 100,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '点击量',
                  key: 'bepClickCnt',
                  "width": 100,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '点击率',
                  key: 'bepCtr',
                  "width": 100,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '花费',
                  key: 'bepCost',
                  "width": 120,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '平均点击花费',
                  key: 'bepClickCostAvg',
                  "width": 150,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '关键词个数',
                  key: 'bepKeywordsCount',
                  "width": 150,
                  align: 'center',
                  sortable:"custom",
                  render: (h, params) => {
                    return h('div', [
                      h('span', {
                        style: {
                          color:"#0076e8",
                          display:"inline-block",
                          cursor:"pointer"
                        },
                        on: {
                          click: () => {
                            this.jumpurl(params.row.bepProductId,params.row.bepSubject)
                          }
                        }
                      }, params.row.bepKeywordsCount)
                    ]);
                  }
                },
                {
                  title: '优先推广词数',
                  key: 'bepPromotionCount',
                  "width": 150,
                  align: 'center',
                  sortable:"custom",
                },
                {
                  title: '5星/4星/3星/其他',
                  key: 'bepFive',
                  "width": 150,
                  align: 'center',
                  render:(h, params) =>{
                    return h('div',[
                      h('span', {},params.row.bepFive+'/'+params.row.bepFour+'/'+params.row.bepThree+'/'+params.row.bepOther),
                    ],);

                  }
                },
              ],
              datatabel:[],

              totalCount:0,
              current:1,
              limit:15,
              offset:0,
              sortType:"",
              order:"",
            }
        },
        mounted(){
          this.tableHeight =this.$refs.main6.offsetHeight -120;
          this.init();
        },
        methods: {
          init(){
            this.loading=true;
            this.api.hotExplosion.find({reqData:{bepSubject:this.value,limit:this.limit,offset:this.offset,order:this.order,sort:this.sortType}}).then((res)=>{
              this.loading=false;
              if(res.data.status=="200"){
                this.datatabel=res.data.rows[0].list;
                this.totalCount=res.data.total;
                this.recentlyTime=this.formatDateTime(res.data.rows[0].time);
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
//          导出
          exportclick(){
            window.location.href=process.env.API_ROOT+'/alibaba/explosionProduct/exportProduct'
          },
//          同步
          synchronous(){
            this.api.hotsynchronizelist.data().then((res)=>{
              if(res.data.status=="200"){
                this.$Notice.info({
                  title: '正在同步数据请稍等',
                });
              }
            })
          },
          jumpurl(id,val){
            this.$router.push({
              path: 'hot',
              name: 'hot2',
              params: {
                dataObj:id,
                name:val
              }
            })
          },


//          时间
          formatDateTime(inputTime) {
            var date = new Date(inputTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
          },
    },






    }
</script>
<style scoped>
  .main>div:first-child{
    display: flex;
    justify-content: space-between;
    line-height: 40px;
  }
  .main>div:first-child strong{
    color: #0185F4;
    cursor: pointer;
  }
  .main>div:nth-child(2){
    padding-top: 15px;
    height: calc(100% - 40px);
  }
</style>
