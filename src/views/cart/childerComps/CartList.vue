<template lang="">
    <scroll ref="scroll" class="content">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo="item"/>
    </scroll>
</template>
<script>
  import Scroll from 'components/content/scroll/Scroll'

  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>
<style scoped>
  .content {
    height: calc(100% - 49px - 44px - 40px)
  }
</style>