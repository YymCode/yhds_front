<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/keywords">关键字采集</Breadcrumb-item>
      <Breadcrumb-item>我的违禁词</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <div class="clr" ref="search">
        <div class="fl">
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" inline>
            <FormItem prop="keyValue">
              <Input v-model="formCustom.keyValue" @on-enter="search('formCustom')" placeholder="请输入关键词" class="width_250 fl"></Input>
            </FormItem>
            <FormItem>
              <Select v-model="formCustom.ubwCategoryId" clearable  class="width_250 fl" placeholder="请选择类目">
                <Option v-for="(item,index) in categories" :value="item.bwCategory" :key="item.bwCategory" >{{item.bwCategory}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button :loading="loading" type="primary" shape="circle" class="my-btn ml_10" @click="search('formCustom')">搜索</Button>
            </FormItem>
          </Form>
        </div>
        <div class="fr">

          <Button type="primary" shape="circle" class="my-btn ml_10" @click="add">添加到白名单</Button>
          <Button type="primary" shape="circle" class="my-btn ml_10" @click="del">从白名单删除</Button>
        </div>
      </div>
      <div class="clr">
        <Table ref="table" :height="tableHeight" :loading="loading"  border stripe   :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow" @on-sort-change="sortChange"></Table>
        <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      const validateKey = (rule, value, callback) => {
        callback();
        this.formCustom.keyValue = value
      };
      return {
        tableHeight:200,
        loading:false,
        //分页参数
        totalCount:0,
        current:1,
        limit:15,
        offset:0,
        sortType:'',
        order:'',
        formCustom:{
          keyValue:'',
          ubwCategoryId:'',
        },
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
            title: '品牌词',
            key: 'ubwName',
            align: 'center',
          },
          {
            title: '在白名单',
            key: 'ubwIsWhiteList',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              if(params.row.ubwIsWhiteList==='Y'){
                return h('span', '是')
              }else{
                return h('span', '否')
              }

            }
          },
          {
            title: '类目',
            key: 'ubwCategory',
            align: 'center',
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            width:250,
            render:(h, params) => {
              return h('span',this.formatTime(params.row.createTime))
            }
          }
        ],
        tableData:[],
        ubwIdArr:[],
        categories:[],

      }
    },
    created(){
      this.loadData()
      this.findCategoryNames()
    },
    mounted(){
      this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-100;
    },
    methods:{
      formatTime(time){
        if(!time){
          return '-'
        }else{
          return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
        }
      },
      //加载列表数据
      loadData(){
        this.api.brandShowList.list({
          reqData:{
            ubwType:1,
            ubwCategory:this.formCustom.ubwCategoryId,
            ubwName:this.formCustom.keyValue,
            limit:this.limit,
            offset:this.offset,
            sort:this.sortType,
            order:this.order,
          }
        }).then((res) => {
          if(res){
            this.tableData = res.data.rows;
            this.totalCount = res.data.total;
          }
        })
      },
      //搜索
      search(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            this.offset = 0;
            this.current = 1;
            this.loadData()
          }
        })
      },
      //选中行，返回选中行的数组
      chooseRow(selection) {
        let arr =[]
        for(var i=0;i<selection.length;i++){
          arr.push(selection[i].ubwId)
        }
        this.ubwIdArr = arr;
      },
      changeWordStatus(ubwIsWhiteList){
        console.log(this.ubwIdArr)
        if(!this.ubwIdArr.length){
          this.$Notice.warning({
            title: '提示',
            desc: '请至少选中一个词'
          });
        }else{
          this.api.changeWiteList.change({
            reqData:{
              ids:this.ubwIdArr,
              ubwIsWhiteList:ubwIsWhiteList
            }
          }).then((res) => {
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
              this.loadData()
            }
          })
        }
      },
      add(){
        this.changeWordStatus("Y");
        this.ubwIdArr = []
      },
      del(){
        this.changeWordStatus("N");
        this.ubwIdArr = []
      },
      findCategoryNames(){
        this.api.findCategoryNames.list().then((res) => {
          if(res){
            this.categories=res.data.rows;
          }
        })
      },
      sortChange(column){
        //column->{column:{title: "搜索热度", key: "bkwSearchHot", align: "center", sortable: true},key:"bkwSearchHot",order:"desc"}
        this.sortType = this.util.changeStr(column.key);
        console.log(this.sortType);
        this.order=column.order;
        this.offset=0;
        this.current=1;
        this.$nextTick(function () {
          this.loadData()
        })
      },
      //分页
      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
        this.loadData()
      },
      changePageSize(pageSize){
        this.limit = pageSize;
        this.loadData()
      },
    }
  };
</script>
<style scope>
  .width_250{
    width: 250px;
  }
</style>
