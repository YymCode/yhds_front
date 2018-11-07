<template>
    <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
        <Breadcrumb-item>优化星级</Breadcrumb-item>
      </Breadcrumb>
      <div class="main">
        <div style="height: 100%">
          <div class="mainhaed">
            <Select v-model="modelct" style="width:200px" @on-change="selechange">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="primary"  @click="sendParams">优化星级</Button>
          </div>

          <div class="mainbody" ref="mainbody">
            <Table :loading="loading" :height="tableHeight" border stripe :columns="columns" :data="datalist" @on-selection-change="handleSelectdata"></Table>
            <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin-top: 5px"></Page>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              tableHeight:580,
              loading:false,
              modelct:"x",
              cityList:[
                {
                  value: 'x',
                  label: '星级'
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
                }
              ],

              columns:[
                {
                  type: 'selection',
                  "width":60,
                  align: 'center'
                },
                {
                  title: '关键词',
                  key: 'kwKeywords',
                  align: 'center',
                },
                {
                  title: '热度',
                  key: 'kwSearchHot',
                  align: 'center',
                },
                {
                  title: '竞争度',
                  key: 'kwCompanyCnt',
                  align: 'center',
                },
                {
                  title: '橱窗数',
                  key: 'kwShowwinCnt',
                  width:150,
                  align: 'center',
                },
              ],
              datalist:[],
              //分页参数
              totalCount:0,
              current:1,
              limit:15,
              offset:0,

              ctdata:[],
            }
        },
        mounted(){
          this.init();
          this.tableHeight =this.$refs.mainbody.offsetHeight - 50;

        },
        methods: {


          init(){
                var data;
                if(this.modelct=="x"){
                  data="";
                }else {
                  data=this.modelct;
                }
               this.loading=true;
              this.api.StarOptimize.find({reqData:{starLevel:data,offset:this.offset,limit:this.limit,sort:"",order:""}}).then((res)=>{
                if(res.data.status=="200"){
                    this.loading=false;
                  console.log(res.data.rows);
                  this.datalist=res.data.rows;
                  this.totalCount=res.data.total
                }
              });
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

          selechange(){
              this.totalCount=0;
              this.current=1;
              this.limit=15;
              this.offset=0;
              this.init();
          },

          handleSelectdata(selection){
            this.ctdata=[];
            console.log(selection);
            for(var i=0;i<selection.length;i++){
              this.ctdata.push(selection[i].kwKeywords);
            }
            console.log(this.ctdata);
          },
          sendParams(){
            if(this.ctdata.length>0){
              this.$http('alibaba/productRelease/OptimizationAscension',{kw_keywords:this.ctdata.join(',')}).then(res =>{
              	this.$Notice.info({
	                title: '优化成功',
	            });
              })
//            this.$router.push({
//              path: 'productRelease/batch',
//              name: 'batch',
//              params: {
//                kwIds:this.ctdata,
//                type:1,
//                analysisType:this.$route.params.analysisType
//              }
//            })
            }else {
              this.$Notice.warning({
                title: '请选择关键词',
              });
            }
          },
        }
    }
</script>
<style scoped>
.mainhaed{
  display: flex;
  height:40px;
  width:100%;
  line-height: 40px;
  justify-content: space-between;
}
.mainbody{
  padding-top: 15px;
  height: calc(100% - 40px);
}
</style>
