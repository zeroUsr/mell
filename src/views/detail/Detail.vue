<template lang="">
  <div id="detail">
    <!-- 顶部导航条 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :top-image="topImage" />
      <!-- 商品基本信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品图片 -->
      <detail-goods-info :detail-info="detailInfo" @GoodsImageLoad="GoodsImageLoad" />
      <!-- 商品参数 -->
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <!-- 用户评论 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <!-- 推荐信息 -->
      <goods-list ref="recommends" :goods="recommends" />
    </scroll>
    <!-- 底部导航条 -->
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
  import DetailNavBar from './childerComps/DetailNavBar'
  import DetailSwiper from './childerComps/DetailSwiper'
  import DetailBaseInfo from './childerComps/DetailBaseInfo'
  import DetailShopInfo from './childerComps/DetailShopInfo'
  import DetailGoodsInfo from './childerComps/DetailGoodsInfo'
  import DetailParamInfo from './childerComps/DetailParamInfo'
  import DetailCommentInfo from './childerComps/DetailCommentInfo'
  import DetailBottomBar from './childerComps/DetailBottomBar'

  import Scroll from 'components/content/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommend } from 'network/detail'

  import { debounce } from 'common/utils'
  import { itemListerMixin, backTopMixin } from 'common/mixin'

  import { ADD_TO_CART } from 'store/mutation-type'

  import { mapActions } from 'vuex'

  export default {
    name: 'Detail',
    mixins: [itemListerMixin, backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themesTopY: [],
        getThemesTopY: null,
        currentIndex: 0,
        position: null
      }
    },
    created() {
      // 使用 params 参数传递 
      // this.iid = this.$route.params.iid

      // 使用 query 参数传递
      this.iid = this.$route.query.iid

      getDetail(this.iid).then(res => {
        const data = res.result
        // 获取轮播图数据
        this.topImage = data.itemInfo.topImages

        // 获取商品基本数据
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

        // 获取商家数据
        this.shop = new Shop(data.shopInfo)

        // 获取图片数据
        this.detailInfo = data.detailInfo

        // 获取商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // console.log(data);
      })

      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      // $nextTick() 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      /* this.$nextTick(() => {
        this.themesTopY = []
        this.themesTopY.push(0)
        this.themesTopY.push(this.$refs.param.$el.offsetTop - 44)
        this.themesTopY.push(this.$refs.comment.$el.offsetTop - 44)
        this.themesTopY.push(this.$refs.recommends.$el.offsetTop - 44)
        console.log(this.themesTopY);
      }) */

      this.getThemesTopY = debounce(() => {
        this.themesTopY = []
        this.themesTopY.push(0)
        this.themesTopY.push(this.$refs.param.$el.offsetTop - 44)
        this.themesTopY.push(this.$refs.comment.$el.offsetTop - 44)
        this.themesTopY.push(this.$refs.recommends.$el.offsetTop - 44)
        // 在最后 push 一个最大值
        this.themesTopY.push(Number.MAX_VALUE)

        // console.log(this.themesTopY);
      })
    },
    mounted() {
      // console.log("detail内容");
    },
    destroyed() {
      this.$bus.$off('ItemImageLoad', this.ItemImageLoad)
    },
    methods: {
      GoodsImageLoad() {
        // 监听图片加载刷新 scrollHeight
        this.ItemImageLoad()

        // 监听图片加载获取相应组件的 offsetTop
        this.getThemesTopY()

        this.position && this.contentScroll(this.position)
      },
      titleClick(index) {
        // 点击导航滑动到相应的位置
        this.$refs.scroll.scrollTo(0, -this.themesTopY[index], 100)
      },
      contentScroll(position) {
        this.position = position
        const positionY = -position.y
        // console.log(position);
        // 普通做法
        /* for(let i in this.themesTopY) {
          i = parseInt(i)
          if(this.currentIndex !== i && ((i < this.themesTopY.length - 1 && (positionY >= this.themesTopY[i] && positionY < this.themesTopY[i + 1])) || (i === this.themesTopY.length - 1 && positionY > this.themesTopY[i]))) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        } */

        // hack做法 为 this.themesTopY.push(Number.MAX_VALUE)
        for (let i = 0; i < this.themesTopY.length - 1; i++) {
          if ((this.currentIndex !== i) && positionY >= this.themesTopY[i] && positionY < this.themesTopY[i + 1]) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 是否显示回到顶部按钮
        this.isShowBackTop = -position.y > 1000
      },
      // 将 vuex 的 actions 方法映射到 methods里
      ...mapActions({
        addCart: 'add_to_cart'
      }),
      // 添加到购物车
      addToCart() {
        const product = {}
        product.image = this.topImage[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realprice
        product.iid = this.iid

        // this.$store.commit('addCart', product)
        /* this.$store.dispatch('add_to_cart', product).then(res => {
          console.log(res)
        }) */
        this.addCart(product).then(res => {
          // 使用自定义的 $toast 组件
          this.$toast.show(res, 2000)
        })
      }
    }
  }
</script>
<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>