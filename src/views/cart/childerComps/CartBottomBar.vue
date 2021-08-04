<template lang="">
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isCheckAll" @click.native="checkAll"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：￥{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去结算（{{checkLength}}）
    </div>

  </div>
</template>
<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList
        .filter(item => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
        .toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isCheckAll() {
        if(this.cartList.length ===0) return false

        // return !(this.cartList.filter(item => !item.checked).length)
        // return !this.cartList.find(item => !item.checked)
        return this.cartList.every(item => item.checked)
      }
    },
    methods: {
      checkAll() {
        // if(this.cartList.filter(item => item.checked).length !== this.cartList.length) {
          if(!this.isCheckAll) {
          this.cartList.map(item => item.checked = true)
        } else {
          this.cartList.map(item => item.checked = false)
        }
      },
      calcClick() {
        if(!this.checkLength) {
          this.$toast.show('请选择购买的商品')
        }
      }
    }
  }
</script>
<style scoped>
  .bottom-bar {
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 14px;
    display: flex;
  }

  .check-content {
    display: flex;
    width: 60px;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    flex: 1;
  }

  .calculate {
    width: 100px;
    background-color: var(--color-tint);
  }
</style>