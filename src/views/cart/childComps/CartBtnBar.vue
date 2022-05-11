<template>
    <div class="btn-bar">
        <div class="check-content">
            <check-button 
            :isChecked="isSelectAll" 
            class="check-btn"
            @click.native="checkClick"
            ></check-button>
            <span>全选</span>
        </div>

        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去结算({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'

export default {
    name: "CartBtnBar",
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.realPrice * item.count
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if(this.$store.state.cartList.length === 0) return false
            // 1.使用filter
            // return !(this.$store.state.cartList.filter(item => !item.checked).length)

            // 2.使用find
            // return !this.$store.state.cartList.find(item => !item.checked)

            // 3.普通遍历
            for(let item of this.$store.state.cartList) {
                if(!item.checked) {
                    return false
                }
            }
            return true
        }
    },
    methods: {
        checkClick() {
            if(this.isSelectAll) {// 全部选中
                this.$store.state.cartList.forEach(item => item.checked = false);
            }else {// 部分或全部不选中
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick() {
            if (this.checkLength === 0) {
                this.$toast.show('请选择购买的商品', 2000)
            }
        }
    }
}
</script>

<style scoped>
    .btn-bar {
        position: relative;
        display: flex;
        height: 40px;
        line-height: 40px;
        background-color: #eee;
    }
    .check-content {
        display: flex;
        width: 70px;
        align-items: center;

    }
    .check-btn {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        line-height: 22px;
    }
    .price {
        width: 150px;
        margin-left: 20px;
    }
    .calculate {
        color: #fff;
        width: 120px;
        text-align: center;
        /* margin-left: 45px; */
        background-color: #ff8198;
    }
</style>