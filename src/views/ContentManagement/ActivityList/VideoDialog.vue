<template>
     <el-button  size="mini" @click="show=true" type="text">
            <span>查看视频</span>
            <el-dialog title="视频" :visible.sync="show" width="600px" append-to-body>
                <div v-if="show">
                <video controls width="600px">
                    <source :src="url"> 
                </video>
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