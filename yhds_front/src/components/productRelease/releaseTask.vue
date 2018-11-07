<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/productRelease">产品发布</Breadcrumb-item>
      <Breadcrumb-item>发布任务</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <div class="title" ref="search">
        <Button type="primary" shape="circle" class="my-btn" :loading="loading" @click="addToALiBaba">确认发布</Button>
        <Button type="warning" shape="circle" class="my-btn ml_10" @click="delProduct">删除</Button>
      </div>
      <Table ref="table" :height="tableHeight" class="scrollbalWidth" :loading="loading"  border stripe   :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果"  @on-selection-change="chooseRow"></Table>
      <Page  :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        tableHeight:580,
        //分页参数
        totalCount:0,
        current:1,
        limit:15,
        offset:0,
        //数据 Loading 状态
        loading:false,
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '任务来源',
            key: 'proFrom',
            align: 'center',
            render: (h, params) => {
              if(params.row.proFrom==='1'){
                return h('span', '单个发布')
              }else if(params.row.proFrom==='2'){
                return h('span', '批量发布')
              }else if(params.row.proFrom==='3'){
                return h('span', '同步阿里')
              }
            }
          },
          {
            title: '分类名称',
            key: 'groupName',
            align: 'center',
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '主图',
            key: 'mainImageUrl',
            align: 'center',
            render:(h,params) => {
              return h('div', [
                h('img',{
                  attrs:{
                    src:params.row.mainImageUrl,
                    alt:'产品主图',
                    title:'产品主图'
                  },
                  style:{
                    width:'60px',
                    height:'60px',
                    verticalAlign:'middle'
                  }
                }),
                h('span', {
                  style: {
                    display:"block",
                    marginRight: '5px',
                    color:'red',
                    cursor: 'pointer'
                  },
                }, params.row.proSubCode),
              ]);

            }
          },
          {
            title: '关键词1',
            key: 'keywords1',
            align: 'center',
          },
          {
            title: '关键词2',
            key: 'keywords2',
            align: 'center',
          },
          {
            title: '关键词3',
            key: 'keywords3',
            align: 'center',
          },
          {
            width:150,
            title: '操作',
            key: 'bkwShowwinCnt',
            align: 'center',
            render:(h,params) => {
              return h('div', [
                /*h('span', {
                  style: {
                    marginRight: '5px',
                    color:'rgb(1, 155, 253)',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '预览'),*/
                h('span', {
                  style: {
                    marginRight: '5px',
                    color:'rgb(1, 155, 253)',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name:'single',params:{proId:params.row.proId }})
                    }
                  }
                }, '编辑'),
                h('span', {
                  style: {
                    color:'rgb(1, 155, 253)',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.del(params.row.proId)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        tableData: [],
        //选中的id数组
        selectedArr:[]
      }
    },
    created(){
      this.loadList()
    },
    mounted(){
      this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-130;
    },
    methods:{
      loadList(){
        this.loading= true;
        this.api.showWaitList.list({
          reqData:{
            offset:this.offset,
            limit:this.limit
          }
        }).then((res) => {
          this.loading= false;
          if(res){
            for(let i=0;i<res.data.rows.length;i++){
              if(res.data.rows[i].images.length){
                res.data.rows[i].mainImageUrl = res.data.rows[i].images[0].imageUrl
              }else{
                res.data.rows[i].mainImageUrl = ''
              }

            }
            this.tableData = res.data.rows;
            this.totalCount = res.data.total;
            console.log(this.tableData)
          }
        })
      },
      del(id){
        this.api.productTaskDel.del({
          params:[id]
        }).then((res) => {
          if(res.data.status==='200'){
            this.$Notice.success({
              title: '提示',
              desc: '删除成功'
            });
            this.loadList()
          }
        })
      },
      //选中行，返回选中行的数组
      chooseRow(selection) {
        let arr =[]
        for(var i=0;i<selection.length;i++){
          arr.push(selection[i].proId)
        }
        this.selectedArr = arr;
        console.log(selection)
      },
      //确认发布
      addToALiBaba() {
        if(!this.selectedArr.length){
          this.$Notice.warning({
            title: '提示',
            desc: '请至少选中一个产品'
          });
        }else{
          this.loading= true;
          this.api.addProdunctToAlibaba.add({
            reqData:this.selectedArr
          }).then((res) => {
            this.loading= false;
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
            }
            this.loadList()
          })
        }
      },
      delProduct(){
        if(!this.selectedArr.length){
          this.$Notice.warning({
            title: '提示',
            desc: '请至少选中一个产品'
          });
        }else{
          this.api.delProductBatch.del({
            reqData:this.selectedArr
          }).then((res) => {
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
            }
            this.loadList()
          })
        }
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
  .title{
    text-align: right;
    margin-bottom: 24px;
  }
</style>
