<template>
	<div class="activity-sku">
		<el-table
			ref="table-sku"
			size="mini"
			border
			:data="form._sku"
			@selection-change="onSelectionChange"
		>
			<el-table-column label="选择" width="60px" align="center" type="selection">
			</el-table-column>

			<!-- 自定义规格 -->
			<el-table-column
				v-for="(item, index) in form._spec"
				:key="index"
				:label="item.label"
				:prop="item.value"
				align="center"
				min-width="80"
			></el-table-column>

			<el-table-column label="图片" prop="pic" align="center">
				<template slot-scope="scope">
					<el-image class="cover" :src="scope.row.pic"></el-image>
				</template>
			</el-table-column>

			<!-- 限时抢购 -->
			<el-table-column
				v-if="type === 0"
				label="售价"
				align="center"
				prop="price"
				width="160px"
			>
				<template slot-scope="scope">
					<el-form-item
						:prop="'_sku.' + scope.$index + '.price'"
						:rules="{
							required: true,
							message: '售价不能为空',
							validator: onFieldValidator
						}"
					>
						<el-input-number
							v-model="scope.row.price"
							placeholder="请填写"
							size="mini"
							clearable
							:min="0"
							:max="scope.row.originalPrice"
						></el-input-number>
					</el-form-item>
				</template>
			</el-table-column>

			<el-table-column label="原价" prop="originalPrice" align="center"></el-table-column>

			<el-table-column label="成本价" prop="costPrice" align="center"></el-table-column>

			<!-- <el-table-column label="库存" prop="inventory" align="center"></el-table-column> -->

			<!-- <el-table-column label="限量" align="center" prop="limit" width="160px">
				<template slot-scope="scope">
					<el-form-item
						:prop="'_sku.' + scope.$index + '.limit'"
						:rules="{
							required: true,
							message: '限量不能为空',
							validator: onFieldValidator
						}"
					>
						<el-input-number
							v-model="scope.row.limit"
							size="mini"
							clearable
							:min="1"
							:max="scope.row.inventory"
							placeholder="请填写"
						></el-input-number>
					</el-form-item>
				</template>
			</el-table-column> -->

			<el-table-column label="重量" prop="weight" align="center"></el-table-column>

			<el-table-column label="体积" prop="volume" align="center"></el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	inject: ["form"],

	props: {
		sku: Array
	},

	data() {
		return {
			selection: [],
			type: 0
		};
	},

	methods: {
		show({ type, isEdit }) {
			// 解析商品规格
			try {
				const { sku = [], spec = [] } = JSON.parse(this.form.specification);

				if (sku[0]) {
					let arr = [];

					for (let i in sku[0]) {
						if (i.includes("spec_")) {
							arr.push({
								label: spec.find((e) => e.value == i).label,
								value: i,
								children: Array.from(new Set(sku.map((e) => e[i])))
							});
						}
					}

					this.form._spec = arr;
				} else {
					this.form._spec = [];
				}

				// 根据活动类型设置sku数据
				this.form._sku = sku.map((e) => {
					if (!isEdit) {
						e.originalPrice = e.price;
					}

					// 限量
					// if (!e.limit) {
					// 	this.$set(e, "limit", e.inventory);
					// }

					return e;
				});

				// 默认勾选
				this.$nextTick(() => {
					this.form._sku.forEach((row) => {
						this.$refs["table-sku"].toggleRowSelection(row, true);
					});
				});
			} catch (e) {
				console.error("商品规格错误", e);
			}
		},

		// 字段验证
		onFieldValidator(rule, value, callback) {
			const [, , prop] = rule.field.split(".");
			const item = this.selection.find((e) => e[prop] == value);

			if (item) {
				if (value) {
					callback();
				} else {
					callback(new Error(rule.message));
				}
			} else {
				callback();
			}
		},

		// 监听勾选
		onSelectionChange(selection) {
			this.selection = selection;
		},

		// 获取已勾选的SKU
		getSelection() {
			if (this.selection.length === 0) {
				return false;
			}

			return this.selection;
		}
	}
};
</script>

<style lang="scss" scoped>
.activity-sku {
	.el-form-item {
		margin-bottom: 0;
	}
}
</style>
