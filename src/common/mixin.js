import { debounce } from './utils'
import BackTop from 'components/content/backtop/BackTop'

// 包装一个 mixin
export const itemListerMixin = {
  data() {
    ItemImageLoad: null
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    this.ItemImageLoad = () => {
      // this.$refs.scroll && this.$refs.scroll.refresh()
      refresh()
    }
    // 事件总线的接收   this.$bus.$on('事件名', () => {})
    this.$bus.$on('ItemImageLoad', this.ItemImageLoad)
  },
}

// 回到顶部的 mixin
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      // 回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  }
}
