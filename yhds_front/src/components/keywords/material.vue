<template>
	<div class="full-height">
		<Breadcrumb separator=">">
			<Breadcrumb-item href="/keywords">素材库</Breadcrumb-item>
			<Breadcrumb-item>我的素材库</Breadcrumb-item>
		</Breadcrumb>
		<Button class="crl mb_10" @click="creatProTypeModal=true" type="primary"><span class="iconfont icon-caozuo" style="font-size: 12px;"></span>新建产品类型</Button>
		<div class="main scroll" ref="main" style="overflow: auto;">
			<Table ref="table" :loading="loading" :height="tableHeight" border stripe :columns="columnsAll" :data="tableData" no-data-text="对不起，目前没有任何查询结果"></Table>
			<Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
		</div>
		
		
		<!--新建产品分组模态框-->
		<Modal v-model="creatProTypeModal" title="新建产品分组" :styles="{top:'150px',textAlign:'center'}" >
			<div>
				<Input placeholder="请输入产品分组" style="width: 300px;" v-model="addGroupName" />
			</div>
			<div slot="footer" style="text-align: center">
				<Button type="primary" @click.native="addGroup()">确定</Button>
	            <Button class="ivu-btn-text" @click.native="creatProTypeModal=false">取消</Button>
	        </div>
		</Modal>
		<!--编辑分组模态框-->
		<Modal v-model="proEditorModal" title="编辑分组" @on-ok="editorModalOk()" :styles="{top:'150px',textAlign:'center'}" >
			<div>
				<Input placeholder="请输入产品类型名称" style="width: 300px;" v-model="editorKeyrowdData.wgName"/>
			</div>
		</Modal>
		<!--删除分组模态框-->
		<Modal v-model="proDelModal" title="删除分组" @on-ok="delearr()" :styles="{top:'150px',textAlign:'center'}" >
			<div>
				<p>
                  <Checkbox v-model="delAll">
                    是否同时删除该分组关键词
                  </Checkbox>
                </p>
				<p>该操作不可恢复，是否确认删除</p>
			</div>
		</Modal>
		
		
		<!--标题模态框-->
		<Modal v-model="titleGenerateModal" title="标题" @on-ok="" :styles="{top:'150px'}" width="800" >
			<div>
				<Table :loading="titleLoading" :height="300" border stripe :columns="titleColumns" :data="titleData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseTitle"></Table>
				<Page v-if="titleCount" :total="titleCount" placement="top" :current="titleCurrent" :page-size="titleLimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="titleChangePage" @on-page-size-change="titleChangePageSize"></Page>
			</div>
		</Modal>
		<Modal v-model="titleEditorModal" title="编辑标题" @on-ok="" :styles="{top:'250px',textAlign:'center'}" >
			<div>
				<Input placeholder="请输入标题名称" style="width: 300px;"/>
			</div>
		</Modal>
		<Modal v-model="titleDelModal" title="删除标题" @on-ok="" :styles="{top:'250px',textAlign:'center'}" >
			<div>
				<p>该操作不可恢复，是否确认删除</p>
			</div>
		</Modal>
		<!--标题生成条件编辑模态框-->
		<Modal v-model="titleGenerateEditorModal" title="编辑标题生成条件" :styles="{top:'150px',width:'1040px'}" >
			<div class="demo-split" style="width: 1010px;min-height: 450px; overflow: auto;">
				<div slot="left" style="height:100%;width: 50%;float: left;" class="demo-split-pane">
					<div style="margin: 0 0px 10px 20px;">
						<div> <span>产品类型名称</span>
	
						</div>
						<Input style="width: 400px;" disabled="disabled" v-model="titleGroupName" />
					</div>
					<div style="margin: 0 0px 30px 20px;">
						<div> <span>产品核心词</span>
	
						</div>
						<Input placeholder="请输入标题的产品核心词" style="width: 400px;" v-model="coreWords" @input="coreWords=coreWords.replace(/[\u4e00-\u9fa5]+/g, '')" />
					</div>
					<div style="margin: 10px 0px 0px 10px;">
						<div style="width:30px;height: 40px;display: inline-block;">语法顺序</div>
						<div style="display: inline-block;margin-left: 50px;">产品属性项目</div>
					</div>
					<div style="max-height: 200px; overflow-y: auto;" class="scroll">
						<Row class="div_in_div_01 mb_10 input-samll" v-for="(item,idx) in titleKeyList">
							<Col span="2" class="text-center">
								<Input type="text" style="width: 24px;" size="small" disabled="disabled" :value="idx+1" />
							</Col>
							<Col span="8" class="text-center ml_10 mr_15">
								<Input type="text" placeholder="属性名" v-model="item.attribute" @input="titleKeyChange($event,idx)"/>
							</Col>
							<Col span="8" class="text-center">
								<Input type="text" placeholder="属性值" v-model="item.attributeValue" @input="titleValueChange($event,idx)"/>
							</Col>
							<Col span="3" class="ml_10">
								<Icon type="arrow-up-c mr_5" @click="titleKeyUp(idx)"></Icon>
								<Icon type="arrow-down-c mr_5" @click="titleKeyDown(idx)"></Icon>
								<i class="iconfont icon-icon--" v-if="titleKeyList.length>5" @click="titleKeyDel(idx)"></i>
							</Col>
						</Row>
					</div>
					<div class="text-center mt_10" v-show="titleKeyList.length<7">
						<Button type="primary" @click="titleKeyAdd()">添加属性</Button>
					</div>
				</div>
				<div slot="right" style="width: 50%;float: right;" class="demo-split-pane">
					<div class="div_div_span_011" style="width:450px;min-height:400px;border: 1px solid #ccc;margin:20px auto 0; border-radius: 5px;">
						<div style="float: right;font-size: 18px;width: 23px;height:23px;border-radius:50% ;border: 1px double #7993AD ; margin: 10px 10px 10px 0;text-align: center; line-height: 23px;">?</div>
						</br>
						<div> <span style="font-size: 18px">产品属性</span>
							<br/> <span>系统将根据您所填写的属性值，为您自动生成与本产品相关标题，属性项目及属性值填写得越多所生成的标题也越多，若存在多种属性值时，各属性值以 <span style="color: red;font-weight: 900;">","</span>隔开。<span style="color: red;font-weight: 900;">（注：请以英文逗号隔开）</span></span>
						</div>
						<div class="mt_10 mb_10">
							<div style="font-size: 18px">例：</div>
	
							<div style="margin: 10px 0px 0px 10px;">
								<div style="width:30px;height: 40px;display: inline-block;">语法顺序</div>
								<div style="display: inline-block;margin-left: 50px;">产品属性值</div>
								<div style="display: inline-block;margin-left: 100px;">属性值</div>
							</div>
							<div class="div_in_div_02 clr">
								<input id="div_in_che_02" class="fl" type="text" value="1" disabled="disabled" />
								<input type="text" class="fl" value="color" disabled="disabled" />
								<input type="text" class="fl" value="red,white" disabled="disabled" />
							</div>
							<div class="div_in_div_02 clr">
								<input id="div_in_che_02" class="fl" type="text" value="2" disabled="disabled" />
								<input type="text" class="fl" value="size" disabled="disabled" />
								<input type="text" class="fl" value="300ML" disabled="disabled" />
							</div>
						</div>
						<div class="fl">将生成标题 : red mug,white mug,300ml red mug,300ml white mug</div>
						<div style="font-size: 18px" class="clr">语法顺序</div>
						<div>语法顺序决定了系统帮您生成标题时的语音逻辑</div>
						<div>
							<div style="overflow: hidden;">
								<span class="f_18 fl">例：</span>
								<div style="min-width: 20px; max-width: 60px; display: inline-block; margin-right: 5px;" class="text-center fl" v-for="(item,idx) in titleKeyListExample">
									<div style="border-bottom: 1px solid #bbb; height: 24px; line-height: 24px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{titleKeyListExample[idx].attributeValue.split(',')[0]}}</div>
									<div>{{titleKeyListExample.length-idx}}</div>
								</div>
								<div style="min-width: 20px; max-width: 60px; display: inline-block; margin-right: 5px;" class="text-center fl">
									<div style="border-bottom: 1px solid #bbb; height: 24px; line-height: 24px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{coreWords}}</div>
									<div>核心词</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" style="text-align: center">
				<Button type="primary" @click.native="titleSave()" ref="titleConfirm">确定</Button>
	            <Button class="ivu-btn-text" @click.native="titleGenerateEditorModal=false">取消</Button>
	        </div>
		</Modal>
	
		
		<!--选择关键词-->
	    <Modal v-model="chooseKeywordsModal" ref="chooseKeywordsModal" title="选择关键词" class-name="small-btn-box2 vertical-center-modal" width="800" @on-ok="">
	      <Select v-model="keywordSearchType" class="width_180 fl" @on-change="changeKeyWord(1)">
	        <Option  value="0" key="searchType0">按是否使用搜索</Option>
	        <Option  value="1" key="searchType1">按排名搜索</Option>
	        <Option  value="2" key="searchType2">按热度搜索</Option>
	        <Option  value="3" key="searchType3">按P4P推广状况搜索</Option>
	      </Select>
	      <Select v-model="keywordIsCover" class="width_180 fl ml_10" v-if="keywordSearchType==0" @on-change="changeKeyWord(1)">
	        <Option  value="1" key="isCover0">已使用</Option>
	        <Option  value="0" key="isCover1">未使用</Option>
	      </Select>
	      <Select v-model="keywordRanking" class="width_180 fl ml_10" v-if="keywordSearchType==1" @on-change="changeKeyWord(1)">
	        <Option  value="0" key="ranking0">第1页</Option>
	        <Option  value="1" key="ranking1">第1~3页</Option>
	        <Option  value="2" key="ranking2">其他</Option>
	      </Select>
	      <Select v-model="keywordHot" class="width_180 fl ml_10" v-if="keywordSearchType==2" @on-change="changeKeyWord(1)">
	        <Option  value="1" key="hot0">热门词</Option>
	        <Option  value="0" key="hot1">蓝海词</Option>
	      </Select>
	      <Select v-model="keywordPromote" class="width_180 fl ml_10" v-if="keywordSearchType==3" @on-change="changeKeyWord(1)">
	        <Option  value="1" key="promote0">已推广</Option>
	        <Option  value="0" key="promote1">未推广</Option>
	      </Select>
	      <Input v-model="keywords"  placeholder="请输入关键词" class="width_180 fl ml_10"></Input>
	      <div class="fr" style="height: 38px; line-height: 38px;">
	      	<Button type="primary" shape="circle" class="my-btn" @click="changeKeyWord(2)">搜索</Button>
		    <Button type="warning" shape="circle" class="my-btn ml_5 mr_5" @click="thesaurus_show()">删除</Button>
	        <Button type="primary" shape="circle" class="my-btn" @click="distribution_show()">分配</Button>
	      </div>
	      <div class="clr">
	
	      </div>
	      <div class="clr mt_10">
	        <!--<div class="mb_10 mt_10" style="max-height: 80px;overflow: auto;border: 1px solid #DDDDDD"><p>&nbsp;&nbsp;已选:</p><span v-for="item in keywordSelectedArr2" class="ml_10">{{item.kwKeywords}}</span></div>-->
	        <Table :height="300" border stripe ref="chooseKeywordTable" :columns="keywordColumns2" :data="keywordTableData2" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="change" @on-sort-change="shoulistSort"></Table>
	        <Page v-if="keywordTotalCount2" :total="keywordTotalCount2" placement="top" :current="keywordCurrent2" :page-size="keywordLimit2" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="keywordChangePage2" @on-page-size-change="keywordChangePageSize2"></Page>
	      </div>
	
	    </Modal>
	
	
		<!--编辑关键词采集条件-->
        <Modal
          ref="modal1"
          v-model="chooseKeywordsModal2"
          title="关键词筛选条件"
          :styles="{top: '40px'}"
          @on-ok="modelok"
        >
            <div>
                <p class="mag-p">分组名称</p>
                <Input placeholder="请输入分组名称" v-model="editorKeyrowdData.wgName"></Input>
            </div>
            <p class="mag-p">选词条件</p>
            <div class="mod-bor" v-for="(item,index) in editorKeyrowdData.wordGroupRules">
                <p>
                  <Select  v-model="item.wgrIscontain" size="large" id="selewid3">
                    <Option v-for="item in selelist1" :value="item.value" :key="item.id">{{ item.label}}</Option>
                  </Select >
                  <Input style="width:60%" v-model="item.wgrName" id="selewid4"></Input>
                  <span @click="deleioc(index,editorKeyrowdData.wordGroupRules)">
                    <Icon type="ios-trash-outline" class="delete" ></Icon>
                  </span>
                </p>
            </div>
            <Select v-model="seledata" id="sele">
              <Option v-for="(item,index) in selelist" :value="item.value" :key="item.id">{{ item.label }}</Option>
            </Select>
            <span class="iconfont icon-caozuo color1" @click="addhtml(editorKeyrowdData.wordGroupRules,seledata1)" v-if="editorKeyrowdData.wordGroupRules.length<5"></span>
        </Modal>
	
		
		<!--图片上传-->
		<Modal v-model="imgUploadModal" title="图片上传" class-name="vertical-center-modal" width="800">
			<Row id="headimg">
	          <Button type="primary" shape="circle" class="my-btn" @click="localimage">本地图片</Button>
	          <Button type="primary" shape="circle" class="my-btn" @click="imgfenzu">从图片银行选取</Button>
	          <!--<Button type="warning" shape="circle" class="my-btn" @click="borderhod()">边框上传</Button>-->
	          <span class="img-tiele" style="color: #aaa;">单张不超过3M，支持jpeg,jpg,png;<br>建议图片大小640*640,主题鲜明、图片清晰;</span>
	          <div class="img-float">
	            <Button type="primary" shape="circle" class="my-btn" @click="imgeditor()">编辑图片</Button>
	            <Button type="primary" shape="circle" class="my-btn" @click="modalimg()">分配</Button>
	            <Button type="warning" shape="circle" class="my-btn" @click="deleimg()">删除</Button>
	          </div>
	        </Row>
	        <!--上传图片展示和编辑图片展示-->
        	<Tabs value="tab1">
        		<TabPane label="已上传图片" name="tab1" class="scroll" style="height: 400px; padding-bottom: 5px;" @click="imgType=1">
		          <div >
		            <span>已上传图片</span>
		            <span>
		                <Checkbox
		                  :indeterminate="indeterminate"
		                  :value="checkAll"
		                  @click.prevent.native="handleCheckAll">全选
		              </Checkbox>
		            </span>
		
		          </div>
		            <CheckboxGroup v-model="checkAllGroup"  @on-change="checkAllGroupChange">
			            <div v-for="(item,index) in imagearr" class="boxdiv" style="padding-bottom: 25%;">
			              <Checkbox :label="item.imageId+'?'+item.imageUrl" class="inputchex" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0;" >
			                <Card  style="height: 100%">
			                  <div style="height: 100%">
			                    <img :src="item.imageUrl" class="inputing">
			                    <div v-if="item.imageUsed>0" style="background: rgba(0,0,0,0.5); position: absolute; bottom: 0; left: 0; height: 20px; line-height: 20px; color: #fff; text-align: center; width: 100%;">图片已使用</div>
			                    <!--<h3>A high quality UI</h3>-->
			                  </div>
			                </Card>
			              </Checkbox>
			            </div>
			        </CheckboxGroup>
		          <Page id="page" v-if="imgTotalCount>0"  :total="imgTotalCount" :current="current"  show-elevator  :page-size="limit"   @on-change="imgChangePage" class="clr"></Page>
        		</TabPane>
        		<TabPane label="待编辑图片" name="tab2" class="scroll" style="height: 400px; padding-bottom: 5px;" @click="imgType=2">
		          <div >
		            <span>图片编辑</span>
		            <Checkbox
		              :indeterminate="indeterminate_two"
		              :value="checkAll_two"
		              @click.prevent.native="handleCheckAll_two">全选
		            </Checkbox>
		          </div>
		          <CheckboxGroup v-model="checkAllGroup_two"  @on-change="checkAllGroupChange_two">
		            <div v-for="(item,index) in imagepull" class="boxdiv" style="padding-bottom: 25%;">
		              <Checkbox :label="item.imageId+'?'+item.imageUrl"  class="inputchex" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0;" >
		                <Card  style="height: 100%">
		                  <div style="height: 100%">
		                    <img :src="item.imageUrl+'?id='+numid" class="inputing">
		                    <div v-if="item.imageUsed>0" style="background: rgba(0,0,0,0.5); position: absolute; bottom: 0; left: 0; height: 20px; line-height: 20px; color: #fff; text-align: center; width: 100%;">图片已使用</div>
		                    <!--<h3>A high quality UI</h3>-->
		                  </div>
		                </Card>
		              </Checkbox>
		            </div>
		
		          </CheckboxGroup>
		          <Page  id="page2" v-if="page_totalCount>0"  :total="page_totalCount" :current="page_current"  show-elevator   :page-size="page_limit"   @on-change="changePage_2" class="clr"></Page>
        		</TabPane>
        	</Tabs>
		</Modal>
		
		
		<!--分配图片模态框-->
	    <Modal
	      v-model="modalpull"
	      title="请选着您要分配的组"
	      @on-ok="pullok"
	      class-name="vertical-center-modal"
	    >
	      <div style="max-height:500px;overflow-y: auto" class="scroll">
	        <RadioGroup v-model="animal" vertical :loading="loading" id="group">
	          <Radio :label="item.wgId" v-for="item in styledata" :key="item.wgId" class="inupuradio">
	            <span>{{item.wgName}}</span>
	          </Radio>
	        </RadioGroup>
	      </div>
	    </Modal>
	    <!--图片银行模态框-->
	    <Modal
	      v-model="imgbank"
	      width="740"
	      title="从图片银行选取"
	      @on-ok="imageok"
	      class-name="vertical-center-modal"
	    >
	      <div id="modelconten">
	        <Row>
	          <Col span="6">
	            <div class="head">分组列表</div>
	            <ul class="imgblank">
	              <li :class="{color_blue:index==addimg,imgdeg:showadd==index}" v-for="(item,index) in modeldata" @click="imageclass(index)">
	                <span v-if="item.groups.length>0"><Icon type="chevron-right"></Icon></span>
	                {{item.photoAlbumGroup.name}}
	                <ul v-if="showadd==index">
	                  <li v-for="(item2,i) in item.groups" :class="{color_blue:i==addcolor,imgdeg2:showadd2==i}" @click.stop="imageclass2(i,item2.photoAlbumGroup.id)">
	                    <span v-if="item2.groups"><Icon type="chevron-right"></Icon></span>
	                    {{item2.photoAlbumGroup.name}}
	                    <ul v-if="showadd2==i">
	                      <li v-for="(item3,t) in item2.groups" :class="{color_blue:t==addcolor2}" @click.stop="imageclass3(t,item3.photoAlbumGroup.id)">
	                        {{item3.photoAlbumGroup.name}}
	                      </li>
	                    </ul>
	                  </li>
	                </ul>
	              </li>
	              <li :class="{color_blue:imagelast}" @click="imageclass4()">未分组</li>
	            </ul>
	          </Col>
	          <Col span="17" offset="1" :loading="imgLoading" v-if="blankdata.length>0">
	            <div class="quanxuan">
	              <Checkbox
	                :indeterminate="imgbankminate"
	                :value="imgbankkAll"
	                @click.prevent.native="imgbankCheckAll">全选
	              </Checkbox>
	            </div>
	            <CheckboxGroup class="quancar"  v-model="imgalldata"  @on-change="imageGroupChange" >
	              <div class="boxcar" v-for="(item,index) in blankdata" >
	                <Checkbox  :label="item" class="inputchex" >
	                  <Card  style="height: 100%">
	                    <div style="height: 100%">
	                      <img :src="item" class="inputing">
	                      <!--<h3>A high quality UI</h3>-->
	                    </div>
	                  </Card>
	                </Checkbox>
	              </div>
	            </CheckboxGroup>
	          </Col>
	
	          <Col span="17" offset="1" v-else style="text-align: center; padding-top: 50px" v-if="noImg">
	              此分组下暂无图片
	          </Col>
			<Col class="demo-spin-col" span="8" style="text-align: center;border: 0;margin-left: 150px; " v-if="imgLoading">
	            <Spin fix>
	                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
	                <div>Loading</div>
	            </Spin>
	        </Col>
	        </Row>
	
	      </div>
	      <Page  v-if="imagetotalCount>0"  :total="imagetotalCount" :current="imagecurrent"  show-elevator  :page-size="imagelimit"   @on-change="imagechangePage"  ></Page>
	
	    </Modal>
	
	
	    <!--图片上传-->
	    <Modal
	      v-model="imgupload"
	      title="图片上传"
	      @on-ok="ploadok"
	      :styles="{top:'60px'}"
	     >
	     <div style="text-align:center">
	       <Upload
	         ref="upload"
	         multiple
	         :action="aurl+'/alibaba/imageUpload/doFileUpload'"
	         accept="image/png,image/jpeg,image/jpg"
	         :data="{wgId:deleId}"
	         class="upup"
	         :max-size="3072"
	         :on-success="handleSuccess"
	         :before-upload="handleUpload"
	         :on-error="handerror"
	         :on-exceeded-size="handleMaxSize"
	         :on-remove="imgremove"
	       >
	         <Button type="ghost" icon="ios-cloud-upload-outline">选择图片</Button>
	       </Upload>
	     </div>
	    </Modal>
	
	
	    <!--图片编辑模态框-->
	    <Modal
	      ref="editorref"
	      v-model="editor"
	      title="图片编辑"
	      @on-ok="editorok"
	      width="700px"
	      :styles="{top:'60px'}"
	     >
	      <div>
	        <Row type="flex" justify="center" >
	          <Col span="12" >
	            <div class="img-bg">
	               <div class="uplogo">
	                 <span>LOGO</span>
	                 <img :src="logourl" alt="">
	               </div>
	
	              <Upload
	                ref="upload-logo"
	                :action="aurl+'/alibaba/Image/doFileUpload'"
	                accept="image/png,image/jpeg,image/jpg"
	                :show-upload-list="false"
	                :max-size="3072"
	                :on-success="logoSuccess"
	                :before-upload="logoUpload"
	                :on-error="logoerror"
	                :on-exceeded-size="handleMaxSize"
	              >
	                <Button type="warning" shape="circle" class="my-btn">上传Logo</Button>
	              </Upload>
	              <div>
	                <!--<img :src="logourl" alt="">-->
	                <span>上传Logo给图片添加水印(150*150)</span>
	              </div>
	            </div>
	            <div class="img-show">
	              <img :src="logourl" alt="" style="max-width: 100%">
	              <img :src="editorlist+'?id='+numid" alt="" style="max-width: 100%">
	              <!--<vueCropper
						ref="cropper"
						:img="chooseBase"
						:maxImgSize="320"
						:fixed="false"
					></vueCropper>-->
					
	            </div>
				<!--<div @click="$refs.cropper.startCrop()">start</div>-->
	            <div class="img-number">已选择图片{{preview}}张</div>
	          </Col>
	          <!--<Col span="12" style="padding-left:14px">-->
	            <!--<div class="borderlist">-->
	              <!--<ul>-->
	                <!--<li>-->
	                  <!--<img :src="borderframeUrl" alt="" style="max-width: 100%">-->
	                <!--</li>-->
	                <!--<li :class="{bordercolor:index==borderstyle}" v-for="(item,index) in bordershow" :key="index" @click="borderclass(index,item.frameUrl,item.frameId)">-->
	                  <!--<img :src="item.frameUrl" alt="" style="max-width: 100%">-->
	                <!--</li>-->
	              <!--</ul>-->
	            <!--</div>-->
	            <!--<div class="uploadborder">-->
	              <!--<Page  v-if="borderCount>0"  :total="borderCount" :current="bordercurrent"  show-elevator  :page-size="imagelimit" @on-change="borderchangePage"></Page>-->
	            <!--</div>-->
	          <!--</Col>-->
	        </Row>
	      </div>
	
	    </Modal>
	
		
		<!-- 选择模板 template模板 -->
		<Modal v-model="chooseTempModal" ref="chooseTempModal" title="选择模板" class-name="small-btn-box2 vertical-center-modal" width="800">
	      <Input v-model="keywords2"  placeholder="请输入模板名称" class="width_200"></Input>
	      <Button type="primary" shape="circle" class="my-btn ml_10" @click="loadTemplates">搜索</Button>
	      <Button type="primary" shape="circle" class="my-btn ml_10 fr" @click="addTemplate">新建</Button>
	      <div class="clr mt_10">
	        <Table  :loading="templateLoading" border stripe :columns="columns3" :data="tableData3" no-data-text="对不起，目前没有任何查询结果"></Table>
	        <Page v-if="totalCount3" :total="totalCount3" placement="top" :current="current3" :page-size="limit3" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage3" @on-page-size-change="changePageSize3"></Page>
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
	            <div class="divhei mb_10">
	
	              <Select v-model="modeditor" style="width:200px" @on-change="locaEditor">
	                <Option v-for="item in ditorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
	              </Select>
	
	
	            </div>
	            <CheckboxGroup class="quancarx"  v-model="loctalldata"  @on-change="locaCheckAllGroupChange">
	              <div  class="boxcar" v-for="(item,index) in locaImagearr">
	                  <Card style="padding-top: 100%; position: relative;">
	                    <div style="height: 100%; position: absolute; width: 100%; top: 0;left: 0;">
	                      <img :src="item.imageUrl" class="inputing">
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
	        <Page id="page" v-if="locaImatotalCount>0"  :total="locaImatotalCount" :current="locaImacurrent"  show-elevator  :page-size="locaImalimit"   @on-change="locaImachangePage"></Page>
	      </div>
	    </Modal>
		
		
		<!--删除关键词-->
		<Modal
	        v-model="thesaurus"
	        title="删除热词"
	        width="360px"
        >
	        <div style="text-align:center">
	          <p>是否确定删除选中的选项</p>
	        </div>
	        <div slot="footer" style="text-align: center">
	          <Button type="error" size="large"  @click="thesaurus_dele()">确定</Button>
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
import vueCropper from '../vue-cropper.vue'
export default {
	components:{vueCropper},
	data() {
		return {
			test:'',
			video:true,
			imgType:'1',
			titleKeyList:[{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''}],
			titleKeyListExample:[{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''}],
			creatProTypeModal:false,//新建产品类型
			proEditorModal:false,//编辑产品类型模态框
			proDelModal:false,//删除产品类型模态框
			titleGenerateModal:false,//标题生成条件模态框
			titleGenerateEditorModal:false,//标题生成条件编辑模态框
			
			//标题弹框表格相关
			titleLoading:false,
			titleEditorModal:false,
			titleDelModal:false,
			titleId:1,
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
//				{
//					title: '操作',
//					key: 'wcqProductCount',
//					align: 'center',
//					render: (h, params) => {
//						return h('div', [
//							h('span', {
//								style: {
//									marginRight:'10px',
//									color: 'rgb(1, 155, 253)',
//									cursor: 'pointer'
//								},
//								on: {
//									click: () => {
//										this.editorTitle()
//										this.titleEditorModal=true
////										this.titleModal=true
//									}
//								}
//							}, '编辑'),
//							h('span', {
//								style: {
//									color: 'rgb(1, 155, 253)',
//									cursor: 'pointer'
//								},
//								on: {
//									click: () => {
//										this.titleDelModal=true
////										this.titleModal=true
//									}
//								}
//							}, '删除')
//						]);
//					}
//				},
			],
			titleData:[{a:1}],
			titleCount:1,
			titleCurrent:1,
			titleLimit:15,
			titleOffset:0,
			
			//编辑标题生成条件
			coreWords:'',
			coreWordsId:'',
			titleGroupName:'',
			
			//关键词采集条件
			
			/*选择关键词弹窗*/
	        chooseKeywordsModal:false,
	        chooseKeywordsModal2:false,
	        keywords:'',
	        keywordSearchType:'0',
	        keywordIsCover:'1',
	        keywordRanking:'0',
	        keywordHot:'1',
	        keywordPromote:'1',
	        //分页参数
	        keywordTotalCount2:10,
	        keywordCurrent2:1,
	        keywordLimit2:15,
	        keywordOffset2:0,
	        keywordColumns2: [
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
	        keywordTableData2: [
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
	        keywordSelectedArr:[],//已选关键词
	        keywordSelectedArr2:[],
	        wgId:'',//分组id
	        selectedIndex:0,
	        
	        //编辑关键词选择条件
	        htmldata:[''],
            seledata:"and",
            selelist: [
                {
                  value: 'and',
                  label: '使用上述所有条件',
                  id:"yes",
                },
                {
                  value: 'or',
                  label: '使用上述任一条件',
                  id:"no"
                },
              ],
            seledata1:["Y"],
            selelist1: [
                {
                  value: 'Y',
                  label: '包含',
                  id:"contain"
                },
                {
                  value: 'N',
                  label: '不包含',
                  id:"ncontain"
                },
            ],
            htmlname:'',
	        
			
			
			
			//总表
			loading:false,
			tableHeight:200,
			columnsAll: [{
//				title: '产品类型',
//				key: 'wgName',
				renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'产品类型'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'依据自己产品的型号、款式、种类，设定产品类型，用于产品发布（注：产品类型建立得越细，发布产品越精准。）'
							}
						})
					])
				},
				width:400,
				align: 'center',
				render: (h, params) => {
					if(params.row.wgName=='默认分组'){
						return h('div',[
							h('span', {
								style: {
									marginBottom:'5px'
								},
								on: {
									click: () => {
		
									}
								}
							}, params.row.wgName),
						]);
					}else{
						return h('div', [
							h('span', {
								style: {
									marginBottom:'5px'
								},
								on: {
									click: () => {
		
									}
								}
							}, params.row.wgName), 
							h('div',{class:'fr mr_20'},[
								h('span', {
									class:'iconfont icon-bianji mr_10',
									style: {
										cursor: 'pointer'
									},
									on: {
										click: () => {
											this.wgId=params.row.wgId
											for(var i=0; i<this.groupList.length; i++){
												if(this.groupList[i].wgId==params.row.wgId){
													this.editorKeyrowdData=this.groupList[i]
												}
											}
											this.proEditorModal=true
										}
									},
									
								}), 
								h('span', {
									class:'iconfont icon-shanchu2',
									style: {
										display:'inline-block',
										color: 'red'
									},
									on: {
										click: () => {
											this.deleId=params.row.wgId
											this.proDelModal=true
										}
									}
								})
							])
						]);
					}
					
				}
			}, {
//				title: '标题生成条件',
//				key: 'wcqProductCount',
				renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'标题生成条件'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'依据此类产品编辑框中所填写的规则条件，生成标题。用于后续该类产品的发布标题。'
							}
						})
					])
				},
				align: 'center',
				render: (h, params) => {
					return h('div',{style:{textAlign:'center'}}, [
					h('span', {
						style: {
							color: 'rgb(1, 155, 253)',
							cursor: 'pointer',
							display:'inline-block',
							width:'50%'
						},
						on: {
							click: () => {
								this.wgId=params.row.wgId
								this.getTitleList()
								this.titleGenerateModal=true
							}
						}
					}, params.row.titleNumber), h('span', {
						style: {
							color: 'rgb(1, 155, 253)',
							cursor: 'pointer',
							display:'inline-block',
							width:'50%'
						},
						on: {
							click: () => {
								this.titleGroupName=params.row.wgName
								this.wgId=params.row.wgId
								this.getTitleData()
								this.titleGenerateEditorModal = true
							}
						}
					}, '编辑'),
					]);
				}
			},
			{
//				title: '关键词采集条件',
//				key: 'wcqProductCount',
				renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'关键词筛选条件'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'系统将依据此类产品的所填写的规则条件，将通过软件采集关键词自动分配至该组。'
							}
						})
					])
				},
				align: 'center',
				render: (h, params) => {
					if(params.row.wgName!='默认分组'){
						return h('div', [
							h('span', {
								style: {
									display: 'inline-block',
									color: 'rgb(1, 155, 253)',
									cursor: 'pointer',
									width: '50%',
									textAlign: 'center',
								},
								on: {
									click: () => {
										this.selectedIndex = params.index;
										this.wgId = params.row.wgId;
										this.chooseKeywordsModal = true;
					                    this.$nextTick(function () {
					                        this.chooseKeyword(1)
					                    })
		//								this.antistop=true
									}
								}
							},params.row.groupKeywordsNumber), 
							h('span', {
								style: {
									display: 'inline-block',
									color: 'rgb(1, 155, 253)',
									cursor: 'pointer',
									width: '50%',
									textAlign: 'center',
								},
								on: {
									click: () => {
										//  this.$router.push({name:'single',params:{proId:params.row.proId }})
										/*this.antistopTermo=true*/
										this.wgId=params.row.wgId
										for(var i=0; i<this.groupList.length; i++){
											if(this.groupList[i].wgId==params.row.wgId){
												this.editorKeyrowdData=this.groupList[i]
												if(this.groupList[i].wordGroupRules.length>0){
													if(this.groupList[i].wordGroupRules[0].wgrOperatorLogic){
														this.seledata=this.groupList[i].wordGroupRules[0].wgrOperatorLogic
													}
												}
											}
										}
										this.chooseKeywordsModal2 = true
									}
								}
							}, '编辑'),
						]);
					}else{
						return h('div', [
							h('span', {
								style: {
									display: 'inline-block',
									color: 'rgb(1, 155, 253)',
									cursor: 'pointer',
									width: '50%',
									textAlign: 'center',
								},
								on: {
									click: () => {
										this.selectedIndex = params.index;
										this.wgId = params.row.wgId;
										this.chooseKeywordsModal = true;
					                    this.$nextTick(function () {
					                        this.chooseKeyword(1)
					                    })
		//								this.antistop=true
									}
								}
							},params.row.groupKeywordsNumber), 
						]);
					}
				}
			},

			{
//				title: '图片',
//				key: 'createTime',
				renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'图片'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'请上传与此产品类型相关的图片，用于后续产品发布时的主图使用。'
							}
						})
					])
				},
				align: 'center',

				render: (h, params) => {
					return h('div',{style:{textAlign:'center'}}, [
					h('span', {
						style: {
							display:'inline-block',
							width:'50%'
						},
						on: {
							click: () => {
//								this.selectedIndex = params.index;
//			                    this.wgId = params.row.wgId;
//			                    this.locashow();
							}
						}
					}, params.row.groupImagesNumber), 
					h('span', {
						style: {
							color: 'rgb(1, 155, 253)',
							cursor: 'pointer',
							display:'inline-block',
							width:'50%'
						},
						on: {
							click: () => {
								// this.$router.push({name:'single',params:{proId:params.row.proId }})
								this.deleId = params.row.wgId;
								this.imagedata()
								this.imagedata_page()
								this.imgUploadModal = true
							}
						}
					}, '上传'),

					]);
				}
			}, 
			{
//				title: '详情页模板',
//				key: 'wcqStartTime',
				renderHeader:(h,params)=> {
					return h('div',[
						h('span',{
							
						},'详情页模板'),
						h('a',{
							class:'iconfont icon-wenhao ml_10',
							style:{
								fontSize:'14px',
								color:'#000',
								fontWeight:'normal'
							},
							attrs:{
								href:'javascript:;',
								title:'请上传与此产品类型相关的产品页面信息，用于后续产品发布使用。'
							}
						})
					])
				},
				align: 'center',
				render: (h, params) => {
					return h('div', [
					h('span', {
						style: {
							color: 'rgb(1, 155, 253)',
							cursor: 'pointer',
						},
						on: {
							click: () => {
								this.wgId = params.row.wgId;
								this.copyGroupId=params.row.wordGroupId
								this.loadTemplates()
								this.chooseTempModal = true
							}
						}
					}, '模板'), 

					]);
				}
			},


			],
			tableData:[],
			totalCount:1,
			current:1,
			limit:15,
			chooseList:[],
			
			
			//图片上传
			imgUploadModal:false,
			
			
			aurl:process.env.API_ROOT,
			numid:"",
			logourl:"",
	        imgupload:false,
	        ploadlist:[],
	        ploadsize:[],
	
	//          图片银行
	        imgLoading:false,
			noImg:false,
	        imagelast:false,
	
	        addcolor:-1,
	        addcolor2:-1,
	        addimg:0,
	        imageId:"",
	        imagelist:"",
	
	        blankdata:"",
	
	        showadd:-1,
	        showadd2:-1,
	
	//        图片银行分页
	        imagetotalCount:0,
	        imagecurrent:1,
	        imagelimit:16,
	        imageoffset:0,
	
	        imagetext:"",
	
	        imgbank:false,
	        modeldata:"",
	
	
	        imgbankminate:false,
	        imgbankkAll:false,
	        imgalldata:[],
	        imagechebox:[],
	
	
	
	//           上传图片全选功能
	        indeterminate: false,
	        checkAll: false,
	        checkAllGroup: [],
	        checklist:[],
	
	//           编辑图片全选功能
	        indeterminate_two: false,
	        checkAll_two: false,
	        checkAllGroup_two: [],
	        checklist_two:[],
	        preview:'',
	
	
	        //分页参数1
	        imgTotalCount:0,
	        imgCurrent:1,
	        imgLimit:16,
	        imgOffset:0,
	
	        //分页参数2
	        page_totalCount:0,
	        page_current:1,
	        page_limit:16,
	        page_offset:0,
	
	        addstyle:0,
	        deleId:'',
	        styledata:'',
	        //查看上传图片列表
	        imagearr:[],
	        imagepull:[],
	        loading:false,
	
	        //分配图片
	        modalpull:false,
	        animal:'',
	
	
	//        图片编辑
	        editor:false,
	        editorlist:'',
	        imgclick:1,
			
			/*选择模板*/
			templateLoading:false,
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
//	                h('a',{
//	                  style: {
//	                    color: 'rgb(1, 155, 253)'
//	                  },
//	                  on: {
//	                    click: () => {
//	                      this.tableData[this.selectedIndex].templateName = params.row.temName
//	                      this.tableData[this.selectedIndex].temId = params.row.temId
//	                      this.tableData[this.selectedIndex].kwGraphics = params.row.kwGraphics
//	                      this.$Notice.success({
//	                        title: '提示',
//	                        desc: '模板设置成功'
//	                      });
//	                      this.chooseTempModal=false;
//	                    }
//	                  }
//	                },'设置为模板'),
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
	        
	        
	        //        本地图片库
	        locanull:"",
	
	        localimg:false,
	        addloct:0,
	        modeloct:[],
	        loctId:'',
	        locaImagearr:[],
	//            选中本地图片
	
	        locaIndeterminate:false,
	        loctAll:false,
	        loctalldata:[],
	        loctallquan:[],
	//      分页参数1
	        locaImatotalCount:0,
	        locaImacurrent:1,
	        locaImalimit:8,
	        locaImaoffset:0,
	
	        handlist:[],
	
	        locaImagetype:"N",
	
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
	        chooseImg:'',//选中图片
	        chooseBase:'',//选中图片base64
	        
	        //           词库表删除所需变量
            thesaurus:false,
            thesaurus_list:[],

//             词库分配
            groulist:'',
            distribution:false,
            keyAnimal:'',
            radiaoval:"",
            keyGroupLoading:false,
            
            
            
            
            addGroupName:'',
            groupList:[],
            editorKeyrowdData:{wordGroupRules:[]},
            delAll:false,
            single:0,//是否删除分组
	        deleId:"",//删除分组id
	        keywordList:[],
	        
	        copyModal:false,
	        copyGroupId:0,
	        copyTempId:0,
		}
	},



	created() {

	},
	mounted() {
		this.tableHeight = this.$refs.main.offsetHeight - 150;
		this.loadData()
		this.init();
	},
	
	methods:{
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
		//产品类型编辑
		editorModalOk(){
			this.api.group_Lexicon5.find({reqData:{wgId:this.wgId,wgName:this.editorKeyrowdData.wgName,operatorLogic:this.seledata,wordGroupRules:this.editorKeyrowdData.wordGroupRules}}).then((res)=>{
              if(res.data.info=="修改成功"){
                this.loadData()
                this.$Notice.success({
                  title: '修改成功',
                });
              }
            })
		},
		getTitleData(){
			this.api.findMaterial.data({reqData:{
				wgId:this.wgId
			}}).then((res)=>{
				if(res.info=='参数为空'){
					
				}else{
					this.coreWordsId=res.data.rows[0].tpId
					this.coreWords=res.data.rows[0].productAttributeName
					let titleJson=res.data.rows[0].titleProductAttributes[0]
					this.titleKeyList=[]
					for(var i in titleJson){
						this.titleKeyList.push({attribute:i,attributeValue:titleJson[i]})
					}
				}
			})
//			this.$http('alibaba/material/findMaterial',{wgId:this.wgId})
		},
		getTitleList(){//获取标题列表
			this.titleData=[]
			this.titleLoading=true
			this.api.findKeyWords.data({reqData:{
				pwId:this.wgId,
				limit:this.titleLimit,
				offset:this.titleOffset
			}}).then((res)=>{
				this.titleData=res.data.rows
//				for(var i=0; i<list.length; i++){
//					this.titleData.push({title:list[i].title})
//				}
				this.titleCount=res.data.total
				this.titleLoading=false
			})
		},
		editorTitle(){
			this.api.updateKeyWords.data({reqData:{
				wgId:this.titleId
			}}).then((res) =>{
				
			})
		},
		addGroup(){
			if(this.addGroupName==''){
				this.$Notice.warning({
	              title: '分组名或条件值不能为空',
	            });
	            this.$refs.creatProTypeModal.visible=true
	            this.creatProTypeModal=true
	            return false
			}
			this.api.group_Lexicon4.find({reqData:{wgName:this.addGroupName}}).then((res)=>{
				if(res.data.info=="添加成功"){
                    this.loadData();
                    this.$Notice.success({
                      title: '新增成功',
                    });
                }
				this.creatProTypeModal=false
			})
//			this.$http('alibaba/material/saveMaterial',{editTitleModel:this.addGroupName}).then((res)=>{
//				this.creatProTypeModal=false
//			})
		},
		titleSave(){
			for(var i=0; i<this.titleKeyList.length; i++){
				for(var j in this.titleKeyList[i]){
					if(this.titleKeyList[i][j]==''){
						this.$Notice.warning({
			              title: '请将产品属性名及属性值填写完整',
			            });
			            this.titleGenerateEditorModal=true
			            return false
					}
				}
			}
			if(this.coreWords==''){
				this.$Notice.warning({
	              title: '请填写产品核心词',
	            });
	            this.titleGenerateEditorModal=true
	            return false
			}
			this.$refs.titleConfirm.loading=true
			this.$Notice.info({
              title: '标题生成中请稍等',
            });
			this.api.savematerial.data({reqData:{productAttributeName:this.coreWords,pwId:this.wgId,titleProductAttributes:this.titleKeyList,tpId:this.coreWordsId}}).then((res) =>{
				this.titleGenerateEditorModal=false
				this.$refs.titleConfirm.loading=false
				this.loadData()
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
				
		},
		
		titleKeyUp(idx){
			var key=this.titleKeyList.splice(idx,1)
			this.titleKeyList.splice(idx-1,0,key[0])
		},
		titleKeyDown(idx){
			var key=this.titleKeyList.splice(idx,1)
			this.titleKeyList.splice(idx+1,0,key[0])
		},
		titleKeyAdd(){
			this.titleKeyList.push({attribute:'',attributeValue:''})
		},
		titleKeyDel(idx){
			this.titleKeyList.splice(idx,1)
		},
		titleKeyChange(ev,idx){
			ev=ev.replace(/[\u4e00-\u9fa5]+/g, '')
			this.$set(this.titleKeyList[idx],'attribute',ev)
		},
		titleValueChange(ev,idx){
			ev=ev.replace(/[\u4e00-\u9fa5]+/g, '')
			var arr=ev.split(',')
			if(arr.length>4){
				arr.length=4
				this.$Notice.warning({
                  title: '提示',
                  render: h => {
                        return h('span', [
                            '最多4个属性值，若超出系统将会取前4项',
                        ])
                    }
                });
			}
			ev=arr.join(',')
			this.$set(this.titleKeyList[idx],'attributeValue',ev)
		},
		//获取总表数据
		loadData(){
	        this.loading = true;
	        this.api.queryGroupInformation.list({
	          reqData:{
	            offset:this.offset,
	            limit:this.limit
	          }
	        }).then((res) => {
	          this.loading = false;
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
	            }
	            console.log(arr)
	            this.tableData = arr;
	            this.totalCount = res.data.total;
	          }
	        })
	        this.api.group_Lexicon.find().then((res) =>{
	        	this.groupList=res.data.rows
	        })
	    },
	    //分页
	    changePage(currentPage){
	        this.offset = (currentPage-1)*this.limit;
	        this.imgCurrent = currentPage;
	        this.loadData()
	    },
	    //切换每页显示的条数
	    changePageSize(pageSize){
	        this.limit = pageSize;
	        this.loadData()
	    },
	
	
		//关键词
		loadKeywordData(){
        this.keywordLoading = true;
        this.api.queryGroupInformation.list({
          reqData:{
            offset:this.keywordOffset,
            limit:this.keywordLimit
          }
        }).then((res) => {
          this.keywordLoading = false;
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
            }
            console.log(arr)
            this.keywordTableData = arr;
            this.keywordTotalCount = res.data.total;
          }
        })
      },
        keywordChangePage2(currentPage){
        this.keywordOffset2 = (currentPage-1)*this.keywordLimit2;
        this.keywordCurrent2 = currentPage;
        if(this.keywords){
          this.chooseKeyword(2)
        }else{
          this.chooseKeyword(1)
        }

      },
        keywordChangePageSize2(pageSize){
        this.keywordLimit2 = pageSize;
        if(this.keywords){
          this.chooseKeyword(2)
        }else{
          this.chooseKeyword(1)
        }
      },
        changeKeyWord(type){
        this.keywordCurrent2=1;
        this.keywordOffset2=0;
        this.chooseKeyword(type)
      },
      //选择关键词
        chooseKeyword(type){
        let kwSearchHot = '';
        let kwToPromote = '';
//      let kwCover = '';
        let kwCover = this.keywordIsCover;
        let kwNaturalRanking = '';
        if(type===1){
          if(this.keywordSearchType==='2'){
            kwSearchHot = this.keywordHot
          }else if(this.keywordSearchType==='3'){
            kwToPromote = this.keywordPromote
          }else if(this.keywordSearchType==='0'){
            kwCover = this.keywordIsCover
          }else if(this.keywordSearchType==='1'){
            kwNaturalRanking = this.keywordRanking
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
            offset:this.keywordOffset2,
            limit:this.keywordLimit2,
            order:this.keywordOrder2,
            sort:this.keywordSortType
          }
        }).then((res) => {
          if(res){
            this.keywordTableData2 = res.data.rows;
            this.keywordTotalCount2 = res.data.total;
            console.log(res)
          }
        })
      },
	
		//编辑关键词采集条件
		modelok () {
			for(var i=0; i<this.editorKeyrowdData.wordGroupRules.length; i++){
				if(this.editorKeyrowdData.wordGroupRules[i].wgrName==''||this.editorKeyrowdData.wordGroupRules[i].wgrName==null||typeof(this.editorKeyrowdData.wordGroupRules[i]).wgrName==undefined){
					this.$refs.modal1.visible = true;
                    this.chooseKeywordsModal2 = true;
					this.$Notice.warning({
	                  title: '分组名或条件值不能为空',
	                });
	                return false
				}
			}
			this.api.group_Lexicon5.find({reqData:{wgId:this.wgId,wgName:this.editorKeyrowdData.wgName,operatorLogic:this.seledata,wordGroupRules:this.editorKeyrowdData.wordGroupRules}}).then((res)=>{
              if(res.data.info=="修改成功"){
                this.loadData()
                this.$Notice.success({
                  title: '修改成功',
                });
              }
            })
        },
        addhtml(list,sele){//添加input框方法
          list.push({wgrIscontain:'Y'});
          sele.push("Y");
          console.log(list)
        },
        deleioc(idx,arr){
        	if(arr.length<2){
              this.$Notice.info({
                title: '最少包含一个条件',
              });
            }else {
              arr.splice(idx,1)
            }
        },
        delehtml(){//删除接口模态框
//          this.chebul=false;
//          this.single=0
//          if(this.styledata[this.addstyle].wgIsdefault!="Y"){
//            this.modal3 = true
//          }else {
//            this.$Notice.warning({
//              title: '默认分组不可删除',
//            });
//          }
        },
        delearr(){//删除接口方法
			if(this.delAll){
				this.single=1
			}else{
				this.single=0
			}
          this.api.group_Lexicon2.find({params:[this.deleId,this.single]}).then((res)=>{
          	this.loadData()
            if(res.data.status=="200"){
              this.modal3=false;
              this.init();
              this.$Notice.success({
                title: '删除成功',
              });
            }
          });
        },
	
		
		
	  RndNum(n){
        var rnd="";
        for(var i=0;i<n;i++){
          rnd+=Math.floor(Math.random()*10);
          this.numid=rnd;
        }
        console.log( this.numid)
      },
//        假分页
      pagination(pageNo, pageSize, array) {
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
      },
      
      
      //      图片库
      locashow(){
        this.locanull=1;
        this.localimg=true;
        this.loctAll=false;
        this.locaImatotalCount=0;
        this.locaImacurrent=1;
        this.locaImalimit=8;
        this.locaImaoffset=0;
        this.locaImagedata();
      },

      locaHandleCheckAll(){
        if (this.locaindeterminate) {
          this.loctAll = false;
        } else {
          this.loctAll = !this.loctAll;
        }
        this.locaIndeterminate = false;

        if (this.loctAll) {
          for(var i=0;i<this.locaImagearr.length;i++){
              var text=this.locaImagearr[i].imageUrl+'?'+this.locaImagearr[i].imageId+'?'+this.locaImagearr[i].imageUsed;
              if(this.loctalldata.indexOf(text)==-1){
                this.loctalldata.push(text);
              }
          }

          console.log(this.loctalldata);
        } else {
          for(var i=0;i<this.locaImagearr.length;i++){
              for(var t=0;t<this.loctalldata.length;t++){
                var text=this.locaImagearr[i].imageUrl+'?'+this.locaImagearr[i].imageId+'?'+this.locaImagearr[i].imageUsed;
                if(text==this.loctalldata[t]){
                    this.loctalldata.splice(t,1);
                    t=t-1;
                }
              }
          }
          console.log(this.loctalldata);
        }
      },

      locaCheckAllGroupChange (data) {
        console.log(data);
        this.loctallquan=data;
        this.loctalldata=this.loctallquan;
        console.log(this.loctallquan);
        if (data.length === 8) {
          this.loctAll = true;
        } else if (data.length > 0) {
          this.loctAll = false;
        } else {
          this.loctAll = false;
        }
      },
      locaImachangePage(currentPage){
        this.loctalldata=[];
        this.locaImaoffset = (currentPage-1)*this.locaImalimit;
        this.locaImacurrent = currentPage;
        this.locaImagedata();
      },
      //查看上传图片列表
      locaImagedata(){
        this.api.imageslist.find({reqData:{wgId:this.wgId,imageEdit:this.locaImagetype,offset:this.locaImaoffset,limit:this.locaImalimit}}).then((res)=>{
          this.locaImagearr=res.data.rows;
          this.locaImatotalCount = Number(res.data.total);

          this.loctAll = false;
          if(this.locanull==1){
            this.loctalldata=[];
            this.loctalldata=this.loctallquan;
            this.locanull=2
          }else {
            this.$nextTick(function(){
              this.loctalldata=this.loctallquan;
            });
          }

        })
      },
      locaEditor(name){
        this.loctAll = false;
        this.loctalldata=[];
        this.locaImagetype=name;
        this.locaImatotalCount=0;
        this.locaImacurrent=1;
        this.locaImalimit=8;
        this.locaImaoffset=0;
        this.locaImagedata()
      },


      locaok(){

      },

      
      
      
      

  //        logo上传
      logoUpload(file){
        console.log(file);
      },
      logoSuccess(res,file){
        if(res.status=="200"){
          this.logourl=res.rows[1];
          this.$Notice.success({
            title:"上传成功",
          });
        }else {
          this.$Notice.error({
            title: res.info,
            desc:"错误代码"+res.MDC
          });
        }
      },
      logoerror(){
        this.$Notice.error({
          title:"上传失败",
        });
      },
      handleMaxSize(){
        this.$Notice.warning({
          title:"上传图片超过3M",
        });
      },
//      图片银行全选
      imgbankCheckAll(){
        if (this.imgbankminate) {
          this.imgbankkAll = false;
        } else {
          this.imgbankkAll = !this.imgbankkAll;
        }
        this.imgbankminate = false;
        if (this.imgbankkAll) {
          this.imgalldata =this.imagechebox;
          console.log(this.imgalldata)
        } else {
          this.imgalldata = [];
          console.log(this.imgalldata)
        }
      },
      imageGroupChange(data){
        this.imgalldata=data;
        console.log(this.imgalldata);
        if (data.length === this.imagechebox.length) {
          this.imgbankminate = false;
          this.imgbankkAll = true;
        } else if (data.length > 0) {
          this.imgbankminate = true;
          this.imgbankkAll = false;
        } else {
          this.imgbankminate = false;
          this.imgbankkAll = false;
        }
      },

//      全选功能实现方法
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;
        if (this.checkAll) {
          this.checkAllGroup =this.checklist;
        } else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data,item) {
//    	console.log(data)
//    	console.log(item)
//      this.checkAllGroup=data;
//      this.chooseBase=item.base64
//      console.log(this.$refs.cropper)
        console.log(this.checkAllGroup);
        if (data.length === this.checklist.length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },



      handleCheckAll_two(){
          console.log(this.indeterminate_two);
        if (this.indeterminate_two) {
          this.checkAll_two = false;
        } else {
          this.checkAll_two = !this.checkAll_two;
        }
        this.indeterminate_two = false;
        if (this.checkAll_two) {
          this.checkAllGroup_two =this.checklist_two;
        } else {
          this.checkAllGroup_two = [];
        }
      },
      checkAllGroupChange_two(data,item){
//      this.checkAllGroup_two=data;
//      this.chooseBase=item.base64
        if (data.length === this.checklist_two.length) {
          this.indeterminate_two = false;
          this.checkAll_two = true;
        } else if (data.length > 0) {
          this.indeterminate_two = true;
          this.checkAll_two = false;
        } else {
          this.indeterminate_two = false;
          this.checkAll_two = false;
        }

      },

//      查看图片银行分组
      imgfenzu(){
        this.imgalldata=[];
        this.imgbankminate=false;
        this.imgbankkAll=false
        this.imgbank=true;
        this.api.imgBreath.find().then((res)=>{
          console.log(res);
          this.modeldata=res.data.rows;
          this.imageId= this.modeldata[this.addimg].photoAlbumGroup.id;
          this.imagetext="SUB_GROUP";
          this.imginit();
        })
      },
      //切换class
      imageclass(index){
        if(this.showadd==index){
          this.showadd=-1;
          this.showadd2=-1
        }else {
          this.showadd=index;
        }
        this.addimg=index;
        this.addcolor="x";
        this.addcolor2="x";
        this.imagelast=false;
        this.imageId= this.modeldata[this.addimg].photoAlbumGroup.id;
        this.imagetotalCount=0;
        this.imagecurrent=1;
        this.imagelimit=16;
        this.imageoffset=0;
        this.imagetext="SUB_GROUP";
        this.imginit();
      },

      imageclass2(index,id){
        if(this.showadd2==index){
          this.showadd2=-1
        }else {
          this.showadd2=index;
        }
        this.imageId=id;
        this.addimg="x";
        this.addcolor2="x";
        this.imagelast=false;
        this.addcolor=index;

        this.imagetotalCount=0;
        this.imagecurrent=1;
        this.imagelimit=16;
        this.imageoffset=0;
        this.imagetext="SUB_GROUP";
        this.imginit();
      },

      imageclass3(index,id){
        this.addimg="x";
        this.addcolor="x";
        this.imagelast=false;
        this.addcolor2=index;
        this.imageId=id;
        this.imagetotalCount=0;
        this.imagecurrent=1;
        this.imagelimit=16;
        this.imageoffset=0;
        this.imagetext="SUB_GROUP";

        this.imginit();
      },

      imageclass4(){
          this.imagelast=true;
          if(this.imagelast){
            this.addimg="x";
            this.addcolor="x";
            this.addcolor2="x";
            this.showadd=-1;
            this.showadd2=-1
          }
          this.imagetotalCount=0;
          this.imagecurrent=1;
          this.imagelimit=16;
          this.imageoffset=0;
          this.imagetext="UNGROUP";
          this.imginit();
      },
//      查看图片银行分组图片
      imginit(){
        this.imgLoading=true;
        this.imgbankminate=false;
        this.imgbankkAll=false;
        this.imgalldata=[];
        this.imagechebox=[];
        this.blankdata=[];
        if(this.imagetext=="UNGROUP"){
          this.imageId="";
        }
        this.imgLoading=true;
        this.api.imgPicture.data({reqData:{groupId:this.imageId,packetTypes:this.imagetext,page:this.imagecurrent,limit:this.imagelimit}}).then((res)=>{
          this.imgLoading=false;
          console.log(res);
          if(res.data.status==200){
            this.blankdata=res.data.rows;
            for(var i=0;i<this.blankdata.length;i++){
              this.imagechebox.push(this.blankdata[i])
            }
            console.log(this.imagechebox);
            this.imagetotalCount = res.data.total;

          }
			if(this.blankdata.length < 1) noImg = true;
        })
      },
      imginit2(){
        this.imgbankminate=false;
        this.imgbankkAll=false;
        this.imgalldata=[];
        this.imagechebox=[];
        this.api.imgPicture.del({params:[this.imageId,"UNGROUP"]}).then((res)=>{
          console.log(res);
          if(res.data.status==200){
            this.imagelist=res.data.rows;
            if(!this.imagelist){
              this.imagelist=[];
              this.blankdata=[];
            }else {
              this.blankdata=this.pagination(this.imagecurrent,this.imagelimit,this.imagelist);
              for(var i=0;i<this.blankdata.length;i++){
                this.imagechebox.push(this.blankdata[i])
              }
              console.log(this.imagechebox);
              this.imagetotalCount = Number(this.imagelist.length);
            }
          }else {
            this.blankdata=[];
          }
        })
      },
      //查看分组接口
      init(){
        this.api.group_Lexicon.find().then((res)=>{
          console.log(res);
          this.styledata=res.data.rows;
          this.deleId= this.styledata[this.addstyle].wgId;
          this.imagedata();
          this.imagedata_page();
        })
      },
      //切换class
      addclass(index){
        this.addstyle=index;
        this.deleId= this.styledata[this.addstyle].wgId;
        this.offset=0;
        this.page_offset=0;
        this.imagedata();
        this.imagedata_page();
      },
      //查看上传图片列表
      imagedata(){
        this.api.imageslist.find({reqData:{wgId:this.deleId,imageEdit:"N",offset:this.imgOffset,limit:this.imgLimit}}).then((res)=>{
          this.checklist=[];
          console.log(res);
          this.imagearr=res.data.rows;
          this.checkAllGroup=[];
          this.checkAll=false;
          this.indeterminate= false;

          this.checkAll_two=false;
          for(var i=0;i<this.imagearr.length;i++){
            this.checklist.push(this.imagearr[i].imageId+"?"+this.imagearr[i].imageUrl)
          }
          console.log(this.checklist);
          this.imgTotalCount = Number(res.data.total);
        })
      },

      imagedata_page(){
        this.indeterminate_two=false;
        this.checkAll_two=false;
        this.checkAllGroup_two=[];
        this.checklist_two=[];
        this.api.imageslist.find({reqData:{wgId:this.deleId,imageEdit:"Y",offset:this.page_offset,limit:this.page_limit}}).then((res)=>{
          console.log(res);
          this.imagepull=res.data.rows;
          for(var i=0;i<this.imagepull.length;i++){
            this.checklist_two.push(this.imagepull[i].imageId+"?"+this.imagepull[i].imageUrl)
          }
          this.RndNum(5);
          console.log(this.checklist_two);
          console.log(22222222222);
          this.page_totalCount = Number(res.data.total);
//        console.log(this.page_totalCount)
        })
      },
      //分页
      imgChangePage(currentPage){
        this.imgOffset = (currentPage-1)*this.limit;
        this.imgCurrent = currentPage;
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
//      删除图片
      deleimg(){
        var deler=this. checkAllGroup.concat(this.checkAllGroup_two);
        console.log(deler);
        var resdata=[];
        for (var i=0;i<deler.length;i++){
          resdata.push(deler[i].split("?")[0])
        }
        console.log(resdata);



        if(deler.length!=0){
          var listdata=resdata.join(",");
          this.api.imagedele.find({params:[listdata]}).then((res)=>{
            console.log(res);
           if(res.data.status=="200"){
             this.$Notice.success({
               title: '删除成功',
             });
           }
            this.imagedata();
            this.imagedata_page();
          })
        } else {
          this.$Notice.warning({
            title: '请选择图片',
          });
        }
      },
//      分配图片
      modalimg(){
        var deler=this. checkAllGroup.concat(this.checkAllGroup_two);
        if(deler.length!=0){
          this.animal='';
          this.modalpull=true
        }else {
          this.$Notice.warning({
            title: '请选择需要分配的图片',
          });
        }
      },
      pullok(){
        var deler=this. checkAllGroup.concat(this.checkAllGroup_two);
        var resdata=[];
        for (var i=0;i<deler.length;i++){
            resdata.push(deler[i].split("?")[0])
        }

        console.log(resdata);
        if(!this.animal){
          this.$Notice.warning({
            title: '请选择需要分组',
          });
        }else {
          var listdata=resdata.join(",");
          this.api.imagepull.find({reqData:{imageId:listdata,wgId:this.animal}}).then((res)=>{
            console.log(res);
            if(res.data.info=="修改成功"){
              this.imagedata();
              this.imagedata_page();
              this.$Notice.success({
                title: '分配成功',
              });
            }
          })
        }


      },
      //图片编辑
      imgeditor(){
//      this.borderstyle="";
//      this.logourl="";
//      this.borderid="";
//      if(this.chooseBase!=''){
//      	this.editor=true;
//      }else{
//      	this.$Notice.warning({
//	            title: '请选择需要编辑的图片',
//	        });
//      }
        this.borderstyle="";
        this.logourl="";
        this.borderframeUrl="";
        this.borderid="";
        var deler=this. checkAllGroup.concat(this.checkAllGroup_two);

        this.preview=deler.length;
        console.log(deler);
        if(deler.length!=0){
          this.editor=true;
          var resdata=[];
          for (var i=0;i<deler.length;i++){
            resdata.push(deler[i].split("?")[1])
          }
          console.log(resdata);
          var index = Math.floor((Math.random()*resdata.length));
          this.editorlist=resdata[index];
          console.log(this.editorlist);
        }else {
          this.$Notice.warning({
            title: '请选择需要编辑的图片',
          });
        }
      },
      editorok(){
        if(this.logourl!='' ){
          var delerlist=this. checkAllGroup.concat(this.checkAllGroup_two);
          var resdata=[];
          for (var i=0;i<delerlist.length;i++){
            resdata.push(delerlist[i].split("?")[0])
          }
          var listdata=[];
          for(var i=0;i<resdata.length;i++){
              var obj={
                logoUrl:this.logourl,
                frameId:this.borderid,
                imageId:resdata[i]
              };
              listdata.push(obj)
          }

          this.api.border_editImage.find({reqData:listdata}).then((res)=>{
            console.log(res);
            if(res.data.status=="200"){
              this.$Notice.success({
                title: '编辑成功',
              });
            }
            this.imagedata();
            this.imagedata_page();
          })
        }else {
          this.$refs.editorref.visible = true;
          this.editor = true;
          this.$Notice.warning({
            title: '请上传logo或添加边框',
          });
        }
      },

//      图片银行确认
      imageok(){
        console.log(this.imgalldata);
        var list=[];
        for(var i=0;i<this.imgalldata.length;i++){
          var sezi={
            imageUrl:this.imgalldata[i],
            wgId:this.deleId,
            imageSize:''
          };
          list.push(sezi)
        }
//        var list=this.ploadlist.join(",");
//        var seze= this.ploadsize.join(",");
        if(!list.length=="0"){
          this.api.imgsaveImage.find({reqData:list}).then((res)=>{
            console.log(res);
            if(res.data.status=="200"){
              this.imagedata();
              this.imagedata_page();
              this.$Notice.success({
                title: '添加成功',
              });
              this.loadData()
            }
          })
        }

      },
//      上传功能方法
      handleSuccess(res,file){
        console.log(res);
        console.log(file);
        if(res.status=="200"){
          this.ploadlist.push(res.rows[1]);
          this.ploadsize.push(res.rows[0]);
        }else {
          this.$Notice.success({
            title: res.info,
            desc:"错误代码"+res.MDC
          });
        }
      },
      handleUpload(file){
        console.log(file);
      },
      handerror(error,file){
        this.$Notice.success({
          title: file.name+'上传失败',
        });
      },
      handleMaxSize(file){
        this.$Notice.warning({
          title:file.name+"超过3M",
        });
      },

      imgremove(file, fileList){
          console.log(file);
          console.log(fileList);
          console.log("删除");
      },

      localimage(){
        this.imgupload=true;
        this.ploadlist=[];
        this.ploadsize=[];
        this.$refs.upload.clearFiles();
      } ,

//      确定上传
      ploadok(){
         var list=[];
         for(var i=0;i<this.ploadlist.length;i++){
             var sezi={
               imageUrl:this.ploadlist[i],
               wgId:this.deleId,
               imageSize:this.ploadsize[i]
             };
             list.push(sezi)
         }
//        var list=this.ploadlist.join(",");
//        var seze= this.ploadsize.join(",");
        if(!list.length=="0"){
          this.api.imgsaveImage.find({reqData:list}).then((res)=>{
            console.log(res);
            if(res.data.info=="添加成功"){
//            this.ploadlist=[];
//            this.ploadsize=[];
//            this.$refs.upload.clearFiles();
              this.imagedata();
              this.imagedata_page();
              this.$Notice.success({
                title: '添加成功',
              });
              this.loadData()
            }
          })
        }else {
          this.$Notice.info({
            title: '请添加图片',
          });
        }
      },
      
      //模板
      loadTemplates(){
      	this.templateLoading=true
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
            this.templateLoading=false
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
//    importTempModal(){
//      this.proCategory=this.categoryIdArr.join(',')
//      console.log(this.proCategory)
//      console.log(this.categoryId)
//      if(this.keywords3){
//        this.loading2=true;
//        this.api.getOnlineTemplate.add({
//          reqData:{
//            proCategory:this.proCategory,
//            categoryId:this.categoryId,
//            wordGroupId:this.wgId,
//            url:this.keywords3
//          }
//        }).then((res) => {
//          this.loading2=false;
//          this.tempModal = false;
//          if(res) {
//            this.$Notice.success({
//              title: '提示',
//              desc: res.data.info
//            });
//            this.$router.push({name:'single',params:{temId:res.data.rows[0] }})
//          }
//        })
//      }else{
//        this.$Notice.warning({
//          title: '提示',
//          desc: '请输入模版地址'
//        });
//      }
//
//    },
      addTemplate(){
        this.$router.push({name:'chooseCategory',params:{wordGroupId:this.wgId,page:'material' }})
      },
      formatTime(time){
        if(!time){
          return '-'
        }else{
          return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
        }
      },
      
      
      
      //          词库表加载分组列表
      thesaurus_init(){
        this.keyGroupLoading =true;
        this.api.group_Lexicon.find().then((res)=>{
          console.log(res);
          this.groulist=res.data.rows;
          this.keyGroupLoading =false;
        })
      },
      
      //          词库表删除所需方法
      change(selection){//input框改变时触发事件
          console.log(selection);
          var list=[];
          this.keywordList=selection
          for(var i=0;i<selection.length;i++){
            list.push(selection[i].kwId)
          }
        this.thesaurus_list=list.join(",");
          console.log(this.thesaurus_list);
      },
      shoulistSort(column){
      	let kwSearchHot = '';
        let kwToPromote = '';
//      let kwCover = '';
        let kwCover = this.keywordIsCover;
        let kwNaturalRanking = '';
       
      	this.api.chooseKeyword.list({
          reqData:{
            wgId:this.wgId,
            kwKeywords:this.keywords,
            kwSearchHot:kwSearchHot,
            kwToPromote:kwToPromote,
            kwCover:kwCover,
            kwNaturalRanking:kwNaturalRanking,
            offset:this.keywordOffset2,
            limit:this.keywordLimit2,
            order:column.order,
            sort:this.util.changeStr(column.key)
          }
        }).then((res) => {
          if(res){
            this.keywordTableData2 = res.data.rows;
            this.keywordTotalCount2 = res.data.total;
            console.log(res)
          }
        })
      },
      thesaurus_dele(){//删除词库表
        this.api.group_delMyKeywords.find({reqData:{keywordsIds:this.thesaurus_list}}).then((res)=>{
          console.log(res);
          this.thesaurus=false;
          this.chooseKeyword();
          this.$Notice.success({
            title: '删除成功',
          });
          this.thesaurus_list=[]
        });
      },
      thesaurus_show(){
	      if(this.thesaurus_list.length>0){
	      	var flag=true
	      	console.log(this.keywordList[0])
	      	for(var i=0; i<this.keywordList.length; i++){
	      		if(this.keywordList[i].kwCover==1){
	      			flag=false
	      		}
	      	}
	        if(flag){
	        	this.thesaurus=true;
	        }else{
	        	this.$Notice.warning({
		          title: '已使用关键词不能删除',
		        });
	        }
	      }else {
	        this.$Notice.info({
	          title: '请勾选需要删除的选项',
	        });
	      }
      },
//          词库表分配所需方法
      distribution_show(){
        this.keyAnimal='';
//            this.radiaoval='';
        if(this.thesaurus_list.length>0){
          this.distribution=true;
          this.thesaurus_init();
        }else {
          this.$Notice.info({
            title: '请勾选需要分配的选项',
          });
        }
      },
//          randiochange(val){
//              this.radiaoval=val;
//              console.log(this.animal);
//          },
      distribution_ok(){
          if(!this.keyAnimal){
            this.$Notice.info({
              title: '请选择分组',
            });
            this.$refs.distribution.visible = true;
            this.distribution=true
          }else {
            this.api.group_assignKeywords.find({reqData:{keywordsIds:this.thesaurus_list,wgId:this.keyAnimal,}}).then((res)=>{
              console.log(res);
              if(this.offset>0){
                this.offset=this.offset-this.limit;
              }
              if(res.info=='分配成功'){
              	this.$Notice.success({
	                title: '分配成功',
	            });
              }
              this.thesaurus_list=[];
              this.chooseKeyword();
            });
          }
      },
		
	
	},

//	methods: {
//		
//	      
//		deleioc(i,val){//删除新增input
//          if(val.length<2){
//            this.$Notice.info({
//              title: '最少包含一个条件',
//            });
//          }else {
//            val.splice(i,1)
//          }
//
//      },
//		imgLoad(){
//			this.cropW=this.$refs.cropper.cropW
//			this.cropH=this.$refs.cropper.cropH
//		},
//		//本地图片上传
//		localUploadImg (e) {
//			
//			//上传图片
//			// this.option.img
//			var file = e.target.files[0]
//			if(file.size>5120){
//				this.$Notice.warning({
//					title: "上传图片超过5M",
//				});
//				return false
//			}
//			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
//				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
//				 return false
//			}
//			var reader = new FileReader(); 
//		    reader.readAsDataURL(file); 
//		    reader.onload=(e)=>{ 
//		    	var data
//		    	if (typeof e.target.result === 'object') {
//					// 把Array Buffer转化为blob 如果是base64不需要
//					data = window.URL.createObjectURL(new Blob([e.target.result]))
//				} else {
//					data = e.target.result
//				}
//		        this.option.img = data; 
//				this.imgupEdit=true
//		    } 
//		},
//		handleCheckAll() {
//			var arr = [];
//			for (let i in this.categories) {
//				arr.push(this.categories[i].cateCode)
//			}
//			if (this.indeterminate) {
//				this.checkAll = false;
//			} else {
//				this.checkAll = !this.checkAll;
//			}
//			this.indeterminate = false;
//
//			if (this.checkAll) {
//				this.category = arr;
//				console.log(this.category)
//			} else {
//				this.category = [];
//			}
//		}, checkAllGroupChange(data) {
//			if (data.length === this.categories.length) {
//				this.indeterminate = false;
//				this.checkAll = true;
//			} else if (data.length > 0) {
//				this.indeterminate = true;
//				this.checkAll = false;
//			} else {
//				this.indeterminate = false;
//				this.checkAll = false;
//			}
//		}, formatTime(time) {
//			if (!time) {
//				return '-'
//			} else {
//				return this.util.formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
//			}
//		}, loadList() {
//			this.loading = true;
//			this.formCustom.keyValue = this.formCustom.keyValue.trim();
//			let url = this.formCustom.keyValue;
//			if (this.formCustom.keyValue && this.formCustom.keyValue.substr(0, 8).toLowerCase() !== "https://") {
//				url = 'https://' + url
//			}
//			this.formCustom.keyValue = url;
//			this.api.perrList.list({
//				reqData: {
//					wcqLink: this.formCustom.keyValue,
//					wcqCategrates: this.category.join(','),
//					offset: this.offset,
//					limit: this.limit,
//					sort: this.sortType,
//					order: this.order,
//				}
//			}).then((res) => {
//				this.loading = false;
//				if (res) {
//					console.log(res)
//					this.tableData = res.data.rows;
//					this.totalCount = res.data.total;
//				}
//			})
//		},
//		//查询分类
//		searchCategory(name) {
//			this.$refs[name].validate((valid) => {
//				if (valid) {
//					this.formCustom.keyValue = this.formCustom.keyValue.trim();
//					let url = this.formCustom.keyValue;
//					if (this.formCustom.keyValue && this.formCustom.keyValue.substr(0, 8).toLowerCase() !== "https://") {
//						url = 'https://' + url
//					}
//					this.formCustom.keyValue = url;
//					this.isShowCategory = true;
//					this.api.showCategroyList.list({
//						reqData: {
//							cateUrl: this.formCustom.keyValue
//						}
//					}).then((res) => {
//						if (res) {
//							this.categories = res.data.rows;
//						}
//					})
//				}
//			})
//		},
//		//查询队列
//		searchKeyword() {
//			if (!this.category.length) {
//				this.$Notice.warning({
//					title: '提示',
//					desc: '请选择分组'
//				});
//			} else {
//
//				this.isShowCategory = false;
//				this.indeterminate = false;
//				this.checkAll = false;
//				this.loadList()
//				this.category = [];
//				this.formCustom.keyValue = ''
//
//			}
//
//
//		},
//		//选中行，返回选中行的数组
//		chooseRow(selection) {
//			let arr = []
//			for (var i = 0; i < selection.length; i++) {
//				arr.push(selection[i].wcqId)
//			}
//			this.selectedString = arr.join(',');
//			console.log(this.selectedString)
//		}, deleteRecord() {
//			if (!this.selectedString) {
//				this.$Notice.warning({
//					title: '提示',
//					desc: '请至少选中一个词'
//				});
//			} else {
//				this.api.perrListDel.del({
//					params: [this.selectedString]
//				}).then((res) => {
//					if (res) {
//						this.$Notice.success({
//							desc: res.data.info
//						});
//						this.selectedString = '';
//						this.formCustom.keyValue = ''
//						this.loadList()
//					}
//				})
//
//			}
//		},
//		//取消选择分类
//		resetCategory() {
//			this.category = [];
//			this.isShowCategory = false;
//		}, reanalyse(row) {
//			this.api.reanalyseIndustryWords.reanalyse({
//				reqData: {
//					kwqId: this.kwqId
//				}
//			}).then((res) => {
//				if (res) {
//					this.$Notice.success({
//						desc: res.data.info
//					});
//					this.loadList()
//				}
//			})
//		},
//		//排序
//		sortChange(column) {
//			this.sortType = this.util.changeStr(column.key);
//			console.log(this.sortType);
//			this.order = column.order;
//			this.offset = 0;
//			this.current = 1;
//			this.formCustom.keyValue = ''
//			this.$nextTick(function() {
//				this.loadList()
//			})
//		}, changePage(currentPage) {
//			this.offset = (currentPage - 1) * this.limit;
//			this.current = currentPage;
//			this.formCustom.keyValue = ''
//			this.loadList()
//		}, changePageSize(pageSize) {
//			this.limit = pageSize;
//			this.formCustom.keyValue = ''
//			this.loadList()
//		},
//
//
//		///////////////////////
//
//
//
//		RndNum(n) {
//			var rnd = "";
//			for (var i = 0; i < n; i++) {
//				rnd += Math.floor(Math.random() * 10);
//				this.numid = rnd;
//			}
//			console.log(this.numid)
//		},
//		//        假分页
//		pagination(pageNo, pageSize, array) {
//			var offset = (pageNo - 1) * pageSize;
//			return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
//		},
//
//		//        logo上传
//		logoUpload(file) {
//			console.log(file);
//		}, logoSuccess(res, file) {
//			if (res.status == "200") {
//				this.logourl = res.rows[1];
//				this.$Notice.success({
//					title: "上传成功",
//				});
//			} else {
//				this.$Notice.error({
//					title: res.info,
//					desc: "错误代码" + res.MDC
//				});
//			}
//		}, logoerror() {
//			this.$Notice.error({
//				title: "上传失败",
//			});
//		}, handleMaxSize() {
//			this.$Notice.warning({
//				title: "上传图片超过5M",
//			});
//		},
//
//		//      图片银行全选
//		imgbankCheckAll() {
//			if (this.imgbankminate) {
//				this.imgbankkAll = false;
//			} else {
//				this.imgbankkAll = !this.imgbankkAll;
//			}
//			this.imgbankminate = false;
//			if (this.imgbankkAll) {
//				this.imgalldata = this.imagechebox;
//				console.log(this.imgalldata)
//			} else {
//				this.imgalldata = [];
//				console.log(this.imgalldata)
//			}
//		}, imageGroupChange(data) {
//			this.imgalldata = data;
//			console.log(this.imgalldata);
//			if (data.length === this.imagechebox.length) {
//				this.imgbankminate = false;
//				this.imgbankkAll = true;
//			} else if (data.length > 0) {
//				this.imgbankminate = true;
//				this.imgbankkAll = false;
//			} else {
//				this.imgbankminate = false;
//				this.imgbankkAll = false;
//			}
//		},
//
//		//      全选功能实现方法
//		handleCheckAll() {
//			if (this.indeterminate) {
//				this.checkAll = false;
//			} else {
//				this.checkAll = !this.checkAll;
//			}
//			this.indeterminate = false;
//			if (this.checkAll) {
//				this.checkAllGroup = this.checklist;
//			} else {
//				this.checkAllGroup = [];
//			}
//		}, checkAllGroupChange(data) {
//			this.checkAllGroup = data;
//			console.log(this.checkAllGroup);
//			if (data.length === this.checklist.length) {
//				this.indeterminate = false;
//				this.checkAll = true;
//			} else if (data.length > 0) {
//				this.indeterminate = true;
//				this.checkAll = false;
//			} else {
//				this.indeterminate = false;
//				this.checkAll = false;
//			}
//		},
//
//
//
//		handleCheckAll_two() {
//			console.log(this.indeterminate_two);
//			if (this.indeterminate_two) {
//				this.checkAll_two = false;
//			} else {
//				this.checkAll_two = !this.checkAll_two;
//			}
//			this.indeterminate_two = false;
//			if (this.checkAll_two) {
//				this.checkAllGroup_two = this.checklist_two;
//			} else {
//				this.checkAllGroup_two = [];
//			}
//		}, checkAllGroupChange_two(data) {
//			this.checkAllGroup_two = data;
//			if (data.length === this.checklist_two.length) {
//				this.indeterminate_two = false;
//				this.checkAll_two = true;
//			} else if (data.length > 0) {
//				this.indeterminate_two = true;
//				this.checkAll_two = false;
//			} else {
//				this.indeterminate_two = false;
//				this.checkAll_two = false;
//			}
//
//		},
//
//		//      查看图片银行分组
//		imgfenzu() {
//			this.imgalldata = [];
//			this.imgbankminate = false;
//			this.imgbankkAll = false
//			this.imgbank = true;
//			this.api.imgBreath.find().then((res) => {
//				console.log(res);
//				this.modeldata = res.data.rows;
//				this.imageId = this.modeldata[this.addimg].photoAlbumGroup.id;
//				this.imagetext = "SUB_GROUP";
//				this.imginit();
//			})
//		},
//		//切换class
//		imageclass(index) {
//			if (this.showadd == index) {
//				this.showadd = -1;
//				this.showadd2 = -1
//			} else {
//				this.showadd = index;
//			}
//			this.addimg = index;
//			this.addcolor = "x";
//			this.addcolor2 = "x";
//			this.imagelast = false;
//			this.imageId = this.modeldata[this.addimg].photoAlbumGroup.id;
//			this.imagetotalCount = 0;
//			this.imagecurrent = 1;
//			this.imagelimit = 16;
//			this.imageoffset = 0;
//			this.imagetext = "SUB_GROUP";
//			this.imginit();
//		},
//
//		imageclass2(index, id) {
//			if (this.showadd2 == index) {
//				this.showadd2 = -1
//			} else {
//				this.showadd2 = index;
//			}
//			this.imageId = id;
//			this.addimg = "x";
//			this.addcolor2 = "x";
//			this.imagelast = false;
//			this.addcolor = index;
//
//			this.imagetotalCount = 0;
//			this.imagecurrent = 1;
//			this.imagelimit = 16;
//			this.imageoffset = 0;
//			this.imagetext = "SUB_GROUP";
//			this.imginit();
//		},
//
//		imageclass3(index, id) {
//			this.addimg = "x";
//			this.addcolor = "x";
//			this.imagelast = false;
//			this.addcolor2 = index;
//			this.imageId = id;
//			this.imagetotalCount = 0;
//			this.imagecurrent = 1;
//			this.imagelimit = 16;
//			this.imageoffset = 0;
//			this.imagetext = "SUB_GROUP";
//
//			this.imginit();
//		},
//
//		imageclass4() {
//			this.imagelast = true;
//			if (this.imagelast) {
//				this.addimg = "x";
//				this.addcolor = "x";
//				this.addcolor2 = "x";
//				this.showadd = -1;
//				this.showadd2 = -1
//			}
//			this.imagetotalCount = 0;
//			this.imagecurrent = 1;
//			this.imagelimit = 16;
//			this.imageoffset = 0;
//			this.imagetext = "UNGROUP";
//			this.imginit();
//		},
//		//      查看图片银行分组图片
//		imginit() {
//			this.imgLoading = true;
//			this.imgbankminate = false;
//			this.imgbankkAll = false;
//			this.imgalldata = [];
//			this.imagechebox = [];
//			this.blankdata = [];
//			if (this.imagetext == "UNGROUP") {
//				this.imageId = "";
//			}
//			this.api.imgPicture.data({
//				reqData: {
//					groupId: this.imageId,
//					packetTypes: this.imagetext,
//					page: this.imagecurrent,
//					limit: this.imagelimit
//				}
//			}).then((res) => {
//				this.imgLoading = false;
//				console.log(res);
//				if (res.data.status == 200) {
//					this.blankdata = res.data.rows;
//					for (var i = 0; i < this.blankdata.length; i++) {
//						this.imagechebox.push(this.blankdata[i])
//					}
//					console.log(this.imagechebox);
//					this.imagetotalCount = res.data.total;
//
//				}
//
//			})
//		}, imginit2() {
//			this.imgbankminate = false;
//			this.imgbankkAll = false;
//			this.imgalldata = [];
//			this.imagechebox = [];
//			this.api.imgPicture.del({
//				params: [this.imageId, "UNGROUP"]
//			}).then((res) => {
//				console.log(res);
//				if (res.data.status == 200) {
//					this.imagelist = res.data.rows;
//					if (!this.imagelist) {
//						this.imagelist = [];
//						this.blankdata = [];
//					} else {
//						this.blankdata = this.pagination(this.imagecurrent, this.imagelimit, this.imagelist);
//						for (var i = 0; i < this.blankdata.length; i++) {
//							this.imagechebox.push(this.blankdata[i])
//						}
//						console.log(this.imagechebox);
//						this.imagetotalCount = Number(this.imagelist.length);
//					}
//				} else {
//					this.blankdata = [];
//				}
//			})
//		},
//		//查看分组接口
//		init() {
//			this.api.group_Lexicon.find().then((res) => {
//				console.log(res);
//				this.styledata = res.data.rows;
//				this.deleId = this.styledata[this.addstyle].wgId;
//				this.imagedata();
//				this.imagedata_page();
//			})
//		},
//		//切换class
//		addclass(index) {
//			this.addstyle = index;
//			this.deleId = this.styledata[this.addstyle].wgId;
//			this.offset = 0;
//			this.page_offset = 0;
//			this.imagedata();
//			this.imagedata_page();
//		},
//		//查看上传图片列表
//		imagedata() {
//			this.api.imageslist.find({
//				reqData: {
//					wgId: this.deleId,
//					imageEdit: "N",
//					offset: this.offset,
//					limit: this.limit
//				}
//			}).then((res) => {
//				this.checklist = [];
//				console.log(res);
//				this.imagearr = res.data.rows;
//				this.checkAllGroup = [];
//				this.checkAll = false;
//				this.indeterminate = false;
//
//				this.checkAll_two = false;
//				for (var i = 0; i < this.imagearr.length; i++) {
//					this.checklist.push(this.imagearr[i].imageId + "?" + this.imagearr[i].imageUrl)
//				}
//				console.log(this.checklist);
//				this.totalCount = Number(res.data.total);
//			})
//		},
//
//		imagedata_page() {
//			this.indeterminate_two = false;
//			this.checkAll_two = false;
//			this.checkAllGroup_two = [];
//			this.checklist_two = [];
//			this.api.imageslist.find({
//				reqData: {
//					wgId: this.deleId,
//					imageEdit: "Y",
//					offset: this.page_offset,
//					limit: this.page_limit
//				}
//			}).then((res) => {
//				console.log(res);
//				this.imagepull = res.data.rows;
//				for (var i = 0; i < this.imagepull.length; i++) {
//					this.checklist_two.push(this.imagepull[i].imageId + "?" + this.imagepull[i].imageUrl)
//				}
//				this.RndNum(5);
//				console.log(this.checklist_two);
//				console.log(22222222222);
//				this.page_totalCount = Number(res.data.total);
//			})
//		},
//		//分页
//		changePage(currentPage) {
//			this.offset = (currentPage - 1) * this.limit;
//			this.current = currentPage;
//		}, imagechangePage(currentPage) {
//			this.imageoffset = (currentPage - 1) * this.imagelimit;
//			this.imagecurrent = currentPage;
//			this.imginit();
//		}, changePage_2(currentPage) {
//			this.page_offset = (currentPage - 1) * this.limit;
//			this.page_current = currentPage;
//		}, borderchangePage(currentPage) {
//			this.borderoffset = (currentPage - 1) * this.borderlimit;
//			this.bordercurrent = currentPage;
//		},
//		//      删除图片
//		deleimg() {
//			var deler = this.checkAllGroup.concat(this.checkAllGroup_two);
//			console.log(deler);
//			var resdata = [];
//			for (var i = 0; i < deler.length; i++) {
//				resdata.push(deler[i].split("?")[0])
//			}
//			console.log(resdata);
//
//
//
//			if (deler.length != 0) {
//				var listdata = resdata.join(",");
//				this.api.imagedele.find({
//					params: [listdata]
//				}).then((res) => {
//					console.log(res);
//					if (res.data.status == "200") {
//						this.$Notice.success({
//							title: '删除成功',
//						});
//					}
//					this.imagedata();
//					this.imagedata_page();
//				})
//			} else {
//				this.$Notice.warning({
//					title: '请选择图片',
//				});
//			}
//		},
//		//      分配图片
//		modalimg() {
//			var deler = this.checkAllGroup.concat(this.checkAllGroup_two);
//			if (deler.length != 0) {
//				this.animal = '';
//				this.modalpull = true
//			} else {
//				this.$Notice.warning({
//					title: '请选择需要分配的图片',
//				});
//			}
//		}, pullok() {
//			var deler = this.checkAllGroup.concat(this.checkAllGroup_two);
//			var resdata = [];
//			for (var i = 0; i < deler.length; i++) {
//				resdata.push(deler[i].split("?")[0])
//			}
//
//			console.log(resdata);
//			if (!this.animal) {
//				this.$Notice.warning({
//					title: '请选择需要分组',
//				});
//			} else {
//				var listdata = resdata.join(",");
//				this.api.imagepull.find({
//					reqData: {
//						imageId: listdata,
//						wgId: this.animal
//					}
//				}).then((res) => {
//					console.log(res);
//					if (res.data.info == "修改成功") {
//						this.imagedata();
//						this.imagedata_page();
//						this.$Notice.success({
//							title: '分配成功',
//						});
//					}
//				})
//			}
//
//
//		},
//		//图片编辑
//		imgeditor() {
//			this.borderstyle = "";
//			this.logourl = "";
//			this.borderframeUrl = "";
//			this.borderid = "";
//			var deler = this.checkAllGroup.concat(this.checkAllGroup_two);
//
//			this.preview = deler.length;
//			console.log(deler);
//			if (deler.length != 0) {
//				this.editor = true;
//				this.borderinit();
//				var resdata = [];
//				for (var i = 0; i < deler.length; i++) {
//					resdata.push(deler[i].split("?")[1])
//				}
//				console.log(resdata);
//				var index = Math.floor((Math.random() * resdata.length));
//				this.editorlist = resdata[index];
//				console.log(this.editorlist);
//			} else {
//				this.$Notice.warning({
//					title: '请选择需要编辑的图片',
//				});
//			}
//		}, editorok() {
//			if (this.logourl != '' || this.borderframeUrl != '') {
//				var delerlist = this.checkAllGroup.concat(this.checkAllGroup_two);
//				var resdata = [];
//				for (var i = 0; i < delerlist.length; i++) {
//					resdata.push(delerlist[i].split("?")[0])
//				}
//				var listdata = [];
//				for (var i = 0; i < resdata.length; i++) {
//					var obj = {
//						logoUrl: this.logourl,
//						frameId: this.borderid,
//						imageId: resdata[i]
//					};
//					listdata.push(obj)
//				}
//
//				this.api.border_editImage.find({
//					reqData: listdata
//				}).then((res) => {
//					console.log(res);
//					if (res.data.status == "200") {
//						this.$Notice.success({
//							title: '编辑成功',
//						});
//					}
//					this.imagedata();
//					this.imagedata_page();
//				})
//			} else {
//				this.$refs.editorref.visible = true;
//				this.editor = true;
//				this.$Notice.warning({
//					title: '请上传logo或添加边框',
//				});
//			}
//		},
//
//		//      图片银行确认
//		imageok() {
//			console.log(this.imgalldata);
//			var list = [];
//			for (var i = 0; i < this.imgalldata.length; i++) {
//				var sezi = {
//					imageUrl: this.imgalldata[i],
//					wgId: this.deleId,
//					imageSize: ''
//				};
//				list.push(sezi)
//			}
//			//        var list=this.ploadlist.join(",");
//			//        var seze= this.ploadsize.join(",");
//			if (!list.length == "0") {
//				this.api.imgsaveImage.find({
//					reqData: list
//				}).then((res) => {
//					console.log(res);
//					if (res.data.status == "200") {
//						this.imagedata();
//						this.imagedata_page();
//						this.$Notice.success({
//							title: '添加成功',
//						});
//					}
//				})
//			}
//
//		},
//		//      上传功能方法
//		handleSuccess(res, file) {
//			console.log(res);
//			console.log(file);
//			if (res.status == "200") {
//				this.ploadlist.push(res.rows[1]);
//				this.ploadsize.push(res.rows[0]);
//			} else {
//				this.$Notice.success({
//					title: res.info,
//					desc: "错误代码" + res.MDC
//				});
//			}
//		}, handleUpload(file) {
//			console.log(file);
//		}, handerror(error, file) {
//			this.$Notice.success({
//				title: file.name + '上传失败',
//			});
//		}, handleMaxSize(file) {
//			this.$Notice.warning({
//				title: file.name + "超过5M",
//			});
//		},
//
//		imgremove(file, fileList) {
//			console.log(file);
//			console.log(fileList);
//			console.log("删除");
//		},
//
//		localimage() {
//			this.imgupload = true;
//			this.ploadlist = [];
//			this.ploadsize = [];
//			//this.$refs.upload.clearFiles();
//		},
//
//		//关键采集
//		newfile() { //新建分组
//			this.modal1 = true;
//			this.htmlname = '';
//			this.htmldata = [""];
//		},
//
//		modelok() { //新建分组模态框，点击确定按钮事件
//			this.arrnull(this.htmldata, this.htmlname); //判断数据中是否有空
//			var list = [];
//			//todo 请求参数格式方法可以优化
//			for (var i = 0; i < this.htmldata.length; i++) {
//				var arrobj = {
//					wgrName: this.htmldata[i],
//					wgrIscontain: this.seledata1[i],
//				};
//				list.push(arrobj);
//			}
//			console.log(list);
//			if (this.state == 1) {
//				this.api.group_Lexicon4.find({
//					reqData: {
//						wgName: this.htmlname,
//						operatorLogic: this.seledata,
//						wordGroupRules: list
//					}
//				}).then((res) => {
//					console.log(res);
//					if (res.data.info == "添加成功") {
//						this.init();
//						this.$Notice.success({
//							title: '新增成功',
//						});
//					}
//				})
//			} else {
//				this.$refs.modal1.visible = true;
//				this.modal1 = true;
//				this.$Notice.warning({
//					title: '分组名或条件值不能为空',
//				});
//				this.state = 1
//
//			}
//
//		}, addhtml(list, sele) { //添加input框方法
//			list.push("");
//			sele.push("Y");
//			console.log(11)
//		}, pullshow() { //编辑分组模态框
//			if (this.styledata.length > 0 && this.styledata[this.addstyle].wgIsdefault != "Y") {
//				this.modal2 = true;
//			} else {
//				this.$Notice.warning({
//					title: '没有分组或默认分组不可编辑',
//				});
//			}
//
//			this.seledata2 = [], this.input2 = [], console.log(this.deleId);
//			this.pulldata = this.styledata[this.addstyle];
//			this.pullname = this.pulldata.wgName;
//			this.pullmodel = this.pulldata.wordGroupRules;
//			this.operatorLogic = this.pullmodel[0].wgrOperatorLogic;
//
//			console.log(this.operatorLogic);
//
//
//			//todo select 和 input 绑定可以优化一下
//			for (var i = 0; i < this.pullmodel.length; i++) {
//				this.seledata2[i] = this.pullmodel[i].wgrIscontain;
//				this.input2[i] = this.pullmodel[i].wgrName;
//			}
//		},
//		//  新建产品类型
//
//		chooseCategoryA() {
//			this.chooseCategory = true;
//
//		},
//
//
//
//		clickTab(name) {
//			this.currentTabName = name
//		}, toSingle() {
//			if (this.currentTabName === 'tab1') {
//				this.proCategory = this.categoryIdArr.join(',');
//			}
//			this.$router.push({
//				name: 'single',
//				params: {
//					categoryId: this.categoryId,
//					proCategory: this.proCategory,
//					wordGroupId: this.$route.params.wordGroupId
//				}
//			})
//		}, loadCategory(type) {
//			this.api.findCategory.find({
//				params: [this.categoryId]
//			}).then((res) => {
//				if (res) {
//					if (type === 1) {
//						this.categories = res.data.rows;
//					} else if (type === 2) {
//						this.categories2 = res.data.rows;
//					} else if (type === 3) {
//						this.categories3 = res.data.rows;
//					} else if (type === 4) {
//						this.categories4 = res.data.rows;
//					} else if (type === 5) {
//						this.categories5 = res.data.rows;
//					}
//				}
//			})
//		}, loadUsedCategroy() {
//			this.api.findUsedCategorys.list().then((res) => {
//				if (res) {
//					let arr = res.data.rows[0];
//					let arr2 = [];
//					if (arr.length) {
//						for (let i = 0; i < arr.length; i++) {
//							arr2.push({
//								"categoryNames": arr[i].categoryNames.replace(/,/g, " >> "),
//								"categoryIds": arr[i].categoryIds,
//								"cnNames": arr[i].cnNames.replace(/,/g, " >> ")
//							})
//						}
//					}
//					console.log(arr2)
//					this.usedCategroy = arr2;
//				}
//			})
//		}, showChildren(categoryId, leafCategory, index) {
//			this.current = index;
//			this.categoryId = categoryId;
//			this.categoryIdArr[0] = categoryId;
//
//			this.current2 = '';
//			this.current3 = '';
//			this.current4 = '';
//			this.current5 = '';
//			this.categories2 = [];
//			this.categories3 = [];
//			this.categories4 = [];
//			this.categories5 = [];
//			if (leafCategory === '1') {
//				this.disabled = false;
//			} else {
//				this.disabled = true;
//				this.$nextTick(function() {
//					this.loadCategory(2);
//				})
//			}
//
//		}, showChildren2(categoryId, leafCategory, index) {
//			this.current2 = index;
//			this.categoryId = categoryId;
//			this.categoryIdArr[1] = categoryId;
//			this.current3 = '';
//			this.current4 = '';
//			this.current5 = '';
//			this.categories3 = [];
//			this.categories4 = [];
//			this.categories5 = [];
//			if (leafCategory === '1') {
//				this.disabled = false;
//			} else {
//				this.disabled = true;
//				this.$nextTick(function() {
//					this.loadCategory(3);
//				})
//			}
//		}, showChildren3(categoryId, leafCategory, index) {
//			this.current3 = index;
//			this.categoryId = categoryId;
//			this.categoryIdArr[2] = categoryId;
//			this.current4 = '';
//			this.current5 = '';
//			this.categories4 = [];
//			this.categories5 = [];
//			if (leafCategory === '1') {
//				this.disabled = false;
//			} else {
//				this.disabled = true;
//				this.$nextTick(function() {
//					this.loadCategory(4);
//
//				})
//			}
//		}, showChildren4(categoryId, leafCategory, index) {
//			this.current4 = index;
//			this.categoryId = categoryId;
//			this.categoryIdArr[3] = categoryId;
//			this.current5 = '';
//			this.categories5 = [];
//			if (leafCategory === '1') {
//				this.disabled = false;
//			} else {
//				this.disabled = true;
//				this.$nextTick(function() {
//					this.loadCategory(5)
//				})
//			}
//		}, showChildren5(categoryId, leafCategory, index) {
//			this.current5 = index;
//			this.categoryId = categoryId;
//			this.categoryIdArr[4] = categoryId;
//			if (leafCategory === '1') {
//				this.disabled = false;
//			} else {
//				this.disabled = true;
//			}
//		}, chooseUsedCategroy(index, categoryIds) {
//			this.curUsedIndex = index;
//			this.disabled = false;
//			let arr = categoryIds.split(',')
//			this.categoryId = arr[arr.length - 1];
//			this.proCategory = categoryIds;
//
//		},
//
//
//
//
//		//关键词采集
//
//
//		//
//		//      确定上传
//		ploadok() {
//			var list = [];
//			for (var i = 0; i < this.ploadlist.length; i++) {
//				var sezi = {
//					imageUrl: this.ploadlist[i],
//					wgId: this.deleId,
//					imageSize: this.ploadsize[i]
//				};
//				list.push(sezi)
//			}
//			//        var list=this.ploadlist.join(",");
//			//        var seze= this.ploadsize.join(",");
//			if (!list.length == "0") {
//				this.api.imgsaveImage.find({
//					reqData: list
//				}).then((res) => {
//					console.log(res);
//					if (res.data.info == "添加成功") {
//						//            this.ploadlist=[];
//						//            this.ploadsize=[];
//						//            this.$refs.upload.clearFiles();
//						this.imagedata();
//						this.imagedata_page();
//						this.$Notice.success({
//							title: '添加成功',
//						});
//					}
//				})
//			} else {
//				this.$Notice.info({
//					title: '请添加图片',
//				});
//			}
//		},
//	},
	watch: {
		titleKeyList: {
	      handler: function (val, oldVal) {
	      	this.titleKeyListExample=[]
	      	for(var i=this.titleKeyList.length-1;i>=0;i--){
				this.titleKeyListExample.push(this.titleKeyList[i])
	      	}
	      },
	      deep: true
	    },
	    imgOffset(){
	        this.imagedata();
	      },
	      page_offset(){
	        this.imagedata_page();
	    },
	    titleGenerateEditorModal(){
	    	if(this.titleGenerateEditorModal==false){
	    		this.titleKeyList=[{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''}]
				this.titleKeyListExample=[{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''},{attribute:'',attributeValue:''}]
	    	}
	    }
	}
};
    
    
    
</script>
<style scoped>
.width_180{
	width: 180px;
}
.width_200{
    width: 200px;
}
.div_div_span_011{
	padding-left:30px ;
}

.div_in_div_01 {
	overflow: auto;
}
	
.div_in_div_01 input{
	margin:0  10px 15px 10px;
	width: 180px;
	height: 25px;
	text-align: center;
	border: 1px solid #dddee1;
	color: #dddee1;
}	
#div_in_bu_01{
	width: 60px;
	height: 25px;
	text-align: center;
	
}

#div_in_che_01{
	width: 25px;
	height: 25px;
    text-align: center;
	border: 1px solid #dddee1;
	color: #bbb;
	line-height: 25px;
	margin:0  10px 15px 10px;
} 
/*   */
.div_in_div_02 input{
	margin: 0  10px 15px 10px;
	width: 140px;
	height: 25px;
	text-align: center;
}
#div_in_bu_02{
	width: 60px;
	height: 25px;
	text-align: center;
}

#div_in_che_02{
	width: 25px;
	height: 25px;
   text-align: center;
} 
/*   */
	/*  关键字选择条件*/
 .demo-split{
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
    
    
	/* 图片已经上传  */
/*.tabPane_span_che span{position: absolute;left: 750px;top:-40px;}*/

 
#div_form_pag  .div_form_but{
	align-content: center;
}

.div_form_but{
	font-size: 16px;
}

 .width_400{
    width: 130px;
    height: 22px;
   
  }
 
  
  .width_400_g{
  	width: 170px;
    height: 25px;
    margin-left: 10px;
  	
  }
  .fr{
    float: right;
   
  }
  .center{
    text-align: center;
  }
  .choose-category{
    position: absolute;
    left: 470px;
    top: -8px;
    z-index: 999;
    padding: 20px 25px;
    background: #FFFFFF;
    border: 1px solid #d0d9e4;
    box-shadow: 0 0 10px #dde3e8;
    min-width: 300px;

  }
  .choose-category .tit{
    color: #444444;
    font-size: 16px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d0d9e4;
    display: block;
    margin-bottom: 10px;
    text-align: left;
    
  }
  .triangle{
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    left: -18px;
    top: 17px;
    z-index: 9999999;
    border-right: 18px solid #DDDDDD;
  }
  .triangle2{
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    left: -16px;
    top: 17px;
    z-index: 9999999;
    border-right: 18px solid #FFFFFF;
  }
  .choose-category .ivu-checkbox-wrapper{
    font-size: 17px;
    display: block;
    margin-bottom: 10px;
    font-weight: 100;
  }
 .choose-category .ivu-checkbox-group{
   padding:10px 0;
   max-height: 360px;
   overflow: auto;
 }
  .choose-category .ivu-checkbox-group::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .choose-category .ivu-checkbox-group::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .choose-category .ivu-checkbox-group::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }


  .lh_33{
    line-height: 33px;
  }

   /* 图片 */
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
  
   /* 图片 */
  .img-float_01{
  	display: inline-block;
  	margin-left:450px ;
  }
  #page_img_pa01{
  	margin-right: 200px;
  	
  }
  Checkbox{
  	background-color:#AAD5C0;
}
  /*  图片*/

.uplogo{
    position: relative;
  }
  .uplogo>img{
    position: absolute;
    top: 0;
    left:0;
    max-width: 100%;
    z-index: 100;
  }
  .uplogo>span{
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    z-index: 10;
    text-align: center;
  }
  .borderlist .bordercolor{
    border-color: #00a1ff;
  }
  .borderlist{
    height: calc(100% - 80px);

  }
  .borderlist>ul{
    /*display: flex;*/
    /*height:100%;*/
    /*flex-direction:row;*/
    /*justify-content: space-between;*/
    /*flex-wrap:wrap;*/
    display: block;
    height:100%;
    overflow: hidden;
  }
  .borderlist>ul>li{
    float: left;
    border:1px solid #DDDDDD;
    width:24%;
    margin-right:1%;
    height:24%;
    margin-bottom: 1%;
  }
  .borderlist>ul>li:first-child{
    border:1px solid red;
  }
  .uploadborder{
    height: 80px;
  }
  .img-number{
    padding-top:10px;
  }
  .img-show{
    border: 1px solid #DDDDDD;
    width: 320px;
    height: 320px;
    overflow: hidden;
    position: relative;
  }
  .img-show>img:first-child{
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 1001;
  }
  .img-show>img:nth-child(2){
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .img-show>img:nth-child(3){
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .img-bg{
    overflow: hidden;

  }
  .img-bg>div:first-child{
    width: 80px;
    height: 80px;
    border: 1px solid #DDDDDD;
    float: left;
    margin-right: 15px;
    margin-bottom: 10px;
    line-height: 80px;
    color: #ddd;
    font-size: 18px;
    letter-spacing:2px;
    text-align: right;
  }
  .img-bg>div:first-child img{
    max-width: 75px;
  }
  .img-bg>div:nth-child(2){
    height: 40px;
    line-height: 40px;
  }
  .img-bg>div:last-child{
    height:40px;
    position: relative;
  }
  .img-bg>div:last-child span{
    position: absolute;
    bottom: 0;
    color: #DDDDDD;
  }
  .inupuradio>span:first-child{
    width:6%;
  }
  .inupuradio>span:last-child{
    display: inline-block;
    width:94%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  #group{
    width:100%;
  }
  #page,#page2{
    margin-top:0px;
  }
  .img-tiele{
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    color: #DDDDDD;
  }
  .head{
    overflow: hidden;
    background: #ebf0f5;
    padding: 15px 10px;
    text-align: center;
    border: 1px solid #dde3e8;
    border-bottom: 0;
    font-size: 14px;
  }
  .group .color_blue{
    color: #0076e8;
  }
  .imgblank .color_blue{
    color: #0076e8;
  }
  .color_blue>ul>li{
    color: #495060;
  }
  .imgblank>li>ul>li{
    text-align: left;
    padding:8px 0;
    padding-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
  }
  .imgblank>li>ul>li>ul>li{
    text-align: left;
    padding:8px 0;
    padding-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
  }
  .sidebarx{
    height:calc(100% - 52px);
    overflow-y:auto ;
  }
  .sidebar{
    height:100%;
  }
  .upup{
    display: inline-block;
  }
  .img-float{
    float: right;
    margin-right: 20px;
  }
  #col-10{
    height:92%;
  }
 

  .boxdiv{
    position: relative;
    width:25%;
    float: left;
  }
  .boxcar{
    position: relative;
    width:24%;
    margin-right:1%;
    height:24%;
    margin-bottom:1%;
    float: left;
  }
  .inputchex{
  	
    position: relative;
    width:100%;
    height: 100%;
   
  }
  .inputchex span:first-child{
    position: absolute;
    top: 0px;
    right: 14px;
    z-index: 1000;
     
  }
  .inputchex h3{
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,.3);
    height: 25%;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
  }
  .inputing{
    width:100%;
    height:100%;
  }
  .ivu-card-body{
    padding:0;
  }
  .colhei{
    height: 100%;
    overflow: hidden;
  }
  
  .my-btn{
    padding: 4px 10px;
  }
  .group>li{
    border-bottom: 1px dashed #ebf0f5;
    cursor: pointer;
  }
  .group>li:last-child{
    border-bottom: none;
  }
  .ivu-card-body{
    height:100%;
  }
  #imgbank2{
    width:100%;
    border: 1px solid #dde3e8;
    border-top: 0;
    padding: 0 5px;
    height:90%;
  }
  .imgblank{
    height:90%;
    text-align: center;
    overflow-y: auto;
    border: 1px solid #dde3e8;
  }
  .imgblank>li{
    text-align: left;
    padding:8px 0;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
  }
  .imgblank>li:last-child{
    border-bottom:none;
  }
  #imgbank2>label>span:last-child{
    width:90%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  #modelconten{
    height:500px;
  }
  #modelconten>div, #modelconten>div>div{
    height:100%;
  }
  #modelconten .head{
    height:10%;
  }
  .quanxuan{
    height:5%;
  }
  .quancar{
    height:95%;
  }

  .imgdeg>span,.imgdeg2>span{
    transform:rotate(90deg);
    display: inline-block;
   
  }
  
  /* 关键词采集 */
 .mag-p{
    margin:10px 0;
  }
    .mod-bor{
    border: 1px dashed #DDDDDD;
    padding: 10px 10px 15px;
    margin-bottom: 10px;
  }
   #selewid1,#selewid3{
    width:30%;
  }
  
  #selewid2,#selewid4{
    width:60%;
  }
  
    #sele,#sele1{
    width:90%;
    margin-right: 15px;
  }
  
  
  /* 关键词采集 */
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
  /*滚动条样式*/
  .scroll{
  	overflow-y: auto;
  }
  .scroll::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }
  .scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(79, 161, 190, 0.2);
    background: #bbb;
  }
  .scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
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
<style scope>
.inputchex span:first-child {
    position: absolute;
    top: 0px;
    right: 14px;
    z-index: 1000;
}
</style>
<style scope>
	.input-samll input{
		height: 24px !important;
		padding: 1px 0 !important;
		text-align: center;
	}
</style>
<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>