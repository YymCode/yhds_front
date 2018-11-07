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
                <Input v-model="formCustom.keyValue" @on-enter="search('formCustom')" placeholder="请输入关键词" class="width_400"></Input>
              </FormItem>
              <FormItem>
                <Button :loading="loading" type="primary" shape="circle" class="my-btn" @click="search('formCustom')">搜索</Button>
              </FormItem>
            </Form>
          </div>
          <div class="fr">
            <Button type="primary" shape="circle" class="my-btn" @click="inputBrand">手动输入</Button>
            <Button type="primary"  shape="circle" class="ml_10 my-btn" @click="forbiddenWordsList">常见违禁词</Button>
            <Button type="warning"  shape="circle" class="ml_10 my-btn" @click="del">删除</Button>
          </div>
        </div>
        <div class="clr">
          <Table ref="table" :height="tableHeight" :loading="loading"  border stripe   :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow"></Table>
          <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
      <Modal v-model="addBrandModal" ref="addBrandModal" title="添加关键词" class-name="small-btn-box vertical-center-modal  " @on-ok="ok('addBrand')">
        <Form ref="addBrand" :model="addBrand" :rules="addBrandRule" >
          <FormItem label="违禁词" prop="keyValue">
            <Input v-model="addBrand.keyValue" @on-change="addBrand.keyValue=addBrand.keyValue.replace(/[\u4e00-\u9fa5]+/g, '')" :rows="4" type="textarea" placeholder="输入100个以内的关键词，每行一个，按回车换行。"></Input>
          </FormItem>
        </Form>
      </Modal>
      <Modal v-model="brandListModal" ref="BrandListModal" title="常见违禁词" class-name="small-btn-box vertical-center-modal" width="650">
          <Input v-model="bwName" @on-enter="searchCommonBrand"  placeholder="请输入关键词" class="width_200"></Input>
          <Button type="primary" shape="circle" class="my-btn ml_10" @click="searchCommonBrand()">搜索</Button>
          <Button type="primary" shape="circle" class="my-btn ml_10" @click="addToMyBrand()">添加到我的违禁词</Button>
          <div class="clr mt_10">
            <Table :height="tableHeight2" border stripe   :columns="columns2" :data="tableData2" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow2"></Table>
            <Page v-if="totalCount2" :total="totalCount2" placement="top" :current="current2" :page-size="limit2" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage2" @on-page-size-change="changePageSize2"></Page>
          </div>
        <div slot="footer"></div>
      </Modal>

    </div>
</template>
<script>
    export default {
      data(){
        const validateKey = (rule, value, callback) => {
          callback()
          this.formCustom.keyValue = value
        };
        const validateKey2 = (rule, value, callback) => {
          let arr = [];
          let arr2 = [];
          if (value === '') {
            callback(new Error('请输入您要添加的违禁词！'));
          }else{
            arr = value.split("\n");
            console.log(arr)
            this.util.removeEmptyArrayEle(arr)
            if(!arr.length){
              callback(new Error('请输入您要添加的违禁词！'));
              this.addBrand.keyValue = ''
            }else if(arr.length>100){
              callback(new Error('最多只能添加100个违禁词！'));
            }else{
              for(let i = 0;i<arr.length;i++){
                arr2.push({"ubwName":arr[i]})
              }
              this.brandArr = arr2;
              callback()
            }
          }
        };
        return {
          loading:false,
          tableHeight:540,
          tableHeight2:500,
          //分页参数
          totalCount:0,
          current:1,
          limit:15,
          offset:0,
          formCustom:{
            keyValue:''
          },
          ruleCustom: {
            keyValue: [
              { validator: validateKey, trigger: 'blur' }
            ]
          },
          addBrand:{
            keyValue:''
          },
          addBrandRule: {
            keyValue: [
              { validator: validateKey2, trigger: 'blur' }
            ]
          },
          columns1:[
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '违禁词',
              key: 'ubwName',
              align: 'center',

            },
            {
              title: '添加时间',
              key: 'createTime',
              align: 'center',
              width:500,
              render:(h, params) => {
                return h('span',this.formatTime(params.row.createTime))
              }
            }
          ],
          tableData:[],
          addBrandModal:false,
          //新增的违禁词数组
          brandArr:[],
          //违禁词id字符串，逗号隔开
          ubwIds:'',
          brandListModal:false,
          //常见违禁词相关数据
          bwName:'',//输入框数据
          totalCount2:0,
          current2:1,
          limit2:15,
          offset2:0,
          tableData2:[],
          columns2:[
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '违禁词',
              key: 'bwName',
              align: 'center',

            },
            {
              title: '使用量',
              key: 'bwUseCount',
              align: 'center',
              width:200
            }
          ],
          bwIdArr:[]
        }
      },
      created(){
        this.loadData()
      },
      mounted(){
        this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-100;
        if(window.screen.width>=1366 && window.screen.width<1920){
          this.tableHeight2 = 220
        }
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
              ubwType:2,
              ubwCategoryId:'',
              ubwName:this.formCustom.keyValue,
              limit:this.limit,
              offset:this.offset
            }
          }).then((res) => {
            if(res){
              this.tableData = res.data.rows;
              this.totalCount = res.data.total;
            }
          })
        },
        //加载常见违禁词列表
        loadCommonBrand(){
          this.api.queryBrandWord.list({
            reqData:{
              bwName:this.bwName,
              limit:this.limit2,
              offset:this.offset2
            }
          }).then((res) => {
            if(res){
              this.tableData2 = res.data.rows;
              this.totalCount2 = res.data.total;
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
        //手动输入违禁词弹窗
        inputBrand(){
          this.addBrandModal = true;
          this.$refs['addBrand'].resetFields();
        },
        //添加违禁词
        ok(name){
          this.$refs[name].validate((valid) => {
            if(valid){
              this.api.addBizUserBrandWord.add({
                reqData:  this.brandArr

              }).then((res) => {
                if(res){
                  this.$Notice.success({
                    title: '提示',
                    desc: res.data.info
                  });
                  this.formCustom.keyValue=''
                  this.offset=0;
                  this.current=1;
                  this.loadData()
                }
              })
            }else{
              //阻止模态框关闭
              this.$refs.addBrandModal.visible = true;
              this.addBrandModal = true;
            }
          })
        },
        //常见违禁词弹窗
        forbiddenWordsList(){
          this.brandListModal = true;
          this.bwName='';
          this.loadCommonBrand();
          this.$refs['addBrand'].resetFields();
        },
        //常见违禁词列表搜索
        searchCommonBrand(){
          this.offset2 = 0;
          this.current2 = 1;
          this.loadCommonBrand()
        },
        //选中行，返回选中行的数组
        chooseRow(selection) {
          let arr =[]
          for(var i=0;i<selection.length;i++){
            arr.push(selection[i].ubwId)
          }
          this.ubwIds = arr.join(',');
          console.log(this.ubwIds)
        },
        //删除
        del(){
          if(!this.ubwIds){
            this.$Notice.warning({
              title: '提示',
              desc: '请至少选中一个词'
            });
          }else{
            this.api.brandDel.del({
              params:[this.ubwIds]
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
        chooseRow2(selection){
          let arr =[]
          for(var i=0;i<selection.length;i++){
            arr.push(selection[i].bwId)
          }
          this.bwIdArr = arr;
          console.log(this.bwIdArr)
        },
        //添加到我的违禁词
        addToMyBrand(){
          if(!this.bwIdArr.length){
            this.$Notice.warning({
              title: '提示',
              desc: '请至少选中一个词'
            });
          }else{
            this.api.addMyBrand.add({
              reqData:{
                ids:this.bwIdArr
              }
            }).then((res) => {
              if(res){
                this.$Notice.success({
                  title: '提示',
                  desc: res.data.info
                });
                this.bwIdArr = [];
                this.loadCommonBrand();
                this.loadData();
              }
            })
          }
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
        //分页2
        changePage2(currentPage){
          this.offset2 = (currentPage-1)*this.limit2;
          this.current2 = currentPage;
          this.loadCommonBrand()
        },
        changePageSize2(pageSize){
          this.limit2 = pageSize;
          this.loadCommonBrand()
        },
      }
    };
</script>
<style scope>
  .width_400{
    width: 400px;
  }
  .width_200{
    width: 250px;
  }
</style>
