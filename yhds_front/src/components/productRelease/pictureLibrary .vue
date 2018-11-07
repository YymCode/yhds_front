<template>
  <div class="full-height">
    <Breadcrumb separator=">">
      <Breadcrumb-item href="/productRelease">产品发布</Breadcrumb-item>
      <Breadcrumb-item>图片库</Breadcrumb-item>
    </Breadcrumb>
    <div class="main">
      <Row class="sidebar">
        <Col span="4" class="sidebar">
        <div class="head">分组名字</div>
        <ul class="group sidebarx">
          <li :class="{color_blue:index==addstyle}" v-for="(item,index) in styledata"  @click="addclass(index)">{{item.wgName}}</li>
        </ul>
        </Col>

        <Col span="19" offset="1" id="col-100">
        <Row id="headimg">
          <Button type="primary" shape="circle" class="my-btn" @click="localimage">本地图片</Button>
          <Button type="primary" shape="circle" class="my-btn" @click="imgfenzu">从图片银行选取</Button>
          <!--<Button type="warning" shape="circle" class="my-btn" @click="borderhod()">边框上传</Button>-->
          <span class="img-tiele">单张不超过3M，支持jpeg,jpg,png;<br>建议图片大小640*640,主题鲜明、图片清晰;</span>
          <div class="img-float">
            <Button type="primary" shape="circle" class="my-btn" @click="imgeditor()">编辑图片</Button>
            <Button type="primary" shape="circle" class="my-btn" @click="modalimg()">分配</Button>
            <Button type="warning" shape="circle" class="my-btn" @click="deleimg()">删除</Button>
          </div>
        </Row>
        <!--上传图片展示和编辑图片展示-->
        <Row id="col-10">
          <Col span="12" class="colhei" style="padding-right:5px">
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
            <div v-for="(item,index) in imagearr" class="boxdiv" >
              <Checkbox :label="item.imageId+'?'+item.imageUrl" class="inputchex" >
                <Card  style="height: 100%">
                  <div style="height: 100%">
                    <img :src="item.imageUrl" class="inputing">
                    <!--<h3>A high quality UI</h3>-->
                  </div>
                </Card>
              </Checkbox>
            </div>
          </CheckboxGroup>
          <Page id="page" v-if="totalCount>0"  :total="totalCount" :current="current"  show-elevator  :page-size="limit"   @on-change="changePage"></Page>

          </Col>
          <Col span="12" class="colhei" style="padding-left:5px">
          <div >
            <span>图片编辑</span>
            <Checkbox
              :indeterminate="indeterminate_two"
              :value="checkAll_two"
              @click.prevent.native="handleCheckAll_two">全选
            </Checkbox>
          </div>
          <CheckboxGroup v-model="checkAllGroup_two"  @on-change="checkAllGroupChange_two">
            <div v-for="(item,index) in imagepull" class="boxdiv">
              <Checkbox :label="item.imageId+'?'+item.imageUrl"  class="inputchex" >
                <Card  style="height: 100%">
                  <div style="height: 100%">
                    <img :src="item.imageUrl+'?id='+numid" class="inputing">
                    <!--<h3>A high quality UI</h3>-->
                  </div>
                </Card>
              </Checkbox>
            </div>

          </CheckboxGroup>
          <Page  id="page2" v-if="page_totalCount>0"  :total="page_totalCount" :current="page_current"  show-elevator   :page-size="page_limit"   @on-change="changePage_2"  ></Page>
          </Col>
        </Row>

        </Col>
      </Row>
    </div>

    <!--分配图片模态框-->
    <Modal
      v-model="modalpull"
      title="请选着您要分配的组"
      @on-ok="pullok"
      :styles="{top: '40px'}"
    >
      <div style="max-height:500px;overflow-y: auto">
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
          <Col span="17" offset="1" :loading="imgLoading" v-if="blankdata.length>0">
            <div class="quanxuan">
              <Checkbox
                :indeterminate="imgbankminate"
                :value="imgbankkAll"
                @click.prevent.native="imgbankCheckAll">全选
              </Checkbox>
            </div>
            <CheckboxGroup class="quancar"  v-model="imgalldata"  @on-change="imageGroupChange" >
              <div  class="boxcar" v-for="(item,index) in blankdata">
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

          <Col span="17" offset="1" v-else style="text-align: center; padding-top: 50px">
              此分组下暂无图片
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
         :max-size="5120"
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
                :max-size="5120"
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
              <img :src="borderframeUrl" alt="" style="max-width: 100%">
            </div>

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

    <!--边框上传-->
    <Modal
      v-model="bordermodal1"
      title="边框上传"
      @on-ok="borderok"
      :styles="{top:'60px'}"
      >
      <div style="text-align: center">

        <Upload
          ref="uploadborder"
          multiple
          :action="aurl+'/alibaba/frame/doFileUpload'"
          accept="image/png"
          :max-size="5120"
          :on-success="borderSuccess"
          :before-upload="borderUpload"
          :on-error="bordererror"
          :on-exceeded-size="borderMaxSize"
          :on-remove="borderremove"
        >
          <Button type="ghost" icon="ios-cloud-upload-outline">选择边框</Button>
        </Upload>

      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        numid:"",
        aurl:process.env.API_ROOT,
//          logo上传
          logourl:"",
//          边框上传
        bordershow:[],
        bordermodal1:false,
        borderlist:[],
        bordersize:[],
        borderstyle:'',
        borderframeUrl:'',

        borderid:"",
//          边框分页
        borderCount:0,
        bordercurrent:1,
        borderlimit:15,
        borderoffset:0,

       //图片上传
        imgupload:false,
        ploadlist:[],
        ploadsize:[],

//          图片银行
        imgLoading:false,

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
        totalCount:0,
        current:1,
        limit:16,
        offset:0,

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
        imgclick:1

      }
    },
    mounted() {
      this.init();
    },
    methods:{

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
          title:"上传图片超过5M",
        });
      },
//        边框查询
      borderinit(){
          this.api.border_showList.find({reqData:{offset:this.borderoffset,limit:this.borderlimit}}).then((res)=>{
            if(res.data.status=="200"){
                this.bordershow=res.data.rows;
                this.borderCount = Number(res.data.total);
            }
          });
        },
      borderclass(index,url,itemid){
      this.borderframeUrl=url;
      this.borderstyle=index;
      this.borderid=itemid;

    },
        //  边框上传
      borderhod(){
        this.bordermodal1=true;
        this.borderlist=[];
        this.bordersize=[];
        this.$refs.uploadborder.clearFiles();
      },
      borderok(){
        var list=[];
        for(var i=0;i<this.borderlist.length;i++){
          var sezi={
            frameUrl:this.borderlist[i],
            frameSize:this.bordersize[i]
          };
          list.push(sezi)
        }
        if(!list.length=="0"){
          this.api.border_saveFrame.find({reqData:list}).then((res)=>{
            if(res.data.info=="添加成功"){
//            this.borderlist=[];
//            this.bordersize=[];
//            this.$refs.uploadborder.clearFiles();
              this.$Notice.success({
                title: '添加成功',
              });
            }
          });
        }else {
          this.$Notice.info({
            title:"请添加图片",
          });
        }
      },
      borderSuccess(res,file){
        console.log(res);
        console.log(file);
        if(res.status=="200"){
          this.borderlist.push(res.rows[1]);
          this.bordersize.push(res.rows[0]);
        }else {
          this.$Notice.error({
            title: res.info,
            desc:"错误代码"+res.MDC
          });
        }
      },
      borderUpload(file){
        console.log(file);
      },
      bordererror(){
        this.$Notice.success({
          title: file.name+'上传失败',
        });
      },
      borderMaxSize(){
        this.$Notice.warning({
          title:file.name+"超过5M",
        });
      },
      borderremove(){
        console.log(file);
        console.log(fileList);
        console.log("删除");
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
      checkAllGroupChange (data) {
        this.checkAllGroup=data;
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
      checkAllGroupChange_two(data){
        this.checkAllGroup_two=data;
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
        this.api.imageslist.find({reqData:{wgId:this.deleId,imageEdit:"N",offset:this.offset,limit:this.limit}}).then((res)=>{
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
          this.totalCount = Number(res.data.total);
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
        })
      },
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
        this.borderstyle="";
        this.logourl="";
        this.borderframeUrl="";
        this.borderid="";
        var deler=this. checkAllGroup.concat(this.checkAllGroup_two);

        this.preview=deler.length;
        console.log(deler);
        if(deler.length!=0){
          this.editor=true;
          this.borderinit();
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
        if(this.logourl!='' || this.borderframeUrl!=''){
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
          title:file.name+"超过5M",
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
            }
          })
        }else {
          this.$Notice.info({
            title: '请添加图片',
          });
        }
      },
    },
    watch:{
      offset(){
        this.imagedata();
      },
      page_offset(){
        this.imagedata_page();
      },

      borderoffset(){
        this.borderinit();
      }
    }
  };
</script>
<style scope>
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
  #headimg{
    height: 37px;
    margin-bottom: 3px;
  }
  #col-100{

    height:calc(100% - 40px);
  }

  .boxdiv{
    position: relative;
    width:25%;
    height:25%;
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
  .colhei>div:first-child{
    height:6%;
    background: #ebf0f5;
    display: flex;
    align-items: center;
    padding:0 15px;
    justify-content: space-between;
  }
  .colhei>div:nth-child(2){
    height:86%;
    padding:8px;
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
</style>
