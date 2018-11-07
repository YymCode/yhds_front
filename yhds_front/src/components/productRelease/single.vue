<template>
  <div class="full-height">
    <div v-if="this.$route.params.categoryId && this.$route.params.wordGroupId==0">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/productRelease">产品发布</Breadcrumb-item>
        <Breadcrumb-item href="/productRelease/chooseCategory/0">选择产品类别</Breadcrumb-item>
        <Breadcrumb-item>单个产品发布</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div v-if="this.$route.params.proId">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/productRelease">产品发布</Breadcrumb-item>
        <Breadcrumb-item href="/productRelease/releaseTask">发布任务</Breadcrumb-item>
        <Breadcrumb-item>编辑产品</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div v-if="this.$route.params.categoryId && this.$route.params.wordGroupId!=0 ">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/productRelease/batch">批量产品发布</Breadcrumb-item>
        <Breadcrumb-item>新建模板</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div v-if="this.$route.params.temId">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/productRelease/batch">批量产品发布</Breadcrumb-item>
        <Breadcrumb-item>编辑模板</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div v-if="this.$route.params.aliProId">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/productManagement/productMan">产品管理</Breadcrumb-item>
        <Breadcrumb-item>编辑产品</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div class="main">
      <div style="border-bottom: 1px solid #dde3e8;">
      	<a href="javascript:;" @click="back" class="back" style="display: inline-block; border: none; margin: 0;">&lt;&lt;返回上一级</a>
      </div>
      <div class="con">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <div class="item" v-if="proCategoryArr!=''">
            <div class="tit">产品类别</div>
            <div class="extra">
              您选择的产品类别：<span class="color3 ml_20">{{cnName}}&nbsp;&nbsp;({{proCategoryName}})</span>
              <!--<a href="javascript:;" @click="back" class="ml_20" >重新选择</a>-->
            </div>
          </div>
          <div class="item">
            <div class="tit">产品分组</div>
            <div class="extra">
              <FormItem label="选择分组" prop="category" >
                <Cascader :data="formValidate.category"  v-model="formValidate.groupId" class="width_260" change-on-select></Cascader>
              </FormItem>
            </div>
          </div>
          <div class="item">
            <div class="tit">基本信息</div>
            <div class="extra">
              <div v-if="this.$route.params.wordGroupId==0 || this.$route.params.proId || this.$route.params.aliProId">
                <FormItem label="产品名称" prop="subject" >
                  <Input class="width_500" :maxlength="128" v-model="formValidate.subject" @change="formValidate.subject=formValidate.subject.replace(/[^\x00-\xff]+/g, '')" L></Input>
                  <Button type="warning" shape="circle" class="my-btn ml_5" @click="titleSynthesis('formValidate')">自动生成</Button>
                </FormItem>
                <div class="fl">
                  <FormItem label="关键词" prop="keywords">
                    <Input placeholder="此处只能填写1个关键词" v-for="(item,index) in formValidate.keywords" @on-change="formValidate.keywords[index]=formValidate.keywords[index].replace(/[^\x00-\xff]+/g, '')" v-model="formValidate.keywords[index]" class="width_260" :class="{'ml_10':index!=0}":maxlength="64"></Input>
                    <Button type="warning" shape="circle" class="my-btn ml_5" @click="showKeywordsModal()">导入</Button>
                  </FormItem>

                </div>
              </div>
              <div v-if="(this.$route.params.wordGroupId!=0 && !this.$route.params.proId && !this.$route.params.aliProId) || this.$route.params.temId">
                <FormItem label="模板名称" prop="temName" >
                  <Input class="width_500" :maxlength="99" v-model="formValidate.temName" @on-change="formValidate.temName=formValidate.temName.replace(/[^\x00-\xff]+/g, '')"></Input>
                </FormItem>
              </div>
            </div>
          </div>
          <div class="item clr">
            <div class="tit">产品属性 <span class="f_12 color_gray ml_20">完整填写将有助于买家找到并了解您的产品</span></div>
            <div class="extra">

              <div v-for="(item,index) in formValidate.fixedAttributes" class="clr">

                <!--<FormItem :prop="'fixedAttributes.' + index + '.selectedId'"-->
                          <!--:rules="{required: item.required, message: item.enName +' 不能为空', trigger: 'change'}"-->
                          <!--:label="(item.enName===('Place of Origin') || (item.inputType==='multi_select' && item.showType==='check_box' && item.skuAttribute ===true))?'':item.enName"-->
                          <!--v-if="!item.parentId">-->
                  <!--<Input v-model="item.valueName" :maxlength="70" @on-change="item.valueName=item.valueName.replace(/[^\x00-\xff]+/g, '')" v-if="item.inputType==='input' && item.showType==='input' && !item.parentId" class="width_260" :key="index"></Input>-->
                  <!--<Select v-model="item.selectedId" clearable  @on-change="showChild(item,index)"  v-if="item.inputType==='single_select' && item.showType==='list_box' && item.enName!=='Place of Origin'" class="width_260">-->
                    <!--<Option v-if="option.skuValue===false" :label="option.enName"  :value="option.attrValueId+','+option.enName" v-for="(option,index) in item.attributeValues" :key="index"></Option>-->
                  <!--</Select>-->
                  <!--<CheckboxGroup v-model="item.selectedIdArr" v-if="item.inputType==='multi_select' && item.showType==='check_box' && item.skuAttribute ===false">-->
                    <!--<Checkbox :label="option.attrValueId+','+option.enName"  v-for="(option,index) in item.attributeValues" :key="index">{{option.enName}}</Checkbox>-->
                  <!--</CheckboxGroup>-->
                <!--</FormItem>-->
                <FormItem :prop="caculateProp(index,item.inputType,item.showType,item.skuAttribute)"
                          :rules="{type:caculateType(index,item.inputType,item.showType),required: item.required, message: item.enName +' 不能为空', trigger: 'change'}"
                          :label="(item.enName===('Place of Origin'))?'':item.enName"
                          v-if="!item.parentId">
                  <Input v-model="item.valueName" :maxlength="70" @on-change="item.valueName=item.valueName.replace(/[^\x00-\xff]+/g, '')" v-if="item.inputType==='input' && item.showType==='input' && !item.parentId" class="width_260" :key="index"></Input>
                  <Input v-for="(unit,index) in item.units" v-model="item.units[index]" :maxlength="70" @on-change="item.units[index]=item.units[index].replace(/[^\x00-\xff]+/g, '')" v-if="item.inputType==='input' && item.showType==='interval' && !item.parentId" class="width_260" :key="index"></Input>
                  <div v-if="item.inputType==='input' && item.showType==='interval' && !item.parentId">
                  	<Input :maxlength="70" v-model="minVal" @on-change="attrMin(index)" class="width_260" :key="index"></Input> - 
                  	<Input :maxlength="70" v-model="maxVal" @on-change="attrMax(index)" class="width_260" :key="index+'1'"></Input>
                  </div>
                  <Select v-model="item.selectedId" clearable  @on-change="showChild(item,index)"  v-if="item.inputType==='single_select' && item.showType==='list_box' && item.enName!=='Place of Origin'" class="width_260">
                    <Option :label="option.enName"  :value="option.attrValueId+','+option.enName" v-for="(option,index) in item.attributeValues" :key="index"></Option>
                  </Select>
                  <!--<CheckboxGroup v-model="item.selectedIdArr" v-if="item.inputType==='multi_select' && item.showType==='check_box' && item.skuAttribute ===false">
                    <Checkbox :label="option.attrValueId+','+option.enName"  v-for="(option,index) in item.attributeValues" :key="index">{{option.enName}}</Checkbox>
                  </CheckboxGroup>-->
                  <CheckboxGroup v-model="item.selectedIdArr" v-if="item.inputType==='multi_select' && item.showType==='check_box'">
                    <Checkbox :label="option.attrValueId+','+option.enName"  v-for="(option,index) in item.attributeValues" :key="index">{{option.enName}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>





                <span v-for="(c,index) in formValidate.childAttributes">
                  <FormItem
                    :label="item.enName==='Place of Origin'?'':item.enName"
                    v-if="item.parentId && formValidate.childAttributes[index] == item.parentId">
                      <Input v-model="item.valueName" :maxlength="70" @on-change="item.valueName=item.valueName.replace(/[^\x00-\xff]+/g, '')" v-if="item.inputType==='input' && item.showType==='input' " class="width_260" ></Input>
                      <Select v-model="item.selectedId" clearable  v-if="item.inputType==='single_select' && item.showType==='list_box' && item.enName!=='Place of Origin'" class="width_260">
                        <Option :label="option.enName"  :value="option.attrValueId+','+option.enName" v-for="(option,index) in item.attributeValues" :key="index"></Option>
                      </Select>
                  </FormItem>
                </span>
              </div>
              <div class="clr">
                <FormItem label="Place of Origin" >
                  <Select v-model="formValidate.originCode" clearable  placeholder="请选择原产地" class="width_260">
                    <Option v-for="item in formValidate.originArr" :value="item.dicName">{{item.dicName}}</Option>
                  </Select>
                </FormItem>
              </div>
              <Row>
                <Col span="6">
                <FormItem v-for="(item, index) in formValidate.attributes"
                          v-if="item.status" :label='index==0?"自定义属性":""' :key="index">
                  <Input type="text" :maxlength="40" v-model="item.attributeName" placeholder="属性名称 - 如: Color" @on-change="item.attributeName=item.attributeName.replace(/[^\x00-\xff]+/g, '')"></Input>
                </FormItem>
                </Col>
                <Col span="5">
                <FormItem
                  v-for="(item, index) in formValidate.attributes"
                  v-if="item.status"
                  :key="index" :label-width="10">
                  <Input type="text" :maxlength="70" v-model="item.valueName" placeholder="属性值 - 如: Red" @on-change="item.valueName=item.valueName.replace(/[^\x00-\xff]+/g, '')"></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <!--<div class="mt_5 ml_20">
                  <Button type="warning" v-if="!(this.$route.params.categoryId && this.$route.params.wordGroupId!=0) && !this.$route.params.temId" shape="circle"  class="ml_10" @click="loadPeerAttributes('formValidate')">解析同行</Button>
                  &lt;!&ndash;<Checkbox  size="large" @on-change="loadPeerAttributes('formValidate',$event)">解析同行</Checkbox>&ndash;&gt;
                </div>-->
                </Col>
              </Row>

              <FormItem>
                <Button type="dashed" @click="handleAdd" icon="plus-round">点击添加</Button>
              </FormItem>
              <div v-if="this.$route.params.wordGroupId==0 || this.$route.params.proId || this.$route.params.editor">
                <FormItem label="产品图片" >
                <Button class="ml_5 fl" @click="locashow()">从图片库获取</Button>
                <span class="color_blue ml_10 fl" @click="imgfenzu()" style="cursor: pointer">从图片银行获取</span>
                <span class="ml_10 fl">|</span>

                <Upload
                  :show-upload-list="false"
                  multiple
                  :action="aurl+'/alibaba/imageUpload/doFileUpload'"
                  accept="image/png,image/jpeg,image/jpg"
                  :max-size="5120"
                  multiple
                  :before-upload="handleUpload"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  style="float: left;">
                  <span class="color_blue ml_10" style="cursor: pointer">本地上传</span>
                </Upload>

                <p class="clr">单张不超过3M,支持jpeg，jpg，png格式; <br/>建议图片大于640*640，主题鲜明、图片清晰、提升买家满意度；<a  href="https://activity.alibaba.com/pc/588125f6.html?spm=a2747.post.0.0.7e1cf37 1dUPDrE" target="_blank"   clas s="color_blue">查看图片质量规范</a></p>
                <div class="pic-box">
                  <div v-for="(item,index) in 6" class="imgbox" style="height: 170px;">
                    <div class="item">
                      <img :src="handlist[index].imageUrl" alt="" v-if="handlist[index]">
                    </div>
                    <div style="display: flex; justify-content: space-around; height: 35px;" class="clr" v-if="handlist[index]">
	                  	<div @click="prevImg(index)" style="cursor: pointer; color: #00a1ff;">前移</div>
	                  	<div @click="nextImg(index)" style="cursor: pointer; color: #00a1ff;">后移</div>
	                  </div>
                    <span v-if="handlist[index]" @click="imgdelete(index)">移除</span>
                  </div>

                </div>
              </FormItem>
              </div>
              <div v-if="(this.$route.params.wordGroupId!=0 && !this.$route.params.proId && !this.$route.params.aliProId) || this.$route.params.temId">
                <FormItem label="产品图片" >
                  <Select v-model="formValidate.kwGraphics" placeholder="请选择产品图片数量" class="width_260" placement="top">
                    <Option :value="item" v-for="item in 6" v-if="item>0">{{item}}</Option>
                  </Select>
                </FormItem>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="tit">详情描述</div>
            <div class="extra">
              <p class="mb_20">为了获得最佳的视觉效果，我们建议保持图片尺寸为750px（宽）*800px（高），表格的尺寸宽度为750px。（请注意，宽度超出750px 的部分将无法展示。）</p>
              <Row>
                <Col span="12">
                  <div id="editorTem" style="height: 500px;overflow: hidden;margin-right: 30px"></div>
                </Col>
                <Col span="12">
                  <div class="template-wrap">
                    <div class="template-title">
                      模板列表
                    </div>
                    <div class="template-box">
                      <ul>
                        <li class="nav-list" :class="{active:index==activeIndex}" v-for="(item,index) in formValidate.xqmbflArr" @click="changePdtType(item.dicCode,index)">{{item.dicName}}</li>
                      </ul>
                      <div class="clr">
                        <div class="template-list" v-for="item in tmplates">
                          <img :src="item.pdtImg?item.pdtImg:noImg" alt="" />
                          <span class="add" @click="addTemplateToUE(item.pdtContent)">添加</span>
                        </div>
                      </div>
                      <Page v-if="totalCount3" :total="totalCount3" placement="top" :current="current3" :page-size="limit3" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage3" @on-page-size-change="changePageSize3" style="padding-top: 20px;"></Page>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div class="item">
            <div class="tit">交易信息<span class="f_12 color_3 ml_10">完善交易信息，方便买家做出采购决定。</span></div>
            <div class="extra">
              <!--<FormItem label="是否支持一口价">
                <RadioGroup v-model="formValidate.product_type">
                  <Radio label="wholesale">支持（推荐）</Radio>
                  <Radio label="sourcing">不支持</Radio>
                </RadioGroup>
              </FormItem>-->
              <!--不支持一口价-->
              <div v-if="formValidate.product_type=='sourcing'">
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
                        <Option :value="item.dicCode" v-for="item in formValidate.unitArr">{{item.dicName}}</Option>
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
                              <Input :maxlength="64" type="text" v-model="item.startQuantity" @on-blur="item.startQuantity=item.startQuantity.replace(/[^\d^\.]+/g, '')" placeholder="" ></Input>
                            </FormItem>
                            </Col>
                            <Col span="9" offset="1">
                            <FormItem  :label-width="50"  label='US $ ' :key="index">
                              <Input :maxlength="64" type="text" v-model="item.price" @on-blur="Number(item.price=item.price.replace(/[^\d^\.]+/g, '')).toFixed(4)" placeholder=""></Input>
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
                      <Option :value="item.dicName" v-for="item in formValidate.currencyArr">{{item.dicName}}</Option>
                    </Select>
                    <Input :maxlength="64" class="width_260 ml_5"v-model="formValidate.fob_min_price" @on-blur="formValidate.fob_min_price=Number((formValidate.fob_min_price.replace(/[^\d^\.]+/g, '')))"></Input>
                    <span class="ml_5">-</span>
                    <Input :maxlength="64" class="width_260 ml_5" v-model="formValidate.fob_max_price" @on-blur="formValidate.fob_max_price=Number((formValidate.fob_max_price.replace(/[^\d^\.]+/g, '')))"></Input>
                    <Select clearable  v-model="formValidate.fob_unit_type" class="width_160 ml_5" placeholder="请选择计量单位">
                      <Option :value="item.dicCode" v-for="item in formValidate.unitArr">{{item.dicName}}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="最小起订量" >
                    <Input :maxlength="64" class="width_260"   v-model="formValidate.min_order_quantity" @on-blur="formValidate.min_order_quantity=formValidate.min_order_quantity.replace(/[^\d^\.]+/g, '') "></Input>
                    <span v-model="formValidate.min_order_unit_type">{{formValidate.fob_unit_type}}</span>
                  </FormItem>
                </div>

                <FormItem label="支付方式">
                  <CheckboxGroup v-model="formValidate.payment_methods">
                    <Checkbox label="L/C" >L/C</Checkbox>
                    <Checkbox label="D/A" >D/A</Checkbox>
                    <Checkbox label="D/P" >D/P</Checkbox>
                    <Checkbox label="T/T" >T/T</Checkbox>
                    <Checkbox label="Western Union" >Western Union</Checkbox>
                    <Checkbox label="MoneyGram" >MoneyGram</Checkbox>
                    <!--<Checkbox label="" >Other</Checkbox>-->
                  </CheckboxGroup>
                </FormItem>
              </div>
              <!--支持一口价-->
              <div v-if="formValidate.product_type=='wholesale'">
                <FormItem label="计量单位" prop="unit_type">
                  <Select clearable  v-model="formValidate.unit_type" placeholder="请选择计量单位" class="width_260">
                    <Option :value="item.dicCode" v-for="item in formValidate.unitArr">{{item.dicName}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="销售方式">
                  <RadioGroup v-model="formValidate.sale_type">
                    <Radio label="normal">按件卖</Radio>
                    <Radio label="batch">按批卖</Radio>
                  </RadioGroup>
                </FormItem>
                <div v-if="formValidate.sale_type=='batch'">
                  <FormItem prop="batch_number">
                    <span>1批等于</span><Input :maxlength="64" class="width_260" v-model="formValidate.batch_number"></Input><span class="color_gray ml_10">{{formValidate.unit_type}}</span>
                  </FormItem>
                </div>
                <FormItem label="价格设置">
                  <RadioGroup v-model="formValidate.priceSetting2">
                    <Radio label="1">根据数量设置价格</Radio>
                  </RadioGroup>
                </FormItem>
                <div class="priceSetting-box">
                  <dl class="priceSetting-con">
                    <dt>
                      <Row>
                        <Col span="7"><span>起订量 ({{formValidate.unit_type}}<span v-if="!formValidate.unit_type">计量单位</span>)</span></Col>
                        <Col span="7"><span>FOB价格 ({{formValidate.unit_type}}<span v-if="!formValidate.unit_type">计量单位</span>)</span></Col>
                        <Col span="7"><span>实际收入 ({{formValidate.unit_type}}<span v-if="!formValidate.unit_type">计量单位</span>)</span></Col>
                      </Row>
                    </dt>
                    <dd>
                      <div v-for="(item, index) in formValidate.bulk_discount_prices2" v-if="item.status">
                        <Row>
                          <Col span="7">
                          <FormItem  :label-width="30"  label='≥' :key="index" :prop="'startQuantity'+index">
                            <Input :maxlength="64" type="text" v-model="item.startQuantity" placeholder=""></Input>
                          </FormItem>
                          </Col>
                          <Col span="7" >
                          <FormItem  :label-width="50"  label='US $ ' :key="index" :prop="'price'+index">
                            <Input :maxlength="64" type="text" v-model="item.price" placeholder=""></Input>
                          </FormItem>
                          </Col>
                          <Col span="7" class="center">
                          <span class="color_gray f_12 ">US $</span><span></span>
                          </Col>
                          <Col span="3" >
                          <Button v-if="index3!==1" type="ghost" @click="removeWholesalePriceRange(index)">删除</Button>
                          </Col>
                        </Row>
                      </div>
                      <FormItem :label-width="30">
                        <Button type="dashed" @click="addWholesalePriceRange" icon="plus-round">新增价格区间</Button>
                      </FormItem>



                    </dd>
                  </dl>
                  <dl class="priceSetting-preview" >
                    <dt>预览(计量单位: 计量单位)</dt>
                    <dd>
                      <div>可根据不同的销售数量设置不同价格</div>
                      <div v-for="(item, index) in formValidate.bulk_discount_prices2" v-if="item.startQuantity!='' && item.price!=''">
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
                <!--<FormItem label="可售数量">
                  <Input class="width_260"></Input><span class="ml_10">计量单位</span>
                </FormItem>-->
              </div>
            </div>
          </div>
          <!--不支持一口价-->
          <div class="item" v-if="formValidate.product_type=='sourcing'">
            <div class="tit">物流信息</div>
            <div class="extra">
              <FormItem label="发货时间" prop="delivery_time">
                <Input :maxlength="64" class="width_260" v-model="formValidate.delivery_time" @on-change="formValidate.delivery_time=formValidate.delivery_time.replace(/[^\x00-\xff]+/g, '')"></Input>
              </FormItem>
              <FormItem label="港口">
                <Input :maxlength="64" class="width_260" v-model="formValidate.delivery_port" @on-change="formValidate.delivery_port=formValidate.delivery_port.replace(/[^\x00-\xff]+/g, '')"></Input>
              </FormItem>
              <FormItem label="供货能力">
                <Input :maxlength="64" class="width_260" v-model="formValidate.supply_quantity" @on-blur="formValidate.supply_quantity=formValidate.supply_quantity.replace(/[^\d^\.]+/g, '')"></Input>
                <Select clearable  v-model="formValidate.supply_unit_type" class="width_160 ml_5" placeholder="请选择计量单位">
                  <Option :value="item.dicCode" v-for="item in formValidate.unitArr">{{item.dicName}}</Option>
                </Select>
                <span class="ml_5">per</span>
                <Select clearable  v-model="formValidate.supply_period_type" class="width_160 ml_5" placeholder="请选择时间单位">
                  <Option :value="item.dicCode" v-for="item in formValidate.timeArr">{{item.dicName}}</Option>
                </Select>
                <p>请同时填写数值和单位</p>
              </FormItem>
              <FormItem label="常规包装">
                <Input :maxlength="512" v-model="formValidate.packaging_desc" @on-change="formValidate.packaging_desc=formValidate.packaging_desc.replace(/[^\x00-\xff]+/g, '');surplusWordCount=512-formValidate.packaging_desc.length" type="textarea" :rows="4" :autosize="{minRows: 4,maxRows: 4}" placeholder="Enter something..." style="width:72%;"></Input>
                <p>剩余：{{surplusWordCount}} 字符， 建议填写包装形式、尺寸，各类集装箱能装载的产品件数等信息，便于买家了解。</p>
              </FormItem>
            </div>
          </div>
          <!--支持一口价-->
          <div class="item" v-else>
            <div class="tit">
              物流及包装<span class="f_14 color_gray ml_15">物流与包装信息与最终生成的运费直接挂钩，请务必如实填写！</span>
            </div>
            <div class="extra">
              <FormItem label="每件尺寸" prop="package_type" >
                <RadioGroup v-model="formValidate.package_type">
                  <Radio label="len"> 按长宽高（尺寸）</Radio>
                  <Radio label="all"> 按总体积</Radio>
                </RadioGroup>
              </FormItem>
              <div v-if="formValidate.package_type=='len'" style="overflow: hidden">
                <div class="fl">
                  <FormItem prop="package_size_c" :label-width="100" >
                    <Input :maxlength="64" class="width_160"  v-model="formValidate.package_size_c"></Input>
                    <span class="ml_10">CM&nbsp;&nbsp;X</span>
                  </FormItem>
                </div>
                <div class="fl">
                  <FormItem prop="package_size_k" :label-width="10">
                    <Input :maxlength="64" class="width_160" v-model="formValidate.package_size_k"></Input>
                    <span class="ml_10">CM&nbsp;&nbsp;X</span>
                  </FormItem>
                </div>
                <div class="fl">
                  <FormItem prop="package_size_g" :label-width="10">
                    <Input :maxlength="64" class="width_160" v-model="formValidate.package_size_g"></Input>
                    <span class="ml_10">CM&nbsp;&nbsp;/&nbsp;&nbsp;计量单位</span>
                  </FormItem>
                </div>
              </div>
              <div v-else>
                <FormItem prop="volume">
                  <Input :maxlength="64" class="width_260" v-model="formValidate.volume"></Input>
                  <span class="ml_10">CM<sup>3 </sup> &nbsp;&nbsp;/&nbsp;&nbsp;计量单位</span>
                </FormItem>
              </div>
              <div>
                <FormItem label="每件毛重" prop="weight">
                  <Input :maxlength="64" class="width_260" v-model="formValidate.weight" placeholder="精确到小数点后三位"></Input>
                  <span class="ml_10">KG &nbsp;&nbsp;/&nbsp;&nbsp;计量单位</span>
                  <a href=""></a>
                </FormItem>
              </div>
              <div>
                <FormItem label="运费模板" prop="shipping_line_template_id">
                  <Select clearable  v-model="formValidate.shipping_line_template_id" placeholder="请选择 运费模板" class="width_260">
                    <Option :value="item.items[0].id" v-for="item in formValidate.templates">{{item.items[0].title}}</Option>
                  </Select>
                </FormItem>
              </div>
              <div>
                <FormItem label=" 发货期" prop="handling_time">
                  <Input :maxlength="64" class="width_160" v-model="formValidate.handling_time"></Input><span class="f_12 color_gray ml_10">天（工作日）</span>
                </FormItem>
              </div>

            </div>
          </div>
          <div class="center">
            <Checkbox v-model="seoOption" v-if="this.$route.params.categoryId || this.$route.params.temId">SEO设置</Checkbox>
            <span v-if="this.$route.params.categoryId">
              <!--<Button type="primary" shape="circle">SEO设置</Button>-->

              <Button type="warning" shape="circle" class="ml_10" @click="preview">预览</Button>
              <Button type="primary" shape="circle"  class="ml_10" @click="addTemplate('formValidate')">保存为模板</Button>
              <Button v-if="this.$route.params.wordGroupId==0" type="primary" shape="circle"  class="ml_10" @click="addProduct('formValidate')">确认发布</Button>
            </span>
            <span v-if="this.$route.params.proId">
              <Button type="primary" shape="circle"  class="ml_10" @click="editProduct('formValidate')">保存</Button>
              <Button type="warning" shape="circle"  class="ml_10" @click="$router.go(-1)">关闭</Button>
            </span>
            <span v-if="this.$route.params.temId">
              <Button type="primary" shape="circle"  class="ml_10" @click="editTemplate('formValidate')">保存</Button>
              <Button type="warning" shape="circle"  class="ml_10" @click="$router.go(-1)">关闭</Button>
            </span>
            <span v-if="this.$route.params.aliProId">
              <Button type="primary" shape="circle"  class="ml_10" @click="editAliProduct('formValidate')">保存</Button>
              <Button type="warning" shape="circle"  class="ml_10" @click="$router.go(-1)">关闭</Button>
            </span>
          </div>
        </Form>

        <!--从图片库选取-->
        <Modal
          v-model="imgbank"
          width="700"
          title="从图片银行选取"
          @on-ok="imageok"
          :styles="{top:'60px'}"
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
              <Col span="17" offset="1">
              <CheckboxGroup class="quancar"  v-model="checkAllGroup"  @on-change="imageGroupChange">
                <div  class="boxcar" v-for="(item,index) in blankdata">
                  <Checkbox  :label="item" class="inputchex" >
                    <Card  style="height: 100%">
                      <div style="height: 100%">
                        <img :src="item" class="inputing">
                      </div>
                    </Card>
                  </Checkbox>
                </div>
              </CheckboxGroup>
              </Col>
            </Row>
          </div>
          <Page  v-if="imagetotalCount>0"  :total="imagetotalCount" :current="imagecurrent"  show-elevator  :page-size="imagelimit"   @on-change="imagechangePage"  ></Page>

        </Modal>

        <!--本地图片-->
        <Modal
          v-model="localimg"
          width="700"
          title="本地图片库"
          @on-ok="locaok"
          :styles="{top:'60px'}"
        >

          <div>
            <div id="modelconten2">
              <Row>
                <Col span="6">
                <div class="head">分组列表</div>
                <ul class="imgblank">
                  <li :class="{color_blue:index==addloct}" v-for="(item,index) in modeloct" @click="loctclass(index)">{{item.wgName}}</li>
                </ul>
                </Col>
                <Col span="17" offset="1">
                <Select v-model="modeditor" style="width:200px" @on-change="editor">
                  <Option v-for="item in ditorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!--<div class="divhei">-->
                  <!--<Button type="primary" @click="obtain()">上传图片</Button>-->
                  <!--<Button type="primary" @click="editor()">编辑图片</Button>-->
                <!--</div>-->
                <CheckboxGroup class="quancar"  v-model="loctalldata"  @on-change="checkAllGroupChange">
                  <div  class="boxcar" v-for="(item,index) in imagearr">
                    <Checkbox  :label="item.imageUrl+'?'+item.imageId" class="inputchex" >
                      <Card  style="height: 100%">
                        <div style="height: 100%">
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
            <Page id="page" v-if="totalCount>0"  :total="totalCount" :current="current"  show-elevator  :page-size="limit"   @on-change="changePage" style="padding-top: 20px;"></Page>
          </div>
        </Modal>


        <!--导入关键词-->
        <Modal v-model="chooseKeywordsModal" ref="chooseKeywordsModal" title="选择关键词" class-name="small-btn-box2 vertical-center-modal" width="800" @on-ok="ok">
          <Select v-model="wgId" class="width_150 fl " placeholder="请选择关键词分组" @on-change="changeKeyWord(1)">
            <Option v-for="item in WordGroup" :value="item.wgId" :key="item.wgId">{{item.wgName}}</Option>
          </Select>
          <Select v-model="searchType" class="width_150 fl ml_10" @on-change="changeKeyWord(1)">
            <Option  value="0" key="searchType0">按是否覆盖搜索</Option>
            <Option  value="1" key="searchType1">按排名搜索</Option>
            <Option  value="2" key="searchType2">按热度搜索</Option>
            <Option  value="3" key="searchType3">按P4P推广状况搜索</Option>
          </Select>
          <Select v-model="isCover" class="width_150 fl ml_10" v-if="searchType==0" @on-change="changeKeyWord(1)">
            <Option  value="1" key="isCover0">已覆盖</Option>
            <Option  value="0" key="isCover1">未覆盖</Option>
          </Select>
          <Select v-model="ranking" class="width_150 fl ml_10" v-if="searchType==1" @on-change="changeKeyWord(1)">
            <Option  value="0" key="ranking0">第1页</Option>
            <Option  value="1" key="ranking1">第1~3页</Option>
            <Option  value="2" key="ranking2">其他</Option>
          </Select>
          <Select v-model="hot" class="width_150 fl ml_10" v-if="searchType==2" @on-change="changeKeyWord(1)">
            <Option  value="1" key="hot0">热门词</Option>
            <Option  value="0" key="hot1">蓝海词</Option>
          </Select>
          <Select v-model="promote" class="width_150 fl ml_10" v-if="searchType==3" @on-change="changeKeyWord(1)">
            <Option  value="1" key="promote0">已推广</Option>
            <Option  value="0" key="promote1">未推广</Option>
          </Select>
          <Input :maxlength="64" v-model="keywords"  placeholder="请输入关键词" class="width_160 fl ml_10"></Input>
          <Button type="primary" shape="circle" class="my-btn ml_10 fr" @click="changeKeyWord(2)">搜索</Button>
          <div class="clr">

          </div>
          <div class="clr mt_10">
            <div class="mb_10 mt_10">已选:<span v-for="item in selectedArr2" class="ml_10">{{item}}</span></div>
            <Table :height="tableHeight2" border stripe ref="chooseKeywordTable"  :columns="columns2" :data="tableData2" no-data-text="对不起，目前没有任何查询结果"@on-selection-change="chooseRow" @on-select-cancel="cancelChooseRow" @on-sort-change="sortChange"></Table>
            <Page v-if="totalCount2" :total="totalCount2" placement="top" :current="current2" :page-size="limit2" :page-size-opts=[15,30,50] show-elevator show-sizer @on-change="changePage2" @on-page-size-change="changePageSize2"></Page>
          </div>

        </Modal>
        <Modal v-model="chooseGroup" ref="chooseGroup" title="选择模板分组" class-name="small-btn-box vertical-center-modal" width="450"  @on-cancel="tempWgId=''">
          <Select v-model="tempWgId" class="" placeholder="请选择关键词分组"  >
            <Option v-for="item in WordGroup" :value="item.wgId" :key="item.wgId">{{item.wgName}}</Option>
          </Select>
          <!--<Button type="primary" shape="circle" class="my-btn ml_10 " >确定</Button>-->
          <!--<div slot="footer"></div>-->
        </Modal>
        <preview :showPriview=showPriview :con="con" v-on:hidePreview="showPriview=false"></preview>
      </div>
    </div>
  </div>
</template>
<script>
  import Preview from './preview';
  export default {
    components:{
      Preview
    },
    data(){
      const validateKeywords = (rule, value, callback) => {
        if(!value.join('')){
          callback('请至少填写一个关键词!')
        }else{
          let patten = /[;；，,]+/;
          let patten2 = /[\u4e00-\u9fa5]+/;
          if(patten.test(value.join(''))){
            callback('请不要包含特殊符号,如逗号，分号')
          }else if(patten2.test(value.join(''))){
            callback('请不要输入非英文字符')
          }else{
            callback()
          }
        }
      };
      const validatePackageSize = (rule, value, callback) => {
        if(!value){
          callback('不能为空!')
        }else if(isNaN(value) || Number(value) > 9999999 || Number(value) < 1 || (Number(value))%1!==0){
          callback('请输入1-9999999的整数!')
        }else{
          callback();
        }
      };
      const validateWeight = (rule, value, callback) => {
        if(!value){
          callback('重量不能为空!')
        }else if(isNaN(value) || Number(value) > 9999999.000 || Number(value) < 0.01){
          callback('请输入0.01-9999999.000的数!')
        }else{
          this.formValidate.weight = Number(value).toFixed(3)
          callback()
        }
      };
      const validateHandlingTime = (rule, value, callback) => {
        if(!value){
          callback('发货期不能为空!')
        }else if(isNaN(value) || Number(value) > 60 || Number(value) < 1 || (Number(value))%1!==0){
          callback('请输入1-60的整数!')
        }else{
          callback()
        }
      };
      const validateBatchNumber = (rule, value, callback) =>{
        if(!value){
          callback('数量不能为空!')
        }else if(isNaN(value) || Number(value) > 99999 || Number(value) < 1 || (Number(value))%1!==0){
          callback('请输入1-99999的整数!')
        }else{
          callback()
        }
      };
      return {
      	minVal:'',
    		maxVal:'',
        showPriview:false,
        con:'',

        chooseGroup:false,
        tempWgId:'',//模板分组id
        activeIndex:'',
        WordGroup:[],//词库的分组

        surplusWordCount:512,//剩余字数
        noImg:require('../../common/images/noImg.png'),
        tableHeight2:500,
        seoOption:true,
        //详情模板
        tmplateEditer:null,
        pdtType:'',//分类code
        tmplates:[],
        description:'',
        //分页参数
        totalCount2:0,
        current2:1,
        limit2:15,
        offset2:0,
        order2:'',
        sortType:'',
        chooseKeywordsModal:false,
        keywords:'',
        wgId:'',
        searchType:'0',
        isCover:'1',
        ranking:'0',
        hot:'1',
        promote:'1',
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
            title: '是否覆盖',
            key: 'kwCover',
            align: 'center',
            sortable: 'custom',
            render:(h, params) => {
              if(params.row.kwCover==1){
                return h('span','已覆盖')
              }else {
                return h('span','未覆盖')
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

        //分页参数
        totalCount3:0,
        current3:1,
        limit3:8,
        offset3:0,
        wordGroupId:'',
        proId:'',
        productId:"",
        proNumId:'',
        temId:'',
        categoryId:'',
        proCategory:'',
        proCategoryName:'',
        cnName:'',
        proCategoryArr:[],
        checkAll2:false,

//          图片银行
        aurl:process.env.API_ROOT,


        imgbank:false,
        imagelast:false,

        addcolor:-1,
        addcolor2:-1,
        addimg:0,
        imageId:'',
        imagelist:"",
        blankdata:"",

        showadd:-1,
        showadd2:-1,
//            分页
        imagetotalCount:0,
        imagecurrent:1,
        imagelimit:16,
        imageoffset:0,
        modeldata:"",

        imagetext:"",
//            选中
        checkAll: false,
        checkAllGroup: [],



//        本地图片库
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
        imagetype:"N",
        localimg:false,
        addloct:0,
        modeloct:[],
        loctId:'',
        imagearr:[],
//            选中本地图片
        loctAll:false,
        loctalldata:[],
//      分页参数1
        totalCount:0,
        current:1,
        limit:16,
        offset:0,

        handlist:[],



        index:1,
        index2:1,
        index3:1,
        formValidate:{
          temName:'',
          kwGraphics:6,
          originArr:[],
          originCode:'',//传给后台的原产地
          unitArr:[],
          timeArr:[],
          currencyArr:[],
          xqmbflArr:[],
          //获取不同分类下商品的固定属性
          fixedAttributes:[],
          //选中的二级id
          childAttributes:[],
          attributes:[],
          //所有分类
          category: [],

          //运费模版
          templates:[],
          //选中的分类的id
          groupId:[],
          //关键词名称
          keywords:new Array(3),
          //产品名称
          subject:'',
          //是否支持一口价商品（商品类型，在线批发商品(wholesale)或者询盘商品(sourcing)，值为wholesale时，必须填写wholesale_trade）
          product_type:'sourcing',//不支持一口价
          //价格设置
          priceSetting:'section',
          /******************不支持一口价模块*********************/
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
          //支付方式
          payment_methods:[],
          //发货期限
          delivery_time:'',
          //发货港口
          delivery_port:'',
          //供货能力
          supply_quantity:'',
          //供货能力计量单位，枚举值
          supply_unit_type:'',
          //供货能力周期，枚举值
          supply_period_type:'',
          //包装信息
          packaging_desc:'',
          /******************支持一口价模块*********************/
          //最小计量单位，枚举值
          unit_type:'',
          //销售方式，按件卖(normal)或者按批卖(batch)
          sale_type:'normal',
          //根据数量设置的折扣价
          bulk_discount_prices2:[
            {
              startQuantity:null,
              price:'',
              index: 1,
              status: 1
            }
          ],
          //每批数量，当sale_type=batch时生效，范围是1-99999
          batch_number:null,
          package_type:'len',
          //每件尺寸
          package_size_c:'',
          package_size_k:'',
          package_size_g:'',
          //体积，单位是立方厘米，范围是1-9999999
          volume:null,
          //重量，单位是kg，精确到小数点后三位，范围是0.01-9999999.000
          weight:null,
          //运费模板ID
          shipping_line_template_id:'',
          //备货期，单位是天，范围是1-60
          handling_time:null,
          priceSetting2:'1',
          attributes:[
            {
              attributeName:'',//属性名称
              valueName:'', //属性值名称
              attType:'2',
              index: 1,
              status: 1
            }
          ],
          attributes2:''
        },
        ruleValidate: {
          temName:[{required:true,message: '模板名称不能为空!',  trigger: 'blur' }],
          category:[
            {type: 'array',required:true,message: '请选择分组!',  trigger: 'change' }
          ],
          subject: [
            { required:true,message: '产品名称不能为空!', trigger: 'blur' },
            { type: 'string', max: 128, message: '产品名称不能超过128个字符', trigger: 'blur' }
          ],
          keywords:[
            {required:true,validator: validateKeywords, trigger: 'blur' }
          ],
          fob_unit_type:[
            {type: 'string',required:true,message: '请选择计量单位!',  trigger: 'change' }
          ],
          unit_type:[
            {required:true,message: '计量单位不能为空!',  trigger: 'blur' }
          ],
          package_type:[
            {required:true,message: '计量单位不能为空!',  trigger: 'blur' }
          ],
          package_size_c:[
            {required:true,validator: validatePackageSize, trigger: 'blur' },
          ],
          package_size_k:[
            {required:true,validator: validatePackageSize, trigger: 'blur' },
          ],
          package_size_g:[
            {required:true,validator: validatePackageSize, trigger: 'blur' },
          ],
          volume:[
            {required:true,validator: validatePackageSize, trigger: 'blur' },
          ],
          weight:[
            {required:true,validator: validateWeight, trigger: 'blur' },
          ],
          shipping_line_template_id:[
            {type: 'number',required:true,message: '运费模板不能为空!',  trigger: 'change' }
          ],
          handling_time:[
            {required:true,validator: validateHandlingTime, trigger: 'blur' },
          ],
          batch_number:[
            {required:true,validator: validateBatchNumber, trigger: 'blur' },
          ]
        },
      }
    },

    watch:{
      offset(){
        this.imagedata();
      },

    },
    created(){

      if(window.screen.width>=1366 && window.screen.width<1920){
        this.tableHeight2 = 250
      }
      if(this.$route.params.categoryId){
        this.getfixedAttributes()
      }

      this.getListTemplates()
      this.getOtherDictionary('origin')
      this.getOtherDictionary('unit')
      this.getDictionary('time')
      this.getDictionary('currency')
      this.getDictionary('xqmbfl')
      this.loctinit()
      /*this.chooseKeyword()*/

      this.getAllWordGroup()
      if(this.$route.params.proCategory){
        this.proCategoryArr = this.$route.params.proCategory.split(',')
        this.findByProCategory(this.proCategoryArr)
      }
    },
    mounted(){
      this.tmplateEditer = UE.getEditor('editorTem',{
        toolbars: [
          ['fullscreen', 'source', 'undo', 'redo'],
          ['bold', 'italic', 'underline', 'fontborder','fontfamily','fontsize','link','simpleupload', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc','inserttable', 'deletetable', 'insertparagraphbeforetable',]
        ],
        autoHeightEnabled:false,
        zIndex:999999,
      });
      let _this=this;
      UE.getEditor('editorTem').ready(function() {
        //this是当前创建的编辑器实例
        _this.getAllGroups()
      })


      // window.setTimeout(function () {
      //   if(_this.description){
      //     _this.tmplateEditer.setContent(_this.description);
      //   }
      // },3000)
    },
    methods:{
    	attrMin(index){
    		this.minVal=this.minVal.replace(/[^\x00-\xff]+/g, '')
    		this.formValidate.fixedAttributes[index].valueName=this.minVal+'|'+this.maxVal
    		console.log(this.formValidate.fixedAttributes[index].valueName)
    	},
    	attrMax(index){
    		this.maxVal=this.maxVal.replace(/[^\x00-\xff]+/g, '')
    		this.formValidate.fixedAttributes[index].valueName=this.minVal+'|'+this.maxVal
    		console.log(this.formValidate.fixedAttributes[index].valueName)
    	},
    	prevImg(index){
    		var key=this.handlist.splice(index,1)
				this.handlist.splice(index-1,0,key[0])
    	},
    	nextImg(index){
    		var key=this.handlist.splice(index,1)
				this.handlist.splice(index+1,0,key[0])
    	},
      caculateProp(index,type,showType,skuAttribute){
        if(type==='input' && showType==='input'){
          return 'fixedAttributes.' + index + '.valueName'
        }else if(type==='single_select' && showType==='list_box'){
          return 'fixedAttributes.' + index + '.selectedId'
        }else if(type==='multi_select' && showType==='check_box' && !skuAttribute){
          return 'fixedAttributes.' + index + '.selectedIdArr'
        }
      },
      caculateType(index,type,showType){
        if(type==='input' && showType==='input'){
          return 'string'
        }else if(type==='single_select' && showType==='list_box'){
          return 'string'
        }else if(type==='multi_select' && showType==='check_box'){
          return 'array'
        }
      },
      preview(){
        this.showPriview=true;
        this.con=UE.getEditor('editorTem').getContent()
      },
      findByProCategory(ids){
        if(ids!=''){
          this.api.findByProCategory.list({
            params:[ids]
          }).then((res) => {
            if(res){
              this.proCategoryName = res.data.rows[0].categoryName.replace(/,/g, " >> ")
              this.cnName = res.data.rows[0].cnName.replace(/,/g, " >> ")
            }
          })
        }

      },
      //详情模板
      loadDetailTem(){
        this.api.queryProductDetailTemplate.list({
          reqData:{
            pdtType:this.pdtType,
            limit:this.limit3,
            offset:this.offset3
          }
        }).then((res) => {
          if(res){
            console.log(res)
            this.tmplates = res.data.rows;
            this.totalCount3 = res.data.total;
          }
        })

      },
      //添加详情模板
      addTemplateToUE(con){
        if(con){
          UE.getEditor('editorTem').setContent(con, true);
        }
      },
      showChild(item,index){
        this.formValidate.childAttributes[index] = item.selectedId.split(",")[0];
      },
      //切换模板分类
      changePdtType(type,index){
        this.pdtType = type;
        this.activeIndex = index;
        this.loadDetailTem()
      },
//        图片上传

      imgdelete(i){
        this.handlist.splice(i,1);
      },
      handleUpload(file){
        const check = this.handlist.length < 6;
        if (!check) {
          this.$Notice.warning({
            title:"最多上传6张图片"
          });
        }
        return check;

      },
      handleSuccess(res,file){
        if(res.status=="200"){
          var listobj={
            imageId:"",
            imageUrl:res.rows[1],
            imageSequnce:"",
            imageUsed:""
          }
          this.handlist.push(listobj);
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
      handleMaxSize(file){
        this.$Notice.warning({
          title:file.name+"超过5M",
        });
      },
      //获取不同分类下商品的固定属性
      getfixedAttributes(){
        this.api.getAttributes.search({
          params:[this.$route.params.categoryId]
        }).then((res) => {
          if(res){
            this.formValidate.fixedAttributes =res.data.rows;
            for(let i in this.formValidate.fixedAttributes){
              if(!this.formValidate.fixedAttributes[i].selectedIdArr){
                this.formValidate.fixedAttributes[i].selectedIdArr=[]
              }
            }
          }
        })

      },
      //编辑页面初始数据
      getfixedAttributes2(){
        this.api.productTaskEdit.edit({
          params:[this.$route.params.proId]
        }).then((res) => {
          if(res){

            let productInfo = res.data.rows[0];

            this.description = productInfo.description;
            console.log( typeof  this.description)
            this.tmplateEditer.setContent(this.description);
            let proAttributes = JSON.parse(productInfo.proAttributes);
            console.log(proAttributes)
            this.proId = productInfo.proId;
            this.categoryId = productInfo.categoryId;
            this.proCategory = productInfo.proCategory;

            this.proCategoryArr = productInfo.proCategory.split(',')
            this.findByProCategory(this.proCategoryArr)
            for(var i=0; i<proAttributes.length; i++){
            	if(null != proAttributes[i].valueName){
	            	if(proAttributes[i].inputType=='input'&&proAttributes[i].showType=='interval'&&proAttributes[i].valueName.indexOf('|')!=-1){
	            		this.minVal=proAttributes[i].valueName.split('|')[0]
	            		this.maxVal=proAttributes[i].valueName.split('|')[1]
	            	}
            	}
            }
            this.formValidate.fixedAttributes = proAttributes;

            if(productInfo.groupId){
              let groupIdStrArr = productInfo.groupId.split(',');
              let groupIdIntArr = [];
              groupIdIntArr = groupIdStrArr.map(function(data){
                return +data;
              });
              this.formValidate.groupId = groupIdIntArr;
            }
            this.formValidate.subject = productInfo.subject;
            this.formValidate.keywords[0] = productInfo.keywords1;
            this.formValidate.keywords[1] = productInfo.keywords2;
            this.formValidate.keywords[2] = productInfo.keywords3;
            if(productInfo.attributes.length){
              this.formValidate.attributes = [];
              if(productInfo.attributes.length>10){
                for(let i=0;i<10;i++){
                  this.formValidate.attributes.push({
                    attributeName:productInfo.attributes[i].attributeName,//属性名称
                    valueName:productInfo.attributes[i].valueName, //属性值名称
                    attType:'2',
                    index: 1,
                    status: 1
                  })
                }
              }else{
                for(let i=0;i<productInfo.attributes.length;i++){
                  this.formValidate.attributes.push({
                    attributeName:productInfo.attributes[i].attributeName,//属性名称
                    valueName:productInfo.attributes[i].valueName, //属性值名称
                    attType:'2',
                    index: 1,
                    status: 1
                  })
                }
              }

            }
            for(let j=0;j<proAttributes.length;j++){
              if(proAttributes[j].enName==='Place of Origin'){
                this.formValidate.originCode = this.formValidate.fixedAttributes[j].valueName
              }
            }
            this.formValidate.product_type = productInfo.productType;
            this.handlist = productInfo.images;

            //不支持一口价
            if(productInfo.productType==='sourcing'){
              this.formValidate.priceSetting = productInfo.sourcingTrad.priceSetting;
              this.formValidate.fob_currency = productInfo.sourcingTrad.fobCurrency;
              this.formValidate.fob_min_price = productInfo.sourcingTrad.fobMinPrice;
              this.formValidate.fob_max_price = productInfo.sourcingTrad.fobMaxPrice;
              this.formValidate.fob_unit_type = productInfo.sourcingTrad.fobUnitType;
              if(productInfo.sourcingTrad.paymentMethods){
                this.formValidate.payment_methods = productInfo.sourcingTrad.paymentMethods.split(",")
              }
              this.formValidate.min_order_quantity = productInfo.sourcingTrad.minOrderQuantity;
              this.formValidate.min_order_unit_type = productInfo.sourcingTrad.minOrderUnitType;
              this.formValidate.supply_quantity = productInfo.sourcingTrad.supplyQuantity;
              this.formValidate.supply_unit_type = productInfo.sourcingTrad.supplyUnitType;
              this.formValidate.supply_period_type = productInfo.sourcingTrad.supplyPeriodType;
              this.formValidate.delivery_port = productInfo.sourcingTrad.deliveryPort;
              this.formValidate.delivery_time = productInfo.sourcingTrad.deliveryTime;
              this.formValidate.packaging_desc = productInfo.sourcingTrad.packagingDesc;
              if(productInfo.sourcingTrad.packagingDesc){
                this.surplusWordCount =512 - productInfo.sourcingTrad.packagingDesc.length;
              }
              this.formValidate.bulk_discount_prices = [];
              for(let k=0;k<productInfo.discountPrices.length;k++){
                this.formValidate.bulk_discount_prices.push({
                  startQuantity:productInfo.discountPrices[k].startQuantity,
                  price:productInfo.discountPrices[k].price,
                  index: 1,
                  status: 1
                })
              }
            }else{
              //支持一口价
              this.formValidate.unit_type = productInfo.wholesaleTrade.unitType;
              this.formValidate.sale_type = productInfo.wholesaleTrade.saleType;
              this.formValidate.batch_number = productInfo.wholesaleTrade.batchNumber;
              this.formValidate.package_size_c = productInfo.wholesaleTrade.packageSize.split('X')[0];
              this.formValidate.package_size_k = productInfo.wholesaleTrade.packageSize.split('X')[1];
              this.formValidate.package_size_g = productInfo.wholesaleTrade.packageSize.split('X')[2];
              this.formValidate.volume = productInfo.wholesaleTrade.volume;
              this.formValidate.weight = productInfo.wholesaleTrade.weight;
              this.formValidate.shipping_line_template_id = productInfo.wholesaleTrade.shippingLineTemplateId;
              this.formValidate.handling_time = productInfo.wholesaleTrade.handlingTime;
              for(let k=0;k<productInfo.discountPrices.length;k++){
                this.formValidate.bulk_discount_prices2 = [];
                this.formValidate.bulk_discount_prices2.push({
                  startQuantity:productInfo.discountPrices[k].startQuantity,
                  price:productInfo.discountPrices[k].price,
                  index: 1,
                  status: 1
                })
              }
            }

          }

        })

      },
      getfixedAttributes3(){
        this.api.getTemplateInfo.list({
          params:[this.$route.params.temId]
        }).then((res) => {
          if(res){
            let productInfo = res.data.rows[0];
            this.temId = productInfo.temId;
            this.formValidate.temName =  productInfo.temName;
            this.formValidate.kwGraphics =  productInfo.kwGraphics;
            this.wordGroupId = productInfo.wordGroupId;
            if(productInfo.groupId){
              let groupIdStrArr = productInfo.groupId.split(',');
              let groupIdIntArr = [];
              groupIdIntArr = groupIdStrArr.map(function(data){
                return +data;
              });
              this.formValidate.groupId = groupIdIntArr;
            }
            if(productInfo.seoOptimize=='1'){
              this.seoOption = true
            }else{
              this.seoOption = false
            }
            this.description = productInfo.description;
            this.tmplateEditer.setContent(this.description);
            this.categoryId = productInfo.categoryId;
            this.proCategory = productInfo.proCategory;
            this.proCategoryArr = productInfo.proCategory.split(',')
            this.findByProCategory(this.proCategoryArr)
            let proAttributes = JSON.parse(productInfo.proAttributes);


            this.formValidate.fixedAttributes = proAttributes;

            if(productInfo.productTemAttrs.length){
              this.formValidate.attributes = [];
              if(productInfo.productTemAttrs.length>10){
                for(let i=0;i<10;i++){
                  this.formValidate.attributes.push({
                    attributeName:productInfo.productTemAttrs[i].attributeName,//属性名称
                    valueName:productInfo.productTemAttrs[i].valueName, //属性值名称
                    attType:'2',
                    index: 1,
                    status: 1
                  })
                }
              }else{
                for(let i=0;i<productInfo.productTemAttrs.length;i++){
                  this.formValidate.attributes.push({
                    attributeName:productInfo.productTemAttrs[i].attributeName,//属性名称
                    valueName:productInfo.productTemAttrs[i].valueName, //属性值名称
                    attType:'2',
                    index: 1,
                    status: 1
                  })
                }
              }

            }
            for(let j=0;j<proAttributes.length;j++){
              if(proAttributes[j].enName==='Place of Origin'){
                this.formValidate.originCode = this.formValidate.fixedAttributes[j].valueName
              }
            }
            this.formValidate.product_type = productInfo.productType;


            //不支持一口价
            if(productInfo.productType==='sourcing'){
              this.formValidate.priceSetting = productInfo.productTemSourc.priceSetting;
              this.formValidate.fob_currency = productInfo.productTemSourc.fobCurrency;
              this.formValidate.fob_min_price = productInfo.productTemSourc.fobMinPrice;
              this.formValidate.fob_max_price = productInfo.productTemSourc.fobMaxPrice;
              this.formValidate.fob_unit_type = productInfo.productTemSourc.fobUnitType;
              if(productInfo.productTemSourc.paymentMethods){
                this.formValidate.payment_methods = productInfo.productTemSourc.paymentMethods.split(",")
              }
              this.formValidate.min_order_quantity = productInfo.productTemSourc.minOrderQuantity;
              this.formValidate.min_order_unit_type = productInfo.productTemSourc.minOrderUnitType;
              this.formValidate.supply_quantity = productInfo.productTemSourc.supplyQuantity;
              this.formValidate.supply_unit_type = productInfo.productTemSourc.supplyUnitType;
              this.formValidate.supply_period_type = productInfo.productTemSourc.supplyPeriodType;
              this.formValidate.delivery_port = productInfo.productTemSourc.deliveryPort;
              this.formValidate.delivery_time = productInfo.productTemSourc.deliveryTime;
              this.formValidate.packaging_desc = productInfo.productTemSourc.packagingDesc;
              if(productInfo.productTemSourc.packagingDesc){
                this.surplusWordCount =512 - productInfo.productTemSourc.packagingDesc.length;
              }
              this.formValidate.bulk_discount_prices = [];
              for(let k=0;k<productInfo.productTemDiscount.length;k++){
                this.formValidate.bulk_discount_prices.push({
                  startQuantity:productInfo.productTemDiscount[k].startQuantity,
                  price:productInfo.productTemDiscount[k].price,
                  index: 1,
                  status: 1
                })
              }
            }

          }

        })

      },
      getfixedAttributes4(){
        this.api.findByIds.list({
          reqData:[this.$route.params.aliProId]
        }).then((res) => {
          if(res){
            let productInfo = res.data.rows[0];
            this.description = productInfo.description;
            this.tmplateEditer.setContent(this.description);
            this.proId = productInfo.proId;
            this.productId = productInfo.productId;
            this.proNumId=productInfo.proNumId;
            this.categoryId = productInfo.categoryId;
            this.proCategory = productInfo.proCategory;
            if(this.proCategory){
              this.proCategoryArr = productInfo.proCategory.split(',')
            }
            this.findByProCategory(this.proCategoryArr)

            let proAttributes = JSON.parse(productInfo.proAttributes);
            for(var i=0; i<proAttributes.length; i++){
            	if(null != proAttributes[i].valueName){
	            	if(proAttributes[i].inputType=='input'&&proAttributes[i].showType=='interval'&&proAttributes[i].valueName.indexOf('|')!=-1){
	            		this.minVal=proAttributes[i].valueName.split('|')[0]
	            		this.maxVal=proAttributes[i].valueName.split('|')[1]
	            	}
            	}
            }
            this.formValidate.fixedAttributes = proAttributes;
            console.log(proAttributes)
            if(productInfo.groupId){
              let groupIdStrArr = productInfo.groupId.split(',');
              let groupIdIntArr = [];
              groupIdIntArr = groupIdStrArr.map(function(data){
                return +data;
              });
              this.formValidate.groupId = groupIdIntArr;
            }
            this.formValidate.subject = productInfo.subject;
            this.formValidate.keywords[0] = productInfo.keywords1;
            this.formValidate.keywords[1] = productInfo.keywords2;
            this.formValidate.keywords[2] = productInfo.keywords3;
            if(productInfo.attributes.length){
              this.formValidate.attributes = [];
              if(productInfo.attributes.length>10){
                for(let i=0;i<10;i++){
                  this.formValidate.attributes.push({
                    attributeName:productInfo.attributes[i].attributeName,//属性名称
                    valueName:productInfo.attributes[i].valueName, //属性值名称
                    attType:'2',
                    index: 1,
                    status: 1
                  })
                }
              }else{
                for(let i=0;i<productInfo.attributes.length;i++){
                  this.formValidate.attributes.push({
                    attributeName:productInfo.attributes[i].attributeName,//属性名称
                    valueName:productInfo.attributes[i].valueName, //属性值名称
                    attType:'2',
                    index: 1,
                    status: 1
                  })
                }
              }

            }
            for(let j=0;j<proAttributes.length;j++){
              if(proAttributes[j].enName==='Place of Origin'){
                this.formValidate.originCode = this.formValidate.fixedAttributes[j].valueName
              }
            }
            this.formValidate.product_type = productInfo.productType;
            this.handlist = productInfo.images;

            //不支持一口价
            if(productInfo.productType==='sourcing'){
              this.formValidate.priceSetting = productInfo.sourcingTrad.priceSetting;
              this.formValidate.fob_currency = productInfo.sourcingTrad.fobCurrency;
              this.formValidate.fob_min_price = productInfo.sourcingTrad.fobMinPrice;
              this.formValidate.fob_max_price = productInfo.sourcingTrad.fobMaxPrice;
              this.formValidate.fob_unit_type = productInfo.sourcingTrad.fobUnitType;
              if(productInfo.sourcingTrad.paymentMethods){
                this.formValidate.payment_methods = productInfo.sourcingTrad.paymentMethods.split(",")
              }
              this.formValidate.min_order_quantity = productInfo.sourcingTrad.minOrderQuantity;
              this.formValidate.min_order_unit_type = productInfo.sourcingTrad.minOrderUnitType;
              this.formValidate.supply_quantity = productInfo.sourcingTrad.supplyQuantity;
              this.formValidate.supply_unit_type = productInfo.sourcingTrad.supplyUnitType;
              this.formValidate.supply_period_type = productInfo.sourcingTrad.supplyPeriodType;
              this.formValidate.delivery_port = productInfo.sourcingTrad.deliveryPort;
              this.formValidate.delivery_time = productInfo.sourcingTrad.deliveryTime;
              this.formValidate.packaging_desc = productInfo.sourcingTrad.packagingDesc;
              if(productInfo.sourcingTrad.packagingDesc){
                this.surplusWordCount =512 - productInfo.sourcingTrad.packagingDesc.length;
              }
              this.formValidate.bulk_discount_prices = [];
              for(let k=0;k<productInfo.discountPrices.length;k++){
                this.formValidate.bulk_discount_prices.push({
                  startQuantity:productInfo.discountPrices[k].startQuantity,
                  price:productInfo.discountPrices[k].price,
                  index: 1,
                  status: 1
                })
              }
            }
          }

        })

      },
      //获取货币种类 ，时间单位，详情模版分类
      getDictionary(type){
        this.api.dictionary.list({
          params:[type]
        }).then((res) => {
          if(type==='time'){
            this.formValidate.timeArr = res.data.rows;
          }else if(type==='currency'){
            this.formValidate.currencyArr = res.data.rows;
          }else{
            this.formValidate.xqmbflArr = res.data.rows;
            if(res.data.rows.length){
              this.pdtType=res.data.rows[0].dicCode
            }
            this.loadDetailTem()
          }

        })
      },
      //获取原产地信息,计量单位
      getOtherDictionary(type){
        this.api.findByType.list({
          params:[type]
        }).then((res) => {
          if(type==='origin'){
            this.formValidate.originArr = res.data.rows;
          }else if(type==='unit'){
            this.formValidate.unitArr = res.data.rows;
          }

        })
      },
      getAllWordGroup(){
        this.api.group_Lexicon.find().then((res) => {
          if(res){
            this.WordGroup = res.data.rows;
          }
        })
      },
      //生成标题
      titleSynthesis(name){

        this.$refs[name].validateField(('keywords'),(valid) =>{
          if(!valid){
            let arr = this.formValidate.keywords;
            let str=''
            for(let i=0;i<arr.length;i++){
              if(arr[i] && arr[i+1]){
                str += arr[i] +','
              }else if(arr[i] && !arr[i+1]){
                str += arr[i]
              }
            }
            console.log(str)
            this.api.titleRules.rules({
              params:[str]
            }).then((res) => {
              if(res){
                this.formValidate.subject = res.data.mapInfo.title
              }
            })
          }
        })

      },
      //解析同行
      loadPeerAttributes(name){
        this.$refs[name].validateField(('subject'),(valid) => {
          if(!valid){
            this.api.getPeerAttributes.list({
              params:[this.formValidate.subject]
            }).then((res) => {
              if(res){
                if(res.data.rows.length){
                  this.formValidate.attributes = [];
                  for(let i=0;i<res.data.rows.length;i++){
                    this.formValidate.attributes.push({
                      attributeName:res.data.rows[i].attributeName,//属性名称
                      valueName:res.data.rows[i].valueName, //属性值名称
                      attType:'2',
                      index: 1,
                      status: 1
                    })
                  }
                }
                this.index = res.data.rows.length;
              }
            })
          }
        })
      },
      //显示选择关键词弹窗
      showKeywordsModal(){
        this.chooseKeywordsModal=true;
        this.keywords = '';
        this.selectedArr =[];
        this.selectedArr2 = []
        this.keywords='';
        this.searchType='0';
        this.isCover='1';
        this.ranking='0';
        this.hot='1';
        this.promote='1';
        this.wgId='';
        this.$refs.chooseKeywordTable.selectAll(false);
        this.chooseKeyword(1)
      },
      changeKeyWord(type){
        this.current2=1;
        this.offset2=0;
        this.chooseKeyword(type)
      },
      chooseKeyword(type){
        let kwSearchHot = '';
        let kwToPromote = '';
        let kwCover = '';
        let kwNaturalRanking = '';
        let wgId='';
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
          this.keywords='';
          wgId=this.wgId;
        }

        this.api.chooseKeyword.list({
          reqData:{
            wgId:wgId,
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
      //选中行，返回选中行的数组
      chooseRow(selection) {
        let arr =[];
        if(this.selectedArr2.length>10){
          this.$Notice.warning({
            title: '提示',
            desc: '最多只能选10个词'
          });
        }else{
          if(!selection.length){
            for(var i=0;i<this.tableData2.length;i++){
              let index = this.selectedArr2.indexOf(this.tableData2[i].kwKeywords)
              if(index>=0){
                this.selectedArr2.splice(index,this.tableData2[i].kwKeywords.length)
              }
            }
          }else{
            if(selection.length<=10){
              for(var i=0;i<selection.length;i++){
                arr.push(selection[i].kwKeywords)
              }
            }else{
              this.$Notice.warning({
                title: '提示',
                desc: '最多只能选10个词'
              });
              for(var i=0;i<10;i++){
                arr.push(selection[i].kwKeywords)
              }
            }
            this.selectedArr = arr;
            this.selectedArr2 = this.util.distinct(this.selectedArr2.concat(this.selectedArr));
          }
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
        if(this.selectedArr2.length>3){
          for(var i=0;i<3;i++){
            this.formValidate.keywords[i] = this.selectedArr2[i]
          }
        }else{
          for(var i=0;i<this.selectedArr2.length;i++){
            this.formValidate.keywords[i] = this.selectedArr2[i]
          }
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
      changePage3(currentPage){
        this.offset3 = (currentPage-1)*this.limit3;
        this.current3 = currentPage;
        this.loadDetailTem()
      },
      changePageSize3(pageSize){
        this.limit3 = pageSize;
        this.loadDetailTem()
      },
      //保存为模板
      addTemplate(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            let arr = [];
            let arr2 = [];
            for(let i=0;i<this.formValidate.fixedAttributes.length;i++){
              if(this.formValidate.fixedAttributes[i].enName==='Place of Origin'){
                this.formValidate.fixedAttributes[i].valueName=this.formValidate.originCode
              }
            }

            let flag=true;
            if(!this.formValidate.groupId.length){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择产品分组'
              });
              flag = false;
            }

            if(this.formValidate.priceSetting=='single'){
              if((this.formValidate.fob_min_price) && ((this.formValidate.fob_min_price) >= (this.formValidate.fob_max_price))){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格必须大于最小价格'
                });
                flag = false;
              }else if(this.formValidate.fob_min_price && this.formValidate.fob_min_price< 0.0001 || this.formValidate.fob_min_price >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最小价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(this.formValidate.fob_max_price && this.formValidate.fob_max_price< 0.0001 || this.formValidate.fob_max_price >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_currency){
                this.$Notice.warning({
                  title: '提示',
                  desc: '货币种类不能为空'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_unit_type){
                this.$Notice.warning({
                  title: '提示',
                  desc: '计量单位不能为空'
                });
                flag = false;
              }
            }

            if(this.formValidate.supply_quantity && (!this.formValidate.supply_unit_type || !this.formValidate.supply_period_type)){
              this.$Notice.warning({
                title: '提示',
                desc: '供货能力请同时填写数值和单位'
              });
              flag = false;
            }

            let keywordsLength = 0;
            for(let i=0;i<this.formValidate.keywords.length;i++){
              if(this.formValidate.keywords[i]){
                keywordsLength+=this.formValidate.keywords[i].length;
              }
            }
            if(keywordsLength>255){
              this.$Notice.warning({
                title: '提示',
                desc: '产品关键词长度之和不能超过255'
              });
              flag = false;
            }

            for(let j= 0;j<this.formValidate.attributes.length;j++){
              if((this.formValidate.attributes[j].attributeName && !this.formValidate.attributes[j].valueName) || (!this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName)){
                this.$Notice.warning({
                  title: '提示',
                  desc: '请填写对应的属性名或者属性值'
                });
                flag = false;
              }else if(this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName){
                arr2.push({attributeName:this.formValidate.attributes[j].attributeName,valueName:this.formValidate.attributes[j].valueName,attType:'2'})
              }
            }
            this.formValidate.attributes2 = arr2;
            let images = this.handlist;

            //判断是阶梯价格还是价格区间
            let fobCurrency='';
            let fobMinPrice='';
            let fobMaxPrice='';
            let fobUnitType='';
            if(this.formValidate.priceSetting =='section'){
              fobCurrency='USD'
              fobUnitType = this.formValidate.fob_unit_type;
            }else{
              fobCurrency = this.formValidate.fob_currency;
              fobMinPrice= this.formValidate.fob_min_price;
              fobMaxPrice = this.formValidate.fob_max_price;
              fobUnitType = this.formValidate.fob_unit_type;
            }

            //判断是否支持一口价
            let sourcingTrad = null;
            if(this.formValidate.product_type === 'sourcing'){
              sourcingTrad = {
                priceSetting:this.formValidate.priceSetting,
                fobCurrency:fobCurrency,//FOB货币种类，枚举值
                fobMinPrice:fobMinPrice,//FOB最小价格
                fobMaxPrice:fobMaxPrice,//FOB最大价格
                fobUnitType:fobUnitType,//FOB计量单位，枚举值
                paymentMethods:this.formValidate.payment_methods.join(','),//付款方式，枚举值，逗号分割
                minOrderQuantity:this.formValidate.min_order_quantity,//最小起订量
                minOrderUnitType:this.formValidate.fob_unit_type,//最小起订量计量单位，枚举值
                supplyQuantity:this.formValidate.supply_quantity,//供货能力
                supplyUnitType:this.formValidate.supply_unit_type,// 供货能力计量单位，枚举值
                supplyPeriodType:this.formValidate.supply_period_type,// 供货能力周期，枚举值
                deliveryPort:this.formValidate.delivery_port,// 发货港口
                deliveryTime:this.formValidate.delivery_time,// 发货期限
                packagingDesc:this.formValidate.packaging_desc//包装信息
              }
              if(this.formValidate.priceSetting==='section'){
                for(let i= 0;i<this.formValidate.bulk_discount_prices.length;i++){
                  let startQuantity = this.formValidate.bulk_discount_prices[i].startQuantity;
                  let price = this.formValidate.bulk_discount_prices[i].price;
                  let startQuantity2 = '';
                  let price2 = '';
                  if(this.formValidate.bulk_discount_prices[i+1]){
                    startQuantity2 = this.formValidate.bulk_discount_prices[i+1].startQuantity;
                    price2 = this.formValidate.bulk_discount_prices[i+1].price;
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
                    if(Number(startQuantity) > 999999999 || Number(startQuantity) < 1 || (Number(startQuantity))%1!==0){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量请输入1-999999999的整数。'
                      });
                      flag = false;
                    }else if(Number(price) > 999999999.9999 || Number(price) < 0.0001){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '价格请输入0.0001-999999999.9999之间的数值。'
                      });
                      flag = false;
                    }else if(startQuantity2 && Number(startQuantity)>Number(startQuantity2)){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量必须是由小到大。'
                      });
                      flag = false;
                    }else if(price2 && Number(price2)>Number(price)){
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
              }
            }
            this.formValidate.discountPrices = arr;
            let seoStr = UE.getEditor('editorTem').getContent();
            let isSeo=0;
            if(this.seoOption){
              isSeo=1;
              // if(images.length){
              //   seoStr = '<div><img src="'+images[0].imageUrl+'" ><p>'+this.formValidate.subject+'</p><h2>'+this.formValidate.subject+'</h2></div>'+UE.getEditor('editorTem').getContent()
              // }else{
              //   seoStr = '<div><p>'+this.formValidate.subject+'</p><h2>'+this.formValidate.subject+'</h2></div>'+UE.getEditor('editorTem').getContent()
              // }
              // seoStr = seoStr.replace(/<img/g, '<img alt="'+this.formValidate.subject+'"')
            }else{
              // seoStr = UE.getEditor('editorTem').getContent()
            }
            if(/[\u4e00-\u9fa5]/.test(seoStr)){
              this.$Notice.warning({
                title: '提示',
                desc: '模板详情不能包含中文字符'
              });
              flag = false;
            }


            //判断是否是批量发布的新建模板 ，如果是，则需要传分组id
            let wordGroupId = '';
            if(this.$route.params.wordGroupId!=0){
              wordGroupId = this.$route.params.wordGroupId
            }else{
              if(!this.tempWgId){
                this.chooseGroup=true;
                flag = false;
                console.log(111111111111111111111111111111111111111111111111111111111111)
                console.log(this.tempWgId)
              }else{
                wordGroupId=this.tempWgId
              }
            }
            let temName='';
            let subject=null;
            if(this.$route.params.wordGroupId==0 || this.$route.params.proId){
              temName = this.formValidate.subject;
              subject = this.formValidate.subject
            }else{
              temName = this.formValidate.temName
            }

            if(flag){
              this.$Spin.show();
              this.api.addTemplateInformation.add({
                reqData:{
                  subject:subject,
                  productType:this.formValidate.product_type,//商品类型
                  groupId:this.formValidate.groupId.join(','),//分组ID
                  categoryId:this.$route.params.categoryId,//类目ID
                  description:seoStr,//描述详情
                  market:'main',//发布的市场
                  extraContext:'{}',//补充信息

                  proCategory:this.$route.params.proCategory,//------多级类目ID
                  language:'ENGLISH',//语种
                  proAttributes:JSON.stringify(this.formValidate.fixedAttributes),//商品所有属性.数组
                  temName:temName,
                  wordGroupId:wordGroupId,//批量发布新建模板的模板分组id
                  kwGraphics:this.formValidate.kwGraphics,
                  seoOptimize:isSeo,
                  productTemAttrs:this.formValidate.attributes2,
                  productTemDiscount:this.formValidate.discountPrices,
                  productTemSourc:sourcingTrad,//询盘商品交易信息
                }
              }).then((res) => {
                this.$Spin.hide();
                if(res.data.status==='200'){
                  this.$Notice.success({
                    title: '提示',
                    desc: '保存成功'
                  });
                  if(this.$route.params.page=='material'){
                  	this.$router.push({name:'material'})
                  }else{
                  	this.$router.push({name:'batch'})
                  }
                }else{
                	this.$Notice.error({
					          title: res.data.info,
					        });
                }
              })
            }

          }
        })
      },
      //编辑模板
      editTemplate(name){
      	 console.log('1');
        this.$refs[name].validate((valid) => {
        	console.log('2');
          if(valid){   
            let arr = [];
            let arr2 = [];
            for(let i=0;i<this.formValidate.fixedAttributes.length;i++){
              if(this.formValidate.fixedAttributes[i].enName==='Place of Origin'){
                this.formValidate.fixedAttributes[i].valueName=this.formValidate.originCode
              }
            }
						  
            let flag=true;
            if(!this.formValidate.groupId.length){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择产品分组'
              });
              flag = false;
            }
           
				
            if(this.formValidate.priceSetting=='single'){
              if(Number(this.formValidate.fob_min_price) && (Number(this.formValidate.fob_min_price) >= Number(this.formValidate.fob_max_price))){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格必须大于最小价格'
                });
                flag = false;
              }else if(Number(this.formValidate.fob_min_price) && Number(this.formValidate.fob_min_price)< 0.0001 || Number(this.formValidate.fob_min_price) >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最小价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(Number(this.formValidate.fob_max_price) && Number(this.formValidate.fob_max_price)< 0.0001 || Number(this.formValidate.fob_max_price) >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_currency){
                this.$Notice.warning({
                  title: '提示',
                  desc: '货币种类不能为空'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_unit_type){
                this.$Notice.warning({
                  title: '提示',
                  desc: '计量单位不能为空'
                });
                flag = false;
              }
            }

            if(this.formValidate.supply_quantity && (!this.formValidate.supply_unit_type || !this.formValidate.supply_period_type)){
              this.$Notice.warning({
                title: '提示',
                desc: '供货能力请同时填写数值和单位'
              });
              flag = false;
            }

            let keywordsLength = 0;
            for(let i=0;i<this.formValidate.keywords.length;i++){
              if(this.formValidate.keywords[i]){
                keywordsLength+=this.formValidate.keywords[i].length;
              }
            }
            if(keywordsLength>255){
              this.$Notice.warning({
                title: '提示',
                desc: '产品关键词长度之和不能超过255'
              });
              flag = false;
            }

            for(let j= 0;j<this.formValidate.attributes.length;j++){
              if((this.formValidate.attributes[j].attributeName && !this.formValidate.attributes[j].valueName) || (!this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName)){
                this.$Notice.warning({
                  title: '提示',
                  desc: '请填写对应的属性名或者属性值'
                });
                flag = false;
              }else if(this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName){
                arr2.push({attributeName:this.formValidate.attributes[j].attributeName,valueName:this.formValidate.attributes[j].valueName,attType:'2'})
              }
            }
            this.formValidate.attributes2 = arr2;
            let images = this.handlist;

            //判断是阶梯价格还是价格区间
            let fobCurrency='';
            let fobMinPrice='';
            let fobMaxPrice='';
            let fobUnitType='';
            if(this.formValidate.priceSetting =='section'){
              fobCurrency='USD'
              fobUnitType = this.formValidate.fob_unit_type;
            }else{
              fobCurrency = this.formValidate.fob_currency;
              fobMinPrice= this.formValidate.fob_min_price;
              fobMaxPrice = this.formValidate.fob_max_price;
              fobUnitType = this.formValidate.fob_unit_type;
            }

            //判断是否支持一口价
            let sourcingTrad = null;
            if(this.formValidate.product_type === 'sourcing'){
              sourcingTrad = {
                priceSetting:this.formValidate.priceSetting,
                fobCurrency:fobCurrency,//FOB货币种类，枚举值
                fobMinPrice:fobMinPrice,//FOB最小价格
                fobMaxPrice:fobMaxPrice,//FOB最大价格
                fobUnitType:fobUnitType,//FOB计量单位，枚举值
                paymentMethods:this.formValidate.payment_methods.join(','),//付款方式，枚举值，逗号分割
                minOrderQuantity:this.formValidate.min_order_quantity,//最小起订量
                minOrderUnitType:this.formValidate.fob_unit_type,//最小起订量计量单位，枚举值
                supplyQuantity:this.formValidate.supply_quantity,//供货能力
                supplyUnitType:this.formValidate.supply_unit_type,// 供货能力计量单位，枚举值
                supplyPeriodType:this.formValidate.supply_period_type,// 供货能力周期，枚举值
                deliveryPort:this.formValidate.delivery_port,// 发货港口
                deliveryTime:this.formValidate.delivery_time,// 发货期限
                packagingDesc:this.formValidate.packaging_desc//包装信息
              }
              if(this.formValidate.priceSetting==='section'){
                for(let i= 0;i<this.formValidate.bulk_discount_prices.length;i++){
                  let startQuantity = this.formValidate.bulk_discount_prices[i].startQuantity;
                  let price = this.formValidate.bulk_discount_prices[i].price;
                  let startQuantity2 = '';
                  let price2 = '';
                  if(this.formValidate.bulk_discount_prices[i+1]){
                    startQuantity2 = this.formValidate.bulk_discount_prices[i+1].startQuantity;
                    price2 = this.formValidate.bulk_discount_prices[i+1].price;
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
                    if(Number(startQuantity) > 999999999 || Number(startQuantity) < 1 || (Number(startQuantity))%1!==0){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量请输入1-999999999的整数。'
                      });
                      flag = false;
                    }else if(Number(price) > 999999999.9999 || Number(price) < 0.0001){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '价格请输入0.0001-999999999.9999之间的数值。'
                      });
                      flag = false;
                    }else if(startQuantity2 && Number(startQuantity)>Number(startQuantity2)){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量必须是由小到大。'
                      });
                      flag = false;
                    }else if(price2 && Number(price2)>Number(price)){
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
              }
            }

            this.formValidate.discountPrices = arr;
            let seoStr = UE.getEditor('editorTem').getContent();
            let isSeo=0;
            if(this.seoOption){
              isSeo=1;
              // seoStr = '<div><img src="'+images[0].imageUrl+'" ><p>'+this.formValidate.subject+'</p><h2>'+this.formValidate.subject+'</h2></div>'+UE.getEditor('editorTem').getContent()
              // seoStr = seoStr.replace(/<img/g, '<img alt="'+this.formValidate.subject+'"')
            }else{
              // seoStr = UE.getEditor('editorTem').getContent()
            }
            if(/[\u4e00-\u9fa5]/.test(seoStr)){
              this.$Notice.warning({
                title: '提示',
                desc: '模板详情不能包含中文字符'
              });
              flag = false;
            }

            if(flag){
              this.$Spin.show();
              this.api.modifyTemplateInfo.modify({
                reqData:{
                  temId:this.$route.params.temId,
                  wordGroupId:this.wordGroupId,
                  productType:this.formValidate.product_type,//商品类型
                  groupId:this.formValidate.groupId.join(','),//分组ID
                  categoryId:this.categoryId,//类目ID
                  description:seoStr,//描述详情
                  market:'main',//发布的市场
                  extraContext:'{}',//补充信息
                  productTemPrice: null,
                  proCategory:this.proCategory,//------多级类目ID
                  language:'ENGLISH',//语种
                  proAttributes:JSON.stringify(this.formValidate.fixedAttributes),//商品所有属性.数组
                  temName:this.formValidate.temName,
                  kwGraphics:this.formValidate.kwGraphics,
                  seoOptimize:isSeo,
                  productTemAttrs:this.formValidate.attributes2,
                  productTemDiscount:this.formValidate.discountPrices,
                  productTemSourc:sourcingTrad,//询盘商品交易信息
                }
              }).then((res) => {
                this.$Spin.hide();
	            	if(res.data.status==='200'){
	             	 this.$Notice.success({
	                    title: '提示',
	                    desc: '保存成功'
	                  });
	                  this.$router.push({name:'batch'})
	               }
              })
            }

          }
        })
      },
      //确认发布
      addProduct(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            let arr = [];
            let arr2 = [];
            for(let i=0;i<this.formValidate.fixedAttributes.length;i++){
              if(this.formValidate.fixedAttributes[i].enName==='Place of Origin'){
                this.formValidate.fixedAttributes[i].valueName=this.formValidate.originCode
              }
            }


            let flag=true;
            if(!this.formValidate.groupId.length){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择产品分组'
              });
              flag = false;
            }
            if(this.formValidate.priceSetting=='single'){
              if((this.formValidate.fob_min_price) && ((this.formValidate.fob_min_price) >= (this.formValidate.fob_max_price))){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格必须大于最小价格'
                });
                flag = false;
              }else if(this.formValidate.fob_min_price && this.formValidate.fob_min_price< 0.0001 || this.formValidate.fob_min_price >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最小价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(this.formValidate.fob_max_price && this.formValidate.fob_max_price< 0.0001 || this.formValidate.fob_max_price >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_currency){
                this.$Notice.warning({
                  title: '提示',
                  desc: '货币种类不能为空'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_unit_type){
                this.$Notice.warning({
                  title: '提示',
                  desc: '计量单位不能为空'
                });
                flag = false;
              }
            }

            if(this.formValidate.supply_quantity && (!this.formValidate.supply_unit_type || !this.formValidate.supply_period_type)){
              this.$Notice.warning({
                title: '提示',
                desc: '供货能力请同时填写数值和单位'
              });
              flag = false;
            }

            let keywordsLength = 0;
            for(let i=0;i<this.formValidate.keywords.length;i++){
              if(this.formValidate.keywords[i]){
                keywordsLength+=this.formValidate.keywords[i].length;
              }
            }
            if(keywordsLength>255){
              this.$Notice.warning({
                title: '提示',
                desc: '产品关键词长度之和不能超过255'
              });
              flag = false;
            }

            for(let j= 0;j<this.formValidate.attributes.length;j++){
              if((this.formValidate.attributes[j].attributeName && !this.formValidate.attributes[j].valueName) || (!this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName)){
                this.$Notice.warning({
                  title: '提示',
                  desc: '请填写对应的属性名或者属性值'
                });
                flag = false;
              }else  if(this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName){
                arr2.push({attributeName:this.formValidate.attributes[j].attributeName,valueName:this.formValidate.attributes[j].valueName,attType:'2'})
              }
            }
            let proSubject=this.formValidate.subject;
            if(proSubject.length>70){
              proSubject=proSubject.substr(proSubject.length-70)
            }
            if(this.seoOption){
              if(arr2.length>=10){
                arr2[0].attributeName='product name';
                arr2[0].valueName=proSubject;
              }else{
                arr2.push({attributeName:"product name",valueName:proSubject,attType:'2'})
              }
            }
            this.formValidate.attributes2 = arr2;
            let images = this.handlist;
            //判断是否支持一口价
            let sourcingTrad = null;
            let wholesaleTrade = null;

          //判断是阶梯价格还是价格区间
            let fobCurrency='';
            let fobMinPrice='';
            let fobMaxPrice='';
            let fobUnitType='';
            if(this.formValidate.priceSetting =='section'){
              fobCurrency='USD'
              fobUnitType = this.formValidate.fob_unit_type;
            }else{
              fobCurrency = this.formValidate.fob_currency;
              fobMinPrice= this.formValidate.fob_min_price;
              fobMaxPrice = this.formValidate.fob_max_price;
              fobUnitType = this.formValidate.fob_unit_type;
            }

            if(this.formValidate.product_type === 'sourcing'){
              sourcingTrad = {
                priceSetting:this.formValidate.priceSetting,
                fobCurrency:fobCurrency,//FOB货币种类，枚举值
                fobMinPrice:fobMinPrice,//FOB最小价格
                fobMaxPrice:fobMaxPrice,//FOB最大价格
                fobUnitType:fobUnitType,//FOB计量单位，枚举值
                paymentMethods:this.formValidate.payment_methods.join(','),//付款方式，枚举值，逗号分割
                minOrderQuantity:this.formValidate.min_order_quantity,//最小起订量
                minOrderUnitType:this.formValidate.fob_unit_type,//最小起订量计量单位，枚举值
                supplyQuantity:this.formValidate.supply_quantity,//供货能力
                supplyUnitType:this.formValidate.supply_unit_type,// 供货能力计量单位，枚举值
                supplyPeriodType:this.formValidate.supply_period_type,// 供货能力周期，枚举值
                deliveryPort:this.formValidate.delivery_port,// 发货港口
                deliveryTime:this.formValidate.delivery_time,// 发货期限
                packagingDesc:this.formValidate.packaging_desc//包装信息
              }
              if(this.formValidate.priceSetting==='section'){
                for(let i= 0;i<this.formValidate.bulk_discount_prices.length;i++){
                  let startQuantity = this.formValidate.bulk_discount_prices[i].startQuantity;
                  let price = this.formValidate.bulk_discount_prices[i].price;
                  let startQuantity2 = '';
                  let price2 = '';
                  if(this.formValidate.bulk_discount_prices[i+1]){
                    startQuantity2 = this.formValidate.bulk_discount_prices[i+1].startQuantity;
                    price2 = this.formValidate.bulk_discount_prices[i+1].price;
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
                    if(Number(startQuantity) > 999999999 || Number(startQuantity) < 1 || (Number(startQuantity))%1!==0){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量请输入1-999999999的整数。'
                      });
                      flag = false;
                    }else if(Number(price) > 999999999.9999 || Number(price) < 0.0001){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '价格请输入0.0001-999999999.9999之间的数值。'
                      });
                      flag = false;
                    }else if(startQuantity2 && Number(startQuantity)>Number(startQuantity2)){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量必须是由小到大。'
                      });
                      flag = false;
                    }else if(price2 && Number(price2)>Number(price)){
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
              }
            }else {
              wholesaleTrade = {
                unitType:this.formValidate.unit_type,// 最小计量单位，枚举值
                saleType:this.formValidate.sale_type,//销售方式，按件卖(normal)或者按批卖(batch)
                batchNumber:this.formValidate.batch_number,//每批数量，当sale_type=batch时生效，范围是1-99999
                price:'23',//价格，单位是美元，精确到小数点后两位，范围是0.01-9999999.00
                packageSize:this.formValidate.package_size_c+'X'+this.formValidate.package_size_k+'X'+this.formValidate.package_size_g,//尺寸，单位是厘米，长宽高范围是1-9999999
                volume:this.formValidate.volume,//体积，单位是立方厘米，范围是1-9999999
                weight:this.formValidate.weight,//重量，单位是kg，精确到小数点后三位，范围是0.01-9999999.000
                minOrderQuantity:'99',//最小起订量，范围是1-99999
                shippingLineTemplateId:this.formValidate.shipping_line_template_id,//运费模板ID
                handlingTime:this.formValidate.handling_time  //备货期，单位是天，范围是1-60
              }
              for(let i= 0;i<this.formValidate.bulk_discount_prices2.length;i++){
                if(this.formValidate.bulk_discount_prices2[i].startQuantity && this.formValidate.bulk_discount_prices2[i].price){
                  arr.push({startQuantity:this.formValidate.bulk_discount_prices2[i].startQuantity,price:this.formValidate.bulk_discount_prices2[i].price})
                }
              }
            }
            this.formValidate.discountPrices = arr;
            if(/[\u4e00-\u9fa5]/.test(UE.getEditor('editorTem').getContent())){
              this.$Notice.warning({
                title: '提示',
                desc: '模板详情不能包含中文字符'
              });
              flag = false;
            }
            if(images.length && flag){
              //获取主图大小并进行判断
              let img = new Image();
              img.src = images[0].imageUrl;
              if(img.width/img.height>1.3 || img.height/img.width>1.3 ){
                this.$Notice.warning({
                  title: '提示',
                  desc: '主图尺寸比例需小于1:1.3或1.3:1（近似正方形）'
                });
              }else if(img.width<350 || img.height<350){
                this.$Notice.warning({
                  title: '提示',
                  desc: '主图需大于350*350像素'
                });
              }else{
                for(let k=0;k<images.length;k++){
                  images[k].imageSequnce=k+1;
                }
                let seoStr = '';
                if(this.seoOption){
                  seoStr = '<div><h2>'+this.formValidate.subject+'</h2><p>'+this.formValidate.subject+'</p><img src="'+images[0].imageUrl+'" ></div>'+UE.getEditor('editorTem').getContent()
                  seoStr = seoStr.replace(/<img/g, '<img alt="'+this.formValidate.subject+'"')
                }else{
                  seoStr = UE.getEditor('editorTem').getContent()
                }

                this.$Spin.show();
                this.api.addProduct.add({
                  reqData:{
                    subject:this.formValidate.subject,//产品名称
                    keywords1:this.formValidate.keywords[0],//------关键词1
                    keywords2:this.formValidate.keywords[1],//------关键词2
                    keywords3:this.formValidate.keywords[2],//------关键词3
                    groupId:this.formValidate.groupId.join(','),//分组ID
                    categoryId:this.$route.params.categoryId,//类目ID
                    proCategory:this.$route.params.proCategory,//------多级类目ID
                    language:'ENGLISH',//语种
                    productType:this.formValidate.product_type,//商品类型
                    market:'main',//发布的市场
                    extraContext:'{}',//补充信息
                    description:seoStr,//描述详情
                    discountPrices:this.formValidate.discountPrices,// 根据数量设置的折扣价.数组
                    proAttributes:JSON.stringify(this.formValidate.fixedAttributes),//商品所有属性.数组
                    attributes:this.formValidate.attributes2,//商品自定义属性
                    images:images,//产品图片，数组
                    sourcingTrad:sourcingTrad,//询盘商品交易信息
                    wholesaleTrade:wholesaleTrade,  //在线批发商品交易信息

                  }
                }).then((res) => {
                  this.$Spin.hide();
                  if(res.data.status==='200'){
                    this.$Notice.success({
                      title: '提示2222',
                      desc: res.data.info
                    });
                    this.$router.push({name:'releaseTask'})
                  }
                })
              }
            }else if(!images.length){
              this.$Notice.warning({
                title: '提示',
                desc: '请上传相关产品图片'
              });
            }
          }
        })
      },
      editProduct(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            let arr = [];
            let arr2 = [];
            for(let i=0;i<this.formValidate.fixedAttributes.length;i++){
              if(this.formValidate.fixedAttributes[i].enName==='Place of Origin'){
                this.formValidate.fixedAttributes[i].valueName=this.formValidate.originCode
              }
            }


            let flag=true;
            if(!this.formValidate.groupId.length){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择产品分组'
              });
              flag = false;
            }
            if(this.formValidate.priceSetting=='single'){
              if(Number(this.formValidate.fob_min_price) && (Number(this.formValidate.fob_min_price) >= Number(this.formValidate.fob_max_price))){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格必须大于最小价格'
                });
                flag = false;
              }else if(Number(this.formValidate.fob_min_price) && Number(this.formValidate.fob_min_price)< 0.0001 || Number(this.formValidate.fob_min_price) >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最小价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(Number(this.formValidate.fob_max_price) && Number(this.formValidate.fob_max_price)< 0.0001 || Number(this.formValidate.fob_max_price) >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_currency){
                this.$Notice.warning({
                  title: '提示',
                  desc: '货币种类不能为空'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_unit_type){
                this.$Notice.warning({
                  title: '提示',
                  desc: '计量单位不能为空'
                });
                flag = false;
              }
            }

            if(this.formValidate.supply_quantity && (!this.formValidate.supply_unit_type || !this.formValidate.supply_period_type)){
              this.$Notice.warning({
                title: '提示',
                desc: '供货能力请同时填写数值和单位'
              });
              flag = false;
            }

            let keywordsLength = 0;
            for(let i=0;i<this.formValidate.keywords.length;i++){
              if(this.formValidate.keywords[i]){
                keywordsLength+=this.formValidate.keywords[i].length;
              }
            }
            if(keywordsLength>255){
              this.$Notice.warning({
                title: '提示',
                desc: '产品关键词长度之和不能超过255'
              });
              flag = false;
            }

            for(let j= 0;j<this.formValidate.attributes.length;j++){
              if((this.formValidate.attributes[j].attributeName && !this.formValidate.attributes[j].valueName) || (!this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName)){
                this.$Notice.warning({
                  title: '提示',
                  desc: '请填写对应的属性名或者属性值'
                });
                flag = false;
              }else if(this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName){
                arr2.push({attributeName:this.formValidate.attributes[j].attributeName,valueName:this.formValidate.attributes[j].valueName,attType:'2'})
              }
            }
            /*if(this.seoOption){
              arr2.push({attributeName:"productName",valueName:this.formValidate.subject,attType:'2'})
            }*/
            this.formValidate.attributes2 = arr2;
            let images = this.handlist;
            //判断是否支持一口价
            let sourcingTrad = null;
            let wholesaleTrade = null;

            //判断是阶梯价格还是价格区间
            let fobCurrency='';
            let fobMinPrice='';
            let fobMaxPrice='';
            let fobUnitType='';
            if(this.formValidate.priceSetting =='section'){
              fobCurrency='USD'
              fobUnitType = this.formValidate.fob_unit_type;
            }else{
              fobCurrency = this.formValidate.fob_currency;
              fobMinPrice= this.formValidate.fob_min_price;
              fobMaxPrice = this.formValidate.fob_max_price;
              fobUnitType = this.formValidate.fob_unit_type;
            }
            if(this.formValidate.product_type === 'sourcing'){
              sourcingTrad = {
                priceSetting:this.formValidate.priceSetting,
                fobCurrency:fobCurrency,//FOB货币种类，枚举值
                fobMinPrice:fobMinPrice,//FOB最小价格
                fobMaxPrice:fobMaxPrice,//FOB最大价格
                fobUnitType:fobUnitType,//FOB计量单位，枚举值
                paymentMethods:this.formValidate.payment_methods.join(','),//付款方式，枚举值，逗号分割
                minOrderQuantity:this.formValidate.min_order_quantity,//最小起订量
                minOrderUnitType:this.formValidate.fob_unit_type,//最小起订量计量单位，枚举值
                supplyQuantity:this.formValidate.supply_quantity,//供货能力
                supplyUnitType:this.formValidate.supply_unit_type,// 供货能力计量单位，枚举值
                supplyPeriodType:this.formValidate.supply_period_type,// 供货能力周期，枚举值
                deliveryPort:this.formValidate.delivery_port,// 发货港口
                deliveryTime:this.formValidate.delivery_time,// 发货期限
                packagingDesc:this.formValidate.packaging_desc//包装信息
              }
              if(this.formValidate.priceSetting==='section'){
                for(let i= 0;i<this.formValidate.bulk_discount_prices.length;i++){
                  let startQuantity = this.formValidate.bulk_discount_prices[i].startQuantity;
                  let price = this.formValidate.bulk_discount_prices[i].price;
                  let startQuantity2 = '';
                  let price2 = '';
                  if(this.formValidate.bulk_discount_prices[i+1]){
                    startQuantity2 = this.formValidate.bulk_discount_prices[i+1].startQuantity;
                    price2 = this.formValidate.bulk_discount_prices[i+1].price;
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
                    if(Number(startQuantity) > 999999999 || Number(startQuantity) < 1 || (Number(startQuantity))%1!==0){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量请输入1-999999999的整数。'
                      });
                      flag = false;
                    }else if(Number(price) > 999999999.9999 || Number(price) < 0.0001){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '价格请输入0.0001-999999999.9999之间的数值。'
                      });
                      flag = false;
                    }else if(startQuantity2 && Number(startQuantity)>Number(startQuantity2)){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量必须是由小到大。'
                      });
                      flag = false;
                    }else if(price2 && Number(price2)>Number(price)){
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
              }
            }else {
              wholesaleTrade = {
                unitType:this.formValidate.unit_type,// 最小计量单位，枚举值
                saleType:this.formValidate.sale_type,//销售方式，按件卖(normal)或者按批卖(batch)
                batchNumber:this.formValidate.batch_number,//每批数量，当sale_type=batch时生效，范围是1-99999
                price:'23',//价格，单位是美元，精确到小数点后两位，范围是0.01-9999999.00
                packageSize:this.formValidate.package_size_c+'X'+this.formValidate.package_size_k+'X'+this.formValidate.package_size_g,//尺寸，单位是厘米，长宽高范围是1-9999999
                volume:this.formValidate.volume,//体积，单位是立方厘米，范围是1-9999999
                weight:this.formValidate.weight,//重量，单位是kg，精确到小数点后三位，范围是0.01-9999999.000
                minOrderQuantity:'99',//最小起订量，范围是1-99999
                shippingLineTemplateId:this.formValidate.shipping_line_template_id,//运费模板ID
                handlingTime:this.formValidate.handling_time  //备货期，单位是天，范围是1-60
              }
              for(let i= 0;i<this.formValidate.bulk_discount_prices2.length;i++){
                if(this.formValidate.bulk_discount_prices2[i].startQuantity && this.formValidate.bulk_discount_prices2[i].price){
                  arr.push({startQuantity:this.formValidate.bulk_discount_prices2[i].startQuantity,price:this.formValidate.bulk_discount_prices2[i].price})
                }
              }
            }
            this.formValidate.discountPrices = arr;
            if(/[\u4e00-\u9fa5]/.test(UE.getEditor('editorTem').getContent())){
              this.$Notice.warning({
                title: '提示',
                desc: '模板详情不能包含中文字符'
              });
              flag = false;
            }
            if(images.length && flag){
              //获取主图大小并进行判断
              let img = new Image();
              img.src = images[0].imageUrl;
              if(img.width/img.height>1.3 || img.height/img.width>1.3 ){
                this.$Notice.warning({
                  title: '提示',
                  desc: '主图尺寸比例需小于1:1.3或1.3:1（近似正方形）'
                });
              }else if(img.width<350 || img.height<350){
                this.$Notice.warning({
                  title: '提示',
                  desc: '主图需大于350*350像素'
                });
              }else{
                for(let k=0;k<images.length;k++){
                  images[k].imageSequnce=k+1;
                }
                this.$Spin.show();
                this.api.productTaskModify.edit({
                  reqData:{
                    proId:this.proId,
                    subject:this.formValidate.subject,//产品名称
                    keywords1:this.formValidate.keywords[0],//------关键词1
                    keywords2:this.formValidate.keywords[1],//------关键词2
                    keywords3:this.formValidate.keywords[2],//------关键词3
                    groupId:this.formValidate.groupId.join(','),//分组ID
                    categoryId:this.categoryId,//类目ID
                    proCategory:this.proCategory,//------多级类目ID
                    language:'ENGLISH',//语种
                    productType:this.formValidate.product_type,//商品类型
                    market:'main',//发布的市场
                    extraContext:'{}',//补充信息
                    description:UE.getEditor('editorTem').getContent(),//描述详情
                    discountPrices:this.formValidate.discountPrices,// 根据数量设置的折扣价.数组
                    proAttributes:JSON.stringify(this.formValidate.fixedAttributes),//商品所有属性.数组
                    attributes:this.formValidate.attributes2,//商品自定义属性
                    images:images,//产品图片，数组
                    sourcingTrad:sourcingTrad,//询盘商品交易信息
                    wholesaleTrade:wholesaleTrade,  //在线批发商品交易信息

                  }
                }).then((res) => {
                  this.$Spin.hide();
                  if(res.data.status==='200'){
                    this.$Notice.success({
                      title: '提示',
                      desc: '修改成功'
                    });
                    this.$router.push({name:'releaseTask'})
                  }
                })
              }
            }else if(!images.length){
              this.$Notice.warning({
                title: '提示',
                desc: '请上传相关产品图片'
              });
            }
          }
        })
      },

      editAliProduct(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            let arr = [];
            let arr2 = [];
            for(let i=0;i<this.formValidate.fixedAttributes.length;i++){
              if(this.formValidate.fixedAttributes[i].enName==='Place of Origin'){
                this.formValidate.fixedAttributes[i].valueName=this.formValidate.originCode
              }
            }


            let flag=true;
            if(!this.formValidate.groupId.length){
              this.$Notice.warning({
                title: '提示',
                desc: '请选择产品分组'
              });
              flag = false;
            }
            if(this.formValidate.priceSetting=='single'){
              if(Number(this.formValidate.fob_min_price) && (Number(this.formValidate.fob_min_price) >= Number(this.formValidate.fob_max_price))){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格必须大于最小价格'
                });
                flag = false;
              }else if(Number(this.formValidate.fob_min_price) && Number(this.formValidate.fob_min_price)< 0.0001 || Number(this.formValidate.fob_min_price) >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最小价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(Number(this.formValidate.fob_max_price) && Number(this.formValidate.fob_max_price)< 0.0001 || Number(this.formValidate.fob_max_price) >999999999.9999){
                this.$Notice.warning({
                  title: '提示',
                  desc: '最大价格请输入0.0001-999999999.9999之间的数字，并精确到小数点后4位'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_currency){
                this.$Notice.warning({
                  title: '提示',
                  desc: '货币种类不能为空'
                });
                flag = false;
              }else if(((this.formValidate.fob_min_price) || (this.formValidate.fob_max_price)) && !this.formValidate.fob_unit_type){
                this.$Notice.warning({
                  title: '提示',
                  desc: '计量单位不能为空'
                });
                flag = false;
              }
            }

            if(this.formValidate.supply_quantity && (!this.formValidate.supply_unit_type || !this.formValidate.supply_period_type)){
              this.$Notice.warning({
                title: '提示',
                desc: '供货能力请同时填写数值和单位'
              });
              flag = false;
            }

            let keywordsLength = 0;
            for(let i=0;i<this.formValidate.keywords.length;i++){
              if(this.formValidate.keywords[i]){
                keywordsLength+=this.formValidate.keywords[i].length;
              }
            }
            if(keywordsLength>255){
              this.$Notice.warning({
                title: '提示',
                desc: '产品关键词长度之和不能超过255'
              });
              flag = false;
            }

            for(let j= 0;j<this.formValidate.attributes.length;j++){
              if((this.formValidate.attributes[j].attributeName && !this.formValidate.attributes[j].valueName) || (!this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName)){
                this.$Notice.warning({
                  title: '提示',
                  desc: '请填写对应的属性名或者属性值'
                });
                flag = false;
              }else if(this.formValidate.attributes[j].attributeName && this.formValidate.attributes[j].valueName){
                arr2.push({attributeName:this.formValidate.attributes[j].attributeName,valueName:this.formValidate.attributes[j].valueName,attType:'2'})
              }
            }
            /*if(this.seoOption){
              arr2.push({attributeName:"productName",valueName:this.formValidate.subject,attType:'2'})
            }*/
            this.formValidate.attributes2 = arr2;
            let images = this.handlist;
            //判断是否支持一口价
            let sourcingTrad = null;
            let wholesaleTrade = null;

            //判断是阶梯价格还是价格区间
            let fobCurrency='';
            let fobMinPrice='';
            let fobMaxPrice='';
            let fobUnitType='';
            if(this.formValidate.priceSetting =='section'){
              fobCurrency='USD'
              fobUnitType = this.formValidate.fob_unit_type;
            }else{
              fobCurrency = this.formValidate.fob_currency;
              fobMinPrice= this.formValidate.fob_min_price;
              fobMaxPrice = this.formValidate.fob_max_price;
              fobUnitType = this.formValidate.fob_unit_type;
            }
            if(this.formValidate.product_type === 'sourcing'){
              sourcingTrad = {
                priceSetting:this.formValidate.priceSetting,
                fobCurrency:fobCurrency,//FOB货币种类，枚举值
                fobMinPrice:fobMinPrice,//FOB最小价格
                fobMaxPrice:fobMaxPrice,//FOB最大价格
                fobUnitType:fobUnitType,//FOB计量单位，枚举值
                paymentMethods:this.formValidate.payment_methods.join(','),//付款方式，枚举值，逗号分割
                minOrderQuantity:this.formValidate.min_order_quantity,//最小起订量
                minOrderUnitType:this.formValidate.fob_unit_type,//最小起订量计量单位，枚举值
                supplyQuantity:this.formValidate.supply_quantity,//供货能力
                supplyUnitType:this.formValidate.supply_unit_type,// 供货能力计量单位，枚举值
                supplyPeriodType:this.formValidate.supply_period_type,// 供货能力周期，枚举值
                deliveryPort:this.formValidate.delivery_port,// 发货港口
                deliveryTime:this.formValidate.delivery_time,// 发货期限
                packagingDesc:this.formValidate.packaging_desc//包装信息
              }
              if(this.formValidate.priceSetting==='section'){
                for(let i= 0;i<this.formValidate.bulk_discount_prices.length;i++){
                  let startQuantity = this.formValidate.bulk_discount_prices[i].startQuantity;
                  let price = this.formValidate.bulk_discount_prices[i].price;
                  let startQuantity2 = '';
                  let price2 = '';
                  if(this.formValidate.bulk_discount_prices[i+1]){
                    startQuantity2 = this.formValidate.bulk_discount_prices[i+1].startQuantity;
                    price2 = this.formValidate.bulk_discount_prices[i+1].price;
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
                    if(Number(startQuantity) > 999999999 || Number(startQuantity) < 1 || (Number(startQuantity))%1!==0){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量请输入1-999999999的整数。'
                      });
                      flag = false;
                    }else if(Number(price) > 999999999.9999 || Number(price) < 0.0001){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '价格请输入0.0001-999999999.9999之间的数值。'
                      });
                      flag = false;
                    }else if(startQuantity2 && Number(startQuantity)>Number(startQuantity2)){
                      this.$Notice.warning({
                        title: '提示',
                        desc: '最小起订量必须是由小到大。'
                      });
                      flag = false;
                    }else if(price2 && Number(price2)>Number(price)){
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
              }
            }
            this.formValidate.discountPrices = arr;
            if(flag){
              this.$Spin.show();
              this.api.updateProduct.edit({
                reqData:{
                  proNumId:this.proNumId,
                  productId:this.productId,
                  proId:this.proId,
                  subject:this.formValidate.subject,//产品名称
                  keywords1:this.formValidate.keywords[0],//------关键词1
                  keywords2:this.formValidate.keywords[1],//------关键词2
                  keywords3:this.formValidate.keywords[2],//------关键词3
                  groupId:this.formValidate.groupId.join(','),//分组ID
                  categoryId:this.categoryId,//类目ID
                  proCategory:this.proCategory,//------多级类目ID
                  language:'ENGLISH',//语种
                  productType:this.formValidate.product_type,//商品类型
                  market:'main',//发布的市场
                  extraContext:'{}',//补充信息
                  description:UE.getEditor('editorTem').getContent(),//描述详情
                  discountPrices:this.formValidate.discountPrices,// 根据数量设置的折扣价.数组
                  proAttributes:JSON.stringify(this.formValidate.fixedAttributes),//商品所有属性.数组
                  attributes:this.formValidate.attributes2,//商品自定义属性
                  images:null,//产品图片，数组
                  sourcingTrad:sourcingTrad,//询盘商品交易信息
                  wholesaleTrade:wholesaleTrade,  //在线批发商品交易信息

                }
              }).then((res) => {
                this.$Spin.hide();
                if(res.data.status==='200'){
                  this.$Notice.success({
                    title: '提示',
                    desc: '修改成功'
                  });
                  this.$router.push({name:'productMan'})
                }else{
                	this.$Notice.error({
					          title: res.data.info,
					        });
                }
              })
            }
          }
        })
      },




      //       假分页
      pagination(pageNo, pageSize, array) {
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
      },
      //       查看图片银行分组
      imgfenzu(){
        if(this.handlist.length < 6){
          this.imgbank=true;
          this.checkAllGroup=[];
          this.api.imgBreath.find().then((res)=>{
            this.modeldata=res.data.rows;
            this.imageId= this.modeldata[this.addimg].photoAlbumGroup.id;
            this.imagetext="SUB_GROUP";
            this.imginit();
          })
        }else {
          this.$Notice.info({
            title:"最多选择6张图片",
          });
        }

      },
      //       切换class
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

      //       查看图片银行分组图片
      imginit(){
        var list;
        if(name){
          list=name;
        }else {
          list="SUB_GROUP";
        }

        if(this.imagetext=="UNGROUP"){
          this.imageId="";
        }

        this.checkAll=false;
        this.checkAllGroup=[];
        this.api.imgPicture.data({reqData:{groupId:this.imageId,packetTypes:this.imagetext,page:this.imagecurrent,limit:this.imagelimit}}).then((res)=>{
          this.blankdata=res.data.rows;
          this.imagetotalCount = res.data.total;
        })
      },
      imginit2(){
        this.checkAll=false;
        this.checkAllGroup=[];
        this.api.imgPicture.del({params:[this.imageId,"UNGROUP"]}).then((res)=>{
          this.imagelist=res.data.rows;
          if(!this.imagelist){
            this.imagelist=[];
            this.blankdata=[];
          }else {
            this.blankdata=this.pagination(this.imagecurrent,this.imagelimit,this.imagelist);
            this.imagetotalCount = Number(this.imagelist.length);
          }
        })
      },
      //       图片银行确认
      imageok(){
        for(var i=0;i<this.checkAllGroup.length;i++){
          if(this.handlist.length<6){
            var listobj={
              imageId:"",
              imageUrl:this.checkAllGroup[i],
              imageSequnce:"",
              imageUsed:""
            };
            this.handlist.push(listobj);
          }else {
            break
          }
        }
        console.log(this.handlist);
        this.checkAllGroup=[];
      },
      imagechangePage(currentPage){
        this.imageoffset = (currentPage-1)*this.imagelimit;
        this.imagecurrent = currentPage;
        this.imginit();
      },
      imageGroupChange(data){
        this.checkAllGroup=data;
        if (data.length === 16) {
          this.checkAll = true;

        } else if (data.length > 0) {
          this.checkAll = false;
        } else {
          this.checkAll = false;
        }
      },

//    本地图片库
      locashow(){
        if(this.handlist.length < 6){
          this.localimg=true;
          this.loctAll=false;
          this.loctalldata=[];
          this.totalCount=0;
          this.current=1;
          this.limit=16;
          this.offset=0;
          this.loctinit();
        }else {
          this.$Notice.info({
            title:"最多选择6张图片",
          });
        }

      },
      loctclass(index){
        this.addloct=index;
        this.totalCount=0;
        this.current=1;
        this.limit=16;
        this.offset=0;
        this.loctId= this.modeloct[this.addloct].wgId;
        this.imagedata();
      },
      loctinit(){
        this.api.group_Lexicon.find().then((res)=>{
          this.modeloct=res.data.rows;
          this.loctId= this.modeloct[this.addloct].wgId;
          this.offset=0;
          this.loctAll = false;
          this.loctalldata=[];
          this.imagedata()
        })
      },
//      分页
      changePage(currentPage){
        this.offset = (currentPage-1)*this.limit;
        this.current = currentPage;
      },
      checkAllGroupChange (data) {
        this.loctalldata=data;
        if (data.length === 16) {
          this.loctAll = true;
        } else if (data.length > 0) {
          this.loctAll = false;
        } else {
          this.loctAll = false;
        }
      },
      //查看上传图片列表
      imagedata(){
        this.api.imageslist.find({reqData:{wgId:this.loctId,imageEdit:this.imagetype,offset:this.offset,limit:this.limit}}).then((res)=>{
          this.imagearr=res.data.rows;
          this.totalCount = Number(res.data.total);
        })
      },

      editor(name){
        this.loctAll = false;
        this.loctalldata=[];
        this.imagetype=name;
        this.totalCount=0;
        this.current=1;
        this.limit=16;
        this.offset=0;

        this.imagedata();
      },
      obtain(){
        this.imagetype="N";
        this.totalCount=0;
        this.current=1;
        this.limit=16;
        this.offset=0;
        this.imagedata()
      },

      locaok(){
        for(var i=0;i<this.loctalldata.length;i++){
          if(this.handlist.length<6){
            var listobj={
              imageId:this.loctalldata[i].split("?")[1],
              imageUrl:this.loctalldata[i].split("?")[0],
              imageSequnce:"",
              imageUsed:"",
            };
            this.handlist.push(listobj);
          }else {
            break
          }
        }
        console.log(this.handlist);
        this.loctalldata=[]
      },



      back(){
        /*this.$router.push({name:'chooseCategory',params:{wordGroupId:0 }})*/
        this.$router.go(-1)
      },

      //查询所有分组信息
      getAllGroups(){
        this.api.getAllGroups.list({
          params:[1]
        }).then((res) => {
          if(res){
            this.formValidate.category = res.data.rows;

            if(this.$route.params.proId){
              this.getfixedAttributes2();
            }
            if(this.$route.params.temId){
              this.getfixedAttributes3()
            }
            if(this.$route.params.aliProId){
              this.getfixedAttributes4()
            }
          }
        })
      },
      //查询运费模版
      getListTemplates(){
        this.api.getListTemplates.list({
          params:[1,100]
        }).then((res) => {
          if(res){
            this.formValidate.templates = res.data.rows;
          }
        })
      },

      //添加自定义属性
      handleAdd () {
        if(this.formValidate.attributes.length<10){
          this.formValidate.attributes.push({
            attributeName:'',//属性名称
            valueName:'', //属性值名称
            index: this.index,
            status: 1
          });
        }else{
          this.$Notice.warning({
            title:'提示',
            desc:'最多只能添加10个自定义属性！'
          })
        }

      },



      //不支持一口价 ——增加价格区间
      addSourcingPriceRange() {
        if(this.formValidate.bulk_discount_prices.length<=3){
          /*this.index2++;*/
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
      //支持一口价 ——增加价格区间
      addWholesalePriceRange () {
        if(this.index3<=3){
          this.index3++;
          this.formValidate.bulk_discount_prices2.push({
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
      //不支持一口价 ——删除价格区间
      removeSourcingPriceRange(index) {
        /*this.index2--;*/
        this.formValidate.bulk_discount_prices[index] = '';
        this.util.removeEmptyArrayEle(this.formValidate.bulk_discount_prices)
      },
      //不支持一口价 ——删除价格区间
      removeWholesalePriceRange(index) {
        this.index3--;
        this.formValidate.bulk_discount_prices2[index].status = 0;
      },

    },
    destroyed() {
      this.tmplateEditer.destroy();
    }
  };
</script>
<style scoped>
  .width_200{
    width: 200px;
  }
  .pic-box img{
    max-width: 100%;
    max-height: 100%;
  }
  .back{
    font-size: 16px;
    display: block;
    padding:0 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #dde3e8;
  }
  .clr{
    clear: both;
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
    color: #2987e2;
  }
  .pic-box{
    margin-top: 10px;
    overflow: hidden;
  }
  .pic-box .item{
    width: 100px;
    height: 100px;
    border:1px solid #d6e0e9;
    text-align: center;
    background-color: #f4f4f4;
    padding-top: 23px;
    margin-right: 10px;
    float: left;
    position: relative;
  }
  .pic-box>div:nth-child(1) .item{
    background:#f4f4f4 url("../../common/images/photo-cover.png") no-repeat;

  }
  .con {
    height: calc(100% - 57px);
    overflow: auto;
    padding: 0 30px;
  }
  .con>.item {
    padding-top: 30px;
    border-bottom: 1px solid #dde3e8;
  }
  .con .item .tit {
    font-size: 18px;
    color: #444444;
    position: relative;
    padding-left: 15px;
  }
  .con .item .tit:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 0;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #ff8829;
  }
  .con .item .extra {
    padding: 20px;
    font-size: 14px;
    color: #444444;
  }
  .priceSetting-box{
    width: 80%;
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


  .imgbox{
    width: 100px;
    height: 135px;
    float: left;
    margin-right: 15px;
  }
  .imgbox span{
    display: inline-block;
    height: 35px;
    width:100%;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    color:#00a1ff;
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
  #modelconten,#modelconten2{
    height:500px;
  }
  #modelconten>div, #modelconten>div>div,#modelconten2>div, #modelconten2>div>div{
    height:100%;
  }
  #modelconten .head,#modelconten2 .head{
    height:10%;
  }
  .quanxuan{
    height:5%;
  }
  .quancar{
    height:95%;
  }

  .imgblank .color_blue{
    color: #0076e8;
  }
  .imgblank{
    height:90%;
    text-align: center;
    overflow-y: auto;
    border: 1px solid #dde3e8;
    padding-left: 8px;
  }
  .imgblank>li{
    padding:5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .imgblank>li:last-child{
    border-bottom:none;
  }
  .boxcar{
    position: relative;
    width:24%;
    margin-right:1%;
    height:24%;
    margin-bottom:1%;
    float: left;
  }

  .inputing{
    width:100%;
    height:100%;
  }
  .inputchex{
    position: relative;
    width:100%;
    height: 100%;
  }

  .inputchex span:first-child{
    position: absolute;
    top: 0;
    right: 14px;
    z-index: 1000;
  }

  .divhei{
    height:45px;
    line-height:45px;
  }
  .divhei button{
    margin:0 30px;
    text-align: center;
  }
  .imgdeg>span,.imgdeg2>span{
    transform:rotate(90deg);
    display: inline-block;
  }
  .template-wrap{
    margin-left: 20px;
    border:1px solid #DDDDDD;
  }
  .template-title{
    background: #ebf0f5;
    padding: 13px 15px;
  }
  .template-box{
    padding: 15px;
  }
  .nav-list {
    list-style: none;
    color: #7994ae;
    float: left;
    margin-right: 36px;
    margin-bottom: 12px;
  }
  .nav-list.active{
    color: #000000;
  }
  .template-list {
    width: 25%;
    float: left;
    padding: 0 15px 15px 0;
    position: relative;
  }
  .template-list img {
    width: 100%;
    height: 150px;
    border: 1px solid #d9e3ed;
  }
  .template-list .add {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 15px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #FFFFFF;
    font-size: 16px;
    background: rgba(0, 123, 241, 0.5);
  }
</style>
<style scope>
	.ivu-form-item-content{
		position: static !important;
	}
</style>