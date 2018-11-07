<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/productManagement">产品管理</Breadcrumb-item>
      <Breadcrumb-item>产品优化分析器</Breadcrumb-item>
    </Breadcrumb>
    <div class="main scroll" ref="main" style="overflow: auto;">
      <div ref="search">
        <Form ref="formCustom"  :model="formCustom" :rules="ruleCustom" :label-width="100">
          <Row>
            <Col span="6">
	            <FormItem label="产品分组" class="mb_10">
	              <Cascader change-on-select :data="formCustom.category" v-model="formCustom.groupId" placeholder="全部分组"></Cascader>
	            </FormItem>
            </Col>
            <Col span="6">
	            <FormItem prop="subject" label="产品名称" class="mb_10">
	              <Input v-model="formCustom.subject" @on-change="formCustom.subject=formCustom.subject.replace(/[\u4e00-\u9fa5]+/g, '')" placeholder="请输入产品名称" ></Input>
	            </FormItem>
            </Col>
            <!--<Col span="6" class="mb_10" style="padding-left: 30px;">
            	<DatePicker type="date" placeholder="选择时间" style="width: 160px" :options="time" :value="timeval" :clearable="false"></DatePicker>
            	<Select v-model="modelsele" style="width:140px">
            		<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            	</Select>
            </Col>-->
            <Col span="6">
	            <FormItem label="更新时间" class="mb_10">
	              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
	                <Option value="1" key="1">近7天</Option>
	                <Option value="2" key="2">近1天</Option>
	              </Select>
	            </FormItem>
            </Col>
            <Col span="6" v-if="!advancedSearch">
                <Button  type="primary" shape="circle" class="my-btn ml_40" @click="search('formCustom')">搜索产品</Button>
                <span class="color_blue ml_20 cursor" @click="advancedSearch = true" >
                  &lt;高级搜索
                </span>
            </Col>
            <Col span="6" class="mb_10">
            <Button v-if="advancedSearch" type="primary" shape="circle" class="my-btn ml_40 fl" @click="search('formCustom')">搜索产品</Button>
	          <span class="color_blue ml_20 fl mr_10 cursor" @click="reset" v-if="advancedSearch">
	            &lt;返回普通搜索
	          </span>
            </Col>
          </Row>
          <Row v-if="advancedSearch">
          	<Col span="6" v-if="advancedSearch">
	            <FormItem label="产品状态" class="mb_10">
	              <Select v-model="formCustom.status" clearable  placeholder="请选择产品状态" >
	                <Option value="approved" key="approved">审核通过</Option>
	                <Option value="sketch" key="sketch">草稿</Option>
	                <Option value="editingRequired" key="editingRequired">审核不通过</Option>
	                <Option value="other" key="other">审核中</Option>
	              </Select>
	            </FormItem>
            </Col>
            
            <Col span="6" v-if="advancedSearch">
            <FormItem label="负责人" class="mb_10">
              <Select v-model="formCustom.ownerMemberDisplayName" clearable  placeholder="请选择负责人">
                <Option :value="item" v-for="item in formCustom.ownerNames" :key="item">{{item}}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="展示状态" class="mb_10">
              <Select v-model="formCustom.display" clearable  placeholder="请选择展示状态" >
                <Option value="A" key="A">全部</Option>
                <Option value="Y" key="Y">已上架</Option>
                <Option value="N" key="N">已下架</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="一口价商品" class="mb_10">
              <Select v-model="formCustom.productType" clearable  placeholder="一口价商品">
                <Option value="sourcing" key="sourcing">询盘</Option>
                <Option value="wholesale" key="wholesale">一口价</Option>
              </Select>
            </FormItem>
            </Col>
            <!--<Col span="6">
            <FormItem label="图片类型" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="曝光量" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="视频产品" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="橱窗产品" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="关键字广告" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="点击量" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="访客量" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="更新日期" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>-->
            </Col>
          </Row>

        </Form>
      </div>
      <div style="display: flex;" class="mt_10">
      	<div class="ivu-col-span-4">
      		<Button type="primary" class="my-btn ml_10" style="padding: 5px 10px;" @click="newfile()"><i class="ivu-icon ivu-icon-plus-round"></i>新建分组</Button>
      	</div>
      	<div class="clr ivu-col-offset-1" style="flex: 1;">
      		<!--<p class="fl clr" style="line-height: 38px;">您公司已优化产品及软件发布产品数为 <span class="text-blue">{{numData.count}}</span> 个，获得总曝光为 <span class="text-blue">{{numData.impression}}</span> ，总点击为 <span class="text-blue">{{numData.click}}</span> ，总反馈为 <span class="text-blue">{{numData.fb}}</span> 。</p>-->
      		<div class="fr">
      			<Dropdown trigger="click" placement="left-start">
      				<a href="javascript:void(0)">
      					<Button type="primary" shape="circle" class="my-btn ml_10" style="padding: 5px 10px;" @click="">批量修改</Button>
      				</a>
      				<DropdownMenu slot="list">
      					<DropdownItem v-for="(value,key) in {subject:'产品名称',mainKeyWord:'主关键词',keyWord2:'关键词2',keyWord3:'关键词3',origin:'原产地',selImages:'产品图片',detail:'详情描述',proAttributes:'产品系统属性',selfAttrs:'产品自定义属性',priceSetting:'设置价格类型',payWay:'付款方式',deliveryTime:'发货时间',deliveryPort:'发货港口',supplyQuantity:'供货能力',packagingDesc:'常规包装',}" @click.native="modification(key)">
      						<Icon type="ios-arrow-left" color="transparent"></Icon>
      						{{value}}
      					</DropdownItem>
      				</DropdownMenu>
      			</Dropdown>
      			<Button type="primary" shape="circle" class="my-btn ml_10" style="padding: 5px 10px;" @click="findAsyncTask">同步产品</Button>
      			<Button type="primary" shape="circle" class="my-btn ml_10" style="padding: 5px 10px;" @click="allot">分配</Button>
      		</div>
      	</div>
      </div>
      <div style="display: flex;" class="mt_10">
      	<div class="ivu-col-span-3 headspan">
      		<div class="head center">
	  				优化产品分组
	  			</div>
	  			<div class="head" style="background: none">
	  				<span class="fl color_blue" style="font-size: 14px; line-height: normal;" @click="pullshow()"><Icon type="edit" class="f_14"></Icon> 编辑</span>
	  				<span class="fr color_red f_14" @click="delehtml()"><span class="iconfont icon-shanchu f_14"></span> 删除</span>
	  			</div>
	  			
	  			<Menu width="100%" style="border-left: 1px solid #dddee1;border-bottom: 1px solid #dddee1; overflow-y: auto;" :style="{maxHeight:tableHeight+'px'}" class="text-center scroll" :active-name="1" ref="menu">
            <MenuItem :name="$route.query.type?$route.query.type:1" @click.native="groupid=1">所有产品</MenuItem>
            <MenuItem name="2" @click.native="groupid=2">橱窗产品</MenuItem>
            <MenuItem :name="$route.query.type==3?1:3" @click.native="changeModal8('高曝低点产品',3)">高曝低点产品<br /><span class="iconfont icon-xingzhuang60kaobei2"style="font-size: 12px; padding: 3px 8px; background: red; color: #fff;">推荐优化</span></MenuItem>
            <MenuItem :name="$route.query.type==4?1:4" @click.native="changeModal8('低曝高点产品',4)">低曝高点产品<br /><span class="iconfont icon-xingzhuang60kaobei2"style="font-size: 12px; padding: 3px 8px; background: red; color: #fff;">推荐优化</span></MenuItem>
            <MenuItem :name="$route.query.type==5?1:5" @click.native="changeModal8('高点低反产品',5)">高点低反产品<br /><span class="iconfont icon-xingzhuang60kaobei2"style="font-size: 12px; padding: 3px 8px; background: red; color: #fff;">推荐优化</span></MenuItem>
            <MenuItem name="6" @click.native="groupid=6">已优化产品</MenuItem>
            <MenuItem name="7" @click.native="groupid=7">软件发布产品</MenuItem>
            <MenuItem :name="8+idx" v-for="(item,idx) in groupList" @click.native="groupid=item.groupid">{{item.groupname}}</MenuItem>
        	</Menu>
	  			<!--<ul class="group">
	  				<li :style="{color:index==addstyle?'#2d8cf0':'#444444'}" v-for="(item,index) in styledata" @click="addclass(index)">{{item.wgName}}</li>
	  			</ul>-->
      	</div>
      	<div class="clr ivu-col-offset-1" style="flex: 1;">
      		<Table ref="table" class="scrollbalWidth clr" :height="tableHeight" :loading="loading" border stripe :columns="columns1" :data="proData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow" @on-sort-change="sortChange"></Table>
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
	      @on-ok="addGroup()"
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
	      @on-ok="editGroup()"
	    >
	        <div>
	            <p class="mag-p">分组名称</p>
	            <Input placeholder="请输入分组名称" v-model="groupname"></Input>
	        </div>
	        
	    </Modal>
	    
	    <!--删除分组模态框-->
	    <Modal
	      ref="modal3"
	      v-model="modal3"
	      title="删除分组"
	      :styles="{top: '200px'}"
	      @on-ok="delGroup()"
	    >
	        <div class="text-center f_18">是否删除该分组，该操作不可恢复</div>
	        
	    </Modal>
	    
	    <!--分配分组模态框-->
	    <Modal
	      ref="modal4"
	      v-model="modal4"
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
	    
	    <!--词来源模态框-->
	    <Modal
	      ref="modal5"
	      v-model="modal5"
	      title="词来源"
	      :styles="{top: '200px'}"
	      @on-ok=""
	    >
	        <div slot="header" style="background: #ebf0f5;">词来源</div>
	        <div>
	        	<Table height="300" :loading="loading3" :columns="columns13" :data="keyFromList"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
	        </div>
	        <div slot="footer"></div>
	    </Modal>
	    
	    <!--打造爆款模态框-->
	    <!--<Modal
	      ref="modal7"
	      v-model="modal7"
	      :title="modal7Title"
	      :styles="{top: '200px',width:'600px'}"
	      @on-ok=""
	    >
	        <div slot="header" style="background: #ebf0f5;">{{modal7Title}}</div>
	        <div>
	        	<Table height="300" :loading="loading4" :columns="columns14" :data="tableData6"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
	        </div>
	        <div slot="footer">
	        	<div class="flex" style="justify-content: space-around;" v-if="modal7Title=='打造爆款'">
	        		<Button type="primary" shape="circle">打造爆款</Button>
	        		<Button type="primary" shape="circle">仅优先推广</Button>
	        	</div>
	        </div>
	    </Modal>-->
	    
	    <Modal
	      v-model="modal7"
	      :title="modal7Title"
	      width="700px"
	      :styles="{top: '50px'}"
	      >
		      <div>
		        <p style="margin-bottom: 15px">
		          <Input v-model="baokuan_value" placeholder="请输入关键词" style="width:200px" ></Input>
		          <Button type="primary" shape="circle" style="margin:0 20px; padding: 8px 20px;" @click="baokuanData()">搜索</Button>
		        </p>
		        <div>
		        	<Table ref="selection" :loading="baokuan_loading" :height="500" border stripe :columns="baokuan_columns" :data="baokuan_datalist" @on-selection-change="handleSelectdata"></Table>
		        </div>
		        <p>
		        	<Page v-if="baokuan_totalCount" :total="baokuan_totalCount" placement="top" :current="baokuan_current" :page-size="baokuan_limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="baokuanChangePage" @on-page-size-change="baokuanChangePageSize" style="margin-top: 5px"></Page>
		          <!--<Page v-if="p4ptotalCount" :total="p4ptotalCount" placement="top" :current="p4pcurrent" :page-size="p4plimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="p4pchangePage" @on-page-size-change="p4pchangePageSize"></Page>-->
		        </p>
		      </div>
		      <div slot="footer">
	        	<div class="flex" style="justify-content: space-around;" v-if="modal7Title=='打造爆款'">
	        		<Button type="primary" shape="circle" @click="pullstatus('Y')">打造爆款</Button>

        			<Button type="warning" shape="circle" @click="pullstatus('N')">取消推广</Button>
	        	</div>
	        </div>
	    </Modal>
	    
	    
	    
	    <!--产品词覆盖模态框-->
	    <!--<Modal
	      ref="modal6"
	      v-model="modal6"
	      title="产品词覆盖"
	      :styles="{top: '200px'}"
	      @on-ok=""
	    >
	        <div slot="header" style="background: #ebf0f5;">产品词覆盖</div>
	        <div>
	        	<Table height="300" :loading="loading5" :columns="columns15" :data="tableData7"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
	        </div>
	        <div slot="footer"></div>
	    </Modal>-->
	    <Modal
	      v-model="prodmode"
	      title="产品词覆盖"
	      width="700px"
	      :styles="{top: '60px'}"
	      >
	      <div>
	        <Table  :loading="prodloading" height="500" border stripe :columns="columns15" :data="proddatalist"></Table>
	        <Page v-if="prodtotalCount" :total="prodtotalCount" placement="top" :current="prodcurrent" :page-size="prodlimit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="prodchangePage" @on-page-size-change="prodchangePageSize"></Page>
	      </div>
	      <div slot="footer"></div>
	    </Modal>
	    
	   
	    
	    <Modal
	      ref="modal8"
	      v-model="modal8"
	      :title="modal8Title"
	      :styles="{top: '300px',width:'600px'}"
	      @on-ok=""
	      class="modalBox"
	    >
	        <div slot="header" class="f_20">系统提示</div>
	        <p class="f_16" style="text-indent: 2em;">{{modal8Title=='低曝高点产品'?'低曝高点产品，主要问题由于曝光量不足，若提升产品曝光量将能有效提升产品的点击数量。建议点击打造爆款，将产品所有P4P覆盖词进行优先推广该产品并进行竞价，从而提升产品曝光量':modal8Title=='高曝低点产品'?'高曝低点产品，主要由于各产品中部分关键词带来了较高曝光且点击率过低，建议您查看产品的词来源，根据此类曝光较高的关键词调整标题及主图内容。':'高点击低反馈产品通常由于该产品的详情页丰富性及吸引力不足。请点击编辑按钮，将产品详情页重新排版设计，补充介绍内容。'}}</p>
	        <div slot="footer" class="flex" style="justify-content: space-around;">
        		<Checkbox v-model="single">不再提醒</Checkbox>
        		<Button type="primary" class="my-btn" style="padding: 5px 10px; margin-left: 50px;" @click="modal8def(modal8Title)">确定</Button>
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
      	modal1:false,
      	modal2:false,
      	modal3:false,
      	modal4:false,
      	modal5:false,
      	modal6:false,
      	modal7:false,
      	modal8:false,
      	modal7Title:'',
      	modal8Title:'',
      	addstyle:0,//控制样式切换
      	styledata:[],  //分组查询接口参数
      	htmlname:'',
      	state:1,
      	seledata:"and",
      	groupname:'',
      	groupList:[],
      	groupid:1,
      	proData:[],
      	timeval:'',
      	cityList:[
	        {
	          value: '7',
	          label: '7天'
	        },
	        {
	          value: '30',
	          label: '一个月'
	        },
	
	      ],
	      time: {
	        disabledDate (date) {
	          return date && date.valueOf()> Date.now()-172800000 ;
	        }
	      },
	      modelsele:'7',
	      numData:{},
	      productId:[],
	      changeGroupid:0,
	      single:false,
      	modificationList:{},
      	p4pdatalist:[],
	      p4ptotalCount:0,
	      p4pcurrent:1,
	      p4plimit:15,
	      p4poffset:0,
	
	      p4psortType:"",
	      p4porder:"",
	      p4pdata:"",
	      p4pkeyname:"",
	      p4ploading:false,
//          产品词覆盖
	      prodmode:false,
	      prodloading:false,
	      columns15:[
	        {
	          title: '关键词',
	          key: 'keywords',
	          align: 'center',
	        },
	        {
	          title: '排名',
	          key: 'ranking',
	          "width": 200,
	          align: 'center',
	        },
	      ],
	      proddatalist:[],
	      prodtotalCount:0,
	      prodcurrent:1,
	      prodlimit:15,
	      prodoffset:0,
	      prodtiele:"",
	      productTitle:'',
      	
      	
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
          timeType:1,
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
            align: 'center'
          },
          {
            title: '主图',
            key: 'product_image',
            align: 'center',
            render:(h,params) => {
              return h('div', [
                h('img',{
                  attrs:{
                    src:params.row.product_image,
                    alt:'产品主图',
                    title:'产品主图'
                  },
                  style:{
                    width:'60px',
                    height:'60px',
                    verticalAlign:'middle'
                  }
                })
              ]);
            }
          },
          {
            title: '标题',
            key: 'subject',
            align: 'center',
            width: 300,
            key: 'product_title',
          },
          {
            title: '状态',
            key: 'subject',
            align: 'center',
            render:(h,params) => {
            	return h('span',{},params.row.STATUS=='approved'?'审核通过':params.row.STATUS=='failure'?'审核失败':'审核中')
            }
          },
          {
            title: '曝光',
            key: 'prd_impression_cnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '点击',
            key: 'prd_click_cnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '点击率',
            key: 'clickpc',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '反馈',
            key: 'prd_fb_cnt',
            align: 'center',
            sortable: 'custom',
          },
          {
            title: '词来源',
            key: 'prd_key_from',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              return h('span', {
                style: {
                  cursor: "pointer",
                  color: '#019bfd'
                },
                on: {
									click: () => {
										this.getWord(params.row.keyWordsId,params.row.aliProductId,this.formCustom.timeType)
										this.modal5=true
									}
								}
              }, params.row.prd_key_from)
            }
          },
//        {
//          title: '总热度',
//          key: 'sumhot',
//          align: 'center',
//        },
          {
            width:100,
            title: '操作',
            key: 'action',
            align: 'center',
            render:(h, params) => {
            	return h('div', [
                h('div',{
                  style: {
	                  cursor: "pointer",
	                  color: '#019bfd'
	                },
	                on: {
	                  click: () => {
	                    if(params.row.STATUS!=='approved' && params.row.STATUS!=='failure'){
	                      this.$Notice.warning({
	                        title: '提示',
	                        desc: '只能编辑审核通过或者修改失败的产品！'
	                      });
	                    }else if(params.row.productType=='wholesale'){
	                      this.$Notice.warning({
	                        title: '提示',
	                        desc: '只能编辑询盘商品！'
	                      });
	                    }else{
	                      this.$router.push({name:'single',params:{aliProId:params.row.productId,editor:true}})
	                    }
	                    console.log(params.row.productId)
	                  }
	                }
                },'编辑'),
                h('div',{
                  style: {
	                  cursor: "pointer",
	                  color: '#019bfd'
	                },
	                on: {
										click: () => {
											this.baokuan_sub=params.row.bepSubject
											this.baokuan_id=params.row.bepProductId
											this.baokuanData()
											this.modal7=true
											this.modal7Title='打造爆款'
										}
									}
                },'打造爆款'),
                h('div',{
                  style: {
	                  cursor: "pointer",
	                  color: '#019bfd'
	                },
	                on:{
	                	click: ()=>{
	                		var status=''
	                		if(params.row.ppProductStatus=='disabled'){
	                			status='enabled'
	                		}else{
	                			status='disabled'
	                		}
	                		this.api.tionStatus.find({reqData:{productIds:params.row.aliProductId,status:status,groupId:params.row.groupId,analysisType:''}}).then((res)=>{
				                if(res.data.status=="200"){
				                  this.$Notice.info({
				                    title:"修改成功",
				                  });
				                  this.getPro()
				                }
				            	})
	                	}
	                }
                },params.row.ppProductStatus=='disabled'?'加入推广':'取消推广')
              ]);
            }
          },
        ],
        
        tableData5:[{a:1},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2}],
        loading3:false,
        columns13: [
          {
            title: '关键词',
            align: 'center',
            key:'keywords',
          },
//        {
//          title: '曝光',
//          align: 'center',
//          "sortable": true,
//          render:(h, params) => {
//            return h('span', {
//              style: {
//                cursor: "pointer",
//                color: '#019bfd'
//              },
//            }, '123')
//          }
//        },
//        {
//          title: '点击',
//          align: 'center',
//          "sortable": true,
//          render:(h, params) => {
//            return h('span', {
//              style: {
//                cursor: "pointer",
//                color: '#019bfd'
//              },
//            }, '123')
//          }
//        },
//        {
//          title: '外贸直通车曝光',
//          align: 'center',
//          "sortable": true,
//          render:(h, params) => {
//            return h('span', {
//              style: {
//                cursor: "pointer",
//                color: '#019bfd'
//              },
//            }, '123')
//          }
//        },
//        {
//          title: '外贸直通车点击',
//          align: 'center',
//          "sortable": true,
//          render:(h, params) => {
//            return h('span', {
//              style: {
//                cursor: "pointer",
//                color: '#019bfd'
//              },
//            }, '123')
//          }
//        }
        ],
        
        tableData6:[{a:1},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2}],
        loading4:false,
        
        
        tableData7:[{a:1},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2},{b:2}],
        loading5:false,
        baokuan_columns:[
        		{
		          type: 'selection',
		          "width":60,
		          align: 'center'
		        },
            {
              title: '关键词',
              key: 'pfpPkwKeywords',
              "width":200,
              align: 'center',
            },
            {
              title: '星级',
              key: 'pfpPkwQsStar',
              align: 'center',
              render: (h, params) => {
                var imgurl;
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
            },
            {
              title: '价格',
              key: 'pfpPkwPrice',
              align: 'center',
              render: (h, params) => {
                return h('div', {
                  style:{
                    color:"#0076e8",
                    cursor:"pointer"
                  },
                  on:{
                    click: () => {
                      this.price=true;
                      this.lowprice=params.row.pfpPkwBasePrice;
                      this.wordsprice=params.row.pfpPkwKeywords;
                      this.pricevalue=params.row.pfpPkwPrice;
                      this.PriceList(params.row.pfpPkwKeywords)
                    }
                  }
                },params.row.pfpPkwPrice);

              }
            },
            {
              title: '排名',
              key: 'pfpPkwRankings',
              align: 'center',
              sortable:"custom",
              render: (h, params) => {
               if(params.row.pfpPkwRankings && params.row.pfpPkwRankings!=-1){
                 return h('div', {},params.row.pfpPkwRankings);
               }else {
                 return h('div', {},"其他位置");
               }

              }
            },
//          {
//            title: '优先推广',
//            key: 'pfpPkwStatus',
//            align: 'center',
//            "width":160,
//            sortable:"custom",
//            render: (h, params) => {
//	              return h('div',[
//	                h('span', {
//	                  style: {
//	                    display:"inline-block",
//	                    color:"#0076e8",
//	                    cursor:"pointer"
//	                  },
//	                  on:{
//	                    click: () => {
//	                      this.pullstatus('Y',params.row.pfpAlibabaKeyId)
//	                    }
//	                  }
//	                },"设置产品推广"),
//	                h('span', {
//	                  style: {
//	                    display:"inline-block",
//	                    color:"#0076e8",
//	                    cursor:"pointer"
//	                  },
//	                  on:{
//	                    click: () => {
//	                      this.pullstatus('N',params.row.pfpAlibabaKeyId)
//	                    }
//	                  }
//	                },"取消优先推广")
//	              ]);
//            }
//          },
          ],
        
        
        
        //爆款模态框数据
        baokuan_value:'',
        baokuan_limit:15,
        baokuan_offset:0,
        baokuan_order:'',
        baokuan_sortType:'',
        baokuan_datalist:[],
        baokuan_loading:false,
        baokuan_totalCount:1,
        baokuan_current:1,
        baokuan_sub:'',
        baokuan_id:'',
        keyFromList:[],
        keysId:[],
      }
    },
    created(){
      this.getOwnerNames()
      this.getAllGroups()
      this.groupid=this.$route.query.type||1
     	
//    this.getOtherDictionary('origin')
//    this.getOtherDictionary('unit')
//    this.getDictionary('time')
//    this.getDictionary('currency')
//    this.getDictionary('xqmbfl')
    },
    mounted(){
    	this.getGroup()
    	this.getPro()
    	this.getNumData()
    	this.init();
      this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-175;
      this.$nextTick(() => {
			    this.$refs.menu.updateOpened()
			    this.$refs.menu.updateActiveName()
			})
    },
    watch:{
    	groupid(){
    		this.formCustom={
          ownerNames:[],
          category:[],
          groupId:[],
          subject:'',
          status:'',
          ownerMemberDisplayName:'',
          display:'',
          productType:'',
          timeType:1,
          startTime:'',
          endTime:'',
        }
    		this.getPro()
    	}
    },
    methods:{
    	pullstatus(sta){
    		var id=this.keysId.join(',')
	      if(this.keysId.length>0){
	        this.api.updateExplos.data({reqData:{bepProductId:this.baokuan_id,keywordsId:id,status:sta}}).then((res)=>{
	          if(res.data.status=="200"){
	            this.$Notice.success({
	              title:'成功',
	            });
	            this.baokuanData();
	          }
	        })
	      }else {
	        this.$Notice.warning({
	          title: '请选择关键词',
	        });
	      }
	    },
      handleSelectdata(selection){
        this.keysId=[];
        console.log(selection);
        for(var i=0;i<selection.length;i++){
            this.keysId.push(selection[i].pfpAlibabaKeyId);
        }
        console.log(this.keysId);
      },
      
    	//获取词来源
    	getWord(id,id2,id3){
    		this.$http('alibaba/productImproveAction/getKeyWordsFrom',{keyWordsId:id,aliProductId:id2,back:id3}).then((res)=>{
    			this.keyFromList=res.rows
    		})
    	},
    	//打造爆款表格数据
    	baokuanData(){
    		this.baokuan_loading=true;
              this.api.showProductKeysdata.data({reqData:{bepProductId:this.baokuan_id,keywords:this.baokuan_value,bepSubject:this.baokuan_sub,limit:this.baokuan_limit,offset:this.baokuan_offset,order:this.baokuan_order,sort:this.baokuan_sortType}}).then((res)=>{
	        this.baokuan_loading=false;
	        if(res.data.status=="200"){
	           this.baokuan_datalist=res.data.rows;
	           this.baokuan_totalCount=res.data.total
	           setTimeout(()=>{
                this.$refs.selection.selectAll(true);
             })
	        }
	      })
    	},
    	
    	
//		//        产品词覆盖
//	    prodinit(){
//	        this.prodloading=true;
//	      this.prodmode=true;
//	      this.api.showProductCoverdata.data({reqData:{productTitle:this.prodtiele,offset:this.prodoffset,limit:this.prodlimit}}).then((res) => {
//	        if (res.data.status == 200) {
//	            this.proddatalist=res.data.rows;
//	          this.prodtotalCount=res.data.total;
//	          this.prodloading=false
//	        }
//	      })
//	    },
//	
//	    prodchangePage(currentPage){
//	      this.prodoffset = (currentPage-1)*this.prodlimit;
//	      this.prodcurrent = currentPage;
//	      this.prodinit()
//	    },
//	    prodchangePageSize(pageSize){
//	
//	      this.prodlimit = pageSize;
//	      this.prodinit()
//	    },
		//        p4p词覆盖
//	    p4pinit(){
//	      this.p4ploading=true;
//	      this.api.showP4pCoverData.data({reqData:{proId:this.p4pproId,productTitle:this.p4pdata,sort:this.p4psortType,order:this.p4porder,keywords:this.p4pkeyname,offset:this.p4poffset,limit:this.p4plimit}}).then((res)=>{
//	        this.p4ploading=false;
//	        if(res.data.status=="200"){
//	          this.p4pdatalist=res.data.rows;
//	          this.p4ptotalCount=res.data.total;
//	          console.log(this.p4pdatalist)
//	        }
//	      })
//	    },
	    baokuanChangePage(currentPage){
	      this.baokuan_offset = (currentPage-1)*this.baokuan_limit;
	      this.baokuan_current = currentPage;
	      this.baokuanData()
	    },
	    baokuanChangePageSize(pageSize){
	      this.baokuan_limit = pageSize;
	      this.baokuanData()
	    },
	    p4psearch(){
	      this.p4ptotalCount=0;
	      this.p4pcurrent=1;
	      this.p4plimit=15;
	      this.p4poffset=0;
	      this.p4pinit()
	    },
    	//批量修改
    	modification(key){
    		let proId=[]
    		for(var i in this.modificationList){
    			if(this.modificationList[i]!=='approved' && this.modificationList[i]!=='failure' && this.modificationList[i]!==0){
    				this.$Notice.warning({
              title: '提示',
              desc:'只能编辑审核通过或者修改失败的产品'
            });
              return false
            break;
    			}else{
    				proId.push(i)
    			}
    		}
    		if(proId.length>0){
    			this.$router.push({name: 'productMan', params: {key: key,productId:proId}});
    		}else{
    			this.$Notice.warning({
	          title: '提示',
	          desc:'请选择产品'
	        });
    		}
    	},
    	allot(){
    		if(this.productId.length==0){
    			this.$Notice.warning({
	          title: '提示',
	          desc: '请选择产品'
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
    		this.modal4=true
    	},
    	newfile(){//新建分组
	      this.modal1 = true;
	      this.htmlname='';
	      this.htmldata=[""];
	    },
	    addGroup(){
	    	if(this.groupname==''||!this.groupname){
	    		this.$Notice.warning({
            title: '提示',
            desc: '分组名不能为空'
          });
          return false
	    	}
	    	this.$http('alibaba/productImproveAction/addGroup',{groupname:this.groupname,grouptype:'product'}).then(data =>{
	    		this.groupname=''
	    		this.getGroup()
	    	})
	    },
	    getGroup(){
	    	this.$http('alibaba/productImproveAction/selectGroup',{grouptype:'product'}).then(data =>{
    			this.groupList=data.rows
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
	    getPro(data){
	    	this.loading=true
	    	this.$http('alibaba/productImproveAction/showProductList',{sort:sort,order:order,back:this.formCustom.timeType,groupid:this.groupid,...data}).then(res =>{
	    		
	    		
	    		for(var i=0;i<res.rows.length;i++){
	    			var num;
	    			num = res.rows[i].clickpc * 100;
	    			num = num.toFixed(2) + "%";
	    			res.rows[i].clickpc = num;
	    		}
	    		console.log(res.rows);
	    		this.proData=res.rows
	    		this.totalCount=res.total
	    		this.modificationList={}
	    		this.loading=false
	    	})
	    },
	    sortChange(column){
	    	order = column.order;
	    	sort = this.util.changeStr(column.key);
        this.$nextTick(function () {
          this.getPro({sort:this.util.changeStr(column.key),order:column.order})
        })
      },
	    getNumData(){
	    	this.$http('alibaba/productImproveAction/getAllNum').then(data =>{
	    		this.numData=data.rows[0]
	    	})
	    },
	    changeGroup(){
	    	this.$http('alibaba/productImproveAction/updateProductGroup',{groupid:this.changeGroupid,productId:this.productId.join(',')}).then(data =>{
	    		//this.numData=data
	    	})
	    },
	    changeModal8(title,id){
	    	this.modal8Title=title
	    	this.groupid=id
	    	if(!window.localStorage.getItem(title)){
	    		this.modal8=true
	    	}
	    },
	    modal8def(title){
	    	if(this.single){
	    		window.localStorage.setItem(title,true)
	    		this.single=false
	    	}
	    	this.modal8=false
	    },
	    
	    
    	//分组模块方法
	    init(){//查看分组接口
	      this.api.group_Lexicon.find().then((res)=>{
	          console.log(res);
	          this.styledata=res.data.rows;
	          this.deleId= this.styledata[this.addstyle].wgId;
	          console.log(this.deleId);
	      })
	    },
    	delehtml(){//删除接口模态框
    		if(this.groupid==1||this.groupid==2||this.groupid==3||this.groupid==4||this.groupid==5|this.groupid==6||this.groupid==7){
    			this.$Notice.warning({
            title: '提示',
            desc: '该分组不可删除'
          });
          return false
    		}
        this.modal3=true
	    },
    	pullshow(){//编辑分组模态框
    		if(this.groupid==1||this.groupid==2||this.groupid==3||this.groupid==4||this.groupid==5|this.groupid==6||this.groupid==7){
    			this.$Notice.warning({
            title: '提示',
            desc: '该分组不可修改'
          });
          return false
    		}
	      this.modal2=true
	    },
      reload(data){
        this.tableData3 = data;
        this.showModifyResult = true;
        this.getPro()
        this.selectedArr=[]
      },
      //查询是否同步阿完成
      findAsyncTask(){
        this.api.findAsyncTask.list().then((res) => {
          if(res){
            if(res.data.status==='200'){
              this.synchronousProduct()
            }else if(res.data.status === '700000'){
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
            }
          }
        })
      },
      //同步阿里
      synchronousProduct(){
        this.api.synchronousProduct.list().then((res) => {
          if(res){
            this.$Notice.success({
              title: '提示',
              desc: res.data.info
            });
          }
        })
      },
      reset(){
        this.advancedSearch = false;
        this.formCustom.status = '';
        this.formCustom.ownerMemberDisplayName = '';
        this.formCustom.display = '';
        this.formCustom.productType = '';
        this.formCustom.timeType = '';
        this.formCustom.startTime = '';
        this.formCustom.endTime = '';
      },
      formatTime(time){
        if(!time){
          return '-'
        }else{
          return this.util.formatDate(new Date(time),'yyyy-MM-dd hh:mm')
        }
      },
      chooseTime(time){
        if(time){
          this.startTime = time [0];
          this.endTime = time [1];
        }
      },
      //查询所有分组信息
      getAllGroups(){
        this.api.getAllGroups.list({
          params:[2]
        }).then((res) => {
          if(res){
            this.formCustom.category = res.data.rows;
          }
        })
      },
      //查询所有负责人
      getOwnerNames(){
        this.api.findOwnerName.list().then((res) => {
          if(res){
            this.formCustom.ownerNames = res.data.rows;
          }
        })
      },
      search(name){
      	let groupId = '';

        if(this.formCustom.groupId.length){
          groupId = this.formCustom.groupId.join(',')
        }
        let display=this.formCustom.display;
        if(this.formCustom.display=='A'){
          display=null;
        }

        this.$refs[name].validate((valid) => {
          if (valid) {
            this.current = 1;
            this.offset = 0;
            this.getPro({
            productType:this.formCustom.productType,
            subject:this.formCustom.subject,
            category:groupId,
            status:this.formCustom.status,
            display:display,
            ownerMemberDisplayName:this.formCustom.ownerMemberDisplayName,
            back:this.formCustom.timeType
            })
          }
        })
      },
      //选中行，返回选中行的数组
      chooseRow(selection) {
      	this.productId=[]
        for(var i in selection){
        	this.productId.push(selection[i].productId)
        	this.modificationList[selection[i].productId]=selection[i].status
        }
      },
      //分页
      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
        this.getPro({currentPage:this.current,showCount:this.limit})
      },
      //切换每页显示的条数
      changePageSize(pageSize){
        this.limit = pageSize;
        this.getPro({currentPage:this.current,showCount:this.limit})
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
</style>
<style scope>
	.modalBox .ivu-icon-ios-close-empty{
		color: #fff;
	}
	.modalBox .ivu-modal-header{
		background: linear-gradient(to right, #0077f0 0%,#00a2ff 100%);
		color: #fff;
	}
</style>