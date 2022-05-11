<template>
    <div class="tab-control">
        <div v-for="(item, index) in titles" :key="item.id" class="tab-control-item"
        :class="{active: index === currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('tabClick', index)
        }
    }
}
</script>

<style scoped>
    .tab-control {
        display: flex;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        z-index: 999;
    }
    .tab-control-item {
        flex: 1;
    }
    .tab-control-item span {
        padding: 3px 4px;
    }
    .active {
        color: #ff5777;
    }
    .active span {
        border-bottom: 2px solid #ff8198;
    }
</style>