<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name: "Toast",
    // props: {
    //     message: {
    //     type: String,
    //     default: ''
    //     },
    //     isShow: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message='默认', duration=2000) {
            // console.log('-------');
            this.isShow = true;
            this.message = message;

            setTimeout(() => {
                this.isShow = false;
                this.message = ''
            }, duration)
        }
    }
}
</script>

<style scoped>
    .toast {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        padding: 8px 10px;
        z-index: 999;
        background-color: rgba(0,0,0,.8);
    }
</style>