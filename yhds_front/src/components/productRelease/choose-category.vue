<template>
  <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/productRelease">产品发布</Breadcrumb-item>
        <Breadcrumb-item >选择产品类别</Breadcrumb-item>
      </Breadcrumb>
      <div class="main">
        <h2>选择产品类别</h2>
        <div class="fr mb_10">
          <span>选择类目显示语言</span>
          <Select v-model="language" class="width_250 ml_10" >
            <Option value="ENGLISH" key="ENGLISH">English</Option>
            <Option value="CHINESE" key="CHINESE">简体中文</Option>
          </Select>
        </div>
        <Tabs value="tab1" class="tabs clr" @on-click="clickTab">
          <TabPane label="搜索类别" name="tab1">
            <div class="box">
              <ul>
                <li v-for="(item, index) in categories" :class="{ active: index===current }" @click="showChildren(item.categoryId,item.leafCategory,index)">
                  <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
                  <span v-if="language==='CHINESE'">{{item.cnName}}</span>
                </li>
              </ul>
            </div>
            <div class="box" v-if="categories2.length">
              <ul>
                <li v-for="(item, index) in categories2" :class="{ active: index===current2 }" @click="showChildren2(item.categoryId,item.leafCategory,index)">
                  <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
                  <span v-if="language==='CHINESE'">{{item.cnName}}</span>
                </li>
              </ul>
            </div>
            <div class="box" v-if="categories3.length">
              <ul>
                <li v-for="(item, index) in categories3" :class="{ active: index===current3 }" @click="showChildren3(item.categoryId,item.leafCategory,index)">
                  <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
                  <span v-if="language==='CHINESE'">{{item.cnName}}</span>
                </li>
              </ul>
            </div>
            <div class="box" v-if="categories4.length">
              <ul>
                <li v-for="(item, index) in categories4" :class="{ active: index===current4 }" @click="showChildren4(item.categoryId,item.leafCategory,index)">
                  <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
                  <span v-if="language==='CHINESE'">{{item.cnName}}</span>
                </li>
              </ul>
            </div>
            <div class="box" v-if="categories5.length">
              <ul>
                <li v-for="(item, index) in categories5" :class="{ active: index===current5 }" @click="showChildren5(item.categoryId,item.leafCategory,index)">
                  <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
                  <span v-if="language==='CHINESE'">{{item.cnName}}</span>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane label="您经常使用的类别" name="tab2">
            <div class="box" style="width: 28%">
              <ul>
                <li v-for="(item,index) in usedCategroy" @click="chooseUsedCategroy(index,item.categoryIds)" :class="{ active: index===curUsedIndex}">
                  <span v-if="language==='ENGLISH'">{{item.categoryNames}}</span>
                  <span v-if="language==='CHINESE'">{{item.cnNames}}</span>
                </li>
              </ul>
            </div>
          </TabPane>
        </Tabs>
        <div class="rule-links">
          <a href="//www.alibaba.com/help/rules/seller003.html?spm=a2747.post.0.0.bb0d695xab3Uu" target="_blank">国际站规则</a>
          <span>|</span>
          <a href="//www.alibaba.com/help/rules/seller/post004.html" target="_blank">禁限售商品目录</a>
          <span>|</span>
          <a href="//www.alibaba.com/help/rules/seller/post003.html" target="_blank">禁限售规则和处罚规则</a>
          <span>|</span>
          <a href="//service.alibaba.com/supplier/faq_detail/14465882.htm" target="_blank">品牌列表</a>
          <span>|</span>
          <a href="//www.alibaba.com/help/rules/seller004.html" target="_blank">知识产权规则和处罚规则</a>
          <span>|</span>
          <a href="//rule.alibaba.com/rule/detail/2016.htm" target="_blank">在线批发市场规则</a>
        </div>
        <div class="center">
         <Button :disabled="disabled" type="primary" shape="circle" @click="toSingle">我已阅读以上规则，现在发布产品</Button>
        </div>
      </div>
  </div>
</template>
<script>
    export default {
      data(){
        return {
          language:'CHINESE',
          currentTabName:'tab1',
          disabled:true,
          current:'',
          current2:'',
          current3:'',
          current4:'',
          current5:'',
          usedCategroy:[],
          categoryIdArr:[],
          categoryId:0,
          categories:[],
          categories2:[],
          categories3:[],
          categories4:[],
          categories5:[],


          curUsedIndex:'',
          proCategory:'',
        }
      },
      created(){
        this.loadCategory(1)
        this.loadUsedCategroy()
      },
      methods:{
        clickTab(name){
          this.currentTabName = name
        },
        toSingle(){
          if(this.currentTabName==='tab1'){
            this.proCategory=this.categoryIdArr.join(',');
          }
          this.$router.push({name:'single',params:{categoryId:this.categoryId,proCategory:this.proCategory,wordGroupId:this.$route.params.wordGroupId,page:this.$route.params.page }})
        },
        loadCategory(type){
          this.api.findCategory.find({
            params:[this.categoryId]
          }).then((res) => {
            if(res){
              if(type===1){
                this.categories = res.data.rows;
              }else if(type===2){
                this.categories2 = res.data.rows;
              }else if(type===3){
                this.categories3 = res.data.rows;
              }else if(type===4){
                this.categories4 = res.data.rows;
              }else if(type===5){
                this.categories5 = res.data.rows;
              }
            }
          })
        },
        loadUsedCategroy(){
          this.api.findUsedCategorys.list().then((res) => {
            if(res){
              let arr = res.data.rows[0];
              let arr2 = [];
              if(arr.length){
                for(let i=0;i<arr.length;i++){
                  arr2.push({
                    "categoryNames": arr[i].categoryNames.replace(/,/g, " >> "),
                    "categoryIds": arr[i].categoryIds,
                    "cnNames":arr[i].cnNames.replace(/,/g, " >> ")
                  })
                }
              }
              console.log(arr2)
              this.usedCategroy = arr2;
            }
          })
        },
        showChildren(categoryId,leafCategory,index){
          this.current = index;
          this.categoryId = categoryId;
          this.categoryIdArr[0] = categoryId;

          this.current2 = '';
          this.current3 = '';
          this.current4 = '';
          this.current5 = '';
          this.categories2 = [];
          this.categories3 = [];
          this.categories4 = [];
          this.categories5 = [];
          if(leafCategory==='1'){
            this.disabled=false;
          }else{
            this.disabled=true;
            this.$nextTick(function () {
              this.loadCategory(2);
            })
          }

        },
        showChildren2(categoryId,leafCategory,index){
          this.current2 = index;
          this.categoryId = categoryId;
          this.categoryIdArr[1] = categoryId;
          this.current3 = '';
          this.current4 = '';
          this.current5 = '';
          this.categories3 = [];
          this.categories4 = [];
          this.categories5 = [];
          if(leafCategory==='1'){
            this.disabled=false;
          }else{
            this.disabled=true;
            this.$nextTick(function () {
              this.loadCategory(3);
            })
          }
        },
        showChildren3(categoryId,leafCategory,index){
          this.current3 = index;
          this.categoryId = categoryId;
          this.categoryIdArr[2] = categoryId;
          this.current4 = '';
          this.current5 = '';
          this.categories4 = [];
          this.categories5 = [];
          if(leafCategory==='1'){
            this.disabled=false;
          }else{
            this.disabled=true;
            this.$nextTick(function () {
              this.loadCategory(4);

            })
          }
        },
        showChildren4(categoryId,leafCategory,index){
          this.current4 = index;
          this.categoryId = categoryId;
          this.categoryIdArr[3] = categoryId;
          this.current5 = '';
          this.categories5 = [];
          if(leafCategory==='1'){
            this.disabled=false;
          }else{
            this.disabled=true;
            this.$nextTick(function () {
              this.loadCategory(5)
            })
          }
        },
        showChildren5(categoryId,leafCategory,index){
          this.current5 = index;
          this.categoryId = categoryId;
          this.categoryIdArr[4] = categoryId;
          if(leafCategory==='1'){
            this.disabled=false;
          }else{
            this.disabled=true;
          }
        },
        chooseUsedCategroy(index,categoryIds){
          this.curUsedIndex = index;
          this.disabled=false;
          let arr = categoryIds.split(',')
          this.categoryId = arr[arr.length-1];
          this.proCategory = categoryIds;
        }
      }
    };
</script>
<style scoped>
  .width_250{
    width: 250px;
  }
  .back{
    font-size: 16px;
    display: block;
    padding: 0 0 20px;
    border-bottom: 1px solid #dbdbdb;
  }
  h2{
    font-weight: normal;
    font-size:16px;
    margin: 0 0 20px;
  }
  .tabs{
    border: 1px solid #dbdbdb;
  }

  .box{
    border: 1px solid #dbdbdb;
    width: 18%;
    float: left;
    height: 400px;
    overflow-y: auto;
    padding: 10px 0;
    margin-left: 1%;
  }
  .box ul>li{
    line-height: 26px;
    padding-left: 14px;
    margin-right: 3px;
    cursor: pointer;
  }
  .box ul>li.active{
    background: #54abca;
    color: #FFFFFF;
  }
  /*滚动条样式*/
  .box::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }
  .box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(79, 161, 190, 0.2);
    background: #54abca;
  }
  .box::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #eeeeee;
  }
  .rule-links{
    text-align: center;
    margin: 30px 0 35px;
  }
  .rule-links a{
    color: #2f8ce4;
    font-size: 14px;
    margin: 0 18px;
  }
  .center{
    text-align: center;
  }
  @media screen and (max-width: 1600px) {
    .box{
      height: 200px;
    }
    .rule-links{
      margin: 18px 0;
    }
  }
</style>
