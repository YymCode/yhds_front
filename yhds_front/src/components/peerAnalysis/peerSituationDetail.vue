<template>
    <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/peerAnalysis">同行分析</Breadcrumb-item>
        <Breadcrumb-item href="/peerAnalysis/peerSituation">同行情况查询</Breadcrumb-item>
        <Breadcrumb-item>同行情况详情</Breadcrumb-item>
      </Breadcrumb>
      <div class="main" ref="main">
        <div ref="search">
          <a  href="javascript:;" class="back" @click="$router.go(-1)">&lt;&lt;返回上一级</a>
          <div>
            <Input v-model="keyValue" @on-enter="search()" @on-change="keyValue=keyValue.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入企业名称或店铺网址查询" class="width_400"></Input>
            <Button :loading="loading" type="primary" shape="circle" class="my-btn ml_10" @click="search()">搜索</Button>
          </div>
        </div>
        <div class="mt_20 clr">
          <Table ref="table" :loading="loading" :height="tableHeight" border stripe :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果"  @on-sort-change="sortChange"></Table>
          <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          tableHeight:500,
          loading:false,
          keyValue:'',
          columns1:[
            {
              title: '序号',
              key: 'index',
              width:90,
              align: 'center',
              /*fixed: 'left',*/
              render:(h, params) => {
                return h('span',(params.index+1)+(this.current-1)*this.limit)
              }
            },
            {
              title: '企业名称',
              key: 'ipCompanyName',
              align: 'center',
              width:250,
              sortable: 'custom',
            },
            {
              title: '店铺网址',
              key: 'ipWebsite',
              align: 'center',
              width:200,
              render: (h, params) => {
                return h('a', {
                  attrs:{
                    href:params.row.ipWebsite,
                    target:'_blank'
                  },
                  style: {
                    color: '#019bfd'
                  }
                }, params.row.ipWebsite)
              }
            },
            {
              title: '年限',
              key: 'ipJoinYear',
              align: 'center',
              width:100,
              sortable: 'custom',
            },
            {
              title: '交易等级',
              key: 'ipTransactionLevel',
              align: 'center',
              width:120,
              sortable: 'custom',
            },
            {
              title: '橱窗数',
              key: 'ipShowcaseCount',
              align: 'center',
              width:100,
              sortable: 'custom',
            },

            {
              title: '顶展词',
              key: 'ipTopWord',
              align: 'center',
              width:100,
              sortable: 'custom',
            },
            {
              title: 'P4P覆盖词',
              key: 'ipP4pCount',
              align: 'center',
              width:120,
              sortable: 'custom',
            },
            {
              title: '产品数',
              key: 'ipProductCount',
              align: 'center',
              width:120,
              sortable: 'custom',
            },
            {
              title: '关键词数',
              key: 'ipKeywordCount',
              align: 'center',
              width:120,
              sortable: 'custom',
            },
            {
              title: '首页排名',
              key: 'ipIndexKeyword',
              align: 'center',
              width:100,
              sortable: 'custom',
            },
            {
              width:150,
              title: '操作',
              key: 'action',
              fixed: 'right',
              align: 'center',
              render: (h, params) => {
                let status = '';
                let cursor ='auto'
                if(params.row.ipState==0){
                  status = '分析'
                  cursor = 'pointer'
                }else if(params.row.ipState==1){
                  status = '分析中'
                }else {
                  status = '分析结束'
                }

                return h('div',[
                  h('span', {
                    style: {
                      cursor: "pointer",
                      color: '#019bfd'
                    },
                    on:{
                      click:() => {
                        this.addBizIndustryPk(params.row.ipWebsite)
                      }
                    }
                  }, 'PK'),
                  h('span', {
                    style: {
                      cursor: "pointer",
                      color: '#019bfd',
                      marginLeft:'8px'
                    },
                    on:{
                      click: () => {
                        this.$router.push({ name: 'businessAnalysisDetail',params: { target1iptId: params.row.ipId,target1WebSite:params.row.ipWebsite }})
                      }
                    }
                  }, '对比'),
                  h('span', {
                    style: {
                      color: '#019bfd',
                      marginLeft:'8px',
                      cursor: cursor,
                    },
                    on:{
                      click:() => {
                        if(params.row.ipState==0){
                          this.analysisIndustry(params.row.ipId)
                        }
                      }
                    }
                  }, status)
                ])
              }
            },
          ],
          tableData:[],
          totalCount:0,

          current:1,
          offset:0,
          limit:15,
          sortType:'',
          order:'',

        }
      },
      created(){
        this.loadList()
      },
      mounted(){
        this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-120;
      },
      methods:{
        loadList(){
          this.loading=true;
          this.api.queryPkResult.list({
            reqData:{
              ipqId:this.$route.params.ipqId,
              ipCompanyName:this.keyValue,
              offset:this.offset,
              limit:this.limit,
              sort:this.sortType,
              order:this.order
            }
          }).then((res) => {
            this.loading=false;
            if(res){
              this.tableData = res.data.rows;
              this.totalCount = res.data.total;
            }
          })
        },

        search(){
          this.offset=0;
          this.current=1;
          this.loadList()
        },
        //分析
        analysisIndustry(id){
          this.api.analysisIndustry.list({
            params:[id]
          }).then((res) => {
            if(res){
              this.$Notice.warning({
                title: '提示',
                desc: res.data.info
              });
              this.loadList()
            }
          })
        },
        //pk
        addBizIndustryPk(ipWebsite){
          this.api.addBizIndustryPk.add({
            reqData:{
              ipWebsite:ipWebsite
            }
          }).then((res) => {
            if(res){
              this.addBizIndustryPkModal = false;
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
            }
          })
        },
        //排序
        sortChange(column){
          this.sortType = this.util.changeStr(column.key);
          console.log(this.sortType);
          this.order=column.order;
          this.offset=0;
          this.current=1;
          this.$nextTick(function () {
            this.loadList()
          })
        },
        changePage(currentPage){
          this.offset = (currentPage-1)*this.limit;
          this.current = currentPage;
          this.loadList()
        },
        changePageSize(pageSize){
          this.limit = pageSize;
          this.loadList()
        }
      }
    };
</script>
<style scoped>
  .width_400{
    width: 400px;
  }
  .back{
    line-height: 37px;
    font-size: 15px;
    color: rgb(1, 155, 253);
    border-bottom: 1px solid #DDDDDD;
    display: block;
    padding-bottom: 10px;
    margin-bottom: 25px;
  }
</style>
