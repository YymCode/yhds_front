<template>
	<div class="full-height">
		<Breadcrumb separator=">">
	      <Breadcrumb-item href="/platformsAnalysis">平台分析</Breadcrumb-item>
	      <Breadcrumb-item>数据分析</Breadcrumb-item>
	    </Breadcrumb>
	    <div class="main scroll" ref="main" style="overflow-y: scroll;">
			<div class="blue-linear pl-lg pr-lg pt-sm pb-sm bord-rad border-radius mb_20">
	    		<h2 class="text-white text-nomal">橱窗利用率</h2>
	    	</div>
	    	<div class="flex">
	    		<div class="clr mt_10 flex1" style="max-height: 280px;">
			        <Table class="scrollbalWidth scroll" border stripe :height="280" :columns="columns1" :data="showcaseData" no-data-text="完成一次同行PK后，系统将显示橱窗利用率"></Table>
			    </div>
			    <div class="mt_10 width_300 tips-box" style="height: 280px; padding-top: 60px;">
			    	<div class="tips">您目前平台<span class="text-blue">{{getNum()[0]}}</span>个橱窗产品，共计覆盖关键词<span class="text-blue">{{getNum()[1]}}</span>个，覆盖搜索热度<span class="text-blue">{{getNum()[2]}}</span>。</div>
			    	<!--<Dropdown trigger="custom" :visible="visible" placement="left-start">
			    		<button class="text-white my-btn ivu-btn-orange ivu-btn center" @click="visible=!visible">查看系统推荐</button>
			    		<DropdownMenu slot="list" class="sjx-r pad">
			    			<div class="f_16 boder-bottom mb_10">系统推荐</div>
			    			<Table class="scrollbalWidth scroll" border stripe  :columns="columns2" :data="showcaseData1" no-data-text="对不起，目前没有任何查询结果"></Table>
			    		</DropdownMenu>
			    	</Dropdown>-->
			    </div>
	    	</div>
	    	
	    	<div class="blue-linear pl-lg pr-lg pt-sm pb-sm bord-rad border-radius mb_20 mt_20">
	    		<h2 class="text-white text-nomal">关键词使用情况分析</h2>
	    	</div>
	    	<div style="line-height: 40px; height: 40px;">
	    		<img :src="img.suggest" height="35" style="margin-left: 55%;" />
    			<div class="fr" style="width: 20%;font-size: 14px; height: 40px; background: #f2f8fe; text-align: center;line-height: 40px;">优化后预计提升</div>
    		</div>
	    	<div class="clear scroll" style="overflow: auto;">
	    		<div class="fl scroll" style="width: 80%;">
	    			<div class="flex" style="border-top: 1px solid #ccc;border-left: 1px solid #ccc;">
		    			<div class="width-12 height_100 table-title table" style="width: 17.5%;">词覆盖</div>
		    			<div class="width-12 height_100 table bg-gray table-def" style="width: 17.5%;">平台已用关键词<br>{{keywordData.numOne+keywordData.numTow+keywordData.numThree}}</div>
		    			<div class="width-12 height_100 table bg-gray table-def" style="width: 17.5%;">系统采集关键词<br>{{keywordData.coverKeyWords+keywordData.unCoverKeyWords}}</div>
		    			<div class="width-12 height_100 table bg-gray table-def" style="width: 17.5%;">待使用关键词<br>{{keywordData.unCoverKeyWords}}</div>
		    			<div class="width-30 height_100 table bg-gray table-def">
		    				<div style="overflow: auto;width: 80%;" class="scroll">
		    					<div style="margin: 0 auto; display: flex; justify-content: space-between;">
			    					<span class="fl">您还须通过系统采集更多关键词</span>
			    					<router-link to="/keywords/backstage" class="fr">前往采集 >></router-link>
			    				</div>
			    				<div style="margin: 0 auto; display: flex; justify-content: space-between;">
			    					<span class="fl">您有{{keywordData.unCoverKeyWords}}个关键词待使用</span>
			    					<router-link to="/productRelease/batch" class="fr">前往使用 >></router-link>
			    				</div>
		    				</div>
		    			</div>
		    			<!--<div class="width-20 height_100 table bg-gray table-def" style="padding-top:20px;">曝光：3355<br />点击：3355<br />反馈：3355</div>-->
		    		</div>
		    		<div class="flex" style="border-top: 1px solid #ccc;border-left: 1px solid #ccc;border-bottom: 1px solid #ccc;">
		    			<div class="width-12 height_130 table-title2 table" style="width: 17.5%;">词排名</div>
		    			<div class="width-12 height_130 table table-def2" style="width: 17.5%;">首页关键词<br>{{keywordData.numOne}}</div>
		    			<div class="width-12 height_130 table table-def2" style="width: 17.5%;">2-3页关键词<br>{{keywordData.numTow}}</div>
		    			<div class="width-12 height_130 table table-def2" style="width: 17.5%;">3页后关键词<br>{{keywordData.numThree}}</div>
		    			<div class="width-30 height_130 table table-def2">
		    				<div style="overflow: auto;width: 80%;" class="scroll">
		    					<div style="margin: 0 auto; display: flex; justify-content: space-between;">
			    					<span style="max-width: 70%; text-align: left;">3页后关键词建议重新发布高质量产品，获取更好排名位置。 </span>
			    					<router-link  :to="{path:'/platformsAnalysis/plkeywords',query:{page:3}}" >前往发布 >></router-link>
			    				</div>
			    				<div style="margin: 0 auto; display: flex; justify-content: space-between;">
			    					<span style="max-width: 70%; text-align: left;">2-3页关键词建议集中流量打造爆款，以获取更好排名位置。</span>
			    					<router-link :to="{path:'/platformsAnalysis/plkeywords',query:{page:2}}">前往优化  >></router-link>
			    				</div>
		    				</div>
		    			</div>
		    			<!--<div class="width-20 height_130 table bg-gray table-def2" style="padding-top:35px;">曝光：3355<br />点击：3355<br />反馈：3355</div>-->
		    		</div>
	    		</div>
	    		<div class="width-20 fr text-center" style="padding-top:80px; height: 233px;border-top: 1px solid #ccc;border-right: 1px solid #ccc;border-bottom: 1px solid #ccc; font-size: 16px; line-height: 35px;">曝光：{{keyWordExposure.toFixed(2)}}<br />点击：{{keyWordClick.toFixed(2)}}<br />反馈：{{keyWordFb.toFixed(2)}}</div>
	    	</div>
	    	
	    	<div class="blue-linear pl-lg pr-lg pt-sm pb-sm bord-rad border-radius mb_20 mt_20 clr">
	    		<h2 class="text-white text-nomal">P4P使用情况分析</h2>
	    	</div>
	    	<div style="line-height: 40px; height: 40px;">
	    		<img :src="img.suggest" height="35" style="margin-left: 45%;" />
    			<div class="fr" style="width: 20%;font-size: 14px; height: 40px; background: #f2f8fe; text-align: center;line-height: 40px;">优化后预计提升</div>
    		</div>
	    	<div style="overflow: auto;">
	    		<div style="border-top: 1px solid #ccc;border-left: 1px solid #ccc;border-bottom: 1px solid #ccc; width: 80%;" class="fl">
		    		<div class="flex" v-for="(item,idx) in ['推广产品','推广关键词','3星以下推广词','问题关键词','建议竞价词','推广时间']">
		    			<div class="width-30 height_80 table-title3 table" :style="{background:idx%2!=0?'#f2f8fe':'#c3daf0'}">{{item}}</div>
		    			<div class="width-20 height_80 table bg-gray" style="line-height: 80px; font-size: 14px;" :style="{background:idx%2!=0?'#fff':'#f1f1f1'}">{{item=='推广时间'?(isNaN(parseFloat(p4pTime))?0:parseFloat(p4pTime).toFixed(2)):item=='建议竞价词'?biddingTotal:item=='问题关键词'?questionTotal:getp4pNum(item)}}</div>
		    			<div class="width-50 height_80 table bg-gray table-def3 scroll" :style="{background:idx%2!=0?'#fff':'#f1f1f1'}">
		    				<div style="width: 80%; margin: 0 auto;">
		    					<span class="fl" style="max-width: 75%; text-align: left;">{{idx==0?'您尚有'+p4pUseInfo.PfpCount+'个产品待推广，增加推广产品有利于3星以下词匹配到更高星级的产品进行推广':idx==1?'您尚有'+(getp4pNum(item).split('/')[1]-getp4pNum(item).split('/')[0])+'个关键词待推广，增加推广关键词有利于系统匹配更优质的关键词进行推广。':idx==2?'您尚有'+getp4pNum(item)+'个低星关键词待优化。':idx==3?'您尚有'+questionTotal+'个高曝光低点击及花费较高的关键词，建议暂停推广。':idx==4?'您尚有'+biddingTotal+'个低曝光高点击及平均花费较低的关键词，建议竞价前5名以获取更多点击量。':'您P4P的日推广时间为'+(isNaN(parseFloat(p4pTime))?0:parseFloat(p4pTime).toFixed(2))+'h，建议您调高单日推广预算，获取更多流量。'}}</span>
		    					<router-link to="/p4p/promote" class="fr" v-if="idx==0">前往推广 >></router-link>
		    					<router-link :to="{path:'/p4p/thenext',query:{tabName:'name2'}}" v-if="idx==1" class="fr">前往推广 >></router-link>
		    					<router-link to="/p4p/optimize" class="fr" v-if="idx==2">前往优化 >></router-link>
		    					<router-link :to="{path:'/p4p/thesaurus',query:{type:1}}" class="fr" v-if="idx==3">前往优化 >></router-link>
		    					<router-link :to="{path:'/p4p/thesaurus',query:{type:2}}" class="fr" v-if="idx==4">前往优化 >></router-link>
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    	<div class="width-20 fr text-center" style="padding-top:185px; height: 482px;border-top: 1px solid #ccc;border-right: 1px solid #ccc;border-bottom: 1px solid #ccc; font-size: 16px; line-height: 35px;">曝光：{{p4pExposure.toFixed(2)}}<br />点击：{{p4pClick.toFixed(2)}}<br />反馈：{{p4pFb.toFixed(2)}}</div>
	    	</div>
	    	
	    	<div class="blue-linear pl-lg pr-lg pt-sm pb-sm bord-rad border-radius mb_20 mt_20">
	    		<h2 class="text-white text-nomal">产品使用情况分析</h2>
	    	</div>
	    	<div style="line-height: 40px; height: 40px;">
	    		<img :src="img.suggest" height="35" style="margin-left: 45%;" />
    			<div class="fr" style="width: 20%;font-size: 14px; height: 40px; background: #f2f8fe; text-align: center;line-height: 40px;">优化后预计提升</div>
    		</div>
	    	<div style="border-top: 1px solid #ccc;border-left: 1px solid #ccc;border-bottom: 1px solid #ccc; overflow: auto; width: 80%;" class="fl">
	    		<div class="flex" v-for="(item,idx) in ['高曝低点产品','低曝高点产品','高点低反产品']">
	    			<div class="width-30 height_100 table-title3 table" :style="{background:idx%2!=0?'#f2f8fe':'#c3daf0'}">{{item}}</div>
	    			<div class="width-20 height_100 table bg-gray" style="line-height: 80px; font-size: 14px;" :style="{background:idx%2!=0?'#fff':'#f1f1f1'}">{{idx==0?p4pData.low:idx==1?p4pData.high:p4pData.highClick}}</div>
	    			<div class="width-50 height_100 table bg-gray table-def3 scroll" :style="{background:idx%2!=0?'#fff':'#f1f1f1'}">
	    				<div style="width: 80%; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
	    					<span style="max-width: 75%;">
	    						{{idx==1?'您尚有'+p4pData.high+'个高曝低点产品，主要由于各产品中部分关键词带来了较高曝光且点击率过低，建议您查看产品的词来源，根据此类曝光较高的关键词调整标题及主图内容。':idx==2?'您尚有'+p4pData.highClick+'个高点低反产品，主要由于详情页营销性及吸引力不足，导致客户点击进来后未发送询盘。建议您修改此类产品的详情页面。':'您尚有'+p4pData.low+'个低曝高点产品，此类产品属于潜力优质产品，需要提升产品曝光量，建议进行爆款打造，为此类产品集中引流。提升产品点击及反馈数量。'}}
	    					</span>
	    					<router-link :to="{path:'/platformsAnalysis/platAnalysis',query:{type:3}}" v-if="idx==0">前往优化 >></router-link>
	    					<router-link :to="{path:'/platformsAnalysis/platAnalysis',query:{type:4}}" v-if="idx==1">前往优化 >></router-link>
	    					<router-link :to="{path:'/platformsAnalysis/platAnalysis',query:{type:5}}" v-if="idx==2">前往优化 >></router-link>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="width-20 fr text-center" style="padding-top:110px; height: 302px;border-top: 1px solid #ccc;border-right: 1px solid #ccc;border-bottom: 1px solid #ccc; font-size: 16px; line-height: 35px;">曝光：{{proExposure.toFixed(2)}}<br />点击：{{proClick.toFixed(2)}}<br />反馈：{{proFb.toFixed(2)}}</div>
	    	
    	</div>
	</div>
</template>

<script>
export default{
	data () {
		return {
			img:{
				suggest:require("../../common/images/suggest.jpg")
			},
			tableData:[
				{title:'产品标题',hot:'总热度',power:'总竞争力',num:'总橱窗数',keyword:'产品覆盖词'},
				{title:'产品标题',hot:'总热度',power:'总竞争力',num:'总橱窗数',keyword:'产品覆盖词'},
				{title:'产品标题',hot:'总热度',power:'总竞争力',num:'总橱窗数',keyword:'产品覆盖词'},
				{title:'产品标题',hot:'总热度',power:'总竞争力',num:'总橱窗数',keyword:'产品覆盖词'},
				{title:'产品标题',hot:'总热度',power:'总竞争力',num:'总橱窗数',keyword:'产品覆盖词'},
			],
			columns1: [
	          {
//	            title: '产品标题',
				renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'产品标题'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'橱窗产品所使用的标题'
							}
						})
					])
				},
	            key: 'subject',
	            align: 'center',
	            width: 250
	          },
	          {
//	            title: '总热度',
				renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'总热度'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'该产品所覆盖的所有关键词搜索热度总和。总热度越高，则表示用户搜索频率越大。'
							}
						})
					])
				},
	            key: 'sumhot',
	            align: 'center',
	          },
	          {
//	            title: '总竞争力',
	            renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'总竞争力'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'该产品所覆盖的所有关键词竞争度总和。总竞争度越高，则表示产品的竞争度越大。'
							}
						})
					])
				},
	            key: 'sumCom',
	            align: 'center',
	          },
	          {
//	            title: '总橱窗数',
	            renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'总橱窗数'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'该产品所覆盖的所有关键词橱窗数总和。总橱窗数越高，则表示同行将该类词设置为橱窗产品的使用频率越大。'
							}
						})
					])
				},
	            key: 'sumWin',
	            align: 'center',
	          },
	          {
//	            title: '产品覆盖词',
	            renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'产品覆盖词'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'在阿里巴巴首页中，可以搜索到该产品的关键词个数。'
							}
						})
					])
				},
	            key: 'keyCount',
	            align: 'center',
	          },
			],
			columns2: [
	          {
	            title: '产品标题',
	            key: 'subject',
	            align: 'center',
	            width: 200
	          },
	          {
	            title: '总热度',
	            key: 'sumhot',
	            align: 'center',
	            width: 100
	          },
	          {
	            title: '总竞争力',
	            key: 'sumCom',
	            align: 'center',
	            width: 100
	          },
	          {
	            title: '总橱窗数',
	            key: 'sumWin',
	            align: 'center',
	            width: 100
	          },
	          {
	            title: '产品覆盖词',
	            key: 'keyCount',
	            align: 'center',
	            width: 100
	          },
			],
			visible:false,
			keywordData:{aliUserId:"0",coverKeyWords:0,num:"0",numOne:0,numThree:0,numTow:0,unCoverKeyWords:0},
			p4pData:{aliUserId:"0",groupid:"0",high:0,highClick:0,low:0},
			showcaseData:[],
			p4pUseInfo:{PfpCount:0,alibabaUserId:"0",pfpWordsCount:0,productCount:0,questionWords:0,suggestWrods:0,threeCount:0,timeNum:0,type:"0",wordsCount:0},
			showcaseData1:[],
			p4pTime:0,
			biddingTotal:0,
			questionTotal:0,
			p4pExposure:0,
			p4pClick:0,
			p4pFb:0,
			proExposure:0,
			proClick:0,
			proFb:0,
			keyWordExposure:0,
			keyWordClick:0,
			keyWordFb:0,
		}
	},
	methods:{
		getp4pNum(item){
			switch(item){
				case '推广产品' : return this.p4pUseInfo.productCount+'/'+(parseInt(this.p4pUseInfo.productCount)+parseInt(this.p4pUseInfo.PfpCount))
				break;
				case '推广关键词' : return this.p4pUseInfo.pfpWordsCount+'/'+this.p4pUseInfo.wordsCount
				break;
				case '3星以下推广词' : return this.p4pUseInfo.threeCount
				break;
				case '问题关键词' : return this.p4pUseInfo.questionWords
				break;
				case '建议竞价词' : return this.p4pUseInfo.suggestWrods
				break;
				case '推广时间' : return this.p4pUseInfo.timeNum
				break;
			}
		},
		getNum(){
			var num1=this.showcaseData.length
			var num2=0
			var num3=0
			for(var i=0; i<this.showcaseData.length; i++){
				num2+=parseInt(this.showcaseData[i].keyCount)
				num3+=parseInt(this.showcaseData[i].sumhot)
			}
			return [num1,num2,num3]
		},
		getp4pExposure(){
			this.p4pExposure=0
			this.api.findUpKeyWOrds.data().then((res) =>{
				this.p4pExposure+=res.data.mapInfo.result
				this.api.findExposureKeyWords.data().then((res) =>{
					this.p4pExposure+=res.data.mapInfo.result
					this.api.findmonthKeyWordsCost.data().then((res) =>{
						this.p4pExposure+=res.data.mapInfo.result
						this.api.findKeyWordsOptimize.data().then((res) =>{
							this.p4pExposure+=res.data.mapInfo.result
						})
					})
				})
			})
		},
		getp4pClick(){
			this.p4pClick=0
			this.api.findUpKeyWOrdsClick.data().then((res) =>{
				this.p4pClick+=res.data.mapInfo.result
				this.api.findBadKeyWOrdsClick.data().then((res) =>{
					this.p4pClick+=res.data.mapInfo.result
					this.api.findmonthKeyWordsClick.data().then((res) =>{
						this.p4pClick+=res.data.mapInfo.result
						this.api.findKeyWordsOptimizeClick.data().then((res) =>{
							this.p4pClick+=res.data.mapInfo.result
						})
					})
				})
			})
		},
		getp4pFb(){
			this.p4pFb=0
			this.api.findUpKeyWOrdsFb.data().then((res) =>{
				this.p4pFb+=res.data.mapInfo.result
				this.api.findBadKeyWOrdsFb.data().then((res) =>{
					this.p4pFb+=res.data.mapInfo.result
					this.api.findmonthKeyWordsFb.data().then((res) =>{
						this.p4pFb+=res.data.mapInfo.result
						this.api.findKeyWordsOptimizeFb.data().then((res) =>{
							this.p4pFb+=res.data.mapInfo.result
						})
					})
				})
			})
		}
	},
	mounted(){
		this.$http('alibaba/ProductReport/expectKeyWords').then(res =>{
			this.keyWordExposure=res.rows[0].expectImpression
			this.keyWordClick=res.rows[0].expectClick
			this.keyWordFb=res.rows[0].expectFb
		})
		this.$http('alibaba/ProductReport/lowExposureToHigh').then(res =>{
			this.proExposure=res.rows[0].promoteSumImpression
			this.proClick=res.rows[0].isExpectedToImprove
			this.proFb=res.rows[0].predictResponseRate
			this.$http('alibaba/ProductReport/expectedToImprove').then(res =>{
				this.proExposure+=res.rows[0].promoteSumImpression
				this.proClick+=res.rows[0].isExpectedToImprove
				this.proFb+=res.rows[0].predictResponseRate
//				this.$http('alibaba/ProductReport/HighEndof').then(res =>{
//					this.proExposure+=res.rows[0].promoteSumImpression
//					this.proClick+=res.rows[0].isExpectedToImprove
//					this.proFb+=res.rows[0].predictResponseRate
//				})
			})
		})
		this.getp4pExposure()
		this.getp4pClick()
		this.getp4pFb()
		this.$http('alibaba/ProductReport/keyWorks').then(res =>{
			if(res.rows.length>0){
				this.keywordData=res.rows[0]
			}
		})
		this.$http('alibaba/ProductReport/p4pProductUse').then(res =>{
			if(res.rows.length>0){
				this.p4pData=res.rows[0]
			}
		})
		this.$http('alibaba/ProductReport/productAvailability').then((res) =>{
			this.showcaseData=res.rows
//			this.showcaseData1=[]
//			for(var i=0; i<this.showcaseData.length; i++){
//				if(i<10){
//					this.showcaseData1.push(this.showcaseData[i])
//				}
//			}
//			console.log(this.showcaseData1)
		})
		this.$http('alibaba/ProductReport/p4pKeyAndProductUse').then((res) =>{
			if(res.rows.length>0){
	  			this.questionTotal=res.rows[0].questionWords
	  			this.p4pUseInfo=res.rows[0]
	  		}
		})
		this.api.optimizep4p.data().then((res) => {
	        if(res.data.status==200){
	            this.p4pTime=res.data.mapInfo.online
	        }else {
	            this.p4pTime=0
	        }

        })
		this.api.findMonthWorkTotal.data().then((res)=>{
			console.log(res.data)
		  	this.biddingTotal=res.data.total
		})
	}
}
</script>

<style scoped>
body{
	font-family: "微软雅黑";
}
.text-white{
	color:#fff
}
.flex1{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.blue-linear{
	background: linear-gradient(to right, #0078f2 0%,#fff 100%);
	box-shadow: 0 0 3px #ccc
}
.flex{
	display: flex;
}
.width_300{
	width: 300px;
}
.tips-box{
	padding: 0 20px;
	box-shadow: 2px 2px 3px #ccc;
}
.tips{
	font-size: 16px;
	margin: 46px 0 20px;
}
.center{
	display: block;
	margin: 0 auto;
}
.width-12{
	width: 12.5%;
}
.width-30{
	width: 30%;
}
.width-20{
	width: 20%;
}
.width-50{
	width: 50%;
}
.height_100{
	height: 100px;
}
.height_80{
	height: 80px;
}
.height_130{
	height: 130px;
}
.table-title{
	line-height: 100px;
	font-size: 20px;
	background: #c5daee;
}
.table{
	border-right:1px solid #ccc;
	text-align: center;
}
.table-def{
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
}
.table-def2{
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.bg-gray{
	background: #f1f1f1;
}
.table-title2{
	line-height: 130px;
	font-size: 20px;
	background: #f2f8fe;
}
.table-def3{
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: auto;
}
.table-title3{
	line-height: 80px;
	font-size: 18px;
	background: #f2f8fe;
}
.clear{
	clear: both;
}
  .sjx-r::before{
  	content: '';
    position: absolute;
    top: 10px;
    right: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid rgba(0,0,0,.2);
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent; 
  }
  .sjx-r::after{
  	content: '';
    position: absolute;
    top: 10px;
    right: -9px;
    width: 0;
    height: 0;
    border-left: 10px solid #fff;
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent; 
  }
  .boder-bottom{
  	border-bottom: 1px solid #ccc;
  }
</style>