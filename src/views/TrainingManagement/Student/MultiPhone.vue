<template>
    <div>
        <div class="mb-1 flex" v-for="(item, i) in arr" :key="i"> 
            <el-input 
                placeholder="请输入家长手机号"
                @input="update"
                v-model="item.text"
                show-word-limit
                maxlength="11"
            ></el-input> 
            <el-button size="mini"  @click="del(i)">
                <i class="el-icon-delete" ></i>
            </el-button>
        </div>
        <el-button size="mini" @click="addNew"> 添加手机号</el-button>
    </div>
</template>
<script>
export default {
    name: "MultiPhone",
    props: ["value"],
    watch:{
        value(val){
            this.arr = this.value.split(",").map(el=>({text:el}))
        }
    },
    data: () => ({
        arr: [],
    }),
    methods: {
        addNew() {
            this.arr.push({ text: "" })
            this.update()
        },
        del(i){
            this.arr.splice(i,1);
            this.update()
        },
        update() {
            this.$emit("input", this.arr.map((el) => el.text).join(","))
        },
    },
}
</script>
<style lang="scss" scoped>
</style>