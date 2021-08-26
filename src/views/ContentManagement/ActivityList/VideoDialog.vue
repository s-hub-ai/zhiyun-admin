<template>
     <el-button  size="mini" :disabled="!url" @click="show=true" type="text">
            <span v-if="url">查看视频</span>
            <span v-else>无</span>
            <el-dialog title="视频" :visible.sync="show" append-to-body>
                <div v-if="show">
                <video controls width="100%" style="max-height:60vh">
                    <source :src="url"> 
                </video>
                <div class="my-2">
                    {{url}}
                </div>
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