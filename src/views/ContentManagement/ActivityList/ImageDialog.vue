<template>
     <el-button  size="mini" :disabled="!url" @click="show=true" type="text">
            <span v-if="url">查看图片</span>
            <span v-else>无</span>
            <el-dialog title="图片" :visible.sync="show" width="600px" append-to-body>
                <div v-if="show">
                     <el-image  :src="url" style="max-height:60vh"></el-image>
                </div>
            </el-dialog>
        </el-button>
</template>
<script>
export default {
    name:"VideoDialog",
    props:['url'],
    data:()=>({
        show:false
    })
}
</script>
<style lang="scss" scoped>

</style>