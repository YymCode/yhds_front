<template>
    <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/keywords">关键字采集</Breadcrumb-item>
        <Breadcrumb-item>后台关键词</Breadcrumb-item>
      </Breadcrumb>
      <div class="main" ref="main">
        <div class="clr" ref="search">
          <div class="fl">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" inline>
              <FormItem prop="keyValue">
                <Input v-model="formCustom.keyValue" @on-enter="search('formCustom')" placeholder="最多支持输入3个关键词，例如：mp3,mp4,mp5" class="width_400"></Input>
              </FormItem>
              <FormItem>
                <Button :loading="loading" type="primary" shape="circle" class="my-btn" @click="search('formCustom')">搜索</Button>
              </FormItem>
            </Form>
          </div>
          <div class="fr">
            <Button type="primary" shape="circle" class="my-btn" @click="showFilterMoadl()">过滤</Button>
            <Button type="primary"  shape="circle" class="ml_10 my-btn" @click="exportData">导出</Button>
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
            key: 'bkwKeywords',
            align: 'center',
          },
          {
            title: '搜索热度',
            key: 'bkwSearchHot',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '竞争度',
            key: 'bkwCompanyCnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            width: 400,
            title: '橱窗数',
            key: 'bkwShowwinCnt',
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
    mounted(){
      this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-100;
    },
    watch:{

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
          } else{
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
          this.loadWordList(this.bkwOperationBatch)
        }else{
          this.filterWordList(this.bkwOperationBatch)
        }
      },
      //搜索
      search (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.isFilter=false;
            this.offset=0;
            this.current=1;
            this.$nextTick(function () {
              this.loadWordList()
            })
          }
        })
      },
      //过滤
      showFilterMoadl(){
        if(!this.bkwOperationBatch){
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
              this.filterWordList(this.bkwOperationBatch)
            })
          }else{
            //阻止模态框关闭
            this.$refs.filterModal.visible = true;
            this.filterModal = true;
          }
        })
      },
      //过滤关键词接口
      filterWordList(batch) {
        this.loading = true;
        let isBrandWord=0;
        if(this.formFilter.brandWord){
          isBrandWord=1
        }
        this.api.filterKeywords.filter({
          reqData:{
            "limit": this.limit,
            "offset": this.offset,
            "sort": this.sortType,
            "order": this.order,
            "bkwOperationBatch":batch,
            "bkwKeywords":this.formFilter.keyValue,
            "isBrandWord":isBrandWord
          }
        }).then((res) => {
          this.loading = false;
          this.tableData = res.data.rows;
          console.log(this.tableData)
          this.totalCount = Number(res.data.total);
        })
      },
      //导出
      exportData() {
        if(!this.bkwOperationBatch){
          this.$Notice.warning({
            title: '提示',
            desc: '暂无可导出数据'
          });
        }else{
          window.location.href=process.env.API_ROOT+'/alibaba/backKeywords/exportKeywordsExcel?batch='+this.bkwOperationBatch
        }
      },
      //选中行，返回选中行的数组
      chooseRow(selection) {
        let arr =[]
        let list=[]
        for(var i=0;i<selection.length;i++){
          arr.push(selection[i].bkwId)
          list.push(selection[i].bkwKeywords)
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
              "type":'1'
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
        if(this.thesaurusString.indexOf(row.bkwId)!==-1){
          return 'row-blue';
        }
        return ''
      },
      //加载关键词列表
      loadWordList(batch) {
        this.loading = true;
        this.api.backKeyworld.find({
          reqData:{
            "limit": this.limit,
            "offset": this.offset,
            "sort": this.sortType,
            "order": this.order,
            "bkwOperationBatch":batch,
            "bkwKeywords": this.formCustom.keyValue
          }
        }).then((res) => {
          this.loading = false;
          if(res.data.rows.length){
            this.bkwOperationBatch= res.data.rows[0].bkwOperationBatch;
          }
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
        this.reloadData()
      },
      //切换每页显示的条数
      changePageSize(pageSize){
        this.limit = pageSize;
        this.reloadData()
      },
    }
  }
</script>
<style scoped>
  .width_400{
    width: 400px;
  }
  .lh_33{
    line-height: 33px;
  }

</style>
