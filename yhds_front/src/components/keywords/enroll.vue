<template>
    <div class="full-height">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/keywords">关键字采集</Breadcrumb-item>
        <Breadcrumb-item>手动导入关键词</Breadcrumb-item>
      </Breadcrumb>
      <div class="main">
        <div class="inpumag">
          <Input v-model="value" type="textarea" :autosize="{minRows:18,maxRows:18}" placeholder="关键词格式：每行输入一个关键词，以回车键分隔" style="min-width: 100%"></Input>
          <!--<Button :loading="loading" type="primary" long class="btnmag" @click="sumit()">导入到词库</Button>-->
          <Button :loading="loading" type="primary" long class="btnmag" @click="distribution_show()">导入到词库</Button>
        </div>
      </div>
      
      <!--词库分配模态框-->
      <Modal
        ref="distribution"
        v-model="distribution"
        title="分配词库关键词"
        :styles="{top:'40px'}"
        width="420px"
        @on-ok="distribution_ok"
      >
        <div class="mode-conten">
          <RadioGroup v-model="keyAnimal" vertical :loading="keyGroupLoading" id="group">
            <Radio :label="item.wgId" v-for="item in groulist" :key="item.wgId" class="inupuradio">
              <span>{{item.wgName}}</span>
            </Radio>
          </RadioGroup>
        </div>
      </Modal>
      
    </div>
</template>

<script>
    export default {

        data () {
            return {
                value:"",
                loading:false,
                
                keyGroupLoading:false,
		        groulist:[],
		        keyAnimal:'',
		        textareavalue:'',
		        distribution:false,
                
            }
        },
        methods: {
            sumit(){
              console.log(this.value);
              var temp = this.value.split(/[\n,]/g);
              for(var i =0;i<temp.length;i++){
                if(temp[i] == ""){
                  temp.splice(i, 1);
                  //删除数组索引位置应保持不变
                  i--;
                }
              }
              console.log(temp+"zzz");
              var test=1
              for(var i=0;i<temp.length;i++){
                if(temp[i].match(/^\s+$/)){
                  test=2
                }

              }
              if(test==2||temp==""){
                this.$Notice.error({
                  title: "请输入关键词或关键词不能为空",
                });
              }else {
                temp=temp.join(",");
                console.log(temp);
                this.loading=true;

                this.api.group_importKeywords.find({reqData:{keywords:temp}}).then((res)=>{
                  this.loading=false;

                  if(res.data.info=="导入成功"){
                    this.$Notice.success({
                      title: '导入成功',
                    });
                    this.value="";
                  }
                })
              }
            },
            
		            //          词库表加载分组列表
		      thesaurus_init(){
		        this.keyGroupLoading =true;
		        this.api.group_Lexicon.find().then((res)=>{
		          console.log(res);
		          this.groulist=res.data.rows;
		          this.keyGroupLoading =false;
		        })
		      },
		      //          词库表分配所需方法
		      distribution_show(){
		        this.keyAnimal='';
		//            this.radiaoval='';
		        if(this.value!=''){
		          this.distribution=true;
		          this.thesaurus_init();
		        }else {
		          this.$Notice.error({
	                title: "请输入关键词或关键词不能为空",
	              });
		        }
		      },
		      //分配词库
		      distribution_ok(){
		      	    console.log(this.value);
		            var temp = this.value.split(/[\n,]/g);
		            for(var i =0;i<temp.length;i++){
		              if(temp[i] == ""){
		                temp.splice(i, 1);
		                //删除数组索引位置应保持不变
		                i--;
		              }
		            }
		            console.log(temp+"zzz");
		            var test=1
		            for(var i=0;i<temp.length;i++){
		              if(temp[i].match(/^\s+$/)){
		                test=2
		              }
		
		            }
		
		            if(!this.keyAnimal){
			            this.$Notice.info({
			              title: '请选择分组',
			            });
			            this.$refs.distribution.visible = true;
			            this.distribution=true
		            }else {
		              temp=temp.join(",");
		              console.log(temp);
		              this.api.group_batchAddKeywords.find({reqData:{keywords:temp,wgId:this.keyAnimal}}).then((res)=>{
		                console.log(res);
		                if(res.data.info=="添加成功"){
		                  this.$Notice.success({
		                    title: '添加成功',
		                  });
		                }
		
		              })
		            }
		      },
            
        },
    }
</script>
<style scoped>

.btnmag{
  margin-top:25px;
  width:20%;
  padding:12px 0;

}
.inpumag{

  text-align: right;
}

</style>
