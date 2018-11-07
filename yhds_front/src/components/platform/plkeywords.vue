<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/productManagement">产品管理</Breadcrumb-item>
      <Breadcrumb-item>关键词优化分析器</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
      <div ref="search">
        <Form ref="formCustom"  :model="formCustom" :rules="ruleCustom" :label-width="100">
          <Row>
            <Col span="6" offset="4">
            	<Input v-model="keyname" @on-change="keyname=keyname.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="请输入关键词" ></Input>
            	<!--<Select v-model="groupingId" placeholder="请选择分组" size="large">
            		<Option v-for="item in viewlist" :value="item.wgId">{{item.wgName }}</Option>
            	</Select>-->
            </Col>
            <Col span="8">
                <Button  type="primary" shape="circle" class="my-btn ml_40" @click="search()">搜&nbsp;&nbsp;索</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div style="display: flex;" class="mt_10">
      	<div class="ivu-col-span-3">
      		<Button type="primary" class="my-btn ml_10" style="padding: 5px 10px;" @click="newfile()"><i class="ivu-icon ivu-icon-plus-round"></i>新建分组</Button>
      	</div>
      	<div class="clr ivu-col-offset-1" style="flex: 1;">
      		<div class="fl" style="line-height: 19px;">
      			<!--<p style="font-size: 12px;">您公司已优化产品及软件发布关键词数为 <span class="text-blue">{{numData.count}}</span> 个，获得总曝光为 <span class="text-blue">{{numData.impression}}</span> ，总点击为 <span class="text-blue">{{numData.click}}</span> ，总反馈为 <span class="text-blue">{{numData.fb}}</span> 。</p>
      			<p class="color_red">提示：自然排名3页后的蓝海关键词建议使用SEO优化，排名效果提升较好，其余关键词建议先进行SEO优化。</p>-->
      		</div>
      		<div class="fr">
      			<Button type="primary" shape="circle" class="my-btn ml_10" style="padding: 5px 10px;" @click="allot()">分配</Button>
      			<!--<Button type="primary" shape="circle" class="my-btn ml_10" style="padding: 5px 10px;" @click="word_columnshow()">自定义列</Button>-->
      			<Button type="primary" shape="circle" class="my-btn ml_10" style="padding: 5px 10px;" @click="seo()">SEO优化</Button>
      			<!--<Button type="primary" shape="circle" class="my-btn ml_10" style="padding: 5px 10px;" @click="naturalRanking=true">买家偏好优化</Button>-->
      		</div>
      	</div>
      </div>
      <div style="display: flex;" class="mt_10 center">
      	<div class="ivu-col-span-3 headspan scroll" :style="{maxHeight:tableHeight+'px'}" style="overflow-y: auto;">
      		<div class="head center">
	  				优化关键词分组
	  			</div>
	  			<div class="head" style="background: none">
	  				<span class="fl color_blue" style="font-size: 14px; line-height: normal;" @click="pullshow()"><Icon type="edit" class="f_14"></Icon> 编辑</span>
	  				<span class="fr color_red f_14" @click="delehtml()"><span class="iconfont icon-shanchu f_14"></span> 删除</span>
	  			</div>
	  			
	  			
	  			<Menu width="100%" style="border-left: 1px solid #dddee1;border-bottom: 1px solid #dddee1;" :active-name="$route.query.page==3?'2-3':$route.query.page==2?'2-2':$route.query.page==4?'3':'1-1'" :open-names="$route.query.page==2||$route.query.page==3?['2']:$route.query.page==4?['3']:['1']">
            <Submenu name="1">
                <template slot="title">
                    <span style="border-radius: 50%;border: 1px solid #ccc;width: 8px;height: 8px;display: inline-block;" class="ml_5 mr_5"></span>
                    按搜索热度
                </template>
                <MenuItem name="1-1" @click.native="groupid=4">热门关键词</MenuItem>
                <MenuItem name="1-2" @click.native="groupid=5">蓝海关键词</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <span style="border-radius: 50%;border: 1px solid #ccc;width: 8px;height: 8px;display: inline-block;" class="ml_5 mr_5"></span>
                    按自然排名
                </template>
                <MenuItem name="2-1" @click.native="groupid=1">1页关键词</MenuItem>
                <MenuItem name="2-2" @click.native="groupid=2">2-3页关键词
                	<div class="bg-red color-white text-h6">
                		<span class="iconfont icon-xingzhuang60kaobei2 text-h6"></span>推荐优化
                	</div>
                </MenuItem>
                <MenuItem name="2-3" @click.native="groupid=3">3页后关键词
                	<div class="bg-red color-white text-h6">
                		<span class="iconfont icon-xingzhuang60kaobei2 text-h6"></span>推荐优化
                	</div>
                </MenuItem>
            </Submenu>
            <MenuItem name="3" @click.native="groupid=6">
	            	<span style="border-radius: 50%;border: 1px solid #ccc;width: 8px;height: 8px;display: inline-block;" class="ml_5 mr_5"></span>
	            	待发布覆盖关键词
            </MenuItem>
            <MenuItem name="4" @click.native="groupid=7">
	            	<span style="border-radius: 50%;border: 1px solid #ccc;width: 8px;height: 8px;display: inline-block;" class="ml_5 mr_5"></span>
	            	已优化关键词
            </MenuItem>
            <MenuItem :name="5+idx" v-for="(item,idx) in groupList" @click.native="groupid=item.groupid">
	            	<span style="border-radius: 50%;border: 1px solid #ccc;width: 8px;height: 8px;display: inline-block;" class="ml_5 mr_5"></span>
	            	{{item.groupname}}
            </MenuItem>
        	</Menu>
	  			<!--<ul class="group">
	  				<li :style="{color:index==addstyle?"#2d8cf0':'#444444'}" v-for="(item,index) in styledata" @click="addclass(index)">{{item.wgName}}</li>
	  			</ul>-->
      	</div>
      	<div class="clr ivu-col-offset-1" style="flex: 1;">
      		<Table ref="table" class="scrollbalWidth clr" :height="tableHeight" :loading="loading" border stripe :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="tabelchange" @on-sort-change="sortChange"></Table>
      		<Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      	</div>
      </div>
    </div>
    
    <!--新建分组模态框-->
	    <Modal
	      ref="modal1"
	      v-model="modal1"
	      title="新建分组"
	      :styles="{top: '200px'}"
	      @on-ok="addGroup"
	    >
	        <div>
	            <p class="mag-p">分组名称</p>
	            <Input placeholder="请输入分组名称" v-model="groupname"></Input>
	        </div>
	        
	    </Modal>
	    
	    <!--编辑分组模态框-->
	    <Modal
	      ref="modal2"
	      v-model="modal2"
	      title="编辑分组"
	      :styles="{top: '200px'}"
	      @on-ok="editGroup"
	    >
	        <div>
	            <p class="mag-p">分组名称</p>
	            <Input placeholder="请输入分组名称" v-model="groupname"></Input>
	        </div>
	        
	    </Modal>
	    
	    <!--分配分组模态框-->
	    <Modal
	      ref="modal5"
	      v-model="modal5"
	      title="分配至"
	      :styles="{top: '200px',width:'350px'}"
	      @on-ok="changeGroup"
	    >
	        <div class="allot">
	        	
	        	<div class="checkdiv" v-for="(item,idx) in groupList">
	        		<label style="display: block;">
	            	<input type="radio" name="group" hidden="hidden" class="checkbox" @click="changeGroupid=item.groupid" />
	            	<span class="check ml_10 mr_10"></span>
	            	<span>{{item.groupname}}</span>
	            </label>
	        	</div>
	        </div>
	        
	    </Modal>
	    
	    <!--删除分组模态框-->
	    <Modal
	      ref="modal3"
	      v-model="modal3"
	      title="删除分组"
	      :styles="{top: '200px'}"
	      @on-ok="delGroup"
	    >
	        <div class="text-center f_18">是否删除该分组，该操作不可恢复</div>
	        
	    </Modal>
	    
	    <!--自定义列模态框-->
	    <Modal
      v-model="modal4"
      title="自定义列"
      @on-ok="word_columnok"
      :styles="{top: '50px'}"
      width="700"
     >
      <div>
        <div class="word_modtile"><span @click="word_alltitle">全部添加</span></div>
        <Row>
          <Col span="11" class="word_modwih">
           <div> 已添加（点击删除）</div>
            <div class="word_modconten">
              <ul>
                <li v-for="(item,index) in word_zdylist" >
                  <span class="word_listname">{{item.dicName}}</span>
                  <span @click="zdy_word_downRecord(index)">
                    <Icon type="arrow-down-c"></Icon>
                  </span>
                  <span @click="zdy_word_upRecord(index)">
                    <Icon type="arrow-up-c"></Icon>
                  </span>
                  <span @click="word_delearr(index)">
                    <Icon type="close"></Icon>
                  </span>
                </li>
              </ul>
            </div>
          </Col>
          <Col span="11" offset="2" class="word_modwih">
            <div> 待添加（点击添加）</div>
          <div class="word_modconten">
            <ul>
              <li v-for="(item,index) in word_zdylist2">
                <span class="word_listname" >{{item.dicName}}</span>
                <span @click="word_plusadd(index)">
                    <Icon type="plus"></Icon>
                  </span>
              </li>
            </ul>
          </div>
          </Col>
        </Row>
      </div>
    </Modal>
    
    <!--  买家偏好度优化   Natural ranking   -->
		<Modal v-model="naturalRanking" title="买家偏好度优化" @on-ok="" :styles="{top: '120px',width:'900px',height:'450px'}">
			<div style="width:880px;height:420px; padding:0 10px;">
				<p style="font-size: 16px; text-indent: 2em;">您所优化的关键词涉及以下产品的优化，点击打造爆款，系统将自动设置下述产品为P4P优先推广产品，并进行竞价。以提高产品数据积累(既买家偏好)，从而实现排名提升。</p>
				<Table style="width:850px;margin-top:5px ;" ref="table" :loading="loading" :height="290" border stripe :columns="naturalRanking1" :data="tableDataC" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="" @on-sort-change=""></Table>
				<div class="text-center mt_10">
					<Button type="primary" shape="circle" style="font-size: 16px;">爆款打造</Button>
				</div>
				<Page class="clr" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
	
			</div>
			<div slot="footer" style="height: 0; padding: 0;"></div>
		</Modal>
    
	<!--新建策略模态框-->
	   <Modal
	     ref="addmodal"
	     :title="modetext"
	     v-model="addmodal"
	     width="600"
	     :styles="{top: '60px'}"
	     @on-ok="addnew"
	   >
	     <div class="modeconten">
	        <p>
	
	          <span class="nameofthe">策略名称：</span><Input v-model="strategyname" placeholder="请输入策略名称" style="width: 400px;height: 35px;"></Input>
	        </p>
	       <p>
	         <span class="nameofthe">排名倾向：</span>
	         <Select v-model="seledata" style="width:150px">
	           <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	         </Select>
	       </p>
	
	       <p>
	         <span class="nameofthe">差价类型：</span>
	         <Select v-model="seledata2" style="width:150px;margin-right: 50px;">
	           <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
	         </Select>
	         <span v-if="seledata2=='diff_price'">
	           <Input v-model="difference"  style="width: 150px;height: 35px;"></Input>
	         </span>
	         <span v-else>
	           <Input v-model="difference2"  style="width: 150px;height: 35px;"></Input>
	           <b style="color: #999;font-size:20px;vertical-align: middle">%</b>
	         </span>
	       </p>
	
	       <p>
	         <span class="nameofthe">
	           <Checkbox v-model="singleprice" style="margin-right: 0;">价格上限：</Checkbox>
	         </span>
	         <b style="color: #999;font-size:18px;vertical-align: middle">¥</b>
	         <Input v-model="price2"  style="width: 136px;height: 35px;" :disabled="!singleprice"></Input>
	       </p>
	
	       <p>
	         <span class="nameofthe">高于价格上限：</span>
	         <Select v-model="heisele" style="width:150px">
	           <Option v-for="item in heicityList" :value="item.dicCode" :key="item.dicCode">{{ item.dicName }}</Option>
	         </Select>
	       </p>
	       <p>
	         <span class="nameofthe">
	           <Checkbox v-model="singltime" style="margin-right: 0;">投放时间：</Checkbox>
	         </span>
	         <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" v-if="singltime" @click="choosetime">添加</Button>
	         <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" disabled v-else>添加</Button>
	       </p>
	
	       <p v-if="keywordsshow">
	         <span class="nameofthe">
	          选择关键词：
	         </span>
	
	         <span style="color:#CCCCCC">已选择{{keywrodnum}}个关键词</span>
	         <!--<Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" @click="keywordsinit">添加</Button>-->
	       </p>
	
	       <p>
	        <span class="nameofthe">
	           <Checkbox v-model="levelsingl" style="margin-right: 0;">分段出价：</Checkbox>
	         </span>
	         <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" v-if="levelsingl" @click="periodinit">添加</Button>
	         <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" disabled v-else>添加</Button>
	         <span style="color: #CCCCCC">无特殊需求可不设置</span>
	       </p>
	
	       <p>
	           <Checkbox v-model="immediately" style="margin-right: 0; margin-left: 23px;">立即启用策略</Checkbox>
	       </p>
	     </div>
	
	   </Modal>
	   <!--投放时间模态框-->
	   <Modal
	     title="选择投放时间(北京时间)"
	     v-model="puttime"
	     width="700"
	     :styles="{top: '60px'}"
	
	     @on-ok="castok"
	   >
	     <div style="padding-bottom: 15px;">
	       <Button type="primary" shape="circle" style="margin:0 10px; padding:5px 16px;" @click="chooadd">新增</Button>
	     </div>
	     <div class="timetabel">
	      <p>
	        <span class="fisttiem">开始时间</span>
	        <span class="lasttiem">结束时间</span>
	        <span class="timediqu">地区</span>
	        <span>周一</span>
	        <span>周二</span>
	        <span>周三</span>
	        <span>周四</span>
	        <span>周五</span>
	        <span>周六</span>
	        <span>周天</span>
	        <span>操作</span>
	      </p>
	       <ul style="height: 240px;overflow: auto" class="keystyle">
	         <li v-for="(item,index) in listinit">
	           <span class="fisttiem">{{item.atStartTime}}</span>
	           <span class="lasttiem">{{item.atEndTime}}</span>
	           <span class="timediqu">{{item.dicName}}</span>
	           <CheckboxGroup v-model="fruit[index]" style="display: inline-block">
	             <Checkbox label="1"></Checkbox>
	             <Checkbox label="2"></Checkbox>
	             <Checkbox label="3"></Checkbox>
	             <Checkbox label="4"></Checkbox>
	             <Checkbox label="5"></Checkbox>
	             <Checkbox label="6"></Checkbox>
	             <Checkbox label="7"></Checkbox>
	           </CheckboxGroup>
	           <span>
	             <strong @click="choopull(item.atStartTime,item.atEndTime,index)">修改</strong>
	             <strong @click="choodell(index)">删除</strong>
	           </span>
	         </li>
	
	       </ul>
	     </div>
	     <div>
	        <p style="padding: 20px 0">区域活跃时间：</p>
	       <div>
	         <Checkbox v-model="diqu[index]" style="width: 14.2%" v-for="(item,index) in timedata" @on-change="chechange(index,item.dicCode)">{{item.dicName}}</Checkbox>
	       </div>
	     </div>
	   </Modal>
	   
	   <!--修改时间弹框 -->
	   <Modal
	     v-model="timemodal"
	     title="修改时间"
	     width="400"
	     @on-ok="choopullok"
	   >
	
	     <div style="height: 220px">
	       开始时间：
	       <Select v-model="startime" style="width:100px;margin-right: 20px;">
	         <Option v-for="item in starList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	       </Select>
	       结束时间：
	       <Select v-model="endtime" style="width:100px">
	         <Option v-for="item in endList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	       </Select>
	     </div>
	   </Modal>
	   
	   <!--修改分段时间弹框 -->
	   <Modal
	     v-model="period"
	     title="设置分段出价(北京时间)"
	     width="770"
	     @on-ok="periodok"
	     :styles="{top: '100px'}"
	   >
	     <div style="height:50px;line-height: 50px;">
	       <span style="color:#CCCCCC">分段出价的规则只限于选择的时间段内执行，在所选时间段外，策略还是按照策略所定规则执行出价。</span>
	       <Button type="primary" shape="circle" style="margin:0 10px; padding:5px 16px;" @click="periodnew()">新增</Button>
	     </div>
	
	     <div class="periclass">
	       <p>
	         <span>开始时间</span>
	         <span>结束时间</span>
	         <span>排名倾向</span>
	         <span>差价模式</span>
	         <span>差价比(%)</span>
	         <span>差价</span>
	         <span>价格上限</span>
	         <span>高于价格上限</span>
	         <span>操作</span>
	       </p>
	       <ul class="keystyle">
	         <li v-for="(item,index) in adddata">
	           <span>{{item.strategyTimes[0].pstStartTime}}</span>
	           <span>{{item.strategyTimes[0].pstEndTime}}</span>
	           <span>{{item.psRankingTendency}}</span>
	           <span v-if="item.psDiffType=='diff_price'">差价</span>
	           <span v-if="item.psDiffType=='diff_price_prop'">差价比</span>
	           <span v-if="!item.psDiffType"></span>
	           <span>{{item.psDiffPrice}}</span>
	           <span>{{item.psDiffPriceProp}}</span>
	           <span>{{item.psPriceRange}}</span>
	           <span>{{keepdata[index]}}</span>
	           <span>
	             <strong @click="periodpull(index)">修改</strong>
	             <strong @click="perioddele(index)">删除</strong>
	           </span>
	         </li>
	       </ul>
	     </div>
	   </Modal>
	
	   <!--修改分段值弹框 -->
	   <Modal
	     v-model="periodxxx"
	     title="设置当前分段出价(北京时间)"
	     width="440"
	     @on-ok="perinewadd"
	     :styles="{top: '100px'}"
	   >
	     <div class="periodstyle">
	       <p>
	         <span>开始时间：</span>
	         <Select v-model="starperiod" style="width:100px;margin-right: 20px;">
	           <Option v-for="item in periodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	         </Select>
	         <span>结束时间：</span>
	         <Select v-model="endperiod" style="width:100px">
	           <Option v-for="item in perioddata" :value="item.value" :key="item.value">{{ item.label }}</Option>
	         </Select>
	       </p>
	       <p>
	         <span>排名倾向：</span>
	         <Select v-model="ranking" style="width:100px;margin-right: 20px;">
	           <Option v-for="item in rankinglist" :value="item.value" :key="item.value">{{ item.label }}</Option>
	         </Select>
	         <span>差价模式：</span>
	         <Select v-model="category" style="width:100px;margin-right: 20px;">
	           <Option v-for="item in categorylist" :value="item.value" :key="item.value">{{ item.label }}</Option>
	         </Select>
	       </p>
	       <p>
	
	         <span>差价比(%):</span>
	         <Input v-model="proportion" placeholder="请输入差价比" style="width:100px;margin-right: 20px;"></Input>
	         <span>差价</span>
	         <Input v-model="proportiondata" placeholder="请输入差价" style="width:100px;margin-right: 20px;"></Input>
	       </p>
	       <p>
	
	         <span>价格上限:</span>
	         <Input v-model="ceiling" placeholder="请输入上限" style="width:100px;margin-right: 20px;"></Input>
	         <span>高于上限价格:</span>
	         <Select v-model="uqceiling" style="width:100px;margin-right: 20px;">
	           <Option v-for="item in heicityList" :value="item.dicCode" :key="item.dicCode">{{ item.dicName }}</Option>
	         </Select>
	       </p>
	
	     </div>
	   </Modal>
			
			
			<Modal
	      v-model="promote"
	      title="添加推广"
	      @on-ok="promoteok"
	      :styles="{top: '60px'}"
	    >
	     <div class="promoteclass">
	       <RadioGroup v-model="verpromote">
	         <Radio :label="item.name" v-for="item in promoteData">
	           <span>{{item.name}}</span>
	         </Radio>
	       </RadioGroup>
	     </div>
	
	    </Modal>
	    
	    
	    <Modal
	      ref="word_price"
	      v-model="word_price"
	      title="修改价格"
	      width="400"
	      @on-ok="word_priceok"
	      :styles="{top: '50px'}"
	     >
	      <div class="word_modprice">
	        <p>关键词：{{word_wordsprice}}</p>
	        <p>
	         <span> 低价：¥{{word_lowprice}}</span>
	         <span> 余额：¥{{word_money}}</span>
	        </p>
	        <p>
	          <Input v-model="word_pricevalue"  style="width:230px;margin-right: 15px;"></Input>
	          <Button type="primary"><a href="https://topranking.alibaba.com/index.htm?spm=a276j.9715717.topranking.1.6dac48b1UNUCcT" style="color: #ffffff">包月抢第一</a></Button>
	        </p>
	        <p>
	          价格必须介于低价与余额之间<br>
	          当日出价高于当日余额时，按当日余额进行排名
	        </p>
	        <div>
	          <p>此刻进前五名所需最低价</p>
	          <div>
	            <p>
	              <span>排名</span>
	              <span  v-for="(item,index) in word_front">{{index+1}}</span>
	            </p>
	            <p>
	              <span>出价</span>
	              <span v-for="item in word_front" style="cursor: pointer" @click="word_replace(item)">{{item}}</span>
	            </p>
	          </div>
	        </div>
	      </div>
	
	    </Modal>
    
  </div>
</template>
<script>
import BImages from "../../components/imageVue/imageBank.vue"
import LImages from "../../components/imageVue/imageLibrary.vue"
import Detail from '../../components/productManagement/detail';
var sort = ' ';
var	order = ' ';
  export default {
    components:{
      BImages,
      LImages,
      Detail
    },
    data(){
      const validateKey = (rule, value, callback) => {
        if(value && value.length>128){
          callback(new Error('关键词长度不得超过128个字符！'));
        }else{
          callback()
          this.formCustom.keyValue=value
        }
      };
      return {
      	seoGroupList:{},
      	naturalRanking:false,
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
      	
      	
      	
      	
      	
      	
      	
      	groupname:'',
      	groupList:[],
      	groupid:4,
      	proData:[],
      	//            加入推广
		    promoName:"",
		    promoteData:[],
		    verpromote:"",
		    promote:false,
		    keywordId:[],
		    changeGroupid:1,
		    numData:{},
		    groupingId:'',
		    keyname:'',
		    
		    
      	periodList:[
            {
              value: '00:00',
              label: '00:00'
            },
            {
              value: '00:30',
              label: '00:30'
            },
            {
              value: '01:00',
              label: '01:00'
            },
            {
              value: '01:30',
              label: '01:30'
            },
            {
              value: '02:00',
              label: '02:00'
            },
            {
              value: '02:30',
              label: '02:30'
            },
            {
              value: '03:00',
              label: '03:00'
            },
            {
              value: '03:30',
              label: '03:30'
            },
            {
              value: '04:00',
              label: '04:00'
            },
            {
              value: '04:30',
              label: '04:30'
            },
            {
              value: '05:00',
              label: '05:00'
            },
            {
              value: '05:30',
              label: '05:30'
            },
            {
              value: '06:00',
              label: '06:00'
            },
            {
              value: '06:30',
              label: '06:30'
            },
            {
              value: '07:00',
              label: '07:00'
            },
            {
              value: '07:30',
              label: '07:30'
            },
            {
              value: '08:00',
              label: '08:00'
            },
            {
              value: '08:30',
              label: '08:30'
            },
            {
              value: '09:00',
              label: '09:00'
            },
            {
              value: '09:30',
              label: '09:30'
            },
            {
              value: '10:00',
              label: '10:00'
            },
            {
              value: '10:30',
              label: '10:30'
            },
            {
              value: '11:00',
              label: '11:00'
            },
            {
              value: '11:30',
              label: '11:30'
            },
            {
              value: '12:00',
              label: '12:00'
            },
            {
              value: '12:30',
              label: '12:30'
            },
            {
              value: '13:00',
              label: '13:00'
            },
            {
              value: '13:30',
              label: '13:30'
            },
            {
              value: '14:00',
              label: '14:00'
            },
            {
              value: '14:30',
              label: '14:30'
            },
            {
              value: '15:00',
              label: '15:00'
            },
            {
              value: '15:30',
              label: '15:30'
            },
            {
              value: '16:00',
              label: '16:00'
            },
            {
              value: '16:30',
              label: '16:30'
            },
            {
              value: '17:00',
              label: '17:00'
            },
            {
              value: '17:30',
              label: '17:30'
            },
            {
              value: '18:00',
              label: '18:00'
            },
            {
              value: '18:30',
              label: '18:30'
            },
            {
              value: '19:00',
              label: '19:00'
            },
            {
              value: '19:30',
              label: '19:30'
            },
            {
              value: '20:00',
              label: '20:00'
            },
            {
              value: '20:30',
              label: '20:30'
            },
            {
              value: '21:00',
              label: '21:00'
            },
            {
              value: '21:30',
              label: '21:30'
            },
            {
              value: '22:00',
              label: '22:00'
            },
            {
              value: '22:30',
              label: '22:30'
            },
            {
              value: '23:00',
              label: '23:00'
            },
            {
              value: '23:30',
              label: '23:30'
            },
          ],
          perioddata:[
            {
              value: '00:00',
              label: '00:00'
            },
            {
              value: '00:30',
              label: '00:30'
            },
            {
              value: '01:00',
              label: '01:00'
            },
            {
              value: '01:30',
              label: '01:30'
            },
            {
              value: '02:00',
              label: '02:00'
            },
            {
              value: '02:30',
              label: '02:30'
            },
            {
              value: '03:00',
              label: '03:00'
            },
            {
              value: '03:30',
              label: '03:30'
            },
            {
              value: '04:00',
              label: '04:00'
            },
            {
              value: '04:30',
              label: '04:30'
            },
            {
              value: '05:00',
              label: '05:00'
            },
            {
              value: '05:30',
              label: '05:30'
            },
            {
              value: '06:00',
              label: '06:00'
            },
            {
              value: '06:30',
              label: '06:30'
            },
            {
              value: '07:00',
              label: '07:00'
            },
            {
              value: '07:30',
              label: '07:30'
            },
            {
              value: '08:00',
              label: '08:00'
            },
            {
              value: '08:30',
              label: '08:30'
            },
            {
              value: '09:00',
              label: '09:00'
            },
            {
              value: '09:30',
              label: '09:30'
            },
            {
              value: '10:00',
              label: '10:00'
            },
            {
              value: '10:30',
              label: '10:30'
            },
            {
              value: '11:00',
              label: '11:00'
            },
            {
              value: '11:30',
              label: '11:30'
            },
            {
              value: '12:00',
              label: '12:00'
            },
            {
              value: '12:30',
              label: '12:30'
            },
            {
              value: '13:00',
              label: '13:00'
            },
            {
              value: '13:30',
              label: '13:30'
            },
            {
              value: '14:00',
              label: '14:00'
            },
            {
              value: '14:30',
              label: '14:30'
            },
            {
              value: '15:00',
              label: '15:00'
            },
            {
              value: '15:30',
              label: '15:30'
            },
            {
              value: '16:00',
              label: '16:00'
            },
            {
              value: '16:30',
              label: '16:30'
            },
            {
              value: '17:00',
              label: '17:00'
            },
            {
              value: '17:30',
              label: '17:30'
            },
            {
              value: '18:00',
              label: '18:00'
            },
            {
              value: '18:30',
              label: '18:30'
            },
            {
              value: '19:00',
              label: '19:00'
            },
            {
              value: '19:30',
              label: '19:30'
            },
            {
              value: '20:00',
              label: '20:00'
            },
            {
              value: '20:30',
              label: '20:30'
            },
            {
              value: '21:00',
              label: '21:00'
            },
            {
              value: '21:30',
              label: '21:30'
            },
            {
              value: '22:00',
              label: '22:00'
            },
            {
              value: '22:30',
              label: '22:30'
            },
            {
              value: '23:00',
              label: '23:00'
            },
            {
              value: '23:30',
              label: '23:30'
            },
          ],
      	ranking:'',
          rankinglist:[
            {
              value: '5',
              label: '前五位'
            },
            {
              value: '4',
              label: '前四位'
            },
            {
              value: '3',
              label: '前三位'
            },
            {
              value: '2',
              label: '前二位'
            },
            {
              value: '1',
              label: '前一位'
            },
          ],

          category:"",
          categorylist:[
            {
              value: 'diff_price',
              label: '差价'
            },
            {
              value: 'diff_price_prop',
              label: '差价比'
            },
          ],

          proportion:"",
          proportiondata:"",

          ceiling:0,
          uqceiling:"",
          uqceilinglist:[
            {
              value: '保持原价',
              label: '保持原价'
            },
            {
              value: '上限出价',
              label: '上限出价'
            },
            {
              value: '暂停推广',
              label: '暂停推广'
            },
            {
              value: '低价出价',
              label: '低价出价'
            },
          ],
          chajia:[],
          keepdata:[],
          keepname:[],
          allvalindex:"",


          thestars:"xx",
          cityListstars:[
            {
              value: "xx",
              label: '选择星级'
            },
            {
              value: '5',
              label: '五星词'
            },
            {
              value: '4',
              label: '四星词'
            },
            {
              value: '3',
              label: '三星词'
            },
          ],
          allkeys:"quan",
          cityListallkeys:[
            {
              value: 'quan',
              label: '全部词'
            },
            {
              value: '0',
              label: '非策略词'
            },
          ],

          viewshow:"all",
          viewlist:[],
          passkeys:"",
          keysloading:false,
          
          //              设施分段时间
          period:false,
          periodxxx:false,

          adddata:[],


//              修改分段值弹框
          starperiod:"",
          endperiod:"",
          
          
	  	//              修改策略
	      keywordsshow:false,
	      control:"0",
	
	      modetext:"新建策略",
	      addpullsta:"1",
	//              自定义列
	      word_zdylist:[],
	      word_zdylist2:[],
	      
	//    卖家偏好优化
        puttime:false,
//              新建策略
	      addmodal:false,
	      strategyname:"",
	
	      seledata:'',
	      cityList:[
	        {
	          value: '5',
	          label: '前五位'
	        },
	        {
	          value: '4',
	          label: '前四位'
	        },
	        {
	          value: '3',
	          label: '前三位'
	        },
	        {
	          value: '2',
	          label: '前二位'
	        },
	        {
	          value: '1',
	          label: '前一位'
	        },
	      ],
	      seledata2:"diff_price",
	      cityList2:[
	        {
	          value: 'diff_price',
	          label: '差价'
	        },
	        {
	          value: 'diff_price_prop',
	          label: '差价比'
	        },
	      ],
	      difference:"",
	      difference2:"",
	
	      singleprice:false,
	
	      price2:"",
	      heisele:"PAUSSE",
	      heicityList:[],
	
	      singltime:false,
	
	      keywrod:0,
	      keywrodnum:"0",
	
	      levelsingl:false,
	
	      immediately:true,
				
//           投放时间模态框
	      timemodal:false,
	      puttime:false,
	      timedata:[],
	      fruit:[],
	      listinit:[],
	      diqu:[],
	//              修改时间
	      startime:"",
	      endtime:"",
	      starList:[
	        {
	          value: '00:00',
	          label: '00:00'
	        },
	        {
	          value: '00:30',
	          label: '00:30'
	        },
	        {
	          value: '01:00',
	          label: '01:00'
	        },
	        {
	          value: '01:30',
	          label: '01:30'
	        },
	        {
	          value: '02:00',
	          label: '02:00'
	        },
	        {
	          value: '02:30',
	          label: '02:30'
	        },
	        {
	          value: '03:00',
	          label: '03:00'
	        },
	        {
	          value: '03:30',
	          label: '03:30'
	        },
	        {
	          value: '04:00',
	          label: '04:00'
	        },
	        {
	          value: '04:30',
	          label: '04:30'
	        },
	        {
	          value: '05:00',
	          label: '05:00'
	        },
	        {
	          value: '05:30',
	          label: '05:30'
	        },
	        {
	          value: '06:00',
	          label: '06:00'
	        },
	        {
	          value: '06:30',
	          label: '06:30'
	        },
	        {
	          value: '07:00',
	          label: '07:00'
	        },
	        {
	          value: '07:30',
	          label: '07:30'
	        },
	        {
	          value: '08:00',
	          label: '08:00'
	        },
	        {
	          value: '08:30',
	          label: '08:30'
	        },
	        {
	          value: '09:00',
	          label: '09:00'
	        },
	        {
	          value: '09:30',
	          label: '09:30'
	        },
	        {
	          value: '10:00',
	          label: '10:00'
	        },
	        {
	          value: '10:30',
	          label: '10:30'
	        },
	        {
	          value: '11:00',
	          label: '11:00'
	        },
	        {
	          value: '11:30',
	          label: '11:30'
	        },
	        {
	          value: '12:00',
	          label: '12:00'
	        },
	        {
	          value: '12:30',
	          label: '12:30'
	        },
	        {
	          value: '13:00',
	          label: '13:00'
	        },
	        {
	          value: '13:30',
	          label: '13:30'
	        },
	        {
	          value: '14:00',
	          label: '14:00'
	        },
	        {
	          value: '14:30',
	          label: '14:30'
	        },
	        {
	          value: '15:00',
	          label: '15:00'
	        },
	        {
	          value: '15:30',
	          label: '15:30'
	        },
	        {
	          value: '16:00',
	          label: '16:00'
	        },
	        {
	          value: '16:30',
	          label: '16:30'
	        },
	        {
	          value: '17:00',
	          label: '17:00'
	        },
	        {
	          value: '17:30',
	          label: '17:30'
	        },
	        {
	          value: '18:00',
	          label: '18:00'
	        },
	        {
	          value: '18:30',
	          label: '18:30'
	        },
	        {
	          value: '19:00',
	          label: '19:00'
	        },
	        {
	          value: '19:30',
	          label: '19:30'
	        },
	        {
	          value: '20:00',
	          label: '20:00'
	        },
	        {
	          value: '20:30',
	          label: '20:30'
	        },
	        {
	          value: '21:00',
	          label: '21:00'
	        },
	        {
	          value: '21:30',
	          label: '21:30'
	        },
	        {
	          value: '22:00',
	          label: '22:00'
	        },
	        {
	          value: '22:30',
	          label: '22:30'
	        },
	        {
	          value: '23:00',
	          label: '23:00'
	        },
	        {
	          value: '23:30',
	          label: '23:30'
	        },
	      ],
	      endList:[
	
	        {
	          value: '00:30',
	          label: '00:30'
	        },
	        {
	          value: '01:00',
	          label: '01:00'
	        },
	        {
	          value: '01:30',
	          label: '01:30'
	        },
	        {
	          value: '02:00',
	          label: '02:00'
	        },
	        {
	          value: '02:30',
	          label: '02:30'
	        },
	        {
	          value: '03:00',
	          label: '03:00'
	        },
	        {
	          value: '03:30',
	          label: '03:30'
	        },
	        {
	          value: '04:00',
	          label: '04:00'
	        },
	        {
	          value: '04:30',
	          label: '04:30'
	        },
	        {
	          value: '05:00',
	          label: '05:00'
	        },
	        {
	          value: '05:30',
	          label: '05:30'
	        },
	        {
	          value: '06:00',
	          label: '06:00'
	        },
	        {
	          value: '06:30',
	          label: '06:30'
	        },
	        {
	          value: '07:00',
	          label: '07:00'
	        },
	        {
	          value: '07:30',
	          label: '07:30'
	        },
	        {
	          value: '08:00',
	          label: '08:00'
	        },
	        {
	          value: '08:30',
	          label: '08:30'
	        },
	        {
	          value: '09:00',
	          label: '09:00'
	        },
	        {
	          value: '09:30',
	          label: '09:30'
	        },
	        {
	          value: '10:00',
	          label: '10:00'
	        },
	        {
	          value: '10:30',
	          label: '10:30'
	        },
	        {
	          value: '11:00',
	          label: '11:00'
	        },
	        {
	          value: '11:30',
	          label: '11:30'
	        },
	        {
	          value: '12:00',
	          label: '12:00'
	        },
	        {
	          value: '12:30',
	          label: '12:30'
	        },
	        {
	          value: '13:00',
	          label: '13:00'
	        },
	        {
	          value: '13:30',
	          label: '13:30'
	        },
	        {
	          value: '14:00',
	          label: '14:00'
	        },
	        {
	          value: '14:30',
	          label: '14:30'
	        },
	        {
	          value: '15:00',
	          label: '15:00'
	        },
	        {
	          value: '15:30',
	          label: '15:30'
	        },
	        {
	          value: '16:00',
	          label: '16:00'
	        },
	        {
	          value: '16:30',
	          label: '16:30'
	        },
	        {
	          value: '17:00',
	          label: '17:00'
	        },
	        {
	          value: '17:30',
	          label: '17:30'
	        },
	        {
	          value: '18:00',
	          label: '18:00'
	        },
	        {
	          value: '18:30',
	          label: '18:30'
	        },
	        {
	          value: '19:00',
	          label: '19:00'
	        },
	        {
	          value: '19:30',
	          label: '19:30'
	        },
	        {
	          value: '20:00',
	          label: '20:00'
	        },
	        {
	          value: '20:30',
	          label: '20:30'
	        },
	        {
	          value: '21:00',
	          label: '21:00'
	        },
	        {
	          value: '21:30',
	          label: '21:30'
	        },
	        {
	          value: '22:00',
	          label: '22:00'
	        },
	        {
	          value: '22:30',
	          label: '22:30'
	        },
	        {
	          value: '23:00',
	          label: '23:00'
	        },
	        {
	          value: '23:30',
	          label: '23:30'
	        },
	        {
	          value: '24:00',
	          label: '24:00'
	        },
	      ],
	      timeId:"",
	      modify:[],
	
	//              设施分段时间
	      period:false,
	      periodxxx:false,
	
	      adddata:[],
      	cateList: [1,2,3,4,5,6,7,8,9],
        cate: [],
      	modal1:false,
      	modal2:false,
      	modal3:false,
      	modal4:false,
      	modal5:false,
      	addstyle:0,//控制样式切换
      	htmlname:'',
      	state:1,
      	seledata:"and",
      	
        unitArr:[],
        timeArr:[],
        currencyArr:[],
        xqmbflArr:[],
        supply_unit_type:'',
        supply_period_type:'',
        loading2:false,
        disabled:false,
        tableHeight:520,
        loading:false,
        offset:0,
        limit:15,
        current:1,
        sort:null,
        order:null,
        totalCount:0,
        advancedSearch:false,
        formCustom: {
          ownerNames:[],
          category:[],
          groupId:[],
          subject:'',
          status:'',
          ownerMemberDisplayName:'',
          display:'',
          productType:'',
          timeType:'',
          startTime:'',
          endTime:'',
        },
        ruleCustom: {
          subject: [
            { validator: validateKey, trigger: 'blur' }
          ]
        },
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left'
          },
          {
            title: '关键词',
            key: 'kw_keywords',
            align: 'center',
            width: 120,
            fixed: 'left'
          },
          {
            title: '搜索热度',
            key: 'kw_search_hot',
            align: 'center',
            width: 120,
            sortable: 'custom',
            render:(h,params)=>{
            	return h('div', {
	              
	            },params.row.kw_search_hot>0?params.row.kw_search_hot:0);
            }
          },
          {
            title: '竞争度',
            key: 'kw_company_cnt',
            align: 'center',
            width: 120,
            sortable: 'custom',
            render:(h,params)=>{
            	return h('div', {
	              
	            },params.row.kw_company_cnt>0?params.row.kw_company_cnt:0);
            }
          },
          {
            title: '橱窗数',
            key: 'kw_showwin_cnt',
            align: 'center',
            width: 120,
            sortable: 'custom',
            render:(h,params)=>{
            	return h('div', {
	              
	            },params.row.kw_showwin_cnt>0?params.row.kw_showwin_cnt:0);
            }
          },
          {
            title: '曝光量',
            key: 'impression',
            align: 'center',
            sortable: 'custom',
            width: 120,
            render:(h,params)=>{
            	return h('div', {
	              
	            },params.row.impression?params.row.impression:0);
            }
//          sortable: 'custom',
          },
          {
            title: '点击量',
            key: 'click',
            align: 'center',
            width: 120,
            sortable: 'custom',
            render:(h,params)=>{
            	return h('div', {
	              
	            },params.row.click?params.row.click:0);
            }
          },
          {
            title: '自然排名',
            key: 'ranking',
            align: 'center',
            width: 120,
//          sortable: 'custom',
          },
          {
            title: '标题',
            key: 'keywordstitle',
            align: 'center',
            sortable: 'custom',
            width: 300,
//          sortable: 'custom',
          },
          {
                title: '加入P4P推广',
                key: 'is_in_p4p',
                "width":150,
                align: 'center',
                fixed: 'right',
//              sortable:"custom",
                render:(h,params)=>{
                  if(params.row.is_in_p4p=="未加入"){
                    return h('div', {
                      style:{
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.promoName=params.row.kw_keywords;
                          this.promotefun();
                        }
                      }
                    },params.row.is_in_p4p);
                  }else {
                    return h('div', {},params.row.is_in_p4p);
                  }
                }
              },
          {
            title: 'P4P排名',
            key: 'pfp_pkw_rankings',
            align: 'center',
            width: 120,
            fixed: 'right',
            render:(h,params)=>{
              if(params.row.is_in_p4p!="未加入"){
              	return h('div', [
	              	h('span', {
	                  style: {
	                    display:"inline-block",
	                    width:"50px",
	                    color:"#0076e8",
	                    cursor:"pointer"
	                  },
	                  on:{
	                    click: () => {
	                        if(params.row.pfp_pkw_qs_star==0){
	
	                          this.$Notice.info({
	                            title: '推广评分为零不可修改价格',
	                          });
	
	                        }else {
	                          this.word_price=true;
	                          this.word_lowprice=params.row.pfp_pkw_base_price;
	                          this.word_wordsprice=params.row.kw_keywords;
	                          this.word_pricevalue=params.row.pfp_pkw_price;
	                          this.word_pricevalue2=params.row.pfp_pkw_price;
	                          this.word_PriceList(params.row.kw_keywords)
	                        }
	
	                    }
	                  }
	                },params.row.pfp_pkw_rankings>0?params.row.pfp_pkw_rankings:'其他位置'),
                ]);
              }else{
              	return h('div', [
	              	h('span', {
	                  
	                },params.row.pfp_pkw_rankings>0?params.row.pfp_pkw_rankings:'其他位置'),
                ]);
              }
            }
//          sortable: 'custom',
          },
           {
            title: 'P4P曝光量',
            key: 'pfp_pkw_impression_cnt',
            align: 'center',
            width: 120,
            sortable: 'custom',
          },
          
          {
            title: 'P4P点击量',
            key: 'pfp_pkw_click_cnt',
            align: 'center',
            width: 120,
            sortable: 'custom',
          },
          {
            title: 'P4P标题',
            key: 'pfpwordstitle',
            "width":300,
            align: 'center',
            sortable:"custom",
          }
         
        ],
        tableData:[],
        //          修改价格
	      word_price:false,
	      word_lowprice:"",
	      word_wordsprice:"",
	      word_pricevalue:"",
	      word_pricevalue2:"",
	      word_money:"",
	      word_front:[],
      }
    },
    created(){
      
    },
    mounted(){
    	if(this.$route.query.page==2){
    		this.groupid=2
    	}else if(this.$route.query.page==3){
    		this.groupid=3
    	}else if(this.$route.query.page==4){
    		this.groupid=6
    	}else
    	this.init();
    	this.word_balanceof();
    	this.getGroup();
    	this.viewgrouping()
    	this.getNumData()
      this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-175;
    },
    watch:{
    	groupid(){
    		this.keyname=''
      	this.init()
    	}
    },
    methods:{
    		//          查询账户余额
	      word_balanceof(){
	        this.api.accountp4p.data().then((res) => {
	          if(res.data.status==200){
	            this.word_money=(Number(res.data.mapInfo.budget)-Number(res.data.mapInfo.daycost)).toFixed(2)
	//                this.word_money=res.data.rows[0];
	          }
	        })
	      },
	    	//          查询关键词前5
	      word_PriceList(val){
	        this.api.showRank.find({reqData:{pfpPkwKeywords:val}}).then((res) => {
	          if (res.data.status == 200) {
	            this.word_front=res.data.rows;
	          }
	        })
	      },
	      word_priceok(){
		      var pricenum=Number(this.word_pricevalue);
		      var pricenum2=Number(this.word_lowprice);
		
		     if(!this.word_pricevalue){
		       this.$refs.word_price.visible = true;
		       this.word_price = true;
		       this.$Notice.warning({
		         title: '请填写价格',
		       });
		
		       console.log(this.word_lowprice);
		     }else if(pricenum<pricenum2){
		       this.$refs.word_price.visible = true;
		       this.word_price = true;
		       this.$Notice.warning({
		         title: '价格不能低于低价',
		       });
		     }else if(pricenum>this.word_money){
		       this.$refs.word_price.visible = true;
		       this.word_price = true;
		       this.$Notice.warning({
		         title: '价格超出余额',
		       });
		     } else {
		       this.api.fyPrice.find({reqData:{analysisType:this.tabAnalysisType,pfpPkwKeywords:this.word_wordsprice,pfpPkwPrice:this.word_pricevalue}}).then((res) => {
		         if (res.data.status == 200) {
		           this.$Notice.success ({
		             title: '修改成功',
		           });
		           this.init();
		         }
		       })
		     }
		
		
		  },
		  word_replace(val){
          this.word_pricevalue=val;
      },
      
    	//加入推广
    	promoteok(){
        if(!this.verpromote){
          this.$Notice.info({
            title: '请选择关键词分组',
          });
        }else {
            var list=[];
            var obj={
              keywords:this.promoName,
              tagName:this.verpromote
            };
            list.push(obj);
            this.api.wordsToAd.find({reqData:list}).then((res) => {
              this.bthloading=false;
              if(res.data.status==200){
                this.$Notice.success({
                  title: '添加成功',
                });
                this.init();
              }
            });

        }

      },
      
    	//        查看分组
	    viewgrouping(){
	      this.api.group_Lexicon.find().then((res) => {
	        if(res.data.status==200){
	          console.log(res.data.rows);
	          this.viewlist=res.data.rows;
						
	        }
	      });
	    },
	    search(){
	      this.totalCount=0;
	      this.current=1;
	      this.limit=5;
	      this.offset=0;
	      this.init({kwKeywords:this.keyname})
	    },
    	promotefun(){
	      this.verpromote="",
	        this.api.tabelAllGroup.del().then((res) => {
	          if(res.data.status==200){
	            this.promoteData=res.data.rows
	            this.promote=true;
	          }
	        });
	    },
    	getGroup(){
	    	this.$http('alibaba/productImproveAction/selectGroup',{grouptype:'keyword'}).then(data =>{
    			this.groupList=data.rows
    		})
	    },
	    addGroup(){
	    	if(this.groupname==''||!this.groupname){
	    		this.$Notice.warning({
            title: '提示',
            desc: '分组名不能为空'
          });
          return false
	    	}
	    	this.$http('alibaba/productImproveAction/addGroup',{groupname:this.groupname,grouptype:'keyword'}).then(data =>{
	    		this.groupname=''
	    		this.getGroup()
	    	})
	    },
	    editGroup(){
	    	this.$http('alibaba/productImproveAction/updateGroup',{groupid:this.groupid,groupname:this.groupname}).then(data =>{
	    		this.groupname=''
	    		this.getGroup()
	    	})
	    },
	    delGroup(){
	    	this.$http('alibaba/productImproveAction/deleteGroup',{groupid:this.groupid}).then(data =>{
	    		this.groupid=1
	    		this.getGroup()
	    	})
	    },
	    getNumData(){
	    	this.$http('alibaba/productImproveAction/getAllNum',{grouptype:'keyword'}).then(data =>{
	    		this.numData=data.rows[0]
	    	})
	    },
	    changeGroup(){
	    	this.$http('alibaba/productImproveAction/updateProductGroup',{groupid:this.changeGroupid,keywordId:this.keywordId.join(',')}).then(data =>{
	    		//this.numData=data
	    	})
	    },
    	
    	//        控制子组件加载
      notify(name) {
          console.log(name);
        if (name=="name2") {
          this.$refs.child.parentMsg()
        }
        if(name=="name1"){
          this.init();
          this.initsele();
          this.tableHeight =this.$refs.tabeheig.offsetHeight -100;
        }
      },

//        移动策略表位置
      fuck(val,i,id){
        console.log(val);
        console.log(i);
        console.log(id);
        this.api.moveStrategydata.data({reqData:{stId:id,stSort:i+1,moveType:val}}).then((res) => {
          if(res.data.status==200){
            this.init();
          }
        });
      },

      queryinit(){
        this.totalCount=0;
        this.current=1;
        this.limit=15;
        this.offset=0;
        this.init();
      },
      init(data){
        this.loading=true;
        var list;
        if(this.single){
            list=1
        }else {
            list=0
        }
        this.changedata=[];
        if(data||this.keyname!=''){
        	this.$http('alibaba/keyWordsImproveAction/showProductList',{sort:sort,order:order,kwKeywords:this.keyname,groupId:this.groupid}).then(res=>{
		        this.loading=false;
		        this.tableData=res.rows
		        this.totalCount=res.total
		        console.log(this.tableData)
	//	        if(res.data.status=="200"){
	//	          this.datalist=res.data.rows;
	//	          this.totalCount=res.data.total
	//	        }
		      })
        }else{
        	this.$http('alibaba/keyWordsImproveAction/showProductList',{sort:sort,order:order,currentPage:this.current,showCount:this.limit,groupId:this.groupid}).then(res=>{
		        this.loading=false;
		        this.tableData=res.rows
		        this.totalCount=res.total
		        console.log(this.tableData)
	//	        if(res.data.status=="200"){
	//	          this.datalist=res.data.rows;
	//	          this.totalCount=res.data.total
	//	        }
		      })
        }
        
      },
      sortChange(column){
      	this.$nextTick(function () {
          this.$http('alibaba/keyWordsImproveAction/showProductList',{currentPage:1,showCount:15,groupId:this.groupid,sort:this.util.changeStr(column.key),order:column.order}).then(res=>{
		        sort = this.util.changeStr(column.key);
		        order = column.order;
		        this.loading=false;
		        this.tableData=res.rows
		        this.totalCount=res.total
		      })
        })
      },
      tabelchange(selection){
          console.log(selection);
          this.changedata=[];
          this.runstate=[];
          this.keywordId=[];
          this.seoGroupList={};
//          runstate
          for(var i=0;i<selection.length;i++){
          	this.keywordId.push(selection[i].kw_id)
            this.changedata.push(selection[i].psId);
            this.runstate.push(selection[i].psStatus);
            if(!this.seoGroupList[selection[i].pkwGroupId]){
            	this.seoGroupList[selection[i].pkwGroupId]=[]
            }
            this.seoGroupList[selection[i].pkwGroupId].push(selection[i].kw_id)
          }
          console.log(this.seoGroupList);
//        console.log(this.changedata)
      },
      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
        this.init();
      },
      changePageSize(pageSize){
        this.limit = pageSize;
        this.init();
      },
//          新增策略
       addnew(){
          if( this.addpullsta=="0"){
            var sta,pri,pri2;
            if(this.strategyname){
              if(this.immediately){sta=1}else{sta=2};
//                if(this.seledata2=="差价"){pri=this.difference;pri2="";}else{pri="";pri2=this.difference2;};



              if(this.mobileIds.length==0){
                this.mobileIds=""
              }else {
                this.mobileIds=this.mobileIds.join(",");
              }

              var obj={
                psName:this.strategyname,
                psStatus:sta,
                psRankingTendency:this.seledata,
                psDiffPrice:this.difference,
                psDiffPriceProp:this.difference2,
                psPriceRange:this.price2,
                dicCode:this.heisele,
                psKeywordsCount:this.keywrod,
                strategyTimes:this.modify,//投放时间
                keywordIds:this.mobileIds,
                strategyChilds:this.adddata,
                psDiffType:this.seledata2
              };

              console.log(obj);
              this.api.addNewStrat.data({reqData:obj}).then((res)=>{
                if(res.data.status=="200"){
                  this.init();
                }
              })
            }else {
              this.$Notice.warning({
                title: '请填写策略名',
              });
              this.$refs.addmodal.visible = true;
              this.addmodal=true
            }
          }else {

            var sta,pri,pri2;
            if(this.strategyname){
              if(this.immediately){sta=1}else{sta=2};
//                if(this.seledata2=="差价"){pri=this.difference;pri2="";}else{pri="";pri2=this.difference2;};

              var obj={
                psId:this.paramsId,
                psName:this.strategyname,
                psStatus:sta,
                psRankingTendency:this.seledata,
                psDiffPrice:this.difference,
                psDiffPriceProp:this.difference2,
                psPriceRange:this.price2,
                dicCode:this.heisele,
                psKeywordsCount:this.keywrod,
                strategyTimes:this.modify,//投放时间
                strategyChilds:this.adddata,
                psDiffType:this.seledata2
              };

              this.api.modifyStrategypull.data({reqData:obj}).then((res)=>{
                if(res.data.status=="200"){
                  this.init();
                  this.$Notice.success({
                    title: '修改成功',
                  });
                }
              })
            }else {
              this.$Notice.warning({
                title: '请填写策略名',
              });
              this.$refs.addmodal.visible = true;
              this.addmodal=true
            }


          }

       },

      addmodalfun(){
        this.keywrodnum="0";
        this.addpullsta="0";

        this.modetext="新建策略";
        this.control="0";
        this.jiacistatus="0";
        this.batchtimestatus="0";
//               第一个模态框
        this.strategyname="";
        this.seledata="5";
        this.seledata2="diff_price";
        this.difference="";
        this.difference2="";
        this.singleprice=false;

        this.price2="";
        this.initsele();
        this.singltime=false;
        this.keywrod=0;
        this.levelsingl=false;
        this.immediately=true;



        this.addmodal=true;
        this.modify=[];
        this.fruit=[];
        this.listinit=[];
        this.diqu=[];

//            分段出价数据
        this.adddata=[];
        this.chajia=[];
        this.keepdata=[];
        this.keepname=[];
        this.allvalindex="";

//            添加关键词;
        this.mobileIds=[];
        this.mobiledata=[];
        this.data4=[];
        this.existing=[];


        this.keywordsshow=true

      },
//          查询策略高于出价状态
      initsele(){
        this.api.findBidSta.data().then((res)=>{
          if(res.data.status=="200"){
            console.log(res.data.rows);
            this.heicityList=res.data.rows;
//                this.heisele="PAUSSE";
          }
        })
      },
//          暂停，启用
      separate(status,id){
        var list=[];
        var obj={
          psId:id,
          psStatus:status
        }
        list.push(obj);
        this.api.modifyStrategy.data({reqData:list}).then((res)=>{
          if(res.data.status=="200"){
            this.init();
          }
        })
      },
      suspended(status){
         if(this.changedata.length>0){
           var list=[];
           for(var i=0;i<this.changedata.length;i++){
               var obj={
                 psId:this.changedata[i],
                 psStatus:status
               }
             list.push(obj);
           }

           console.log(list);
           this.api.modifyStrategy.data({reqData:list}).then((res)=>{
             if(res.data.status=="200"){
                this.init();
             }
           })
         }else {
           this.$Notice.warning({
             title: '请选择策略',
           });
         }
      },
//          删除
      suspdelete(){
        if(this.changedata.length<1){
          this.$Notice.warning({
            title: '请需要删除的选择策略',
          });
        }else if(this.runstate.indexOf(1)!==-1){
          this.$Notice.warning({
            title: '已启动的策略不可以删除',
          });
        }else {
          var list=this.changedata.join(",");
          console.log(list)
          this.api.Strategydel.data({params:[list]}).then((res)=>{
            if(res.data.status=="200"){
              this.$Notice.success({
                title: '删除成功',
              });
              this.init();
            }
          })
        }

      },
//          选择投放时间
      choosetime(){
        this.puttime=true;
        this.chooinit();
      },

      chooinit(){
        this.api.findPutIn.data().then((res)=>{
          if(res.data.status=="200"){
            this.timedata=res.data.rows;
            if(this.control==1){
              for (var i=0;i<this.timedata.length;i++){
                for(var t=0;t<this.listinit.length;t++){
                  if(this.timedata[i].dicName==this.listinit[t].dicName){
                    this.diqu[i]=true;
                  }
                }
              }
            }
          }
        })
      },
      chechange(i,id){
          if(this.diqu[i]){
            this.api.PutInAreaTimes.data({params:[id]}).then((res)=>{
              if(res.data.status=="200"){
                for(var i=0;i<res.data.rows.length;i++){
                  this.listinit.push(res.data.rows[i]);
                  this.fruit.push(['1','2','3','4','5','6','7']);
                }
              }
            });
            console.log(this.listinit)
          }else {
           for(var i=0;i<this.listinit.length;i++){
               if(this.listinit[i].dicCode==id){
                   this.listinit.splice(i,1);
                   this.fruit.splice(i,1);
                    i = i - 1;
               }
           }
           console.log(this.listinit);
          }
      },
      choodell(i){
        this.listinit.splice(i,1);
        this.fruit.splice(i,1);
      },
//          修改
      choopull(sta,end,i){
          console.log(end)
        this.timemodal=true;
          this.startime=sta;
          this.endtime=end;
          this.timeId=i;
      },
      choopullok(){
        this.listinit[this.timeId].atStartTime=this.startime;
        this.listinit[this.timeId].atEndTime= this.endtime;
      },

//          新增
      chooadd(){
          var obj={
            dicCode: "zdy",
            atStartTime: "00:00",
            atEndTime: "00:30",
            dicName: "自定义",
          };
        this.fruit.push(['1','2','3','4','5','6','7']);
        this.listinit.push(obj);
      },

//          确定投放所有数据
      castok(){
        console.log(this.fruit);
        console.log(this.listinit);
        this.modify=[];
        for(var i=0;i<this.listinit.length;i++){
          var time={
            pstWeeks:this.fruit[i].join(""),
            pstStartTime:this.listinit[i].atStartTime,
            pstEndTime:this.listinit[i].atEndTime,
            dicCode:this.listinit[i].dicCode,
          }
          this.modify.push(time)
        }
        console.log(this.modify);

        if(this.batchtimestatus==1){
          var pid=this.changedata.join(",");

          this.api.modifyPutInTimedata.data({reqData:{psId:pid,strategyTimes:this.modify}}).then((res)=>{
            if(res.data.status=="200"){
              console.log(res.data.rows);
              this.$Notice.success({
                title: "修改成功",
              });
            }
          })
        }
      },
//          设置分段时间
      periodinit(){
        this.period=true;
      },
      periodpull(i){
        this.periodxxx=true;
        this.starperiod=this.adddata[i].strategyTimes[0].pstStartTime;
        this.endperiod=this.adddata[i].strategyTimes[0].pstEndTime;
        this.ranking=this.adddata[i].psRankingTendency;
        this.category=this.adddata[i].psDiffType;
        this.proportion=this.adddata[i].psDiffPrice;
        this.proportiondata=this.adddata[i].psDiffPriceProp;
        this.ceiling=this.adddata[i].psPriceRange;
        this.uqceiling=this.keepname[i];
        this.allvalindex=i;
      },
      periodnew(){
        var obj= {
          strategyTimes:[{pstStartTime:"00:00",pstEndTime:"00:30"}],
          psRankingTendency:"",
          psDiffPrice:"",
          psDiffPriceProp:"",
          psPriceRange:"",
          dicCode:"",
          psDiffType:""
        };

        this.adddata.push(obj);
        this.chajia.push("");
        this.keepdata.push("");
        this.keepname.push("");
        console.log(this.keepdata);
      },

//          分段时间确认
      periodok(){

          console.log(this.adddata)
      },
      perioddele(i){
        this.adddata.splice(i,1);
        this.chajia.splice(i,1);
        this.keepdata.splice(i,1);
        this.keepname.splice(i,1);

        console.log(this.adddata);
        console.log(this.chajia);
        console.log(this.keepdata);
      },
      perinewadd(){
        for(var i=0;i<this.heicityList.length;i++){
            if(this.uqceiling==this.heicityList[i].dicCode){
              this.keepdata[this.allvalindex]=this.heicityList[i].dicName;
              this.keepname[this.allvalindex]=this.heicityList[i].dicCode;
            }
        }
        this.adddata[this.allvalindex].strategyTimes[0].pstStartTime=this.starperiod;
        this.adddata[this.allvalindex].strategyTimes[0].pstEndTime=this.endperiod;
        this.adddata[this.allvalindex].psRankingTendency=this.ranking;
        this.adddata[this.allvalindex].psDiffType=this.category;
        this.adddata[this.allvalindex].psDiffPrice=this.proportion;
        this.adddata[this.allvalindex].psDiffPriceProp=this.proportiondata;
        this.adddata[this.allvalindex].psPriceRange=this.ceiling;
        this.adddata[this.allvalindex].dicCode=this.keepname[this.allvalindex];
      },


//          设置优先
      priorityto(){
          if(this.changedata.length<1 ){
            this.$Notice.warning({
              title: '请选择策略',
            });
          }else if(this.changedata.length>1){
            this.$Notice.warning({
              title: '只能设置一个策略优先',
            });
          }else {
            this.api.setFirstStrat.data({reqData:{psId:this.changedata[0]}}).then((res)=>{
              if(res.data.status=="200"){
                console.log(res.data.rows);
                this.$Notice.success({
                  title: '设置成功',
                });
                this.init()
              }
            })
          }

      },
//          移除低星词
      removestar(){
        this.api.removeLowerStarKey.data().then((res)=>{
          if(res.data.status=="200"){
            console.log(res.data.rows);
            this.$Notice.success({
              title: res.data.info,
            });
          }
        })
      },
//          加词
      jiaci(id,sta){
        if(sta=="1"){
          this.$Notice.warning({
            title: '已启用的策略不可加词',
          });
        }else {
          this.jiacistatus="1";
          this.jiaciId=id;
          this.mobileIds=[];
          this.mobiledata=[];
          this.data4=[];
          this.existing=[];

          this.keywordsinit();
          this.api.KeywordsForStrategy.data({params:[id]}).then((res)=>{
            if(res.data.status=="200"){
              console.log(res.data.rows);
              for(var i=0;i<res.data.rows.length;i++){
                var obj={
                  name:res.data.rows[i].pfpPkwKeywords,
                  id:res.data.rows[i].pfpPkwId,
                };
                this.mobiledata.push(obj)
              }
              this.data4=this.mobiledata;
            }
          })
        }

      },

//          批量修改投放时间
      batchtime(){
          console.log(this.runstate);
        if(this.changedata.length<1){
          this.$Notice.warning({
            title: '请需要修改的选择策略',
          });
        }else if(this.runstate.indexOf(1)!==-1){
          this.$Notice.warning({
            title: '已启动的策略不可以修改',
          });
        }else {
          this.batchtimestatus="1";
          this.modify=[];
          this.fruit=[];
          this.listinit=[];
          this.diqu=[];
          this.choosetime();
          console.log(this.changedata);
        }
      },

//          获取修改信息
      getinfo(id,sta){
        if(sta=="1"){
          this.$Notice.warning({
            title: '已启用的策略不可修改',
          });
        }else {
          this.paramsId=id;
          this.api.getStrategyInfodata.data({params:[id]}).then((res)=>{
            if(res.data.status=="200"){
              this.addpullsta="1";
              var objdata=res.data.mapInfo.strategy;
              this.seledata=objdata.psRankingTendency;//排名倾向
              console.log(this.seledata);
              this.seledata=this.seledata.toString();
              console.log(this.seledata);
              this.modetext="修改策略";
              console.log(objdata);
              this.addmodal=true;//控制模态框显示隐藏
              this.keywordsshow=false;//控制是否显示加词部分
              this.strategyname=objdata.psName;//名字

              this.seledata2=objdata.psDiffType;//差价类别
              this.difference=objdata.psDiffPrice;//差价
              this.difference2=objdata.psDiffPriceProp;//差价比
              this.singleprice=false;//价格上限是否可填写

              if(objdata.psPriceRange){
                this.singleprice=true;
              }else {
                this.singleprice=false;
              }

              this.price2=objdata.psPriceRange;//价格上限
              this.heisele=objdata.dicCode;//高于价格上限

              this.singltime=false; //投放时间是否可填写
              if(objdata.strategyTimes.length>0){
                this.singltime=true
              }else {
                this.singltime=false;
              }

              this.keywrod=0;
              this.levelsingl=false; //分段时间是否可填写

              if(objdata.strategyChilds.length>0){
                this.levelsingl=true;
              }else {
                this.levelsingl=false;
              }

              this.immediately=false; //是否立即启用策略
//                  修改投放时间参数
              this.listinit=[];//投放时间列表
              this.fruit=[];//投放星期1234567
              this.modify=[];
              this.diqu=[];

              this.batchtimestatus="0";
              this.control="1";
              for(var i=0;i<objdata.strategyTimes.length;i++){
                var obj={
                  dicCode:objdata.strategyTimes[i].dicCode,
                  atStartTime:objdata.strategyTimes[i].pstStartTime,
                  atEndTime:objdata.strategyTimes[i].pstEndTime,
                  dicName:objdata.strategyTimes[i].dicName,
                }
                this.listinit.push(obj);
                var arr=objdata.strategyTimes[i].pstWeeks.split("");
                this.fruit.push(arr);
              }
//                  修改分段时间参数
              this.adddata=[];
              this.keepdata=[];
              this.keepname=[];
              this.allvalindex="";
              var objchilds=objdata.strategyChilds;
              for(var i=0;i<objchilds.length;i++){

                for(var x=0;x<this.heicityList.length;x++){
                  if(objchilds[i].dicCode==this.heicityList[x].dicCode){
                    this.keepdata[i]=this.heicityList[i].dicName;
                    this.keepname[i]=this.heicityList[i].dicCode;
                  }
                }

                var obj= {
                  strategyTimes:[{pstStartTime:objchilds[i].strategyTimes[0].pstStartTime,pstEndTime:objchilds[i].strategyTimes[0].pstEndTime}],
                  psRankingTendency:objchilds[i].psRankingTendency,
                  psDiffPrice:objchilds[i].psDiffPrice,
                  psDiffPriceProp:objchilds[i].psDiffPriceProp,
                  psPriceRange:objchilds[i].psPriceRange,
                  dicCode:this.keepname[i],
                  psDiffType:objchilds[i].psDiffType
                };
                this.adddata.push(obj);
              }

              console.log(this.keepname);
              console.log(this.keepdata);


//                  this.chajia=[];
//                  this.keepdata=[];
//                  this.keepname=[];
//                  this.allvalindex="";



            }
          })
        }

      },
    	
    	seo(){
    		this.$router.push({name:'batch',params:{seoGroupList:this.seoGroupList}})
    	},
//          自定义列确定
      word_columnshow(){
        this.modal4=true;
        this.api.CustomList.del({params:["ck"]}).then((res) => {
          if(res.data.status==200){
//                this.word_columndata
              this.word_columndata=res.data.rows;
              this.word_zdylist=[];
              this.word_zdylist2=[];

              console.log(this.word_columndata);
              for(var i =0;i<this.word_columndata.length;i++){
                if(this.word_columndata[i].pccIsChoose==1){
                  this.word_zdylist.push(this.word_columndata[i]);
                }else {
                  this.word_zdylist2.push(this.word_columndata[i]);
                }
              }

          }
        });
      },
      word_columnok(){
        var list=this.word_zdylist.concat(this.word_zdylist2);
        var data=[];
        for(var i=0;i<list.length;i++){
          var obj={
            pccIsChoose:list[i].pccIsChoose,
            dicId:list[i].dicId,
            pccSort:i+1,
            pccTableCode:"ck"
          }
          data.push(obj)
        }
        this.api.saveP4PColumn.find({reqData:data}).then((res) => {
          if (res.data.status == 200) {
            this.$Notice.success({
              title: '修改成功',
            });
            this.word_init();
          }
        })
      },
//          自定义列上下移
      zdy_word_swapItems(index,index2){
        this.word_zdylist[index] = this.word_zdylist.splice(index2, 1, this.word_zdylist[index])[0];

        console.log(this.word_zdylist);
      },
      zdy_word_upRecord($index){
          console.log(1)
        if($index == 0) {
          return;
        }
        this.zdy_word_swapItems($index, $index - 1);

      },
      zdy_word_downRecord($index){
          console.log(2)
        if($index == this.word_zdylist.length -1) {
          return;
        }
       this.zdy_word_swapItems($index, $index + 1);
      },


      word_delearr(index){
        this.word_zdylist[index].pccIsChoose=0;
        this.word_zdylist2.push(this.word_zdylist[index]);
        this.word_zdylist.splice(index,1);
      },
      word_plusadd(index){
        this.word_zdylist2[index].pccIsChoose=1;
        this.word_zdylist.push(this.word_zdylist2[index]);
        this.word_zdylist2.splice(index,1);
      },
      word_alltitle(){
          for(var i=0;i<this.word_zdylist2.length;i++){
            this.word_zdylist2[i].pccIsChoose=1;
            this.word_zdylist.push(this.word_zdylist2[i]);
            this.word_zdylist2.splice(i,1);
            i=i-1;
          }
      },
          
          
    	allot(){
    		if(this.keywordId.length==0){
    			this.$Notice.warning({
	          title: '提示',
	          desc: '请选择关键词'
	        });
	        return false
    		}
    		if(this.groupList.length==0){
    			this.$Notice.warning({
	          title: '提示',
	          desc: '请新建分组，系统默认分组无法分配'
	        });
	        return false
    		}
    		this.modal5=true
    	},
    	newfile(){//新建分组
	      this.modal1 = true;
	      this.htmlname='';
	      this.htmldata=[""];
	    },
	    arrnull(arr,tilete){
			  for(var i = 0;i<arr.length;i++){
			    if(arr[i]==''||arr[i]==null||typeof(arr[i])==undefined){
			       this.state=2;
			        break
			    }
			  }
			  if(!tilete){
			    this.state=2;
			  }
			
			  console.log(this.state);
			},
    	modelok () {//新建分组模态框，点击确定按钮事件
	      this.arrnull(this.htmldata,this.htmlname);//判断数据中是否有空
	      
	
	    },
    	//          词库表数据加载
      listloading(){
        this.loading = true;
        this.api.group_Info.find({
          reqData:{
            wgId:this.deleId,
            offset:this.offset,
            limit:this.limit,
            sort:this.sortType,
            order:this.order
          }}).then((res)=>{
          console.log(res);
          this.data1=res.data.rows;
          this.totalCount = Number(res.data.total);
          this.loading =false;
        })
      },
//    //分页
//    changePage(currentPage){
//      this.offset = (currentPage-1)*this.limit;
//      this.current = currentPage;
//    },
//    //切换每页显示的条数
//    changePageSize(pageSize){
//      this.limit = pageSize;
//      console.log("切换每页显示的条数");
//      this.listloading();
//    },
    	addclass(){//切换class
	      
	    },
    	delehtml(){//删除接口模态框
        this.modal3=true;
        
	    },
    	pullshow(){//编辑分组模态框
	      this.modal2=true;
	    },
    }  
  };
</script>
<style scoped>
  .cursor{
    cursor: pointer;
  }
  .width_150{
    width: 150px;
  }
  .width_160{
    width: 160px;
  }
  .width_260{
    width: 260px;
  }
  .width_500{
    width: 528px;
  }
  .color_blue{
    color: #2d8cf0;
    line-height: 38px;
    font-size: 15px;
  }
  .width_260{
    width: 260px;
  }
  .width_200{
    width: 200px;
  }
  .ml_40{
    margin-left: 40px;
  }
  .priceSetting-box{
    width: 100%;
    padding-left: 100px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .priceSetting-con{
    width: 60%;
    border: 1px solid #dddee1;
    float: left;
  }
  .priceSetting-con dt{
    background: #ebf0f5;
    padding: 10px;
  }
  .priceSetting-con dd{
    padding-top:15px;
  }
  .priceSetting-preview{
    width: 30%;
    float: left;
    margin-left: 10px;
    border: 1px solid #dddee1;
    min-height: 177px;
  }
  .priceSetting-preview dt{
    padding: 10px;
    border-bottom: 1px solid #dddee1;
  }
  .priceSetting-preview dd{
    padding:15px;
  }
  .priceSetting-preview dd div{
    line-height: 25px;
  }
  .color_red{
    color: red;
  }
  .color_gray{
    color: #999999;
  }
  .center{
    text-align: center;
  }

  /*图片*/
  .img_serial{
    height: 40px;
    line-height: 40px;
    background: #ebf0f5;
  }
  .img_serial>span{
    display: inline-block;
    text-align: center;
  }
  .img_serial>span:first-child{
    width:6%;
  }
  .img_serial>span:nth-child(2){
    width:18%;
  }
  .img_serial>span:nth-child(3){
    width:37%;
  }
  .img_serial>span:nth-child(4){
    width:37%;
  }



  .img_ul{
    height: 210px;
    overflow: auto;
  }

  .img_ul li{
    width: 830px;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #DDDDDD;
  }
  .img_ul li>span{
    display: inline-block;
    text-align: center;
  }
  .img_ul li>span:first-child{
    width: 44.5px;
  }

  .img_ul li>span:nth-child(2){
    width: 134.5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .img_ul li>div{
    display: inline-block;
    height: 70px;
    line-height: 70px;
    vertical-align: middle;
    width:310px;
    padding-top: 13px;
  }
  .img_ul li>div>label{
    width: 45px;
    height: 45px;
    margin-right:2px;
    border: 1px solid #DDDDDD;
    text-align: right;
  }
  .img_ul li>div>label img{
    width:100%;
    height:100%;
    margin-left: -45px;
  }

  .imgarr{
    display: inline-block;
    height: 70px;
    line-height: 70px;
    vertical-align: middle;
    width:310px;
    padding-top: 13px;
  }
  .imgarr>img{
    display: inline-block;
    width: 45px;
    height: 45px;
    margin-right:2px;
    border: 1px solid #DDDDDD;
  }

  .img_body{
    height: 50px;
    line-height: 50px;
    overflow: hidden;
  }
  .img_body>p:first-child{
    float: left;
  }
  .img_body>p:first-child>span:nth-child(2){
    border-right: 1px solid #CCCCCC;
  }
  .img_body>p:first-child>span{
    padding:0 15px;
    color:#2d8cf0;
    cursor: pointer;
  }
  .img_body>p:last-child{
    float: right;
  }
  .img_tiele>p{
    height: 40px;
    line-height: 40px;
    background: #ebf0f5;
  }
  .img_tiele>p>span,.img_tiele li>span{
    display: inline-block;
    text-align: center;
  }

  .img_tiele>p>span:first-child{
    width:7%;
  }
  .img_tiele>p>span:nth-child(2){
    width:68%;
  }
  .img_tiele>p>span:nth-child(3){
    width:24%;
  }
  .img_tiele li{
    padding: 5px 0;
    height: 70px;
    line-height: 60px;
    border-bottom:1px solid #CCCCCC;
  }

  .img_tiele ul{
    max-height: 210px;
    overflow-y: auto;
  }

  .img_tiele li img{
    height: 60px;
    max-width: 100%;
    vertical-align: middle;
  }

  .img_tiele li>span:first-child{
    width:7%;
  }
  .img_tiele li>span:nth-child(2){
    width:68%;
  }
  .img_tiele li>span:nth-child(3){
    width:24%;
  }
  .img_tiele li>span>b{
    font-size: 16px;
    padding: 5px 15px;
    cursor: pointer;
  }
  .img_tiele li>span>b:hover{
    color: #00a1ff;
  }
  @media screen and (max-width: 1599px){
    .width_200{
      width: 180px;
    }
  }
  .headspan::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .headspan::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .headspan::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
  .headspan,.headspan>div{
    height:100%;
  }
  .headspan>div>div{
    height: 55px;
  }
  .headspan>div>ul{
    height:calc( 100% - 55px);
    overflow-y: auto;
  }
  .color_red{
    color: #f73838;
  }
  .group{
    border: 1px solid #dde3e8;
    border-top: 0;
    text-align: center;
  }
  .group li{
    line-height: 40px;
    font-size: 14px;
    color: #444444;
    border-bottom: 1px dashed  #dde3e8;
    cursor: pointer;
  }
  .group li:last-child{
    border-bottom: none;
  }
  .head{
    overflow: hidden;
    background: #ebf0f5;
    padding: 15px 10px;

    border: 1px solid #dde3e8;
    border-bottom: 0;
    font-size: 14px;
  }
  .check{
  	border-radius: 50%;
  	border: 1px solid #ccc;
  	width: 8px;
  	height: 8px;
  	display: inline-block;
  }
  .checkbox:checked+span{
  	background: #2d8cf0;
  	border: none;
  	border-radius: 50%;
  	width: 8px;
  	height: 8px;
  	display: inline-block;
  }
  .checkdiv{
  	margin-bottom: 10px;
  }
  .checkdiv:last-child{
  	margin-bottom: 0;
  }
  .allot{
  	max-height: 400px; overflow-y: auto;
  }
  .allot::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .allot::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .allot::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
  .word_modconten{
    height:calc(100% - 30px);
  }
  .word_modconten>ul{
    overflow: hidden;
  }
  .word_modconten li{
    height: 30px;
    line-height:30px;
    width:50%;
    float: left;
    text-align: center;
  }
  .word_modconten li span{
    display:inline-block;
    width:15px;
    height:30px;
    line-height:30px;
    text-align: center;
  }
  .word_modconten li span:hover{
    color: #57a3f3;
    cursor: pointer;
  }
  .word_modtile{
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    cursor: pointer;
  }
  .word_modtile>span:hover{
    color: #57a3f3;
  }
  .word_modwih{
    border: 1px solid #DDDDDD;
    height:300px;
  }
  .word_modwih>div:nth-child(1){
    height:30px;
    line-height: 30px;
    padding-left: 15px;
    background: #ebf0f5;
  }

  .word_btnspan:hover .word_btnhide{
    display: block;
  }
  .word_btnhide li:hover{
    color: #57a3f3;
    cursor: pointer;
  }
  .word_btnspan{
    position: relative;
    display: inline-block;
    height: 41px;
  }
  .word_btnhide{
    display: none;
    position:absolute;
    left:0;
    top:102%;
    width:100%;
    border: 1px solid #DDDDDD;
    text-align: center;
    background: #ffffff;
    z-index: 1000;
  }

  .word_btnstyle>div{
    float: right;
  }
  .word_btnstyle>div>button,.word_btnstyle>div>span{
    margin-left: 15px;
  }
  .word_modconten .word_listname{
    display: inline-block;
    width: 60px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  
  .keystyle>li:nth-child(even){
  background: #F8F9F9;
  }



#tabelmain{
  padding:0;
}


.ivu-tabs-bar{
  margin-bottom:0;
}
.tabtn{
  text-align: right;
  margin-bottom:10px;
}
.tabtn>button{
  width: 120px;
  text-align: center;
}
.modeconten>p:first-child{
  padding:15px 0;
  border-bottom: 1px solid #DDDDDD;
}
.modeconten>p{
  padding-top: 15px;
}
.nameofthe{
  display: inline-block;
  width: 100px;
  text-align: right;
  vertical-align:middle;
}
.timetabel>p:first-child{
  height:40px;
  line-height:40px;
  background: #ebf0f5;
}
.timetabel>p .fisttiem,.timetabel>p .lasttiem,.timetabel>p .timediqu,.timetabel li .fisttiem,.timetabel li .lasttiem,.timetabel li .timediqu{
  display: inline-block;
  width: 68px;
  text-align: center;
}
.timetabel>p>span:last-child,.timetabel li span:last-child{
  display: inline-block;
  width: 80px;
  text-align: center;
}
.timetabel>p span{
  display: inline-block;
  width: 45px;
  text-align: center;
}

.timetabel ul>li{
  height:40px;
  line-height:40px;
  border-bottom:1px solid #DDDDDD;
}
.timetabel ul>li strong{
  color: rgb(0, 118, 232);
  cursor: pointer;
}
.timetabel,.periclass{
  border:1px solid #DDDDDD;
}
.periclass>p{
  height: 40px;
  display: flex;
  align-items: center;
  background: #ebf0f5;
}
.periclass>p>span,.periclass>ul>li>span{
  display: inline-block;
  width:11.1%;
  text-align: center;
}
.periclass>ul>li{
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom:#DDDDDD;
}
.periclass>ul>li strong{
  color: rgb(0, 118, 232);
  cursor: pointer;
}
.periodstyle p{
  padding: 10px 0;
}
.periodstyle span{
  display: inline-block;
  width: 76px;
  text-align: right;
}

.keywordstyle{
  width:100%;
  overflow: hidden;
}
.keywordstyle>div{
  width:48%;
  height: 460px;
  float: left;
}
.keywordstyle>div:first-child{
  margin-right:4%;
}
.keywordstyle>div>p{
  padding-bottom: 15px;
}
.keywordstyle>div>div>div{
  background: #ebf0f5;
  height:40px;
  line-height:40px;
}
.keywordstyle>div>div>div>span:nth-child(1){
  display: inline-block;
  text-align: center;
  width:59px;
}
.keywordstyle>div>div>div>span:nth-child(2){
  display: inline-block;
  text-align: center;
  width: 240px;
}
.keywordstyle>div>div>div>span:nth-child(3){
  display: inline-block;
  text-align: center;
  width: 60px;
}

.keywordstyle>div>div li{
  height:40px;
  line-height:40px;
  border-bottom:1px solid #DDDDDD;
}
.keywordstyle>div>div li>span:nth-child(1){
  display: inline-block;
  text-align: center;
  width:59px;
}
.keywordstyle>div>div li>span:nth-child(2){
  display: inline-block;
  text-align: center;
  width:240px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.keywordstyle>div>div li>span:nth-child(3){
  display: inline-block;
  text-align: center;
  width: 60px;
}

.bg-red{
	background: red;
	margin: 5px 10px 0;
}
.color-white{
	color: #fff;
}
.text-h6{
	font-size: 12px;
}
  .word_modprice>div>div>p:first-child{
    background:#ebf0f5;
  }
  .word_modprice>div>div{
    border: 1px solid #ebf0f5;
  }
  .word_modprice>div>div>p span{
    display: inline-block;
    width:15%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .word_modprice>p{
    margin-bottom:15px;
  }
  .word_modprice>p:first-child,.word_modprice>p:nth-child(2){
    font-size: 16px;
  }
  .word_modprice>p:nth-child(2) span{
    margin-right: 40px;
  }
  .word_modprice>p:nth-child(4){
    color: #cccccc;
  }
</style>
