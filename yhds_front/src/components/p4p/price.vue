<template>
    <div class="full-height" id="app">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/p4p">P4P</Breadcrumb-item>
        <Breadcrumb-item >出价策略</Breadcrumb-item>
      </Breadcrumb>
     <div class="main" id="tabelmain">
       <Tabs value="name1" style="height: 100%;" @on-click="notify">
         <TabPane label="策略" name="name1" >
           <div>
             <div style="margin-bottom: 10px">
               <Input v-model="searchvalue" placeholder="请输入关键词查询策略" style="width:220px"></Input>
               <Button type="primary" shape="circle" style="margin:0 10px; padding: 8px 30px;" @click="queryinit">搜索</Button>
               <Checkbox v-model="single" style="margin:0 20px;">精准查找</Checkbox>
               <!--<span style="color: #DDDDDD">提示:优先策略里面的词会优先取价。只能拥有一个优先策略，优先策略最多可以有100词</span>-->
             </div>
             <div class="tabtn">
               <Button type="warning" shape="circle" @click="suspdelete">删除</Button>
               <Button type="primary" shape="circle" @click="addmodalfun()">新建策略</Button>
               <Button type="primary" shape="circle" @click="priorityto()">设为优先</Button>
               <Button type="primary" shape="circle" @click="suspended(1)" >批量启动</Button>
               <Button type="primary" shape="circle" @click="suspended(2)">批量暂停</Button>
               <Button type="primary" shape="circle" @click="batchtime">批量修改投放时间</Button>
               <Button type="primary" shape="circle" @click="removestar">移除策略低星级词</Button>
             </div>
           </div>
           <div style="height: calc(100% - 100px);" ref="tabeheig">
             <Table :loading="loading" ref="selection" :height="tableHeight" border stripe :columns="columns" :data="datalist" @on-selection-change="tabelchange"></Table>
             <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
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
                 <span class="nameofthe" v-if="heisele=='MIN_PRICE'" style="width:140px;">
                   <Checkbox v-model="ifLowPrice" style="margin-right: 0;">自定义底价：</Checkbox>
                 </span>
                 <span v-if="heisele=='MIN_PRICE'">
                   <Input v-model="LowPrice" :disabled="!ifLowPrice" style="width: 60px;height: 35px;"></Input>
                 </span>
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
                    <Button type="primary" shape="circle" style="margin:0 3px; padding:4px 8px;" @click="thispage">添加本页</Button>
                    <Button type="primary" shape="circle" style="margin:0 ; padding:4px 8px;" @click="allpage">全部添加</Button>
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
                      <ul  class="keystyle">
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
                    <!--<span>已选关键词(上限为500个关键词)</span>-->
                    <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" @click="deleall">删除全部</Button>
                  </p>
                  <p>
                    <Input v-model="passkeys" placeholder="请输入关键词" style="width: 200px"></Input>
                    <Button type="primary" shape="circle" style="margin:0 10px; padding:4px 14px;" @click="keyssearch">搜索</Button>
                  </p>
                  <div style="height: 320px; border: 1px solid #DDDDDD">
                    <Table height="320" :loading="keysloading" ref="selection" border stripe :columns="columns4" :data="data4" ></Table>
                  </div>
                </div>
             </div>
           </Modal>
         </TabPane  >
         <TabPane label="效果" name="name2" >
            <b-price ref="child">

            </b-price>
         </TabPane>
       </Tabs>
     </div>
    </div>
</template>

<script>
  import BPrice from './price2.vue'
  export default {
    components:{BPrice},
    data () {
        return {
          isCustomBasePriceS:0,
          searchvalue:"",
          single:false,
          loading:false,
          tableHeight:580,
          columns:[
            {
              type: 'selection',
              "width":60,
              align: 'center'
            },
            {
              title: '策略名称',
              key: 'psName',
              align: 'center',
              render:(h, params) =>{
                 var text;
                 if(params.row.psIsFirst==0){
                   return h('div',[
                     h('span', {},params.row.psName),
                   ],);
                 }else {
                   return h('div',[
                     h('span', {},params.row.psName),
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
              key: 'psStatus',
              align: 'center',
              render:(h, params) => {
                if(params.row.psStatus==1){
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
                          console.log(111111111)
                          this.separate("2",params.row.psId);
                        }
                      }
                    }),
                  ])
                }
                if(params.row.psStatus==2){
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
              title: '排名倾向',
              key: 'psRankingTendency',
              align: 'center',
            },
            {
              title: '差价',
              key: 'psDiffPrice',
              align: 'center',
            },
            {
              title: '差价比',
              key: 'psDiffPriceProp',
              align: 'center',
            },
            {
              title: '价格区间',
              key: 'psPriceRange',
              align: 'center',
            },
            {
              title: '关键词数',
              key: 'psKeywordsCount',
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
                        this.jiaci(params.row.psId,params.row.psStatus)
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
                        this.getinfo(params.row.psId,params.row.psStatus)
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
		  ifLowPrice:false,
		  LowPrice:"",
          price2:"",
          heisele:"PAUSSE",
          heicityList:[],

          singltime:false,

          keywrod:0,
          keywrodnum:"0",

          levelsingl:false,

          immediately:false,

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
          runstate:[],


//              修改策略
          keywordsshow:false,
          control:"0",

          modetext:"新建策略",
          addpullsta:"1",
        }
    },

    mounted(){
      this.init();
      this.initsele();
      this.tableHeight =this.$refs.tabeheig.offsetHeight -100;
    },
    methods: {
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
      init(){
        this.loading=true;
        var list;
        if(this.single){
            list=1
        }else {
            list=0
        }
        this.changedata=[];
        this.api.findAccountStrat.find({reqData:{keywords:this.searchvalue,strategyType:"strategy",offset:this.offset,limit:this.limit,isExactFind:list}}).then((res)=>{
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
          this.runstate=[];
//          runstate
          for(var i=0;i<selection.length;i++){
            this.changedata.push(selection[i].psId);
            this.runstate.push(selection[i].psStatus);
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
              var Ift=0;
			  this.ifLowPrice==true?Ift = 1:Ift = 0;
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
                psDiffType:this.seledata2,
                isCustomBasePrice:Ift,
                customBasePrice:this.LowPrice
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
			  var Ift=0;
			  this.ifLowPrice==true?Ift = 1:Ift = 0;
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
                psDiffType:this.seledata2,
                isCustomBasePrice:Ift,
                customBasePrice:this.LowPrice
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
        this.immediately=false;


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
              if(objdata.dicCode=="MIN_PRICE"){
              	this.isCustomBasePriceS=objdata.isCustomBasePrice;
              	if(this.isCustomBasePriceS == 1){
              		this.ifLowPrice = true;
              	}
              	this.LowPrice = objdata.customBasePrice;
              }
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
</style>
