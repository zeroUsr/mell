<template lang="">
  <div class="cart">
    <!-- 导航条 -->
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{cartLength}})</div> -->
      <div slot="center">购物车({{Length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list class="cart-list"></cart-list>

    <!-- 结算 -->
    <cart-bottom-bar/>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childerComps/CartList'
  import CartBottomBar from './childerComps/CartBottomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 用法一
      // ...mapGetters(['cartLength'])

      // 用法二
      ...mapGetters({
        Length: 'cartLength',
        cartList: 'cartList'
      })
    }
  }
</script>
<style scoped>
  .cart {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .cart-list {
    overflow: hidden;
  }
</style>