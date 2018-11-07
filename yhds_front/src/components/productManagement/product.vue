<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/productManagement">产品管理</Breadcrumb-item>
      <Breadcrumb-item>产品管理</Breadcrumb-item>
    </Breadcrumb>
    <div class="main" ref="main">
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
            <Col span="8" v-if="!advancedSearch">
                <Button  type="primary" shape="circle" class="my-btn ml_40" @click="search('formCustom')">搜索产品</Button>
                <span class="color_blue ml_20 cursor" @click="advancedSearch = true" >
                  &lt;高级搜索
                </span>
            </Col>
            <Col span="6" v-if="advancedSearch">
            <FormItem label="负责人" class="mb_10">
              <Select v-model="formCustom.ownerMemberDisplayName" clearable  placeholder="请选择负责人">
                <Option :value="item" v-for="item in formCustom.ownerNames" :key="item">{{item}}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row v-if="advancedSearch">
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
            <Col span="6">
            <FormItem label="更新日期" class="mb_10">
              <Select v-model="formCustom.timeType" clearable  placeholder="请选择更新日期">
                <Option value="0" key="0">任意时间</Option>
                <Option value="1" key="1">近7天</Option>
                <Option value="2" key="2">近30天</Option>
                <Option value="3" key="3">自定义</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6" v-if="formCustom.timeType==3">
            <FormItem label="日期范围" class="mb_10">
              <DatePicker  @on-change="chooseTime" type="daterange" placement="bottom-end" placeholder="请选择时间" style="width: 100%"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Button v-if="advancedSearch" type="primary" shape="circle" class="my-btn ml_40 fl" @click="search('formCustom')">搜索产品</Button>
          <span class="color_blue ml_20 fl mr_10 cursor" @click="reset" v-if="advancedSearch">
            &lt;返回普通搜索
          </span>

          <p class="fl" style="line-height: 38px;color: red;">提示：由于阿里未开放视频接口，批量修改产品后，会出现原有视频丢失的现象</p>
          <Button type="primary" shape="circle" class="my-btn ml_10 fr" @click="findAsyncTask">同步阿里</Button>
          <FormItem label="批量修改" class="fr mb_10">
            <Select v-model="modifyTit" clearable placeholder="请选择修改内容" class="width_200 " @on-change="showModifyModal">
              <Option value="subject" >产品名称</Option>
              <Option value="mainKeyWord" >主关键词</Option>
              <Option value="keyWord2" >关键词2</Option>
              <Option value="keyWord3" >关键词3</Option>
              <Option value="origin" >原产地</Option>
              <Option value="selImages" >产品图片</Option>
              <Option value="detail" >详情描述</Option>
              <Option value="proAttributes" >产品系统属性</Option>
              <Option value="selfAttrs" >产品自定义属性</Option>
              <Option value="priceSetting" >设置价格类型</Option>
              <Option value="payWay" >付款方式</Option>
              <Option value="deliveryTime" >发货时间</Option>
              <Option value="deliveryPort" >发货港口</Option>
              <Option value="supplyQuantity" >供货能力</Option>
              <Option value="packagingDesc" >常规包装</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div class="clr mt_10">
        <Table ref="table" class="scrollbalWidth" :height="tableHeight" :loading="loading"  border stripe  :columns="columns1" :data="tableData" no-data-text="对不起，目前没有任何查询结果" @on-selection-change="chooseRow" @on-sort-change="sortChange"></Table>
        <Page v-if="totalCount" :total="totalCount" placement="top" :current="current" :page-size="limit" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      </div>
    </div>
    <!--批量编辑产品名称,关键词，发货时间，港口，常规包装,系统属性,自定义属性-->
    <Modal v-model="modifySubject" :title="title" width="800" class-name="vertical-center-modal" @on-cancel="modifyType= ''">
      <Table height="300" v-if="modifyTit === 'subject'" :loading="loading2" :columns="columns2" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <Table height="300" v-if="modifyTit === 'mainKeyWord'" :loading="loading2" :columns="columns4" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <Table height="300" v-if="modifyTit === 'keyWord2'" :loading="loading2" :columns="columns5" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <Table height="300" v-if="modifyTit === 'keyWord3'" :loading="loading2" :columns="columns6" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <Table height="300" v-if="modifyTit === 'deliveryTime'" :loading="loading2" :columns="columns7" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <Table height="300" v-if="modifyTit === 'deliveryPort'" :loading="loading2" :columns="columns8" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <Table height="300" v-if="modifyTit === 'packagingDesc'" :loading="loading2" :columns="columns9" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <Table height="300" v-if="modifyTit === 'proAttributes'" :loading="loading2" :columns="columns11" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <Table height="300" v-if="modifyTit === 'selfAttrs'" :loading="loading2" :columns="columns12" :data="tableData2"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>

      <div class="clr mt_20">
        <div class="mb_10" v-if="modifyTit === 'proAttributes'">
          <span>属性名称：</span>
          <Select v-model="currentProAttrId" clearable  placeholder="请选择属性名称" style="width: 240px;">
            <Option :value="item.attributeId" :key="item.attributeId" v-for="item in proAttrs">{{item.attributeName}}</Option>
          </Select>
        </div>
        <div class="mb_10" v-if="modifyTit === 'selfAttrs'">
          <span>要编辑的属性名称：</span>
          <!--<Select v-model="modifyWay" clearable  placeholder="请选择属性名称" style="width: 200px;">
            <Option value="1" key="1" >修改属性名称</Option>
            <Option value="2" key="2" >修改属性值</Option>
          </Select>-->
          <Select v-model="currentAttrName" clearable  placeholder="请选择属性名称" style="width: 240px;">
            <Option :value="item" :key="item" v-for="item in AttrsName">{{item}}</Option>
          </Select>
          <!--<Select v-if="modifyWay==='2'" v-model="currentAttrValue" clearable  placeholder="请选择属性值" style="width: 260px;">
            <Option :value="item" :key="item" v-for="item in AttrsValue">{{item}}</Option>
          </Select>-->
        </div>
        <Form ref="modifySubject" inline>
          <div class="fl" style="width: 30%">
            <RadioGroup v-model="modifyType" vertical @on-change="changeModifyType">
              <Radio label="addAttr" v-show="modifyTit === 'selfAttrs'" style="line-height: 40px;margin-bottom: 15px">
                <span>添加属性</span>
              </Radio>
              <Radio label="add" v-show="modifyTit !== 'deliveryPort' && modifyTit !== 'packagingDesc' && modifyTit !== 'proAttributes' && modifyTit !== 'selfAttrs'" style="line-height: 40px;margin-bottom: 15px">
                <span>增加内容</span>
              </Radio>
              <Radio label="replace" style="line-height: 40px;margin-bottom: 15px">
                <span>查找和替换</span>
              </Radio>
              <Radio label="replaceAllName" v-show="modifyTit === 'deliveryPort' || modifyTit === 'packagingDesc' || modifyTit === 'proAttributes'|| modifyTit === 'selfAttrs'" style="line-height: 40px">
                <span>全部替换为</span>
              </Radio>
              <Radio label="delAttr" v-show="modifyTit === 'selfAttrs'" style="line-height: 75px;margin-bottom: 15px">
                <span>删除当前指定的属性名称的项</span>
              </Radio>
            </RadioGroup>
          </div>
          <div class="fl" style="width: 68%;">
            <div class="mb_10" v-if="modifyTit === 'selfAttrs'">
              属性名称：&nbsp;&nbsp;<Input :disabled="modifyType!='addAttr'" v-model="addValueName" style="width: 150px"></Input>
              属性值：&nbsp;&nbsp;<Input :disabled="modifyType!='addAttr'" v-model="addValue" style="width: 150px"></Input>
            </div>
            <div class="mb_10" v-if="modifyTit !== 'deliveryPort' && modifyTit !== 'packagingDesc' && modifyTit !== 'proAttributes' && modifyTit !== 'selfAttrs'">
              <CheckboxGroup v-model="modification">
                <Checkbox label="prefix" :disabled="modifyType!='add'">
                  <span>前缀</span>
                  <Input :disabled="modification.indexOf('prefix')<0" v-model="prefix" style="width: 150px"></Input>
                </Checkbox>
                <Checkbox label="suffix" :disabled="modifyType!='add'">
                  <span>后缀</span>
                  <Input :disabled="modification.indexOf('suffix')<0" v-model="suffix" style="width: 150px"></Input>
                </Checkbox>
              </CheckboxGroup>
            </div>
            <div class="mb_10">
              查找：&nbsp;&nbsp;<Input :disabled="modifyType!='replace'" v-model="lookup" style="width: 150px"></Input>
              替换为：&nbsp;&nbsp;<Input :disabled="modifyType!='replace'" v-model="replace" style="width: 150px"></Input>
            </div>
            <div>
              <Input type="textarea" v-if="modifyTit === 'deliveryPort' || modifyTit === 'packagingDesc' || modifyTit === 'proAttributes'|| modifyTit === 'selfAttrs'" :disabled="modifyType!='replaceAllName'" v-model="replaceAll" style="width: 400px"></Input>
            </div>
          </div>
        </Form>
      </div>
      <div slot="footer" class="clr center">
        <Button type="primary" shape="circle" :loading="loading2" class="my-btn ml_10 " @click="modifySub">确定</Button>
        <Button type="primary" shape="circle" class="my-btn ml_10 " @click="resetModifyModal">重置</Button>
        <Button type="warning" shape="circle" class="my-btn ml_10 " @click="modifySubject=false">取消</Button>
      </div>
    </Modal>
    <!--查看修改结果-->
    <Modal v-model="showModifyResult" class-name="vertical-center-modal small-btn-box" title="批量编辑结果" width="800">
      <Table ref="table" height="300" :columns="columns3" :data="tableData3"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>
      <div slot="footer" class="clr center"></div>
    </Modal>
    <!--修改原产地-->
    <Modal v-model="showModifyPlace" ref="showModifyPlace" class-name="vertical-center-modal small-btn-box" title="批量编辑原产地" width="350" @on-ok="modifyOrigin" @on-cancel="origin=''">
      <Select v-model="origin" clearable placeholder="请选择原产地" >
        <Option v-for="item in originArr" :value="item.dicCode">{{item.dicName}}</Option>
      </Select>
    </Modal>
    <!--修改付款方式-->
    <Modal v-model="showModifyPayWay" class-name="vertical-center-modal small-btn-box" title="批量编辑付款方式" width="430" @on-ok="modifyPayWay" @on-cancel="payment_methods=[]">
      <CheckboxGroup v-model="payment_methods">
        <Checkbox label="L/C" >L/C</Checkbox>
        <Checkbox label="D/A" >D/A</Checkbox>
        <Checkbox label="D/P" >D/P</Checkbox>
        <Checkbox label="T/T" >T/T</Checkbox>
        <Checkbox label="Western Union" >Western Union</Checkbox>
        <Checkbox label="MoneyGram" >MoneyGram</Checkbox>
      </CheckboxGroup>
    </Modal>
    <!--修改供货能力-->
    <Modal v-model="modifySupplyQuantity" title="批量编辑供货能力" width="800" class-name="vertical-center-modal small-btn-box">
      <Table height="300" :loading="loading2" :columns="columns10" :data="tableData4"  border stripe  no-data-text="对不起，目前没有任何查询结果"></Table>

      <div class="clr mt_20">
        <Form ref="modifySubject" inline>
          <div class="fl" style="width: 30%">
            <RadioGroup v-model="modifyType2" vertical @on-change="changeModifyType2">
              <Radio label="replaceAllName2"  style="line-height: 40px;margin-bottom: 15px">
                <span>全部替换为</span>
              </Radio>
              <Radio label="formula" style="line-height: 40px;margin-bottom: 15px">
                <span>使用公式(可加减)</span>
              </Radio>
              <Radio label="del"style="line-height: 40px">
                <span>删除数值</span>
              </Radio>
            </RadioGroup>
          </div>
          <div class="fl" style="width: 68%;">
            <div class="mb_10">
              <Input v-model="replaceAll2" :disabled="modifyType2!=='replaceAllName2'" style="width: 300px" @on-change="replaceAll2=replaceAll2.replace(/[\u4e00-\u9fa5]+/g, '')"></Input>
            </div>
            <div class="mb_10">
              <InputNumber :disabled="modifyType2!=='formula'" v-model="changedVal" style="width: 200px;height: 38px"></InputNumber>
            </div>
          </div>
          <div class="clr ">
            <Select clearable  v-model="supply_unit_type" class="width_260 mt_20" placeholder="请选择计量单位">
              <Option :value="item.dicCode" v-for="item in unitArr">{{item.dicName}}</Option>
            </Select>
            <Select clearable  v-model="supply_period_type" class="width_260 ml_5 mt_20" placeholder="请选择时间单位">
              <Option :value="item.dicCode" v-for="item in timeArr">{{item.dicName}}</Option>
            </Select>
          </div>
        </Form>
      </div>
      <div slot="footer" class="clr center">
        <Button type="primary" shape="circle" :loading="loading2" class="my-btn ml_10 " @click="modifySupply">确定</Button>
        <Button type="primary" shape="circle" class="my-btn ml_10 " @click="resetModifyModal">重置</Button>
        <Button type="warning" shape="circle" class="my-btn ml_10 " @click="modifySubject=false">取消</Button>
      </div>
    </Modal>
    <!--批量设置价格类型-->
    <Modal v-model="modifySupplyPrice" ref="modifySupplyPrice" title="批量设置价格类型" width="800" class-name="vertical-center-modal small-btn-box">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="价格设置">
          <RadioGroup v-model="formValidate.priceSetting">
            <Radio label="section">根据数量设置FOB阶梯价</Radio>
            <Radio label="single">单一FOB区间价格</Radio>
          </RadioGroup>
        </FormItem>
        <!--根据数量设置FOB阶梯价-->
        <div v-if="formValidate.priceSetting=='section'">
          <div>
            <FormItem label="计量单位" prop="fob_unit_type">
              <Select clearable  v-model="formValidate.fob_unit_type" placeholder="请选择计量单位" class="width_260">
                <Option :value="item.dicCode" v-for="item in unitArr">{{item.dicName}}</Option>
              </Select>
            </FormItem>
          </div>
          <div class="priceSetting-box">
            <dl class="priceSetting-con">
              <dt>
                <Row>
                  <Col span="10"><span>最小起订量 ({{formValidate.fob_unit_type}}<span v-if="!formValidate.fob_unit_type">计量单位</span>)</span></Col>
                  <Col span="10"><span>FOB价格 ({{formValidate.fob_unit_type}}<span v-if="!formValidate.fob_unit_type">计量单位</span>)</span></Col>
                </Row>
              </dt>
              <dd>
                <div v-for="(item, index) in formValidate.bulk_discount_prices"  v-if="item.status">
                  <Row>
                    <Col span="9">
                    <FormItem  :label-width="30"  label='≥' :key="index" >
                      <Input type="text" v-model="item.startQuantity" @on-blur="item.startQuantity?(item.startQuantity=Number(item.startQuantity.replace(/[^\d^\.]+/g, ''))):''" placeholder="" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="9" offset="1">
                    <FormItem  :label-width="50"  label='US $ ' :key="index">
                      <Input type="text" v-model="item.price" @on-blur="item.price?(item.price=Number(item.price.replace(/[^\d^\.]+/g, ''))):''" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="4" offset="1">
                    <Button v-if="formValidate.bulk_discount_prices.length!==1" type="ghost" @click="removeSourcingPriceRange(index)">删除</Button>
                    </Col>
                  </Row>
                </div>
                <FormItem :label-width="30">
                  <Button type="dashed" @click="addSourcingPriceRange" icon="plus-round">点击添加</Button>
                </FormItem>
              </dd>
            </dl>
            <dl class="priceSetting-preview" >
              <dt>预览(计量单位: 计量单位)</dt>
              <dd>
                <div>可根据不同的销售数量设置不同价格</div>
                <div v-for="(item, index) in formValidate.bulk_discount_prices" v-if="item.status && item.count!='' && item.price!=''">
                  <Row>
                    <Col span="10">
                    <span>≥</span><span class="ml_10">{{item.startQuantity}}</span>
                    </Col>
                    <Col span="10">
                    <span>US $</span><span class="ml_10 color_red">{{item.price}}</span>
                    </Col>
                  </Row>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <!--单一FOB区间价格-->
        <div v-else>
          <FormItem label="FOB价格" >
            <Select clearable  v-model="formValidate.fob_currency" class="width_160"  placeholder="请选择货币种类">
              <Option :value="item.dicName" v-for="item in currencyArr">{{item.dicName}}</Option>
            </Select>
            <Input class="width_260 ml_5"v-model="formValidate.fob_min_price" @on-blur="formValidate.fob_min_price?(formValidate.fob_min_price=Number(formValidate.fob_min_price.replace(/[^\d^\.]+/g, ''))):''"></Input>
            <span class="ml_5">-</span>
            <Input class="width_260 ml_5 mt_10" v-model="formValidate.fob_max_price" @on-blur="formValidate.fob_max_price?(formValidate.fob_max_price=Number(formValidate.fob_max_price.replace(/[^\d^\.]+/g, ''))):''"></Input>
            <Select clearable  v-model="formValidate.fob_unit_type" class="width_160 ml_5 mt_10" placeholder="请选择计量单位">
              <Option :value="item.dicCode" v-for="item in unitArr">{{item.dicName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="最小起订量" >
            <Input class="width_260"   v-model="formValidate.min_order_quantity" @on-blur="formValidate.min_order_quantity=formValidate.min_order_quantity.replace(/[^\d^\.]+/g, '') "></Input>
            <span v-model="formValidate.min_order_unit_type">{{formValidate.fob_unit_type}}</span>
          </FormItem>
        </div>
      </Form>
      <div slot="footer">
        <Button type="primary" shape="circle" :loading="loading2" class="my-btn ml_10 " @click="modifyPrice('formValidate')">确定</Button>
        <Button type="primary" shape="circle" class="my-btn ml_10 " @click="resetModifyModal2">重置</Button>
        <Button type="warning" shape="circle" class="my-btn ml_10 " @click="modifySupplyPrice=false">取消</Button>
      </div>
    </Modal>

    <!--图片编辑-->
    <Modal
      title="批量编辑产品图片"
      v-model="editImageData"
      width="780"
      :styles="{top: '60px'}">

      <div>

        <div>
          <p class="img_serial">
            <span>序号</span>
            <span>产品名称</span>
            <span>图片修改前</span>
            <span>图片修改后</span>
          </p>

          <ul class="img_ul">
            <li v-for="(item,index) in datalist">
              <span>{{index+1}}</span>
              <span>{{item.subject}}</span>
              <CheckboxGroup v-model="fruit_order" style="margin-right: 15px" @on-change="imageGroupChange">
                <Checkbox :label="index+'.'+0">
                  <img :src="item.images[0].imageUrl" v-if="item.images[0]">
                  <img  src="../../common/images/bg_img.png" v-else>
                </Checkbox>

                <Checkbox :label="index+'.'+1">
                  <img :src="item.images[1].imageUrl"  v-if="item.images[1]">
                  <img  src="../../common/images/bg_img.png" v-else>
                </Checkbox>

                <Checkbox :label="index+'.'+2">
                  <img :src="item.images[2].imageUrl"  v-if="item.images[2]">
                  <img  src="../../common/images/bg_img.png" v-else>
                </Checkbox>

                <Checkbox :label="index+'.'+3">
                  <img :src="item.images[3].imageUrl"  v-if="item.images[3]">
                  <img  src="../../common/images/bg_img.png" v-else>
                </Checkbox>
                <Checkbox :label="index+'.'+4">
                  <img :src="item.images[4].imageUrl"  v-if="item.images[4]">
                  <img  src="../../common/images/bg_img.png" v-else>
                </Checkbox>
                <Checkbox :label="index+'.'+5">
                  <img :src="item.images[5].imageUrl"  v-if="item.images[5]">
                  <img  src="../../common/images/bg_img.png" v-else>
                </Checkbox>
              </CheckboxGroup>

              <div class="imgarr">
                <img :src="imglist[index].images[0].imageUrl" v-if="imglist[index].images[0]">
                <img  src="../../common/images/bg_img.png" v-else>
                <img :src="imglist[index].images[1].imageUrl" v-if="imglist[index].images[1]">
                <img  src="../../common/images/bg_img.png" v-else>
                <img :src="imglist[index].images[2].imageUrl" v-if="imglist[index].images[2]">
                <img  src="../../common/images/bg_img.png" v-else>
                <img :src="imglist[index].images[3].imageUrl" v-if="imglist[index].images[3]">
                <img  src="../../common/images/bg_img.png" v-else>
                <img :src="imglist[index].images[4].imageUrl" v-if="imglist[index].images[4]">
                <img  src="../../common/images/bg_img.png" v-else>
                <img :src="imglist[index].images[5].imageUrl" v-if="imglist[index].images[5]">
                <img  src="../../common/images/bg_img.png" v-else>
              </div>

            </li>

          </ul>
        </div>
        <p style="padding: 5px 0;display: flex;justify-content: space-between">
          <Button type="primary" shape="circle" @click="replaceImg">替换</Button>
          <Button type="warning" shape="circle" @click="removeImg">删除</Button>
        </p>

        <div style="padding-top: 15px;border: 1px solid #DDDDDD">
          <div class="img_body">
            <p>
              <Upload
                :show-upload-list="false"
                multiple
                :action="aurl+'/alibaba/imageUpload/doFileUpload'"
                accept="image/png,image/jpeg,image/jpg"
                :max-size="5120"
                multiple
                :on-success="handleSuccess"
                :on-error="handleError"
                style="display: inline-block"
              >
                <Button type="primary" shape="circle">添加图片</Button>
              </Upload>




              <span @click="library">从图片库选取</span>
              <span @click="bank">从图片银行选取</span>
            </p>
            <p>
              <RadioGroup v-model="animal_order">
                <Radio label="顺序使用"></Radio>
                <Radio label="随机使用"></Radio>
              </RadioGroup>
            </p>
          </div>

          <div class="img_tiele">
            <p>
              <span>序号</span>
              <span>图片</span>
              <span>操作</span>
            </p>

            <ul>
              <li v-for="(item,index) in imgAll">
                <span>{{index+1}}</span>
                <span><img :src="item" ></span>
                <span>

                  <b @click="word_upRecord(index)">
                    <Icon type="ios-arrow-thin-up"></Icon>
                  </b>
                  <b @click="word_downRecord(index)">
                    <Icon type="ios-arrow-thin-down"></Icon>
                  </b>

                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div slot="footer">
        <Button type="primary" shape="circle" @click="ImgAgain">重来</Button>
        <Button type="primary" shape="circle" @click="ModifyImgOk" :loading="loadingImg">确定</Button>
        <Button type="warning" shape="circle" @click="CancelImg">取消</Button>
      </div>
    </Modal>
    <detail :showDetail=showDetail :tableData="tableData2" :navList="xqmbflArr" v-on:hidePreview="showDetail=false" v-on:reload="reload"></detail>

    <b-images ref="child" @imgBank="acceptBank"></b-images>
    <l-images ref="child2" @imgLib="accept"></l-images>
  </div>
</template>
<script>
import BImages from "../../components/imageVue/imageBank.vue"
import LImages from "../../components/imageVue/imageLibrary.vue"
import Detail from './detail';
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
            align: 'center'
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '主图',
            key: 'mainImageUrl',
            align: 'center',
            render:(h,params) => {
              return h('div', [
                h('img',{
                  attrs:{
                    src:params.row.images[0].imageUrl,
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
          /*       {
                   title: '价格',
                   key: 'bkwSearchHot',
                   align: 'center',
                 },*/
          {
            title: '负责人',
            key: 'ownerMemberDisplayName',
            align: 'center',
          },
          {
            title: '更新时间',
            key: 'gmtModified',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              if(params.row.display==='Y'){
                return h('div',[
                  h('div',this.formatTime(params.row.gmtModified)),
                  h('div','已上架')
                ])
              }else if(params.row.display==='N'){
                return h('div',[
                  h('div',this.formatTime(params.row.gmtModified)),
                  h('div','已下架')
                ])
              }

            }
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render:(h, params) => {
              if(params.row.status==='approved'){
                return h('span','审核通过')
              }else if(params.row.status==='sketch'){
                return h('span','草稿')
              }else if(params.row.status==='editingRequired'){
                return h('span','审核不通过')
              }else if(params.row.status==='modifying'){
                return h('span','修改中')
              }else if(params.row.status==='failure'){
                return h('span','修改失败')
              }else{
                return h('span','审核中')
              }
            }
          },
          {
            width:200,
            title: '操作',
            key: 'action',
            align: 'center',
            render:(h, params) => {
              return h('span', {
                style: {
                  cursor: "pointer",
                  color: '#019bfd'
                },
                on: {
                  click: () => {
                    if(params.row.status!=='approved' && params.row.status!=='failure'){
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
                      this.$router.push({name:'single',params:{aliProId:params.row.proId,editor:true }})
                    }
                    console.log(params.row.proId)
                  }
                }
              }, '编辑')
            }
          },
        ],
        tableData:[],
        //批量修改
        title:'',//模态框的标题
        modifyTit:'',
        selectedArr:[],
        mainData:[],//批量修改查询的数据

        //修改产品名称
        modifyType:'add',//增加或者查找替换
        modification:[],
        prefix:'',//前缀
        suffix:'',//后缀
        lookup:'',//查找
        replace:'',//替换
        replaceAll:'',//全部替换
        addValueName:'',//添加的属性名称
        addValue:'',//添加的属性值

        columns2:[
          {
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称修改前',
            key: 'subject',
            align: 'center',
          },
          {
            title: '修改后',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              /*if(this.modifyType ==='add'){
                if(this.modification.length===1){
                  if(this.modification.indexOf('prefix')>-1){
                    params.row.subject2 = this.prefix + params.row.subject
                  }else if(this.modification.indexOf('suffix')>-1){
                    params.row.subject2 = params.row.subject + this.suffix
                  }
                }else if(this.modification.length===2){
                  params.row.subject2 = this.prefix + params.row.subject + this.suffix
                }else{
                  params.row.subject2 = params.row.subject
                }
              }else if(this.modifyType ==='replace'){
                if(this.lookup && this.replace){
                  params.row.subject2 = params.row.subject.replace(new RegExp(this.lookup,'g'),this.replace)
                }
              }*/
              if(this.modifyType){
                params.row.subject2=(this.prefix + params.row.subject + this.suffix).replace(new RegExp(this.lookup,'g'),this.replace)
              }
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject2=val;
                  },
                }
              })
            }
          },
        ],
        tableData2:[],
        modifySubject:false,

        //修改关键词
        columns4:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '主关键词修改前',
            key: 'keywords1',
            align: 'center',
          },
          {
            title: '修改后',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              if(this.modifyType){
                params.row.subject2=(this.prefix + params.row.keywords1 + this.suffix).replace(new RegExp(this.lookup,'g'),this.replace)
              }
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject2=val;

                  },
                }
              })

            }
          },
        ],
        columns5:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '关键词2修改前',
            key: 'keywords2',
            align: 'center',
          },
          {
            title: '修改后',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              if(this.modifyType){
                params.row.subject2=(this.prefix + params.row.keywords2 + this.suffix).replace(new RegExp(this.lookup,'g'),this.replace)
              }
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject2=val;

                  },
                }
              })

            }
          },
        ],
        columns6:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '关键词2修改前',
            key: 'keywords3',
            align: 'center',
          },
          {
            title: '修改后',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              if(this.modifyType){
                params.row.subject2=(this.prefix + params.row.keywords3 + this.suffix).replace(new RegExp(this.lookup,'g'),this.replace)
              }
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject2=val;

                  },
                }
              })

            }
          },
        ],
        columns7:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '发货时间修改前',
            key: 'deliveryTime',
            align: 'center',
            render:(h, params) => {
              return h('span', params.row.sourcingTrad.deliveryTime)
            }
          },
          {
            title: '修改后',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              if(this.modifyType && params.row.sourcingTrad.deliveryTime){
                params.row.subject2=(this.prefix + params.row.sourcingTrad.deliveryTime + this.suffix).replace(new RegExp(this.lookup,'g'),this.replace)
              }
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject2=val;

                  },
                }
              })

            }
          },
        ],
        columns8:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '发货港口修改前',
            key: 'deliveryPort',
            align: 'center',
            render:(h, params) => {
              return h('span', params.row.sourcingTrad.deliveryPort)
            }
          },
          {
            title: '修改后',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              if(this.modifyType==='replace'){
                params.row.subject2=params.row.sourcingTrad.deliveryPort.replace(new RegExp(this.lookup,'g'),this.replace)
              }else if(this.modifyType==='replaceAllName'){
                if(this.replaceAll){
                  params.row.subject2=this.replaceAll
                }
              }
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject2=val;

                  },
                }
              })

            }
          },
        ],
        columns9:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '常规包装修改前',
            key: 'packagingDesc',
            align: 'center',
            render:(h, params) => {
              return h('span', params.row.sourcingTrad.packagingDesc)
            }
          },
          {
            title: '修改后',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              if(this.modifyType==='replace'){
                params.row.subject2=params.row.sourcingTrad.packagingDesc.replace(new RegExp(this.lookup,'g'),this.replace)
              }else if(this.modifyType==='replaceAllName'){
                if(this.replaceAll){
                  params.row.subject2=this.replaceAll
                }
              }
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject2=val;

                  },
                }
              })

            }
          },
        ],
        columns11:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '属性修改前',
            key: 'proAttrs',
            align: 'center',
            render:(h, params) => {
              let proAttributes=JSON.parse(params.row.proAttributes);
              let currentProAttrName='';
              for(let i=0;i<proAttributes.length;i++){
                if(proAttributes[i].attrId===this.currentProAttrId){
                  currentProAttrName=proAttributes[i].valueName
                }
              }
              return h('span', currentProAttrName)
            }
          },
          {
            title: '修改后',
              key: 'subject2',
            align: 'center',
            render:(h, params) => {
              let proAttributes=JSON.parse(params.row.proAttributes);
              let currentProAttrName='';
              for(let i=0;i<proAttributes.length;i++){
                if(proAttributes[i].attrId===this.currentProAttrId){
                  currentProAttrName=proAttributes[i].valueName
                }
              }

              if(this.modifyType==='replace'){
                params.row.subject2=currentProAttrName.replace(new RegExp(this.lookup,'g'),this.replace)
              }else if(this.modifyType==='replaceAllName'){
                if(this.replaceAll){
                  params.row.subject2=this.replaceAll
                }
              }

              for(let i=0;i<proAttributes.length;i++){
                if(proAttributes[i].attrId===this.currentProAttrId){
                  proAttributes[i].valueName=params.row.subject2
                }
              }
              params.row.proAttributes2=JSON.stringify(proAttributes)
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject2=val;

                  },
                }
              })

            }
          },
        ],
        columns12:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '属性值修改前',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              let attributes=params.row.attributes;
              let attrName='';
              for(let i=0;i<attributes.length;i++){
                if(attributes[i].attributeName===this.currentAttrName){
                  attrName=attributes[i].valueName
                }
              }
              params.row.subject2=attrName
              return h('span', attrName)
            }
          },
          {
            title: '修改后',
            key: 'subject3',
            align: 'center',
            render:(h, params) => {
              if(params.row.subject2){
                if(this.modifyType==='replace'){
                  params.row.subject3=params.row.subject2.replace(new RegExp(this.lookup,'g'),this.replace)
                }else if(this.modifyType==='replaceAllName'){
                  if(this.replaceAll){
                    params.row.subject3=this.replaceAll
                  }
                }else if(this.modifyType==='addAttr'){
                  params.row.subject3=params.row.subject2;
                }else if(this.modifyType ==='delAttr'){
                  params.row.subject3=''
                }
              }else{
                params.row.subject3=''
              }
              let attributes=params.row.attributes2;
              for(let i=0;i<attributes.length;i++){
                if(attributes[i].attributeName===this.currentAttrName){
                  attributes[i].valueName=params.row.subject3
                }
              }
              this.tableData2[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject3,
                  disabled:params.row.subject2===''?true:false
                },
                on:{
                  'input':(val) => {
                    this.modifyType='';
                    this.modification=[];
                    params.row.subject3=val;

                  },
                }
              })

            }
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render:(h, params) => {
              let status='';
              if(this.currentAttrName){
                status=params.row.subject2===''?'属性不存在':''
              }
              return h('span', status)
            }
          },
        ],
        //修改结果列表弹窗
        showModifyResult:false,
        columns3:[
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '修改结果',
            key: 'proSubCode',
            align: 'center',
            render:(h,params) => {
              if(!params.row.proSubCode){
                return h('span','修改成功')
              }else{
                return h('span',params.row.proSubCode)
              }
            }
          }
        ],
        tableData3:[],
        //修改原产地
        showModifyPlace:false,
        originArr:[],
        origin:'',
        //修改付款方式
        showModifyPayWay:false,
        payment_methods:[],
        //修改供货能力
        modifySupplyQuantity:false,
        columns10:[
          {
            width:60,
            title: '序号',
            key: 'index',
            align: 'center',
            render:(h, params) => {
              return h('span', params.index+1)
            }
          },
          {
            title: '产品名称',
            key: 'subject',
            align: 'center',
          },
          {
            title: '供货能力修改前',
            key: 'supplyQuantity',
            align: 'center',
            render:(h, params) => {
              if(!params.row.sourcingTrad.supplyQuantity){
                params.row.sourcingTrad.supplyQuantity=''
              }
              if(!params.row.sourcingTrad.supplyUnitType){
                params.row.sourcingTrad.supplyUnitType=''
              }
              if(!params.row.sourcingTrad.supplyPeriodType){
                params.row.sourcingTrad.supplyPeriodType=''
              }
              return h('span', params.row.sourcingTrad.supplyQuantity+'  '+params.row.sourcingTrad.supplyUnitType+'  '+params.row.sourcingTrad.supplyPeriodType)
            }
          },
          {
            title: '修改后',
            key: 'subject2',
            align: 'center',
            render:(h, params) => {
              if(this.modifyType2==='replaceAllName2'){
                if(this.replaceAll2){
                  params.row.subject2=this.replaceAll2
                }else {
                  params.row.subject2=params.row.sourcingTrad.supplyQuantity
                }
              }else if(this.modifyType2==='formula'){
                params.row.subject2=Number(params.row.sourcingTrad.supplyQuantity)+this.changedVal;
              }else if(this.modifyType2==='del'){
                params.row.subject2=''
              }
              this.tableData4[params.index]= params.row;
              return h('Input',{
                props:{
                  value:params.row.subject2
                },
                on:{
                  'input':(val) => {
                    this.modifyType2='';
                    params.row.subject2=val;

                  },
                }
              })

            }
          },
        ],
        tableData4:[],
        modifyType2:'',
        replaceAll2:'',
        changedVal:0,
        //批量设置价格类型
        modifySupplyPrice:false,
        formValidate:{
          priceSetting:'section',
          //FOB计量单位，枚举值
          fob_unit_type:'',
          //根据数量设置的折扣价
          bulk_discount_prices:[
            {
              startQuantity:null,
              price:'',
              index: 1,
              status: 1
            }
          ],
          discountPrices:[],
          //FOB货币价格，枚举值
          fob_currency:'',
          //FOB最小价格
          fob_min_price:'',
          //FOB最大价格
          fob_max_price:'',
          //最小起订量
          min_order_quantity:'',
          //最小起订量计量单位，枚举值
          min_order_unit_type:'',

        },
        ruleValidate:{
          fob_unit_type:[
            {type: 'string',required:true,message: '请选择计量单位!',  trigger: 'change' }
          ],
        },
        proAttrs:[],
        currentProAttrId:'',
        AttrsName:[],
        currentAttrName:'',
        AttrsValue:[],
        currentAttrValue:'',
        modifyWay:'1',
        //修改详情
        showDetail:false,


//        图片编辑
        loadingImg:false,
        NewImgData:[],
        aurl:process.env.API_ROOT,
        editImageData:false,
        animal_order:"顺序使用",
        fruit_order:[],

        imglist:[],
        datalist:[],

        imgAll:[],
      }
    },
    created(){
      this.getOwnerNames()
      this.getAllGroups()
      this.loadData()
      this.getOtherDictionary('origin')
      this.getOtherDictionary('unit')
      this.getDictionary('time')
      this.getDictionary('currency')
      this.getDictionary('xqmbfl')
    },
    mounted(){
    	if(this.$route.params.productId){
    		this.selectedArr=this.$route.params.productId
    		this.modifyTit=this.$route.params.key
      	this.showModifyModal(this.$route.params.key)
    	}
      this.tableHeight =this.$refs.main.offsetHeight - this.$refs.search.offsetHeight-175;
    },
    methods:{
      reload(data){
        this.tableData3 = data;
        this.showModifyResult = true;
        this.loadData()
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
      loadData(){

        this.loading = true;
        let groupId = '';

        if(this.formCustom.groupId.length){
          groupId = this.formCustom.groupId.join(',')
        }
        let display=this.formCustom.display;
        if(this.formCustom.display=='A'){
          display=null;
        }
        this.api.showAllProduct.list({
          reqData:{
            sort:this.sort,
            order:this.order,
            offset:this.offset,
            limit:this.limit,
            timeType:this.formCustom.timeType,
            productType:this.formCustom.productType,
            subject:this.formCustom.subject,
            groupId:groupId,
            status:this.formCustom.status,
            display:display,
            ownerMemberDisplayName:this.formCustom.ownerMemberDisplayName,
            startTime:this.formCustom.startTime,
            endTime:this.formCustom.endTime,
          }
        }).then((res) => {
          this.loading = false;
          console.log(res)
          if(res){
            this.tableData = res.data.rows;
            this.totalCount = res.data.total;
          }
          
        })
      },
      search(name){

        this.$refs[name].validate((valid) => {
          if (valid) {
            this.current = 1;
            this.offset = 0;
            this.loadData()
          }
        })
      },
      //选中行，返回选中行的数组
      chooseRow(selection) {
        console.log(selection);
        this.NewImgData=[];
        let arr =[]
        for(var i=0;i<selection.length;i++){
          if(selection[i].status!=='approved' && selection[i].status!=='failure'){
            this.$Notice.warning({
              title: '提示',
              desc:'只能编辑审核通过或者修改失败的产品'
            });
            break;
          }else{
            arr.push(selection[i].proId);
            this.NewImgData.push(selection[i]);

          }
        }
        this.selectedArr = arr;
        console.log(this.selectedArr)
      },
      //排序
      sortChange(column){
        //column->{column:{title: "搜索热度", key: "bkwSearchHot", align: "center", sortable: true},key:"bkwSearchHot",order:"desc"}
        this.sort = this.util.changeStr(column.key);
        this.order=column.order;
        this.offset=0;
        this.current=1;
        this.$nextTick(function () {
          this.loadData()
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
      //批量查询产品详情
      findByIds(idArr){
        this.loading2=true
        this.api.findByIds.list({
          reqData:idArr
        }).then((res) => {
          this.loading2=false
          if(res){
            let arr = res.data.rows;
            this.mainData=arr;
            for(let i=0;i<arr.length;i++){
              arr[i].subject2=''
              arr[i].subject3=''
              arr[i].proAttributes2=''
              arr[i].attributes2=arr[i].attributes
              arr[i].description2=arr[i].description
            }
            this.tableData2 = arr;
            this.tableData4 = arr;
          }
        })
      },
      //查询系统属性列表值
      findProAttrs(idArr){
        this.api.findProAttrs.list({
          reqData:idArr
        }).then((res) => {
          if(res){
            this.proAttrs=res.data.rows;
            if(res.data.rows.length){
              this.currentProAttrId=res.data.rows[0].attributeId
            }
          }
        })
      },
      //查询自定义属性名称
      findAttrs(idArr){
        this.api.findAttrs.list({
          reqData:idArr
        }).then((res) => {
          if(res){
            this.AttrsName=res.data.rows;
            if(res.data.rows.length){
              this.currentAttrName=res.data.rows[0]
            }
          }
        })
      },
      //查询自定义属性值
      findValues(idArr){
        this.api.findValues.list({
          reqData:idArr
        }).then((res) => {
          if(res){
            this.AttrsValue=res.data.rows;

          }
        })
      },
      //批量修改标题弹窗
      showModifyModal(modifyTit){
        if(modifyTit){
          if(!this.selectedArr.length){
            this.$Notice.warning({
              title: '提示',
              desc:'请至少选择一条产品'
            });
          }else{
            this.modifyType= 'add'
            this.modification = []
            this.prefix='';
            this.suffix=''
            this.lookup=''
            this.replace=''
            this.changedVal=0;
            this.replaceAll2=''
            this.replaceAll='';
            this.addValue='';
            this.addValueName='';
            this.modifyType2= 'replaceAllName2'
            if(this.modifyTit === 'subject'){
              this.title='批量编辑标题'
            }else if(this.modifyTit === 'mainKeyWord'){
              this.title='批量编辑主关键词'
            }else if(this.modifyTit === 'keyWord2'){
              this.title='批量编辑关键词2'
            }else if(this.modifyTit === 'keyWord3'){
              this.title='批量编辑关键词3'
            }else if(this.modifyTit === 'deliveryPort'){
              this.title='批量编辑发货港口'
              this.modifyType= 'replace'
            }else if(this.modifyTit === 'packagingDesc'){
              this.title='批量编辑常规包装'
              this.modifyType= 'replace'
            }else if(this.modifyTit === 'deliveryTime'){
              this.title='批量编辑发货时间'
            }else if(this.modifyTit === 'proAttributes'){
              this.title='批量编辑产品系统属性'
              this.modifyType= 'replace'
              this.findProAttrs(this.selectedArr)
            }else if(this.modifyTit === 'selfAttrs'){
              this.modifyType= 'addAttr'
              this.title='批量编辑产品自定义属性'
              this.findAttrs(this.selectedArr)
              this.findValues(this.selectedArr)
            }else if(this.modifyTit === 'selImages'){
              this.ImgShow()
            }

            this.findByIds(this.selectedArr)
            if(this.modifyTit === 'subject' || this.modifyTit === 'mainKeyWord' || this.modifyTit==='keyWord2'|| this.modifyTit==='keyWord3' || this.modifyTit==='deliveryTime'|| this.modifyTit==='deliveryPort' || this.modifyTit==='packagingDesc' || this.modifyTit==='proAttributes' || this.modifyTit==='selfAttrs'){
              this.modifySubject = true;

            }else if(this.modifyTit === 'origin'){
              this.showModifyPlace = true;
            }else if(this.modifyTit === 'payWay'){
              this.showModifyPayWay = true;
            }else if(this.modifyTit === 'supplyQuantity'){
              this.modifySupplyQuantity = true;
            }else if(this.modifyTit ==='priceSetting'){
              this.resetModifyModal2()
              this.modifySupplyPrice = true;
            }else if(this.modifyTit ==='detail'){
              this.showDetail = true;
            }

          }
        }
      },
      //批量编辑产品名称,关键词，发货时间，港口，常规包装,系统属性,自定义属性
      modifySub(){
        let reqData = [];
        for(let i=0;i<this.tableData2.length;i++){
          let subject=this.tableData2[i].subject;
          let keywords1=this.tableData2[i].keywords1;
          let keywords2=this.tableData2[i].keywords2;
          let keywords3=this.tableData2[i].keywords3;
          let deliveryTime=this.mainData[i].sourcingTrad.deliveryTime;
          let deliveryPort=this.mainData[i].sourcingTrad.deliveryPort;
          let packagingDesc=this.mainData[i].sourcingTrad.packagingDesc;
          let proAttributes=this.tableData2[i].proAttributes;
          let attributes=this.tableData2[i].attributes;
          if(this.modifyTit === 'subject'){
            subject = this.tableData2[i].subject2
          }else if(this.modifyTit === 'mainKeyWord'){
            keywords1 = this.tableData2[i].subject2
          }else if(this.modifyTit === 'keyWord2'){
            keywords2 = this.tableData2[i].subject2
          }else if(this.modifyTit === 'keyWord3'){
            keywords3 = this.tableData2[i].subject2
          }else if(this.modifyTit === 'deliveryTime'){
            deliveryTime = this.tableData2[i].subject2
          }else if(this.modifyTit === 'deliveryPort'){
            deliveryPort = this.tableData2[i].subject2
          }else if(this.modifyTit === 'packagingDesc'){
            packagingDesc = this.tableData2[i].subject2
          }else if(this.modifyTit === 'proAttributes' && this.currentProAttrId){
            proAttributes = this.tableData2[i].proAttributes2
          }else if(this.modifyTit === 'selfAttrs' && this.currentAttrName) {
            attributes = [];
            for (let j = 0; j < this.tableData2[i].attributes2.length; j++) {
              attributes.push({
                attributeName: this.tableData2[i].attributes2[j].attributeName,//属性名称
                valueName: this.tableData2[i].attributes2[j].valueName, //属性值名称
                attType: '2'  //---------属性类型(1:类目属性，2：自定义)
              })
            }

            if (this.modifyType === 'addAttr') {
              if (this.addValueName && this.addValue) {
                attributes.push({
                  attributeName: this.addValueName,//属性名称
                  valueName: this.addValue, //属性值名称
                  attType: '2'  //---------属性类型(1:类目属性，2：自定义)
                })
              }else{
                this.$Notice.success({
                  title: '提示',
                  desc: '请同时填写属性名称和属性值'
                });
              }
            }else if(this.modifyType ==='delAttr'){
              for(let j=0;j<attributes.length;j++){
                if(attributes[j].attributeName===this.currentAttrName){
                  attributes[j]=''
                }
              }
            }
            this.util.removeEmptyArrayEle(attributes)
          }
          reqData.push({
            groupId:this.tableData2[i].groupId,
            subject:subject,
            proId:this.tableData2[i].proId,
            productId:this.tableData2[i].productId,
            proNumId:this.tableData2[i].proNumId,
            keywords1:keywords1,
            keywords2:keywords2,
            keywords3:keywords3,
            categoryId:this.tableData2[i].categoryId,
            language:this.tableData2[i].language,
            productType:this.tableData2[i].productType,
            market:this.tableData2[i].market,
            proAttributes:proAttributes,
            attributes:attributes,
            sourcingTrad:{
              pstId:this.tableData2[i].sourcingTrad.pstId,
              deliveryTime:deliveryTime,
              deliveryPort:deliveryPort,
              packagingDesc:packagingDesc,
            }
          })
        }
        console.log(reqData)
        this.loading2 = true;
        this.api.batchModify.list({
          reqData:reqData
        }).then((res) => {
          this.loading2 = false;
          if(res){

            this.modifySubject = false
            this.tableData3 = res.data.rows;
            this.showModifyResult = true;
            this.loadData()
            this.selectedArr=[]
            if(res.data.status!=='200') {
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
            }
          }
        })
      },
      //重置
      resetModifyModal(){
        this.modifyType= ''
        this.modification = []
        this.prefix='';
        this.suffix=''
        this.lookup=''
        this.replace=''
        this.changedVal=0;
        this.replaceAll2=''
        this.replaceAll=''
        this.addValue='';
        this.addValueName="";
        this.modifyType2= 'replaceAllName2'
      },
      changeModifyType(type){
        if(type==='add'){
          this.lookup=''
          this.replace=''
          this.replaceAll=''
          this.addValueName='';
          this.addValue='';
        }else if(type==='replace'){
          this.modification = []
          this.prefix='';
          this.suffix=''
          this.replaceAll=''
          this.addValueName='';
          this.addValue='';
        }else if(type==='addAttr'){
          this.lookup=''
          this.replace=''
          this.replaceAll=''
        }else {
          this.replaceAll=''
          this.lookup=''
          this.replace=''
          this.modification = []
          this.prefix='';
          this.suffix=''
          this.addValueName='';
          this.addValue='';
        }
      },
      //获取所有原产地
      getDictionary(type){
        this.api.dictionary.list({
          params:[type]
        }).then((res) => {
          if(type==='time'){
            this.timeArr = res.data.rows;
          }else if(type==='currency'){
            this.currencyArr = res.data.rows;
          }else if(type==='xqmbfl'){
            this.xqmbflArr = res.data.rows;
          }
        })
      },
      //获取原产地信息,计量单位
      getOtherDictionary(type){
        this.api.findByType.list({
          params:[type]
        }).then((res) => {
          if(type==='origin'){
            this.originArr = res.data.rows;
          }else if(type==='unit'){
            this.unitArr = res.data.rows;
          }

        })
      },
      modifyOrigin(){
        let reqData = [];
        for(let i=0;i<this.mainData.length;i++){
          let proAttributes=JSON.parse(this.mainData[i].proAttributes)
          for(let j=0;j<proAttributes.length;j++){
            if(proAttributes[j].enName==='Place of Origin'){
              console.log(proAttributes[j].valueName)
              if(this.origin){
                proAttributes[j].valueName=this.origin;
              }
            }
          }
          reqData.push({
            groupId:this.mainData[i].groupId,
            subject:this.mainData[i].subject,
            proId:this.mainData[i].proId,
            productId:this.mainData[i].productId,
            proNumId:this.mainData[i].proNumId,
            keywords1:this.mainData[i].keywords1,
            keywords2:this.mainData[i].keywords2,
            keywords3:this.mainData[i].keywords3,
            categoryId:this.tableData2[i].categoryId,
            language:this.tableData2[i].language,
            productType:this.tableData2[i].productType,
            market:this.tableData2[i].market,
            proAttributes:JSON.stringify(proAttributes)
          })
        }
        console.log(reqData)
        this.loading2 = true;
        this.api.batchModify.list({
          reqData:reqData
        }).then((res) => {
          this.loading2 = false;
          if(res){
            this.tableData3 = res.data.rows;
            this.showModifyResult = true;
            this.loadData()
            this.selectedArr=[]
            if(res.data.status!=='200') {
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
            }
          }
        })
      },
      //修改付款方式
      modifyPayWay(){
        let reqData = [];
        for(let i=0;i<this.mainData.length;i++){
          let paymentMethods=this.mainData[i].sourcingTrad.paymentMethods;
          if(this.payment_methods.length){
            paymentMethods=this.payment_methods.join(',')
          }
          reqData.push({
            groupId:this.mainData[i].groupId,
            subject:this.mainData[i].subject,
            proId:this.mainData[i].proId,
            productId:this.mainData[i].productId,
            proNumId:this.mainData[i].proNumId,
            keywords1:this.mainData[i].keywords1,
            keywords2:this.mainData[i].keywords2,
            keywords3:this.mainData[i].keywords3,
            categoryId:this.tableData2[i].categoryId,
            language:this.tableData2[i].language,
            productType:this.tableData2[i].productType,
            market:this.tableData2[i].market,
            sourcingTrad:{
              pstId:this.tableData2[i].sourcingTrad.pstId,
              paymentMethods:paymentMethods
            }
          })
        }
        this.loading2 = true;
        this.api.batchModify.list({
          reqData:reqData
        }).then((res) => {
          this.loading2 = false;
          if(res){
            this.tableData3 = res.data.rows;
            this.showModifyResult = true;
            this.loadData()
            this.selectedArr=[]
            if(res.data.status!=='200') {
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
            }
          }
        })

      },
      //修改供货能力
      changeModifyType2(type){
        if(type==='replaceAllName2'){
          this.changedVal=0;
        }else if(type==='formula'){
          this.replaceAll2=''
        }else{
          this.changedVal=0;
          this.replaceAll2=''
        }
      },
      modifySupply(){
        let reqData = [];
        for(let i=0;i<this.mainData.length;i++){
          let supplyUnitType=this.tableData4[i].sourcingTrad.supplyUnitType;
          let supplyPeriodType=this.tableData4[i].sourcingTrad.supplyPeriodType;
          if(this.supply_unit_type){
            supplyUnitType=this.supply_unit_type
          }
          if(this.supply_period_type){
            supplyPeriodType=this.supply_period_type
          }
          reqData.push({
            groupId:this.tableData4[i].groupId,
            subject:this.tableData4[i].subject,
            proId:this.tableData4[i].proId,
            productId:this.tableData4[i].productId,
            proNumId:this.tableData4[i].proNumId,
            keywords1:this.tableData4[i].keywords1,
            keywords2:this.tableData4[i].keywords2,
            keywords3:this.tableData4[i].keywords3,
            categoryId:this.tableData4[i].categoryId,
            language:this.tableData4[i].language,
            productType:this.tableData4[i].productType,
            market:this.tableData4[i].market,
            sourcingTrad:{
              pstId:this.tableData4[i].sourcingTrad.pstId,
              supplyQuantity:this.tableData4[i].subject2,
              supplyUnitType:supplyUnitType,
              supplyPeriodType:supplyPeriodType,
            }
          })
        }
        console.log(reqData)
        this.loading2 = true;
        this.api.batchModify.list({
          reqData:reqData
        }).then((res) => {
          this.loading2 = false;
          if(res){
            this.modifySupplyQuantity=false;
            this.tableData3 = res.data.rows;
            this.showModifyResult = true;
            this.loadData()
            this.selectedArr=[]
            if(res.data.status!=='200') {
              this.$Notice.success({
                title: '提示',
                desc: res.data.info
              });
            }
          }
        })
      },
      /*批量设置价格类型*/

      //增加价格区间
      addSourcingPriceRange() {
        if(this.formValidate.bulk_discount_prices.length<=3){
          this.formValidate.bulk_discount_prices.push({
            startQuantity:null,
            price:'',
            index: 1,
            status: 1
          });
        }else{
          this.$Notice.warning({
            title:'提示',
            desc:'最多只能添加4个区间价格！'
          })
        }
      },
      //删除价格区间
      removeSourcingPriceRange(index) {
        this.formValidate.bulk_discount_prices[index] = '';
        this.util.removeEmptyArrayEle(this.formValidate.bulk_discount_prices)
      },
      modifyPrice(name){
        let flag=true;
        let arr=[];
        if(this.formValidate.priceSetting ==='single'){
          if(this.formValidate.fob_min_price && this.formValidate.fob_max_price && this.formValidate.fob_unit_type && this.formValidate.fob_currency){
            if(this.formValidate.fob_min_price >= this.formValidate.fob_max_price){
              this.$Notice.warning({
                title: '提示',
                desc: '最大价格必须大于最小价格'
              });
              flag = false;
            }else if(this.formValidate.fob_min_price< 0.0001 || this.formValidate.fob_min_price >999999999.9999){
              this.$Notice.warning({
                title: '提示',
                desc: '最小价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
              });
              flag = false;
            }else if(this.formValidate.fob_max_price< 0.0001 || this.formValidate.fob_max_price >999999999.9999){
              this.$Notice.warning({
                title: '提示',
                desc: '最大价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
              });
              flag = false;
            }
          }else{
            if(!(!this.formValidate.fob_min_price && !this.formValidate.fob_max_price && !this.formValidate.fob_unit_type && !this.formValidate.fob_currency)){
              this.$Notice.warning({
                title: '提示',
                desc: '请同时填写计量单位和数值'
              });
              flag = false;
            }

          }
          if(flag){
            let reqData = [];
            for(let i=0;i<this.mainData.length;i++){
              let fobCurrency = this.mainData[i].sourcingTrad.fobCurrency;
              let fobMinPrice = this.mainData[i].sourcingTrad.fobMinPrice;
              let fobMaxPrice = this.mainData[i].sourcingTrad.fobMaxPrice;
              let fobUnitType = this.mainData[i].sourcingTrad.fobUnitType;
              let minOrderQuantity = this.mainData[i].sourcingTrad.minOrderQuantity;
              let minOrderUnitType = this.mainData[i].sourcingTrad.minOrderUnitType;
              if(this.formValidate.fob_min_price){
                fobCurrency=this.formValidate.fob_currency;
                fobMinPrice=this.formValidate.fob_min_price;
                fobMaxPrice=this.formValidate.fob_max_price;
                fobUnitType=this.formValidate.fob_unit_type;
                minOrderQuantity=this.formValidate.min_order_quantity;
                minOrderUnitType=this.formValidate.fob_unit_type;
              }
              reqData.push({
                groupId:this.mainData[i].groupId,
                subject:this.mainData[i].subject,
                proId:this.mainData[i].proId,
                productId:this.mainData[i].productId,
                proNumId:this.mainData[i].proNumId,
                keywords1:this.mainData[i].keywords1,
                keywords2:this.mainData[i].keywords2,
                keywords3:this.mainData[i].keywords3,
                categoryId:this.mainData[i].categoryId,
                language:this.mainData[i].language,
                productType:this.mainData[i].productType,
                market:this.mainData[i].market,
                sourcingTrad:{
                  fobCurrency:fobCurrency,//FOB货币种类，枚举值
                  fobMinPrice:fobMinPrice,//FOB最小价格
                  fobMaxPrice:fobMaxPrice,//FOB最大价格
                  fobUnitType:fobUnitType,//FOB计量单位，枚举值
                  minOrderQuantity:minOrderQuantity,//最小起订量
                  minOrderUnitType:minOrderUnitType,//最小起订量计量单位，枚举值
                }
              })
            }
            console.log(reqData)
            this.loading2 = true;
            this.api.batchModify.list({
              reqData:reqData
            }).then((res) => {
              this.loading2 = false;
              if(res){
                this.modifySupplyPrice=false;
                this.tableData3 = res.data.rows;
                this.showModifyResult = true;
                this.loadData()
                this.selectedArr=[]
                if(res.data.status!=='200') {
                  this.$Notice.success({
                    title: '提示',
                    desc: res.data.info
                  });
                }
              }
            })
          }



        }
        else{
          this.$refs[name].validate((valid) => {
            if (valid) {
              for(let i= 0;i<this.formValidate.bulk_discount_prices.length;i++){
                let startQuantity = Number(this.formValidate.bulk_discount_prices[i].startQuantity);
                let price = Number(this.formValidate.bulk_discount_prices[i].price);
                let startQuantity2 = null;
                let price2 = null;
                if(this.formValidate.bulk_discount_prices[i+1]){
                  startQuantity2 = Number(this.formValidate.bulk_discount_prices[i+1].startQuantity);
                  price2 = Number(this.formValidate.bulk_discount_prices[i+1].price);
                }
                if(startQuantity && !price){
                  this.$Notice.warning({
                    title: '提示',
                    desc: '价格不能为空。'
                  });
                  flag = false;
                }else if(!startQuantity && price){
                  this.$Notice.warning({
                    title: '提示',
                    desc: '最小起订量不能为空。'
                  });
                  flag = false;
                }else if(startQuantity && price){
                  if((startQuantity) > 999999999 || (startQuantity) < 1 || ((startQuantity))%1!==0){
                    this.$Notice.warning({
                      title: '提示',
                      desc: '最小起订量请输入1-999999999的整数。'
                    });
                    flag = false;
                  }else if((price) > 999999999.9999 || (price) < 0.0001){
                    this.$Notice.warning({
                      title: '提示',
                      desc: '价格请输入0.0001-999999999.9999之间的数值。'
                    });
                    flag = false;
                  }else if(startQuantity2 && (startQuantity)>(startQuantity2)){
                    this.$Notice.warning({
                      title: '提示',
                      desc: '最小起订量必须是由小到大。'
                    });
                    flag = false;
                  }else if(price2 && (price2)>(price)){
                    this.$Notice.warning({
                      title: '提示',
                      desc: '价格必须由大到小。'
                    });
                    flag = false;
                  }else{
                    arr.push({startQuantity:startQuantity,price:price})
                  }
                }
              }
              if(flag){
                let reqData = [];
                let discountPrices=[];
                for(let i=0;i<this.mainData.length;i++){
                  if(arr.length){
                    discountPrices=arr
                  }else{
                    discountPrices=this.mainData[i].discountPrices
                  }
                  reqData.push({
                    groupId:this.mainData[i].groupId,
                    subject:this.mainData[i].subject,
                    proId:this.mainData[i].proId,
                    productId:this.mainData[i].productId,
                    keywords1:this.mainData[i].keywords1,
                    keywords2:this.mainData[i].keywords2,
                    keywords3:this.mainData[i].keywords3,
                    categoryId:this.mainData[i].categoryId,
                    language:this.mainData[i].language,
                    productType:this.mainData[i].productType,
                    market:this.mainData[i].market,
                    discountPrices:discountPrices
                  })
                }
                console.log(reqData)
                this.loading2 = true;
                this.api.batchModify.list({
                  reqData:reqData
                }).then((res) => {
                  this.loading2 = false;
                  if(res){
                    this.modifySupplyPrice=false;
                    this.tableData3 = res.data.rows;
                    this.showModifyResult = true;
                    this.loadData()
                    this.selectedArr=[]
                    if(res.data.status!=='200') {
                      this.$Notice.success({
                        title: '提示',
                        desc: res.data.info
                      });
                    }
                  }
                })
              }


            }
          })

        }



      },
      resetModifyModal2(){
        this.formValidate.priceSetting='section';
        this.formValidate.bulk_discount_prices=[
          {
            startQuantity:null,
            price:'',
            index: 1,
            status: 1
          }
        ];
        this.formValidate.discountPrices=[];
        this.formValidate.fob_currency='';
        this.formValidate.fob_min_price='';
        this.formValidate.fob_max_price='';
        this.formValidate.fob_unit_type='';
        this.formValidate.min_order_quantity='';
        this.formValidate.min_order_unit_type='';
      },



//      批量编辑图片

      ImgShow(){
        this.imgAll=[];
        this.fruit_order=[];
        this.editImageData=true;
        var NewArr=JSON.parse(JSON.stringify(this.NewImgData));
        this.datalist=NewArr;
        var ImgArr=JSON.parse(JSON.stringify(this.NewImgData));
        this.imglist=ImgArr;
      },

      //      接受图片库子组件参数
      library(){
//          console.log(this.$refs.child);
        this.$refs.child2.MsgLibrary();
      },
      accept(msg){
        console.log(msg);
        for(var i=0;i<msg.length;i++){
          this.imgAll.push(msg[i])
        }
      },
//      接受图片银行子组件参数
      bank(){
        this.$refs.child.msgBank();
      },
      acceptBank(msg){
        console.log(msg);
        for(var i=0;i<msg.length;i++){
          this.imgAll.push(msg[i])
        }
      },
      imageGroupChange(name){
        console.log(this.fruit_order);
        this.fruit_order=this.fruit_order.sort(function(a,b){return a-b})
      },
//        替换图片
      replaceImg(){
        if(this.imgAll.length>0){
          //          顺序使用
          if(this.animal_order=="随机使用"){

            for(var i=0;i<this.fruit_order.length;i++){
              var randomNum=Math.floor((Math.random()*this.imgAll.length));
              var arrindex=this.fruit_order[i].split(".")[0];
              var childindex=this.fruit_order[i].split(".")[1];
              console.log(222)
              if(!this.imglist[arrindex].images[childindex]) {//判断选中图片是否存在，不存新建图片存在直接替换
                var obj= {
                  imageId:"",//图片库ID
                  imageUrl:this.imgAll[randomNum],
                  imageSequnce:""  //-----图片排序(1:主图)
                };
                this.imglist[arrindex].images.push(obj);
              }else {
                this.imglist[arrindex].images[childindex].imageUrl=this.imgAll[randomNum];
              }

              console.log(this.imglist)
            }
          }else {
            var index=0;
            for(var i=0;i<this.fruit_order.length;i++){
              var arrindex=this.fruit_order[i].split(".")[0];
              var childindex=this.fruit_order[i].split(".")[1];
              if(this.imgAll[index]){

                if(!this.imglist[arrindex].images[childindex]){//判断选中图片是否存在，不存新建图片存在直接替换
                  var obj= {
                    imageId:"",//图片库ID
                    imageUrl:this.imgAll[index],
                    imageSequnce:""  //-----图片排序(1:主图)
                  };
                  this.imglist[arrindex].images.push(obj);
                }else {
                  this.imglist[arrindex].images[childindex].imageUrl=this.imgAll[index];
                }
                index++
              }else {
                index=0;

                if(!this.imglist[arrindex].images[childindex]){//判断选中图片是否存在，不存新建图片存在直接替换
                  var obj= {
                    imageId:"",//图片库ID
                    imageUrl:this.imgAll[index],
                    imageSequnce:""  //-----图片排序(1:主图)
                  };
                  this.imglist[arrindex].images.push(obj);
                }else {
                  this.imglist[arrindex].images[childindex].imageUrl=this.imgAll[index];
                }

                index++;
              }
            }
          }
        }else {
          this.$Notice.warning({
            title: '请添加图片',
          });
        }



      },

//        删除图片
      removeImg(){
        for(var i=0;i<this.fruit_order.length;i++){
          var arrindex=this.fruit_order[i].split(".")[0];
          var childindex=this.fruit_order[i].split(".")[1];
//          this.imglist[arrindex].images.splice(childindex,1);
          this.imglist[arrindex].images[childindex]="";

        }

        console.log(this.imglist);

        for(var i=0;i<this.imglist.length;i++){
          for(var t=0;t<this.imglist[i].images.length;t++){
            if(this.imglist[i].images[t]==""){
              this.imglist[i].images.splice(t,1);
              t=t-1;
            }
          }
        }
      },
//         上下移
      word_swapItems(index,index2){
        this.imgAll[index] = this.imgAll.splice(index2, 1, this.imgAll[index])[0];

        console.log(this.imgAll);
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
        if($index == this.imgAll.length -1) {
          return;
        }
        this.word_swapItems($index, $index + 1);
      },
//        图片上传
      handleSuccess(res,file){
        if(res.status=="200"){
          this.imgAll.push(res.rows[1]);
        }else {
          this.$Notice.success({
            title: res.info,
            desc:"错误代码"+res.MDC
          });
        }
      },
      handleError(error,file){
        this.$Notice.error({
          title: file.name+'上传失败',
        });
      },
//        重来
      ImgAgain(){
        this.imgAll=[];
        this.fruit_order=[];
        var ImgData=JSON.parse(JSON.stringify(this.datalist));//深拷贝数组
        console.log(ImgData);
        this.imglist=ImgData;


      },
      ModifyImgOk(){
        this.loadingImg=true;
        for(var i=0;i<this.imglist.length;i++){
            for(var t=0;t<this.imglist[i].images.length;t++){
              this.imglist[i].images[t].imageSequnce=t+1;
              this.imglist[i].proModifyType='image'
            }
        }
        this.api.batchModify.list({reqData:this.imglist}).then((res) => {
          this.loadingImg=false;
          if(res.data.status!=='200') {
            this.$Notice.success({
              title: '提示',
              desc: res.data.info
            });
          }else {
            this.$Notice.success({
              title: res.data.info,
            });
            this.editImageData=false;
            this.loadData()
          }
        })
      },
      CancelImg(){
        this.editImageData=false;
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
</style>
