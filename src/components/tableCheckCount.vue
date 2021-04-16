<template>
    <!-- 已选项统计 -->
    <div class="total" >
        <span>
           已选择 {{num}} 项
        </span>
        <a href="javascript:;" class="dele" type="primary" :disabled="num>0?false:true" loading="loading" @click="clean">清空</a>
    </div>
</template>
<script>
export default {
    props:{
        num:{
            type:Number,
            default:0
        }
    },
    methods: {
        clean(){
            this.$emit("clean")
        }
    }
};
</script>
<style lang="less">
.total {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    height: 38px;
    border-radius: 4px;
    padding: 8px 15px 8px 37px;
    .dele {
        margin-left: 24px;
    }
}
</style>
