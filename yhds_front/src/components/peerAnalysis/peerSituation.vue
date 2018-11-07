<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/peerAnalysis">同行分析</Breadcrumb-item>
      <Breadcrumb-item>同行情况查询</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <div ref="search" >
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" inline>
          <FormItem prop="keyValue">
            <Input v-model="formCustom.keyValue" @on-enter="search('formCustom')" @on-change="formCustom.keyValue=formCustom.keyValue.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入关键词查询同行信息" class="width_400"></Input>
          </FormItem>
          <Button :loading="loading" type="primary" shape="circle" class="my-btn" @click="search('formCustom')">搜索</Button>
          <Button type="warning" shape="circle"  @click="deleteQueueInfo" class="fr my-btn">删除</Button>
        </Form>
      </div>
      <Table ref="table" :loading="loading" :height="tableHeight" border stripe :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow"  @on-sort-change="sortChange"></Table>
      <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    </div>
  </div>
</template>
<script>
    export default {
      data(){
        const validateKey = (rule, value, callback) => {
          if(!value){
            callback('输入关键词查询同行信息')
          }else if(value.length>50){
            callback('关键词长度不能超过50个字符')
          }else{
            callback()
          }
        };
        return {
          totalCount:0,
          tableHeight:580,
          loading:false,
          current:1,
          offset:0,
          limit:15,
          sortType:'',
          order:'',
          formCustom:{
            keyValue:''
          },
          ruleCustom:{
            keyValue:[
              { validator: validateKey, trigger: 'blur' }
            ]
          },
          columns1:[
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            // {
            //   title: '序号',
            //   key: 'index',
            //   width:90,
            //   align: 'center',
            //   render:(h, params) => {
            //     return h('span',(params.index+1)+(this.current-1)*this.limit)
            //   }
            // },
            {
              title: '关键词',
              key: 'ipqRemark',
              align: 'center',
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
                if(params.row.ipqStatus===2){
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
                          this.$router.push({ name: 'peerSituationDetail',params: { ipqId: params.row.ipqId }})
                        }
                      }
                    }, '查看')
                  ]);
                }else if(params.row.ipqStatus===1){
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
                }else{
                  return h('div', [
                    h('span', {
                      style: {
                        color:'#666'
                      },
                      on: {
                        click: () => {

                        }
                      }
                    }, '分析失败')
                  ]);
                }
              }
            }
          ],
          tableData:[],
          selectedString:'',
        }
      },
      created(){
        this.loadShowList()
      },
      mounted(){
        this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-120;
      },
      methods:{
        formatTime(time){
          if(!time){
            return '-'
          }else{
            return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
          }
        },
        loadShowList(){
          this.loading=true;
          this.api.queueInfo.list({
            reqData:{
              ipqType:2,
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
        search(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.offset=0;
              this.current=1;
              //创建队列信息
              this.api.queryIndustry.list({
                reqData:{
                  ipqRemark:this.formCustom.keyValue
                }
              }).then((res) => {
                if(res){
                  this.$Notice.success({
                    title: '提示',
                    desc: res.data.info
                  });
                  this.loadShowList()
                }
              })
            }
          })
        },
        //选中行，返回选中行的数组
        chooseRow(selection) {
          let arr =[]
          for(var i=0;i<selection.length;i++){
            arr.push(selection[i].ipqId)
          }
          this.selectedString = arr.join(',');
          console.log(this.selectedString)
        },
        deleteQueueInfo(){
          if(!this.selectedString){
            this.$Notice.warning({
              title: '提示',
              desc: '请至少选择一条队列'
            });
          }else{
            this.api.delQueueInfo.del({
              params:[this.selectedString]
            }).then((res) => {
              if(res){
                this.$Notice.success({
                  desc: res.data.info
                });
                this.selectedString='';
                this.loadShowList()
              }
            })
          }
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
  .width_400{
    width: 400px;
  }
</style>
