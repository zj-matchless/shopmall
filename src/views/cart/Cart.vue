<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>

        <!-- 商品列表 -->
        <cart-list></cart-list>

        <!-- 底部汇总 -->
        <cart-btn-bar></cart-btn-bar>
    </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartBtnBar from './childComps/CartBtnBar.vue'

import { mapGetters } from 'vuex'

export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        CartBtnBar
    },
    computed: {
        // 两种语法
        // ...mapGetters(['cartLength', 'cartList'])
        ...mapGetters({
            length: 'cartLength',
        })
    }
}
</script>

<style scoped>
    .cart {
        width: 100vw;
    }
    .nav-bar {
        color: #fff;
        background-color: #ff8198;
    }
</style>