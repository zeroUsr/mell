<template lang="">
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImage" :key="item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>
<script>
  import { Swiper, SwiperItem } from 'components/swiper'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImage: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden; 
  }
</style>