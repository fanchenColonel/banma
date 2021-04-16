<template>
    <div>
        <k-form-design
            ref='kfd'
            :title="'模板设计'"
            :showHead="false"
            @save="handleSave"
            @close="handleClose"
         />
    </div>
</template>
<script>

import 'k-form-design/lib/k-form-design.css'
import 'ant-design-vue/dist/antd.css'
export default {
    data () {
        return {

        }
    },
    computed: {

    },
    methods: {
        handleSave() {
            
            this.$refs.kfd.handleSave()
        },
        handleClose() {
            
            
        },
        resetFormDesign() {
            this.$refs.kfd.handleReset()
        }
    } 
}
</script>
<style lang="less">

</style>