<template>
	<div style="height: 100%; width: 100%;">
		<Breadcrumb separator=">">
			<Breadcrumb-item @click.native="back()">同行分析</Breadcrumb-item>
			<Breadcrumb-item>同行分析报表</Breadcrumb-item>
		</Breadcrumb>
		<div class="" style="height: calc(100% - 35px); width: 100%;">
			<div class="" style="height: 100%; width: 100%;">
				<div class="main scroll" style="width: 100%; overflow: auto;">
					<div class="pk-wrap scroll" style="min-height: 70%; overflow: auto;">
						<!--pk结果-->
						<Row class="pk-wrap_img_pk" style="min-height: 30%;">
							<Col span="24">
								<div class="fl">
									<img class="fl" src="../../common/images/avatar.jpg" style="width: 100px;height: 100px;margin-left: 30px;" />
									<i class="icon-jiantouzuoshuang- iconfont ml_20 fl" style="font-size: 30px;margin-top: 30px;"></i>
									<img src="/static/img/avatar-hover.b6f074f.jpg" style="width: 100px;height: 100px;" />
								</div>
								<div class="fl ml_10">
									<div style="line-height: 12px; padding-top: 88px;">
										注：<span style="width: 8px; height: 8px; display: inline-block; background: #2B84D5; margin: 0 3px;"></span>为自己店铺数据，<span style="width: 8px; height: 8px; display: inline-block; background: #FF818C; margin: 0 3px;"></span>为PK对手店铺数据。(<span style="width: 8px; height: 8px; display: inline-block; background: repeating-linear-gradient( -45deg, #ccc, #ccc 3px, #eee 3px, #eee 6px ); margin: 0 3px;"></span>为数据0)
									<Button class="pk-btn" v-if="updataShow"   @click="updateStop" >更新店铺数据</Button>
									<Button class="pk-btn" v-else disabled>更新店铺数据</Button>
									</div>
								</div>
							</Col>
						</Row>
						<div class="pk-wrap_pk_xm clr" style="min-height: 70%;">
							<div class="pk-wrap_pk_xm01 fl" style="overflow: hidden;width: 50%; height: 20%;" v-for="(key,item,idx) in {'关键词使用量':'ip_keyword_cover','旺铺视频数':'bkw_shopMp4Num','首页自然排名':'ip_index_keyword','及时回复率':'bkw_realReplayNum','P4P前5竞价词':'ip_p4p_count','近30天报价数':'near30Days','顶展词':'ip_top_word','近半年订单数':'orderNum','橱窗数':'ip_showcase_count'}">
								<div style="height: 100%; padding: 0 20px; line-height: 30px;" class="flex">
									<div class="f_14 mt_10 mb_10 font-weight" style="white-space: nowrap; width: 130px; flex-shrink: 0; -webkit-flex-shrink: 0;"><a href="javascript:;" :title="getExplain(item)" class="iconfont icon-wenhao mr_10" style="color: #000; font-weight: normal;"></a>{{item}}</div>
									<div style="width: 100%;" class="mt_10 mb_10">
										<a style="background-color:#2B84D5; height: 15px; display: block; max-width: 100%;" href="javascript:;" :title="getNumData(key)[0]" :style="{width:getNum(key)[0]+'%'}" v-if="getNumData(key)[0]!=0"></a>
										<a style="background: repeating-linear-gradient( -45deg, #ccc, #ccc 3px, #eee 3px, #eee 6px ); height: 15px; display: block;width: 10%; cursor: not-allowed;" href="javascript:;" :title="getNumData(key)[0]" v-else></a>
										<a style="background-color:#FF818C; height: 15px; display: block; max-width: 100%;" href="javascript:;" :title="getNumData(key)[1]" :style="{width:getNum(key)[1]+'%'}" v-if="getNumData(key)[1]!=0"></a>
										<a style="background: repeating-linear-gradient( -45deg, #ccc, #ccc 3px, #eee 3px, #eee 6px ); height: 15px; display: block;width: 10%; cursor: not-allowed;" href="javascript:;" :title="getNumData(key)[1]" v-else></a>
									</div>
									<img height="40" width="40" :src="parseFloat(getNum(key)[0])>parseFloat(getNum(key)[1])?img.win:img.lose" style="flex-shrink: 0; -webkit-flex-shrink: 0; margin-top: 5px;" class="ml_20" v-if="parseFloat(getNum(key)[0])!=parseFloat(getNum(key)[1])" />
									<div style="width: 40px; height: 40px;" class="ml_20 mt_5" v-else></div>
								</div>
							</div>
						</div>
					</div>
				
					<div class="map-wrap" style="min-height: calc(30% - 20px);">
						<div style="padding: 10px 0;">
							<Row>
								<Col span="24">
									<div class="index-bg1 f_18 mb_20 font-weight">
										<span>对比结果及须优化赶超项目<span class="f_12">(结果为我的数据减去同行数据)</span></span>
										<!--<button style="background: linear-gradient(to right, #00a0fe  0%,#0078f0 100%);" >一键优化>></button>-->
									</div>
										<div class="fl f_14" v-for="(value,item,idx) in loseData" style="width: 33%;">
											<div class="flex mb_20" style="justify-content: space-between; height: 18px;">
												<span style="width: 100px;">{{item}}</span>
												<span style="width: 50px;" v-if="item!='关键词使用量'&&item!='P4P前5竞价词'&&item!='首页自然排名'">{{value}}</span>
												<a href="javascript:;" style="border-bottom: 1px solid;" @click="keywordCoverageA()" v-if="item=='关键词使用量'">立即优化</a>
												<a href="javascript:;" style="border-bottom: 1px solid;" @click="naturalRankingOptimizeA()" v-if="item=='首页自然排名'">立即优化</a>
												<a href="javascript:;" style="border-bottom: 1px solid;" @click="P4PbiddingP4P()" v-if="item=='P4P前5竞价词'">立即优化</a>
											</div>
										</div>
								</Col>
								<!--<Col span="6" offset="1">
									<div class="index-bg1 mb_20 f_18 font-weight">
										预计提升效果
									</div>
									<div class="f_18" style="color: #017ef4; text-align: center;">
										<div v-for="i in 3" class="mb_20">曝光量：9999</div>
									</div>
								</Col>-->
							</Row>
						</div>
					</div>
				
				</div>
	
				<!--         -->
				<!--<div class="tasks">
					<div class="task-inner f_14">
						<div class="task-tit f_20">任务模式</div>
						<div>
							<div class="task-list" @click="showTask('jzrw','建站任务')">
								<img src="../../common/images/task_icon1.png" alt="" />
								<span class="txt f_16">建站任务</span>
								<span class="icon " :class="{bg2:groupTaskStatus1==='进行中',bg1:groupTaskStatus1==='已完成',bg3:groupTaskStatus1==='未开始'}">
										<span class="rect">{{groupTaskStatus1}}</span>
								<span class="triangle"></span>
								</span>
							</div>
							<div class="task-list" @click="showTask2('yhrw','优化任务')">
								<img src="../../common/images/task_icon2.png" alt="" />
								<span class="txt f_16">优化任务</span>
								<span class="icon " :class="{bg2:groupTaskStatus2==='进行中',bg1:groupTaskStatus2==='已完成',bg3:groupTaskStatus2=='未开始'}">
										<span class="rect">{{groupTaskStatus2}}</span>
								<span class="triangle"></span>
								</span>
							</div>
							<div class="task-list" @click="showTask3('p4prw','P4P任务')">
								<img src="../../common/images/task_icon3.png" alt="" />
								<span class="txt f_16">P4P任务</span>
								<span class="icon" :class="{bg2:groupTaskStatus3==='进行中',bg1:groupTaskStatus3==='已完成',bg3:groupTaskStatus3==='未开始'}">
										<span class="rect">{{groupTaskStatus3}}</span>
								<span class="triangle"></span>
								</span>
							</div>
							<div class="task-list" @click="showTask4('zyrw','卓越任务')">
								<img src="../../common/images/task_icon4.png" alt="" />
								<span class="txt f_16">卓越任务</span>
								<span class="icon" :class="{bg2:groupTaskStatus4==='进行中',bg1:groupTaskStatus4==='已完成',bg3:groupTaskStatus4  ==='未开始'}">
										<span class="rect">{{groupTaskStatus4}}</span>
								<span class="triangle"></span>
								</span>
							</div>
						</div>
					</div>
				</div>-->
			</div>
		</div>
	
		<Modal v-model="taskModal" :title="title" class-name="taskModal vertical-center-modal" width="820">
			<div class="task-wrap">
				<ul>
					<li v-for="item in taskList" v-if="item.taskInfo.bstType ===bstType">
						<h2 class="f_18 clr">
	                <span class="fl color4">{{item.taskInfo.bstTitle}}</span>
	                <span class="fr color3">
	                  <span v-if="item.bstIsAccept=='Y'">
	                    <span v-if="item.utStatus=='1'">未开始</span>
	                    <span v-if="item.utStatus=='2'">进行中</span>
	                    <span v-if="item.utStatus=='3'">已完成</span>
	                  </span>
	                  <span v-if="item.bstIsAccept=='N'">未领取</span>
	                </span>
	              </h2>
						<span class=" color3 f_16">{{item.taskInfo.bstContent}}</span>
					</li>
				</ul>
			</div>
			<div slot="footer">
				<Button v-if="!isAcceptTask" type="primary" shape="circle" class="my-btn" @click="acceptTask">领取任务</Button>
				<Button v-else disabled type="primary" shape="circle" class="my-btn">已领取</Button>
			</div>
		</Modal>
		<Modal v-model="addBizIndustryPkModal" ref="addBizIndustryPkModal" title="请输入同行网站" class-name="small-btn-box vertical-center-modal">
			<Input v-model="ipWebsite" placeholder="请输入地址" class="width_300"></Input>
			<Button type="primary" shape="circle" class="my-btn ml_10" :loading="loading" @click="addBizIndustryPk">确定</Button>
			<div slot="footer"></div>
		</Modal>
	
		<!--   	P4P 前5为竞价 -->
		<Modal v-model="P4Pbidding" title="P4P前5竞价词" @on-ok="" :styles="{top: '120px',width:'800px',padding:'10px'}">
			<div>
				<p style="font-size: 16px; text-indent: 2em;">系统通过对比分析得出,下列{{P4PTotalCount}}个关键词，您同行正在竞价前五名的位置，建议您竞价前五名，以赶超效果</p>
				<Input v-model="word_modelval2" placeholder="输入关键词" style="width:230px; padding:0px;margin-right:10px;"></Input>
    			<Button type="primary" shape="circle" style="margin-right:20px;height:38px" @click="word_clickinit2()">搜索</Button>
				<Select style="width:200px" v-model="aliGroup">
					<Option v-for="item in word_viewlist" :value="item" :key="item">{{item}}</Option>
				</Select>
	
				<Button type="primary" shape="circle" class="ml_10" @click="addToP4P()">添加至P4P词库</Button>
				<Button type="primary" shape="circle" class="ml_10" @click="del()">删 &nbsp;&nbsp; &nbsp;除</Button>
	
				<Table height="300" class="scroll mt_10" ref="table" :loading="loading" border stripe :columns="P4Pbidding1" :data="tableDataA" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="p4pSelection" @on-sort-change="p4pSortChange"></Table>
				<Page :total="P4PTotalCount" placement="top" :current="P4PCurrent" :page-size="P4PLimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="P4PChangePage" @on-page-size-change="P4PChangePageSize" style="display: inline-block;margin-left:40px ;" class="fr"></Page>
				<div class="clr" style="text-align: center;">
					<!--<Button type="primary" shape="circle" style="font-size: 16px;" class="mt_10">确定竞价</Button>-->
				</div>
	
				
	
			</div>
			<div slot="footer" style="height: 0;"></div>
		</Modal>
	
		<!--   关键词待使用 -->
		<Modal v-model="keywordCoverage" title="关键词待使用" @on-ok="" :styles="{top: '120px',width:'800px'}">
			<div style="padding:0 10px;">
				<p style="font-size: 16px; text-indent: 2em;">系统通过对比分析得出下述{{keywordTotalCount}}个关键词，您同行已发布使用，您未使用，建议点击添加至发布任务，增加平台关键词使用量</p>
				<div class="flex mb_10" style="margin-left: 0%; justify-content: space-between;">
					<Input v-model="word_modelval" placeholder="输入关键词" style="width:230px; margin-left:-52px;padding:0px"></Input>
        			<Button type="primary" shape="circle" style="margin-right:250px;height:38px" @click="word_clickinit()">搜索</Button>
					<Dropdown trigger="custom" :visible="visible" placement="left-start">
						<a href="javascript:void(0)" @click="visible=!visible">
							<Button type="primary" shape="circle">
			            		分配至素材库
				            	<Icon type="ios-arrow-down"></Icon>
					        </Button>
						</a>
						<DropdownMenu slot="list" class="pad">
							<Button @click="distributorSreachA()" type="primary" size="small"><i class="iconfont icon-caozuo" style="font-size: 12px;"></i> 新建产品类型分组</Button>
							<div style="max-height: 100px ; overflow-y: auto;" class="mt_10 mb_10 scroll">
								<div v-for="item in groupList" :style="{marginBottom:item==10?0:'10px'}">
									<label style="display: block;">
						            	<input type="radio" name="group" hidden="hidden" class="checkbox" @click="addGroupId(item.wgId)" />
						            	<span class="check ml_10 mr_10"></span>
						            	<span>{{item.wgName}}</span>
						            </label>
								</div>
							</div>
							<div style="text-align: right;">
								<Button @click="addToGroup()" type="primary" size="small">确定</Button>
								<Button @click="visible=false;groupId=''" size="small" style="background: linear-gradient(to right, #c7866c 0%,#eaae94 100%); color: #fff;">取消</Button>
							</div>
						</DropdownMenu>
					
					</Dropdown>
					<!--<Button @click="visible=false" shape="circle" style="background: linear-gradient(to right, #c7866c 0%,#eaae94 100%); color: #fff;">取消</Button>-->
				</div>
	
				<Table style="margin-top:5px ;" ref="table" :loading="loading" :height="290" border stripe :columns="keywordCoverage1" :data="tableDataB" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="keywordChooseRow"  @on-sort-change="keywordSortChange"></Table>
				<div>
					<!--<div class="fl mt_20" style="text-align: right; width: 50%;">
						<Button type="primary" shape="circle" style="font-size: 16px;" class="mr_10">添加至发布任务</Button>
					</div>-->
					
					<Page :total="keywordTotalCount" placement="top" :current="keywordCurrent" :page-size="keywordLimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="keywordChangePage" @on-page-size-change="keywordChangePageSize"></Page>
				</div>
				<div class="clr"></div>
			</div>
			<div slot="footer"></div>
		</Modal>
	
		<!--  买家偏好度优化   Natural ranking   -->
		<Modal v-model="naturalRanking" title="买家偏好度优化" @on-ok="" :styles="{top: '120px',width:'900px',height:'450px'}">
			<div style="padding:0 10px;">
				<p style="font-size: 16px; text-indent: 2em;">您所优化的关键词涉及以下产品的优化，点击打造爆款，系统将自动设置下述产品为P4P优先推广产品，并进行竞价。以提高产品数据积累(既买家偏好)，从而实现排名提升。</p>
				<Table style="width:850px;margin-top:5px ;" ref="table" :loading="loading" :height="290" border stripe :columns="naturalRanking1" :data="tableDataC" no-data-text="对不起，目前没有任何查询结果"></Table>
				<div class="text-center mt_10">
					<Button type="primary" shape="circle" style="font-size: 16px;">爆款打造</Button>
				</div>
				<Page class="clr" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
	
			</div>
			<div slot="footer" style="height: 0; padding: 0;"></div>
		</Modal>
	
		<!--  自然排名优化   Natural ranking optimize  -->
		<Modal v-model="naturalRankingOptimize" title="自然排名待优化" @on-ok="" :styles="{top: '120px',width:'1000px'}">
			<div style="padding-left:10px">
				<p style="font-size: 16px; text-indent: 2em;" class="mb_10">通过系统对比分析得出，下列{{naturalTotalCount}}个关键词，您的自然排名情况较同行落后。建议您采用系统推荐的对应排名优化策略进行优化。</p>
				<div class="fl mb_10">
					<!--<Select style="width:200px">
						<Option v-for="item in ['请选择分组','热门词','蓝海词','产品信息质量优化','买家偏好优化']" :value="item" :key="item">{{item}}</Option>
					</Select>-->
					<div style="display: inline-block;" class="ml_10">
						<Input placeholder="请输入关键词" v-model="naturalKeyword" @keydown.enter="naturalSearch()" style="width: 200px;" />
						<Button type="primary" shape="circle" class="ml_10" @click="naturalSearch()">搜索</button>
					</div>
				</div>
				<div class="flex mb_10" style="justify-content: space-around;">
					<Dropdown trigger="custom" :visible="visible2" placement="left-start">
						<a href="javascript:void(0)" @click="visible2=!visible2">
							<Button type="primary" shape="circle">
			            		分配至素材库
				            	<Icon type="ios-arrow-down"></Icon>
					        </Button>
						</a>
						<DropdownMenu slot="list" class="pad">
							<Button @click="distributorSreachA()" type="primary" size="small"><i class="iconfont icon-caozuo" style="font-size: 12px;"></i> 新建产品类型分组</Button>
							<div style="max-height: 100px ; overflow-y: auto;" class="mt_10 mb_10 scroll">
								<div v-for="item in groupList" :style="{marginBottom:item==10?0:'10px'}">
									<label style="display: block;">
						            	<input type="radio" name="group" hidden="hidden" class="checkbox" @click="addGroupId(item.wgId)" />
						            	<span class="check ml_10 mr_10"></span>
						            	<span>{{item.wgName}}</span>
						            </label>
								</div>
							</div>
							<div style="text-align: right;">
								<Button type="primary" size="small" @click="addNatural()">确定</Button>
								<Button @click="visible2=false;groupId=''" size="small" style="background: linear-gradient(to right, #c7866c 0%,#eaae94 100%); color: #fff;">取消</Button>
							</div>
						</DropdownMenu>
					
					</Dropdown>
					<!--<Button @click="visible=false" shape="circle" style="background: linear-gradient(to right, #c7866c 0%,#eaae94 100%); color: #fff;">取消</Button>-->
				</div>
				<Table style="width:950px;margin-top:5px ;" ref="table" :loading="loading" :height="290" border stripe :columns="naturalRankingOptimize1" :data="tableDataD" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="naturalSelection" @on-sort-change="naturalSortChange" class="clr"></Table>
				<div style="display: flex; justify-content: space-around;">
					<!--<div style="padding-top: 20px;">
						<Button type="primary" shape="circle" class="f_14">产品信息质量优化</Button>
					</div>
					<div style="padding-top: 20px;">
						<Button type="primary" shape="circle" class="f_14" @click="naturalRankingA()">买家偏好度优化</Button>
					</div>-->
					<Page :total="naturalTotalCount" placement="top" :current="naturalCurrent" :page-size="naturalLimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="naturalChangePage" @on-page-size-change="naturalChangePageSize"></Page>
				</div>
			</div>
			<div slot="footer"></div>
		</Modal>
	
		<!-- 新建产品类型分组  -->
		<Modal v-model="distributorSreach" ref="distributorSreach" title="新建产品类型分组" @on-ok="" :styles="{top: '120px',width:'400px'}">
			<div>
				<Input placeholder="请输入名称" size="small" style="width: 60%;" v-model="creatGroupName"/>
				<Button type="primary" class="ml_10" shape="circle" @click="creatGroup()">确定</Button>
			</div>
			<div slot="footer"></div>
		</Modal>
	
	</div>
</template>
<script>
  export default {
    data () {
      return {
      	img:{
      		win:require("../../common/images/peer01.png"),
      		lose:require("../../common/images/peer02.png"),
      	},
      	/**/
      	SisDone:false,
      	word_modelval:'',
      	word_modelval2:'',
      	visible:false,
      	visible2:false,
      	distributorSreach:false,
      	tableHeight:580,
      	P4Pbidding:false,
      	naturalRanking:false,
      	keywordCoverage:false,
      	naturalRankingOptimize:false,
      	//分页参数1
        totalCount:0,
        current:1,
        limit:16,
        offset:0,

        //分页参数2
        page_totalCount:0,
        page_current:1,
        page_limit:16,
        page_offset:0,
      	/**/
        isDone:null,
        loading:false,
        isAcceptTask:false,
        groupTaskStatus1:'',
        groupTaskStatus2:'',
        groupTaskStatus3:'',
        groupTaskStatus4:'',
		updataShow:false,
        mainChart:null,
        url:'',
        cheshiurl:"",

        noticeList:[],
        taskList:[],
        taskModal:false,
        title:'',
        bstType:'',
        addBizIndustryPkModal:false, 
        ipWebsite:'',
        startTime:"",
        endTime:"",
        timenum:[],
        fontShow:true,
        tableData:[],
       
        /* P4P 前5为竞价 */
             P4Pbidding1:[
            {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                  },
                  {
                    title: '关键词',
                    key: 'bkw_keywords',
                    align: 'center',

                  },
                  {
                    title: '搜索热度',
                    key: 'bkw_search_hot',
                   
                    sortable:'custom',
                    align: 'center',

                  },
//                {
//                  title: '推广状态',
//                  key: 'generalize',
//                 
//                  sortable:'custom',
//                  align: 'center',
//
//                },
//                {
//                  title: '推广评分',
//                  key: 'generalizeGrade',
//                  sortable:'custom',
//                  align: 'center',
//                  render:(h , params ) => {
//                  	return h('div' ,[
//                  	  h('span' ,{
//                  	  	class:'icon-xingzhuang60kaobei2 iconfont',
//                  	  	style:{
//				                  color:'#ff9900',
//				                  fontSize:'12px'
//                  	  	},
//                  	  }),
//                  	    h('span' ,{
//                  	  	class:'icon-xingzhuang60kaobei2 iconfont',
//                  	  	style:{
//				                  color:'#ff9900',
//				                  fontSize:'12px'
//                  	  	},
//                  	  }),
//                  	    h('span' ,{
//                  	  	class:'icon-xingzhuang60kaobei2 iconfont',
//                  	  	style:{
//				                  color:'#ff9900',
//				                  fontSize:'12px'
//                  	  	},
//                  	  }),
//                  	    h('span' ,{
//                  	  	class:'icon-xingzhuang60kaobei2 iconfont',
//                  	  	style:{
//				                  color:'#ff9900',
//				                  fontSize:'12px'
//                  	  	},
//                  	  }),
//                  	    h('span' ,{
//                  	  	class:'icon-xingzhuang60kaobei2 iconfont',
//                  	  	style:{
//				                  color:'#ff9900',
//				                  fontSize:'12px'
//                  	  	},
//                  	  }),
//                  	//
//                  	])
//                  }
//
//                },
                  //
       ],
        tableDataA:[],
        ///*/*关键词待使用/*/*/*/
       keywordCoverage1:[
            {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                  },
                  {
                    title: '关键词',
                    width: 260,
                    key: 'bkw_keywords',
                    align: 'center',

                  },
                  {
                    title: '搜索热度',
                    key: 'bkw_search_hot',
                   
                    sortable:'custom',
                    align: 'center',

                  },
//                {
//                  title: '对应素材库分组',
//                  key: 'libraryGrouping',   
//                  align: 'center',
//                },      
        ],
    	/*    关键词待覆盖 加数据  */
    	keywordTotalCount:0,
    	keywordCurrent:1,
    	keywordLimit:15,
    	keywordOffset:0,
    	keywordOrder:'',
    	keywordSortType:'',
        tableDataB:[],
       
       /*      */
       /*   买家偏好度       */
       naturalRanking1: [
                  {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                  },
                  {
                    title: '产品主图',
                    key: 'productImgin',
                    align: 'center',

                  },
                  {
                    title: '产品名字',
                    key: 'productName',
                   
                    sortable:'custom',
                    align: 'center',

                  },
                  {
                    title: '优化目标关键词',
                    key: 'optimizeTarget',
                   
                    sortable:'custom',
                    align: 'center',

                  },
                  {
                    title: '自然排名',
                    key: 'naturalRanking',
                    sortable:'custom',
                    align: 'center',
                    render: (h, params) => {
                      if(params.row.kwToPromote==1){
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

                              
                              }
                            }
                          }, '第一名')
                        ]);
                      }else {
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
                               
                              }
                            }
                          }, '第五页')
                        ]);
                      }

                    }
                   /**/
                  },
                   {
                    title: 'P4P覆盖词',
                    key: 'P4PWord',
                    sortable:'custom',
                    align: 'center',

                  },
            ],
       /**/     
       tableDataC:[
        {
          	productImgin:'mug',
          	productName:'杯子',
          	optimizeTarget:'mugred',
          	naturalRanking:' 我排名第一',
          	P4PWord:'P4P',
        }, 
        {
          	productImgin:'mug',
          	productName:'杯子',
          	optimizeTarget:'mugred',
          	naturalRanking:' 我排名第一',
          	P4PWord:'P4P',
        },
        {
          	productImgin:'mug',
          	productName:'杯子',
          	optimizeTarget:'mugred',
          	naturalRanking:' 我排名第一',
          	P4PWord:'P4P',
          },
        {
          	productImgin:'mug',
          	productName:'杯子',
          	optimizeTarget:'mugred',
          	naturalRanking:' 我排名第一',
          	P4PWord:'P4P',
        }, 
        {
          	productImgin:'mug',
          	productName:'杯子',
          	optimizeTarget:'mugred',
          	naturalRanking:' 我排名第一',
          	P4PWord:'P4P',
        },
         {
          	productImgin:'mug',
          	productName:'杯子',
          	optimizeTarget:'mugred',
          	naturalRanking:' 我排名第一',
          	P4PWord:'P4P',
          },
        {
          	productImgin:'mug',
          	productName:'杯子',
          	optimizeTarget:'mugred',
          	naturalRanking:' 我排名第一',
          	P4PWord:'P4P',
        }, 
        {
          	productImgin:'mug',
          	productName:'杯子',
          	optimizeTarget:'mugred',
          	naturalRanking:' 我排名第一',
          	P4PWord:'P4P',
        }
       ],
            
       //
       /*   自然排名  */
      naturalRankingOptimize1:[
                  {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                  },
                  {
                    title: '关键词',
                    key: 'bkw_keywords',
                    width: 200,
                    align: 'center',

                  },
                  {
                    title: '搜索热度',
                    key: 'bkw_search_hot',
                   
                    sortable:'custom',
                    align: 'center',

                  },
                  {
                    title: '同行排名',
                    key: 'pk_natural_ranking',
                   
                    sortable:'custom',
                    align: 'center',
					render: (h, params) => {
                      if(params.row.pk_natural_ranking!=0){
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

                              
                              }
                            }
                          }, '第'+params.row.pk_natural_ranking+'页')
                        ]);
                      }else {
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
                               
                              }
                            }
                          }, '其他')
                        ]);
                      }

                    }
                  },
                  {
                    title: '我的排名',
                    key: 'kw_mynatural_ranking',
                    sortable:'custom',
                    align: 'center',
                    render: (h, params) => {
                      if(params.row.kw_mynatural_ranking!=0){
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

                              
                              }
                            }
                          }, '第'+params.row.kw_mynatural_ranking)
                        ]);
                      }else {
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
                               
                              }
                            }
                          }, '其他')
                        ]);
                      }

                    }
                   /**/
                  },
//                {
//                  title: '对应素材库分组',
//                  key: 'libraryGrouping',
//                  width: 170,
//                  sortable:'custom',
//                  align: 'center',
//
//                },
//                {
//                  title: '优化策略',
//                  key: 'optimizingStrategy',
//                 
//                  sortable:'custom',
//                  align: 'center',
//
//                },
            ],
		    tableDataD:[],
			pkData:[{bkw_shopMp4Num:100,ip_keyword_cover:100,ip_p4p_count:100,bkw_realReplayNum:100,ip_showcase_count:100,orderNum:100,ip_top_word:100,near30Days:100,ip_index_keyword:100},{bkw_shopMp4Num:100,ip_keyword_cover:100,ip_p4p_count:100,bkw_realReplayNum:100,ip_showcase_count:100,orderNum:100,ip_top_word:100,near30Days:100,ip_index_keyword:100}],
			loseData:{},
			groupList:[],
			groupId:'',
			keywordList:[],
			word_viewlist:[],
			aliGroup:'',
			p4pWord:[],
			naturalList:[],
			
			naturalTotalCount:0,
    		naturalCurrent:1,
    		naturalLimit:15,
    		naturalOffset:0,
    		
			P4PTotalCount:0,
    		P4PCurrent:1,
    		P4PLimit:15,
    		P4POffset:0,
    		keywordIdList:[],
    		naturalKeyword:'',
    		creatGroupName:'',
      }
    },
    created(){
    	if(!this.$route.params.website){
    		this.$router.push({name:'businessAnalysis'})
    	}
    	this.api.group_Lexicon.find({}).then((res) => {
          this.groupList=res.data.rows
        })
      this.getData()
      this.loadNotice();
      this.loadTaskList();
    },
    mounted(){
      this.init();
      this.queueInfo();
    },
    watch:{
    	creatGroup(){
    		if(this.creatGroupName==''){
				this.$Notice.warning({
	              title: '分组名或条件值不能为空',
	            });
	            this.$refs.distributorSreach.visible=true
	            this.distributorSreach=true
	            return false
			}
			this.api.group_Lexicon4.find({reqData:{wgName:this.creatGroupName}}).then((res)=>{
				if(res.data.info=="添加成功"){
                    this.loadData();
                    this.$Notice.success({
                      title: '新增成功',
                    });
                    this.api.group_Lexicon.find({}).then((res) => {
			          this.groupList=res.data.rows
			        })
                }
				this.distributorSreach=false
			})
    	},
    	naturalRankingOptimize(){
    		if(!this.naturalRankingOptimize){
    			this.visible2=false
    			this.keywordIdList=[]
    			this.groupId=''
    			this.naturalKeyword=''
    		}
    	},
    	keywordCoverage(){
    		if(!this.keywordCoverage){
    			this.visible=false
    			this.keywordIdList=[]
    			this.groupId=''
    		}
    	},
    	P4Pbidding(){
    		if(!this.P4Pbidding){
    			this.keywordIdList=[]
    			this.groupId=''
    		}
    	}
    },
    methods: {
    naturalSearch(){
    	if(this.naturalKeyword!=''){
    		this.$http('alibaba/PKInfo/pkKeyWordsNatral',{website:this.$route.params.website,other_website:this.$route.params.other_website,myIpId:this.$route.params.myIpId,otherIpId:this.$route.params.otherIpId,showCount:this.naturalLimit,currentPage:this.naturalOffset,naturalKeyword:this.naturalKeyword}).then((res)=>{
	    		this.tableDataD=res.rows
	    		this.naturalTotalCount=res.total
	    	})
    	}
    },
    naturalSortChange(column){
    	this.$http('alibaba/PKInfo/pkKeyWordsNatral',{website:this.$route.params.website,other_website:this.$route.params.other_website,myIpId:this.$route.params.myIpId,otherIpId:this.$route.params.otherIpId,showCount:15,currentPage:1,naturalKeyword:this.naturalKeyword,sort:this.util.changeStr(column.key),order:column.order}).then((res)=>{
    		this.tableDataD=res.rows
    		this.naturalTotalCount=res.total
    	})
    },
    del(){
    	var id=this.keywordIdList.join(',')
    	this.$http('alibaba/PKInfo/pkKeyWordsDelete',{prky_id:id}).then((res)=>{
    		if(res.info=='删除成功'){
    			this.$Notice.success({
		            title: '删除成功',
		        });
		        this.P4PbiddingP4P()
    		}
    	})
    },
    P4PChangePage(currentPage){
        this.P4POffset = currentPage
        this.P4PCurrent = currentPage;
        this.P4PbiddingP4P();
    },
    P4PChangePageSize(pageSize){
        this.P4PLimit = pageSize;
        this.P4PbiddingP4P();
    },
	naturalChangePage(currentPage){
        this.naturalOffset = currentPage
        this.naturalCurrent = currentPage;
        this.naturalRankingOptimizeA();
    },
    naturalChangePageSize(pageSize){
        this.naturalLimit = pageSize;
        this.naturalRankingOptimizeA();
    },
    naturalSelection(selection){
    	this.naturalList=[]
    	this.keywordIdList=[]
    	for(var i=0; i<selection.length; i++){
    		this.naturalList.push(selection[i].bkw_keywords)
    		this.keywordIdList.push(selection[i].prky_id)
    	}
    },
    
    addNatural(){
    	if(this.naturalList.length==0){
			this.$Notice.error({
                title: "请选择关键词",
            });
		}else if(this.groupId==''){
			this.$Notice.error({
                title: "请选择分组",
            });
		}else{
			var keyword=this.naturalList.join(',')
			var id=this.keywordIdList.join(',')
			this.api.group_batchAddKeywords.find({reqData:{keywords:keyword,wgId:this.groupId}}).then((res)=>{
	            console.log(res);
	            this.$http('alibaba/PKInfo/pkKeyWordsDelete',{prky_id:id}).then((res)=>{
		    		if(res.status==200&&res.info==200){
		              this.visible2=false
		              this.$Notice.success({
		                title: '分配成功',
		              });
		              this.naturalRankingOptimizeA()
		            }
		    	})
	        })
		}
    },
    p4pSelection(selection){
    	this.p4pWord=[]
    	this.keywordIdList=[]
    	for(var i=0; i<selection.length; i++){
    		this.p4pWord.push(selection[i].bkw_keywords)
    		this.keywordIdList.push(selection[i].prky_id)
    	}
    },
    addToP4P(){
    
    	if(this.aliGroup==""){
	        this.$Notice.info({
	          title: '请选择分组',
	        });
	    }else if(this.p4pWord.length<1){
	    	this.$Notice.info({
	          title: '请选择关键词',
	        });
	    }else{
	    	var list=[];
	    	var id=this.keywordIdList.join(',')
	
            for(var i=0;i<this.p4pWord.length;i++){
              var obj={
              	tagName:this.aliGroup,
                keywords:this.p4pWord[i],
//              basePrice:this.tabelwrod[i].basePrice,
                analysisType:'',
              }
              list.push(obj);
            }
            console.log(list);
            this.api.wordsToAd.find({reqData:list}).then((res) => {
              this.bthloading=false;
              if(res.data.status==200){
              	this.$http('alibaba/PKInfo/pkKeyWordsDelete',{prky_id:id}).then((res)=>{
		    		this.$Notice.success({
	                  title: '分配成功',
	                });
	                this.P4PbiddingP4P()
	                this.tabelwrod=[];
		    	})
                
              }
            });
	    }
    },
    ///更新店铺数据
    updateStop(){
    	this.$http('alibaba/PKInfo/newPkSelf',{}).then((res)=>{
    		if(res.status == '200'){
    			this.$Notice.success({
	                title: '操作成功',
	        	});
	        	this.updataShow = false;
    		}
		})
    },
    addGroupId(id){
		this.groupId=id
    },
	addToGroup(){
		if(this.keywordList.length==0){
			this.$Notice.error({
                title: "请选择关键词",
            });
		}else if(this.groupId==''){
			this.$Notice.error({
                title: "请选择分组",
            });
		}else{
			var keyword=this.keywordList.join(',')
			this.api.group_batchAddKeywords.find({reqData:{keywords:keyword,wgId:this.groupId}}).then((res)=>{
	            console.log(res);
	            if(res.data.info=="添加成功"){
	              this.visible=false
	              this.$Notice.success({
	                title: '添加成功',
	              });
	              this.loadPreeList()
	            }
	        })
		}
	},
    //同行词库
    loadPreeList(){
    	this.$http('alibaba/PKInfo/pkKeyWordsCover',{myIpId:this.pkData[0].ip_id,otherIpId:this.pkData[1].ip_id,showCount:this.keywordLimit,currentPage:this.keywordOffset}).then((res)=>{
    		this.tableDataB=res.rows
    		this.keywordTotalCount=res.total
    	})
//      this.api.findIndustryKeywordsForAnalysis.list({
//        reqData:{
//          "queryType":'blue',
//          "ipId":this.industryPkList[0].ipId,
//          "keyword":'',
//          "limit":this.keywordLimit,
//          "offset":this.keywordOffset,
//          "order": this.keywordOrder,
//          "sort":this.keywordSortType
//        }
//      }).then((res) => {
//        if(res){
//          this.tableDataB= res.data.rows;
//          this.keywordTotalCount= res.data.total;
//        }
//      })
    },
    keywordChangePage(currentPage){
        this.keywordOffset = currentPage
        this.keywordCurrent = currentPage;
        this.loadPreeList();
    },
    keywordChangePageSize(pageSize){
        this.keywordLimit = pageSize;
        this.loadPreeList();
    },
    keywordSortChange(column){
    	this.$http('alibaba/PKInfo/pkKeyWordsCover',{myIpId:this.pkData[0].ip_id,otherIpId:this.pkData[1].ip_id,showCount:15,currentPage:0,sort:this.util.changeStr(column.key),order:column.order}).then((res)=>{
    		this.tableDataB=res.rows
    		this.keywordTotalCount=res.total
    	})
    },
    keywordChooseRow(selection) {

        let arr =[];
        let arr2=[];
        this.keywordIdList=[]
        for(var i=0;i<selection.length;i++){
          arr.push(selection[i].kwId)
          this.keywordIdList.push(selection[i].prky_id)
        }
        for(let i=0;i<selection.length;i++){
          arr2.push(selection[i].bkw_keywords)
        }
//      this.selectedArr = arr;
//      this.selectedKeyWordArr=arr2;
		this.keywordList=arr2
    },
	back(){
        this.$router.push({name:'businessAnalysis',params:{page:this.$route.params.offset}})
//      this.$router.go(-1)
    },
    getLoseData(){
    	var obj={}
    	for(var i in this.pkData[0]){
//  		if(parseFloat(this.pkData[0][i])<parseFloat(this.pkData[1][i])){
    			switch (true){
    				case i=='ip_top_word' : obj['顶展词']=parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])
		    		break;
		    		case i=='ip_keyword_cover' : obj['关键词使用量']=parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])
		    		break;
		    		case i=='ip_index_keyword' : obj['首页自然排名']=parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])
		    		break;
		    		case i=='ip_showcase_count' : obj['橱窗数']=parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])
		    		break;
		    		case i=='bkw_shopMp4Num' : obj['旺铺视频数']=parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])
		    		break;
		    		case i=='bkw_realReplayNum' : obj['及时回复率']=(parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])).toFixed(2)+'%'
		    		break;
		    		case i=='near30Days' : obj['近30天报价数']=parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])
		    		break;
		    		case i=='orderNum' : obj['近半年订单数']=parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])
		    		break;
		    		case i=='ip_p4p_count' : obj['P4P前5竞价词']=parseFloat(this.pkData[0][i])-parseFloat(this.pkData[1][i])
		    		break;
    			}
//  		}
    	}
    	this.loseData=obj
      },
      getExplain(item){
      	switch(item){
      		case '关键词使用量': return '截止PK时间内，双方平台所使用到的关键词个数。'
      		break;
      		case '旺铺视频数': return '截止PK时间内，双方平台旺铺首页的视频数量。'
      		break;
      		case '首页自然排名': return '在PK分析过程中，双方平台所使用到的关键词自然排名在第一页中的个数。'
      		break;
      		case '及时回复率': return '在PK分析过程中，双方平台的及时回复率。'
      		break;
      		case 'P4P前5竞价词': return '在PK分析过程中，双方P4P竞价在前5位的关键词个数。'
      		break;
      		case '近30天报价数': return '截止PK时间内，双方平台线上报价数量。'
      		break;
      		case '顶展词': return '在PK分析过程中，双方平台所使用到的顶展词个数。'
      		break;
      		case '近半年订单数': return '截止PK时间内，双方平台线上订单数量。'
      		break;
      		case '橱窗数': return '在PK分析过程中，双方平台所使用到的橱窗个数。'
      		break;
      	}
      },
      getNumData(key){
//    	if(key=='bkw_realReplayNum'){
//    		return [this.pkData[0][key]+'%',this.pkData[1][key]+'%']
//    	}
      	return [this.pkData[0][key],this.pkData[1][key]]
      },
      getData(){
    	this.$http('alibaba/PKInfo/PKdata',{website:this.$route.params.website,other_website:this.$route.params.other_website,myIpId:this.$route.params.myIpId,otherIpId:this.$route.params.otherIpId}).then((res)=>{
    		console.log(res.rows[0].isDone);
    		if(res.rows[0].isDone == "Y"){
		    	this.updataShow = true;
		    }else{
		    	this.updataShow = false;        
		    }
    		this.pkData=res.rows
    		this.getLoseData()
    	})
      },
      getNum(key){
    	var num1=this.pkData[0][key]
    	var num2=this.pkData[1][key]
    	var Num=num1>num2?num1:num2
    	switch(true){
    		case Num<=5&&Num>=0 : return [(num1*20).toFixed(2),(num2*20).toFixed(2)]
    		break;
    		case Num<=10&&Num>5 : return [(num1*10).toFixed(2),(num2*10).toFixed(2)]
    		break;
    		case Num<=50&&Num>10 : return [(num1*2).toFixed(2),(num2*2).toFixed(2)]
    		break;
    		case Num<=100&&Num>50 : return [parseFloat(num1).toFixed(2),parseFloat(num2).toFixed(2)]
    		break;
    		case Num<=500&&Num>100 : return [(num1*0.2).toFixed(2),(num2*0.2).toFixed(2)]
    		break;
    		case Num<=1000&&Num>500 : return [(num1*0.1).toFixed(2),(num2*0.1).toFixed(2)]
    		break;
    		case Num<=2000&&Num>1000 : return [(num1*0.05).toFixed(2),(num2*0.05).toFixed(2)]
    		break;
    		case Num<=4000&&Num>2000 : return [(num1*0.025).toFixed(2),(num2*0.025).toFixed(2)]
    		break;
    		case Num<=5000&&Num>4000 : return [(num1*0.02).toFixed(2),(num2*0.02).toFixed(2)]
    		break;
    		case Num<=8000&&Num>5000 : return [(num1*0.0125).toFixed(2),(num2*0.0125).toFixed(2)]
    		break;
    		case Num<=10000&&Num>8000 : return [(num1*0.01).toFixed(2),(num2*0.01).toFixed(2)]
    		break;
    		case Num<=20000&&Num>10000 : return [(num1*0.005).toFixed(2),(num2*0.005).toFixed(2)]
    		break;
    		case Num<=40000&&Num>20000 : return [(num1*0.0025).toFixed(2),(num2*0.0025).toFixed(2)]
    		break;
    		case Num<=50000&&Num>40000 : return [(num1*0.002).toFixed(2),(num2*0.002).toFixed(2)]
    		break;
    		case Num<=80000&&Num>50000 : return [(num1*0.00125).toFixed(2),(num2*0.00125).toFixed(2)]
    		break;
    		case Num<=100000&&Num>80000 : return [(num1*0.001).toFixed(2),(num2*0.001).toFixed(2)]
    		break;
    	}
      },
    	/*         */
    P4PbiddingP4P(){
    	this.$http('alibaba/PKInfo/pkKeyWordsP4PTopfive',{website:this.$route.params.website,other_website:this.$route.params.other_website,myIpId:this.$route.params.myIpId,otherIpId:this.$route.params.otherIpId,showCount:this.P4PLimit,currentPage:this.P4POffset}).then((res)=>{
    		this.tableDataA=res.rows
    		this.P4PTotalCount=res.total
    	})
    	this.api.tabelAllGroup.del().then((res) => {
          if(res.data.status==200){
          	this.word_viewlist=[]
            for(var i=0; i<res.data.rows.length;i++){
            	this.word_viewlist.push(res.data.rows[i].name)
            }
          }
        });
    	this.P4Pbidding=true;
    },
    p4pSortChange(column){
    	this.$nextTick(function () {
          this.$http('alibaba/PKInfo/pkKeyWordsP4PTopfive',{website:this.$route.params.website,other_website:this.$route.params.other_website,myIpId:this.$route.params.myIpId,otherIpId:this.$route.params.otherIpId,showCount:15,currentPage:1,sort:this.util.changeStr(column.key),order:column.order}).then((res)=>{
	    		this.tableDataA=res.rows
	    		this.P4PTotalCount=res.total
	    	})
	    	this.api.tabelAllGroup.del().then((res) => {
	          if(res.data.status==200){
	          	this.word_viewlist=[]
	            for(var i=0; i<res.data.rows.length;i++){
	            	this.word_viewlist.push(res.data.rows[i].name)
	            }
	          }
	        });
	    	this.P4Pbidding=true;
        })
    },
 
    naturalRankingOptimizeA(){
    	this.$http('alibaba/PKInfo/pkKeyWordsNatral',{website:this.$route.params.website,other_website:this.$route.params.other_website,myIpId:this.$route.params.myIpId,otherIpId:this.$route.params.otherIpId,showCount:this.naturalLimit,currentPage:this.naturalOffset}).then((res)=>{
    		this.tableDataD=res.rows
    		this.naturalTotalCount=res.total
    	})
    	this.naturalRankingOptimize=true;
    },
    distributorSreachA(){
    	this.distributorSreach=true;
    },
    keywordCoverageA(){
    	this.loadPreeList()
    	this.keywordCoverage=true;
    },
    naturalRankingA(){
    	this.naturalRanking=true;
    	this.naturalRankingOptimize=false;
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
    },
    word_clickinit(){
    	this.$http('alibaba/PKInfo/pkKeyWordsCover',{
    		keywords:this.word_modelval,
    		myIpId:this.pkData[0].ip_id,
    		otherIpId:this.pkData[1].ip_id,
    		showCount:this.keywordLimit,
    		currentPage:this.keywordOffset
    	}).then((res)=>{
    		this.tableDataB=res.rows
    		this.keywordTotalCount=res.total
    	})
    },
    	
    word_clickinit2(){
    	this.$http('alibaba/PKInfo/pkKeyWordsP4PTopfive',{
    		keywords:this.word_modelval2,
    		myIpId:this.pkData[0].ip_id,
    		otherIpId:this.pkData[1].ip_id,
    		showCount:this.keywordLimit,
    		currentPage:this.keywordOffset
    	}).then((res)=>{
    		this.tableDataA=res.rows
    		this.keywordTotalCount=res.total
    	})
    },
    /*            */	
      sequence(a,b){
        if (a>b) {
          return 1;
        }else if(a<b){
          return -1
        }else{
          return 0;
        }
      },
      initMap(arr){
        for(let i=0;i<arr.length;i++){
          if(arr[i].ipKeywordCover==null){
            arr[i].ipKeywordCover=0;
          }
          if(arr[i].ipP4pCount==null){
            arr[i].ipP4pCount=0;
          }
          if(arr[i].ipShowcaseCount==null){
            arr[i].ipShowcaseCount=0;
          }
          if(arr[i].ipTransactionLevel==null){
            arr[i].ipTransactionLevel=0;
          }
          if(arr[i].ipIndexKeyword==null){
            arr[i].ipIndexKeyword=0;
          }
        }
        let  myChart=document.getElementById('map1')
        let chartBox = document.getElementsByClassName('chart')[0]
        // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
        function resizeCharts () {
          myChart.style.width = chartBox.style.width + 'px'
          myChart.style.height = chartBox.style.height + 'px'
        }
        // 设置容器高宽
        resizeCharts()
        this.mainChart = this.$echarts.init(myChart);
        let legendData=[];
        let seriesData=[];
        //求最大值
        let ipKeywordCover=[];
        let ipP4pCount=[];
        let ipShowcaseCount=[];
        let ipTransactionLevel=[];
        let ipIndexKeyword=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].isoneself=='N'){
            legendData.push({
              name:'同行'+ Number(i),
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              value : [arr[i].ipKeywordCover, arr[i].ipP4pCount, arr[i].ipShowcaseCount, arr[i].ipTransactionLevel, arr[i].ipIndexKeyword],
              name : '同行'+ Number(i),
              areaStyle:{
                normal:{
                  color:'rgba(217, 67, 67, 0.25)',
                }
              }
            })
          }else{
            legendData.push({
              name:'我',
              icon: 'rect',
              textStyle: {
                color: '#999999'
              }
            });
            seriesData.push({
              value : [arr[i].ipKeywordCover, arr[i].ipP4pCount, arr[i].ipShowcaseCount, arr[i].ipTransactionLevel, arr[i].ipIndexKeyword],
              name : '我',
              areaStyle:{
                normal:{
                  color:'rgba(217, 67, 67, 0.25)',
                }
              }
            })
          }


          ipKeywordCover.push(Number(arr[i].ipKeywordCover))
          ipP4pCount.push(Number(arr[i].ipP4pCount))
          ipShowcaseCount.push(Number(arr[i].ipShowcaseCount))
          ipTransactionLevel.push(Number(arr[i].ipTransactionLevel))
          ipIndexKeyword.push(Number(arr[i].ipIndexKeyword))
        }
        console.log(ipKeywordCover.sort(this.sequence))
        let maxIpKeywordCover=ipKeywordCover.sort(this.sequence)[ipKeywordCover.length-1]+5;
        let maxIpP4pCount=ipP4pCount.sort(this.sequence)[ipP4pCount.length-1]+5;
        let maxIpShowcaseCount=ipShowcaseCount.sort(this.sequence)[ipShowcaseCount.length-1]+5;
        let maxIpTransactionLevel=ipTransactionLevel.sort(this.sequence)[ipTransactionLevel.length-1]+5;
        let maxIpIndexKeyword=ipIndexKeyword.sort(this.sequence)[ipIndexKeyword.length-1]+5;

        let option = {
          color:['#ff5c62','#3da9fd','#ffbc52','#3dc296'],
          tooltip: {},
          legend: {
            bottom:'6%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap:20,
            data:legendData
          },
          radar: {
            name: {
              textStyle: {
                color: '#999',
                backgroundColor: '#fff',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '关键词覆盖量',max: maxIpKeywordCover},
              { name: 'P4P竞价词数', max: maxIpP4pCount},
              { name: '橱窗数', max: maxIpShowcaseCount},
              { name: '交易等级', max: maxIpTransactionLevel},
              { name: '首页排名词', max: maxIpIndexKeyword},
            ]
          },
          series: [{
            name: '我 vs 同行',
            type: 'radar',
            symbolSize:0,
            data : seriesData
          }]
        };
        this.mainChart.setOption(option);
      },
      init(){
      	
        var url ="?"+window.location.href.split("?")[1];
        if(url){
          var params ={};
          if(url.indexOf("?")!==-1)
          {
            var str = url.substr(1);　//去掉?号
            var strs = str.split("&");
            for(var i=0;i<strs.length;i++)
            {
              var name = strs[i].substring(0, strs[i].indexOf("="));
              var value = strs[i].substring(strs[i].indexOf("=")+1);
              params[name]=value;
            }
          }
          if(params.url){
              var accessToken=`${params.url}?accessToken=${params.accessToken}&alibabaUserId=${params.alibabaUserId}`;
              accessToken=unescape(accessToken);
              localStorage.setItem("url",accessToken);
          }else {
            this.cheshiurl=localStorage.getItem("url");
          }
        }
     
      },
        industryPkShowList(){
        this.api.industryPkShowList.list().then((res) => {
          if(res){
            console.log(1111111111111111)
            console.log(this.pkStatus)
            let count = 0;
            if(res.data.rows.length){
              for(let i=0;i<res.data.rows.length;i++){
                if(res.data.rows[i].isDone === 'Y' && res.data.rows[i].isoneself=='N'){
                  count++
                }
              }
              if(count===res.data.rows.length-1){
                this.isDone="Y";
              }
            }


            if(this.pkStatus==2 || this.pkStatus==3){

//            this.initMap(res.data.rows)
            }


            let preeData=[];
            for(let i=0;i<res.data.rows.length;i++){
              if(res.data.rows[i].isoneself=='N'){
                preeData.push(res.data.rows[i])
              }
            }

            this.industryPkList2 = preeData;

            let arr = preeData;
            let arr2=[
              {
                ipId:null,
                ipSort:null
              },
              {
                ipId:null,
                ipSort:null
              },
              {
                ipId:null,
                ipSort:null
              },
            ]
            if(arr.length<3){
              for(let i=0;i<arr.length;i++){
                arr2[i].ipSort = arr[i].ipSort
                arr2[i].ipId = arr[i].ipId
                arr2[i].ipWebsite = arr[i].ipWebsite
              }
              this.industryPkList = arr2;
            }else{
              this.industryPkList = arr;
            }

          }
        })
      },
       showModal(ipSort){
        this.ipSort = ipSort;
        this.ipWebsite='';
        this.addBizIndustryPkModal= true;
      },
       addBizIndustryPk(){
        this.loading=true;
        this.api.addBizIndustryPk.add({
          reqData:{
            ipSort:this.ipSort,
            ipWebsite:this.ipWebsite
          }
        }).then((res) => {
          if(res){
            this.loading=false;
            this.addBizIndustryPkModal = false;
            this.$Notice.success({
              title: '提示',
              desc: res.data.info
            });
            this.industryPkShowList();
          }
        })
      },
      pk(){
        if(!this.industryPkList2.length){
          this.$Notice.warning({
            title: '提示',
            desc: '请选择PK对象'
          });
        }else{
          this.api.pk.list().then((res) => {
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
              this.pkStatus = 1;
            }
          })
        }
      },
      deletePree(ipId){
        this.api.industryPkDel.del({
          params:[ipId]
        }).then((res) => {
          if(res){
            this.$Notice.success({
              title: '提示',
              desc: res.data.info
            });
            this.industryPkShowList();
          }
        })
      },
      loadNotice(){
        this.api.getIndexNotice.list().then((res) => {
          if(res){
            this.noticeList = res.data.rows;
          }
        })
      },
      loadTaskList(){
        this.api.queryUserTask.list().then((res) => {
          if(res){
            let arr = res.data.rows
            this.taskList = arr;
            for(let i=0;i<arr.length;i++){
              if(arr[i].taskInfo.bstType==='jzrw'){
                this.groupTaskStatus1 = arr[i].groupTaskStatus;
              }else if(arr[i].taskInfo.bstType==='yhrw'){
                this.groupTaskStatus2 = arr[i].groupTaskStatus;
              }else if(arr[i].taskInfo.bstType==='p4prw'){
                this.groupTaskStatus3 = arr[i].groupTaskStatus;
              }else if(arr[i].taskInfo.bstType==='zyrw'){
                this.groupTaskStatus4 = arr[i].groupTaskStatus;
              }
            }
          }
        })
      },
      showTask(bstType,tit){
        this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;

        if(this.groupTaskStatus1!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask2(bstType,tit){
        this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;
        if(this.groupTaskStatus2!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask3(bstType,tit){
        this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;

        if(this.groupTaskStatus3!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask4(bstType,tit){
        this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;

        if(this.groupTaskStatus4!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      acceptTask(){
        if(this.bstType=='zyrw' && (this.groupTaskStatus1!='已完成' || this.groupTaskStatus2!='已完成' || this.groupTaskStatus3!='已完成')){
          this.$Notice.warning({
            title: '提示',
            desc: '其他任务完成之后才能领取卓越任务'
          });
        }else{
          this.api.acceptTask.change({
            params:[this.bstType]
          }).then((res) => {
            if(res){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
              this.taskModal = false;
              this.loadTaskList()
            }
          })
        }
      },
   
      industryPkShowList(){
        this.api.industryPkShowList.list().then((res) => {
          if(res){
            console.log(1111111111111111)
            console.log(this.pkStatus)
            let count = 0;
            if(res.data.rows.length){
              for(let i=0;i<res.data.rows.length;i++){
                if(res.data.rows[i].isDone === 'Y' && res.data.rows[i].isoneself=='N'){
                  count++
                }
              }
              if(count===res.data.rows.length-1){
                this.isDone="Y";
              }

            }


            if(this.pkStatus==2 || this.pkStatus==3){

//            this.initMap(res.data.rows)
            }


            let preeData=[];
            for(let i=0;i<res.data.rows.length;i++){
              if(res.data.rows[i].isoneself=='N'){
                preeData.push(res.data.rows[i])
              }
            }

            this.industryPkList2 = preeData;

            let arr = preeData;
            let arr2=[
              {
                ipId:null,
                ipSort:null
              },
              {
                ipId:null,
                ipSort:null
              },
              {
                ipId:null,
                ipSort:null
              },
            ]
            if(arr.length<3){
              for(let i=0;i<arr.length;i++){
                arr2[i].ipSort = arr[i].ipSort
                arr2[i].ipId = arr[i].ipId
                arr2[i].ipWebsite = arr[i].ipWebsite
              }
              this.industryPkList = arr2;
            }else{
              this.industryPkList = arr;
            }

          }
        })
      },
      queueInfo(){
        this.api.queueInfo.list({
          reqData:{
            ipqType:1
          }
        }).then((res) => {
          if(res){
            /*this.pkStatus = res.data.rows[0].ipqStatus;*/

            if(res.data.rows.length){
              this.pkStatus = res.data.rows[0].ipqStatus;
            }else{
              this.pkStatus = 0;
            }
            this.industryPkShowList();

          }

        })
      },
    ////
    //分页
      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
      },
      imagechangePage(currentPage){
        this.imageoffset = (currentPage-1)*this.imagelimit;
        this.imagecurrent = currentPage;
        this.imginit();
      },
      changePage_2(currentPage){
        this.page_offset = (currentPage-1)*this.limit;
        this.page_current = currentPage;
      },
      borderchangePage(currentPage){
        this.borderoffset = (currentPage-1)*this.borderlimit;
        this.bordercurrent = currentPage;
      },
  
    },
     filters:{
      fmt:function (input) {
        let d = new Date(input);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month
        let day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        return year+ '-' + month + '-' + day;
      }
    }
  }
</script>
<style scoped>
.text-center{
	display: flex; 
	justify-content: space-around;
}	

/* .ivu-modal-footer{
	padding: 0;
}*/
	

	
.index-bg1{
  	background: #ebf0f5;
  	padding: 10px 25px;
  }	
	
	
.pk-wrap{
	height: 55%;
    padding:5px 10px 15px 10px;
    background: #FFFFFF;
    box-shadow: 0px 2px 5px #e1e2e2;
    border-radius:6px;
    margin-bottom: 20px;
}

.pk-wrap .pk-wrap_pk_xm01{
	height: 20%;
}
/*///*/
   .center{
    margin: 0 auto!important;
  }
  .flex{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    padding:0 7%;
  }
  .margin{
    margin: 12px 0;
  }

  .map-wrap{
    height: 43%;
    padding:5px 10px 15px 10px;
    background: #FFFFFF;
    box-shadow: 0px 2px 5px #e1e2e2;
    border-radius:6px;
  }
  .map-wrap>div:nth-child(2){
    height:calc(100% - 38px);
  }

  .map-wrap>div:nth-child(2)>.chartile{
    background: #EBF0F4;
  }
  .map-wrap>div:nth-child(2)>.chartile>span{
    display: inline-block;
    width:12%;
    text-align: center;
    padding:10px 0 ;
    border-right:1px solid #DDDDDD;
    cursor: pointer;
  }
  .map-wrap>div:nth-child(2)>div{
    height:calc(100% - 80px);
  }

  .chartile .bgcolor{
    background: #ffffff;
  }

  .hangye{
    padding:8px 0;
    padding-right:28px;
    position: relative;
  }

  .hanshow{
    height:30px;
    overflow: hidden;
  }

  .hanauto{
    height:50px;
    overflow-y: auto;
  }

  .hangye strong{
    position: absolute;
    top: 8px;
    right:0;
    color: #0091FA;
  }
  .hangye>span{
    padding:0 10px;
    border-right:1px solid #DDDDDD;
    cursor: pointer;
  }
  .hangye>span:hover{
    color: #FF7518;
  }
  .hangye>.spancolor{
    color: #FF7518;
  }


  .news{
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    display: block;
    float: left;
    width: 100%;
    max-width: 300px;
    padding: 20px 0 10px 10px;
    -moz-transition: all 300ms;
    -webkit-transition: all 300ms;
    transition: all 300ms;
    background: #F0F0F0;
  }
  .news-wrap{
    background: #FFFFFF;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow:0 0 10px #DDDDDD;;
    overflow: hidden;
  }
  .news-wrap .tabs{
    border-radius: 4px 4px 0 0;
    background: #ebf0f5;
    font-size: 0;
  }
  .news-wrap .tab-list{
    width: 25%;
    text-align: center;
    display: inline-block;
    color: #94acc3;
    padding: 12px 0;
    position: relative;
    cursor: pointer;
  }

  .news-wrap .tab-list.active{
    background: #FFFFFF;
    border-top: 2px solid #2b7bd7;
    margin-top: -2px;
    z-index: 999;
  }
  .news-wrap .messages{
    height: calc(100% - 45px);
    padding: 10px 0;
    overflow: auto;
  }

  .news-wrap .messages::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .news-wrap .messages::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .news-wrap .messages::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
  .news-wrap .messages li{
    padding-bottom: 10px;
    margin: 8px 20px;
    line-height: 22px;
    border-bottom: 1px dashed #DDDDDD;
  }
  .news-wrap .messages a{
    color: #666666;
  }
  .main{
    height:100%;
  }
  .full-height{
    display: flex;
  }
  @media screen and (min-width: 1920px){
    .content-wrap{
      height: calc(100% - 80px);
    }
    .news{
      max-width: 425px;
      top: 80px;
      padding: 20px 0 20px 15px;
    }
    .news-wrap .messages li{
      padding: 10px 15px;
    }
    .content{
      margin-right: 20px;
      padding: 20px 0 20px 20px;
    }
  }
  .main{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .tasks{
    -moz-transition: all 300ms;
    -webkit-transition: all 300ms;
    transition: all 300ms;
    -webkit-box-flex: 0 0 330px;
    -moz-box-flex: 0 0 330px;
    -webkit-flex: 0 0 330px;
    -ms-flex:0 0 330px;
    flex: 0 0 330px;
    width: 330px;
    height: 100%;
    padding: 0 10px 0 15px;

  }
  .task-inner{
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 4px;
    box-shadow:0 0 10px #DDDDDD;
    padding:25px 30px 0;
  }
  .task-tit{
    background: url(../../common/images/task_title.png) center no-repeat;
    background-size: 145px 40px;
    text-align: center;
    color: #FFFFFF;
    padding:7px 7px 14px 7px;
    margin-bottom: 25px;

  }
  .task-inner>div:nth-last-of-type(1){
    height: -moz-calc(100% - 65px);
    height: -webkit-calc(100% - 65px);
    height: calc(100% - 65px);
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .task-list{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    text-align: center;
    border-top: 1px solid #e6ecf1;
    position: relative;
    cursor: pointer;
  }




  .task-wrap ul li h2{
    font-weight: normal;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .font-weight{
  	font-weight: bold;
  }
  .pk-btn{
    width: 126px;
    height: 36px;
    color: #FFFFFF;
    border: 0;
    border-radius: 16px;
    margin-left: 20px;
    font-size: 16px;
    box-shadow: 0 0 10px #b1d2f0;
    background: -moz-linear-gradient(right, #0077f0 0%, #00a0fe 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0077f0), color-stop(100%,#00a0fe));
    background: -webkit-linear-gradient(right, #0077f0 0%,#00a0fe 100%);
    background: -o-linear-gradient(right, #0077f0 0%,#00a0fe 100%);
    background: -ms-linear-gradient(right, #0077f0 0%,#00a0fe 100%);
    background: linear-gradient(to right, #0077f0 0%,#00a0fe 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0077f0', endColorstr='#00a0fe',GradientType=0 );
    box-shadow: 0px 2px 10px rgba(0, 152, 252, 0.4);
  }
</style>

