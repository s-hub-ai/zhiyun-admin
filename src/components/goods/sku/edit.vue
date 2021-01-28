<template>
	<div class="goods-sku-edit">
		<!-- 批量设置，多规格下显示 -->
		<template v-if="multiple && selection.length > 0">
			<div class="goods-sku-edit__set">
				<el-divider content-position="left">批量设置</el-divider>

				<el-table size="mini" border :data="batch">
					<el-table-column v-for="(item, index) in columns" :key="index" :label="item.label" :prop="item.prop" :min-width="item.width" align="center">
						<template slot-scope="scope">
							<el-row type="flex" justify="center">
								<component :is="item.component.name" v-model="scope.row[item.prop]" v-bind="item.component.props" />
							</el-row>
						</template>
					</el-table-column>

					<el-table-column label="操作" align="center" width="200" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="batchUpdate(scope.row)">批量修改</el-button>
							<el-button size="mini" type="danger" @click="batchClear(scope.row)">清空</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</template>

		<!-- 商品属性列表 -->
		<div class="goods-sku-edit__list" v-if="columns.length > 0">
			<el-divider content-position="left">商品属性</el-divider>

			<el-table size="mini" border :data="list" max-height="500px" @selection-change="onSelectionChange">
				<template v-if="multiple">
					<el-table-column fixed="left" type="selection" width="60" align="center"></el-table-column>

					<!-- 规格自定义属性 -->
					<el-table-column v-for="item in spec" :key="item.value" :label="item.label" :prop="item.value" align="center" min-width="80" show-overflow-tooltip></el-table-column>
				</template>

				<!-- 规格默认属性 -->
				<el-table-column v-for="(item, index) in columns" :key="index" :label="item.label" :prop="item.prop" :min-width="item.width" align="center">
					<template slot-scope="scope">
						<el-row type="flex" justify="center">
							<component :is="item.component.name" v-model="scope.row[item.prop]" v-bind="item.component.props" />
						</el-row>
					</template>
				</el-table-column>

				<template v-if="multiple">
					<el-table-column label="操作" align="center" width="100" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="remove(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</template>
			</el-table>
		</div>
	</div>
</template>

<script>
import _ from 'lodash';
export default {
	name: 'goods-sku-edit',

	props: {
		// 是否多规格
		multiple: Boolean,
		// 绑定值
		value: {
			type: Array,
			default: () => []
		},
		// 规格
		spec: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		defaultColumn() {
			return this.$store.state.mall.defaultColumn;
		}
	},
	data() {
		return {
			columns: [],
			// 列表数据
			list: [],
			// 批量设置的数据
			batch: [],
			// 选中的数据
			selection: []
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(sku) {
				// 清空列表
				this.list = [];

				// 合并旧数据
				this.list = sku.map((a) => {
					let c = this.list.find((b) => !this.spec.map((e) => e.value).some((n) => a[n] !== b[n]));

					return c || a;
				});

				// 单规格默认数据
				if (!this.multiple && sku.length === 0) {
					this.list = [this.create()];
				}
			}
		},
		defaultColumn: {
			immediate: true,
			handler(val) {
				// 清空列表
				this.columns = val;
				console.log(val);
			}
		}
	},

	created() {
		if (this.multiple) {
			this.batch = [this.create()];
		}
	},

	methods: {
		// 创建行
		create(b = {}) {
			let a = {};

			this.columns.forEach((e) => {
				a[e.prop] = e.value;
			});

			return Object.assign(a, b);
		},

		// 删除行
		remove(i) {
			this.list.splice(i, 1);
		},

		// 清空批量设置的内容
		batchClear() {
			this.batch = [this.create()];
		},

		// 批量设置
		batchUpdate() {
			this.selection.map((e) => {
				for (let i in this.batch[0]) {
					e[i] = this.batch[0][i];
				}
			});
		},

		// 已选择的行
		onSelectionChange(selection) {
			this.selection = selection;
		},

		// 输入校验，数据获取的唯一方法
		validate() {
			return this.list.length === 0 ? false : this.list;
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-sku-edit {
	&__set {
		margin-top: 30px;
	}

	&__list {
		margin-top: 30px;
	}

	&__list,
	&__set {
		.el-divider {
			background-color: $color-main;

			&__text {
				font-size: 12px;
				color: $color-main;
			}
		}
	}
}
</style>
