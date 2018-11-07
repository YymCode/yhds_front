<template>
    <div style="z-index: 9999999999999999">
      <Modal v-model="show" title="预览" width="1000" class-name="small-btn-box vertical-center-modal" @on-cancel="cancel">
        <div class="box">
          <Row>
            <Col span="6">
              <ul class="nav">
                <li class="nav-list">产品标题</li>
                <li class="nav-list" :class="{active:activeIndex==index}" v-for="(item,index) in list" @click="changeSubject(item.description2,index)">{{item.subject}}</li>
              </ul>
            </Col>
            <Col span="18">
              <div class="con" v-html="initCon"></div>
            </Col>
          </Row>
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
</template>

<script>
    export default {
      props:["showPriview","list"],

      data(){
        return {
          activeIndex:0,
          show:this.showPriview,
          tmplateEditer:null,
          initCon:''
        }
      },
      watch:{
        showPriview(val){
          this.show=val;
          /*this.activeIndex=0;*/
        },
        list:{
          handler:function(newValue,oldValue){
            if(newValue.length){
              this.initCon=newValue[0].description2;
            }
          },
          deep:true,
        },
      },
      methods:{
        cancel(){
          this.$emit("hidePreview")
        },
        changeSubject(con,index){
          if(con){
            this.initCon=con;
          }
          this.activeIndex=index;
        }
      }
    }
</script>

<style scoped>
  .box{
    height: 800px;
  }
  .ivu-row,.ivu-row>div,.nav,.con{
    height: 100%;
  }
  .nav{
    overflow: auto;
    border: 1px solid #DDDDDD;
  }
  .nav-list{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #DDDDDD;
    text-align: center;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
     -webkit-box-orient:vertical;
     -webkit-line-clamp:2;
  }
  .nav-list:nth-of-type(1){
    background: #ebf0f5;
    line-height: 50px;
    padding-top: 0;
  }
  .nav-list.active{
    color: #2d8cf0;
  }
  .con{
    border: 1px solid #DDDDDD;
    margin-left: 20px;
    overflow: auto;
  }
</style>
