<template>
    <div style="z-index: 9999999999999999">
      <Modal v-model="show" title="预览" width="1000" class-name="small-btn-box vertical-center-modal" @on-cancel="cancel">
        <div v-html="con" style="height: 650px;overflow: auto"></div>
        <div slot="footer"></div>
      </Modal>
    </div>
</template>

<script>
    export default {
      props:["showPriview","con"],

      data(){
        return {
          show:this.showPriview
        }
      },
      watch:{
        showPriview(val){
          this.show=val
        }
      },
      methods:{
        cancel(){
          this.$emit("hidePreview")
        }
      }
    }
</script>

<style scoped>

</style>
