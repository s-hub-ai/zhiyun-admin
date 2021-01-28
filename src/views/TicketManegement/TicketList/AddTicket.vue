<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
		<el-form-item label="票务类型" required>
			<el-select v-model="ruleForm.ticketType" placeholder="请选择">
				<el-option v-for="item in ticketTypeDict" :key="item.value" :label="item.text" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="票务名称" prop="ticketName">
			<el-input v-model="ruleForm.ticketName"></el-input>
		</el-form-item>
		<el-form-item label="封面" prop="cover">
			<cl-upload :value="ruleForm.cover" accept="image/*" class="avatar-uploader" :size="[150, 150]" icon="el-icon-plus" :on-success="commodityCoverUploadSuccess"></cl-upload>
		</el-form-item>
		<el-form-item label="图片" prop="bannerImg">
			<cl-upload
				multiple
				:limit="5"
				listType="picture-card"
				:value="ruleForm.bannerImg"
				class="avatar-uploader"
				:size="[150, 150]"
				icon="el-icon-plus"
				:on-success="commodityBannerImgUploadSuccess"
			></cl-upload>
		</el-form-item>
		<el-form-item label="是否促销" required>
			<el-radio-group v-model="ruleForm.salePromotionShow">
				<el-radio :label="0">否</el-radio>
				<el-radio :label="1">是</el-radio>
			</el-radio-group>
		</el-form-item>
		<div style="display: flex">
			<el-form-item label="积分奖励" required>
				<el-radio-group v-model="ruleForm.isScoreReward">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item style="margin-left: 30px" label="支云卡积分奖励" required>
				<el-radio-group v-model="ruleForm.isscoreRewardZy">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
			</el-form-item>
		</div>

		<!-- 添加规格 -->
		<el-form-item v-if="specification.sku" label="规格" prop="specification">
			<goods-spec-select ref="goods-spec-select" :type="ruleForm.specType" :specShow="false" :data="specification"></goods-spec-select>
		</el-form-item>

		<el-form-item label="票务详情" prop="detailImage">
			<cl-editor-quill height="300" v-model="ruleForm.detailImage"></cl-editor-quill>
		</el-form-item>
		<div style="display: flex">
			<el-form-item label="有效期">
				<el-date-picker
					readonly
					v-model="ruleForm.validityPeriodTime"
					value-format="MM-dd"
					format="MM-dd"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="缴费缓冲期(天)" prop="bufferTime">
				<el-input-number v-model="ruleForm.bufferTime" :min="0" :precision="0"></el-input-number>
			</el-form-item>
		</div>

		<el-form-item label="商品排序" prop="commodityOrder">
			<el-input-number v-model="ruleForm.commodityOrder"></el-input-number>
		</el-form-item>

		<el-form-item label="状态" required>
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
		label: '售价',
		prop: 'price',
		value: 0.01,
		width: 150,
		component: {
			name: 'el-input-number',
			props: {
				step: 0.01,
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
				step: 0.01,
				min: 0.01,
				max: 1000000,
				precision: 2
			}
		}
	}
];
import { ticketTypeDict, ticketPackageUserDict } from '@/dict/index.js';
export default {
	components: {
		GoodsSpecSelect
	},
	computed: {},
	data() {
		return {
			specification: {
				spec: [
					{
						label: '套票类型',
						value: 'spec_0',
						children: ['基础套票', '普通套票', '亲子套票', 'VIP套票', '超级VIP']
					}
				],
				sku: []
			},
			ticketTypeDict,
			defaultColumn: [],
			ruleForm: {
				ticketType: 4,
				ticketName: '',
				cover: '',
				bannerImg: '',
				salePromotionShow: 0, //是否促销
				validityPeriodTime: ['01-01', '12-31'],
				bufferTime: 0,
				isScoreReward: 1,
				detailImage: '',
				commodityStatus: 1,
				commodityOrder: 1,
				isscoreRewardZy: 0
			},
			salePromotionMethod: 0,
			rules: {
				ticketName: [
					{
						required: true,
						message: '请输入票务名称',
						trigger: 'blur'
					}
				],
				cover: [
					{
						required: true,
						message: '请上传封面',
						trigger: 'blur'
					}
				],
				bannerImg: [
					{
						required: true,
						message: '请上传主图',
						trigger: 'blur'
					}
				],
				detailImage: [
					{
						required: true,
						message: '请输入详情详情',
						trigger: 'blur'
					}
				],
				commodityOrder: [
					{
						required: true,
						message: '请填写商品排序',
						trigger: 'blur'
					}
				],
				bufferTime: [
					{
						required: true,
						message: '请填写缴费缓冲期',
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
	},
	created() {
		//this.createSpec();
		this.$store.dispatch('setDefaultcolumn', specColumn);
	},
	methods: {
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.commodity.ticket.info({ id });
				this.specification = JSON.parse(res.specification);
				res.salePromotionShow = res.salePromotionMethod;
				res.validityPeriodTime = ['01-01', '12-31'];
				this.ruleForm = res;
			} catch (error) {
				this.$message.error(error);
			}
		},
		//初始化规格
		createSpec() {
			let sku = [];
			ticketPackageUserDict.map((value, index, array) => {
				if (value.value != 0 && value.value != 5) {
					sku.push({
						pic: '',
						spec_0: value.text,
						type: value.value,
						price: 0.01
					});
				}
			});
			this.specification.sku = sku;
			this.$refs['goods-spec-select'].onUpdate(this.specification);
		},
		//商品封面上传成功回调
		commodityCoverUploadSuccess(res, file, fileList) {
			console.log(res, fileList);
			if (res) {
				this.ruleForm.cover = res;
			}
		},
		//商品轮播主图
		commodityCoverBeforeUpload() {},
		commodityBannerImgUploadSuccess(res, file, fileList) {
			console.log(res, fileList);
			if (res) {
				let arr = fileList.map((value) => {
					return value.url;
				});
				this.ruleForm.bannerImg = arr.toString();
			}
			console.log(this.ruleForm.bannerImg);
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				const { type, spec } = this.$refs['goods-spec-select'].validate();
				if (spec.sku.length < 1) {
					this.$message.error('请填写商品规格');
					return false;
				}
				if (spec.spec.length < 1) {
					this.$message.error('请填写商品规格');
					return false;
				}
				if (this.salePromotionMethod == 1) {
					let b = false;
					for (let o = 0; o < spec.sku.length; o++) {
						let e = spec.sku[o];
						if (e.salePromotionPrice == '' || e.salePromotionPrice == null) {
							this.$message.error('请填写规格优惠价');
							b = true;
							break;
						}
					}
					if (b) return false;
				}
				this.ruleForm.specificationType = type;
				this.ruleForm.specification = JSON.stringify(spec);
				if (valid) {
					let params = {
						...this.ruleForm
					};
					params.validityPeriodStartTime = params.validityPeriodTime[0];
					params.validityPeriodEndTime = params.validityPeriodTime[1];
					params.salePromotionMethod = this.salePromotionMethod;
					console.log(params);
					if (params.id) {
						await this.$service.app.commodity.ticket.update(params);
					} else {
						await this.$service.app.commodity.ticket.add(params);
					}

					this.$alert(params.id ? '修改成功' : '添加成功', '提示', {
						confirmButtonText: '确定',
						callback: (action) => {
							this.$emit('update:addDialogShow', false);
						}
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
