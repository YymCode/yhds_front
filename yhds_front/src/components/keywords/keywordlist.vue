<template>
    <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/keywords">关键字采集</Breadcrumb-item>
        <Breadcrumb-item href="/keywords/product">产品关键词</Breadcrumb-item>
        <Breadcrumb-item>关键词列表</Breadcrumb-item>
      </Breadcrumb>
      <div class="main" ref="main">
        <div class="clr" ref="search">
          <a  href="javascript:;" class="back" @click="$router.go(-1)">&lt;&lt;返回上一级</a>
          <div class="fr padding_20">
            <Button type="primary" shape="circle" class="my-btn" @click="showFilterMoadl()">过滤</Button>
            <!--<Button type="primary"  shape="circle" class="ml_10 my-btn" @click="exportData">导出</Button>-->
            <!--<Button :loading="loading" type="primary"  shape="circle" class="ml_10 my-btn" @click="addToThesauru">添加到词库</Button>-->
            <Button :loading="loading" type="primary"  shape="circle" class="ml_10 my-btn" @click="distribution_show">添加到词库</Button>
          </div>
        </div>
        <div class="clr">
          <Table ref="table" :height="tableHeight" :loading="loading"  border stripe   :row-class-name="addRowClassName" :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow" @on-sort-change="sortChange"></Table>
          <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>

      <!--过滤弹窗-->
      <Modal ref="filterModal" v-model="filterModal" class-name="modal-body-padding small-btn-box vertical-center-modal" width="400" title="过滤" ok-text="确定" cancel-text="取消" @on-ok="filter('formFilter')">
        <div class="clr">
          <Form ref="formFilter" :model="formFilter" :rules="ruleFilter">
            <div class="fl f_15 lh_33">
              过滤关键词
            </div>
            <FormItem prop="brandWord" class="fr f_15 mb_5">
                <Checkbox v-model="formFilter.brandWord" class="f_15">过滤品牌词</Checkbox>
            </FormItem>
            <FormItem prop="keyValue">
              <Input v-model="formFilter.keyValue" placeholder="请输入过滤词" ></Input>
            </FormItem>
          </Form>
        </div>

      </Modal>
      
      <!--词库分配模态框-->
      <Modal
        ref="distribution"
        v-model="distribution"
        title="分配词库关键词"
        :styles="{top:'40px'}"
        width="420px"
        @on-ok="distribution_ok"
      >
        <div class="mode-conten">
          <RadioGroup v-model="keyAnimal" vertical :loading="keyGroupLoading" id="group">
            <Radio :label="item.wgId" v-for="item in groulist" :key="item.wgId" class="inupuradio">
              <span>{{item.wgName}}</span>
            </Radio>
          </RadioGroup>
        </div>
      </Modal>
      
    </div>

</template>

<script>
  export default {
    data () {
      //关键词搜索框验证
      const validateKey = (rule, value, callback) => {
        this.formCustom.keyValue=this._validate(1,rule, value, callback)
      };
      const validateKey2 = (rule, value, callback) => {
        this.formFilter.keyValue=this._validate(2,rule, value, callback)
      };
      return {
        //表格是否是过滤之后的数据
        isFilter:false,
        tableHeight:580,
        //数据批次号
        bkwOperationBatch:'',
        //分页参数
        totalCount:0,
        current:1,
        limit:15,
        offset:0,
        //数据 Loading 状态
        loading:false,
        //后台关键词查询表单数据
        formCustom: {
          keyValue:'',
        },
        //过滤关键词表单数据
        formFilter: {
          keyValue:'',
          brandWord:false
        },
        //验证规则
        ruleCustom: {
          keyValue: [
            { validator: validateKey, trigger: 'blur' }
          ]
        },
        ruleFilter: {
          keyValue: [
            { validator: validateKey2, trigger: 'blur' }
          ]
        },
        //选中项id的字符串
        selectedString:'',
        //添加到词库的关键词id的字符串
        thesaurusString:'',
        sortType:"",
        order:'',
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '关键词',
            key: 'pkwKeywords',
            align: 'center',
          },
          {
            title: '搜索热度',
            key: 'pkwSearchHot',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '竞争度',
            key: 'pkwCompanyCnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            width: 400,
            title: '橱窗数',
            key: 'pkwShowwinCnt',
            align: 'center',
            sortable: 'custom',
          }
        ],
        tableData: [],
        filterModal:false,
        
        keyGroupLoading:false,
        groulist:[],
        keyAnimal:'',
        textareavalue:'',
        distribution:false,
        
      }
    },
    created(){
      this.loadWordList()
    },
    mounted(){
      this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-100;
    },
    methods:{
    	//          词库表加载分组列表
      thesaurus_init(){
        this.keyGroupLoading =true;
        this.api.group_Lexicon.find().then((res)=>{
          console.log(res);
          this.groulist=res.data.rows;
          this.keyGroupLoading =false;
        })
      },
      //          词库表分配所需方法
      distribution_show(){
        this.keyAnimal='';
//            this.radiaoval='';
        if(this.textareavalue.length>0){
          this.distribution=true;
          this.thesaurus_init();
        }else {
          this.$Notice.info({
            title: '请勾选需要分配的选项',
          });
        }
      },
      //分配词库
      distribution_ok(){
      	    console.log(this.textareavalue);
            var temp = this.textareavalue.split(/[\n,]/g);
            for(var i =0;i<temp.length;i++){
              if(temp[i] == ""){
                temp.splice(i, 1);
                //删除数组索引位置应保持不变
                i--;
              }
            }
            console.log(temp+"zzz");
            var test=1
            for(var i=0;i<temp.length;i++){
              if(temp[i].match(/^\s+$/)){
                test=2
              }

            }

            if(!this.keyAnimal){
	            this.$Notice.info({
	              title: '请选择分组',
	            });
	            this.$refs.distribution.visible = true;
	            this.distribution=true
            }else {
              temp=temp.join(",");
              console.log(temp);
              this.api.group_batchAddKeywords.find({reqData:{keywords:temp,wgId:this.keyAnimal}}).then((res)=>{
                console.log(res);
                if(res.data.info=="添加成功"){
                  this.loadWordList();
                  this.$Notice.success({
                    title: '添加成功',
                  });
                }

              })
            }
      },
      _validate(type,rule, value, callback){
        let keyArr = [];
        if (value === '') {
          if(type===1){
            callback(new Error('请输入您要查询的关键词！'));
          }else{
            callback(new Error('请输入您需要过滤掉的单词！'));
          }
        } else {
          //以英文逗号分隔成数组
          keyArr = value.replace(/，/g, ',').split(',');
          this.util.removeEmptyArrayEle(keyArr)
          if(keyArr.length>3 ){
            callback(new Error('关键词不能超过3个！'));
          }else if(this.util.isArrayEleRepeat(keyArr)){
            callback(new Error('请不要输入重复的关键词！'));
          }else if(keyArr.join(',').length>=50){
            callback(new Error('关键词长度不得超过50个字符！'));
          }else{
            callback();
          }
        }
        return keyArr.join(',')
      },
      reloadData(){
        if(!this.isFilter){
          this.loadWordList()
        }else{
          this.filterWordList(this.bkwOperationBatch)
        }
      },

      //过滤
      showFilterMoadl(){
        if(!this.tableData.length){
          this.$Notice.warning({
            title: '提示',
            desc: '当前没有可过滤的数据'
          });
        }else{
          this.filterModal=true;
          this.$refs['formFilter'].resetFields();
        }
      },
      filter(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            this.isFilter=true;
            this.offset=0;
            this.current=1;
            this.$nextTick(function () {
              this.filterWordList()
            })
          }else{
            //阻止模态框关闭
            this.$refs.filterModal.visible = true;
            this.filterModal = true;
          }
        })
      },
      //过滤关键词接口
      filterWordList() {
        this.loading = true;
        let isBrandWord=0;
        if(this.formFilter.brandWord){
          isBrandWord=1
        }
        this.api.productWordFilterKeywords.filter({
          reqData:{
            "limit": this.limit,
            "offset": this.offset,
            "sort": this.sortType,
            "order": this.order,
            "sqId":this.$route.params.sqId,
            "pkwKeywords":this.formFilter.keyValue,
            "isBrandWord":isBrandWord
          }
        }).then((res) => {
          this.loading = false;
          this.tableData = res.data.rows;
          this.totalCount = Number(res.data.total);
        })
      },
      //导出
      exportData() {
        if(this.tableData.length){
          window.location.href=process.env.API_ROOT+'/alibaba/productKeywords/exportProductKeywords?sqId='+this.$route.params.sqId
        }else{
          this.$Notice.warning({
            title: '提示',
            desc: '暂无可导出数据'
          });
        }

      },
      //选中行，返回选中行的数组
      chooseRow(selection) {
        let arr =[]
        let list=[]
        for(var i=0;i<selection.length;i++){
          arr.push(selection[i].pkwId)
          list.push(selection[i].pkwKeywords)
        }
        this.selectedString = arr.join(',');
        this.textareavalue = list.join(',');
      },
      //添加到词库
      addToThesauru() {
        if(!this.selectedString){
          this.$Notice.warning({
            title: '提示',
            desc: '请至少选中一个词'
          });
        }else{
          this.loading = true;
          this.thesaurusString= this.selectedString
          this.api.addToThesaurus.add({
            reqData:{
              "keywordsIds": this.thesaurusString,
              "type":'2'
            }
          }).then((res) => {
            this.loading = false;
            this.$Notice.success({
              title: '提示',
              desc: res.data.info
            });
          })
        }
      },
      //为已添加到词库的关键词，添加高亮的样式
      addRowClassName (row, index) {
        if(this.thesaurusString.indexOf(row.pkwId)!==-1){
          return 'row-blue';
        }
        return ''
      },
      //加载关键词列表
      loadWordList() {
        this.loading = true;
        this.api.productWordList.list({
          reqData:{
            "limit": this.limit,
            "offset": this.offset,
            "sort": this.sortType,
            "order": this.order,
            "sqId":this.$route.params.sqId
          }
        }).then((res) => {
          this.loading = false;
          this.tableData = res.data.rows;
          this.totalCount = Number(res.data.total);
        })
      },
      //排序
      sortChange(column){
        //column->{column:{title: "搜索热度", key: "bkwSearchHot", align: "center", sortable: true},key:"bkwSearchHot",order:"desc"}
        this.sortType = this.util.changeStr(column.key);
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
        this.reloadData();
      },
      //切换每页显示的条数
      changePageSize(pageSize){
        this.limit = pageSize;
        this.reloadData();
      },
    }
  }
</script>
<style scoped>
  .back{
    line-height: 37px;
    font-size: 15px;
    color: rgb(1, 155, 253);
  }
  .width_400{
    width: 400px;
  }
  .lh_33{
    line-height: 33px;
  }
  .padding_20{
    padding-bottom: 20px;
  }
</style>
