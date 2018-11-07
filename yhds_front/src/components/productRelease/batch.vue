<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/productRelease">产品发布</Breadcrumb-item>
      <Breadcrumb-item>批量产品发布</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <Table ref="table" class="mt_10" :height="tableHeight" :loading="loading"  border stripe   :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseTask"></Table>
      <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      <div class="center">
        <Button type="primary"  shape="circle" :loading="loading" class="my-btn mt_20" @click="addToTask">添加至发布任务</Button>
      </div>
    </div>
    <!--选择关键词-->
    <Modal v-model="chooseKeywordsModal" ref="chooseKeywordsModal" title="选择关键词" class-name="small-btn-box2 vertical-center-modal" width="800" @on-ok="ok">
      <Select v-model="searchType" class="width_200 fl" @on-change="changeKeyWord(1)">
        <Option  value="0" key="searchType0">按是否使用搜索</Option>
        <Option  value="1" key="searchType1">按排名搜索</Option>
        <Option  value="2" key="searchType2">按热度搜索</Option>
        <Option  value="3" key="searchType3">按P4P推广状况搜索</Option>
      </Select>
      <Select v-model="isCover" class="width_200 fl ml_10" v-if="searchType==0" @on-change="changeKeyWord(1)">
        <Option  value="1" key="isCover0">已使用</Option>
        <Option  value="0" key="isCover1">未使用</Option>
      </Select>
      <Select v-model="ranking" class="width_200 fl ml_10" v-if="searchType==1" @on-change="changeKeyWord(1)">
        <Option  value="0" key="ranking0">第1页</Option>
        <Option  value="1" key="ranking1">第1~3页</Option>
        <!--<Option  value="2" key="ranking2">第4~5页</Option>
        <Option  value="3" key="ranking3">第6~10页</Option>
        <Option  value="4" key="ranking4">第11~20页</Option>-->
        <Option  value="2" key="ranking2">其他</Option>
      </Select>
      <Select v-model="hot" class="width_200 fl ml_10" v-if="searchType==2" @on-change="changeKeyWord(1)">
        <Option  value="1" key="hot0">热门词</Option>
        <Option  value="0" key="hot1">蓝海词</Option>
      </Select>
      <Select v-model="promote" class="width_200 fl ml_10" v-if="searchType==3" @on-change="changeKeyWord(1)">
        <Option  value="1" key="promote0">已推广</Option>
        <Option  value="0" key="promote1">未推广</Option>
      </Select>
      <Input v-model="keywords"  placeholder="请输入关键词" class="width_200 fl ml_10"></Input>
      <Button type="primary" shape="circle" class="my-btn ml_10 fr" @click="changeKeyWord(2)">搜索</Button>
      <div class="clr">

      </div>
      <div class="clr mt_10">
        <div class="mb_10 mt_10" style="max-height: 80px;overflow: auto;border: 1px solid #DDDDDD"><p>&nbsp;&nbsp;已选:</p><span v-for="item in selectedArr2" class="ml_10">{{item.kwKeywords}}</span></div>
        <Table :height="tableHeight2" border stripe ref="chooseKeywordTable" :columns="columns2" :data="tableData2" no-data-text="对不起，目前没有任何查询结果"@on-selection-change="chooseRow" @on-select-cancel="cancelChooseRow" @on-sort-change="sortChange"></Table>
        <Page v-if="totalCount2" :total="totalCount2" placement="top" :current="current2" :page-size="limit2" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage2" @on-page-size-change="changePageSize2"></Page>
      </div>

    </Modal>
    <!--选中模板-->
    <Modal v-model="chooseTempModal" ref="chooseTempModal" title="选择模板" class-name="small-btn-box2 vertical-center-modal" width="800" @on-ok="ok">
      <Input v-model="keywords2"  placeholder="请输入模板名称" class="width_200"></Input>
      <Button type="primary" shape="circle" class="my-btn ml_10" @click="loadTemplates">搜索</Button>
      <!--<Button type="primary" shape="circle" class="my-btn ml_10 fr" @click="showImportTempModal">导入</Button>-->
      <Button type="primary" shape="circle" class="my-btn ml_10 fr" @click="addTemplate">新建</Button>
      <div class="clr mt_10">
        <Table :height="tableHeight2" :loading="loading" border stripe :columns="columns3" :data="tableData3" no-data-text="对不起，目前没有任何查询结果"></Table>
        <Page v-if="totalCount3" :total="totalCount3" placement="top" :current="current3" :page-size="limit3" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage3" @on-page-size-change="changePageSize3"></Page>
      </div>

    </Modal>
    <!--导入模板-->
    <Modal v-model="tempModal" ref="tempModal" title="导入模板" class-name="small-btn-box vertical-center-modal" width="800">
      <span>选择类目显示语言</span>
      <Select v-model="language" class="width_200 ml_10" >
        <Option value="ENGLISH" key="ENGLISH">English</Option>
        <Option value="CHINESE" key="CHINESE">简体中文</Option>
      </Select>
      <div class="clr mt_20 mb_20">
        <div class="box">
          <ul>
            <li v-for="(item, index) in categories" :class="{ active: index===catecurrent }" @click="showChildren(item.categoryId,item.leafCategory,index)">
              <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
              <span v-if="language==='CHINESE'">{{item.cnName}}</span>
            </li>
          </ul>
        </div>
        <div class="box" v-if="categories2.length">
          <ul>
            <li v-for="(item, index) in categories2" :class="{ active: index===catecurrent2 }" @click="showChildren2(item.categoryId,item.leafCategory,index)">
              <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
              <span v-if="language==='CHINESE'">{{item.cnName}}</span>
            </li>
          </ul>
        </div>
        <div class="box" v-if="categories3.length">
          <ul>
            <li v-for="(item, index) in categories3" :class="{ active: index===catecurrent3 }" @click="showChildren3(item.categoryId,item.leafCategory,index)">
              <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
              <span v-if="language==='CHINESE'">{{item.cnName}}</span>
            </li>
          </ul>
        </div>
        <div class="box" v-if="categories4.length">
          <ul>
            <li v-for="(item, index) in categories4" :class="{ active: index===catecurrent4 }" @click="showChildren4(item.categoryId,item.leafCategory,index)">
              <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
              <span v-if="language==='CHINESE'">{{item.cnName}}</span>
            </li>
          </ul>
        </div>
        <div class="box" v-if="categories5.length">
          <ul>
            <li v-for="(item, index) in categories5" :class="{ active: index===catecurrent5 }" @click="showChildren5(item.categoryId,item.leafCategory,index)">
              <span v-if="language==='ENGLISH'">{{item.categoryName}}</span>
              <span v-if="language==='CHINESE'">{{item.cnName}}</span>
            </li>
          </ul>
        </div>
      </div>

      <span>模版网址</span><Input v-model="keywords3"  placeholder="请输入地址" class="width_300 ml_10"></Input>

      <div slot="footer">
        <Button type="primary" :disabled="disabled" shape="circle" :loading="loading2" class="my-btn ml_10" @click="importTempModal" >确定</Button>
      </div>
    </Modal>
    <!--标题生成方案-->
    <!--<Modal v-model="titModal" ref="titModal" title="新增标题方案选择" class-name="small-btn-box vertical-center-modal" >
      <Select v-model="titNumber" style="width:300px" placeholder="标题使用关键词个数">
        <Option v-for="item in 10" :value="item" :key="item" v-if="item > 2">{{ item }}</Option>
      </Select>
      <Button type="primary" shape="circle" class="my-btn ml_10" @click="caculateTitNumber">确定</Button>
      <div slot="footer"></div>
    </Modal>-->
    <!--标题模态框-->
		<Modal v-model="titModal" title="标题" @on-ok="titleOk" class-name="vertical-center-modal" width="800" >
			<div>
				<div class="mb_10 mt_10 scroll" style="max-height: 80px;overflow: auto;border: 1px solid #DDDDDD"><p>&nbsp;&nbsp;已选:</p><span v-for="item in titleList" class="ml_10">{{item.title}}</span></div>
				<Table :loading="titleLoading" :height="300" border stripe :columns="titleColumns" :data="titleData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseTitle"></Table>
				<Page v-if="titleCount" :total="titleCount" placement="top" :current="titleCurrent" :page-size="titleLimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="titleChangePage" @on-page-size-change="titleChangePageSize"></Page>
			</div>
		</Modal>
    <!--外来词-->
    <Modal v-model="chooseKeywordsModal2" ref="chooseKeywordsModal2" title="选择关键词" class-name="small-btn-box2 vertical-center-modal" width="800" >
      <div class="clr mt_10">
        <Table :height="tableHeight2" :loading="loading" border stripe :columns="columns4" :data="tableData4" no-data-text="对不起，目前没有任何查询结果"   @on-sort-change="sortChange"></Table>
      </div>

    </Modal>

    <!--本地图片-->
    <Modal
      v-model="localimg"
      width="700"
      title="本地图片库"
      @on-ok="locaok"
      class-name="small-btn-box2 vertical-center-modal"
    >

      <div>
        <div id="modelconten2">
          <Row>
            <Col span="24">
            <div class="divhei">

              <Select v-model="modeditor" style="width:200px" @on-change="editor">
                <Option v-for="item in ditorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

              <div style="float: right;">
                <Checkbox
                  :indeterminate="indeterminate"
                  :value="loctAll"
                  @click.prevent.native="handleCheckAll">全选</Checkbox>
              </div>

            </div>
            <CheckboxGroup class="quancarx"  v-model="loctalldata"  @on-change="checkAllGroupChange">
              <div  class="boxcar" v-for="(item,index) in imagearr">
                <Checkbox  :label="item.imageUrl+'?'+item.imageId+'?'+item.imageUsed" class="inputchex" style="height: 100%;">
                  <Card  style="height: 100%">
                    <div style="height: 100%">
                      <img :src="item.imageUrl" class="inputing">
                      <div v-if="item.imageUsed>0" style="background: rgba(0,0,0,0.5); position: absolute; bottom: 0; left: 0; height: 20px; line-height: 20px; color: #fff; text-align: center; width: 100%;">图片已使用</div>
                    </div>
                  </Card>
                </Checkbox>
              </div>
            </CheckboxGroup>
            </Col>
          </Row>
        </div>
      </div>
      <div style="height: 45px;line-height: 45px; margin-top: 25px">
        <Page id="page" v-if="imatotalCount>0"  :total="imatotalCount" :current="imacurrent"  show-elevator  :page-size="imalimit"   @on-change="imachangePage"></Page>
      </div>
    </Modal>
    
    <!--复制模板模态框-->
	    <Modal
	      v-model="copyModal"
	      title="请选着您要复制到的分组"
	      @on-ok="copyTemp"
	      class-name="vertical-center-modal"
	      width="300"
	    >
	      <div style="max-height:500px;overflow-y: auto" class="scroll">
	        <RadioGroup v-model="copyGroupId" vertical style="width: 100%;">
	          <Radio :label="item.wgId" v-for="item in tableData" :key="item.wgId" class="inupuradio">
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
      return {
        //选择类目
        language:'CHINESE',
        disabled:true,
        catecurrent:null,
        catecurrent2:null,
        catecurrent3:null,
        catecurrent4:null,
        catecurrent5:null,
        categoryIdArr:[],
        categoryId:0,
        categories:[],
        categories2:[],
        categories3:[],
        categories4:[],
        categories5:[],
        proCategory:'',



        tableData4:[],
        //外来词
        paramsArr:[],
        loading:false,

        taskList:[],
        tableHeight2:400,
        /*批量发布列表*/
        loading2:false,
        tableHeight:200,
        //分页参数
        totalCount:10,
        current:1,
        limit:1000,
        offset:0,
        columns1:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '分组名称',
            key: 'wgName',
            align: 'center',
          },
          {
            title: '模板',
            key: 'templateName',
            align: 'center',
            render:(h, params) => {
              return h('span',{
                style: {
                  cursor: "pointer",
                  color: 'rgb(1, 155, 253)'
                },
                on: {
                  click: () => {
                    this.selectedIndex = params.index;
                    this.chooseTempModal = true;
                    this.wgId = params.row.wgId;
                    console.log(params.row)
                    this.$nextTick(function () {
                      this.loadTemplates()
                    })

                  }
                }
              },params.row.templateName)
            }
          },
          {
            title: '关键词',
            key: 'groupKeywordsNumber',
            align: 'center',
            render:(h, params) => {
              return h('span',{
                style: {
                  cursor: "pointer",
                  color: 'rgb(1, 155, 253)'
                },
                on: {
                  click: () => {
                    this.selectedIndex = params.index;
                    if(this.$route.params.kwIds){
                      this.chooseKeywordsModal2 = true;
                      this.tableData4 = params.row.kwList;
                    }else{

                      this.chooseKeywordsModal = true;
                      if(params.row.wgId!==this.wgId){
                        this.selectedArr2 = [];
                      }
                      this.wgId = params.row.wgId;
                      this.$nextTick(function () {
                        this.chooseKeyword(1)
                      })
                    }

                  }
                }
              },params.row.keywordsCount+'/'+params.row.groupKeywordsNumber)
            }
          },
          {
            title: '标题',
            key: 'number',
            align: 'center',
            render:(h, params) => {
              return h('span',{
                style: {
                  cursor: "pointer",
                  color: 'rgb(1, 155, 253)'
                },
                on: {
                  click: () => {
                    this.selectedIndex = params.index;
                    this.titModal = true
                    this.wgId = params.row.wgId;
                    this.getTitleList()
                  }
                }
              },(params.row.titleCount)+'/'+params.row.titleNumber)
            }
          },
          {
            title: '图片',
            key: 'groupImagesNumber',
            align: 'center',
            render:(h, params) => {
              return h('span',{
                style: {
                  cursor: "pointer",
                  color: 'rgb(1, 155, 253)'
                },
                on: {
                  click: () => {
                    this.selectedIndex = params.index;
                    this.wgId = params.row.wgId;
                    this.locashow();
                  }
                }
              },params.row.imageCount+'/'+params.row.groupImagesNumber)
            }
          },
          {
            width:200,
            title: '产品生成数',
            key: 'count',
            align: 'center',
            render:(h, params) => {
            	return h('span',this.min(params.row.imageIdArr,params.row.groupKeywordsNumber,params.row.keywordsCount,params.row.titleCount,params.row.imageCount,params.row.kwGraphics))
//            return h('span',this.min(params.row.imageIdArr,params.row.groupKeywordsNumber,params.row.keywordsCount,params.row.titCount,params.row.imageCount,params.row.kwGraphics))
            }
          },

        ],
        tableData:[],
        /*选择关键词弹窗*/
        chooseKeywordsModal:false,
        chooseKeywordsModal2:false,
        keywords:'',
        searchType:'0',
        isCover:'1',
        ranking:'0',
        hot:'1',
        promote:'1',
        //分页参数
        totalCount2:10,
        current2:1,
        limit2:15,
        offset2:0,
        columns2: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
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
            title: '自然排名',
            key: 'kwNaturalRanking',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              if(params.row.kwNaturalRanking==4 || params.row.kwNaturalRanking==0){
                return h('span','其他')
              }else {
                return h('span','第'+params.row.kwNaturalRanking+'页,第'+params.row.kwDigits+'位')
              }
            }
          },
          {
            title: 'P4P推广',
            key: 'kwToPromote',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              if(params.row.kwToPromote==1){
                return h('span','已推广')
              }else {
                return h('span','未推广')
              }
            }
          },
          {
            width: 140,
            title: '是否使用',
            key: 'kwCover',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              if(params.row.kwCover==1){
                return h('span','已使用')
              }else {
                return h('span','未使用')
              }
            }
          },
        ],
        tableData2: [
          {
            "createBy": "3369982826",
            "createTime": 1517821246000,
            "updateBy": "3369982826",
            "updateTime": 1517821246000,
            "offset": "",
            "limit": 10,
            "isSelectAll": "",
            "kwId": "0050d3666bfa41c48d015e74fa0bee68",
            "alibabaUserId": "3369982826",
            "kwKeywords": "1",
            "kwCompanyCnt": "71",
            "kwShowwinCnt": "0",
            "kwSearchHot": "25",
            "kwWordsSource": 1,
            "wgId": "9531149c111d4329b3bb3a8eb749196c",
            "selectAll": ""
          },{
            "createBy": "3369982826",
            "createTime": 1517821246000,
            "updateBy": "3369982826",
            "updateTime": 1517821246000,
            "offset": "",
            "limit": 10,
            "isSelectAll": "",
            "kwId": "0050d3666bfa41c48d015e74fa0bee68",
            "alibabaUserId": "3369982826",
            "kwKeywords": "2",
            "kwCompanyCnt": "71",
            "kwShowwinCnt": "0",
            "kwSearchHot": "25",
            "kwWordsSource": 1,
            "wgId": "9531149c111d4329b3bb3a8eb749196c",
            "selectAll": ""
          },{
            "createBy": "3369982826",
            "createTime": 1517821246000,
            "updateBy": "3369982826",
            "updateTime": 1517821246000,
            "offset": "",
            "limit": 10,
            "isSelectAll": "",
            "kwId": "0050d3666bfa41c48d015e74fa0bee68",
            "alibabaUserId": "3369982826",
            "kwKeywords": "3",
            "kwCompanyCnt": "71",
            "kwShowwinCnt": "0",
            "kwSearchHot": "25",
            "kwWordsSource": 1,
            "wgId": "9531149c111d4329b3bb3a8eb749196c",
            "selectAll": ""
          },
          {
            "createBy": "3369982826",
            "createTime": 1517821246000,
            "updateBy": "3369982826",
            "updateTime": 1517821246000,
            "offset": "",
            "limit": 10,
            "isSelectAll": "",
            "kwId": "0050d3666bfa41c48d015e74fa0bee68",
            "alibabaUserId": "3369982826",
            "kwKeywords": "4",
            "kwCompanyCnt": "71",
            "kwShowwinCnt": "0",
            "kwSearchHot": "25",
            "kwWordsSource": 1,
            "wgId": "9531149c111d4329b3bb3a8eb749196c",
            "selectAll": ""
          }],
        selectedArr:[],//已选关键词
        selectedArr2:[],
        wgId:'',//分组id
        selectedIndex:0,
        /*选择模板*/
        chooseTempModal:false,
        keywords2:'',
        totalCount3:10,
        current3:1,
        limit3:15,
        offset3:0,
        columns3:[
          {
            title: '模板名称',
            key: 'temName',
            align: 'center',
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            render:(h, params) => {
              return h('span',this.formatTime(params.row.createTime))
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width:200,
            render:(h, params) => {
              return h('div',[
                h('a',{
                  style: {
                    color: 'rgb(1, 155, 253)'
                  },
                  on: {
                    click: () => {
                      this.tableData[this.selectedIndex].templateName = params.row.temName
                      this.tableData[this.selectedIndex].temId = params.row.temId
                      this.tableData[this.selectedIndex].kwGraphics = params.row.kwGraphics
                      this.$Notice.success({
                        title: '提示',
                        desc: '模板设置成功'
                      });
                      this.chooseTempModal=false;
                    }
                  }
                },'设置为模板'),
                h('a',{
                  style: {
                    color: 'rgb(1, 155, 253)',
                    marginLeft:'10px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name:'single',params:{temId:params.row.temId }})
                    }
                  }
                },'编辑'),
                h('a',{
                  style: {
                    color: 'rgb(1, 155, 253)',
                    marginLeft:'10px'
                  },
                  on: {
                    click: () => {
                      this.copyTempId=params.row.temId
                      this.copyModal=true
                    }
                  }
                },'复制'),
                h('a',{
                  style: {
                    color: 'red',
                    marginLeft:'10px'
                  },
                  on: {
                    click: () => {
                      this.api.templateDel.del({
                        params:[params.row.temId]
                      }).then((res) => {
                        if(res){
                          this.$Notice.success({
                            title: '提示',
                            desc: '删除成功'
                          });
                          this.loadTemplates()
                        }
                      })
                    }
                  }
                },'删除')
              ])

            }
          },
        ],
        tableData3:[{
          "createBy": "3369982826",
          "createTime": 1519367765000,
          "updateBy": "3369982826",
          "updateTime": 1519367765000,
          "offset": "",
          "limit": 10,
          "order": "desc",
          "sort": "create_time",
          "isSelectAll": "",
          "temId": "48bd682ce9aa4bc48d01556b10077bd4",
          "alibabaUserId": "3369982826",
          "subject": "nihao",
          "productType": "wholesale",
          "categoryId": "32232d",
          "proCategory": "wq232",
          "language": "lg",
          "temName": "nihao",
          "wordGroupId": "dsdsd22323",
          "seoOptimize": "Y",
          "productTemAttrs": [{
            "createBy": "SYSUSER",
            "createTime": 1518335190000,
            "updateBy": "SYSUSER",
            "updateTime": 1518335194000,
            "offset": "",
            "limit": 10,
            "order": "desc",
            "sort": "create_time",
            "isSelectAll": "",
            "temAttId": "002b194b95555b1aad96ac753c5a30fa",
            "attributeName": "111",
            "valueName": "111",
            "temId": "002b194b98734b1aad96ac753c5a30fa",
            "attType": "2",
            "selectAll": ""
          }],
          "productTemDiscount": [{
            "createBy": "SYSUSER",
            "createTime": 1518335816000,
            "updateBy": "SYSUSER",
            "updateTime": 1518335819000,
            "offset": "",
            "limit": 10,
            "order": "desc",
            "sort": "create_time",
            "isSelectAll": "",
            "temDisId": "d825813a46c540f0a18acd0555cdcb19",
            "startQuantity": 1,
            "price": "11",
            "temId": "d825813a46c540f0a18acd0160cdcb67",
            "selectAll": ""
          }],
          "productTemSourc": [{
            "createBy": "SYSUSER",
            "createTime": 1518335480000,
            "updateBy": "SYSUSER",
            "updateTime": 1518335485000,
            "offset": "",
            "limit": 10,
            "order": "desc",
            "sort": "create_time",
            "isSelectAll": "",
            "temsourId": "049aaf26611e45bb9dc23d2e42096629",
            "temId": "002b194b98734b1aad96ac753c5a30fa",
            "fobCurrency": "USD",
            "fobMinPrice": "11",
            "fobMaxPrice": "22",
            "fobUnitType": "Case",
            "paymentMethods": "tt",
            "minOrderQuantity": "1",
            "minOrderUnitType": "Case",
            "supplyQuantity": "111",
            "supplyUnitType": "Case",
            "supplyPeriodType": "Month",
            "deliveryPort": "11",
            "deliveryTime": "11",
            "packagingDesc": "11",
            "priceSetting": "section",
            "selectAll": ""
          }],
          "selectAll": ""
        }],
        /*导入关键词*/
        tempModal:false,
        keywords3:'',
        /*标题生成方案*/
        titModal:false,
        titNumber:'',
        columns4:[
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
            title: '自然排名',
            key: 'kwNaturalRanking',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: 'P4P推广',
            key: 'kwToPromote',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              if(params.row.kwToPromote==1){
                return h('span','已推广')
              }else {
                return h('span','未推广')
              }
            }
          },
          {
            width: 140,
            title: '是否使用',
            key: 'kwCover',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              if(params.row.kwCover==1){
                return h('span','已使用')
              }else {
                return h('span','未使用')
              }
            }
          },
        ],



        //        本地图片库
        locanull:"",

        localimg:false,
        addloct:0,
        modeloct:[],
        loctId:'',
        imagearr:[],
//            选中本地图片

        indeterminate:false,
        loctAll:false,
        loctalldata:[],
        loctallquan:[],
//      分页参数1
        imatotalCount:0,
        imacurrent:1,
        imalimit:8,
        imaoffset:0,

        handlist:[],

        imagetype:"N",

        modeditor:"N",
        ditorData:[
          {
            value: 'N',
            label: '本地图片'
          },
          {
            value: 'Y',
            label: '编辑图片'
          }
        ],
        seoGroupList:{},
				titleData:[],
				titleLoading:false,
				titleColumns:[
					{
            type: 'selection',
            width: 60,
            align: 'center',
          },
					{
						title: '标题',
						key: 'title',
						align: 'center',
					},
				],
				titleCount:1,
				titleCurrent:1,
				titleLimit:15,
				titleOffset:0,
				titleArr:[],
				titleList:[],
				
				copyModal:false,
        copyGroupId:0,
        copyTempId:0,
      }
    },
    created(){
      if(this.$route.params.kwIds){
        this.loadLoanwords()
      }else{
        this.loadData();
      }
      if(window.screen.width>=1366 && window.screen.width<1920){
        this.tableHeight2 = 200
      }
      this.loadCategory(1)
    },
    watch:{
    	titModal(){
    		if(!this.titModal){
    			this.titleList=[]
    		}
    	}
    },
    mounted(){
    	this.seoGroupList=this.$route.params.seoGroupList
    
      this.tableHeight =this.$refs.main.offsetHeight -200;
    },
    methods: {
    	//复制模板
			copyTemp(){
				this.api.copyTemplateInformation.data({reqData:{
					wordGroupId:this.copyGroupId,
					temId:this.copyTempId,
				}}).then(res =>{
					if(res.data.info=="添加成功"){
            this.$Notice.success({
              title: '复制成功',
            });
        	}
				})
			},
    	getTitleList(){//获取标题列表
				this.titleData=[]
				this.titleLoading=true
				this.api.findKeyWords.data({reqData:{
					pwId:this.wgId,
					limit:this.titleLimit,
					offset:this.titleOffset
				}}).then((res)=>{
					var list=res.data.rows
					this.titleData=res.data.rows
					if(res.data.rows){
						for(var i=0; i<list.length; i++){
							this.titleArr.push([])
						}
					}else{
						this.titleData=this.titleArr=[]
					}
					this.titleCount=res.data.total
					this.titleLoading=false
				})
			},
			titleChangePage(currentPage){
				this.titleOffset = (currentPage-1)*this.titleLimit;
        this.titleCurrent = currentPage;
		    this.getTitleList()
			},
			titleChangePageSize(pageSize){
				this.titleLimit = pageSize;
		    this.getTitleList()
			},
			chooseTitle(selection){
				
	      this.titleList = this.titleList.concat(selection);
	
	
	      /!*数组中多条对象去重方式*!/
	      let oldArr = this.titleList;//原数据数组
	      let allArr = [];//新数组
	      for(let i=0;i<oldArr.length;i++){
	        let flag = true;
	        for(let j=0;j<allArr.length;j++){
	          if(oldArr[i].id === allArr[j].id){
	            flag = false;
	          }
	        }
	        if(flag){
	          allArr.push(oldArr[i]);
	        }
	      }
	      this.titleList= allArr;
	      
				this.$set(this.tableData[this.selectedIndex],'titleCount',this.titleList.length)
//				this.titleArr[this.selectedIndex]=selection
//				this.titleList=selection
			},
			titleOk(){
				for(var i=0;i<this.titleList.length;i++){
					this.titleList[i].titleSel=1
				}
				this.api.updateKeyWords.data({reqData:{
					titleWords:this.titleList
				}})
				var arr=[]
				for(var i=0; i<this.titleList.length; i++){
					arr.push(this.titleList[i].id)
				}
				this.$set(this.tableData[this.selectedIndex],'titleList',arr)
			},
			
			
    	seoGroupShow(){
    		var arr=[]
    		for(var i in this.seoGroupList){
    			for(var j=0; j<this.tableData.length; j++){
    				if(this.tableData[j].wgId==i){
    					this.selectedIndex=j
    					this.tableData[this.selectedIndex].keywordsCount = this.seoGroupList[i].length;
			        for(let k=0;k<this.seoGroupList[i].length;k++){
			          this.tableData[this.selectedIndex].keywordsIdArr[k] = this.seoGroupList[i][k]//.pkwGroupId
			        }
			        arr.push(this.tableData[this.selectedIndex])
    				}
    			}
    		}
    		if(this.$route.params.seoGroupList){this.tableData=arr}
    	},
      //选择类目
      loadCategory(type){
        console.log(this.categoryId)
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
      showChildren(categoryId,leafCategory,index){
        this.catecurrent = index;
        this.categoryId = categoryId;
        this.categoryIdArr[0] = categoryId;

        this.catecurrent2 = null;
        this.catecurrent3 = null;
        this.catecurrent4 = null;
        this.catecurrent5 = null;
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
        this.catecurrent2 = index;
        this.categoryId = categoryId;
        this.categoryIdArr[1] = categoryId;
        this.catecurrent3 = null;
        this.catecurrent4 = null;
        this.catecurrent5 = null;
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
        this.catecurrent3 = index;
        this.categoryId = categoryId;
        this.categoryIdArr[2] = categoryId;
        this.catecurrent4 = null;
        this.catecurrent5 = null;
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
        this.catecurrent4 = index;
        this.categoryId = categoryId;
        this.categoryIdArr[3] = categoryId;
        this.catecurrent5 = null;
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
        this.catecurrent5 = index;
        this.categoryId = categoryId;
        this.categoryIdArr[4] = categoryId;
        if(leafCategory==='1'){
          this.disabled=false;
        }else{
          this.disabled=true;
        }
      },

      //外来词
      loadLoanwords () {
        this.loading = true;
        this.api.batchQueryGroupInfo.list({
          reqData:{
            type:this.$route.params.type,
            keywordIds:this.$route.params.kwIds,
						code:1
          }
        }).then((res) => {
          this.loading = false;
          if(res){
            let arr = res.data.rows;
            let keywordsIdArr=[];
            for(let i =0;i<arr.length;i++){
              arr[i].keywordsCount = arr[i].groupKeywordsNumber

              arr[i].imageCount = 0
              arr[i].imageIdArr = []
//            arr[i].titCount = 3
              arr[i].titleCount = 0
              arr[i].templateName = '请选择模板'
              arr[i].temId = ''
              arr[i].kwGraphics = 0
              for(let j=0;j<arr[i].kwList.length;j++){
                keywordsIdArr.push(arr[i].kwList[j].kwId)
              }
              arr[i].keywordsIdArr = keywordsIdArr
            }
            this.tableData = arr;
            this.totalCount = res.data.total;
          }
        })
      },
      formatTime(time){
        if(!time){
          return '-'
        }else{
          return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
        }
      },
      min(imageIdArr,groupKeywordsNumber,keywordsCount,titCount,imageCount,kwGraphics){
      	return Math.min(Math.ceil(keywordsCount/3),titCount,imageCount)
//      let num1= 1;
//      let num2 = 0;
//      let num3 = 0;//未使用的图片数量
//      for(let i in imageIdArr){
//        if(imageIdArr[i].imageUsed==0){
//          num3++
//        }
//      }
//      if(Number(groupKeywordsNumber) >= Number(titCount)){
//        num1 = Number(keywordsCount)/Number(titCount)
//      }
//      if(kwGraphics){
//        num2=Number(imageCount)/Number(kwGraphics)
//      }
//      if(num2>num3){
//        num2 = num3
//      }
//      if(num1 <= num2){
//        return Math.ceil(num1)
//      }else if(num1 > num2){
//        return Math.ceil(num2)
//      }
      },
      chooseTask(selection){
        this.taskList = selection
        console.log(selection)
      },
      addToTask(){
        let batchModel = []
//      console.log(this.taskList)
        if(!this.taskList.length){
          this.$Notice.warning({
            title: '提示',
            desc: '请至少选择一个分组'
          });
        }else{
          for(let i=0;i<this.taskList.length;i++){

            if(!this.taskList[i].keywordsCount){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择关键词'
              });
            }else if(!this.taskList[i].imageCount){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择图片'
              });
            }else if(!this.taskList[i].temId){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择模板'
              });
            }else if(!this.taskList[i].titleCount){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择标题'
              });
            }else{
              let imageIds = [];
              for(let j in this.taskList[i].imageIdArr){
                imageIds.push(this.taskList[i].imageIdArr[j].id)
              }
              batchModel.push({
                keywordIds:this.taskList[i].keywordsIdArr,
                imageIds:imageIds,
                templateId:this.taskList[i].temId,
                keywordsNumber:this.taskList[i].titCount,
                imagesNumber:this.taskList[i].imageCount,
                analysisType:this.$route.params.analysisType,
                titleCount:this.taskList[i].titleCount,
                wgId:this.taskList[i].wgId,
                titleList:this.taskList[i].titleList,
              })
            }
            console.log(batchModel)
          }
        }
        if(batchModel.length){
          this.loading = true;
          this.api.addBatchTask.add({
            reqData:batchModel
          }).then((res) => {
            this.loading = false;
            if(res){
              if(res.data.status=='200'){
                this.$Notice.success({
                  title: '提示',
                  desc: '添加至发布任务成功!'
                });
                this.$router.push({name:'releaseTask'})
              }
            }
          })
        }

      },
      loadData(){
        this.loading = true;
        this.api.queryGroupInformation.list({
          reqData:{
            offset:this.offset,
            limit:this.limit
          }
        }).then((res) => {
          if(res){
            let arr = res.data.rows;
            for(let i =0;i<arr.length;i++){
              arr[i].keywordsCount = 0
              arr[i].keywordsIdArr = []
              arr[i].imageCount = 0
              arr[i].imageIdArr = []
              arr[i].titCount = 3
              arr[i].templateName = '请选择模板'
              arr[i].temId = ''
              arr[i].kwGraphics = 0
              arr[i].titleCount = 0
            }
            console.log(arr)
            this.tableData = arr;
            this.totalCount = res.data.total;
            this.seoGroupShow()
            this.loading = false;
            for(var j=0;j<this.tableData.length; j++){
            	this.titleArr.push([])
            }
          }
        })
      },
      //分页
      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
        this.loadData()
      },
      //切换每页显示的条数
      changePageSize(pageSize){
        this.limit = pageSize;
        this.loadData()
      },
      changeKeyWord(type){
        this.current2=1;
        this.offset2=0;
        this.chooseKeyword(type)
      },
      //选择关键词
      chooseKeyword(type){
        let kwSearchHot = '';
        let kwToPromote = '';
//      let kwCover = '';
        let kwCover = this.isCover;
        let kwNaturalRanking = '';
        if(type===1){
          if(this.searchType==='2'){
            kwSearchHot = this.hot
          }else if(this.searchType==='3'){
            kwToPromote = this.promote
          }else if(this.searchType==='0'){
            kwCover = this.isCover
          }else if(this.searchType==='1'){
            kwNaturalRanking = this.ranking
          }
          this.keywords=''
        }
        this.api.chooseKeyword.list({
          reqData:{
            wgId:this.wgId,
            kwKeywords:this.keywords,
            kwSearchHot:kwSearchHot,
            kwToPromote:kwToPromote,
            kwCover:kwCover,
            kwNaturalRanking:kwNaturalRanking,
            offset:this.offset2,
            limit:this.limit2,
            order:this.order2,
            sort:this.sortType
          }
        }).then((res) => {
          if(res){
            this.tableData2 = res.data.rows;
            this.totalCount2 = res.data.total;
            console.log(res)
          }
        })
      },
      /*chooseRow(selection) {

        let arr =[];
        if(this.selectedArr2.length>=10){
          this.$Notice.warning({
            title: '提示',
            desc: '最多只能选10个词'
          });
        }else{
          if(!selection.length){
            for(let i=0;i<this.tableData2.length;i++){
              for(let j=0;j<this.selectedArr2.length;j++){
                if(this.selectedArr2[j].kwKeywords===this.tableData2[i].kwKeywords){
                  this.selectedArr2[j] = '';
                }
              }
            }
            this.util.removeEmptyArrayEle(this.selectedArr2)
          }else{
            if(selection.length<=10){
              arr = selection
            }else{
              this.$Notice.warning({
                title: '提示',
                desc: '最多只能选10个词'
              });
              for(let i=0;i<10;i++){
                arr[i] = selection[i]
              }
            }
          }
          this.selectedArr = arr;
          this.selectedArr2 = this.selectedArr2.concat(this.selectedArr);


          /!*数组中多条对象去重方式*!/
          let oldArr = this.selectedArr2;//原数据数组
          let allArr = [];//新数组
          for(let i=0;i<oldArr.length;i++){
            let flag = true;
            for(let j=0;j<allArr.length;j++){
              if(oldArr[i].kwId === allArr[j].kwId){
                flag = false;
              }
            }
            if(flag){
              allArr.push(oldArr[i]);
            }
          }
          this.selectedArr2 = allArr;

        }
        this.tableData[this.selectedIndex].keywordsCount = this.selectedArr2.length;
        for(let i=0;i<this.selectedArr2.length;i++){
          this.tableData[this.selectedIndex].keywordsIdArr[i] = this.selectedArr2[i].kwId
        }
      },*/
      chooseRow(selection) {
        let arr =[];
        if(!selection.length){
          for(let i=0;i<this.tableData2.length;i++){
            for(let j=0;j<this.selectedArr2.length;j++){
              if(this.selectedArr2[j].kwKeywords===this.tableData2[i].kwKeywords){
                this.selectedArr2[j] = '';
              }
            }
          }
          this.util.removeEmptyArrayEle(this.selectedArr2)
        }else{
          arr = selection
        }
        this.selectedArr = arr;
        this.selectedArr2 = this.selectedArr2.concat(this.selectedArr);


        /*数组中多条对象去重方式*/
        let oldArr = this.selectedArr2;//原数据数组
        let allArr = [];//新数组
        for(let i=0;i<oldArr.length;i++){
          let flag = true;
          for(let j=0;j<allArr.length;j++){
            if(oldArr[i].kwId === allArr[j].kwId){
              flag = false;
            }
          }
          if(flag){
            allArr.push(oldArr[i]);
          }
        }
        this.selectedArr2 = allArr;
				console.log(this.selectedIndex)
        this.tableData[this.selectedIndex].keywordsCount = this.selectedArr2.length;
        for(let i=0;i<this.selectedArr2.length;i++){
          this.tableData[this.selectedIndex].keywordsIdArr[i] = this.selectedArr2[i].kwId
        }
      },
      cancelChooseRow(selection,row) {
        let val = row.kwKeywords;
        let index = this.selectedArr2.indexOf(val)
        if(index>=0){
          this.selectedArr2.splice(index,val.length)
        }
      },
      ok(){

      },
      chooseRow2(selection){
        this.tableData[this.selectedIndex].keywordsIdArr=[]
        this.selectedArr=selection;
        this.tableData[this.selectedIndex].keywordsCount = this.selectedArr.length;

        for(let i=0;i<this.selectedArr.length;i++){
          this.tableData[this.selectedIndex].keywordsIdArr.push(this.selectedArr[i].kwId)

        }
      },
      sortChange(column){
        this.sortType = this.util.changeStr(column.key);
        console.log(this.sortType);
        this.order2=column.order;
        this.offset2=0;
        this.current2=1;
        this.$nextTick(function () {
          if(this.keywords){
            this.chooseKeyword(2)
          }else{
            this.chooseKeyword(1)
          }
        })
      },
      changePage2(currentPage){
        this.offset2 = (currentPage-1)*this.limit2;
        this.current2 = currentPage;
        if(this.keywords){
          this.chooseKeyword(2)
        }else{
          this.chooseKeyword(1)
        }

      },
      changePageSize2(pageSize){
        this.limit2 = pageSize;
        if(this.keywords){
          this.chooseKeyword(2)
        }else{
          this.chooseKeyword(1)
        }
      },

      loadTemplates(){
        this.api.queryTemplate.list({
          reqData:{
            wordGroupId:this.wgId,
            temName:this.keywords2,
            limit:this.limit3,
            offset:this.offset3
          }
        }).then((res) => {
          if(res){
            this.tableData3 = res.data.rows;
            this.totalCount3 = res.data.total;
          }
        })
      },
      caculateTitNumber(){
        this.titModal = false;
        this.tableData[this.selectedIndex].titCount = this.titNumber
      },

      //分页
      changePage3(currentPage){
        this.offset3 = (currentPage-1)*this.limit3;
        this.current3 = currentPage;
        this.loadTemplates()
      },
      //切换每页显示的条数
      changePageSize3(pageSize){
        this.limit3 = pageSize;
        this.loadTemplates()
      },
      showImportTempModal(){
        this.tempModal = true;
        this.keywords3 = '';
        this.chooseTempModal = false;
        this.categories2 = [];
        this.categories3 = [];
        this.categories4 = [];
        this.categories5 = [];
        this.disabled=true;
        this.categoryId = '';
        this.categoryIdArr=[];
        this.catecurrent = null;
        this.catecurrent2 = null;
        this.catecurrent3 = null;
        this.catecurrent4 = null;
        this.catecurrent5 = null;
      },
      importTempModal(){
        this.proCategory=this.categoryIdArr.join(',')
        console.log(this.proCategory)
        console.log(this.categoryId)
        if(this.keywords3){
          this.loading2=true;
          this.api.getOnlineTemplate.add({
            reqData:{
              proCategory:this.proCategory,
              categoryId:this.categoryId,
              wordGroupId:this.wgId,
              url:this.keywords3
            }
          }).then((res) => {
            this.loading2=false;
            this.tempModal = false;
            if(res) {
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
              this.$router.push({name:'single',params:{temId:res.data.rows[0] }})
            }
          })
        }else{
          this.$Notice.warning({
            title: '提示',
            desc: '请输入模版地址'
          });
        }

      },
      addTemplate(){
        this.$router.push({name:'chooseCategory',params:{wordGroupId:this.wgId }})
      },

//      图片库
      locashow(){
        this.locanull=1;
        this.localimg=true;
        this.loctAll=false;
        this.imatotalCount=0;
        this.imacurrent=1;
        this.imalimit=8;
        this.imaoffset=0;
        this.imagedata();
      },

      handleCheckAll(){
        if (this.indeterminate) {
          this.loctAll = false;
        } else {
          this.loctAll = !this.loctAll;
        }
        this.indeterminate = false;
        if (this.loctAll) {
          for(var i=0;i<this.imagearr.length;i++){
              var text=this.imagearr[i].imageUrl+'?'+this.imagearr[i].imageId+'?'+this.imagearr[i].imageUsed;
              if(this.loctalldata.indexOf(text)==-1){
                this.loctalldata.push(text);
                console.log(this.loctalldata);
              }
          }
          console.log(this.loctalldata);
        } else {
          for(var i=0;i<this.imagearr.length;i++){
              for(var t=0;t<this.loctalldata.length;t++){
                var text=this.imagearr[i].imageUrl+'?'+this.imagearr[i].imageId+'?'+this.imagearr[i].imageUsed;
                if(text==this.loctalldata[t]){
                    this.loctalldata.splice(t,1);
                    t=t-1;
                }
              }
          }
          console.log(this.loctalldata);
        }
      },

      checkAllGroupChange (data) {
        console.log(data);
        this.loctallquan=data;
        this.loctalldata=this.loctallquan;
        console.log(this.loctallquan);
        if (data.length === 8) {
        	this.indeterminate = false;
          this.loctAll = true;
        } else if (data.length > 0) {
        	this.indeterminate = true;
          this.loctAll = false;
        } else {
        	this.indeterminate = false;
          this.loctAll = false;
        }
      },
      imachangePage(currentPage){
        //this.loctalldata=[];
        this.imaoffset = (currentPage-1)*this.imalimit;
        this.imacurrent = currentPage;
        this.locanull=2
        this.imagedata();
      },
      //查看上传图片列表
      imagedata(){
        this.api.imageslist.find({reqData:{wgId:this.wgId,imageEdit:this.imagetype,offset:this.imaoffset,limit:this.imalimit}}).then((res)=>{
        	this.loctalldata=[];
          this.imagearr=res.data.rows;
          this.imatotalCount = Number(res.data.total);

          this.loctAll = false;
          if(this.locanull==1){
            this.loctalldata=[];
          }else {
            this.$nextTick(function(){
              this.loctalldata=this.loctallquan;
            });
          }

        })
      },
      editor(name){
        this.loctAll = false;
        this.loctalldata=[];
        this.imagetype=name;
        this.imatotalCount=0;
        this.imacurrent=1;
        this.imalimit=8;
        this.imaoffset=0;
        this.imagedata()
      },


      locaok(){

         console.log(this.loctalldata);


        this.tableData[this.selectedIndex].imageCount = this.loctalldata.length;
        this.tableData[this.selectedIndex].imageIdArr=[];
        for(let i=0;i<this.loctalldata.length;i++){
          this.tableData[this.selectedIndex].imageIdArr.push({
            id:this.loctalldata[i].split("?")[1],
            imageUsed:this.loctalldata[i].split("?")[2]
          });

        }
        console.log(this.tableData[this.selectedIndex].imageIdArr);
        this.loctalldata=[]
      },

    },

  };
</script>
<style scoped>
  .center{
    text-align: center;
  }
  .width_200{
    width: 200px;
  }
  .width_300{
    width: 350px;
  }

  .divhei{
    height:45px;
    line-height:45px;
  }
  .divhei button{
    margin:0 60px;
    text-align: center;
  }
  .quancar{
    height:calc(100% - 95px)
  }
  .boxcar{
    position: relative;
    width: 24%;
    margin-right: 1%;
    height:174px;
    margin-bottom: 1%;
    float: left;
  }
  .inputchex{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .inputchex span:first-child{
    position: absolute;
    top: 0;
    right: 14px;
    z-index: 1000;
  }
  #modelconten>div, #modelconten>div>div,#modelconten2>div, #modelconten2>div>div{
    height:100%;
  }
  .inputing{
    width: 100%;
    height: 100%;
  }

  .box{
    border: 1px solid #dbdbdb;
    width: 20%;
    float: left;
    height: 200px;
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
</style>
