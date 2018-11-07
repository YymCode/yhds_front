<template>
  <div>
    <div>
      <div style="overflow: hidden">
        <div style="margin-bottom: 10px;float: left">
          <Input v-model="searchvalue" placeholder="请输入关键词查询策略" style="width:220px"></Input>
          <Button type="primary" shape="circle" style="margin:0 10px; padding: 8px 30px;" @click="queryinit">搜索</Button>
          <Checkbox v-model="single" style="margin:0 20px;">精准查找</Checkbox>
          <!--<span style="color: #DDDDDD">提示:优先策略里面的词会优先取价。只能拥有一个优先策略，优先策略最多可以有100词</span>-->
        </div>
        <div class="tabtn" style="float: right">
          <Button type="warning" shape="circle" @click="suspdelete">删除</Button>
          <!--<Button type="primary" shape="circle" @click="addmodalfun()">新建策略</Button>-->
          <Button type="primary" shape="circle" @click="priorityto()">设为优先</Button>
          <Button type="primary" shape="circle" @click="suspended(1)" >批量启动</Button>
          <Button type="primary" shape="circle" @click="suspended(2)">批量暂停</Button>
          <!--<Button type="primary" shape="circle" @click="batchtime">批量修改投放时间</Button>-->
          <!--<Button type="primary" shape="circle" @click="removestar">移除策略低星级词</Button>-->
        </div>
      </div>
      <div id="h_13">
        <Table :loading="loading" ref="selection" height="200" border stripe :columns="columns" :data="datalist" @on-selection-change="tabelchange"></Table>
        <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin-top:15px;"></Page>
      </div>
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
            <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" @click="keywordsinit">添加</Button>
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

      <!--添加关键词弹框-->
      <Modal
        v-model="keywordsdata"
        title="添加关键词"
        @on-ok="keywordsok"
        width="820"
        :styles="{top: '100px'}"
      >
        <div class="keywordstyle">
          <div>
            <p>
              <span>可选关键词(3星及3星以上的非策略词)</span>
              <Button type="primary" shape="circle" style="margin:0 5px; padding:4px 12px;" @click="thispage">添加本页</Button>
              <Button type="primary" shape="circle" style="margin:0 ; padding:4px 12px;" @click="allpage">全部添加</Button>
            </p>
            <p>
              <Select v-model="viewshow" style="width:115px" @on-change="viewshowchange">
                <Option v-for="item in viewlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

              <Select v-model="thestars" style="width:115px" @on-change="thestarschange">
                <Option v-for="item in cityListstars" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

              <Select v-model="allkeys" style="width:115px" @on-change="allkeyschange">
                <Option v-for="item in cityListallkeys" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </p>

            <div style="height: 281px; border: 1px solid #DDDDDD">
              <div>
                <span>序号</span>
                <span>关键词</span>
                <span>操作</span>
              </div>
              <ul class="keystyle">
                <li v-for="(item,index) in keysview">
                  <span>{{index+1}}</span>
                  <span>{{item.pfpPkwKeywords}}</span>
                  <span v-if="existing[index]" @click="mobilekeys(item.pfpPkwKeywords,item.pfpPkwId,index)" style="color: #00a1ff;cursor: pointer">添加</span>
                  <span v-else style="color: #DDDDDD; cursor: pointer">已添加</span>
                </li>
              </ul>
            </div>
            <Page v-if="keystotalCount" :total="keystotalCount"  :current="keyscurrent" :page-size="keyslimit" @on-change="keyschangePage" style="margin-top: 10px"></Page>

          </div>
          <div>
            <p>
              <span>已选关键词(上限为500个关键词)</span>
              <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" @click="deleall">删除全部</Button>
            </p>
            <p>
              <Input v-model="passkeys" placeholder="请输入关键词" style="width: 200px"></Input>
              <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" @click="keyssearch">搜索</Button>
            </p>
            <div style="height: 320px; border: 1px solid #DDDDDD">
              <Table height="320" :loading="keysloading" stripe ref="selection" border :columns="columns4" :data="data4" ></Table>
            </div>
          </div>
        </div>
      </Modal>
    </div>


<!--词库-->
    <div class="mainbody">
      <!--搜索-->
      <div>

      </div>
      <div class="word_btnstyle">
        <div style="float: left">
          <Input v-model="word_modelval" placeholder="输入关键词找行业" style="width:230px; margin-right:30px;"></Input>
          <Button type="primary" shape="circle" style="margin-right:20px;" @click="word_clickinit()">搜索</Button>
          <Checkbox v-model="word_single" style="margin-right:20px;">精准查找</Checkbox>
        </div>


        <div>
          <Select v-model="word_xinxin" style="width:140px;margin-right:10px;" @on-change="word_changexinxin">
            <Option v-for="item in word_sideseledata" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>


          <Select v-model="word_sidefenzu" style="width:150px" @on-change="word_changefenzu">
            <Option v-for="item in word_sideselezu" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button type="primary" shape="circle" @click="word_removekeys">从策略移出</Button>
          <Button type="primary" shape="circle" @click="word_columnshow">自&nbsp;定&nbsp;义&nbsp;列</Button>
        </div>

      </div>
      <!--表格-->
      <div class="word_bodyconten">
        <div>
          <!--<div class="word_haed">分组名称</div>-->
          <!--<ul>-->
          <!--<li v-for="(item,index) in word_viewlist">-->
          <!--<span>{{item.name}}</span>-->
          <!--<span><Icon type="edit"></Icon></span>-->
          <!--<span><Icon type="close"></Icon></span>-->
          <!--</li>-->

          <!--</ul>-->
          <!--<Menu :theme="word_theme2"  style="width: 100%">-->
            <!--<MenuItem name="1" @click.native="word_allbar">-->
              <!--<Icon type="ios-browsers"></Icon>-->
              <!--所有关键词-->
            <!--</MenuItem>-->
            <!--<Submenu name="2">-->
              <!--<template slot="title">-->
                <!--<Icon type="ios-star"></Icon>-->
                <!--按星级-->
              <!--</template>-->
              <!--<MenuItem name="2-1" @click.native="word_clickgrouping(1,5)">5星</MenuItem>-->
              <!--<MenuItem name="2-2" @click.native="word_clickgrouping(1,4)">4星</MenuItem>-->
              <!--<MenuItem name="2-3" @click.native="word_clickgrouping(1,3)">3星</MenuItem>-->
              <!--<MenuItem name="2-4" @click.native="word_clickgrouping(1,2)">2星</MenuItem>-->
              <!--<MenuItem name="2-5" @click.native="word_clickgrouping(1,1)">1星</MenuItem>-->
              <!--<MenuItem name="2-6" @click.native="word_clickgrouping(1,0)">0星</MenuItem>-->
            <!--</Submenu>-->
            <!--<Submenu name="3">-->
              <!--<template slot="title">-->
                <!--<Icon type="ios-people"></Icon>-->
                <!--按效果-->
              <!--</template>-->
              <!--<MenuItem name="3-1" @click.native="word_clickgrouping(2,1)">高曝光</MenuItem>-->
              <!--<MenuItem name="3-2" @click.native="word_clickgrouping(2,2)">高点击</MenuItem>-->
            <!--</Submenu>-->
            <!--<Submenu name="4">-->
              <!--<template slot="title">-->
                <!--<Icon type="stats-bars"></Icon>-->
                <!--按分组-->
              <!--</template>-->
              <!--<MenuItem v-for="(item,index) in word_viewlist" :name="'4-'+index+1" class="word_mintiele" @click.native="word_clickgrouping(3,item.name)">-->
                <!--<span >{{item.name}}</span>-->
                <!--<span @click.stop="word_pulllist(item.name)"><Icon type="edit"></Icon></span>-->
                <!--<span @click.stop="word_removlist(item.name)"><Icon type="close"></Icon></span>-->
              <!--</MenuItem>-->
            <!--</Submenu>-->
          <!--</Menu>-->
        </div>

        <div>
          <div>
            <Table  :loading="word_loading" height="400" border stripe ref="selection" :columns="word_columns" :data="word_tabeldata"  @on-selection-change="word_tabelchange" @on-sort-change="word_sortChange" style="height:100%"></Table>
          </div>
          <Page id="word_page11" v-if="word_totalCount" :total="word_totalCount" placement="top" :current="word_current" :page-size="word_limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="word_changePage" @on-page-size-change="word_changePageSize"></Page>
        </div>
      </div>


      <!--自定义列-->
      <Modal
        v-model="word_modal1"
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
                  <span @click="word_downRecord(index)">
                    <Icon type="arrow-down-c"></Icon>
                  </span>
                  <span @click="word_upRecord(index)">
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
      <!--分配关键词-->
      <Modal
        ref="word_modpull"
        v-model="word_modpull"
        title="修改关键词分组"
        width="620"
        :styles="{top: '50px'}"
        @on-ok="word_pullok"
      >
        <div>
          <CheckboxGroup v-model="word_checkAllGroup" @on-change="word_checkAllGroupChange">
            <Checkbox class="word_pullchex" :label="item.id+'?'+item.name" v-for="(item,index) in word_pulldata" v-if="item.id!=0&&item.id!=-1">{{item.name}}</Checkbox>
          </CheckboxGroup>
        </div>
      </Modal>
      <!--日曲线-->
      <Modal
        v-model="word_curve"
        title="价格走势"
        width="700"
        :styles="{top: '50px'}"
      >
        <div>关键词：{{word_mykeywords}}</div>
        <div id="myChart" :style="{width: '600px', height: '330px'}" class="word_huitu">
        </div>
      </Modal>
      <!--新建分组-->
      <Modal
        ref="word_addlist"
        v-model="word_addlist"
        title="新建分组"
        @on-ok="word_addok"
        :styles="{top: '50px'}"
      >
        <div style="text-align: center">
          <Input v-model="word_addvalue" placeholder="请填写分组名" style="width:200px"></Input>
        </div>
      </Modal>

      <!--编辑分组-->
      <Modal
        ref="word_Modify"
        v-model="word_Modify"
        title="修改分组"
        @on-ok="word_Modifyok"
        :styles="{top: '50px'}"
      >
        <div style="text-align: center">
          <Input v-model="word_nwenamevalue" style="width:200px"></Input>
        </div>
      </Modal>
      <!--修改价格-->
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
      <!--关键词推广产品列表-->
      <Modal
        ref="word_promoteproduct"
        v-model="word_promoteproduct"
        title="关键词匹配的推广产品列表"
        width="620"
        :styles="{top: '40px'}"
        @on-ok="word_promoteok"
      >
        <div>
          <p class="word_prtiele">
            <span>关键词：{{word_promotedata}}</span>
            <!--<Button type="primary" shape="circle" @click="word_promotAddShow">添加</Button>-->
          </p>
          <ul>

            <li v-for="item in word_promall">
              <Row type="flex" justify="center" align="middle" class="word_code-row-bg">
                <Col span="4">
                <img :src="item.productImage" alt="" style="width: 80px; height: 80px">
                </Col>
                <Col span="8">
                <p style="height: 40px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color: #00a1ff;">{{item.subject}}</p>
                <p style="height: 40px;">
                  <span v-if="item.qsStar=='0'">
                    <img src="../../common/images/sta01.png" alt="">
                  </span>
                  <span v-if="item.qsStar=='1'">
                    <img src="../../common/images/sta02.png" alt="">
                  </span>
                  <span v-if="item.qsStar=='2'">
                     <img src="../../common/images/sta03.png" alt="">
                  </span>
                  <span v-if="item.qsStar=='3'">
                     <img src="../../common/images/sta04.png" alt="">
                  </span>
                  <span v-if="item.qsStar=='4'">
                    <img src="../../common/images/sta05.png" alt="">
                  </span>
                  <span v-if="item.qsStar=='5'">
                    <img src="../../common/images/sta06.png" alt="">
                  </span>
                  <span>业务员：{{item.operator}}</span>
                </p>
                </Col>
                <Col span="4" v-if="item.isOffer=='Y'">已推广</Col>
                <Col span="4" v-else>未推广</Col>
                <Col span="4" style="color: #00a1ff;text-align:center;cursor: pointer" v-if="item.qsStar>=3 && item.isPreferential=='N' && item.isOffer=='Y'" @click.native="word_givepriority(item)">设置优先推广</Col>
                <Col span="4" style="color: #00a1ff;text-align:center;cursor: pointer" v-else-if="item.qsStar>=3 && item.isPreferential=='Y' && item.isOffer=='Y'" @click.native="word_givepriority(item)">取消优先推广</Col>
                <Col span="4" style="color: #00a1ff;text-align:center;cursor: pointer" v-else></Col>
                <Col span="4" style="cursor: pointer; color: #00a1ff;text-align: right" @click.native="word_editorurl(item.productId)">编辑产品</Col>
              </Row>
            </li>
          </ul>
          <Page  v-if="word_prtotalCount" :total="word_prtotalCount" :current="word_prcurrent" :page-size="word_prlimit" show-elevator @on-change="word_prchangePage" @on-page-size-change="word_prchangePageSize"></Page>
        </div>

      </Modal>

      <!--关键词推广产品列表添加-->
      <Modal
        ref="word_promotAdd"
        v-model="word_promotAdd"
        title="关键词匹配的推广产品列表"
        width="700"
        @on-ok="word_promotAddok"
        :styles="{top:'40px'}"

      >
        <div class="promotAddclass">
          <p>关键词：{{word_promotedata}}</p>

          <div>
            <div>
              <ul>
                <li>
                  <Input v-model="word_promotekeys" placeholder="输入关键词" style="width:200px; margin-right:15px;"></Input>
                  <Button type="primary" shape="circle"  @click="word_promotAsearch"  style="padding: 8px 25px;">搜索</Button>
                </li>
                <li v-for="(item,index) in word_tabAnalysisType" class="promImage">
                  <div>
                    <img :src="item.ppProductImage" alt="">
                  </div>
                  <div>
                    <p> {{item.ppProductName}}</p>
                  </div>
                  <div v-if="item.isAdd==1" style="color:#DDDDDD;">已加入</div>
                  <div v-else style="color: #00a1ff;cursor: pointer" @click="joinProduct(item,index)">加入</div>
                </li>
              </ul>
            </div>
            <div>
              <p v-for="(item,index) in joinList" style="padding: 14px 5px;border-bottom: 1px solid #DDDDDD;position: relative;">
                <img :src="item.ppProductImage" alt="" style="width:50px; height: 50px;vertical-align: middle">

                <span id="joinClass">{{item.ppProductName}}</span>
                <span style="position: absolute;right: 10px; top:5px; cursor: pointer" @click="deleteProduct(item,index)">X</span>
              </p>
            </div>
          </div>


          <Page id="word_promot" v-if="word_promotCount" :total="word_promotCount"  :current="word_promotcurrent" :page-size="add_limit"  show-elevator  @on-change="word_changePagepromot" @on-page-size-change="word_changePageSizepromot"></Page>

        </div>

      </Modal>


      <!--选择策略-->
      <Modal
        v-model="word_choose"
        title="选择策略"
        @on-ok="word_chooseok"
        :styles="{top: '50px'}"
      >
        <p style="padding-left: 50px">
          <RadioGroup v-model="word_animal" vertical>
            <Radio :label="item.psId" v-for="item in word_allanimal">
              <span>{{item.psName}}</span>
            </Radio>
          </RadioGroup>
        </p>
      </Modal>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        searchvalue:"",
        single:false,
        loading:false,

        columns:[
          {
            type: 'selection',
            "width":60,
            align: 'center'
          },
          {
            title: '策略名称',
            key: 'strategyName',
            align: 'center',
            render:(h, params) =>{
              var text;
              if(params.row.psIsFirst==0){
                return h('div',[
                  h('span', {
                    style: {
                      color:"#0076e8",
                      cursor: "pointer",
                    },
                    on:{
                      click: () => {
                        this.word_modelall=params.row.psId;
                        this.word_current=1;
                        this.word_limit=15;
                        this.word_offset=0;
                        this.word_init();
                      }
                    }
                  },params.row.strategyName),
                ],);
              }else {
                return h('div',[
                  h('span', {
                    style: {
                      color:"#0076e8",
                      cursor: "pointer",
                    },
                    on:{
                      click: () => {
                        this.word_modelall=params.row.psId
                        this.word_current=1;
                        this.word_limit=15;
                        this.word_offset=0;
                        this.word_init();
                      }
                    }
                  },params.row.strategyName),
                  h('span', {
                    style: {
                      color:"#0076e8",
                      display:"inline-block",
                      marginLeft:"5px",
                    }
                  },"优先策略"),
                ],);
              }

            }
          },
          {
            title: '状态',
            key: 'strategyStatus',
            align: 'center',
            render:(h, params) => {
              if(params.row.strategyStatus==1){
                return h('div',[
                  h('span', {
                    style: {
                      display:"inline-block",
                      width:"40px",
                      marginRight:"8px",
                      verticalAlign:"middle"
                    },

                  },"已启动"),
                  h('img', {
                    attrs:{
                      src:require("../../common/images/pause.png")
                    },
                    style: {
                      width:"12px",
                      height:"12px",
                      verticalAlign:'middle',
                      cursor:"pointer"
                    },
                    on:{
                      click: () => {
                        this.separate("2",params.row.psId);
                      }
                    }
                  }),
                ])
              }
              if(params.row.strategyStatus==2){
                return h('div',[
                  h('span', {
                    style: {
                      display:"inline-block",
                      width:"40px",
                      marginRight:"8px",
                      verticalAlign:"middle"
                    },
                  },"已暂停"),
                  h('img', {
                    attrs:{
                      src:require("../../common/images/play.png")
                    },
                    style: {
                      width:"12px",
                      verticalAlign:'middle',
                      height:"12px",
                      cursor:"pointer"
                    },
                    on:{
                      click: () => {
                        this.separate("1",params.row.psId);
                      }
                    }
                  }),
                ])
              }
            }
          },
          {
            title: '曝光',
            key: 'pfpPkwImpressionCnt',
            align: 'center',
          },
          {
            title: '点击',
            key: 'pfpPkwClickCnt',
            align: 'center',
          },
          {
            title: '点击率',
            key: 'pfpPkwCtr',
            align: 'center',
            render:(h, params) =>{
              return h('div',[
                h('span', {

                },params.row.pfpPkwCtr+"%"),
              ],);
            }
          },
          {
            title: '花费',
            key: 'pfpPkwCost',
            align: 'center',
          },
          {
            title: '平均花费',
            key: 'pfpPkwAveClick',
            align: 'center',
          },
          {
            title: '操作',
            width: 250,
            align: 'center',
            render: (h, params) => {
              return h('div',[
                h('span', {
                  style: {
                    display:"inline-block",
                    width:"40px",
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.jiaci(params.row.psId,params.row.strategyStatus)
                    }
                  }
                },"加词"),
                h('span', {
                  style: {
                    display:"inline-block",
                    width:"40px",
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.getinfo(params.row.psId,params.row.strategyStatus)
                    }
                  }
                },"修改"),
                h('span', {
                  style: {
                    display:"inline-block",
                    width:"40px",
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.fuck("top",params.index,params.row.psId);
                    }
                  }
                },"置顶"),
                h('span', {
                  style: {
                    display:"inline-block",
                    width:"40px",
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.fuck("up",params.index,params.row.psId);
                    }
                  }
                },"上移"),
                h('span', {
                  style: {
                    display:"inline-block",
                    width:"40px",
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.fuck("down",params.index,params.row.psId);
                    }
                  }
                },"下移"),
              ]);
            }
          },
        ],
        datalist: [],
        changedata:[],
//              分页
        totalCount:0,
        current:1,
        limit:15,
        offset:0,

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


//              修改分段值弹框
        starperiod:"",
        endperiod:"",

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

//              添加关键词
        keywordsdata:false,

//              添加关键词选词
        keysview:[],


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
        viewlist:[
          {
            value: 'all',
            label: '所有分组'
          },
        ],
        passkeys:"",
        keysloading:false,


        columns4:[
          {
            type: 'index',
            title: '序号',
            width: 68,
            align: 'center'
          },
          {
            title: '关键词',
            key: 'name',
            align: 'center',
          },
          {
            title: '操作',
            width: 68,
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style:{
                  color:"#0076e8",
                  cursor:"pointer"
                },
                on:{
                  click: () => {
                    this.handleSelectdele(params.row.name);
                  }
                }
              },"删除");
            }
          },
        ],
        data4:[],

//              分页
        keystotalCount:0,
        keyscurrent:1,
        keyslimit:6,
        keysoffset:0,


        mobiledata:[],


//              删除
        seletion:[],
        mobileIds:[],

//              判断是否可以添加
        existing:[],



//              加词
        jiacistatus:"1",
        jiaciId:'',


//              批量修改
        batchtimestatus:"1",


//              修改策略
        keywordsshow:false,
        control:"0",

        modetext:"新建策略",
        addpullsta:"1",


//词库

        //               推广关键词产品
        word_tabAnalysisType:"",
//              关键词推广产品列表添加
        word_promotekeys:"",
        word_promotAdd:false,

        add_offset:0,
        add_limit:4,

        word_promotCount:0,
        word_promotcurrent:1,

//              加入产品列表
        joinList:[],
        joinProduct_id:"",
        alibaba_id:"",





        word_prid:"",
        word_promall:"",
        word_promotedata:'',
        word_promoteproduct:false,
        word_prtotalCount:0,
        word_prcurrent:1,
        word_prlimit:5,
        word_proffset:0,



        word_theme2: 'light',
        //          修改价格
        word_price:false,
        word_lowprice:"",
        word_wordsprice:"",
        word_pricevalue:"",
        word_pricevalue2:"",
        word_money:"",
        word_front:[],
        //分页参数
        word_totalCount:0,
        word_current:1,
        word_limit:15,
        word_offset:0,

        word_order:"",
        word_sortType:'',

        word_loading:false,
//                搜索
        word_modelsta:" ",
        word_cityList:[
          {
            value: ' ',
            label: '全部状态',
            id:"a"
          },
          {
            value: 'in_promotion',
            label: '启用',
            id:"b"
          },
          {
            value: 'stopped',
            label: '暂停',
            id:"c"
          }
        ],
        word_modelall:" ",
        word_cityshow:[
          {
            value: ' ',
            label: '显示全部',

          },
          {
            value: '2',
            label: '未加入策略',

          },
          {
            value: '1',
            label: '已加入策略',

          },

        ],
        word_modelval:"",
        word_single:false,
        word_starlevel:" ",
        word_starlist:[
          {
            value: ' ',
            label: '请选择状态',
          },
          {
            value: '1',
            label: '按星级',
          },
          {
            value: '2',
            label: '按效果',
          },
        ],
        word_nextlevel:"",
        word_nextlist:[],

//              表格
        word_listdata:["zxc","asd","lkj0","oiu","jkl","lala"],
        word_columns: [
          {
            type: 'selection',
            "fixed": "left",
            "width":60,
            align: 'center'
          }
        ],
        word_tabeldata: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ],

//              自定义列
        word_zdylist:[],
        word_zdylist2:[],


        word_columndata:[],
        word_modal1:false,
//              日曲线
        word_curve:false,
//            删除表格
        word_delelist:[],
        word_deleId:[],
        word_mykeywords:"",
//              分配
        word_checkAllGroup:[],
        word_modpull:false,
        word_pulldata:[],
        word_pulltext:[],

        word_pullnameid:'',

//              新建分组
        word_addvalue:"",
        word_addlist:false,
        word_viewlist:[],

        word_Modify:false,
        word_namevalue:"",
        word_nwenamevalue:'',

//              侧边栏传值
        word_sidebar:"",
        word_sidearname:"",

        word_xinxin:"x",
        word_sideseledata:[
          {
            value: 'x',
            label: '按星级'
          },
          {
            value: '5',
            label: '五星'
          },
          {
            value: '4',
            label: '四星'
          },
          {
            value: '3',
            label: '三星'
          },
          {
            value: '2',
            label: '二星'
          },
          {
            value: '1',
            label: '一星'
          },
          {
            value: '0',
            label: '0星'
          },

        ],
        word_sidefenzu:"x",
        word_sideselezu:[
          {
            value: 'x',
            label: '按分组'
          },
        ],


//              选择策略
        word_choose:false,
        word_animal:'',
        word_allanimal:[],
        word_removeId:[],
      }
    },

    mounted(){
//      this.init();
//      this.initsele();
//
////      词库
//
//      this.word_init();
//      this.word_balanceof();
//      this.word_viewgrouping();
//      this.word_allgroup();

    },
    methods: {

      parentMsg(){
        this.init();
        this.initsele();

//      词库
        this.word_init();
        this.word_balanceof();
        this.word_viewgrouping();
        this.word_allgroup();
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
      init(){
        this.loading=true;
        var list;
        if(this.single){
          list=1
        }else {
          list=0
        }
        this.changedata=[];
        this.api.findAccountStrat.find({reqData:{keywords:this.searchvalue,strategyType:"effect",offset:this.offset,limit:this.limit,isExactFind:list}}).then((res)=>{
          this.loading=false;
          if(res.data.status=="200"){
            this.datalist=res.data.rows;
            this.totalCount=res.data.total;
          }
        })
      },
      tabelchange(selection){
        console.log(selection);
        this.changedata=[];
        for(var i=0;i<selection.length;i++){
          this.changedata.push(selection[i].psId)
        }

        console.log(this.changedata)
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

//          新增添加关键词
      keywordsinit(){
        this.keywordsdata=true;
        this.viewgrouping();
        this.keysinit();
      },
      keywordsok(){
        for(var i=0;i<this.data4.length;i++){
          this.mobileIds.push(this.data4[i].id);
        }
        this.keywrodnum=this.mobileIds.length;
        if(this.jiacistatus==1){
          var text=this.mobileIds.join(",");
          this.api.addKeywordsToStra.data({reqData:{keywordIds:text,stId:this.jiaciId,strategyWordsSource:"strategy"}}).then((res)=>{
            if(res.data.status=="200"){
              console.log(res.data.rows);
              this.$Notice.success({
                title: "加词成功",
              });
              this.init();
            }
          })
        }

      },

      //          查看分组
      viewgrouping(){
        this.viewlist=[
          {
            value: 'all',
            label: '所有分组'
          },
        ];
        this.api.tabelAllGroup.del().then((res) => {
          if(res.data.status==200){

            console.log(res.data.rows);
            for(var i=0;i<res.data.rows.length;i++){
              var obj= {
                value:res.data.rows[i].name,
                label:res.data.rows[i].name,
              };
              this.viewlist.push(obj);
            }
            console.log(this.viewlist)
          }
        });
      },

      keysinit(){
        var sta;
        if(this.thestars=="xx"){
          sta="";
        }else {
          sta=this.thestars;
        }
        this.api.findP4pKeywordsFor.data({reqData:{qsStar:sta,tagName:this.viewshow,strategyType:this.allkeys,limit:this.keyslimit,offset:this.keysoffset}}).then((res) => {
          if(res.data.status==200){
            console.log(res.data.rows);
            this.keysview=res.data.rows;
            this.keystotalCount=res.data.total;
            this.existing=[];
            for(var i=0;i<this.keysview.length;i++){
              if(!this.keysview[i].pfpPkwStrategy){
                this.existing.push(true);
              }else {
                this.existing.push(false);
              }
              for(var t=0;t<this.mobiledata.length;t++){
                if(!this.keysview[i].pfpPkwStrategy && this.mobiledata[t].name==this.keysview[i].pfpPkwKeywords){
                  this.existing[i]=false;
                }
              }

            }
          }
        });
      },
      viewshowchange(){this.keysinit();},
      thestarschange(){this.keysinit();},
      allkeyschange(){this.keysinit();},

      keyschangePage(currentPage){
        this.keysoffset = (currentPage-1)*this.keyslimit;
        this.keyscurrent = currentPage;
        this.keysinit();
      },
//          移动关键词
      mobilekeys(name,id,i){
        var obj={
          name:name,
          id:id,
        };
        this.mobiledata.push(obj);
        this.existing[i]=false;
        this.data4=this.mobiledata;
        console.log(this.data4)
      },

//          handleSelect(selection){
//              this.seletion=selection;
//          },
      handleSelectdele(namex){
        console.log(namex);
        this.keysloading=true;
        for(var i=0;i<this.data4.length;i++){
          if(this.data4[i].name==namex){
            this.data4.splice(i,1);
            break;
          }
        };
        for(var i=0;i<this.mobiledata.length;i++){
          if(this.mobiledata[i].name==namex){
            this.mobiledata.splice(i,1);
            break;
          }
        };

        for(var i=0;i<this.keysview.length;i++){
          if(this.keysview[i].pfpPkwKeywords==namex){
            this.existing[i]=true;
          }
        };
        this.keysloading=false;
      },
      deleall(){
        this.data4=[];
        this.mobiledata=[];
        this.existing=[];
        for(var i=0;i<this.keysview.length;i++){
          console.log(1111111)
          if(!this.keysview[i].pfpPkwStrategy){
            this.existing.push(true);
          }else {
            this.existing.push(false);
          }
        }
      },
      keyssearch(){
        if(this.passkeys){
          var arr4 = [];
          for(var i=0;i<this.mobiledata.length;i++){
            //如果字符串中不包含目标字符会返回-1
            if(this.mobiledata[i].name.indexOf(this.passkeys)>=0){
              arr4.push(this.mobiledata[i]);
            }
          }
          this.data4=arr4;
        }else {
          this.data4=this.mobiledata;
        }

      },
//          添加本页
      thispage(){
        for (var i=0;i<this.existing.length;i++){
          if(this.existing[i]){
            var obj={
              name:this.keysview[i].pfpPkwKeywords,
              id:this.keysview[i].pfpPkwId,
            };
            this.mobiledata.push(obj);
            this.existing[i]=false;
            this.data4=this.mobiledata;
          }
        }
      },
//          全部添加
      allpage(){
        this.keysloading=true;
        this.deleall();
        this.api.selectAllKeywordsdel.data().then((res)=>{
          this.keysloading=false;
          if(res.data.status=="200"){
            console.log(res.data.rows);

            for(var i=0;i<res.data.rows.length;i++){
              var obj={
                name:res.data.rows[i].pfpPkwKeywords,
                id:res.data.rows[i].pfpPkwId,
              };
              this.mobiledata.push(obj);
            }
            this.data4=this.mobiledata;
            for(var i=0;i<this.existing.length;i++){
              this.existing[i]=false
            }
          }
        })
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
        console.log(sta)
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
        if(this.changedata.length>0){
          this.batchtimestatus="1";
          this.modify=[];
          this.fruit=[];
          this.listinit=[];
          this.diqu=[];
          this.choosetime();
          console.log(this.changedata);
        }else {
          this.$Notice.warning({
            title: '请需要修改的选择策略',
          });
        }
      },

//          获取修改信息
      getinfo(id,sta){
          console.log(sta)
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




//词库

      //          关键词匹配的推广产品添加列表

      word_addlit(){
        this.api.AddProducts.find({reqData:{subject:this.word_promotekeys,keywords:this.word_promotedata,offset:this.add_offset,limit:this.add_limit,}}).then((res) => {
          if(res.data.status==200){

            this.word_tabAnalysisType=res.data.rows;
            console.log(res);
            this.word_promotCount=res.data.total;

            for(var i=0;i<this.word_tabAnalysisType.length;i++){

              for(var t=0;t<this.joinList.length;t++){

                if(this.word_tabAnalysisType[i].ppProductName==this.joinList[t].ppProductName){
                  this.word_tabAnalysisType[i].isAdd="1";
                }

              }

            }
          }
        })

      },



      word_promotAddShow(){
        this.word_promotAdd=true;
        this.word_addlit();
        this.haveJoined();
      },

//          确定
      word_promotAddok(){
        var arr=[];
        if(this.joinList.length>0){
          for(var i=0;i<this.joinList.length;i++){
            arr.push(this.joinList[i].ppProductId)
          }
          arr=arr.join(",");
        }else {
          arr="";
        }


        this.api.addProductsData.data({reqData:{keywordsId:this.alibaba_id,productIds:arr}}).then((res) => {
          if(res.data.status==200){
            this.$Notice.success({
              title: '添加成功',
            });
          }
        })
      },

//          搜索
      word_promotAsearch(){
        this.add_offset=0;
        this.add_limit=4;
        this.word_addlit();
      },

//          已添加产品列表

      haveJoined(){
        this.api.showAddedData.data({reqData:{keywordsId:this.joinProduct_id}}).then((res) => {
          if(res.data.status==200){
            this.joinList=res.data.rows;
          }
        })
      },



//          加入
      joinProduct(item,i){
        console.log(item);
        if(this.joinList.length<5){
          this.joinList.push(item);
          this.word_tabAnalysisType[i].isAdd="1";
        }else {
          this.$Notice.success({
            title: '最多添加5个产品',
          });

          return false
        }


      },

//          删除

      deleteProduct(item,t){
        this.joinList.splice(t,1);
        for(var i=0;i<this.word_tabAnalysisType.length;i++){
          if(this.word_tabAnalysisType[i].ppProductName==item.ppProductName){
            this.word_tabAnalysisType[i].isAdd="0";
          }
        }

      },

//          分页
      word_changePagepromot(currentPage){
        this.add_offset = (currentPage-1)*this.add_limit;
        this.word_promotcurrent = currentPage;
        this.word_addlit();
      },
      word_changePageSizepromot(pageSize){
        this.add_limit = pageSize;
        this.word_addlit();
      },





      word_editorurl(id){
        console.log(132);
        this.$router.push({name:'single',params:{aliProId:id }})

      },

      word_replace(val){
        this.word_pricevalue=val;
      },

      word_changexinxin(){
        this.word_current=1;
        this.word_limit=15;
        this.word_offset=0;

        if(this.word_xinxin=="x"){
          this.word_sidearname="";
          this.word_sidebar="";
        }else {
          this.word_sidebar="1";
          this.word_sidearname=this.word_xinxin
        }

        this.word_init();
      },
      word_changefenzu(){
        this.word_current=1;
        this.word_limit=15;
        this.word_offset=0;

        if(this.word_sidefenzu=="x"){
          this.word_sidearname="";
          this.word_sidebar="";
        }else {
          this.word_sidebar="3";
          this.word_sidearname=this.word_sidefenzu
        }

        this.word_init();
      },



//          表格分配
      word_pulltabel(){
        if(this.word_delelist.length==0){
          this.$Notice.info({
            title: '请勾选您需要分配的关键词',
          });
        }else{
          this.word_modpull=true;
          this.word_checkAllGroup=[];
          this.api.tabelAllGroup.del().then((res) => {
            if(res.data.status==200){
              console.log(res.data.rows);
              this.word_pulldata=res.data.rows;
              if(this.word_delelist.length==1){
                for(var i=0;i<this.word_pulldata.length;i++){

                  for(var t=0;t<this.word_pulltext.length;t++){
                    if(this.word_pulldata[i].name==this.word_pulltext[t]){
                      this.word_checkAllGroup.push(this.word_pulldata[i].id+'?'+this.word_pulldata[i].name);
                    }
                  }
                }
              }


//                  if(id){
//                    this.word_checkAllGroup=[];
//                    this.word_pullnameid=id+"?"+name;
//                    this.word_checkAllGroup.push(this.word_pullnameid);
//                  }else {
//                    this.word_checkAllGroup=[];
//                  }

            }
          });
        }
      },
      word_checkAllGroupChange(data){
        console.log(this.word_checkAllGroup)
      },
      word_pullok(){
        if( this.word_checkAllGroup.length==0){
          this.$Notice.info({
            title: '请勾选您需要分配的组',
          });
          this.$refs.word_modpull.visible = true;
          this.word_modpull = true;
        }else {
          var list=this.word_deleId.join(",");
          var data=[];
          var name=[];
          for(var i=0;i<this.word_checkAllGroup.length;i++){
            data.push(this.word_checkAllGroup[i].split("?")[0]);
            name.push(this.word_checkAllGroup[i].split("?")[1])
          }
          data=data.join(",");
          name=name.join(",");
          this.api.modifyKeywords.find({reqData:{keywordIds:list,tagIds:data,tagName:name}}).then((res) => {
            if(res.data.status==200){
              console.log(res.data.rows);
              this.$Notice.success({
                title: '分配成功',
              });
            }
          });
          this.word_init();
        }
      },
//          表格删除
      word_deletabel(){
        if(this.word_delelist.length==0){
          this.$Notice.info({
            title: '请勾选您需要删除的关键词',
          });
        }else {
          this.word_delelist=this.word_delelist.join(",");
          this.word_deleId=this.word_deleId.join(",");
          this.api.deltabelList.find({reqData:{keywords:this.word_delelist,keywordIds:this.word_deleId}}).then((res) => {
            if(res.data.status==200){
              this.$Notice.success({
                title: '删除成功',
              });
              this.word_init();
            }
          })
        }
      },

//          删除关键词所属策略
      word_removekeys(){
        if(this.word_delelist.length==0){
          this.$Notice.info({
            title: '请勾选您需要移除策略的关键词',
          });
        }else {
          var list=this.word_removeId.join(",");
          this.api.delKeywordsFromStrat.data({reqData:{keywordIds:list}}).then((res) => {
            if(res.data.status==200){
              this.$Notice.success({
                title: '移除成功',
              });
              this.word_init();
            }
          })
        }
      },

//          表格选中
      word_tabelchange(selection){
        this.word_delelist=[];
        this.word_deleId=[];

        this.word_removeId=[];

        console.log(selection);
        for(var i=0;i<selection.length;i++){
          this.word_delelist.push(selection[i].pfpPkwKeywords);
          this.word_deleId.push(selection[i].pfpAlibabaKeyId);
          this.word_removeId.push(selection[i].pfpPkwId)
        }
        console.log(this.word_delelist);
        console.log(this.word_deleId);

        if(selection.length>0){
          this.word_pulltext=selection[0].pfpPkwTagList.split(",");
        }else {
          this.word_pulltext=[];
        }
        console.log(this.word_pulltext);
      },
//          表格排序
      word_sortChange(column){
        console.log(column)
        this.word_sortType = column.key;
        console.log(this.word_sortType);
        this.word_order=column.order;
        if(this.word_order=="normal"){
          this.word_order="";
          this.word_sortType='';
        }
        this.$nextTick(function () {
          this.word_init()
        })
      },
      word_clickinit(){
        this.word_limit=15;
        this.word_offset=0;
        this.word_init();
      },
      word_init(){
        this.word_delelist=[];
        this.word_deleId=[];
        let sat;
        this.word_loading=true;
        if(this.word_single){sat=1}else {sat=0}
        this.api.tabelList.find({reqData:{
          pfpPkwKeywords:this.word_modelval,
//              pfpPkwStrategy:this.word_modelall,
          pfpPkwStrategy:this.word_modelall,
          iaAccurate:sat,
          pfpPkwStatus:this.word_modelsta,
          offset:this.word_offset,
          searchType:this.word_sidebar,
          searchValue:this.word_sidearname,
          limit:this.word_limit,
          sort:this.word_sortType,
          order:this.word_order,
          code:"cl",
        }}).then((res)=>{
          this.word_loading=false;
          if(res.data.status=="200"){
            this.word_tabeldata=res.data.mapInfo.dataList;
            this.word_columns=[{
              type: 'selection',
              "fixed": "left",
              "width":60,
              align: 'center'
            }];
            console.log(res);
            console.log(this.word_tabeldata);
            var lelist=res.data.mapInfo.titleList;
            for(var i=0; i<lelist.length;i++){
              var obj= {
                title:lelist[i].dicName,
                key: lelist[i].dicCode,
                align: 'center',
                "width": 150,
                sortable:"custom",
              };
              //                  关键词
              if(lelist[i].dicCode=='pfpPkwKeywords'){
                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  className: 'demo-table-info-column',
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                };
              }
//                  搜索热度
              if(lelist[i].dicCode=='pfpPkwSearchCount'){
                var imgurl=require("../../common/images/hot02.png");
                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                  render: (h, params) => {
                    if(!params.row.pfpPkwSearchCount){
                      imgurl=require("../../common/images/hot01.png");
                    }
                    if(params.row.pfpPkwSearchCount==1){
                      imgurl=require("../../common/images/hot02.png");
                    }
                    if(params.row.pfpPkwSearchCount==2){
                      imgurl=require("../../common/images/hot03.png");
                    }
                    if(params.row.pfpPkwSearchCount==3){
                      imgurl=require("../../common/images/hot04.png");
                    }
                    if(params.row.pfpPkwSearchCount==4){
                      imgurl=require("../../common/images/hot05.png");
                    }
                    if(params.row.pfpPkwSearchCount==5){
                      imgurl=require("../../common/images/hot06.png");
                    }
                    if(params.row.pfpPkwSearchCount==6){
                      imgurl=require("../../common/images/hot07.png");
                    }
                    return h('img', {
                      attrs:{
                        src:imgurl
                      },
                      style:{
                        width:'80px',
                        verticalAlign:'middle'
                      }
                    },);
                  }
                };
              }
//                  推广评分
              if(lelist[i].dicCode=='pfpPkwQsStar'){
                var imgurl=require("../../common/images/sta01.png");
                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                  render: (h, params) => {
                    if(params.row.pfpPkwQsStar==0){
                      imgurl=require("../../common/images/sta01.png");
                    }
                    if(params.row.pfpPkwQsStar==1){
                      imgurl=require("../../common/images/sta02.png");
                    }
                    if(params.row.pfpPkwQsStar==2){
                      imgurl=require("../../common/images/sta03.png");
                    }
                    if(params.row.pfpPkwQsStar==3){
                      imgurl=require("../../common/images/sta04.png");
                    }
                    if(params.row.pfpPkwQsStar==4){
                      imgurl=require("../../common/images/sta05.png");
                    }
                    if(params.row.pfpPkwQsStar==5){
                      imgurl=require("../../common/images/sta06.png");
                    }
                    return h('img', {
                      attrs:{
                        src:imgurl
                      },
                      style:{
                        width:'80px',
                        verticalAlign:'middle'
                      }
                    },);
                  }
                };
              }
//                  购买热度
              if(lelist[i].dicCode=='pfpPkwBuyCount'){
                var imgurl=require("../../common/images/hot02.png");
                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                  render: (h, params) => {
                    if(!params.row.pfpPkwBuyCount){
                      imgurl=require("../../common/images/hot01.png")
                    }
                    if(params.row.pfpPkwBuyCount==1){
                      imgurl=require("../../common/images/hot02.png");
                    }
                    if(params.row.pfpPkwBuyCount==2){
                      imgurl=require("../../common/images/hot03.png");
                    }
                    if(params.row.pfpPkwBuyCount==3){
                      imgurl=require("../../common/images/hot04.png");
                    }
                    if(params.row.pfpPkwBuyCount==4){
                      imgurl=require("../../common/images/hot05.png");
                    }
                    if(params.row.pfpPkwBuyCount==5){
                      imgurl=require("../../common/images/hot06.png");
                    }
                    if(params.row.pfpPkwBuyCount==6){
                      imgurl=require("../../common/images/hot07.png");
                    }
                    return h('img', {
                      attrs:{
                        src:imgurl
                      },
                      style:{
                        width:'80px',
                        verticalAlign:'middle'
                      }
                    },);
                  }
                };
              }
//                  价格走势
              if(lelist[i].dicCode=='pfpPkwPrice'){
                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                  render: (h, params) => {
                    if(!params.row.pfpPwkPriceStatus){
                      return h('div',[
                        h('span', {
                          style: {
                            display:"inline-block",
                            width:"50px",
                            color:"#0076e8",
                            cursor:"pointer"
                          },
                          on:{
                            click: () => {
                              this.word_price=true;
                              this.word_lowprice=params.row.pfpPkwBasePrice;
                              this.word_wordsprice=params.row.pfpPkwKeywords;
                              this.word_pricevalue=params.row.pfpPkwPrice;
                              this.word_pricevalue2=params.row.pfpPkwPrice;
                              this.word_PriceList(params.row.pfpPkwKeywords)

                            }
                          }
                        },params.row.pfpPkwPrice),
                      ],);
                    }
                    if(params.row.pfpPwkPriceStatus==2 || params.row.pfpPwkPriceStatus==0){
                      return h('div',[
                        h('span', {
                          style: {
                            display:"inline-block",
                            width:"50px",
                            color:"#0076e8",
                            cursor:"pointer"
                          },
                          on:{
                            click: () => {
                              this.word_price=true;
                              this.word_lowprice=params.row.pfpPkwBasePrice;
                              this.word_wordsprice=params.row.pfpPkwKeywords;
                              this.word_pricevalue=params.row.pfpPkwPrice;
                              this.word_pricevalue2=params.row.pfpPkwPrice;
                              this.word_PriceList(params.row.pfpPkwKeywords)
                            }
                          }
                        },params.row.pfpPkwPrice),
//                      h('span', {
//                        style: {
//                          display:"inline-block",
//                          width:"50px",
//                        }
//                      },"待更新"),
                      ],);
                    }
                    if(params.row.pfpPwkPriceStatus==1){
                      return h('div',[
                        h('span', {
                          style: {
                            display:"inline-block",
                            width:"50px",
                            color:"#0076e8",
                            cursor:"pointer"
                          },
                          on:{
                            click: () => {
                              this.word_price=true;
                              this.word_lowprice=params.row.pfpPkwBasePrice;
                              this.word_wordsprice=params.row.pfpPkwKeywords;
                              this.word_pricevalue=params.row.pfpPkwPrice;
                              this.word_pricevalue2=params.row.pfpPkwPrice;

                              this.word_PriceList(params.row.pfpPkwKeywords)
                            }
                          }
                        },params.row.pfpPkwPrice),
//                      h('span', {
//                        style: {
//                          display:"inline-block",
//                          width:"50px",
//                          color:"#0076e8",
//                          cursor:"pointer"
//                        },
//                        on: {
//                          click: () => {
//                            this.word_curveok(params.row.pfpPkwKeywords);
//                          }
//                        }
//                      },"日曲线"),
                      ],);
                    }
                  }
                };
              }
//                  匹配产品数
              if(lelist[i].dicCode=='pfpPkwMatchCount'){
                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                  render: (h, params) => {
                    return h('div', {
                      style:{
                        color:"#0076e8",
                        cursor:"pointer"
                      },
                      on:{
                        click: () => {
                          this.word_promoteshow(params.row.pfpPkwKeywords);
                          this.word_prid=params.row.pfpAlibabaKeyId;
                        }
                      }
                    },params.row.pfpPkwMatchCount);
                  }
                };
              }
//                   关键词推广状态
              if(lelist[i].dicCode=='pfpPkwStatus'){

                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                  render: (h, params) => {
                    if(params.row.pfpPkwStatus=='stopped'){
                      return h('div', {},"暂停");
                    }
                    if(params.row.pfpPkwStatus=='in_promotion'){
                      return h('div', {},"开启");
                    }

                  }
                };
              }

//                   点击率
              if(lelist[i].dicCode=='pfpPkwCtr'){

                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                  render: (h, params) => {
                    return h('div', {},params.row.pfpPkwCtr+"%");
                  }
                };
              }

//                   预估排名
              if(lelist[i].dicCode=='pfpPkwRankings'){
                obj= {
                  title:lelist[i].dicName,
                  key: lelist[i].dicCode,
                  align: 'center',
                  "width": 150,
                  sortable:"custom",
                  render: (h, params) => {
                    if(params.row.pfpPkwRankings=="0"){
                      return h('div', {},"-");
                    }else if(params.row.pfpPkwRankings=="-1" || !params.row.pfpPkwRankings){
                      return h('div', {},"其他位置");
                    }else {
                      return h('div', {},params.row.pfpPkwRankings);
                    }

                  }
                };
              }


              this.word_columns.push(obj)
            }
            this.word_totalCount = res.data.total;
          }
        })
      },
//          改变搜索
      word_allstate(){
        this.word_current=1;
        this.word_limit=15;
        this.word_offset=0;
        this.word_init();
      },
      word_allshow(){
        this.word_current=1;
        this.word_limit=15;
        this.word_offset=0;
        this.word_init();
      },

//          分页
      word_changePage(currentPage){
        this.word_offset = (currentPage-1)*this.word_limit;
        this.word_current = currentPage;
        this.word_init()
      },
      word_changePageSize(pageSize){
        this.word_limit = pageSize;
        this.word_init()
      },
//          自定义列确定

      word_columnshow(){
        this.word_modal1=true;
        this.api.CustomList.del({params:["cl"]}).then((res) => {
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
            pccTableCode:"cl"
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
      word_swapItems(index,index2){
        this.word_zdylist[index] = this.word_zdylist.splice(index2, 1, this.word_zdylist[index])[0];

        console.log(this.word_zdylist);
      },
      word_upRecord($index){
        console.log(1)
        if($index == 0) {
          return;
        }
        this.word_swapItems($index, $index - 1);

      },
      word_downRecord($index){
        console.log(2)
        if($index == this.word_zdylist.length -1) {
          return;
        }
        this.word_swapItems($index, $index + 1);
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


//          日曲线
      word_curveok(val){
        console.log(val);
        this.word_mykeywords=val;
        this.word_curve=true;
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        this.api.PriceTrade.data({reqData:{pptKeywords:val}}).then((res) => {
          if(res.data.status==200){
            var max=[];
            var min=[];
            for(var i=0;i<res.data.mapInfo.maxList.length;i++){
              max.push(res.data.mapInfo.maxList[i].pptPrice);
              min.push(res.data.mapInfo.minList[i].pptPrice);
            }
            let option = {
              color:['#0076e8',"#000000"],
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data:['最大值','最小值']
              },
              xAxis: {
                type: 'category',
                data:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name:"最大值",
                  data: max,
                  type: 'line',
                  smooth: true
                },
                {
                  name:"最小值",
                  data: min,
                  type: 'line',
                  smooth: true
                }
              ]
            };
            myChart.setOption(option)
          }
        });
      },
//          导出
      word_exportData() {
        window.location.href=process.env.API_ROOT+'/alibaba/p4pKeywords/exportKeywordsInfo'
      },
//          同步关键词
      word_synchronous(){
        this.api.chronize.del().then((res) => {
          if(res.data.status==200){
            this.word_limit=15;
            this.word_offset=0;
            this.word_init();
            this.$Notice.success({
              title: '正在同步数据中请稍后',
            });

          }
        });
      },
//          新建分组
      word_addgroup(){
        this.word_addlist=true;
        this.word_addvalue="";
      },
      word_addok(){
        if(!this.word_addvalue){
          this.$refs.word_addlist.visible = true;
          this.word_addlist= true;
          this.$Notice.info({
            title:'请填写分组名',
          });
        }else {
          this.api.KeywordsGroup.find({reqData:{tagName:this.word_addvalue}}).then((res) => {
            if(res.data.status==200){
              this.$Notice.success({
                title: '添加成功',
              });
              this.word_viewgrouping();
              if(this.word_starlevel=="3"){
                this.api.tabelAllGroup.del().then((res) => {
                  if(res.data.status==200){
                    console.log(res.data.rows);
                    this.word_nextlist=[];
                    for(var i=0;i<res.data.rows.length;i++){
                      var obj= {
                        value:res.data.rows[i].id ,
                        label:res.data.rows[i].name
                      };
                      this.word_nextlist.push(obj)
                    }
                  }
                });

              }
            }
          })
        }
      },

//          查看分组
      word_viewgrouping(){
        this.api.tabelAllGroup.del().then((res) => {
          if(res.data.status==200){
            console.log(res.data.rows);
            this.word_viewlist=res.data.rows;
            for(var i=0;i<res.data.rows.length;i++){
                var obj= {
                    value:res.data.rows[i].name,
                    label:res.data.rows[i].name
                }
                this.word_sideselezu.push(obj);
            }
          }

//          word_sideselezu
        });
      },
      word_pulllist(name){
        this.word_Modify=true;
        this.word_namevalue=name;
        this.word_nwenamevalue=name;
      },
      word_Modifyok(){
        this.api.TagName.find({reqData:{tagName:this.word_namevalue,newTagName:this.word_nwenamevalue}}).then((res) => {
          if (res.data.status == 200) {
            this.$Notice.success({
              title: '编辑成功',
            });
            this.word_viewgrouping();
          }
        })
      },
      word_removlist(val){
        this.api.p4pdele.find({reqData:{tagName:val}}).then((res) => {
          if (res.data.status == 200) {
            this.$Notice.success({
              title: '删除成功',
            });
            this.word_viewgrouping();
          }
        })
      },
      word_clickgrouping(val,name,id){

        this.word_modelval='';
        this.word_current=1;
        this.word_limit=15;
        this.word_offset=0;
        this.word_sidebar=val;
        this.word_sidearname=name;

        this.word_init();
        console.log(val,name)
      },

//          查询账户余额
      word_balanceof(){
        this.api.accountp4p.data().then((res) => {
          if(res.data.status==200){
            this.word_money=Number(res.data.mapInfo.budget)-Number(res.data.mapInfo.daycost)
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
        }else {
          this.api.fyPrice.find({reqData:{pfpPkwKeywords:this.word_wordsprice,pfpPkwPrice:this.word_pricevalue}}).then((res) => {
            if (res.data.status == 200) {
              this.$Notice.success ({
                title: '修改成功',
              });
              this.word_init();
            }
          })
        }


      },
      word_goadd(){
        console.log("tiao")
        this.$router.push({path: '/p4p/thenext' })
      },
//          所有关键词
      word_allbar(){
        this.word_sidebar='';
        this.word_sidearname='';
        this.word_init();
      },
//          关键词产品推广
      word_promoteshow(name){
        this.word_promoteproduct=true;
        this.word_promotedata=name;
        this.word_prtotalCount=0;
        this.word_prcurrent=1;
        this.word_prlimit=5;
        this.word_proffset=0;
        this.word_prinit();
      },

      word_prinit(){
        console.log(this.word_prcurrent);
        this.api.ByKeywords.find({reqData:{keywords:this.word_promotedata,offset:this.word_prcurrent,limit:this.word_prlimit}}).then((res) => {
          if (res.data.status == 200) {
            this.word_promall=res.data.rows;
            this.word_prtotalCount=res.data.total;
          }
        })
      },
      word_prchangePage(currentPage){
        this.word_proffset = (currentPage-1)*this.word_prlimit;
        this.word_prcurrent = currentPage;
        this.word_prinit()
      },
      word_prchangePageSize(pageSize){
        this.word_prlimit = pageSize;
        this.word_prinit()
      },

      word_promoteok(){

      },
      word_givepriority(val){
        var data;
        if(val.isPreferential=="Y"){
          data="N"
        }else {
          data="Y"
        }
        this.api.Preferential.find({reqData:{keywordsId:this.word_prid,productId:val.productId,status:data,}}).then((res) => {
          if (res.data.status == 200) {

            this.word_prinit()
          }
        })
      },

      //          所有策略
      word_allgroup(){
        this.api.AllStrategyList.data().then((res) => {
          if (res.data.status == 200) {
            this.word_allanimal=res.data.rows;
            console.log(this.word_allanimal);
            for(var i=0;i<res.data.rows.length;i++){
              var obj={
                value:res.data.rows[i].psId,
                label:res.data.rows[i].psName,
              }
              this.word_cityshow.push(obj)
            }
          }
        })
      },

      //          暂停非策略词
      word_suspended(){
        this.api.stopUnStrategyKeywordslist.data().then((res) => {
          if (res.data.status == 200) {
            this.$Notice.success({
              title: '已暂停非策略词',
            });
            this.word_init();
          }
        })
      },

      word_chooci(){
        if(this.word_deleId.length>0){
          this.word_choose=true;
          this.word_animal="";
        }else {
          this.$Notice.success({
            title: '请选择关键词',
          });
        }

      },
      word_chooseok(){
        if(this.word_animal){
          var list=this.word_removeId.join(",");
          this.api.hotaddKeywordsToStrat.data({reqData:{keywordIds:list,stId:this.word_animal}}).then((res) => {
            if (res.data.status == 200) {
              this.$Notice.success({
                title: '添加成功',
              });
              this.word_init();
            }
          })

        }else {
          this.$Notice.warning({
            title: '请选择策略',
          });
        }
      },

    },
  }
</script>
<style scoped>
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


  /*词库*/
  .word_code-row-bg{
    padding:8px 0;
    border-bottom:1px solid #DDDDDD;
  }
  .word_prtiele{
    overflow: hidden;
    line-height:34px;
    border-bottom:1px solid #DDDDDD;
    padding: 15px 0;
  }
  .word_prtiele>button{
    float: right;
  }
  .word_allkeywords>i{
    margin-right: 8px;
  }
  .word_allkeywords{
    padding: 14px 24px;
    cursor: pointer;

  }
  .word_keywordsatvie{
    color:#2d8cf0;
    border-right: 2px solid #2d8cf0;
  }

  .word_mintiele>span:nth-child(1){
    display: inline-block;
    width:70%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .word_mintiele>span:nth-child(2):hover{
    color: red;
  }
  .word_mintiele>span:nth-child(3):hover{
    color:red;
  }
  .word_haed{
    text-align: center;
    background: #ebf0f5;
    padding: 15px 10px;
    font-size: 14px;
  }
  .word_bodyconten{
    overflow: hidden;
  }
  /*.word_bodyconten>div:nth-child(1){*/
    /*width: 205px;*/
    /*margin-right: 15px;*/
    /*float: left;*/
    /*border:1px solid #ebf0f5;*/
    /*height:100%;*/
    /*overflow-y: auto;*/
  /*}*/
  .word_bodyconten>div:nth-child(2){
    width:100%;
    float: left;
    height:100%;
  }
  #word_page11{
    margin:5px;
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
  .word_modconten .word_listname{
    display: inline-block;
    width: 60px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .word_huitu{
    width: 500px;
    height:300px;
    margin:0 auto;
  }
  .word_pullchex{
    width: 130px;
    text-align: left;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .demo-table-info-column>div>span{
    color:#57a3f3;
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
  #word_btn1,#word_btn2{
    width: 100px;
    border: 1px solid #DDDDDD;
  }
  #word_btn1:hover{
    color: #57a3f3;
    border-color:#57a3f3 ;
  }
  #word_btn2:hover{
    color: #57a3f3;
    border-color:#57a3f3 ;
  }
  .mainbody>div:nth-child(1){
    height:15px;
  }
  .xuan{
    float: right;
  }
  .mainbody>div:nth-child(2){
    height: 50px;
    line-height: 50px;
  }
  .mainbody>div:nth-child(3){
    height:calc(100% - 95px)
  }



  .promImage{
    display: flex;
    justify-content: space-between;
  }
  .promImage>div{
    margin-right: 8px;
  }
  .promImage>div:first-child img{
    width: 60px;
    height: 70px;
    margin-top: 5px;
    vertical-align: middle;
  }
  .promImage>div:nth-child(2){
    position: relative;
    width: 270px;
  }
  .promImage>div:nth-child(2) p{
    position:absolute;
    top: 30%;
    left:0;
    height: 40px;
    line-height: 40px;
    color: #2d8cf0;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .promImage>div:nth-child(2) img{
    position:absolute;
    top: 50px;
    left:0;
    height: 12px;
  }

  #joinClass{
    display: inline-block;
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    margin-left: 10px;
    color: #2d8cf0;
  }

  .promotAddclass>p{
    line-height: 40px;
  }
  .promotAddclass>div{
    height: 400px;
    overflow: hidden;
  }
  .promotAddclass>div>div:first-child{
    float:left;
    height:100%;
    width:65%;
    margin-right:2%;
  }
  .promotAddclass>div>div:last-child{
    float:left;
    height:100%;
    width:33%;
    border: 1px solid #DDDDDD;
  }
  .promotAddclass>div>div>ul>li{
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #DDDDDD;
  }
</style>
