<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span class="text">客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span class="text">店铺</span>
            </div>
            <div>
                <i class="icon select"></i>
                <span class="text">收藏</span>
            </div>
            <div class="bar-right bar-item">
                <div class="cart" @click="addToCart">加入购物车</div>
                <div class="buy">购买</div>
            </div>
            <!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailBottomBar",
    methods: {
        addToCart(event) {
            // this.$refs.ball.run(event.target)
            this.$emit('addCart')
        }
    }
}
</script>

<style scoped>
    .bottom-bar {
        position: relative;
        /* bottom: 49px; */
        display: flex;
        text-align: center;
        height: 49px;
        background-color: #fff;
        box-shadow: 0 -1px 1px rgba(0, 0, 0,.1);
    }
    .bar-item {
        flex: 1;
        display: flex;
    }
    .bar-item>div {
        flex: 1;
    }
    .bar-left .text {
        font-size: 13px;
    }
    .bar-left .icon {
        display: block;
        width: 22px;
        height: 22px;
        margin: 4px auto 3px;
        background: url("../../../assets/images/detail/detail_bottom.png") 0 0/100%;
    }
    .bar-left .service {
        background-position: 0 -54px;
    }
    .bar-left .shop {
        background-position: 0 -98px;
    }
    .bar-right {
        color: #fff;
        font-size: 15px;
        line-height: 49px;
    }
    .bar-right .cart {
        width: 100px;
        background-color: #ffe817;
        color: #333;
    }
    .bar-right .buy {
        width: 40px;
        background-color: #f69;
    }
    .sport-ball {
        position: absolute;
        left: 225px;
        bottom: 20px;
    }
</style>