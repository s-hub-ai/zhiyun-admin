<template>
	<div class="goods-spec-select">
		<!-- 规格模式 -->
		<!-- 		<div class="goods-spec-select__mode">
			<el-radio-group v-model="selects.type">
				<el-radio :label="0">单规格</el-radio>
				<el-radio :label="1">多规格</el-radio>
			</el-radio-group>
		</div> -->

		<!-- 单规格 -->
		<div class="goods-spec-select--default" v-if="selects.type == 0">
			<!-- 属性表格 -->
			<goods-sku-edit ref="goods-sku-edit" :spec="form.spec" :value="form.sku"></goods-sku-edit>
		</div>

		<!-- 多规格 -->
		<div class="goods-spec-select--multiple" v-else-if="selects.type == 1">
			<!-- 选择规格模板 -->
			<!-- 			<div class="goods-spec-select__tmpl">
				<el-select size="mini" :value="selects.tmpl" @change="onTmplChange">
					<el-option v-for="(item, index) in options.tmpl" :key="index" :label="item.label" :value="item"></el-option>
				</el-select>

				<el-button size="mini" type="primary" style="margin-left: 10px">确认</el-button>
				<el-button size="mini" @click="addTmpl">添加规格模板</el-button>
			</div> -->

			<!-- 分割线 -->
			<!-- <el-divider content-position="left">{{ selects.tmpl.label }}</el-divider> -->

			<!-- 规格设置 -->
			<div class="goods-spec-select__upsert">
				<!-- 规格编辑 -->
				<goods-spec-edit v-if="specShow" :create-btn="true" :value="form.spec" @create="onCreated"></goods-spec-edit>
				<!-- SKU编辑 -->
				<goods-sku-edit ref="goods-sku-edit" multiple :spec="form.spec" :value="form.sku"></goods-sku-edit>
			</div>
		</div>

		<!-- 添加规格模板 -->
		<cl-form ref="spec-tmpl"> </cl-form>
	</div>
</template>

<script>
import _ from 'lodash';
import GoodsSkuEdit from '../sku/edit';
import GoodsSpecEdit from './edit';
import { calcDescartes, getSpec } from '@/utils';

export default {
	name: 'goods-spec-select',

	components: {
		GoodsSkuEdit,
		GoodsSpecEdit
	},

	props: {
		// 0：单规格 1：多规格
		type: {
			type: Number,
			default: 1
		},
		//显示编辑规格
		specShow: {
			type: Boolean,
			default: true
		},
		// 规格数据
		data: {
			type: Object,
			default: () => {
				return {
					sku: [],
					spec: []
				};
			}
		}
	},

	data() {
		return {
			form: {
				sku: [],
				spec: []
			},
			selects: {
				type: 1,
				tmpl: {
					label: '自定义规格'
				}
			},
			options: {
				tmpl: []
			}
		};
	},

	watch: {
		type: {
			immediate: true,
			handler(val) {
				this.selects.type = val;
			}
		},
		data: {
			immediate: true,
			handler: 'onUpdate'
		}
	},

	created() {
		//this.refreshTmpl();
	},

	methods: {
		// 刷新规格模板
		refreshTmpl() {
			this.$service.biz.spec.template.list().then((res) => {
				res.unshift({
					name: '自定义规格'
				});

				this.options.tmpl = res.map((e) => {
					return {
						label: e.name,
						value: e.data
					};
				});
			});
		},

		// 创建sku
		onCreated(spec) {
			if (this.selects.type == 1) {
				let sku = [];

				// 合并规格
				calcDescartes(spec.map((e) => e.children)).forEach((a) => {
					let d = {};
					if (_.isArray(a)) {
						a.forEach((b, i) => {
							d[`spec_${i}`] = b;
						});
					} else {
						d[`spec_0`] = a;
					}
					sku.push(d);
				});

				this.onUpdate({ sku, spec });
			}
		},

		// 更新sku、spec
		onUpdate({ sku, spec }) {
			if (sku) {
				const specs = this.form.sku.map(getSpec);

				sku.forEach((e) => {
					let index = specs.findIndex((s) => getSpec(e).includes(s));

					if (index >= 0) {
						Object.assign(e, this.form.sku[index]);
					}
				});

				this.form.sku = sku;
			}

			if (spec) {
				this.form.spec = spec;
			}
		},

		findSpec() {
			_.keys(e)
				.filter((a) => a.includes('spec_'))
				.map((a) => e[a]);
		},

		// 切换模板
		onTmplChange(e) {
			this.$confirm('切换规格模板将覆盖之前的数据，是否继续？', '提示', {
				type: 'warning'
			})
				.then(() => {
					this.selects.tmpl = e;
					if (e.value) {
						this.onUpdate({ sku: [], spec: JSON.parse(e.value) });
					} else {
						this.onUpdate(this.data);
					}
				})
				.catch(() => null);
		},

		// 添加模板
		addTmpl() {
			this.$refs['spec-tmpl'].open({
				props: {
					title: '添加规则模板'
				},
				items: [
					{
						label: '模板名称',
						prop: 'name',
						component: {
							name: 'el-input',
							attrs: {
								placeholder: '请输入模板名称'
							}
						},
						rules: {
							required: true,
							message: '模板名称不能为空'
						}
					},
					{
						label: '模板规格',
						prop: 'data',
						value: [],
						component: GoodsSpecEdit
					}
				],
				on: {
					submit: (data, { done, close, $refs }) => {
						const spec = $refs['goods-spec-edit'].validate();

						if (spec) {
							this.$service.biz.spec.template
								.add({
									name: data.name,
									data: JSON.stringify(spec)
								})
								.then(() => {
									this.$message.success('添加成功');
									this.refreshTmpl();
									close();
								})
								.catch((err) => {
									this.$message.error(err);
									done();
								});
						} else {
							done();
						}
					}
				}
			});
		},

		// 输入校验
		validate() {
			const sku = this.$refs['goods-sku-edit'].validate() || [];
			const spec = this.form.spec || [];

			return {
				type: this.selects.type,
				spec: {
					spec,
					sku
				}
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-spec-select {
	&__mode {
		margin-bottom: 10px;
	}

	.el-divider {
		background-color: $color-main;

		&__text {
			font-size: 12px;
			color: $color-main;
		}
	}
}
</style>
