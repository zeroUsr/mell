<template lang="">
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          // 允许浏览器原生 click 事件
          click: true,

          // 是否允许监听实时滚动
          probeType: this.probeType,

          // 是否循序多次上拉加载
          pullUpLoad: this.pullUpLoad
        })

        // 当距离滚动到底部时触发此事件
        if(this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
        }

        // 实时监听滑动距离
        if(this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
        }

    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        // 重新计算 BetterScroll的 scrollHeight 属性
        this.scroll && this.scroll.refresh()
        console.log('-------');
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>
<style scoped>

</style>