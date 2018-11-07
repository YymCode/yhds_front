<template>
    <div>
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

    </div>
</template>

<script>
    export default {
      data () {
        return {
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

          handlist:[],
        }
      },
      mounted(){
//         this.imgfenzu();
      },
      methods: {
        msgBank(){
            this.imgfenzu();
        },

        imgfenzu(){
          this.imgbank=true;
          this.checkAllGroup=[];
          this.api.imgBreath.find().then((res)=>{
            this.modeldata=res.data.rows;
            this.imageId= this.modeldata[this.addimg].photoAlbumGroup.id;
            this.imagetext="SUB_GROUP";
            this.imginit();
          })

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

          this.checkAll=false;
          this.checkAllGroup=[];
          this.api.imgPicture.data({reqData:{groupId:this.imageId,packetTypes:this.imagetext,page:this.imagecurrent,limit:this.imagelimit}}).then((res)=>{
            this.blankdata=res.data.rows;
            this.imagetotalCount = res.data.total;
          })
        },
        //       图片银行确认
        imageok(){
          this.handlist=[];
          for(var i=0;i<this.checkAllGroup.length;i++){
//
//            var listobj={
//              imageId:"",
//              imageUrl:this.checkAllGroup[i],
//              imageSequnce:""
//            };
            this.handlist.push(this.checkAllGroup[i]);

          }
          console.log(this.handlist);

          this.$emit("imgBank",this.handlist);
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
      }
    }
</script>
<style scoped>
  #modelconten,#modelconten2{
    height:500px;
  }
  #modelconten>div, #modelconten>div>div,#modelconten2>div, #modelconten2>div>div{
    height:100%;
  }
  #modelconten .head,#modelconten2 .head{
    height:10%;
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

  .color_blue{
    color: #2987e2;
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
  .imgdeg>span,.imgdeg2>span{
    transform:rotate(90deg);
    display: inline-block;
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
  #modelconten .color_blue>ul>li{
    color: #495060;
  }
  ul>li{
    cursor: pointer;
  }
</style>
