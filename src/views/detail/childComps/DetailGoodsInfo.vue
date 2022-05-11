<template>
    <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
        <div class="info-desc">
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
        </div>
    </div>
</template>

 <script>
 export default {
     name: "DetailGoodsInfo",
     props: {
         detailInfo: {
             type: Object,
             default() {
                 return {}
             }
         }
     },
     data() {
         return {
             counter: 0,
             imagesLength: 0
         }
     },
     methods: {
         imgLoad() {
            //  判断，所有的图片都加载完了，那么进行一次回调就行了
             if(++this.counter === this.imagesLength) {
                this.$emit('imageLoad');
             }
         }
     },
     watch: {
         detailInfo() {
            //  获取图片的个数
             this.imagesLength = this.detailInfo.detailImage[0].list.length
         }
     }
 }
 </script>

 <style scoped>
    .goods-info {
        padding: 20px 0;
        border-bottom: 5px solid #f2f5f8;
    }
    .desc {
        font-size: 14px;
    }
    .start {
        position: relative;
        width: 90px;
        height: 1px;
        margin-bottom: 10px;
        background-color: #ccc;
    }
    .start::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 5px;
        height: 5px;
        background-color: #000;
    }
    .end {
        position: relative;
        float: right;
        width: 90px;
        height: 1px;
        margin-top: 10px;
        margin: 10px 0 1px 0;
        background-color: #ccc;
    }
    .end::after {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 5px;
        height: 5px;
        background-color: #000;
    }
    .info-desc {
        padding: 0 20px;
    }
    .info-key {
        color: #666;
        font-size: 15px;
        margin: 20px 0 10px 20px;
    }
    .info-list img {
        width: 100%;
        margin: 2px;
    }
 </style>