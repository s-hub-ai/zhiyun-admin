<template>
     <el-button  size="mini" @click="show=true" type="text">
            <span>查看图片</span>
            <el-dialog title="图片" :visible.sync="show" width="600px" append-to-body>
                <div v-if="show">
                     <el-image :src="url" style="max-height:60vh"></el-image>
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