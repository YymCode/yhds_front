<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/keywords">关键字采集</Breadcrumb-item>
      <Breadcrumb-item>产品关键词</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <div ref="search">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" inline>
          <FormItem prop="keyValue">
            <Input v-model="formCustom.keyValue" @on-enter="search('formCustom')" placeholder="请输入长度不超过50的关键词" class="width_400"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" :loading="loading" shape="circle" class="my-btn" @click="search('formCustom')">搜索</Button>
          </FormItem>
          <FormItem class=" fr">
            <Button type="warning" shape="circle"  @click="deleteRecord()" class="ml_10 my-btn">删除</Button>
          </FormItem>
        </Form>
      </div>
      <Table ref="table" :loading="loading" :height="tableHeight" border stripe :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow" @on-sort-change="sortChange"></Table>
      <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      </div>
      <Modal v-model="showReanalyseModal" class-name="small-btn-box vertical-center-modal" title="提示" width="350" @on-ok="reanalyse()">
        <p>重新分析需要等待，您确定要重新分析吗？</p>
      </Modal>
    </div>
</template>

<script>
    export default {
        data () {
          //关键词搜索框验证
          const validateKey = (rule, value, callback) => {
            if(value.length>50){
              callback(new Error('关键词长度不得超过50个字符！'));
            }else{
              callback()
              this.formCustom.keyValue=value
            }
          };
          return {
            loading:false,
            sqId:'',
            sortType:"",
            order:'',
            showReanalyseModal:false,
            tableHeight:580,
            //分页参数
            totalCount:0,
            offset:0,
            current:1,
            limit:15,
            //产品关键词查询表单数据
            formCustom: {
              keyValue:'',
            },
            //验证规则
            ruleCustom: {
              keyValue: [
                { validator: validateKey, trigger: 'blur' }
              ]
            },
            columns1:[
              {
                type: 'selection',
                width: 60,
                align: 'center'
              },
              {
                title: '关键词',
                key: 'wcqWord',
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
                title: '开始分析时间',
                key: 'wcqStartTime',
                align: 'center',
                sortable: 'custom',
                render:(h, params) => {
                  return h('span',this.formatTime(params.row.wcqStartTime))
                }
              },
              {
                title: '结束分析时间',
                key: 'wcqEndTime',
                align: 'center',
                sortable: 'custom',
                render:(h, params) => {
                  return h('span',this.formatTime(params.row.wcqEndTime))
                }
              },
              {
                title: '数据版本',
                key: 'wcqVersion',
                align: 'center',
              },
              {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                  if(params.row.wcqStatus==2){
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
                            this.$router.push({ name: 'keywordlist',params: { sqId: params.row.keywordsId }})
                          }
                        }
                      }, '查看'),
                      h('Button', {
                        props: {
                          type: 'warning',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.sqId=params.row.wcqId;
                            this.showReanalyseModal = true;
                          }
                        }
                      }, '重新分析')
                    ]);
                  }else if(params.row.wcqStatus==1){
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
                      h('Button', {
                        props: {
                          type: 'warning',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.sqId=params.row.wcqId;
                            this.showReanalyseModal = true;
                          }
                        }
                      }, '分析失败,重新分析')
                    ]);
                  }
                }
              }
            ],
            tableData:[]
          }
        },
        created(){
          this.offset =0;
          this.current = 1;
          this.limit = 15;
          this.loadShowList();
        },
        mounted(){
          this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-100;
        },
        methods: {
          formatTime(time){
            if(!time){
              return '-'
            }else{
              return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
            }
          },
          loadShowList(){
            this.loading = true;
            this.api.productShowList.list({
              reqData:{
                "limit":this.limit,
                "offset":this.offset,
                "wcqWord":this.formCustom.keyValue,
                "sort": this.sortType,
                "order": this.order,
              }
            }).then((res) =>{
              this.loading = false;
              if(res){
                this.tableData = res.data.rows;
                this.totalCount = res.data.total;
              }
            })
          },
          search(name){
            this.$refs[name].validate((valid) => {
              if(valid){
                this.offset =0;
                this.current = 1;
                this.loadShowList()
              }
            })
          },
          //选中行，返回选中行的数组
          chooseRow(selection) {
            let arr =[];
            for(var i=0;i<selection.length;i++){
              arr.push(selection[i].wcqId)
            }
            this.selectedString = arr.join(',');
            console.log(this.selectedString)
          },
          reanalyse(){
            this.api.productWordreanalyse.reanalyse({
              reqData:{
                sqId:this.sqId
              }
            }).then((res) =>{
              if(res){
                this.$Notice.success({
                  desc: res.data.info
                });
                this.loadShowList()
              }
            })
          },
          deleteRecord(){
            if(!this.selectedString){
              this.$Notice.warning({
                title: '提示',
                desc: '请至少选中一个词'
              });
            }else{
              this.api.perrListDel.del({
                params:[this.selectedString]
              }).then((res) =>{
                if(res){
                  this.$Notice.success({
                    desc: res.data.info
                  });
                  this.selectedString='';
                  this.formCustom.keyValue='';
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
            this.formCustom.keyValue=''
            this.$nextTick(function () {
              this.loadShowList()
            })
          },
          changePage(currentPage){
            this.offset = (currentPage-1)*this.limit;
            this.current = currentPage;
            this.formCustom.keyValue=''
            this.loadShowList()
          },
          changePageSize(pageSize){
            this.limit = pageSize;
            this.formCustom.keyValue=''
            this.loadShowList()
          }
        }
    }
</script>
<style scoped>
  .width_400{
    width: 400px;
  }
  .small-btn-box p{
    padding: 20px 15px 0;
  }
</style>
