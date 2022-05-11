<template>
    <div v-if="Object.keys(goods).length !==0" class="base-info">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index-1].icon" alt="">
                <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailBaseInfo",
    props: {
        goods: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .base-info {
        color: #999;
        margin-top: 15px;
        padding: 0 8px;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title {
        color: #222;
    }
    .info-price {
        margin-top: 10px;
    }
    .info-price .n-price {
        font-size: 24px;
        color: #ff5777;
    }
    .info-price .o-price {
        font-size: 13px;
        margin-left: 5px;
        text-decoration: line-through;
    }
    .info-price .discount {
        /* 让元素上浮一些：使用相对定位即可 */
        position: relative;
        top: -8px;
        font-size: 12px;
        padding: 2px 5px;
        color: #fff;
        border-radius: 8px;
        margin-left: 5px;
        background-color: #ff5777;
    }
    .info-other {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        line-height: 30px;
        margin-top: 15px;
        border-bottom: 1px solid rgba(0,0,0,.2);
    }
    .info-service {
        display: flex;
        justify-content: space-between;
        line-height: 60px;
    }
    .info-services-item img {
        position: relative;
        top: 2px;
        width: 14px;
        height: 14px;   
    }
    .info-services-item span {
        font-size: 13px;
        color: #333;
    }

</style>