<template>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="deepPink">
        <img slot="item-icon" src="../../../assets/images/tabbar/icon01.png" alt="">
        <img slot="item-icon-active" src="../../../assets/images/tabbar/icon01_active.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="deepPink">
        <img slot="item-icon" src="../../../assets/images/tabbar/icon02.png" alt="">
        <img slot="item-icon-active" src="../../../assets/images/tabbar/icon02_active.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deepPink">
        <img slot="item-icon" src="../../../assets/images/tabbar/icon03.png" alt="">
        <img slot="item-icon-active" src="../../../assets/images/tabbar/icon03_active.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile" activeColor="deepPink">
        <img slot="item-icon" src="../../../assets/images/tabbar/icon04.png" alt="">
        <img slot="item-icon-active" src="../../../assets/images/tabbar/icon04_active.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '../../common/tabbar/TabBar.vue'
import TabBarItem from '../../common/tabbar/TabBarItem.vue'

export default {
    name: "MainTabBar",
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style scoped>

</style>