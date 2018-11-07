<template>
    <div class="content-wrap" @click="visible=false;visible2=false">
      <div class="news">
        <div class="news-wrap">
          <ul class="tabs">
            <li class="tab-list active f_14">消息</li>
          </ul>
          <div class="messages" ref="messages" @mouseover="clrInterval()" @mouseout="intervalfn()">
          	<ul class="f_14" ref="noticeList" :style="{transform:'translateY(-' + this.num + 'px)'}">
          		<li v-for="item in noticeList">
          			<a :href="item.snLink?item.snLink:'javascript:;'" target="_blank">
          				<p v-html="item.snContent"></p>
          				<p class="color4" style="text-align: right">{{item.createTime | fmt}}</p>
          			</a>
          		</li>
          		<li v-for="item in noticeList">
          			<a :href="item.snLink?item.snLink:'javascript:;'" target="_blank">
          				<p v-html="item.snContent"></p>
          				<p class="color4" style="text-align: right">{{item.createTime | fmt}}</p>
          			</a>
          		</li>
          	</ul>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="full-height">
          <div class="main scroll" style="overflow: auto;">
            <!--<button>-->
              <!--<a :href="cheshiurl">测试地址</a>-->
            <!--</button>-->
            <div class="pk-wrap">
              <div class="pk-inner" style="position: relative;">
                <div class="pk-before" v-if="pkStatus==0">
                  <img src="../common/images/pk_icon.png" class="pk-icon" alt="" />
                  <div class="pk-group clr">
                    <div class="pk-left">
                      <div>
                        <img src="../common/images/avatar.jpg" title="我" alt="" />
                        
                      </div>
                      <!--<Dropdown trigger="custom" :visible="visible" placement="right-start" @click.native.stop v-if="pkStatus!==1">
                      	<a class="pk-pro mt_10" href="javascript:void(0)" @click="getMyUrl()">请选择PK产品<i class="icon-jiantouzuoshuang- iconfont ml_10" style="font-size: 12px;"></i></a>
                      	<DropdownMenu slot="list" class="sjx-l pad">
                      		<Row style="padding-bottom: 10px; border-bottom: 1px solid #ccc;" class="f_16 mb_10">
                      			<Col span="8" class="text-center">选择</Col>
                      			<Col span="15" offset="1" style="text-align: left;">类目名称</Col>
                      		</Row>
                      		<Row>
                      			<Col span="8" class="text-center">
                      				<Checkbox
						            :indeterminate="indeterminate"
						            :value="checkAll"
						            @click.prevent.native="handleCheckAll">&nbsp;</Checkbox>
                      			</Col>
                      			<Col span="15" offset="1" style="text-align: left;">全选</Col>
                      		</Row>
                  			<CheckboxGroup v-model="pkCheck" class="scroll mb_10" style="max-height: 300px; overflow-y: scroll;" @on-change="checkAllGroupChange">
              					<Row v-for="item in categories1">
	                  				<Col span="8" class="text-center"><Checkbox :label="item">&nbsp;</Checkbox></Col>
	                  				<Col span="15" offset="1" style="text-align: left;">{{item}}</Col>
                  				</Row>
                  			</CheckboxGroup>
                  			<Row>
                  				<Col offset="3">
                  					<Button type="primary" class="mr_20" @click="addMyPk()">确定</Button>
        							<Button class="giveup-btn" @click="visible=false;pkCheck=[]">取消</Button>
                  				</Col>
                  			</Row>
                      	</DropdownMenu>
                      </Dropdown>-->
                      
                    </div>
                    <div class="pk-middele">
                      <img src="../common/images/vs2.jpg" alt="" class="pk-icon2"/>
                    </div>
                    <div class="pk-right">
                      <div class="pics" style="position: relative;">
                        <div v-for="(item, index) in industryPkList">
                          <!--<img v-if="item.ipSort" src="../common/images/avatar.jpg" :title="item.ipWebsite"  alt="" />-->
                          <img v-if="pkStatus==1" src="../common/images/avatar.jpg" :title="ipWebsite"  alt="" />
                          <img  :src="avatar" v-if="!item.ipSort && pkStatus!=1" alt="" @click="showModal(index+1)" style="cursor: pointer"/>
                          <!--<img  src="../common/images/add.jpg" v-if="!item.ipSort && pkStatus==1" alt="" @click="alert" style="cursor: pointer"/>-->
                          <span v-if="item.ipSort && pkStatus!==1" @click="deletePree(item.ipId)"><Icon type="close-circled" class="deletePree" ></Icon></span>
                        </div>
                      </div>
                      <!--<Dropdown trigger="custom" :visible="visible2" placement="left-start" @click.native.stop v-if="pkStatus!==1">
                      	<a class="pk-pro mt_10" href="javascript:void(0)" @click="ipWebsite==''?showModal(1):visible2=!visible2">请选择PK产品<i class="icon-jiantouzuoshuang- iconfont ml_10" style="font-size: 12px;"></i></a>
                      	<DropdownMenu slot="list" class="sjx-r pad">
                      		<Row style="padding-bottom: 10px; border-bottom: 1px solid #ccc;" class="f_16 mb_10">
                      			<Col span="8" class="text-center">选择</Col>
                      			<Col span="15" offset="1" style="text-align: left;">类目名称</Col>
                      		</Row>
                      		<Row>
                      			<Col span="8" class="text-center">
                      				<Checkbox
						            :indeterminate="indeterminate2"
						            :value="checkAll2"
						            @click.prevent.native="handleCheckAll2">&nbsp;</Checkbox>
                      			</Col>
                      			<Col span="15" offset="1" style="text-align: left;">全选</Col>
                      		</Row>
                  			<CheckboxGroup v-model="pkCheck2" class="scroll mb_10" style="max-height: 300px; overflow-y: scroll;" @on-change="checkAllGroupChange2">
              					<Row v-for="item in categories2">
	                  				<Col span="8" class="text-center"><Checkbox :label="item">&nbsp;</Checkbox></Col>
	                  				<Col span="15" offset="1" style="text-align: left;">{{item}}</Col>
                  				</Row>
                  			</CheckboxGroup>
                  			<Row>
                  				<Col offset="3">
                  					<Button type="primary" class="mr_20" @click="addPk()">确定</Button>
        							<Button class="giveup-btn" @click="visible2=false;pkCheck2=[]">取消</Button>
                  				</Col>
                  			</Row>
                      	</DropdownMenu>
                      </Dropdown>-->
                    </div>
                  </div>
                  <Button class="pk-btn" v-if="pkStatus==0" @click="pk" :loading='pkLoading'>开始PK</Button>
                  <Button disabled class="pk-btn" v-if="pkStatus==1" :loading="true">PK中</Button>
                  <!--<Button class="pk-btn" v-if="pkStatus==2">查看结果</Button>-->
                  <!--<Button class="pk-btn" v-if="pkStatus==3" @click="pk">PK失败,请重试</Button>-->
                </div>
                
                <!--pk中-->
                <div v-else-if="pkStatus==1">
                	<div class="flex" style="justify-content: space-around;">
                		<img src="../common/images/avatar.jpg" />
                		<img src="../common/images/vs.jpg" />
                		<img src="../common/images/avatar-hover.jpg" />
                	</div>
                	<div class="pking">
                		<div style="padding: 20px 40px;">
                			<div class="pro-bar-container color-green-sea clr" style="margin: 0;">
                				<div class="pro-bar color-turquoise" :data-pro-bar-percent="progress" :class="'bar-'+progress">
                					<div class="pro-bar-candy candy-ltr"></div>
                				</div>
                			</div>
                		</div>
						<div class="flex text-center shadow-bottom" style="justify-content: space-between;" >
							<div v-for="(img,name,idx) in imgs">
								<div style="position: relative; width: 80px; height: 80px;">
									<div :class="{loading:statusData[idx]==0}"></div>
									<img :src="img" height="60" width="60" style="position: absolute; top: 10px; left: 10px;" />
								</div>
								<span>{{name}}</span>
							</div>
						</div>
						<div style="color: red; text-align: center; padding: 10px 0;">由于系统需帮您分析的数据量巨大，故需分析数小时，请您耐心等待，跳转至其他页面或者关闭软件不会影响您的PK进度。</div>
                	</div>
                </div>
                
                <div class="pk-after scroll" v-else style="overflow: auto;">
                
                	<!--pk结果-->
                	<Row class="pk-wrap_img_pk" style="height: 30%;">
                		<Col span="18">
                			<div class="fl">
                				<img class="fl" src="../common/images/avatar.jpg" style="width: 100px;height: 100px;margin-left: 30px;" />
	                			<i class="icon-jiantouzuoshuang- iconfont ml_20 fl" style="font-size: 30px;margin-top: 30px;"></i>
	                			<img src="../common/images/avatar-hover.jpg" style="width: 100px;height: 100px;" />
                			</div>
                			<div class="fl ml_10">
								<div style="line-height: 12px; padding-top: 88px;">
									注：<span style="width: 8px; height: 8px; display: inline-block; background: #2B84D5; margin: 0 3px;"></span>为自己店铺数据，<span style="width: 8px; height: 8px; display: inline-block; background: #FF818C; margin: 0 3px;"></span>为PK对手店铺数据。(<span style="width: 8px; height: 8px; display: inline-block; background: repeating-linear-gradient( -45deg, #ccc, #ccc 3px, #eee 3px, #eee 6px ); margin: 0 3px;"></span>为数据0)
								</div>
							</div>
                		</Col>
                		<Col span="4" offset="2" style="padding-top: 40px;">
                			<router-link :to="{path:'/peerAnalysis/peerReport'}">
                				<Button type="primary" shape="circle" class="f_16 fr ml_10" style="padding: 0px 5px;">前往赶超<i class="icon-jiantouzuoshuang- iconfont"></i></Button>
                			</router-link>
                			<Button type="primary" shape="circle" class="f_16 fr" style="padding: 0px 5px;" @click="deleteAllPree">结束pk<i class="icon-jiantouzuoshuang- iconfont"></i></Button>
                		</Col>
                	</Row>
                	<div class="pk-wrap_pk_xm clr" style="height: 70%;">
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
              </div>
            </div>
            
            
            

            <!--时间曲线数据-->
            <!--<div class="map-wrap">
              <div style="padding: 10px 0;">
                <Dropdown trigger="click" style="margin-right: 40px;">
                  <a href="javascript:void(0)" style="color: #96ABC0;">
                    按月统计
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list" style="max-height: 200px;overflow: auto">
                    <DropdownItem v-for="item in curvelist" @click.native="toggleallindustry(item)">{{item}}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <span style="color:#A0A0A0">时间：{{startTime}}至{{endTime}}（太平洋时间,更新周期：北京时间每天9:00前）</span>
              </div>
              <div>
                <p class="chartile">
                  <span v-for="(item,index) in clickdata" :class="{bgcolor:digital==index}" @click="clickshow(index,item.val)">{{item.name}}</span>
                </p>
                  <p class="hangye" :class="{hanshow:fontShow,hanauto:!fontShow}">
                    <b>行业：</b>
                    <span v-for="(item,index) in industrydata" :class="{spancolor:industryindex==index}" @click="toggleclass(index,item.iiIndustryId,item.iiIndustryDesc)">{{item.iiIndustryDesc}}</span>
                    <strong v-if="fontShow" @click="fontShow=false">更多</strong>
                    <strong v-else @click="fontShow=true">隐藏</strong>
                  </p>

                  <div>
                      <div id="myChartweek" style="width: 100%;height: 100%;"></div>
                  </div>
              </div>
            </div>-->
            
            <div class="map-wrap">
              <div style="padding: 10px 0;">
              	<Row>
              		<Col span="12">
              			<!--<div class="index-bg1 f_18 mb_20 font-weight">
              				预计提升效果
              				<a href="javascript:;" title="系统基于平台过往关键词、产品数据等相关数据分析计算，在增加关键词覆盖、词排名优化、产品优化、P4P优化等操作后，平台预计可以提升的曝光、点击、反馈数量。（注：若平台为新开平台，无过往数据，则不会计算预计提升量）" class="iconfont icon-wenhao mr_10" style="color: #000; font-weight: normal;"></a>
              			</div>
              			<Row class="mb_20">
              				<Col span="8" class="text-center f_16" style="color: #017ef4; font-weight: bold;"><i>曝光量：&nbsp;&nbsp;3521</i></Col>
              				<Col span="8" class="text-center f_16" style="color: #017ef4; font-weight: bold;"><i>点击量：&nbsp;&nbsp;3521</i></Col>
              				<Col span="8" class="text-center f_16" style="color: #017ef4; font-weight: bold;"><i>反馈量：&nbsp;&nbsp;3521</i></Col>
              			</Row>-->
              			<div class="index-bg1 f_18 mb_20 font-weight">
              				待优化项目
              			</div>
              			<Row>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
          						<span>关键词待使用：</span>
          						<router-link :to="{path:'/platformsAnalysis/plkeywords',query:{page:4}}">{{keywordData.unCoverKeyWords}}</router-link>
              				</Col>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
              					<span>P4P问题关键词：</span>
              					<router-link :to="{path:'/p4p/thesaurus',query:{type:1}}">{{p4pUseInfo.questionWords}}</router-link>
              				</Col>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
              					<span>高曝低点产品：</span>
              					<router-link :to="{path:'/platformsAnalysis/platAnalysis',query:{type:4}}">{{p4pData.high||0}}</router-link>
              				</Col>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
              					<span>自然排名待优化：</span>
              					<router-link :to="{path:'/platformsAnalysis/plkeywords',query:{page:3}}">{{keywordData.numThree}}</router-link>
              				</Col>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
              					<span>P4P推广时长：</span>
              					<span>{{isNaN(parseFloat(p4pTime))?0:parseFloat(p4pTime).toFixed(2)}}</span>
              				</Col>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
              					<span>低曝高点产品：</span>
              					<router-link :to="{path:'/platformsAnalysis/platAnalysis',query:{type:3}}">{{p4pData.low}}</router-link>
              				</Col>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
              					<span>P4P建议竞价词：</span>
              					<router-link :to="{path:'/p4p/thesaurus',query:{type:2}}">{{biddingTotal}}</router-link>
              				</Col>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
              					<span>P4P星级优化：</span>
              					<router-link :to="{path:'/p4p/optimize'}">{{p4pUseInfo.threeCount}}</router-link>
              				</Col>
              				<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
              					<span>高点低反产品：</span>
              					<router-link :to="{path:'/platformsAnalysis/platAnalysis',query:{type:5}}">{{p4pData.highClick}}</router-link>
              				</Col>
              			</Row>
              		</Col>
              		<Col span="11" offset="1">
              			<Row>
              				<Col span="11" style="width: calc(50% - 5px);">
              					<div class="index-bg1 mb_20 text-center font-weight">
              						软件使用前
              					</div>
              					<Row class="text-center f_16 mb_20">
              						<Col span="12">
              							曝光<i class="icon-jiantouzuoshuang- iconfont ml_20" style="font-size: 12px;"></i>
              						</Col>
              						<Col span="12">
              							{{useData.oldData[0].itcImps}}
              						</Col>
              						<Col span="12">
              							点击<i class="icon-jiantouzuoshuang- iconfont ml_20" style="font-size: 12px;"></i>
              						</Col>
              						<Col span="12">
              							{{useData.oldData[0].itcClk}}
              						</Col>
              						<Col span="12">
              							反馈<i class="icon-jiantouzuoshuang- iconfont ml_20" style="font-size: 12px;"></i>
              						</Col>
              						<Col span="12">
              							{{useData.oldData[0].itcFb}}
              						</Col>
              						<Col span="12">
              							访客<i class="icon-jiantouzuoshuang- iconfont ml_20" style="font-size: 12px;"></i>
              						</Col>
              						<Col span="12">
              							{{useData.oldData[0].itcVisitor}}
              						</Col>
              					</Row>
              				</Col>
              				<Col span="11" style="width: calc(50% - 5px);" class="ml_10">
              					<div class="index-bg1 mb_20 text-center font-weight">
              						最近一周
              						<!--<a href="javascript;" class="ml_10">优化详情<i class="icon-jiantouzuoshuang- iconfont ml_10" style="font-size: 12px;"></i></a>-->
              					</div>
              					<Row class="text-center f_16 mb_20">
              						<Col span="12">
              							{{useData.nowData[0].itcImps}}
              						</Col>
              						<Col span="12" style="color: red;">
              							 {{isNaN(((parseFloat(useData.nowData[0].itcImps)-parseFloat(useData.oldData[0].itcImps))/parseFloat(parseFloat(useData.nowData[0].itcImps))*100).toFixed(2))?0:((parseFloat(useData.nowData[0].itcImps)-parseFloat(useData.oldData[0].itcImps))/parseFloat(parseFloat(useData.nowData[0].itcImps))*100).toFixed(2)}}%
              						</Col>
              						<Col span="12">
              							{{useData.nowData[0].itcClk}}
              						</Col>
              						<Col span="12" style="color: red;">
              						 {{isNaN(((parseFloat(useData.nowData[0].itcClk)-parseFloat(useData.oldData[0].itcClk))/parseFloat(parseFloat(useData.nowData[0].itcClk))*100).toFixed(2))?0:((parseFloat(useData.nowData[0].itcClk)-parseFloat(useData.oldData[0].itcClk))/parseFloat(parseFloat(useData.nowData[0].itcClk))*100).toFixed(2)}}%
              						</Col>
              						<Col span="12">
              							{{useData.nowData[0].itcFb}}
              						</Col>
              						<Col span="12" style="color: red;">
              							 {{isNaN(((parseFloat(useData.nowData[0].itcFb)-parseFloat(useData.oldData[0].itcFb))/parseFloat(parseFloat(useData.nowData[0].itcFb))*100).toFixed(2))?0:((parseFloat(useData.nowData[0].itcFb)-parseFloat(useData.oldData[0].itcFb))/parseFloat(parseFloat(useData.nowData[0].itcFb))*100).toFixed(2)}}%
              						</Col>
              						<Col span="12">
              							{{useData.nowData[0].itcVisitor}}
              						</Col>
              						<Col span="12" style="color: red;">
              							 {{isNaN(((parseFloat(useData.nowData[0].itcVisitor)-parseFloat(useData.oldData[0].itcVisitor))/parseFloat(parseFloat(useData.nowData[0].itcVisitor))*100).toFixed(2))?0:((parseFloat(useData.nowData[0].itcVisitor)-parseFloat(useData.oldData[0].itcVisitor))/parseFloat(parseFloat(useData.nowData[0].itcVisitor))*100).toFixed(2)}}%
              						</Col>
              					</Row>
              				</Col>
              			</Row>
              		</Col>
              	</Row>
              </div>
            </div>
            
          </div>
          <div class="tasks">
            <div class="task-inner f_14">
              <div class="task-tit f_20">任务模式</div>
              <div>
                <div class="task-list" @click="showTask('jzrw','新手任务')">
                  <img src="../common/images/task_icon1.png" alt="" />
                  <span class="txt f_16">新手任务</span>
                  <!--<span class="icon " :class="{bg2:groupTaskStatus1==='进行中',bg1:groupTaskStatus1==='已完成',bg3:groupTaskStatus1==='未开始'}">
									<span class="rect">{{groupTaskStatus1}}</span>
									<span class="triangle"></span>
								</span>-->
                </div>
                <div class="task-list" @click="showTask2('yhrw','优化任务')">
                  <img src="../common/images/task_icon2.png" alt="" />
                  <span class="txt f_16">优化任务</span>
                  <!--<span class="icon " :class="{bg2:groupTaskStatus2==='进行中',bg1:groupTaskStatus2==='已完成',bg3:groupTaskStatus2=='未开始'}">
									<span class="rect">{{groupTaskStatus2}}</span>
									<span class="triangle"></span>
								</span>-->
                </div>
                <div class="task-list" @click="showTask3('p4prw','每周任务')">
                  <img src="../common/images/task_icon3.png"alt="" />
                  <span class="txt f_16">每周任务</span>
                  <!--<span class="icon" :class="{bg2:groupTaskStatus3==='进行中',bg1:groupTaskStatus3==='已完成',bg3:groupTaskStatus3==='未开始'}">
									<span class="rect">{{groupTaskStatus3}}</span>
									<span class="triangle"></span>
								</span>-->
                </div>
                <!--<div class="task-list" @click="showTask4('zyrw','积分任务')">
                  <img src="../common/images/task_icon4.png" alt="" />
                  <span class="txt f_16">积分任务</span>
                  <span class="icon" :class="{bg2:groupTaskStatus4==='进行中',bg1:groupTaskStatus4==='已完成',bg3:groupTaskStatus4  ==='未开始'}">
									<span class="rect">{{groupTaskStatus4}}</span>
									<span class="triangle"></span>
								</span>
                </div>-->
              </div>
            </div>
          </div>
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
          <Button v-else disabled type="primary" shape="circle" class="my-btn" >已领取</Button>
        </div>
      </Modal>
      <Modal v-model="taskModal1" :title="title" class-name="taskModal vertical-center-modal" width="620">
      	<!--<img src="../common/images/index-figure.png" alt="" style="position: absolute; left: -60px; top: -50px;" />-->
  		<!--<div class="tips mb_10 mt_10">您要在7天时间内完成以下任务</div>-->
        <div class="task-wrap" style="margin: 0 20px;">
      		<ul>
      			<li>
      				<i class="icon-jiantouzuoshuang- iconfont"></i>
      				<h2 class="f_18 clr">
      		             在首页选择3家同行企业进行PK，查看差距情况，了解优化赶超方向。<!--已完成 <span class="num-border-bottom">999</span> 家。-->
      		       </h2>
      			</li>
      			<li>
      				<i class="icon-jiantouzuoshuang- iconfont"></i>
      				<h2 class="f_18 clr">
      		             在素材库中建立不低于5个产品系列，并补充相应素材信息（单个产品系列不低于10张图片，1个详情页模板）。
      		       </h2>
      			</li>
      			<li>
      				<i class="icon-jiantouzuoshuang- iconfont"></i>
      				<h2 class="f_18 clr">
      		             在首页待优化项目中至少完成一个待优化项目。
      		       </h2>
      			</li>
      		</ul>
        </div>
        <div slot="footer">
        	<!--<Button type="primary" class="" @click="">重新领取</Button>
        	<Button type="primary" class="" @click="">领取</Button>
        	<Button class="giveup-btn" @click="">放弃</Button>-->
        </div>
      </Modal>
      <Modal v-model="taskModal2" :title="title" class-name="taskModal vertical-center-modal" width="620">
      	<!--<img src="../common/images/index-figure.png" alt="" style="position: absolute; left: -60px; top: -50px;" />-->
        <div class="task-wrap" style="margin: 0 20px;">
			<h2 class="f_18 clr"style="text-align: left;"></i>完成首页所提示的待优化项目</h2>
			<!--<div class="jifen mt_20 pr mb_20">
				<img src="../common/images/money-icon.png" style="vertical-align: middle; position: relative; left: -5px; top: -3px;" />
				<span style="color: #ccc;">您当前已获得积分</span><span style="color: red;" class="f_18 ml_10">1000</span>
			</div>-->
        </div>
		<Row class="text-center">
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">关键词待使用：</span>
				<span class="ml_10 fr">{{keywordData.unCoverKeyWords}}</span>
			</Col>
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">P4P问题关键词：</span>
				<span class="ml_10 fr">{{p4pUseInfo.questionWords}}</span>
			</Col>
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">高曝低点产品：</span>
				<span class="ml_10 fr">{{p4pData.high||0}}</span>
			</Col>
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">自然排名待优化：</span>
				<span class="ml_10 fr">{{keywordData.numThree}}</span>
			</Col>
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">P4P推广时长：</span>
				<span class="ml_10 fr">{{isNaN(parseFloat(p4pTime))?0:parseFloat(p4pTime).toFixed(2)}}</span>
			</Col>
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">低曝高点产品：</span>
				<span class="ml_10 fr">{{p4pData.low}}</span>
			</Col>
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">P4P建议竞价词：</span>
				<span class="ml_10 fr">{{biddingTotal}}</span>
			</Col>
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">P4P星级优化：</span>
				<span class="ml_10 fr">{{p4pUseInfo.threeCount}}</span>
			</Col>
			<Col span="8" class="mb_20 pl pr" style="display: flex; display: -webkit-flex; justify-content: space-around;">
				<span class="fl">高点低反产品：</span>
				<span class="ml_10 fr">{{p4pData.highClick}}</span>
			</Col>
			<!--<Col span="8" v-for="(num,item,idx) in {'关键词待覆盖':0,'P4P问题关键词':0,'高曝低点产品':0,'自然排名待优化':0,'P4P推广时长':0,'低曝高点产品':0,'P4P建议竞价词':0,'P4P星级优化':0,'高点低反产品':0,}" class="mb_10" style="padding:0 30px; overflow: hidden;">
				<span class="fl">{{item}}：</span><span style="color: #0079f1; border-bottom: 1px solid #0079f1;" class="ml_10 fr">{{num}}</span>
			</Col>-->
		</Row>
        <div slot="footer"></div>
      </Modal>
      <Modal v-model="taskModal3" :title="title" class-name="taskModal vertical-center-modal" width="620">
      	<!--<img src="../common/images/index-figure.png" alt="" style="position: absolute; left: -60px; top: -50px;" />-->
        <div class="task-wrap" style="margin: 0 20px; text-align: left;">
			<div class="f_18 clr mb_20"><i class="icon-jiantouzuoshuang- iconfont mr_10" style="color: #0072e5;"></i>P4P中暂停所有的问题关键词。</div>
			<div class="f_18 clr mb_20"><i class="icon-jiantouzuoshuang- iconfont mr_10" style="color: #0072e5;"></i>P4P中对所有建议竞价词添加至出价策略，进行竞价。</div>
			<div class="f_18 clr mb_20"><i class="icon-jiantouzuoshuang- iconfont mr_10" style="color: #0072e5;"></i>平台分析——产品优化分析器中的高曝低点产品，高点低反产品进行优化。</div>
			<div class="f_18 clr mb_20"><i class="icon-jiantouzuoshuang- iconfont mr_10" style="color: #0072e5;"></i>选择一家同行进行PK，并在优化项完成赶超。</div>
			<div class="text-center">
				<!--<div class="jifen pr mb_20">
					<img src="../common/images/money-icon.png" style="vertical-align: middle; position: relative; left: -5px; top: -3px;" />
					<span style="color: #ccc;">您当前已获得积分</span><span style="color: red;" class="f_18 ml_10">1000</span>
				</div>-->
			</div>
        </div>
        <div slot="footer"></div>
      </Modal>
      <Modal v-model="taskModal4" :title="title" class-name="taskModal vertical-center-modal" width="620">
      	<!--<img src="../common/images/index-figure.png" alt="" style="position: absolute; left: -60px; top: -50px;" />-->
        <div class="task-wrap" style="margin: 0 20px; text-align: left;">
        	<div>
        		<h2 class="f_18 clr">
					<i class="icon-jiantouzuoshuang- iconfont mr_10" style="color: #0072e5;"></i>
					您在软件使用前，当月反馈数量为 <span class="num-border-bottom" style="min-width: 30px; display: inline-block;"></span> ，目前最近一个月反馈数量为  <span class="num-border-bottom" style="min-width: 30px; display: inline-block;"></span> 。
				</h2>
				<div class="mb_10 mt_10">（每提升10%的反馈数量，增加100积分代金券。最高不超过2000积分）</div>
				<div class="jifen pr mb_20">
					<img src="../common/images/money-icon.png" style="vertical-align: middle; position: relative; left: -5px; top: -3px;" />
					<span style="color: #ccc;">您当前已获得积分</span><span style="color: red;" class="f_18 ml_10">1000</span>
				</div>
        	</div>
        	<div>
        		<h2 class="f_18 clr">
					<i class="icon-jiantouzuoshuang- iconfont mr_10" style="color: #0072e5;"></i>
					您在软件使用前，当月P4P点击量为 <span class="num-border-bottom" style="min-width: 30px; display: inline-block;"></span> ，目前最近一个月P4P点击量为  <span class="num-border-bottom" style="min-width: 30px; display: inline-block;"></span> 。
				</h2>
				<div class="mb_10 mt_10">（每提升10%的P4P点击量，增加50积分代金券。最高不超过2000积分）</div>
				<div class="jifen pr mb_20">
					<img src="../common/images/money-icon.png" style="vertical-align: middle; position: relative; left: -5px; top: -3px;" />
					<span style="color: #ccc;">您当前已获得积分</span><span style="color: red;" class="f_18 ml_10">1000</span>
				</div>
        	</div>
        	<div>
        		<h2 class="f_18 clr">
					<i class="icon-jiantouzuoshuang- iconfont mr_10" style="color: #0072e5;"></i>
					您在软件使用前，信保走单金额为 <span class="num-border-bottom" style="min-width: 30px; display: inline-block;"></span> ，目前信保走单金额为  <span class="num-border-bottom" style="min-width: 30px; display: inline-block;"></span> 。
				</h2>
				<div class="mb_10 mt_10">（每增加5000美金，增加500积分代金券。不设上限）</div>
				<div class="jifen pr mb_20">
					<img src="../common/images/money-icon.png" style="vertical-align: middle; position: relative; left: -5px; top: -3px;" />
					<span style="color: #ccc;">您当前已获得积分</span><span style="color: red;" class="f_18 ml_10">1000</span>
				</div>
        	</div>
        </div>
        <div slot="footer"></div>
      </Modal>
      <Modal v-model="addBizIndustryPkModal" ref="addBizIndustryPkModal" title="请输入同行网站" class-name="small-btn-box vertical-center-modal" >
        <Input v-model="ipWebsite"  placeholder="请输入地址" class="width_300"></Input>
        <Button type="primary" shape="circle" class="my-btn ml_10" :loading="loading" @click="addBizIndustryPk">确定</Button>
        <div slot="footer"></div>
      </Modal>
      <!--<Modal
	  	v-model="video"
	  	class-name="vertical-center-modal video"
	  	@on-ok=""
	  	title=" "
	  	width="1032"
	  >
	  	<div>
	  		<video src="http://sonnynet.oss-cn-shenzhen.aliyuncs.com/同行分析.mp4" autoplay controls style="max-width: 1000px;" ref="video">
	  			<source src="http://sonnynet.oss-cn-shenzhen.aliyuncs.com/同行分析.mp4" type="video/mp4" autoplay controls>
	  		</video>
	  	</div>
	  	<div slot="footer"></div>
	  </Modal>-->
	  <!--<div class="video-icon">
	  	<img src="../common/images/video.png" width="40" />
	  </div>-->
    </div>
</template>
<script>
  export default {
    data () {
      return {
      	avatar:require("../common/images/add.jpg"),
      	num:0,
      	height:0,
      	interval:null,
//    	video:window.sessionStorage.getItem('首页')?false:true,
      	indeterminate: true,
        checkAll: false,
        indeterminate2: true,
        checkAll2: false,
        isDone:null,
        loading:false,
        isAcceptTask:false,
        groupTaskStatus1:'',
        groupTaskStatus2:'',
        groupTaskStatus3:'',
        groupTaskStatus4:'',

        mainChart:null,
        url:'',
        cheshiurl:"",

        noticeList:[],
        taskList:[],
        taskModal:false,
        taskModal1:false,
        taskModal2:false,
        taskModal3:false,
        taskModal4:false,
        title:'',
        bstType:'',
        //开始pk按钮的状态
        pkStatus:0,

        addBizIndustryPkModal:false,
        ipWebsite:'',
        ipSort:'',
        //同行信息
        industryPkList:[],
        industryPkList2:[],

//        同行数据曲线
        curvelist:[],
        timeFirst:"",

        industrydata:[],
        industryindex:0,
        industryId:"",
        industryname:"",

        digital:0,
        currentclick:"itcImps",
        clickdata:[
          {
            val:"itcImps",
            name:"曝光量"
          },
          {
            val:"itcClk",
            name:"点击量"
          },
          {
            val:"itcClkRate",
            name:"点击率"
          },
          {
            val:"itcVisitor",
            name:"访客量"
          },
          {
            val:"itcFb",
            name:"反馈量"
          },

        ],

        startTime:"",
        endTime:"",
        timenum:[],
        fontShow:true,
		visible:false,
		visible2:false,
		pkCheckAll:false,
		pkCheck:[],
		pkCheckAll2:false,
		pkCheck2:[],
		pkList:['关键词覆盖正在检测','关键词覆盖正在检测','关键词覆盖正在检测'],
		imgs:{
			'橱窗数':require('../common/images/index1.jpg'),
			'近半年订单数':require('../common/images/index2.jpg'),
			'近30天报价':require('../common/images/index3.jpg'),
			'及时回复率':require('../common/images/index4.jpg'),
			'旺铺视频数':require('../common/images/index5.jpg'),
			'关键词覆盖':require('../common/images/index6.jpg'),
			'首页自然排名':require('../common/images/index7.jpg'),
			'顶展词':require('../common/images/index8.jpg'),
			'P4P前五竞价词':require('../common/images/index9.jpg'),
		},
		pkData:[{bkw_shopMp4Num:100,ip_keyword_cover:100,ip_p4p_count:100,bkw_realReplayNum:100,ip_showcase_count:100,orderNum:100,ip_top_word:100,near30Days:100,ip_index_keyword:100},{bkw_shopMp4Num:100,ip_keyword_cover:100,ip_p4p_count:100,bkw_realReplayNum:100,ip_showcase_count:100,orderNum:100,ip_top_word:100,near30Days:100,ip_index_keyword:100}],
		loseData:{},
		img:{
      		win:require("../common/images/peer01.png"),
      		lose:require("../common/images/peer02.png"),
      	},
      	p4pData:{aliUserId:"0",groupid:"0",high:0,highClick:0,low:0},
      	p4pUseInfo:{PfpCount:0,alibabaUserId:"0",pfpWordsCount:0,productCount:0,questionWords:0,suggestWrods:0,threeCount:0,timeNum:0,type:"0",wordsCount:0},
      	keywordData:{aliUserId:"0",coverKeyWords:0,num:"0",numOne:0,numThree:0,numTow:0,unCoverKeyWords:0},
      	p4pTime:'',
      	useData:{nowData:[{itcImps:0,itcClk:0,itcFb:0,itcVisitor:0}],oldData:[{itcImps:0,itcClk:0,itcFb:0,itcVisitor:0}]},
      	categories1:[],
      	categories2:[],
      	myWebsite:'',
      	biddingTotal:0,
      	ipq_id:'',
      	progress:0,
      	statusData:[],
      	pkLoading:false,
      }
    },
    watch:{
    	pkCheckAll(){
    		if(this.pkCheckAll){
    			this.pkCheck=this.categories1
    		}else{
    			this.pkCheck=[]
    		}
    	},
    	pkCheckAll2(){
    		if(this.pkCheckAll2){
    			this.pkCheck2=this.categories2
    		}else{
    			this.pkCheck2=[]
    		}
    	},
//  	video(){
//  		if(!this.video){
//  			this.$refs.video.pause()
//  			window.sessionStorage.setItem('首页','true')
//  		}
//  	}
    },
    created(){
      this.loadNotice();
      this.loadTaskList();
	  this.getMyUrl()
    },
    mounted(){
//    if(!window.sessionStorage.getItem('首页')){
//    	this.$refs.video.play()
//    }
      this.init();
      this.queueInfo();
	  this.$http('alibaba/ProductReport/p4pProductUse').then(res =>{
	  		if(res.rows.length>0){
	  			this.p4pData=res.rows[0]
	  		}
	  })
	  this.$http('alibaba/ProductReport/p4pKeyAndProductUse').then((res) =>{
	  		if(res.rows.length>0){
	  			this.p4pUseInfo=res.rows[0]
	  		}
		})
	  this.$http('alibaba/ProductReport/keyWorks').then(res =>{
	  		if(res.rows.length>0){
	  			this.keywordData=res.rows[0]
	  		}
		})
	  this.api.optimizep4p.data().then((res) => {
	        if(res.data.status==200){
	            this.p4pTime=res.data.mapInfo.online
	        }else {
	            this.p4pTime=0
	        }

        })
	  this.$http('alibaba/ProductReport/pkBeforeData').then((res)=>{
	  	if(res.mapInfo.nowData.length>0&&res.mapInfo.oldData.length>0){
	  		this.useData=res.mapInfo
	  	}
	  })
	  this.api.findMonthWorkTotal.data().then((res)=>{
	  	this.biddingTotal=res.data.total
	  })
//    this.weekinit();
    },
    destroyed(){
    	this.clrInterval()
    },
    methods: {
    	getPkStatus(ipq_id,myId,id){
	      	this.$http('alibaba/PKInfo/pkStatus',{ipq_id:ipq_id,my_ipid:myId,other_ipid:id}).then(res =>{
	      		var arr=[0,0,0,0,0,0,0,0,0]
	      		var data=res.rows
	      		for(var i=0; i<data.length; i++){
	      			for(var j=0; j<data.length; j++){
	      				if(data[i].code==data[j].code){
	      					if(data[i].status==1&&data[j].status==1){
	      						arr[data[i].code-1]=1
	      					}else{
	      						arr[data[i].code-1]=0
	      					}
	      				}
	      			}
	      		}
	      		var num=0
	      		for(var i=0; i<arr.length; i++){
	      			if(arr[i]==1){
	      				num++
	      			}
	      		}
	      		this.progress=Math.round((num/arr.length)*100)
	      		this.statusData=arr
	      	})
	    },
    	intervalfn(){
    		this.interval=window.setInterval(()=> {
    			if (this.num <= this.height&&10 < (this.height-this.num)){
    				this.num++ 
    			} else {
    				this.num = 0 
    			}
    		}, 30)
    	},
    	clrInterval(){
    		window.clearInterval(this.interval)
    	},
    	handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.pkCheck = this.categories1
            } else {
                this.pkCheck = [];
            }
        },
        checkAllGroupChange (data) {
            if (data.length === this.categories1.length) {
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
        handleCheckAll2 () {
            if (this.indeterminate2) {
                this.checkAll2 = false;
            } else {
                this.checkAll2 = !this.checkAll;
            }
            this.indeterminate2 = false;

            if (this.checkAll2) {
                this.pkCheck2 = this.categories2
            } else {
                this.pkCheck2 = [];
            }
        },
        checkAllGroupChange2 (data) {
            if (data.length === this.categories2.length) {
                this.indeterminate2 = false;
                this.checkAll2 = true;
            } else if (data.length > 0) {
                this.indeterminate2 = true;
                this.checkAll2 = false;
            } else {
                this.indeterminate2 = false;
                this.checkAll2 = false;
            }
        },
      addMyPk(){
//    	this.api.addBizIndustryPk.add({
//        reqData:{
//          group:this.pkCheck.join(','),
//          ipWebsite:this.myWebsite
//        }
//      }).then((res) => {
//        if(res){
//          this.visible=false;
//          this.$Notice.success({
//            title: '提示',
//            desc: res.data.info
//          });
//        }
//      })
      },
      addPk(){
//    	this.api.addBizIndustryPk.add({
//        reqData:{
//          group:this.pkCheck2.join(','),
//          ipWebsite:this.ipWebsite
//        }
//      }).then((res) => {
//        if(res){
            this.visible2=false;
//          this.$Notice.success({
//            title: '提示',
//            desc: res.data.info
//          });
//        }
//      })
      },
      getMyUrl(){
      	this.$http('alibaba/ProductReport/mySelfInfo').then((res)=>{
      		this.visible=!this.visible
      		this.myWebsite=res.rows[0].si_website
//    		this.searchCategory(res.rows[0].si_website,1)
//			this.searchCategory('https://kphanpai.en.alibaba.com',1)
      	})
      },
      searchCategory(url,type){
      	let fullUrl=url
        if(url && url.substr(0,8).toLowerCase()!=="https://"){
          fullUrl=  'https://'+url
        }
//      this.isShowCategory=true;
        this.api.showCategroyList.list({
          reqData:{
//          cateUrl:'https://mynahgroup.en.alibaba.com'
            cateUrl:fullUrl
          }
        }).then((res) => {
          if(res){
          	this.categories1=this.categories2=[]
          	if(type==1){
          		for(var i=0;i<res.data.rows.length;i++){
          			this.categories1.push(res.data.rows[i].cateName)
          		}
          	}else if(type==2){
          		for(var i=0;i<res.data.rows.length;i++){
          			this.categories2.push(res.data.rows[i].cateName)
          		}
          	}
          }
        })
      },
      getLoseData(){
    	var obj={}
    	for(var i in this.pkData[0]){
    		if(parseFloat(this.pkData[0][i])<parseFloat(this.pkData[1][i])){
    			switch (true){
    				case i=='ip_top_word' : obj['顶展词']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])
		    		break;
		    		case i=='ip_keyword_cover' : obj['关键词使用量']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])
		    		break;
		    		case i=='ip_index_keyword' : obj['首页自然排名']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])
		    		break;
		    		case i=='ip_showcase_count' : obj['橱窗数']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])
		    		break;
		    		case i=='bkw_shopMp4Num' : obj['旺铺视频数']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])
		    		break;
		    		case i=='bkw_realReplayNum' : obj['及时回复率']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])+'%'
		    		break;
		    		case i=='near30Days' : obj['近30天报价数']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])
		    		break;
		    		case i=='orderNum' : obj['近半年订单数']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])
		    		break;
		    		case i=='ip_p4p_count' : obj['P4P前5竞价词']=parseFloat(this.pkData[1][i])-parseFloat(this.pkData[0][i])
		    		break;
    			}
    		}
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
      	if(key=='bkw_realReplayNum'){
      		return [this.pkData[0][key]+'%',this.pkData[1][key]+'%']
      	}
      	return [this.pkData[0][key],this.pkData[1][key]]
      },
      getData(){
      	if(this.pkStatus!=0&&this.pkStatus!=1){
      		this.api.queueInfo.list({
	          reqData:{
	            ipqType:1,
	            offset:15,
	            limit:0,
	            sort:'',
	            order:'',
	          }
	        }).then((data) => {
	        	console.log(data)
	          if(data){
	          	var data=JSON.parse(data.data.rows[0].ipqRemark)
	            this.$http('alibaba/PKInfo/PKdata',{website:this.$route.params.website||this.myWebsite||data.myWebIp,other_website:this.$route.params.other_website||this.ipWebsite||data.otherWebIp,myIpId:data.myIpId,otherIpId:data.otherIpId}).then((res)=>{
	      			if(res.rows.length>1){
	      				this.pkData=res.rows
		    			this.getLoseData()
	      			}
		    	})
	          }
	        })
      	}
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
      sequence(a,b){
        if (a>b) {
          return 1;
        }else if(a<b){
          return -1
        }else{
          return 0;
        }
      },
//    initMap(arr){
//      for(let i=0;i<arr.length;i++){
//        if(arr[i].ipKeywordCover==null){
//          arr[i].ipKeywordCover=0;
//        }
//        if(arr[i].ipP4pCount==null){
//          arr[i].ipP4pCount=0;
//        }
//        if(arr[i].ipShowcaseCount==null){
//          arr[i].ipShowcaseCount=0;
//        }
//        if(arr[i].ipTransactionLevel==null){
//          arr[i].ipTransactionLevel=0;
//        }
//        if(arr[i].ipIndexKeyword==null){
//          arr[i].ipIndexKeyword=0;
//        }
//      }
//      let  myChart=document.getElementById('map1')
//      let chartBox = document.getElementsByClassName('chart')[0]
//      // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
//      function resizeCharts () {
//        myChart.style.width = chartBox.style.width + 'px'
//        myChart.style.height = chartBox.style.height + 'px'
//      }
//      // 设置容器高宽
//      resizeCharts()
//      this.mainChart = this.$echarts.init(myChart);
//      let legendData=[];
//      let seriesData=[];
//      //求最大值
//      let ipKeywordCover=[];
//      let ipP4pCount=[];
//      let ipShowcaseCount=[];
//      let ipTransactionLevel=[];
//      let ipIndexKeyword=[];
//      for(let i=0;i<arr.length;i++){
//        if(arr[i].isoneself=='N'){
//          legendData.push({
//            name:'同行'+ Number(i),
//            icon: 'rect',
//            textStyle: {
//              color: '#999999'
//            }
//          });
//          seriesData.push({
//            value : [arr[i].ipKeywordCover, arr[i].ipP4pCount, arr[i].ipShowcaseCount, arr[i].ipTransactionLevel, arr[i].ipIndexKeyword],
//            name : '同行'+ Number(i),
//            areaStyle:{
//              normal:{
//                color:'rgba(217, 67, 67, 0.25)',
//              }
//            }
//          })
//        }else{
//          legendData.push({
//            name:'我',
//            icon: 'rect',
//            textStyle: {
//              color: '#999999'
//            }
//          });
//          seriesData.push({
//            value : [arr[i].ipKeywordCover, arr[i].ipP4pCount, arr[i].ipShowcaseCount, arr[i].ipTransactionLevel, arr[i].ipIndexKeyword],
//            name : '我',
//            areaStyle:{
//              normal:{
//                color:'rgba(217, 67, 67, 0.25)',
//              }
//            }
//          })
//        }
//
//
//        ipKeywordCover.push(Number(arr[i].ipKeywordCover))
//        ipP4pCount.push(Number(arr[i].ipP4pCount))
//        ipShowcaseCount.push(Number(arr[i].ipShowcaseCount))
//        ipTransactionLevel.push(Number(arr[i].ipTransactionLevel))
//        ipIndexKeyword.push(Number(arr[i].ipIndexKeyword))
//      }
//      console.log(ipKeywordCover.sort(this.sequence))
//      let maxIpKeywordCover=ipKeywordCover.sort(this.sequence)[ipKeywordCover.length-1]+5;
//      let maxIpP4pCount=ipP4pCount.sort(this.sequence)[ipP4pCount.length-1]+5;
//      let maxIpShowcaseCount=ipShowcaseCount.sort(this.sequence)[ipShowcaseCount.length-1]+5;
//      let maxIpTransactionLevel=ipTransactionLevel.sort(this.sequence)[ipTransactionLevel.length-1]+5;
//      let maxIpIndexKeyword=ipIndexKeyword.sort(this.sequence)[ipIndexKeyword.length-1]+5;
//
//      let option = {
//        color:['#ff5c62','#3da9fd','#ffbc52','#3dc296'],
//        tooltip: {},
//        legend: {
//          bottom:'6%',
//          itemWidth: 10,
//          itemHeight: 10,
//          itemGap:20,
//          data:legendData
//        },
//        radar: {
//          name: {
//            textStyle: {
//              color: '#999',
//              backgroundColor: '#fff',
//              borderRadius: 3,
//              padding: [3, 5]
//            }
//          },
//          indicator: [
//            { name: '关键词使用量',max: maxIpKeywordCover},
//            { name: 'P4P竞价词数', max: maxIpP4pCount},
//            { name: '橱窗数', max: maxIpShowcaseCount},
//            { name: '交易等级', max: maxIpTransactionLevel},
//            { name: '首页排名词', max: maxIpIndexKeyword},
//          ]
//        },
//        series: [{
//          name: '我 vs 同行',
//          type: 'radar',
//          symbolSize:0,
//          data : seriesData
//        }]
//      };
//      this.mainChart.setOption(option);
//    },
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
      loadNotice(){
        this.api.getIndexNotice.list().then((res) => {
          if(res){
            this.noticeList = res.data.rows;
            this.$nextTick(()=>{
            	if(this.$refs.noticeList.offsetHeight>this.$refs.messages.offsetHeight){
            		this.height=this.$refs.noticeList.offsetHeight/2
            		this.intervalfn()
            	}
            })
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
      	this.taskModal1=true
//      this.taskModal = true;
        this.title = tit;
        this.bstType = bstType;

        if(this.groupTaskStatus1!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask2(bstType,tit){
        this.taskModal2=true
        this.title = tit;
        this.bstType = bstType;
        if(this.groupTaskStatus2!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask3(bstType,tit){
      	this.taskModal3=true
        this.title = tit;
        this.bstType = bstType;

        if(this.groupTaskStatus3!='未开始'){
          this.isAcceptTask=true;
        }else{
          this.isAcceptTask=false;
        }
      },
      showTask4(bstType,tit){
        this.taskModal4=true
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
      showModal(ipSort){
        this.ipSort = ipSort;
        this.addBizIndustryPkModal= true;
      },
      industryPkShowList(){
        this.api.industryPkShowList.list().then((res) => {
          if(res){
            console.log(res)
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
            console.log(this.industryPkList)
			this.industryPkList=this.industryPkList.slice(0,1)
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
              this.ipq_id = res.data.rows[0].ipqId;
              if(res.data.rows[0].ipqRemark){
              	this.ipWebsite = JSON.parse(res.data.rows[0].ipqRemark).otherWebIp
              }
            }else{
              this.pkStatus = 0;
            }
            if(this.pkStatus){
            	this.getPkStatus(res.data.rows[0].ipqId,JSON.parse(res.data.rows[0].ipqRemark).myIpId,JSON.parse(res.data.rows[0].ipqRemark).otherIpId)
            }
            this.industryPkShowList();
			this.getData()
          }

        })
      },
      addBizIndustryPk(){
      	if(this.ipWebsite.indexOf('.m.') != '-1'){
      		this.$Notice.error({
	          title: '请不要输入手机端网站！',
	        });
	        return;
      	}
      	if(this.ipWebsite!=''){
      		this.avatar=require("../common/images/avatar-hover.jpg")
      	}
//    	this.searchCategory(this.ipWebsite,2)
      	this.addBizIndustryPkModal=false
//    	this.visible2=!this.visible2
//      this.loading=true;
//      this.api.addBizIndustryPk.add({
//        reqData:{
//          ipSort:this.ipSort,
//          ipWebsite:this.ipWebsite
//        }
//      }).then((res) => {
//        if(res){
//          this.loading=false;
//          this.addBizIndustryPkModal = false;
//          this.$Notice.success({
//            title: '提示',
//            desc: res.data.info
//          });
//          this.industryPkShowList();
//        }
//      })
      },
      pk(){
      	this.$http('alibaba/ProductReport/mySelfInfo').then((res)=>{
      		this.visible=!this.visible
      		this.myWebsite=res.rows[0].si_website
//    		this.searchCategory(res.rows[0].si_website,1)
//			this.searchCategory('https://kphanpai.en.alibaba.com',1)
			if(this.ipWebsite==''){
				this.$Notice.warning({
		            title: '提示',
		            desc: '请选择PK对象'
		        });
		        return false
			}
			this.ipWebsite=this.ipWebsite.substr(0,(this.ipWebsite.indexOf('com')+3))
			this.pkLoading=true
			this.$http('alibaba/PKInfo/newPk',{myWebIp:this.myWebsite,mygroup:this.pkCheck.join(','),otherWebIp:this.ipWebsite,othergroup:this.pkCheck2.join(',')}).then((res)=>{
	            if(res.status==200){
	            	this.pkLoading=false
	              this.$Notice.success({
	                title: '提示',
	                desc: res.info
	              });
	              this.pkStatus = 1;
	              this.queueInfo()
	            }
			})
      	})
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
      alert(){
        this.$Notice.success({
          title: '提示',
          desc: '当前正在pk，请等待！'
        });
      },
      deleteAllPree(){
      	this.$http('alibaba/PKInfo/overPk',{ipq_id:this.ipq_id,ip_id:this.pkData[1].ip_id}).then((res)=>{
      		if(res.info=='成功结束'){
	            this.$Notice.success({
	              title: '提示',
	              desc: res.info
	            });
	            this.queueInfo();
	            this.industryPkShowList()
	            this.pkStatus=0
	        }
      	})
//      this.api.resetPk.del().then((res) => {
//        if(res){
//          this.$Notice.success({
//            title: '提示',
//            desc: res.data.info
//          });
//          this.queueInfo();
//          this.industryPkShowList()
//        }
//      })
      },
//      店铺数据曲线

      weekinit(){
        this.api.queryTimeweek.data().then((res)=>{
          if(res.data.status=="200"){
            var timedata=[];
//            var number=[];

            console.log(res.data.rows);

            for(var i=0;i<res.data.rows.length;i++){
              timedata.push(res.data.rows[i].itcBeginTime);
              timedata.push(res.data.rows[i].itcEndTime);

              console.log(this.timeFormat(res.data.rows[i].itcBeginTime));

//              number.push(this.timeFormat(res.data.rows[i].itcBeginTime)+'~'+this.timeFormat(res.data.rows[i].itcEndTime));
            }
            var list=timedata.sort(this.sortNumber);
            var time1=this.timeFormat(list[0]);
            var time2=this.timeFormat(list[list.length-1]);
            if(time1){
              this.startTime=time1;
            }else {
              this.startTime="-"
            }
            if(time2){
              this.endTime=time2;
            }else {
              this.endTime="-";
            }

            this.timenum=res.data.rows;



            this.curvelist=this.getMonthAll(time1,time2);
            this.timeFirst=this.curvelist[this.curvelist.length-2];
            this.allindustry();
          }
        })

      },

      toggleallindustry(val){
        this.industryindex=0;
        this.timeFirst=val;
        this.allindustry();
      },
//      行业
      allindustry(){
        this.api.queryIndustrylist.data({reqData:{month:this.timeFirst}}).then((res)=>{
          if(res.data.status=="200"){
            this.industrydata=res.data.rows;
            if(this.industrydata){
              for(var i=0;i<this.industrydata.length;i++){
                if(this.industrydata[i].iiIndustryDesc=="All"){
                  this.industryId=this.industrydata[i].iiIndustryId;
                  this.industryname=this.industrydata[i].iiIndustryDesc;
                  this.industrydata.unshift(this.industrydata[i]);
                  this.industrydata.splice(i+1,1);
                  break
                }
              }
            }else {
              this.industryId='';
              this.industryname='';
            }

            this.showcurve();
          }
        })
      },
      toggleclass(i,id,name){
        this.industryindex=i;
        this.industryId=id;
        this.industryname=name;
        this.showcurve();
      },

      showcurve(){


        var monthData=[];
        for(var i=0;i<this.timenum.length;i++){

          if(this.timeFormat(this.timenum[i].itcBeginTime).substring(-1,7)==this.timeFirst){
              monthData.push(this.timeFormat(this.timenum[i].itcBeginTime)+'~'+this.timeFormat(this.timenum[i].itcEndTime))
          }

        }

        console.log(monthData);

//      var myChartweek = document.getElementById('myChartweek');
//      myChartweek.style.width = myChartweek.offsetWidth+'px';
//      myChartweek.style.height = myChartweek.offsetHeight+'px';
//      let myChartd = this.$echarts.init(myChartweek);
//      var data=[];
//      var list=[];
//      this.api.IndustryPersformance.data({reqData:{month:this.timeFirst,iiIndustryId:this.industryId,iiIndustryDesc:this.industryname}}).then((res)=>{
//        if(res.data.status=="200"){
//          var foleng=res.data.mapInfo.nowData;
//          let oldData= res.data.mapInfo.oldData;
//
//          if(foleng){
//            for(var i=0;i<foleng.length;i++){
//              data.push(foleng[i][this.currentclick]);
//
//
//            }
//          }
//          if(oldData){
//            for(let i in oldData){
//              list.push(oldData[i][this.currentclick]);
//            }
//          }
//          console.log(data)
//          console.log(list)
//        }
//
//        let option = {
//          tooltip: {
//            trigger: 'axis'
//          },
//          legend: {
//            bottom:'0%',
//            right:"38%",
//            itemWidth: 10,
//            itemHeight: 10,
//            itemGap:60,
//            data:[
//              {
//                name: '目前数据',
//                icon: 'rect',
//                textStyle: {
//                  color: '#999999'
//                }
//              },
//              {
//                name: '软件使用前数据',
//                icon: 'rect',
//                textStyle: {
//                  color: '#666666'
//                }
//              }]
//          },
//          grid: {
//            left: '1%',
//            right: '4%',
//            top: '5%',
//            bottom:"0%",
//            containLabel: true
//          },
//
//          xAxis: {
//            type: 'category',
//            boundaryGap: false,
//            data:monthData,
//            show:false
//          },
//          yAxis: {
//            type: 'value',
//
//          },
//          series: [
//            {
//              name:'目前数据',
//              type:'line',
//              data:data,
//              lineStyle: {
//                normal: {
//                  color: '#00A3F4',
//                  width: 3,
//                }
//              },
//              itemStyle: {
//                normal: {
//                  borderWidth: 3,
//                  borderColor: '#00A3F4',
//                  color: '#00A3F4'
//                }
//              }
//            },
//            {
//              name:'软件使用前数据',
//              type:'line',
//              data:list,
//              lineStyle: {
//                normal: {
//                  color: '#666666',
//                  width: 3,
//                  type: 'dashed'
//                }
//              },
//              itemStyle: {
//                normal: {
//                  borderWidth: 3,
//                  borderColor: '#666666',
//                  color: '#666666'
//                }
//              }
//            }
//          ]
//        };
//        myChartd.setOption(option);
//      })
      },

//      点击率
      clickshow(i,val){
        this.digital=i;
        this.currentclick=val;
        this.showcurve();
      },



//      获取时间段所有月份
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
//      数组排序
      sortNumber(a,b){return a - b},

//      时间格式
      timeFormat(input){
        let d = new Date(input);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month
        let day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        return year+ '-' + month + '-' + day;
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
  /*pk*/
  .flex1{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;

  }
  .deletePree{
    position: absolute;
    font-size: 25px;
    color: #999999;
    top: 5px;
    right: 8px;
    z-index: 99999;
  }
  .width_300{
    width: 300px;
  }
  .mb_15{
    margin-bottom: 15px;
  }
  .main{
    background: transparent;
    box-shadow:0 0 0 transparent;
    padding:0;
  }
  .pk-wrap{
    height: 60%;
    padding-bottom: 15px;

  }
  .pk-inner{
    padding: 15px 10px;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 5px #e1e2e2;
    border-radius:6px;
  }
  .pk-icon{
    display: block;
    width: 330px;
    max-width: 650px;
    margin: 0 auto;
  }
  .pk-icon2{
    width: 62px;
    display: inline-block;
    margin-top: 25px;
  }
  .pk-group{
    margin: 0 auto;
    text-align: center;
  }
  .pk-left,.pk-right{
    width: 40%;
    float: left;
  }
  .pk-middele{
    width: 20%;
    float: left;
  }
  .pic-box{
    width: 68px;
    height: 90px;
    /*width: 84px;
    height: 112px;*/
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 5px;
    background: linear-gradient(to bottom right, #107ed1 0%,#8a70ed 100%);
  }
  .pic-box img{
    max-width: 100%;
    max-height: 100%;
    height: 100%;
  }
  .pic-box-small{
    margin:0 10px;
    width: 60px;
    height: 80px;
    margin-top: 5px;
  }
  .pic-box-small2{
    width: 64px;
    height: 80px;
    padding: 3px;
  }
  .round{
    position: absolute;
    z-index: 999;
    width: 30px;
    height: 30px;
    display: block;
    background: #ffffff;
    border-radius: 50%;
    border: 5px solid #117ed1;
  }
  .round2{
    position: absolute;
    z-index: 999;
    width: 20px;
    height: 20px;
    display: block;
    background: #ffffff;
    border-radius: 50%;
    border: 3px solid #117ed1;
  }
  .round.round-1{
    left: -15px;
    top: -15px;
  }
  .round.round-2{
    right: -15px;
    top: -15px;
  }
  .round.round-3{
    left: -15px;
    bottom: -15px;
    border: 5px solid #4d77df;
  }
  .round.round-4{
    right: -15px;
    bottom: -15px;
    border: 5px solid #8570ec;
  }
  .round2.round-1{
    left: -10px;
    top: -10px;
  }
  .round2.round-2{
    right: -10px;
    top: -10px;
  }
  .round2.round-3{
    left: -10px;
    bottom: -10px;
    border: 3px solid #4d77df;
  }
  .round2.round-4{
    right: -10px;
    bottom: -10px;
    border: 3px solid #8570ec;
  }
  .pics{
    position: absolute;
  }
  .pk-btn{
    display: block;
    width: 110px;
    height: 36px;
    color: #FFFFFF;
    border: 0;
    border-radius: 2px;
    margin: 0 auto;
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
  @media screen and (max-width: 1599px){
    .pic-box-small2 {
      width: 54px;
      height: 72px;
    }
    .pk-after-icon2{
      width: 42px;
      margin: 0px auto;
    }
    .pk-btn2 {
      margin: 0 auto 0;
    }
    .task-list span.txt{
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1600px) and (max-width: 1919px){
    .pk-icon{
      width:420px;
    }
    .pk-icon2{
      width: 70px;
      margin-top: 35px;
    }
    .pic-box{
      width: 90px;
      height: 120px;
    }
    .pic-box-small{
      width: 68px;
      height: 90px;
      margin: 15px 16px 0;
    }
    .pic-box-small2{
      width: 68px;
      height: 90px;
    }
    .pk-btn{
      width: 125px;
      height: 40px;
      margin:16px auto 0;
    }
    .pk-btn2{
      margin:5px auto 0;
    }
    .pk-after .result{
      margin-top: 20px;
    }
    .pk-after-icon2{
      width: 42px;
      margin: 5px auto;
    }
  }
  @media screen and (min-width: 1920px){
    .pk-icon{
      width:500px;
    }
    .pk-icon2{
      width: 88px;
      margin-top: 20px;
    }
    .pic-box{
      width: 112px;
      height: 150px;
    }
    .pic-box-small{
      width: 92px;
      height: 120px;
      margin: 20px 20px 0;
    }
    .pic-box-small2{
      width: 75px;
      height: 100px;
    }
    .pk-btn{
      width: 150px;
      height: 44px;
      margin:0 auto;
    }
    .pk-btn2{
      margin:20px auto 0;
    }
    .pk-after .result{
      margin-top: 40px;
    }
    .pk-after-icon2{
      width: 55px;
      margin: 5px auto;
    }

  }
  .pk-after{
    overflow: hidden;
    height: 100%;
  }
  .pk-after .result{
    border-right: 1px solid #ddd;
    width: 31%;
    text-align: center;
    overflow: hidden;
    float: left;
    /*margin-top: 15px;*/
  }
  .pk-after .chart{
    width: 69%;
    float: left;
    height: 100%;
  }
  .pk-after .chart>div{
    height: 95%;
    width: 100%;
  }
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
    height: calc(45% - 20px);
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
    overflow: hidden;
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
  .content{
    left: 300px;
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
      left: 425px;
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
    background: url(../common/images/task_title.png) center no-repeat;
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
  .task-list img{
    margin-bottom: 10px;
  }
  .task-list span.txt{
    display: block;
    color: #444444;
  }
  .task-list .icon {
    position: absolute;
    right: -30px;
    bottom: 10%;
  }
  .rect {
    display: block;
    width: 42px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #FFFFFF;
  }
  .triangle {
    display: block;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    position: absolute;
    left: -8px;
    top: 0;
  }
  .bg1 {
    background: #aad5c0;
  }
  .bg2 {
    background: #e0d3bb;
  }
  .bg3 {
    background: #c1cfdb;
  }
  .bg1 .triangle {
    border-right: 8px solid #aad5c0;
  }
  .bg2 .triangle {
    border-right: 8px solid #e0d3bb;
  }
  .bg3 .triangle {
    border-right: 8px solid #c1cfdb;
  }
  @media screen and (max-width: 1024px) {
    .task-list img{
      width: 60px;
    }
  }
  @media screen and (min-width: 1025px) and (max-width: 1366px) {
    .task-list img{
      width: 65px;
      margin-bottom: 0;
    }
  }
  @media screen and (min-width: 1367px) and (max-width: 1680px) {
    .task-list img{
      width: 100px;
    }
  }
  @media screen and (min-width: 1681px) {
    .task-list img{
      width: 120px;
    }
  }



  .task-wrap{
    padding: 20px;
    text-align: center;
    max-height: 400px;
    overflow: auto;
  }
  .task-wrap::-webkit-scrollbar,scroll::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .task-wrap::-webkit-scrollbar-thumb,scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: #c3c3c3;
  }
  .task-wrap::-webkit-scrollbar-track,scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e5e5e5;
  }
  .task-wrap ul li{
    position: relative;
    padding-left: 20px;
    border-bottom: 1px solid #d7e6f3;
    padding-bottom: 15px;
    margin-bottom: 15px;
    text-align: left;
    list-style: none;
  }
  .task-wrap ul li i{
    position: absolute;
    left: 0;
    color: #0072e5;
    font-style: normal;
    line-height: 27px;
  }
  .task-wrap ul li h2{
    font-weight: normal;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .tips{
  	padding: 10px 20px;
  	border-radius: 10px;
  	border: 2px solid #666;
  	position: relative;
  	display: inline-block;
  	text-align: left;
  	margin-left: 60px;
  }
  .tips::after{
  	content: '';
    width:0;
    height:0;
    border-width:0 0 20px 20px;
    border-style:solid;
    border-color:transparent transparent transparent #fff;
    position:absolute;
    bottom: -16px;
    left: 12px; 
  }
  .tips::before{
  	content: '';
    width:0;
    height:0;
    border-width:0 0 20px 20px;
    border-style:solid;
    border-color:transparent transparent transparent #666;
    position:absolute;
    bottom: -20px;
    left: 10px; 
  }
  .num-border-bottom{
  	border-bottom: 1px solid #666;
  	display: inline-block;
  	width: 40px;
  	text-align: center;
  }
  .giveup-btn{
  	color: #fff;
  	background: -moz-linear-gradient(right, #c5846a 0%, #ebaf95 80%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#c5846a), color-stop(80%,#ebaf95));
	background: -webkit-linear-gradient(right, #c5846a 0%,#ebaf95 80%);
	background: -o-linear-gradient(right, #c5846a 0%,#ebaf95 80%);
	background: -ms-linear-gradient(right, #c5846a 0%,#ebaf95 80%);
	background: linear-gradient(to right, #c5846a 0%,#ebaf95 80%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c5846a', endColorstr='#ebaf95',GradientType=0 );
  }
  .jifen{
  	height: 29px;
  	line-height: 29px;
  	border-radius: 16px;
  	border: 1px solid #666;
  	-webkit-box-shadow: #ccc 0px 0px 10px inset; 
    -moz-box-shadow: #ccc 0px 0px 10px inset; 
    box-shadow: #ccc 0px 0px 10px inset;
    display: inline-block;
    position: relative;
  }
  .index-bg1{
  	background: #ebf0f5;
  	padding: 10px 25px;
  }
  .pk-pro{
  	line-height: 16px;
  	border: 1px solid #ccc;
  	display: inline-block;
  	padding: 3px 8px;
  	border-radius: 5px;
  	font-size: 12px;
  }
  .sjx-l{
  	width: 200px;
  }
  .sjx-l::before{
  	content: '';
    position: absolute;
    top: 10px;
    left: -10px;
    width: 0;
    height: 0;
    border-right: 10px solid rgba(0,0,0,.2);
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent; 
  }
  .sjx-l::after{
  	content: '';
    position: absolute;
    top: 10px;
    left: -9px;
    width: 0;
    height: 0;
    border-right: 10px solid #fff;
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent; 
  }
  .sjx-r{
  	width: 200px;
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
  .pking{
  	width: 80%;
  	margin: 0 auto;
  	-webkit-box-shadow: #ccc 0px 0px 10px; 
    -moz-box-shadow: #ccc 0px 0px 10px; 
    box-shadow: #ccc 0px 0px 10px;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 10%;
  }
  .shadow-bottom{
  	-webkit-box-shadow: 0 3px 5px #ccc;
    -moz-box-shadow: 0 3px 5px #ccc;
    box-shadow: 0 3px 5px #ccc;
    padding: 0 30px;
  }
  @-webkit-keyframes load{
    0%{
    	transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        /* IE 9 */
        -webkit-transform: rotate(0deg);
        /* Safari and Chrome */
        -o-transform: rotate(0deg);
        /* Opera */
        -moz-transform: rotate(0deg);
        /* Firefox */
    }
    100%{
    	transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        /* IE 9 */
        -webkit-transform: rotate(360deg);
        /* Safari and Chrome */
        -o-transform: rotate(360deg);
        /* Opera */
        -moz-transform: rotate(360deg);
        /* Firefox */
    }
  }
  .loading{
  	width: 80px;
  	height: 80px;
  	background:url(../common/images/loading.jpg) center;
  	-webkit-animation:load 1s linear 0s infinite;
  	background-size: 100%;
  	border-radius: 50%;
    padding: 10px;
  }
  
  
  /*PK结果图 */	
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

.font-weight{
	font-weight: bold;
}

</style>
