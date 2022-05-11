<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad ="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommend"></goods-list>

            <!-- <div>{{$store.state.cartList.length}}</div> -->
            <ul>
                <li v-for="item in $store.state.cartList" :key="item.id">{{item}}</li>
            </ul>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

        <!-- <toast :message="message" :show="isShow"></toast> -->


        <!-- <div v-for="item in 10" :key="item">{{item}}</div> -->
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from '../../components/common/scroll/Scroll.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
// import Toast from '../../components/common/toast/Toast.vue'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail.js'
import {debounce} from '../../common/utils'
import {itemListenerMixin} from '../../common/mixin'

import { mapActions } from 'vuex'

export default {
    name: "Detail",
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
        GoodsList,
        // Toast
    },
    mixins: [itemListenerMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            isShowBackTop: false,
            // isShow: false,
            // message: ''
        }
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid
        // console.log(this.iid);

        // 2.根据iid请求数据
        getDetail(this.iid).then(res => {
            // 1.获取顶部的图片轮播数据
            const data = res.result;
            this.topImages = res.result.itemInfo.topImages
            // console.log(this.topImages);

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // console.log(this.goods);

            // 3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo;

            // 5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            // 6.取出评论的信息
            if (data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
        })
        // 3.请求推荐数据
        getRecommend().then(res => {
            // console.log(res);
            this.recommends = res.data.list
        })
        // 4.给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE)

            // console.log(this.themeTopYs);
        },100)
    },
    methods: {
        ...mapActions(['addCart']),
        imageLoad() {
            this.$refs.scroll.refresh()

            this.getThemeTopY()
        },

        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
        },
        contentScroll(position) {
            // 1.获取y值
            const positionY = -position.y

            // 2.positionY和主题中值进行对比
            let length = this.themeTopYs.length
            for(let i = 0; i < length; i++) {
                // 小技巧（加一个很大的数字在比较）
                if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
                // 普通做法
                // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length -1 && positionY >= this.themeTopYs[i]))) {
                //     this.currentIndex = i
                //     this.$refs.nav.currentIndex = this.currentIndex
                }
        },
        addToCart() {
            // 1.获取购物车需要展示信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.newPrice;
            product.iid = this.iid;
            product.realPrice = this.goods.realPrice
            // console.log(product.realPrice);

            // 2.将商品添加到购物车里
            // this.$store.commit('addCart', product)
            this.addCart(product).then(res => {
                // this.show = true;
                // this.message = res;

                // setTimeout(() => {
                //     this.show = false;
                //     this.message = ''
                // }, 1500)

                this.$toast.show(res, 3000)
                // console.log(this.$toast);
            })


            // this.$store.dispatch('addCart', product).then(res => {
            //     console.log(res);
            // })
        }
    },
    
    mounted() {
        // console.log('mounted');
        
    },
    destroyed() {
        this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px - 49px);
    }
</style>