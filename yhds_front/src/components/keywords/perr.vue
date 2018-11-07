<template>
    <div class="full-height" @click="isShowCategory=false">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/keywords">关键字采集</Breadcrumb-item>
        <Breadcrumb-item>同行关键词</Breadcrumb-item>
      </Breadcrumb>
      <div class="main" ref="main">
        <div class="re" ref="search">
          <Form ref="formCustom" :model="formCustom" inline :rules="ruleCustom" >
            <FormItem prop="keyValue">
              <Input v-model="formCustom.keyValue"  @on-enter="searchCategory('formCustom')"  @on-blur="category=[]" placeholder="请输入同行旺铺链接，如modeltree.en.alibaba.com" class="width_400"></Input>
            </FormItem>
            <FormItem>
              <Tooltip content="可根据分类查询店铺关键词" placement="top-start">
                <Button type="primary" shape="circle"  @click.stop="searchCategory('formCustom')" class="my-btn">搜索</Button>
              </Tooltip>
              <!--<Tooltip content="可不选择分类搜索店铺全部关键词" placement="right">-->
                <!--<Button type="primary" :loading="loading" shape="circle"  @click="searchKeyword('formCustom')" class="ml_10 my-btn">搜索</Button>-->
              <!--</Tooltip>-->
            </FormItem>
            <FormItem class=" fr">
            	<Button type="primary"  shape="circle" class="ml_10 my-btn" @click="exportData">导出</Button>
              <Button type="warning" shape="circle"  @click="deleteRecord()" class="ml_10 my-btn">删除</Button>
            </FormItem>
          </Form>

          <div class="choose-category" v-if="isShowCategory" @click.stop="isShowCategory=true">
            <span class="triangle"></span>
            <span class="triangle2"></span>
            <span class="tit">选择&nbsp;&nbsp;&nbsp;&nbsp;产品分组</span>
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
            <CheckboxGroup v-model="category" @on-change="checkAllGroupChange">
              <Checkbox :key="item.cateCode" :label="item.cateCode" size="large" v-for="item in categories">{{item.cateName}}</Checkbox>
            </CheckboxGroup>
            <div class="center">
              <Button type="primary" shape="circle" @click.stop="searchKeyword" >确定</Button>
              <Button type="warning" shape="circle" @click.stop="resetCategory " class="ml_10">取消</Button>
            </div>
          </div>
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
	var t3
    export default {
        data () {
            return {
              loading:false,
              showReanalyseModal:false,
              tableHeight:580,
              kwqId:'',//队列ID
              sortType:"",
              order:'',
              //分页参数
              totalCount:0,
              offset:0,
              current:1,
              limit:15,
              formCustom:{
                keyValue:''
              },
              ruleCustom:{
                keyValue:[
                  {required: true,message:'请输入同行旺铺链接',trigger:'blur'}
                ]
              },
              //分类类目选中项
              indeterminate: false,
              checkAll: false,
              category:[],
              //所有类目
              categories:[],
              //是否显示分类类目
              isShowCategory:false,
              columns1:[
                {
                  type: 'selection',
                  width: 60,
                  align: 'center'
                },
                {
                  title: '链接',
                  key: 'wcqLink',
                  align: 'center',
                  render: (h, params) => {
                    return h('a', {
                      attrs:{
                        href:params.row.wcqLink,
                        target:'_blank'
                      },
                      style: {
                        color: '#019bfd'
                      }
                    }, params.row.wcqLink)
                  }
                },
                {
                  title: '产品数量',
                  key: 'wcqProductCount',
                  align: 'center',
                  sortable: 'custom',
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
                  sortable: 'custom',
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
                              this.$router.push({ name: 'keywordlist2',params: { kwqId: params.row.keywordsId }})
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
                              this.kwqId=params.row.wcqId;
                              this.showReanalyseModal = true;
                            }
                          }
                        }, '重新分析')
                      ]);
                    }else if(params.row.wcqStatus==1){
                      return h('img',{
                        attrs:{
                          src:require('../../common/images/hourglass.gif'),
                          alt:'已在分析队列，请稍候回来',
                          title:'已在分析队列，请稍候回来'
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
                              this.kwqId=params.row.wcqId;
                              this.showReanalyseModal = true;
                            }
                          }
                        }, '分析失败,重新分析')
                      ]);
                    }
                  }
                }
              ],
              tableData:[],
              selectedString:'',
              keywordsIds:''
            }
        },
        created(){
          this.loadList();
        },
        mounted(){
          this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-100;
        },
        watch:{

        },
        methods: {
          handleCheckAll () {
            var arr = [];
            for(let i in this.categories){
              arr.push(this.categories[i].cateCode)
            }
            if (this.indeterminate) {
              this.checkAll = false;
            } else {
              this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
              this.category = arr;
              console.log(this.category)
            } else {
              this.category = [];
            }
          },
          checkAllGroupChange (data) {
            if (data.length === this.categories.length) {
              this.indeterminate = false;
              this.checkAll = true;
            } else if (data.length > 0) {
              this.indeterminate = true;
              this.checkAll = false;
            } else {
              this.indeterminate = false;
              this.checkAll = false;
            }
          },
          formatTime(time){
            if(!time){
              return '-'
            }else{
              return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
            }
          },
          loadList(){
            this.loading = true;
            this.formCustom.keyValue = this.formCustom.keyValue.trim();
            let url = this.formCustom.keyValue;
            if(this.formCustom.keyValue && this.formCustom.keyValue.substr(0,8).toLowerCase()!=="https://"){
              url=  'https://'+url
            }
            this.formCustom.keyValue = url;
            this.api.perrList.list({
              reqData:{
                wcqLink:this.formCustom.keyValue,
                wcqCategrates:this.category.join(','),
                offset:this.offset,
                limit:this.limit,
                sort: this.sortType,
                order: this.order,
              }
            }).then((res) => {
              this.loading = false;
              if(res){
                console.log(res)
                this.tableData = res.data.rows;
                this.totalCount = res.data.total;
              }
            })
            
            
          },
          //查询分类
          searchCategory(name){
            this.$refs[name].validate((valid) => {
              if(valid){
                this.formCustom.keyValue = this.formCustom.keyValue.trim();
                let url = this.formCustom.keyValue;
                if(this.formCustom.keyValue && this.formCustom.keyValue.substr(0,8).toLowerCase()!=="https://"){
                  url=  'https://'+url
                }
                this.formCustom.keyValue = url;
                this.isShowCategory=true;
                this.api.showCategroyList.list({
                  reqData:{
                    cateUrl:this.formCustom.keyValue
                  }
                }).then((res) => {
                  if(res){
                    this.categories = res.data.rows;
                  }
                })
              }
            })
          },
          //查询队列
          searchKeyword(){
            if(!this.category.length){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择分组'
              });
            }else{
			  window.clearTimeout(t3);
              this.isShowCategory=false;
              this.indeterminate = false;
              this.checkAll = false;
			  this.loadList()
              this.category = [];
              this.formCustom.keyValue='';
              var th = this;
              t3 = window.setInterval(function(){
	            	th.loadList();
	            },60000);
            }

            // this.$refs[name].validate((valid) => {
            //   if(valid){
            //     this.loadList()
            //   }
            // })
          },
          //选中行，返回选中行的数组
          chooseRow(selection) {
            let arr =[];
            let keywordsId=[];
            for(var i=0;i<selection.length;i++){
              arr.push(selection[i].wcqId);
              keywordsId.push(selection[i].keywordsId);
            }
            this.selectedString = arr.join(',');
            this.keywordsIds = keywordsId.join(',');
            console.log(this.keywordsIds)
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
              }).then((res) => {
                if(res){
                  this.$Notice.success({
                    desc: res.data.info
                  });
                  this.selectedString='';
                  this.formCustom.keyValue=''
                  this.loadList()
                }
              })

            }
          },
          //取消选择分类
          resetCategory(){
            this.category=[];
            this.isShowCategory=false;
          },
          reanalyse(row){
            this.api.reanalyseIndustryWords.reanalyse({
              reqData:{
                kwqId:this.kwqId
              }
            }).then((res) =>{
              if(res){
                this.$Notice.success({
                  desc: res.data.info
                });
                this.loadList()
              }
            })
          },
          exportData() {
  
	        if(this.keywordsIds!=''){
	          window.location.href=process.env.API_ROOT+'/alibaba/industryKeywords/exportIndustryKeywords?kwqId='+this.keywordsIds
	        }else{
	          this.$Notice.warning({
	            title: '提示',
	            desc: '暂无可导出数据'
	          });
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
              this.loadList()
            })
          },
          changePage(currentPage){
            this.offset = (currentPage-1)*this.limit;
            this.current = currentPage;
            this.formCustom.keyValue=''
            this.loadList()
          },
          changePageSize(pageSize){
            this.limit = pageSize;
            this.formCustom.keyValue=''
            this.loadList()
          }
        }
    }
</script>
<style scoped>
  .re{
    position: relative;
  }
  .width_400{
    width: 400px;
  }
  .fr{
    float: right;
  }
  .center{
    text-align: center;
  }
  .choose-category{
    position: absolute;
    left: 470px;
    top: -8px;
    z-index: 999;
    padding: 20px 25px;
    background: #FFFFFF;
    border: 1px solid #d0d9e4;
    box-shadow: 0 0 10px #dde3e8;
    min-width: 300px;

  }
  .choose-category .tit{
    color: #444444;
    font-size: 16px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d0d9e4;
    display: block;
    margin-bottom: 10px;
    text-align: left
  }
  .triangle{
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    left: -18px;
    top: 17px;
    z-index: 9999999;
    border-right: 18px solid #DDDDDD;
  }
  .triangle2{
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    left: -16px;
    top: 17px;
    z-index: 9999999;
    border-right: 18px solid #FFFFFF;
  }
  .choose-category .ivu-checkbox-wrapper{
    font-size: 17px;
    display: block;
    margin-bottom: 10px;
    font-weight: 100;
  }
 .choose-category .ivu-checkbox-group{
   padding:10px 0;
   max-height: 360px;
   overflow: auto;
 }
  .choose-category .ivu-checkbox-group::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .choose-category .ivu-checkbox-group::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .choose-category .ivu-checkbox-group::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
</style>
