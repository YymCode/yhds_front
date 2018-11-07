<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/peerAnalysis">同行分析</Breadcrumb-item>
      <Breadcrumb-item href="/peerAnalysis/businessAnalysis">企业效果简析</Breadcrumb-item>
      <Breadcrumb-item>企业效果简析详情</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <a  href="javascript:;" class="back" @click="$router.go(-1)">&lt;&lt;返回上一级</a>
      <Button v-if="!ipqId2" :loading="loading" type="primary" shape="circle" class="my-btn fr" @click="anaysis">分析</Button>
      <span class="fr tip" v-if="ipqStatus==1">数据分析中，分析结果逐步展示！</span>
      <span class="fr tip" v-if="ipqStatus==2">数据分析完成 ！</span>
      <div class="mt_20 clr tableHeigth" >
        <table>
          <thead>
            <tr>
              <th width="15%">分析项目</th>
              <th width="20%">分析目标</th>
              <th width="20%">对比目标</th>
              <th>差额</th>
              <th width="28%">优化建议</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>输入地址</td>
              <td>
                <span v-if="ipqId2">{{target1WebSite}}</span>
                <Input v-else v-model="target1WebSite"  @on-change="target1WebSite=target1WebSite.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入分析企业网站"></Input>
              </td>
              <td>
                <span v-if="ipqId2">{{target2WebSite}}</span>
                <Input v-else v-model="target2WebSite"  @on-change="target2WebSite=target2WebSite.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入分析企业网站"></Input>
              </td>
              <td>——</td>
              <td rowspan="16" v-html="detail" style="vertical-align: top;padding: 20px;line-height: 22px;text-align: justify;font-size: 13px"></td>
            </tr>
            <tr>
              <td>企业名称</td>
              <td>{{info1.ipCompanyName}}</td>
              <td>{{info2.ipCompanyName}}</td>
              <td>——</td>
            </tr>
            <tr>
              <td>店铺网站</td>
              <td>{{info1.ipWebsite}}</td>
              <td>{{info2.ipWebsite}}</td>
              <td>——</td>
            </tr>
            <tr>
              <td>年限</td>
              <td>{{info1.ipJoinYear}}</td>
              <td>{{info2.ipJoinYear}}</td>
              <td>——</td>
            </tr>
            <tr>
              <td>交易等级</td>
              <td>{{info1.ipTransactionLevel}}</td>
              <td>{{info2.ipTransactionLevel}}</td>
              <td>{{info3.ipTransactionLevel}}</td>
            </tr>
            <tr>
              <td>产品数</td>
              <td>{{info1.ipProductCount}}</td>
              <td>{{info2.ipProductCount}}</td>
              <td>{{info3.ipProductCount}}</td>
            </tr>
            <tr>
              <td>关键词数</td>
              <td>{{info1.ipKeywordCount}}</td>
              <td>{{info2.ipKeywordCount}}</td>
              <td>{{info3.ipKeywordCount}}</td>
            </tr>
            <tr>
              <td>首页排名</td>
              <td>{{info1.ipIndexKeyword}}</td>
              <td>{{info2.ipIndexKeyword}}</td>
              <td>{{info3.ipIndexKeyword}}</td>
            </tr>
            <tr>
              <td>橱窗数</td>
              <td>{{info1.ipShowcaseCount}}</td>
              <td>{{info2.ipShowcaseCount}}</td>
              <td>{{info3.ipShowcaseCount}}</td>
            </tr>
            <tr>
              <td>P4P竞价词</td>
              <td>{{info1.ipP4pCount}}</td>
              <td>{{info2.ipP4pCount}}</td>
              <td>{{info3.ipP4pCount}}</td>
            </tr>
            <tr>
              <td>顶展词</td>
              <td>{{info1.ipTopWord}}</td>
              <td>{{info2.ipTopWord}}</td>
              <td>{{info3.ipTopWord}}</td>
            </tr>

          </tbody>
        </table>
        <!--<p class="notice">注：数据详细情况及优化解决方案须阿里巴巴国际站用户购买本软件后方可查看</p>-->
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      data(){
        return {
          ipqStatus:'',
          ipqId2:'',
          loading:false,
          target1WebSite:'',
          target2WebSite:'',
          info1:{},
          info2:{},
          info3:{},
          detail:''
        }
      },
      created(){
        this.ipqStatus = this.$route.params.ipqStatus;
        this.ipqId2=this.$route.params.ipqId2;
        this.queryComparisonResult(this.$route.params.ipqId2)
        if(this.$route.params.target1iptId){
          this.target2WebSite= this.$route.params.target1WebSite
        }
      },
      methods:{
        anaysis(){
          if(!this.target1WebSite ){
            this.$Notice.warning({
              title: '提示',
              desc: '分析目标不能为空'
            });
          }else if(!this.target2WebSite){
            this.$Notice.warning({
              title: '提示',
              desc: '对比目标不能为空'
            });
          }else {
            this.api.pkComparison.add({
              reqData:{
                target2iptId:this.$route.params.target1iptId,
                target1WebSite:this.target1WebSite,
                target2WebSite:this.target2WebSite
              }
            }).then((res) => {
              if(res){
                this.$Notice.success({
                  title: '提示',
                  desc: res.data.info
                });
                this.$router.push({ name: 'businessAnalysis'})
              }
            })
          }
        },
        queryComparisonResult(id){
          if(id){
            this.api.queryComparisonResult.list({
              params:[id]
            }).then((res) => {
              if(res){
                this.info1= res.data.rows[0];
                this.info2= res.data.rows[1];
                this.info3= res.data.rows[2];
                this.target1WebSite =this.info1.ipWebsite;
                this.target2WebSite =this.info2.ipWebsite;
                this.detail=res.data.info;
              }
            })
          }
        }
      }
    };
</script>
<style scoped>

  .tableHeigth{
    height: calc(100% - 80px);
    overflow-y: auto;
  }
  table{
    max-height: 100%;

    width: 100%;
    border: 1px solid #DDDDDD;
    border-collapse: collapse;
  }
  table tr th{
    text-align: center;
    background-color: #ebf0f5;
    height: 46px;
  }
  table tr td{
    text-align: center;
    padding: 10px;
    height: 40px;
    border: 1px solid #DDDDDD;
  }
  table tr:nth-child(even){
    background: #f8f9f9;
  }
  .back{
    line-height: 37px;
    font-size: 15px;
    color: rgb(1, 155, 253);
  }
  .notice{
    color: red;
    font-size: 14px;
    line-height: 25px;
    margin: 10px 0;
    text-align: right;
  }
  .tip{
    line-height: 40px;
  }
</style>
