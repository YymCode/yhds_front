<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/peerAnalysis">同行分析</Breadcrumb-item>
      <Breadcrumb-item>企业效果简析</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <div ref="search" class="mb_20 clr">
        <!--<Button :loading="loading" type="primary" shape="circle" class="my-btn fr" @click="toDetail">新增对比</Button>-->
      </div>
      <Table ref="table" :loading="loading" :height="tableHeight" border stripe :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果"  @on-sort-change="sortChange"></Table>
      <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>

    </div>
    <Modal
    	title="提示"
    	v-model="delModal"
	  	class-name="vertical-center-modal"
	  	@on-ok="del"
    >
    	<div class="f_14 text-center">该操作无法恢复，是否确认</div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        totalCount:0,
        tableHeight:580,
        loading:false,
        current:1,
        offset:0,
        limit:15,
        sortType:'',
        order:'',
        columns1:[
          {
            title: '序号',
            key: 'index',
            width:90,
            align: 'center',
            render:(h, params) => {
              return h('span',params.index+1)
            }
          },
          {
            title: '分析目标',
            key: 'ipqRemark',
            align: 'center',
            render:(h, params) => {
              return h('span',JSON.parse(params.row.ipqRemark).myWebIp)
            }
          },
          {
            title: '对比目标',
            key: 'ipqRemark',
            align: 'center',
            render:(h, params) => {
              return h('span',JSON.parse(params.row.ipqRemark).otherWebIp)
            }
          },
          {
            title: '记录创建时间',
            key: 'createTime',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              return h('span',this.formatTime(params.row.createTime))
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 400,
            align: 'center',
            render: (h, params) => {

              if(params.row.ipqStatus==2||params.row.ipqStatus==0){
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        console.log(params.row.ipqId)
                        this.$router.push({ name: 'peerReport',params: {website:JSON.parse(params.row.ipqRemark).myWebIp,other_website:JSON.parse(params.row.ipqRemark).otherWebIp,myIpId:JSON.parse(params.row.ipqRemark).myIpId,otherIpId:JSON.parse(params.row.ipqRemark).otherIpId}})
                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                      	var json=JSON.parse(params.row.ipqRemark)
                      	this.otherIpId=JSON.parse(params.row.ipqRemark).otherIpId
                      	this.ipq_id=params.row.ipqId
                      	this.$http('alibaba/PKInfo/deletePkData',{otherIpId:this.otherIpId,ipq_id:this.ipq_id}).then((res)=>{
								        	if(res.info=='200'){
								        		this.$http('alibaba/PKInfo/newPk',{myWebIp:json.myWebIp,otherWebIp:json.otherWebIp}).then((data)=>{
									            if(data.status==200){
									              this.$Notice.success({
									                title: '提示',
									                desc: data.info
									              });
									              this.loadShowList()
									            }
														})
								        	}
								        })
                      }
                    }
                  }, '重新分析'),
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                      	this.otherIpId=JSON.parse(params.row.ipqRemark).otherIpId
                      	this.ipq_id=params.row.ipqId
                      	this.delModal=true
                      }
                    }
                  }, '删除')
                ]);
              }
              else{
                  return h('img',{
                    attrs:{
                      src:require('../../common/images/hourglass.gif'),
                      alt:'分析中',
                      title:'分析中'
                    },
                    style:{
                      width:'34px',
                      verticalAlign:'middle'
                    }
                  })
              }


            }
          }
        ],
        tableData:[],
        otherIpId:'',
        ipq_id:'',
        delModal:false,
      }
    },
    created(){
      this.loadShowList()
    },
    mounted(){
      this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-120;
    },
    methods:{
    	del(){
    		this.$http('alibaba/PKInfo/deletePkData',{otherIpId:this.otherIpId,ipq_id:this.ipq_id}).then((res)=>{
        	if(res.info=='200'){
        		this.$Notice.success({
	            title: '删除成功',
	          });
	          this.loadShowList()
        	}
        })
    	},
      formatTime(time){
        if(!time){
          return '-'
        }else{
          return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
        }
      },
      loadShowList(){
        this.loading=true;
        if(this.$route.params.offset){this.offset=this.$route.params.offset}
        this.api.queueInfo.list({
          reqData:{
            ipqType:1,
            offset:this.offset,
            limit:this.limit,
            sort:this.sortType,
            order:this.order
          }
        }).then((res) => {
          this.loading=false;
          if(res){
            this.tableData=res.data.rows;
            this.totalCount= res.data.total;
          }
        })
      },
      toDetail(){
        this.$router.push({ name: 'businessAnalysisDetail'})
      },
      //排序
      sortChange(column){
        this.sortType = this.util.changeStr(column.key);
        console.log(this.sortType);
        this.order=column.order;
        this.offset=0;
        this.current=1;
        this.$nextTick(function () {
          this.loadShowList()
        })
      },
      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
        this.loadShowList()
      },
      changePageSize(pageSize){
        this.limit = pageSize;
        this.loadShowList()
      }
    }
  };
</script>
<style scoped>

</style>
