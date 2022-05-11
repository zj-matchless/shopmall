<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick" 
        ref="tabControl"
        class="tab-control" v-show="isTabFixed"></tab-control>

        <scroll
         class="content"
         ref="scroll"
         :probe-type="3"
         @scroll="contentScroll"
         :pull-up-load="true"
         @pullingUp="loadMore"
         >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <home-recommend-view :recommends="recommends"/>
        <home-feature-view/>
        <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick" 
        ref="tabControl"></tab-control>
        <good-list :goods="showGoods"/>
        </scroll>

        <back-top @click.native="backClick" v-show="isShowBackTop"/>


    </div>
</template>
<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import HomeFeatureView from './childComps/HomeFeatureView.vue'

// 公共组件
import NavBar from '../../components/common/navbar/NavBar.vue';
import TabControl from '../../components/content/tabControl/TabControl'
import GoodList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'


import {getHomeMultidata, getHomeGoods} from "../../network/home";
import {debounce} from "../../common/utils"
import {itemListenerMixin} from "../../common/mixin"


export default {
    name: "home",
    components: {
        HomeSwiper,
        HomeRecommendView,
        HomeFeatureView,
        NavBar,
        TabControl,
        GoodList,
        Scroll,
        BackTop,
    },
    mixins: [itemListenerMixin],
    data() {
        return {
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0,
            // itemImgListener: null,
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list:[]},
                'new': {page: 0, list:[]},
                'sell': {page: 0, list:[]},
            }
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    destroyed() {
        console.log('hume destroyed');
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY,1)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        // 1.保存Y值
        this.saveY = this.$refs.scroll.getScrollY()

        // 2.取消全局事件的监听
        this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
        // 1.请求多个数据
        this.getHomeMultidata()
        //2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    mounted() {
        // 1.监听item中图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh,50)

        this.itemImgListener = () => {
            refresh()
        }
        // this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    methods: {
        // 事件监听相关的方法
        
        tabClick(index) {
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
        },
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 1000);
        },
        contentScroll(position) {
            // 1.判断BackTop是否显示
            this.isShowBackTop = (-position.y) > 1200

            // 2.决定tabControl是否吸顶（position: fixed）
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        swiperImageLoad() {
            // 获取tabControl的offsetTop
        // 所有的组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        // console.log(this.tabOffsetTop);
        },


        // 网络请求相关的方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
            // console.log(res);
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
                // console.log(res);
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                // 完成上拉加载更多
                this.$refs.scroll.finishPullUp()
            })
        }
    }
}
</script>

<style scoped>
    #home {
        position: relative;
        height: 100vh;
        padding-top: 44px;
    }
    .home-nav {
        position: fixed;
        left: 0;
        right: 0;
        top: 0; 
         z-index: 9;
        color: #fff;
        background-color: var(--color-tint);
    }
    .tab-control {
        position: relative;
        background-color: #fff;
    }
    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }


    /* .content {
        height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px;
    } */
</style>