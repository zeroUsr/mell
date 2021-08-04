<template lang="">
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control class="tab-contro" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1"
      v-show="isTabShow" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
      @pullingUp="loadMose">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- native 允许组件监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childerComps/HomeSwiper'
  import RecommendView from './childerComps/RecommendView'
  import FeatureView from './childerComps/FeatureView'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/content/scroll/Scroll'
  // import BackTop from 'components/content/backtop/BackTop'

  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils'
  import { itemListerMixin, backTopMixin } from 'common/mixin'

  export default {
    name: 'Home',
    // 使用 mixin(混入) 插入内容
    mixins: [itemListerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            list: [],
            page: 0
          },
          'new': {
            list: [],
            page: 0
          },
          'sell': {
            list: [],
            page: 0
          }
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tabOffsetTop: 0,
        isTabShow: false,
        saveY: 0
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop
    },
    created() {
      // 请求多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // console.log("home内容");
    },
    // 组件处于活跃时触发
    activated() {
      // 将其重新刷新一遍
      this.$refs.scroll.refresh()

      // 重新监听图片的加载
      this.$bus.$on('ItemImageLoad', this.ItemImageLoad)
      // 进入时将位置设置为退出时的位置
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    // 组件处于不活跃时触发
    deactivated() {
      // 退出时记录位置
      this.saveY = this.$refs.scroll.getScrollY()

      this.$bus.$off('ItemImageLoad', this.ItemImageLoad)
    },
    computed: {
      showGoods() {
        // 将商品列表返回
        return this.goods[this.currentType].list
      }
    },
    methods: {
      tabClick(index) {
        // 记录当前点击的 tabControl
        this.currentType = index == 0 ? 'pop' : index == 1 ? 'new' : 'sell';
        // 将点击的 tabControl 同步
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      /* backClick() {
        // 回到顶部
        this.$refs.scroll.scrollTo(0, 0, 500)
      }, */
      contentScroll(position) {
        // 当滑动距离大于 1000 时显示
        this.isShowBackTop = -position.y > 1000

        // 判断 tabContro 是否显示
        this.isTabShow = -position.y >= this.tabOffsetTop
      },
      loadMose() {
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.refresh()
      },
      // 防抖函数的封装
      /* debounce(func, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      }, */
      swiperImageLoad() {
        // 所有组件都有一个 $el 属性，用于获取组件中的元素
        // 获取元素的 offsetTop
        // console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /* 
        网络请求数据
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1

        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 结束上拉加载行为。
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>
<style scoped>
  #home {
    height: 100vh;
    overflow: hidden;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .tab-contro {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>