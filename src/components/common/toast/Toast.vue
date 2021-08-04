<template lang="">
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>
<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = "默认文字", duration = 2000) {
        this.message = message
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
        }, duration)
      }
    }
  }
</script>
<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    padding: 8px 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, .8);
  }
</style>