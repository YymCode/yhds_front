<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/productRelease">产品发布</Breadcrumb-item>
      <Breadcrumb-item>回收站</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <p class="f_14 color_g">提示：这里是回收被删除的任务</p>
      <div class="fr mb_10" ref="search">
        <Button type="warning" shape="circle" class="my-btn" @click="dropProductInfo">删除</Button>
        <Button type="warning"  shape="circle" class="ml_10 my-btn" @click="showDropModal">清空回收站</Button>
      </div>
      <div class="clr">
        <Table ref="table" :height="tableHeight"  border stripe   :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow" @on-sort-change="sortChange"></Table>
        <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      </div>
    </div>
    <Modal v-model="isDrop" class-name="small-btn-box " title="提示" width="350" @on-ok="dropRecycleBin()">
      <p>您确定要清空回收站吗，清空之后将无法恢复？</p>
    </Modal>
  </div>
</template>
<script>
    export default {
      data(){
        return {
          tableHeight:620,
          totalCount:0,
          limit:15,
          offset:0,
          current:1,
          order:null,
          sort:null,
          columns1: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '标题',
              key: 'subject',
              align: 'center',
              sortable: 'custom',
            },
            /*{
              title: '负责人',
              key: 'ownerMemberDisplayName',
              align: 'center',
              sortable: 'custom',
            },*/
            {
              title: '删除时间',
              key: 'updateTime',
              align: 'center',
              sortable: 'custom',
              render:(h, params) => {
                return h('span',this.formatTime(params.row.updateTime))
              }
            },
            {
              width: 300,
              title: '操作',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('span', {
                  style: {
                    cursor: "pointer",
                    color: '#019bfd'
                  },
                  on:{
                    click: () => {
                      this.renewProductInfo(params.row.proId)
                    }
                  }
                },'恢复')
              }
            }
          ],
          tableData: [],
          selectedArr:[],
          isDrop:false
        }
      },
      created(){
        this.reloadData()
      },
      mounted(){
        this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-130;
      },
      methods:{
        reloadData(){
          this.api.showRecycleBin.list({
            reqData:{
              offset:this.offset,
              limit:this.limit,
              order:this.order,
              sort:this.sort
            }
          }).then((res) =>{
            if(res){
              this.tableData = res.data.rows;
              this.totalCount = res.data.total;
            }
          })
        },
        renewProductInfo(proId){
          this.api.renewProductInfo.find({
            params:[proId]
          }).then((res) => {
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
              this.reloadData()
            }
          })
        },
        chooseRow(selection){
          let arr =[];
          for(let i=0;i<selection.length;i++){
            arr.push(selection[i].proId)
          }
          this.selectedArr = arr;
          console.log(this.selectedArr)
        },
        dropProductInfo(){
          if(!this.selectedArr.length){
            this.$Notice.warning({
              title: '提示',
              desc: '请至少选中一条记录'
            });
          }else{
            this.api.dropProductInfo.del({
              reqData:this.selectedArr
            }).then((res) => {
              if(res){
                this.$Notice.success({
                  title: '提示',
                  desc: res.data.info
                });
                this.reloadData()
              }
            })
          }
        },
        showDropModal(){
          if(!this.tableData.length){
            this.$Notice.warning({
              title: '提示',
              desc: '回收站暂无数据'
            });
          }else {
            this.isDrop = true;
          }
        },
        dropRecycleBin(){

          this.api.dropRecycleBin.del().then((res) => {
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
              this.reloadData()
            }
          })
        },
        sortChange(column){
          //column->{column:{title: "搜索热度", key: "bkwSearchHot", align: "center", sortable: true},key:"bkwSearchHot",order:"desc"}
          this.sort = this.util.changeStr(column.key);
          console.log(this.sortType);
          this.order=column.order;
          this.offset=0;
          this.current=1;
          this.$nextTick(function () {
            this.reloadData()
          })
        },
        //分页
        changePage(currentPage){
          this.offset = (currentPage-1)*this.limit;
          this.current = currentPage;
          this.reloadData()
        },
        //切换每页显示的条数
        changePageSize(pageSize){
          this.limit = pageSize;
          this.reloadData()
        },
        formatTime(time){
          if(!time){
            return '-'
          }else{
            return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
          }
        },
      }
    };
</script>
<style scoped>
  .color_g{
    color: gray;
  }
  .mt_10{
    margin-top: 10px;
  }
</style>
