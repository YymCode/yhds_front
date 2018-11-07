<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/platformsAnalysis">平台分析</Breadcrumb-item>
      <Breadcrumb-item>数据分析</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <div class="search" ref="search">
        <Select v-model="month" class="width_200" placeholder="按月统计" @on-change="changeMonth">
          <Option v-for="item in monthList" :value="item" :key="item">{{ item}}</Option>
        </Select>
        <Select v-show="!showTotal" v-model="week" class="width_200 ml_10" placeholder="按周统计" @on-change="changeWeek">
          <Option v-for="(item,index) in weekList" :value="item.itcId" :key="item.itcId">{{item.value}}</Option>
        </Select>
        <Select v-if="showNatural" v-model="pageNum" class="width_200 ml_10" placeholder="关键词排名" @on-change="findKeywordsNaturalRank">
          <Option  value="1-1" key="1-1">第1页</Option>
          <Option  value="1-3" key="1-3">第1~3页</Option>
          <Option  value="4-4" key="4-4">其他</Option>
          <!--<Option  value="6-10" key="6-10">第6~10页</Option>
          <Option  value="11-20" key="11-20">第11~20页</Option>-->
        </Select>
        <span v-if="showNatural" class="ml_10">(由于阿里接口限制，只能查询前3页排名)</span>
        <Select v-if="showp4p" v-model="qsStar" class="width_200 ml_10" placeholder="星级筛选"  @on-change="findStarOptimization">
          <Option  value="1" key="1">1星</Option>
          <Option  value="2" key="2">2星</Option>
          <Option  value="3" key="3">3星</Option>
          <Option  value="4" key="4">4星</Option>
          <Option  value="5" key="5">5星</Option>
        </Select>
        <!--<p class="fr" style="line-height: 38px;color: #888888">时间：2017-12-03至2017-12-19（太平洋时间，更新周期：北京时间每天9:00前）</p>-->
      </div>
      <div class="map-content boxHeight">
        <div class="full-height">
          <div class="map-left">
            <div id="pieMap" class="pieMap"></div>
            <div class="txt" v-if="showTotal">
              <div class="flex">
              <span class="txt-wrap f_18">
                <span>总曝光量</span>
                <span>{{exposureTotal.currentExposureTotal}}</span>
              </span>
                <span class="txt-wrap f_16">
                <span>初始曝光量</span>
                <span>{{exposureTotal.initialExposureCnt}}</span>
              </span>
              </div>
              <p class="f_14 center mt_20">较软件使用前：<span class="color_red f_16">{{exposureTotal.initialExposurePeriod}}%</span></p>
            </div>
            <div class="txt2" v-if="showNatural">
              <p class="f_18">自然曝光量</p>
              <p class="f_18">{{exposureTotal.natrualExposureCnt}}</p>
              <p class="f_14 center mt_10">较上周同期：<span class="color_red f_16">{{exposureTotal.lastNatrualPeriod}}%</span></p>
            </div>
            <div class="txt2" v-if="showp4p">
              <p class="f_18">P4P曝光量</p>
              <p class="f_18">{{exposureTotal.p4pExposureCnt}}</p>
              <p class="f_14 center mt_10">较上周同期：<span class="color_red f_16">{{exposureTotal.lastP4pPeriod}}%</span></p>
            </div>
          </div>
          <div class="map-right" v-if="showTotal" >
            <div class="map-list-box">
              <div class="map-list">
                <div class="title">
                  总曝光量
                </div>
                <div class="map" id="totalMap"></div>
              </div>
              <div class="map-list">
                <div class="title">
                  自然曝光量
                </div>
                <div class="map" id="natureMap"></div>
              </div>
              <div class="map-list">
                <div class="title">
                  P4P曝光量
                </div>
                <div class="map" id="p4pMap"></div>
              </div>
            </div>
          </div>
          <div class="map-right" v-if="showNatural">
            <div class="root2-wrap flex">
              <div class="root2" id="root21" @click="showModal4">
                <img src="../../common/images/2.png" alt="" />
                <span class="name">关键词覆盖</span>
                <span class="count">{{naturalCover.aeWordCoverCnt}}</span>
                <span class="data">较上周同期:<span class="color_green f_14"> {{naturalCover.lastCoverPeriod}}%</span></span>

              </div>
              <div class="root2" id="root22" @click="showModal5">
                <img src="../../common/images/2.png" alt="" />
                <span class="name">关键词排名</span>
                <span class="count">{{naturalRank.wordsRankCnt|| 0}}</span>
                <span class="data">较上周同期:<span class="color_red f_14"> {{naturalRank.wordRankPeriod}}%</span></span>
              </div>
            </div>
            <div class="root3-wrap flex">
              <div class="root3" id="root31">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="name">蓝海词</span>
                  <span class="count">{{naturalCover.aeBlueWordCnt}}</span>
                  <span class="data">较上周同期:{{naturalCover.lastBlueCoverPeriod}}%</span>
                </div>
                <div class="right pointer" @click="findOptimizeRecord(1,'blue')">
                  <span class="">新增覆盖</span>
                  <span>{{naturalCover.aeBlueWordAddCnt}}</span>
                </div>
                <Button type="primary" shape="circle" class="" @click="showKeywordList('blue')">覆盖更多</Button>
              </div>
              <div class="root3" id="root32">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="name">红海词</span>
                  <span class="count">{{naturalCover.aeRedWordCnt}}</span>
                  <span class="data">较上周同期:{{naturalCover.lastRedCoverPeriod}}%</span>
                </div>
                <div class="right pointer" @click="findOptimizeRecord(2,'red')">
                  <span class="">新增覆盖</span>
                  <span>{{naturalCover.aeRedWordAddCnt}}</span>
                </div>
                <Button type="primary" shape="circle" class="" @click="showKeywordList('red')">覆盖更多</Button>
              </div>
              <div class="root3" id="root33">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="name">蓝海词</span>
                  <span class="count">{{naturalRank.blueSeaCnt || 0}}</span>
                  <span class="data">较上周同期:{{naturalRank.blueSeaPeriod}}%</span>
                </div>
                <div class="right2 pointer" @click="findOptimizeRecord(3,'blue')">
                  <span class="">优化词数</span>
                  <span >{{naturalRank.blueOptimizedWordCnt || 0}}</span>
                  <span class="">提升词数</span>
                  <span>{{naturalRank.blueImproveWordCnt || 0}}</span>
                </div>
                <Button type="primary" shape="circle" class="" @click="showMadol2('blue')">SEO优化</Button>
              </div>
              <div class="root3" id="root34">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="name">红海词</span>
                  <span class="count">{{naturalRank.redSeaCnt || 0}}</span>
                  <span class="data">较上周同期:{{naturalRank.redSeaPeriod }}%</span>
                </div>
                <div class="right2 pointer" @click="findOptimizeRecord(4,'red')">
                  <span class="">优化词数</span>
                  <span >{{naturalRank.redOptimizedWordCnt || 0}}</span>
                  <span class="">提升词数</span>
                  <span>{{naturalRank.redImproveWordCnt || 0}}</span>
                </div>
                <Button type="primary" shape="circle" class="" @click="showMadol2('red')">SEO优化</Button>
              </div>
            </div>
          </div>
          <div class="map-right" v-if="showp4p">
            <div class="root3-wrap flex">
              <div class="root3 root31">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="name">关键词覆盖</span>
                  <span class="count">{{p4pExposure.p4pKeywords}}/{{p4pExposure.allKeywords}}</span>
                </div>
                <div class="right">
                  <span class="">新增覆盖数</span>
                  <span>{{p4pExposure.addedCoverCnt}}</span>
                </div>
                <Button type="primary" shape="circle" class="" @click="toThesaurus">增加覆盖</Button>
              </div>
              <div class="root3 root31">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="name">推广产品</span>
                  <span class="count">{{p4pExposure.promoteProductCnt}}/{{p4pExposure.allProductCnt}}</span>
                </div>
                <div class="right">
                  <span class="">新增推广数</span>
                  <span>{{p4pExposure.addedPromProductCnt}}</span>
                </div>
                <Button type="primary" shape="circle" class="" @click="$router.push({ name: 'promote',params:{analysisType:'promotMore'}})">增加推广</Button>
              </div>
              <div class="root3 root31">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="name">星级优化</span>
                  <span class="count">{{starData.starCnt}}</span>
                </div>
                <div class="right2">
                  <span class="">优化词数</span>
                  <span>{{starData.starOptimiCnt}}</span>
                  <span class="">提升词数</span>
                  <span>{{starData.starImproveCnt}}</span>
                </div>

                <Button type="primary" shape="circle" class="" @click="$router.push({ name: 'optimize',params:{analysisType:'starOptimize'}})">星级优化</Button>
              </div>
              <div class="root3 root31">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="name">竞价前5词</span>
                  <span class="count">{{p4pExposure.topFiveCnt}}</span>
                </div>
                <div class="right">
                  <span class="">新增竞价词</span>
                  <span>{{p4pExposure.addedTopCnt}}</span>
                </div>
                <Button type="primary" shape="circle" class="" @click="$router.push({ name: 'thesaurus',params:{analysisType:'bidMore'}})">新增竞价</Button>
              </div>
              <div class="root3 root31">
                <img src="../../common/images/3.png" alt="" />
                <div class="left">
                  <span class="time">竞价时间</span>
                </div>
                <div class="right3">
                  <span class="" v-if="p4pExposure.isHasStrategy==1">已设置</span>
                  <span v-else>未设置</span>
                </div>
                <Button type="primary" shape="circle" class="" @click="$router.push({ path: '/p4p/price'})">设置</Button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div>


      </div>
    </div>
    <Modal v-model="showList" ref="showList" @on-ok="toBatch" ok-text="添加到发布任务" @on-cancel="tabName='name1'" class-name="myModal vertical-center-modal" width="750" >
      <Tabs :value="tabName" @on-click="changeTab" :animated="false">
        <TabPane label="我的词库" name="name1">
          <Input v-model="keyValue" @on-enter="search()" @on-change="keyValue=keyValue.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入关键词" class="width_300"></Input>
          <Button :loading="loading" type="primary" shape="circle" class="my-btn ml_10" @click="search()">搜索</Button>
          <div class="mt_10" >
            <p class="selected">已选：<span v-for="item in selectedKeyWordArr">{{item}}&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
            <Row>
              <Col span="5">
                <div class="group" >
                  <div class="tit">分组列表</div>
                  <ul>
                    <li v-for="(item,index) in WordGroup" :class="{active:index==wordGroupSelectedIndex}" class="pointer" @click="changeGroup(item.wgId,index)">{{item.wgName}}</li>
                  </ul>
                </div>
              </Col>
              <Col span="19">
                <Table ref="table" :loading="loading" :height="tableHeight" border stripe :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow"  @on-sort-change="sortChange"></Table>
                <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
              </Col>
            </Row>
          </div>

        </TabPane>
        <TabPane :label="'同行'+(index+1)" :name="item.ipId" v-for="(item,index) in industryPkList">

          <Input v-model="keyValue" @on-enter="search()" @on-change="keyValue=keyValue.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入关键词" class="width_300"></Input>
          <Button :loading="loading" type="primary" shape="circle" class="my-btn ml_10" @click="search()">搜索</Button>
          <p class="selected">已选：<span v-for="item in selectedKeyWordArr">{{item}}&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
          <Table class="mt_10" :loading="loading" :height="tableHeight" border stripe :columns="columns2" :data="tableData" @on-selection-change="chooseRow2" no-data-text="对不起，目前没有任何查询结果"  @on-sort-change="sortChange"></Table>
          <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
          <!--<Button type="primary" >添加到发布任务</Button>-->

        </TabPane>
      </Tabs>
    </Modal>

    <Modal v-model="showList2" ref="showList2" @on-ok="toBatch2" ok-text="添加到发布任务" class-name="myModal2 vertical-center-modal" :title="queryName" width="750" >
      <Input v-model="keyValue" @on-enter="search2()" @on-change="keyValue=keyValue.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入关键词" class="width_300"></Input>
      <Button :loading="loading" type="primary" shape="circle" class="my-btn ml_10" @click="search2()">搜索</Button>
      <div class="mt_10" >
        <p class="selected">已选：<span v-for="item in selectedKeyWordArr">{{item}}&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
        <Table :loading="loading" :height="tableHeight" border stripe :columns="columns3" :data="tableData3" no-data-text="对不起，目前没有任何查询结果"  @on-selection-change="chooseRow"   @on-sort-change="sortChange2"></Table>
        <Page v-if="totalCount2" :total="totalCount2" placement="top" :current="current2" :page-size="limit2" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage2" @on-page-size-change="changePageSize2"></Page>
      </div>
    </Modal>
    <Modal v-model="showList3"  title="我的词库" width="750" :styles="{top: '150px'}">
      <Input v-model="keyValue" @on-enter="search3()" @on-change="keyValue=keyValue.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入关键词" class="width_300"></Input>
      <Button :loading="loading" type="primary" shape="circle" class="my-btn ml_10" @click="search3()">搜索</Button>
      <div class="mt_10" >

        <Table :loading="loading" :height="tableHeight" border stripe :columns="columns1" :data="tableData4" no-data-text="对不起，目前没有任何查询结果"  @on-sort-change="sortChange3"></Table>
        <Page v-if="totalCount3" :total="totalCount3" placement="top" :current="current3" :page-size="limit3" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage3" @on-page-size-change="changePageSize3"></Page>
      </div>
    </Modal>
    <Modal v-model="showList4"  title="关键词覆盖" width="750" class-name="vertical-center-modal">
      <div id="coverMap" style="height: 300px;padding: 20px 20px 0"></div>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="showList5"  title="关键词排名" width="750" class-name="vertical-center-modal">
      <div id="rankMap" style="height: 300px;padding: 20px 20px 0"></div>
      <div slot="footer"></div>
    </Modal>


    <Modal v-model="showList6"  :title="titleName" width="750" class-name="vertical-center-modal" @on-cancel="resetModal">
      <Input v-model="keyValue2" @on-enter="findOptimizeRecord(akaKwType)" @on-change="keyValue2=keyValue2.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="输入关键词" class="width_300"></Input>
      <Button :loading="loading" type="primary" shape="circle" class="my-btn ml_10" @click="findOptimizeRecord(akaKwType)">搜索</Button>
      <div class="mt_10" >
        <Table v-if="akaKwType===1 || akaKwType===2" :loading="loading" :height="tableHeight" border stripe :columns="columns4" :data="tableData5" no-data-text="对不起，目前没有任何查询结果"  @on-sort-change="sortChange4"></Table>
        <Table v-if="akaKwType===3 || akaKwType===4" :loading="loading" :height="tableHeight" border stripe :columns="columns5" :data="tableData5" no-data-text="对不起，目前没有任何查询结果"  @on-sort-change="sortChange4"></Table>
        <Page v-if="totalCount4" :total="totalCount4" placement="top" :current="current4" :page-size="limit4" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage4" @on-page-size-change="changePageSize4"></Page>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showList4:false,
        showList5:false,

        boxHeight: 100,
        month: '',
        week:'',
        pageNum:'1-1',
        qsStar:'1',
        monthList: [],
        weekList:[],
        //展示总曝光
        showTotal: true,
        showNatural:false,
        showp4p:false,
        xData:[],
        xxData:[],
        //总曝光
        exposureTotal:{},
        //关键词覆盖
        naturalCover:{},
        //关键词排名
        naturalRank:{},
        p4pExposure:{},
        //星级优化
        starData:{},
        /*弹窗*/
        //覆盖更多
        showList:false,
        showList2:false,
        showList3:false,
        tabName:'name1',
        queryType:'',//覆盖更多 蓝海词或者红海词blue/red
        queryName:'',
        keyValue:'',
        WordGroup:[],//词库分组
        groupId:'',
        ipId:'name1',//同行id
        wordGroupSelectedIndex:0,
        loading:false,
        tableHeight:450,
        columns1:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '关键词',
            key: 'kwKeywords',
            align: 'center',
          },
          {
            title: '搜索热度',
            key: 'kwSearchHot',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '竞争度',
            key: 'kwCompanyCnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            width: 100,
            title: '橱窗数',
            key: 'kwShowwinCnt',
            align: 'center',
            sortable: 'custom',
          }
        ],
        columns2:[
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
            width: 100,
            title: '橱窗数',
            key: 'bkwShowwinCnt',
            align: 'center',
            sortable: 'custom',
          }
        ],
        tableData:[],
        offset:0,
        limit:15,
        current:1,
        totalCount:0,
        sortType:'',
        order:'',
        industryPkList:[],//同行列表
        /*seo优化*/
        offset2:0,
        limit2:15,
        current2:1,
        sortType2:'',
        order2:'',
        columns3:[
          {
          type: 'selection',
          width: 60,
          align: 'center'
        },
          {
            title: '关键词',
            key: 'kwKeywords',
            align: 'center',
          },
          {
            title: '搜索热度',
            key: 'kwSearchHot',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '竞争度',
            key: 'kwCompanyCnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '橱窗数',
            key: 'kwShowwinCnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            width: 100,
            title: '自然排名',
            key: 'rank',
            align: 'center',
            render:(h, params) => {
              if(Number(params.row.kwNaturalRanking)>3 || Number(params.row.kwNaturalRanking)<1){
                return('div','其他位置')
              }else{
                return('div','第'+params.row.kwNaturalRanking+'页,第'+params.row.kwDigits+'位')
              }

            }
          }],
        tableData3:[],
        totalCount2:0,
        /*p4p曝光*/
        offset3:0,
        limit3:15,
        current3:1,
        sortType3:'',
        order3:'',
        tableData4:[],
        totalCount3:0,
        selectedArr:[],
        selectedKeyWordArr:[],
        /*新增覆盖弹窗*/
        showList6:false,
        keyValue2:'',
        columns4:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '关键词',
            key: 'kwKeywords',
            align: 'center',
          },
          {
            title: '搜索热度',
            key: 'kwSearchHot',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '竞争度',
            key: 'kwCompanyCnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            width:180,
            title: '橱窗数',
            key: 'kwShowwinCnt',
            align: 'center',
            sortable: 'custom',
          }
          ],
        columns5:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '关键词',
            key: 'kwKeywords',
            align: 'center',
          },
          {
            title: '搜索热度',
            key: 'kwSearchHot',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '竞争度',
            key: 'kwCompanyCnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '橱窗数',
            key: 'kwShowwinCnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            width: 100,
            title: '优化前自然排名',
            key: 'rank',
            align: 'center',
            render:(h, params) => {
              if(Number(params.row.akaPrePage)>3 || Number(params.row.akaPrePage)<1){
                return('div','其他位置')
              }else{
                return('div','第'+params.row.akaPrePage+'页,第'+params.row.akaPreDigits+'位')
              }

            }
          },
          {
            width: 100,
            title: '优化后自然排名',
            key: 'rank',
            align: 'center',
            render:(h, params) => {
              if(Number(params.row.akaCurrentPage)>3 || Number(params.row.akaCurrentPage)<1){
                return('div','其他位置')
              }else{
                return('div','第'+params.row.akaCurrentPage+'页,第'+params.row.akaCurrentDigits+'位')
              }

            }
          }
        ],
        tableData5:[],
        totalCount4:0,
        offset4:0,
        limit4:15,
        current4:1,
        sortType4:'',
        order4:'',
        akaKwType:null,//1、蓝海词新增 2、红海词新增 3、蓝海词优化 4、红海词优化
        titleName:''

      }
    },
    created() {

    },
    mounted() {
      this.weekinit()
      if (this.showTotal) {
        this.queryIndustrylist(this.month)
      }

      //p4p曝光
      this.findKeywordsP4pExposure()
      this.findStarOptimization()
      //所有分组
      this.getAllWordGroup()
      //查询所有同行
      this.industryPkShowList()

    },
    methods: {
      findKeywordsCoverCurve(){
        this.api.findKeywordsCoverCurve.list({
          reqData:{
            month:this.month
          }
        }).then((res) => {
          if(res){
            let seriesData1=[];
            let seriesData2=[];
            let redWords=res.data.mapInfo.redWords;
            let blueWords=res.data.mapInfo.blueWords;
            for(let i=0;i<redWords.length;i++){
              seriesData1.push(redWords[i].aeWordCoverCnt)
            }
            for(let i=0;i<blueWords.length;i++){
              seriesData2.push(blueWords[i].aeWordCoverCnt)
            }
            console.log(seriesData2)
            this.initcCverMap(seriesData1,seriesData2)
          }
        })
      },
      showModal4(){
        this.findKeywordsCoverCurve()
        this.showList4=true;

      },
      findKeywordsRankCurve(){
        this.api.findKeywordsRankCurve.list({
          reqData:{
            month:this.month,
            pageNum:this.pageNum
          }
        }).then((res) => {
          if(res){
            let seriesData1=[];
            let seriesData2=[];
            let redWords=res.data.mapInfo.redWords;
            let blueWords=res.data.mapInfo.blueWords;
            for(let i=0;i<redWords.length;i++){
              seriesData1.push(redWords[i].wordsRankCnt)
            }
            for(let i=0;i<blueWords.length;i++){
              seriesData2.push(blueWords[i].wordsRankCnt)
            }
            this.initRankMap(seriesData1,seriesData2)
          }
        })
      },
      showModal5(){
        this.findKeywordsRankCurve()
        this.showList5=true;
      },

      //选中行，返回选中行的数组
      chooseRow(selection) {

        let arr =[];
        let arr2=[];
        for(var i=0;i<selection.length;i++){
          arr.push(selection[i].kwId)
        }
        for(let i=0;i<selection.length;i++){
          arr2.push(selection[i].kwKeywords)
        }
        this.selectedArr = arr;
        this.selectedKeyWordArr=arr2;
        console.log(selection)
      },
      chooseRow2(selection) {

        let arr =[];
        let arr2=[];
        for(var i=0;i<selection.length;i++){
          arr.push(selection[i].prkyId)
        }
        for(let i=0;i<selection.length;i++){
          arr2.push(selection[i].bkwKeywords)
        }
        this.selectedArr = arr;
        this.selectedKeyWordArr=arr2;
        console.log(selection)
      },
      commonTobatch(arr,type,analysisType){
        this.$router.push({
          path: 'productRelease/batch',
          name: 'batch',
          params: {
            kwIds:arr,
            type:type,
            analysisType:analysisType
          }
        })
      },
      toBatch(){
        let type=0;
        let analysisType='blueCoverMore';
        if(this.queryType==='red'){
          type=3;
          analysisType='redCoverMore'
        }
        if(!this.selectedArr.length){
          this.$Notice.warning({
            title: '提示',
            desc: '请至少选中一个词'
          });
          //阻止模态框关闭
          this.$refs.showList.visible = true;
          this.showList = true;
        }else{
          if(this.ipId==='name1'){
            this.commonTobatch(this.selectedArr,type,analysisType)
          }else{
            this.api.addKeywordsForIndustry.add({
              reqData:{
                ipId:this.ipId,
                keywordIds:this.selectedArr.join(',')
              }
            }).then((res) => {
              if(res){
                this.commonTobatch(res.data.rows,type,analysisType)
              }
            })
          }


        }
      },

      toBatch2(){
        let type=0;
        let analysisType='redRankOptimize';
        if(this.queryType==='blue'){
          type=2;
          analysisType='blueRankOptimize'
        }
        if(!this.selectedArr.length){
          this.$Notice.warning({
            title: '提示',
            desc: '请至少选中一个词'
          });
          //阻止模态框关闭
          this.$refs.showList2.visible = true;
          this.showList2 = true;
        }else{
          this.commonTobatch(this.selectedArr,type,analysisType)
        }
      },


      initPieMap() {
        let _this=this;
        let pieMap = this.$echarts.init(document.getElementById('pieMap'));
        let option = {

          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '总曝光量',
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              startAngle: 45,
              minAngle:80,
              data: [
                {value: this.exposureTotal.p4pExposureCnt, name: 'P4P曝光量'},
                {value: this.exposureTotal.natrualExposureCnt, name: '自然曝光量'},
              ],
              label: {
                normal: {
                  position: 'inside',
                  textStyle: {
                    color: 'rgb(255, 255, 255)'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0)'
                  },
                }
              },
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0, color: 'rgb(111, 207, 248)'
                    },
                    {
                      offset: 1, color: 'rgb(33, 121, 184)'
                    }
                  ], false),
                  shadowBlur: 20,
                  shadowOffsetX: 0,
                  shadowColor: '#216c9f'
                },
              }
            }
          ]
        };
        pieMap.setOption(option);
        pieMap.on("click", eConsole);
        let index1,index0;
        function eConsole(param) {
          if (param.dataIndex === 1) {
            _this.showTotal=false;
            _this.showNatural=true;
            _this.showp4p=false;
            if (index0) {
              clearTimeout(index0);
            }
            pieMap.dispatchAction({
              type: 'downplay',
              dataIndex: 0
            });
            index1 = setInterval(function () {
              pieMap.dispatchAction({
                type: 'highlight',
                dataIndex: 1
              });
            },100);
          } else {
            _this.showTotal=false;
            _this.showNatural=false;
            _this.showp4p=true;
            if (index1) {
              clearTimeout(index1);
            }
            pieMap.dispatchAction({
              type: 'downplay',
              dataIndex: 1
            });
            index0 = setInterval(function () {
              pieMap.dispatchAction({
                type: 'highlight',
                dataIndex: 0
              });
            },100);
          }

          /* alert(param.dataIndex);*/
        }
      },
      initTotalMap(seriesData1,seriesData2) {
        let totalMap = this.$echarts.init(document.getElementById('totalMap'));
        let option = {
          color: ['#00acf8', '#999999'],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '0%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 60,
            data: [
              {
                name: '曝光量',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              },
              {
                name: '初始曝光量',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              }]
          },
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '20%',
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              data: this.xData
            }
          ],
          yAxis: [
            {
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
            }
          ],
          series: [
            {
              symbolSize: 8,
              smooth: true,
              name: '曝光量',
              type: 'line',
              stack: '总量',
              data: seriesData1,
              lineStyle: {
                normal: {
                  width: 2,
                }
              }
            },
            {
              symbolSize: 8,
              smooth: true,
              name: '初始曝光量',
              type: 'line',
              stack: '总量',
              data: seriesData2,
              lineStyle: {
                normal: {
                  width: 2,
                  type: 'dashed'
                }
              }
            }
          ]
        };
        totalMap.setOption(option);
      },
      initNatureMap(seriesData1,seriesData2) {
        let natureMap = this.$echarts.init(document.getElementById('natureMap'));
        let option = {
          color: ['#00acf8', '#999999'],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '0%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 60,
            data: [
              {
                name: '曝光量',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              },
              {
                name: '初始曝光量',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              }]
          },
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '20%',
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              data: this.xData
            }
          ],
          yAxis: [
            {
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
            }
          ],
          series: [
            {
              symbolSize: 8,
              smooth: true,
              name: '曝光量',
              type: 'line',
              stack: '总量',
              data: seriesData1,
              lineStyle: {
                normal: {
                  width: 2,
                }
              }
            },
            {
              symbolSize: 8,
              smooth: true,
              name: '初始曝光量',
              type: 'line',
              stack: '总量',
              data: seriesData2,
              lineStyle: {
                normal: {
                  width: 2,
                  type: 'dashed'
                }
              }
            }
          ]
        };
        natureMap.setOption(option);
      },
      initp4pMap(seriesData1,seriesData2) {
        let p4pMap = this.$echarts.init(document.getElementById('p4pMap'));
        let option = {
          color: ['#00acf8', '#999999'],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '0%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 60,
            data: [
              {
                name: '曝光量',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              },
              {
                name: '初始曝光量',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              }]
          },
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '20%',
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              data: this.xData
            }
          ],
          yAxis: [
            {
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
            }
          ],
          series: [
            {
              symbolSize: 8,
              smooth: true,
              name: '曝光量',
              type: 'line',
              stack: '总量',
              data: seriesData1,
              lineStyle: {
                normal: {
                  width: 2,
                }
              }
            },
            {
              symbolSize: 8,
              smooth: true,
              name: '初始曝光量',
              type: 'line',
              stack: '总量',
              data: seriesData2,
              lineStyle: {
                normal: {
                  width: 2,
                  type: 'dashed'
                }
              }
            }
          ]
        };
        p4pMap.setOption(option);
      },

      initcCverMap(seriesData1,seriesData2){
        let coverMap = this.$echarts.init(document.getElementById('coverMap'));
        let option = {
          color: ['#00acf8', '#999999'],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '0%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 60,
            data: [
              {
                name: '蓝海词',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              },
              {
                name: '红海词',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              }]
          },
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '20%',
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              data: this.xData
            }
          ],
          yAxis: [
            {
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
            }
          ],
          series: [
            {
              symbolSize: 8,
              smooth: true,
              name: '蓝海词',
              type: 'line',
              stack: '总量',
              data: seriesData1,
              lineStyle: {
                normal: {
                  width: 2,
                }
              }
            },
            {
              symbolSize: 8,
              smooth: true,
              name: '红海词',
              type: 'line',
              stack: '总量',
              data: seriesData2,
              lineStyle: {
                normal: {
                  width: 2,
                  type: 'dashed'
                }
              }
            }
          ]
        };
        coverMap.setOption(option);
      },
      initRankMap(seriesData1,seriesData2){
        let rankMap = this.$echarts.init(document.getElementById('rankMap'));
        let option = {
          color: ['#00acf8', '#999999'],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '0%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 60,
            data: [
              {
                name: '蓝海词',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              },
              {
                name: '红海词',
                icon: 'rect',
                textStyle: {
                  color: '#999999'
                }
              }]
          },
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '20%',
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              data: this.xData
            }
          ],
          yAxis: [
            {
              axisLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: ['#dfe3e7'],
                }
              },
            }
          ],
          series: [
            {
              symbolSize: 8,
              smooth: true,
              name: '蓝海词',
              type: 'line',
              stack: '总量',
              data: seriesData1,
              lineStyle: {
                normal: {
                  width: 2,
                }
              }
            },
            {
              symbolSize: 8,
              smooth: true,
              name: '红海词',
              type: 'line',
              stack: '总量',
              data: seriesData2,
              lineStyle: {
                normal: {
                  width: 2,
                  type: 'dashed'
                }
              }
            }
          ]
        };
        rankMap.setOption(option);
      },
      /***************总曝光**********************/
      //获取时间段所有月份
      getMonthAll(begin,end) {
        var d1 = begin;
        var d2 = end;
        var dateArry = new Array();
        var s1 = d1.split("-");
        var s2 = d2.split("-");
        var mCount = 0;
        if (parseInt(s1[0]) < parseInt(s2[0])) {
          mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1])+1;
        } else {
          mCount = parseInt(s2[1]) - parseInt(s1[1])+1;
        }
        if (mCount > 0) {
          var startM = parseInt(s1[1]);
          var startY = parseInt(s1[0]);
          for (var i = 0; i < mCount; i++) {
            if (startM < 12) {
              dateArry[i] = startY + "-" + (startM>9 ? startM : "0" + startM);
              startM += 1;
            } else {
              dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
              startM = 1;
              startY += 1;
            }
          }
        }
        return dateArry;
      },
      //数组排序
      sortNumber(a,b){
        return a - b
      },

      //时间格式
      timeFormat(input){
        let d = new Date(input);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month
        let day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        return year+ '-' + month + '-' + day;
      },
      //时间格式
      ft(input){
        let d = new Date(input);
        let month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month
        let day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        return month + '/' + day;
      },
      weekinit(){
        this.api.queryTimeweek.data().then((res)=>{
          if(res.data.status==="200"){
            let weekList=[];

            /*this.weekList=res.data.rows;
            this.week=this.weekList[0].itcId;*/
            let timedata=[];
            let xData=[];

            for(let i=0;i<res.data.rows.length;i++){
              weekList.push({
                itcId:res.data.rows[i].itcId,
                value:this.ft(res.data.rows[i].itcBeginTime)+'~'+this.ft(res.data.rows[i].itcEndTime)
              })
              xData.push(this.ft(res.data.rows[i].itcBeginTime)+'~'+this.ft(res.data.rows[i].itcEndTime));
              timedata.push(res.data.rows[i].itcBeginTime);
              timedata.push(res.data.rows[i].itcEndTime);
            }
            let list=timedata.sort(this.sortNumber);
            let time1=this.timeFormat(list[0]);
            let time2=this.timeFormat(list[list.length-1]);
            this.monthList=this.getMonthAll(time1,time2);
            if(this.monthList.length>2){
              this.month= this.monthList[this.monthList.length-2];
            }else{
              this.month= this.monthList[this.monthList.length];
            }
            this.xxData = xData
            let xDataMonth = [];
            for(let i in xData){
              if(xData[i].split('~')[0].split('/')[0]===this.month.split('-')[1]){
                xDataMonth.push(xData[i])
              }
            }
            this.xData= xDataMonth;
            console.log(this.month)
            console.log(xData)
            this.weekList=weekList;
            /*this.week=this.weekList[0].itcId;*/
            //查询总曝光
            this.findKeywordsExposureTotal()

            this.findKeywordsNaturalCover()
            this.findKeywordsNaturalRank()
          }
        })

      },
      queryIndustrylist(month){
        this.api.IndustryPersformance.data({
          reqData: {
            month:month
          }
        }).then((res) => {
          if(res){
            let nowData=[];
            let oldData=[];
            if(res.data.mapInfo.nowData){
              nowData=res.data.mapInfo.nowData;
            }
            if(res.data.mapInfo.oldData){
              oldData=res.data.mapInfo.oldData;
            }
            let totalSeriesData1=[],totalSeriesData2=[];
            let naturalSeriesData1=[],naturalSeriesData2=[];
            let p4pSeriesData1=[],p4pSeriesData2=[];
            for(let i=0;i<nowData.length;i++){
              totalSeriesData1.push(nowData[i].itcImps);
              naturalSeriesData1.push(nowData[i].itcNaturalImps);
              p4pSeriesData1.push(nowData[i].itcP4pImps);
            }
            for(let i=0;i<oldData.length;i++){
              totalSeriesData2.push(oldData[i].itcImps);
              naturalSeriesData2.push(oldData[i].itcNaturalImps);
              p4pSeriesData2.push(oldData[i].itcP4pImps);
            }
            this.initTotalMap(totalSeriesData1,totalSeriesData2)
            this.initNatureMap(naturalSeriesData1,naturalSeriesData2)
            this.initp4pMap(p4pSeriesData1,p4pSeriesData2)
          }
        })
      },
      changeMonth(month){
        if(month){
          this.queryIndustrylist(month)
          this.week='';
          this.findKeywordsExposureTotal()
          this.findKeywordsNaturalCover()
          this.findKeywordsNaturalRank()
          let xDataMonth = [];
          for(let i in this.xxData){
            if(this.xxData[i].split('~')[0].split('/')[0]===this.month.split('-')[1]){
              xDataMonth.push(this.xxData[i])
            }
          }
          this.xData= xDataMonth;

        }
      },
      changeWeek(week){
        if(week){
          this.month='';
          this.findKeywordsExposureTotal()
          this.findKeywordsNaturalCover()
          this.findKeywordsNaturalRank()
        }
      },
      //查询总曝光
      findKeywordsExposureTotal(){
        let month=this.month;
        let itc= this.week;
        if(!month){
          month=null;
        }
        if(!itc){
          itc=null;
        }
        this.api.findKeywordsExposureTotal.list({
          reqData:{
            itcId:itc,
            month:month
          }
        }).then((res) => {
          if(res){
            this.exposureTotal= res.data.mapInfo.exposureTotal;
            this.initPieMap()
          }
        })
      },
      /*********************关键词覆盖************************/
      findKeywordsNaturalCover(){
        let month=this.month;
        let itc= this.week;
        if(!month){
          month=null;
        }
        if(!itc){
          itc=null;
        }
        this.api.findKeywordsNaturalCoverStatisticData.list({
          reqData:{
            itcId:itc,
            month:month
          }
        }).then((res) => {
          if(res){
            this.naturalCover= res.data.mapInfo.cover;
          }
        })
      },
      findKeywordsNaturalRank(){
        let month=this.month;
        let itc= this.week;
        if(!month){
          month=null;
        }
        if(!itc){
          itc=null;
        }
        this.api.findKeywordsNaturalRankStatisticData.list({
          reqData:{
            itcId:itc,
            month:month,
            pageNum:this.pageNum
          }
        }).then((res) => {
          if(res){
            this.naturalRank= res.data.mapInfo.rank;
          }
        })
      },
      //p4p曝光
      findKeywordsP4pExposure(){
        this.api.findKeywordsP4pExposure.list().then((res) => {
          if(res){
            this.p4pExposure = res.data.mapInfo.p4p;
          }
        })
      },
      //星级优化
      findStarOptimization(){
        this.api.findStarOptimization.list({
          params:[this.qsStar]
        }).then((res) => {
          if(res){
            this.starData=res.data.mapInfo.star;
          }
        })
      },
      /*覆盖更多弹窗*/
      showKeywordList(type){
        this.keyValue='';
        this.sortType='';
        this.order='';
        this.queryType=type;
        this.selectedArr=[];
        this.selectedKeyWordArr=[];
        if(this.tabName==='name1'){
          this.loadMywordList()
        }else{
          this.loadPreeList();
        }
        this.showList=true;
      },
      //获取所有分组
      getAllWordGroup(){
        this.api.group_Lexicon.find().then((res) => {
          if(res){
            this.WordGroup = res.data.rows;
            this.groupId = res.data.rows[0].wgId;
          }
        })
      },
      industryPkShowList(){
        this.api.industryPkShowList.list().then((res) => {
          if(res){
            let preeData=[];
            for(let i=0;i<res.data.rows.length;i++){
              if(res.data.rows[i].isoneself=='N'){
                preeData.push(res.data.rows[i])
              }
            }
            console.log(preeData)
            this.industryPkList = preeData;
          }
        })
      },
      //点击分组切换
      changeGroup(id,index){
        this.groupId = id;
        this.wordGroupSelectedIndex= index;
        this.keyValue='';
        this.current=1;
        this.offset=0;
        this.loadMywordList()
      },
      //我的词库
      loadMywordList(){
        this.api.findMyKeywordsForAnalysis.list({
          reqData:{
            "queryType": this.queryType,
            "limit": this.limit,
            "offset": this.offset,
            "order": this.order,
            "sort": this.sortType,
            "groupId": this.groupId,
            "keyword": this.keyValue
          }
        }).then((res) => {
          if(res){
            this.tableData= res.data.rows;
            this.totalCount= res.data.total;
          }
        })
      },
      //同行词库
      loadPreeList(){
        this.api.findIndustryKeywordsForAnalysis.list({
          reqData:{
            "queryType":this.queryType,
            "ipId":this.ipId,
            "keyword":this.keyValue,
            "limit":this.limit,
            "offset":this.offset,
            "order": this.order,
            "sort":this.sortType
          }
        }).then((res) => {
          if(res){
            this.tableData= res.data.rows;
            this.totalCount= res.data.total;
          }
        })
      },
      search(){
        this.offset=0;
        this.current=1;
        if(this.tabName==='name1'){
          this.loadMywordList()
        }else{
          this.loadPreeList();
        }
      },
      changeTab(name){
        this.keyValue = '';
        this.current = 1;
        this.offset = 0;
        this.tableData=[];
        this.totalCount=0;
        this.selectedArr=[];
        this.selectedKeyWordArr=[];
        this.tabName = name;
        this.sortType='';
        this.order='';
        this.$nextTick(function () {
          if(name==='name1'){
            this.loadMywordList()
          }else{
            this.ipId=name;
            this.loadPreeList();
          }
        })
      },
      //排序
      sortChange(column){
        this.sortType = this.util.changeStr(column.key);
        console.log(this.sortType);
        this.order=column.order;
        this.offset=0;
        this.current=1;
        this.$nextTick(function () {
          if(this.tabName==='name1'){
            this.loadMywordList()
          }else{
            this.loadPreeList();
          }

        })
      },
      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
        if(this.tabName==='name1'){
          this.loadMywordList()
        }else{
          this.loadPreeList();
        }
      },
      changePageSize(pageSize){
        this.limit = pageSize;
        if(this.tabName==='name1'){
          this.loadMywordList()
        }else{
          this.loadPreeList();
        }
      },
      /*********************曝光-seo优化************************/
      showMadol2(type){
        if(type==='red'){
          this.queryName='红海词'
        }else{
          this.queryName='蓝海词'
        }
        this.selectedArr=[];
        this.selectedKeyWordArr=[];
        this.keyValue='';
        this.sortType2='';
        this.order2='';
        this.queryType=type;
        this.showList2=true;
        this.loadRankList()
      },
      loadRankList(){
        this.api.findKeywordsRankList.list({
          reqData:{
            "pageNum":this.pageNum,
            "queryType":this.queryType,
            "keyword":this.keyValue,
            "limit":this.limit2,
            "offset":this.offset2,
            "order":this.order2,
            "sort":this.sortType2
          }
        }).then((res) => {
          if(res){
            this.tableData3= res.data.rows;
            this.totalCount2= res.data.total;
          }
        })
      },
      search2(){
        this.offset2=0;
        this.current2=1;
        this.loadRankList()
      },
      sortChange2(column){
        this.sortType2 = this.util.changeStr(column.key);
        console.log(this.sortType2);
        this.order2=column.order;
        this.offset2=0;
        this.current2=1;
        this.loadRankList()
      },
      changePage2(currentPage){
        this.offset2 = (currentPage-1)*this.limit2;
        this.current2 = currentPage;
        this.loadRankList()
      },
      changePageSize2(pageSize){
        this.limit2 = pageSize;
        this.loadRankList()
      },

      /*********************p4p-增加覆盖************************/
      showMadol3(){
        this.keyValue='';
        this.showList3=true;
        this.loadp4pList()
      },
      loadp4pList(){
        this.api.findKeywordsIsNotP4p.list({
          reqData:{
            "keyword":this.keyValue,
            "limit":this.limit3,
            "offset":this.offset3,
            "order":this.order3,
            "sort":this.sortType3
          }
        }).then((res) => {
          if(res){
            this.tableData4= res.data.rows;
            this.totalCount3= res.data.total;
          }
        })
      },
      search3(){
        this.offset3=0;
        this.current3=1;
        this.loadp4pList()
      },
      sortChange3(column){
        this.sortType3 = this.util.changeStr(column.key);
        console.log(this.sortType3);
        this.order3=column.order;
        this.offset3=0;
        this.current3=1;
        this.loadp4pList()
      },
      changePage3(currentPage){
        this.offset3 = (currentPage-1)*this.limit3;
        this.current3 = currentPage;
        this.loadp4pList()
      },
      changePageSize3(pageSize){
        this.limit3 = pageSize;
        this.loadp4pList()
      },
      toThesaurus(){
        this.$router.push({
          path: 'p4p/thenext',
          name: 'thenext',
          params: {
            tabName:'name2',
            analysisType:'p4pCoverMore'
          }
        })
      },
      /*********************p4p-增加覆盖************************/
      findOptimizeRecord(akaKwType,titleName){
        this.showList6=true;
        this.akaKwType=akaKwType;
        if(titleName==='red'){
          this.titleName='红海词';
        }else if(titleName==='blue'){
          this.titleName='蓝海词';
        }
        this.api.findOptimizeRecord.list({
          reqData:{
            "kwKeywords":this.keyValue2,
            "akaKwType":akaKwType,
            "sort":this.sortType4,
            "order":this.order4,
            "limit":this.limit4,
            "offset":this.offset4
          }
        }).then((res) => {
          if(res){
            this.tableData5=res.data.rows;
            this.totalCount4=res.data.total;
          }
        })
      },
      resetModal(){
        this.keyValue2='';
        this.sortType4='';
        this.order4='';
        this.offset4=0;
        this.current4=1;
      },
      sortChange4(column){
        this.sortType4 = this.util.changeStr(column.key);
        console.log(this.sortType4);
        this.order4=column.order;
        this.offset4=0;
        this.current4=1;
        this.findOptimizeRecord(this.akaKwType,this.titleName)
      },
      changePage4(currentPage){
        this.offset4 = (currentPage-1)*this.limit4;
        this.current4 = currentPage;
        this.findOptimizeRecord(this.akaKwType,this.titleName)
      },
      changePageSize4(pageSize){
        this.limit4 = pageSize;
        this.findOptimizeRecord(this.akaKwType,this.titleName)
      },
    }
  };
</script>
<style scoped>
  .pointer{
    cursor: pointer;
  }
  .selected{
    max-height: 80px;
    overflow: auto;
    border: 1px solid rgb(221, 221, 221);
    margin: 10px 0;
  }
  .width_300{
    width: 300px;
  }
  .group{
    border: 1px solid #DDDDDD;
    margin-right: 10px;
    height: 450px;
  }
  .group .tit{
    background-color: #ebf0f5;
    line-height: 45px;
  }
  .group ul{
    height: 405px;
    overflow-y: auto;
  }
  .group ul::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .group ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .group ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
  .group ul li.active{
    color: #0076e8;
  }


  .center {
    text-align: center;
  }

  .color_red {
    color: red;
  }
  .color_green{
    color: green;
  }

  .width_200 {
    width: 200px;
  }

  .width_250 {
    width: 250px;
  }

  .search {
    display: block;
    border-bottom: 1px solid #DDDDDD;
    padding-bottom: 10px;
  }

  .map-content {
    padding-top: 20px;
  }



  .map-left {
    width: 40%;
    height: 100%;
    float: left;
  }

  .map-right {
    width: 60%;
    height: 100%;
    float: left;
  }

  .flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .txt-wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    padding: 0 25px;
  }

  .txt-wrap:nth-of-type(1) {
    border-right: 1px solid #DDDDDD;
  }



  .map-list-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    height: 100%;
  }

  .map-list {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    margin: 10px 35px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;

  }

  .map-list .title {
    background: #ebf0f5;
    display: block;
    line-height: 40px;
    padding-left: 15px;
  }

  .map-list .map {
    padding: 20px 25px 5px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 40px);
  }

  .root2-wrap{
    float: left;
    height: 90%;
    width: 30%;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .root3-wrap{
    float: left;
    height: 100%;
    width: 50%;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .root2{
    position: relative;
    text-align: center;
    width: 179px;
    height: 179px;
    cursor: pointer;
  }
  .root2 img,.root3 img{
    position: absolute;
    left:0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  .root2>span,.root3 span{
    display: block;
    color: #FFFFFF;
    position: relative;
    z-index: 9;
    font-size: 12px;
  }
  .root2 span.name{
    font-size: 20px;
    padding: 35px 0 0;
  }
  .root2 span.count{
    font-size: 18px;
    padding: 0 0 10px;
  }
  .root3{
    position: relative;
    width: 275px;
    height: 110px;
    margin: 20px 0;
  }
  .root3 .left{
    width: 58%;
    text-align: center;
    float: left;
  }
  .root3 .left .name{
    font-size: 18px;
    padding: 12px 0 0;
  }
  .root3 .left .count{
    font-size: 18px;
    padding: 0 0 8px;
  }
  .root3 .right{
    width: 40%;
    float: left;

  }
  .root3 .right span{
    color: #3dacf1;
    font-size: 18px;
    text-align: center;
    /*width: 40%;
    float: left;*/
  }
  .root3 .right span:nth-of-type(1){
    padding-top: 30px;
    padding-bottom: 10px;
  }
  .root3 .right2{
    width: 40%;
    float: left;
  }
  .root3 .right2 span{
    color: #3dacf1;
    font-size: 13px;
    text-align: center;

  }
  .root3.root31{
    margin: 10px 0;
  }
  .root3.root31 .left .name{
    padding: 25px 0 5px;
  }
  .root3.root31 .right span{
    font-size: 16px;
  }
  .root3.root31 .right span:nth-of-type(1){
    padding-top: 30px;
    padding-bottom: 0;
  }
  .root3.root31 .left .time{
    line-height: 100px;
    font-size: 18px;
  }
  .root3.root31 .right3 span{
    line-height: 100px;
    font-size: 18px;
    color: #3dacf1;
    text-align: center;
  }

  .root3-wrap button{
    position: absolute;
    right: -120px;
    top:50%;
    padding: 8px 20px;
    background: #3dacf1;
    border-color: #3dacf1;
    margin-top: -16px;
  }
  .txt2 p{
    text-align: center;
  }
  @media screen and (max-width: 1599px){
    .boxHeight {
      height: 420px;
    }
    .map-list {
      margin: 5px ;

    }
    .map-list .title {
      background: #ebf0f5;
      display: block;
      line-height: 30px;
      padding-left: 15px;
    }
    .map-list .map {
      padding: 10px 20px;
    }
    .pieMap {
      height: 300px;
    }
    .root2-wrap{
      height: 100%;
    }
    .root2{
      width: 140px;
      height: 140px;
    }
    .root3{
      width: 275px;
      height: 110px;
      margin: 5px 0;
    }
    .root2 span.name{
      font-size: 16px;
      padding: 30px 0 0;
    }
    .root2 span.count{
      font-size: 14px;
      padding: 0 0 0;
    }
    .root3 .left .name{
      font-size: 16px;
      padding: 10px 0 0;
    }
    .root3 .left .count{
      font-size: 14px;
      padding: 0 0 5px;
    }
    .root3 .right span:nth-of-type(1){
      padding-top: 20px;
      padding-bottom: 0;
    }
    .root3 .right2{
      padding-top: 8px;
    }
    .root3.root31{
      margin: 0;
    }
    .root3.root31 .left .name{
      padding-top: 15px;
      padding-bottom: 0;
    }
    .root3.root31 .right span:nth-of-type(1){
      padding-top: 15px;
    }
    .root3.root31 .left .time{
      line-height: 80px;
    }
    .root3.root31 .right3 span{
      line-height: 80px;
    }
    .root3 .right2>span{
      font-size: 12px;
      line-height: 16px;
    }
  }
  @media screen and (min-width: 1600px) and (max-width: 1919px){
    .boxHeight {
      height: 550px;
    }
    .pieMap {
      height: 350px;
      margin-top: 50px
    }
    .root3{
      width: 275px;
      height: 110px;
      margin: 8px 0;
    }
    .root3 .left .count{
      font-size: 14px;
      padding: 0;
    }
    .root3 .right span:nth-of-type(1){
      padding-top: 20px;
      padding-bottom: 0;
    }
    .root3 .right2{
      padding-top: 14px;
    }
    .root3.root31{
      margin: 0;
    }
  }
  @media screen and (min-width: 1920px){
    .boxHeight {
      height: 700px;
    }
    .pieMap {
      height: 350px;
      margin-top: 120px
    }
    .root3 .right2 span:nth-of-type(1){
      padding-top: 15px;
    }
  }
</style>
