<template>
	<div class="goods-category-select">
		<el-popover
			ref="popover"
			placement="bottom-start"
			trigger="click"
			popper-class="popper-goods-category-select-tree"
		>
			<el-input size="small" v-model="filterValue">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>

			<el-tree
				ref="tree"
				node-key="id"
				:data="treeList"
				:props="props"
				:highlight-current="true"
				:expand-on-click-node="false"
				:default-expanded-keys="expandedKeys"
				:filter-node-method="filterNode"
				@current-change="currentChange"
			>
			</el-tree>

			<el-input v-model="name" slot="reference" readonly placeholder="请选择"></el-input>
		</el-popover>
	</div>
</template>

<script>
import { deepTree } from "@/cool/utils";

export default {
	name: "goods-category-select",

	props: ["value"],

	data() {
		return {
			filterValue: "",
			list: [],
			props: {
				label: "name",
				children: "children"
			},
			expandedKeys: []
		};
	},

	watch: {
		filterValue(val) {
			this.$refs.tree.filter(val);
		}
	},

	computed: {
		name() {
			const item = this.list.find((e) => e.id == this.value);
			return item ? item.name : "";
		},

		treeList() {
			return deepTree(this.list);
		}
	},

	created() {
		this.refresh();
	},

	methods: {
		currentChange({ id }) {
			this.$emit("input", id);
		},

		refresh() {
			this.$service.biz.goods.category.list().then((res) => {
				this.list = res;
			});
		},

		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		}
	}
};
</script>

<style lang="scss">
.popper-goods-category-select-tree {
	width: 480px;
	box-sizing: border-box;

	.el-input {
		margin-bottom: 10px;
	}
}
</style>
