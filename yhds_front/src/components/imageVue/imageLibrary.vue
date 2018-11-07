<template>
    <div>
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
                <li :class="{color_blue:index==addloct}" v-for="(item,index) in modeloct" @click="loctclass(index)" style="cursor: pointer">{{item.wgName}}</li>
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
    </div>
</template>

<script>
    export default {
      data () {
        return {
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
        }
      },
      mounted(){
//          this.locashow();
      },
      methods: {
        MsgLibrary(){
            this.locashow();
        },

        locashow(){
          this.localimg=true;
          this.loctAll=false;
          this.loctalldata=[];
          this.totalCount=0;
          this.current=1;
          this.limit=16;
          this.offset=0;
          this.loctinit();
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
          this.imagedata()
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
          this.handlist=[];
          this.api.imageslist.find({reqData:{wgId:this.loctId,imageEdit:this.modeditor,offset:this.offset,limit:this.limit}}).then((res)=>{
            this.imagearr=res.data.rows;
            this.totalCount = Number(res.data.total);
          })
        },
        editor(){
          this.loctAll = false;
          this.loctalldata=[];
          this.totalCount=0;
          this.current=1;
          this.limit=16;
          this.offset=0;

          this.imagedata();
        },
        locaok(){
          for(var i=0;i<this.loctalldata.length;i++){
//            var listobj={
//              imageId:this.loctalldata[i].split("?")[1],
//              imageUrl:this.loctalldata[i].split("?")[0],
//              imageSequnce:""
//            };
            this.handlist.push(this.loctalldata[i].split("?")[0]);
          }
          //        向父组件传参
          this.$emit("imgLib",this.handlist);
          this.handlist=[];
          this.loctalldata=[]
        },
      }
    }
</script>
<style scoped>
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
  .color_blue{
    color: #2987e2;
  }
  .quancar{
    height:95%;
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
    top: 0;
    right: 14px;
    z-index: 1000;
  }

  .inputing{
    width:100%;
    height:100%;
  }
</style>
