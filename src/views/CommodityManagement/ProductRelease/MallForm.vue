<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="商品分类" required>
			<el-select v-model="ruleForm.commodityTypeId" placeholder="请选择">
				<el-option v-for="item in commodityTypeList" :key="item.id" :label="item.commodityTypeName" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="商品名称" prop="commodityName">
			<el-input v-model="ruleForm.commodityName"></el-input>
		</el-form-item>
		<el-form-item label="商品封面" prop="commodityCover">
			<cl-upload :value="ruleForm.commodityCover" class="avatar-uploader" :size="[150, 150]" icon="el-icon-plus" accept="*" :on-success="commodityCoverUploadSuccess"></cl-upload>
		</el-form-item>
		<el-form-item label="商品图片" prop="commodityBannerImg">
			<cl-upload
				multiple
				:limit="5"
				listType="picture-card"
				:filePath="ruleForm.commodityBannerImg"
				class="avatar-uploader"
				:size="[150, 150]"
				icon="el-icon-plus"
				accept="*"
				:on-success="commodityBannerImgUploadSuccess"
			></cl-upload>
		</el-form-item>

		<el-form-item label="是否促销" required>
			<el-radio-group v-model="ruleForm.salePromotionShow">
				<el-radio :label="0">否</el-radio>
				<el-radio :label="1">是</el-radio>
			</el-radio-group>
		</el-form-item>

		<!-- <el-form-item v-if="ruleForm.salePromotionShow == 1" label="促销方式" required>
			<el-checkbox-group v-model="ruleForm.salePromotionMethod" @change="salePromotionMethodChange">
				<el-checkbox :label="1">价格优惠</el-checkbox>
				<el-checkbox :label="2">积分抵扣</el-checkbox>
			</el-checkbox-group>
		</el-form-item>

		<el-form-item v-if="ruleForm.salePromotionShow" label="促销时间">
			<el-date-picker
				v-model="ruleForm.salePromotionTime"
				value-format="yyyy-MM-dd HH:mm:ss"
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				@change="salePromotionTimeChange"
			>
			</el-date-picker>
		</el-form-item> -->

		<!-- 添加规格 -->
		<el-form-item label="规格" prop="specification">
			<goods-spec-select ref="goods-spec-select" :type="ruleForm.specType"></goods-spec-select>
		</el-form-item>

		<el-form-item label="积分奖励">
			<el-radio-group v-model="ruleForm.scopeReward">
				<el-radio :label="0">否</el-radio>
				<el-radio :label="1">是</el-radio>
			</el-radio-group>
		</el-form-item>
		<!-- <el-form-item v-if="ruleForm.scopeRewardShow == 1" label="奖励积分">
			每消费100元得 <el-input-number v-model="ruleForm.scopeReward" controls-position="right" :min="0"></el-input-number> 积分</el-form-item
		> -->

		<!-- <el-form-item label="配送方式">
			<el-radio-group v-model="ruleForm.deliveryMethod">
				<el-radio :label="0">普通快递</el-radio>
				<el-radio :label="1">到店自提</el-radio>
			</el-radio-group>
		</el-form-item> -->

		<el-form-item label="是否包邮" v-if="ruleForm.deliveryMethod == 0">
			<el-radio-group v-model="ruleForm.freeShippingMethod">
				<el-radio :label="0">否</el-radio>
				<el-radio :label="1">是</el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item label="商品详情" prop="detailImage">
			<cl-editor-quill height="300" v-model="ruleForm.detailImage"></cl-editor-quill>
		</el-form-item>

		<el-form-item label="商品排序" prop="commodityOrder">
			<el-input-number v-model="ruleForm.commodityOrder"></el-input-number>
		</el-form-item>

		<el-form-item label="状态" prop="commodityStatus">
			<el-switch v-model="ruleForm.commodityStatus" active-text="上架" inactive-text="下架" :active-value="1" :inactive-value="0"></el-switch>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import GoodsSpecSelect from '@/components/goods/spec/select';
const specColumn = [
	{
		label: '图片',
		prop: 'pic',
		width: 80,
		value: '',
		component: {
			name: 'cl-upload',
			props: {
				size: 46,
				text: ''
			}
		}
	},
	{
		label: '名称',
		prop: 'name',
		value: '',
		width: 150,
		component: {
			name: 'el-input',
			props: {
				placeholder: '请输入名称'
			}
		}
	},
	{
		label: '售价',
		prop: 'price',
		value: 0.01,
		width: 150,
		component: {
			name: 'el-input-number',
			props: {
				step: 1,
				min: 0.01,
				max: 1000000,
				precision: 2
			}
		}
	},
	{
		label: '库存',
		prop: 'stock',
		value: 100,
		width: 150,
		component: {
			name: 'el-input-number',
			props: {
				step: 1,
				min: 0,
				max: 1000000,
				precision: 0
			}
		}
	}
];
const specColumnOnsale = [
	{
		label: '图片',
		prop: 'pic',
		width: 80,
		value: '',
		component: {
			name: 'cl-upload',
			props: {
				size: 46,
				text: ''
			}
		}
	},
	{
		label: '名称',
		prop: 'name',
		value: '',
		width: 150,
		component: {
			name: 'el-input',
			props: {
				placeholder: '请输入名称'
			}
		}
	},
	{
		label: '售价',
		prop: 'price',
		value: 0.01,
		width: 150,
		component: {
			name: 'el-input-number',
			props: {
				step: 1,
				min: 0.01,
				max: 1000000,
				precision: 2
			}
		}
	},
	{
		label: '促销价',
		prop: 'salePromotionPrice',
		value: 0.01,
		width: 150,
		component: {
			name: 'el-input-number',
			props: {
				step: 1,
				min: 0.01,
				max: 1000000,
				precision: 2
			}
		}
	},
	{
		label: '库存',
		prop: 'stock',
		value: 100,
		width: 150,
		component: {
			name: 'el-input-number',
			props: {
				step: 1,
				min: 0,
				max: 1000000,
				precision: 0
			}
		}
	}
];
export default {
	components: {
		GoodsSpecSelect
	},
	data() {
		return {
			defaultColumn: [],
			commodityTypeList: [],
			salePromotionMethod: 0, //促销类型
			ruleForm: {
				salePromotionShow: 0, //是否促销
				salePromotionMethod: [], //促销类型
				deliveryMethod: 0,
				freeShippingMethod: 0,
				commodityTypeId: '',
				commodityName: '',
				commodityCover: '',
				commodityBannerImg: [],
				salePromotionTime: '',
				salePromotionStartTime: new Date(),
				salePromotionEndTime: new Date(),
				specificationType: 1,
				specification: '',
				commodityOrder: 1,
				detailImage: '',
				commodityStatus: 1,
				scopeRewardShow: 0,
				scopeReward: 0
			},
			rules: {
				commodityName: [
					{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}
				],
				commodityCover: [
					{
						required: true,
						message: '请上传商品封面',
						trigger: 'blur'
					}
				],
				commodityBannerImg: [
					{
						required: true,
						message: '请上传商品主图',
						trigger: 'blur'
					}
				],
				detailImage: [
					{
						required: true,
						message: '请编辑商品详情',
						trigger: 'blur'
					}
				],
				commodityOrderg: [
					{
						required: true,
						message: '请填写商品排序',
						trigger: 'blur'
					}
				],
				commodityStatus: [
					{
						required: true,
						message: '',
						trigger: 'blur'
					}
				]
				//specification: [{ required: true, message: '请填写规格', trigger: 'blur' }]
			}
		};
	},
	watch: {
		ruleForm: {
			handler: function (val, oldval) {},
			deep: true //对象内部的属性监听，也叫深度监听
		},
		'ruleForm.salePromotionShow': function (val, oldval) {
			console.log(val);
			if (!val) {
				this.ruleForm.salePromotionMethod = 0;
				this.salePromotionMethod = 0;

				this.$store.dispatch('setDefaultcolumn', specColumn);
			} else {
				this.ruleForm.salePromotionMethod = 1;
				this.salePromotionMethod = 1;
				this.$store.dispatch('setDefaultcolumn', specColumnOnsale);
			}
		}
		/* 		'ruleForm.deliveryMethod': function (val, oldval) {
				console.log(val);
				val.map((value, index, array) => {
					if (val.length < 1) {
						this.ruleForm.freeShippingMethodShow = false;
						return;
					}
					if (val.indexOf(1) > -1) {
						this.ruleForm.freeShippingMethodShow = true;
					} else {
						this.ruleForm.freeShippingMethodShow = false;
					}
				});
			} */
	},
	created() {
		this.$store.dispatch('setDefaultcolumn', specColumn);
		this.getCommodityTypeList();
	},
	methods: {
		//获取商品分类
		async getCommodityTypeList() {
			try {
				let res = await this.$service.app.commodityType.list();
				this.commodityTypeList = res;
				console.log(res);
			} catch (error) {
				this.$message.error(error);
			}
		},
		//促销类型多选
		salePromotionMethodChange(e) {
			let arr = new Array();
			let salePromotionMethod = 0;
			this.ruleForm.salePromotionMethod.forEach((value, index, array) => {
				salePromotionMethod = salePromotionMethod + value;
				console.log(value);
				if (value == 1) {
					arr.push({
						label: '促销价格',
						prop: 'salePromotionPrice',
						value: 0,
						width: 150,
						component: {
							name: 'el-input-number',
							props: {
								step: 1,
								min: 0.01,
								max: 1000000,
								precision: 2
							}
						}
					});
				}
				if (value == 2) {
					arr.push({
						label: '积分抵扣',
						prop: 'scoreCost',
						value: 0,
						width: 150,
						component: {
							name: 'el-input-number',
							props: {
								step: 1,
								min: 0,
								max: 1000000,
								precision: 0
							}
						}
					});
				}
			});
			console.log(arr);
			let arr2 = specColumn.concat(arr);
			this.$store.dispatch('setDefaultcolumn', arr2);
			this.salePromotionMethod = salePromotionMethod;
			console.log(this.defaultColumn);
		},
		//促销时间change
		salePromotionTimeChange(e) {
			console.log(e);
			this.ruleForm.salePromotionStartTime = e[0];
			this.ruleForm.salePromotionEndTime = e[1];
		},
		//商品封面上传成功回调
		commodityCoverUploadSuccess(res, file, fileList) {
			console.log(res, fileList);
			if (res) {
				this.ruleForm.commodityCover = res;
			}
		},
		//商品轮播主图
		commodityCoverBeforeUpload() {},
		commodityBannerImgUploadSuccess(res, file, fileList) {
			console.log(res, fileList);
			if (res) {
				this.ruleForm.commodityBannerImg = fileList.map((value) => {
					return value.url;
				});
			}
			console.log(this.ruleForm.commodityBannerImg);
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				const { type, spec } = this.$refs['goods-spec-select'].validate();
				this.ruleForm.specificationType = type;
				this.ruleForm.specification = JSON.stringify(spec);
				if (valid) {
					let params = {
						...this.ruleForm
					};
					params.salePromotionMethod = this.salePromotionMethod;
					console.log(JSON.stringify(params));
					await this.$service.app.commodity.shopping.add(params);
					this.$alert('商品添加成功！', '提示', {
						confirmButtonText: '确定',
						callback: (action) => {}
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			console.log('重置表单');
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
	height: 100%;
}
</style>
