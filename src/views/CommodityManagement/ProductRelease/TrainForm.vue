<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="商品分类" prop="commodityTypeId">
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
			<el-radio-group v-model="ruleForm.isScoreReward">
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
			<el-radio-group v-model="ruleForm.isFreeShipping">
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

		<el-form-item label="是否允许老学员购买" v-if="ruleForm.deliveryMethod == 0">
			<el-radio-group v-model="ruleForm.isFreeShipping">
				<el-radio :label="0">否</el-radio>
				<el-radio :label="1">是</el-radio>
			</el-radio-group>
		</el-form-item>
		<h3>选择用户</h3>
		<div style="display: flex">
			<el-form-item label="选择用户" required>
				<el-select v-model="ruleForm.userType" placeholder="请选择" @change="userTypeChange">
					<el-option label="全部" :value="0"></el-option>
					<el-option label="指定用户" :value="1"></el-option>
					<el-option label="分组用户" :value="2"></el-option>
				</el-select>
				<el-button v-if="ruleForm.userType == 1" type="primary" style="margin-left: 15px; position: relative">
					<input class="import-btn" type="file" @change="importXlsx($event)" />
					导入</el-button
				>
			</el-form-item>
		</div>

		<el-form-item v-if="ruleForm.userType == 1" prop="userArgs">
			<el-transfer v-loading="loading" filterable filter-placeholder="请输入用户手机号" :titles="['用户列表', '已选用户']" v-model="ruleForm.userArgs" :data="userList">
				<span slot-scope="{option}">{{ option.label }} - {{ option.nickName }}</span>
			</el-transfer>
		</el-form-item>
		<div v-if="ruleForm.userType == 2">
			<el-form-item style="width: 100%" label="实名状态">
				<el-checkbox :indeterminate="useCcertificationIndeterminate" v-model="useCcertificationCheckAll" @change="useCcertificationCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.userCertification" @change="useCcertificationCheckedCitiesChange">
					<el-checkbox v-for="item in useCcertificationDict" :label="item.value" :key="item.value"> {{ item.text }}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item style="width: 100%" label="球迷会">
				<el-checkbox :indeterminate="fanClubIdIndeterminate" v-model="fanClubIdCheckAll" @change="fanClubIdCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.fanClubId" @change="fanClubIdCheckedCitiesChange">
					<el-checkbox v-for="item in fanClubList" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item style="width: 100%" label="套票类型">
				<el-checkbox :indeterminate="ticketPackageUserIndeterminate" v-model="ticketPackageUserCheckAll" @change="ticketPackageUserCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.ticketPackageUser" @change="ticketPackageUserCheckedCitiesChange">
					<el-checkbox v-for="item in ticketPackageUserDict" :label="item.value" :key="item.value"> {{ item.text }}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item style="width: 100%" label="会员等级">
				<el-checkbox :indeterminate="vipLevelIndeterminate" v-model="vipLevelCheckAll" @change="vipLevelCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.vipLevel" @change="vipLevelCheckedCitiesChange">
					<el-checkbox v-for="item in vipLevelDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item style="width: 100%" label="支云卡状态">
				<el-checkbox :indeterminate="zhiyunCardStatusIndeterminate" v-model="zhiyunCardStatusCheckAll" @change="zhiyunCardStatusCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.zhiyunCardStatus" @change="zhiyunCardStatusCheckedCitiesChange">
					<el-checkbox v-for="item in zhiyunCardStatusDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>

			<el-form-item style="width: 100%" label="青训用户">
				<el-checkbox :indeterminate="trainingStatusIndeterminate" v-model="trainingStatusCheckAll" @change="trainingStatusCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.trainingStatus" @change="trainingStatusCheckedCitiesChange">
					<el-checkbox v-for="item in trainingStatusDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</div>
		<h3>其他信息</h3>
		<el-form-item label="填写信息">
			<el-checkbox-group v-if="!editingInfoField" v-model="ruleForm.infoField" size="small" @change="infoFieldChange" > 
				<el-checkbox v-for="(item, index) in infoFieldList" :key="index" :label="item.value" border>
					{{ infoFieldIndex(item) }}
				</el-checkbox> 
			</el-checkbox-group>
			<div v-else class="flex flex-wrap ">
				<div v-for="item in infoFieldList" :key="item.value" 
					class="editing-items"> 
					<span class="mr-2">{{item.label}}</span>
					<el-button size="small" type="text"  @click="editField(item)">编辑</el-button> 
					<el-button size="small" type="text"  @click="removeField(item)">删除</el-button> 
				</div>

			</div>
			<div v-if="!!editingInfoField">
				<el-button size="small" type="primary"  @click="editingInfoField = null">结束编辑 </el-button> 

			</div>
			<div v-else>
				<el-button size="small" type="primary"  @click="infoFieldDialog = true">添加字段 </el-button> 
				<el-button size="small" type="primary"  @click="editingInfoField= true">编辑字段 </el-button> 
			</div>  
		</el-form-item>

		<el-form-item label="协议文件" v-if="ruleForm.infoField.some((el) => el == 'pact')" prop="pact">
			<div v-for="(item, i) in ruleForm.pact" :key="i" class="flex">
				<div class="mr-2 w-64">
					<el-input size="small" placeholder="请输入协议标题" v-model="item.title"> </el-input>					
				</div>
				<cl-upload
					list-type="file"
					accept="application/pdf,application/x-pdf"
					:multiple="false"
					:limit="1"
					v-model="item.file"
					text="选择协议文件"
					:on-change="
						(file) => {
							item.title = file.name && file.name.split('.')[0];
						}
					"
				></cl-upload>
				<div class="ml-2">
					<el-button size="small" @click="ruleForm.pact.splice(i, 1)">删除</el-button>
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500">*请上传pdf文件</div>
			</div>
			<el-button
				size="small"
				type="primary"
				@click="
					ruleForm.pact.push({
						title: '',
						file: ''
					})
				"
				>添加协议文件
			</el-button>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
		<el-dialog width="30%" title="添加字段" :visible.sync="infoFieldDialog" append-to-body @close="resetInfoField('infoForm')">
			
			<el-form :model="infoForm" :inline="false" :rules="infoRules" ref="infoForm" label-width="100px" class="demo-ruleForm">
				<!--<el-form-item label="英文名称" prop="value">
					<el-input size="medium" placeholder="请输入内容" v-model="infoForm.value"> </el-input>
				</el-form-item>-->
				<el-form-item label="中文名称" prop="label">
					<el-input size="medium" placeholder="请输入内容" v-model="infoForm.label"> </el-input>
				</el-form-item>
				<el-form-item label="采集形式" required>
					<el-radio-group  v-model="infoForm.formType">
						<el-radio :disabled="!!editingInfoField" label="text">文本输入</el-radio>
						<el-radio :disabled="!!editingInfoField" label="radio">单选</el-radio>
						<el-radio :disabled="!!editingInfoField" label="checkbox">多选</el-radio>
						<el-radio :disabled="!!editingInfoField" label="image" class="mt-2" >上传图片</el-radio>
						<el-radio :disabled="!!editingInfoField" label="video" class="mt-2" >上传视频</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop="selectList" label="选项" v-if="['radio', 'checkbox'].includes(infoForm.formType)" required>
					<div v-for="(item, i) in infoForm.selectList" :key="i" class="flex">
						<el-input size="medium" placeholder="请输入内容" v-model="item.label"> </el-input>
						<el-button class="mr-1" type="danger" icon="el-icon-delete" @click="infoForm.selectList.splice(i, 1)"></el-button>
					</div>
					<div>
						<el-button size="small" @click="infoForm.selectList.push({
									label:''
							})">新增选项</el-button>
					</div>
				</el-form-item>

				<el-form-item label="是否必填" prop="label" required>
					<el-radio-group style="width: 178px" v-model="infoForm.required">
						<el-radio :label="true">是</el-radio>
						<el-radio :label="false">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" @click="addInfoField('infoForm')">确定</el-button>
					<el-button size="small" v-show="!editingInfoField" @click="resetInfoField('infoForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</el-form>
</template>

<script>
import GoodsSpecSelect from '@/components/goods/spec/select';
import {couponTypeDict, ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict, trainingStatusDict} from '@/dict/index.js';

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
		label: '课时数',
		prop: 'schoolHour',
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
	name:"TrainForm",
	components: {
		GoodsSpecSelect
	},
	data() {
		return {
			... {couponTypeDict, ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict, trainingStatusDict},
			defaultColumn: [],
			commodityTypeList: [],
			salePromotionMethod: 0, //促销类型
			ruleForm: {
				userArgs: [],

				salePromotionShow: 0, //是否促销
				salePromotionMethod: [], //促销类型
				deliveryMethod: 0,
				isFreeShipping: 0,
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

				isScoreReward: 1,

				


				infoField: [],
				pact: [{
						title: '',
						file: ''
					}]
			},
			rules: {
				commodityTypeId: [
					{
						required: true,
						message: '请选择商品分类',
						trigger: 'change'
					}
				],
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
			},
			userList: [],
			userArgs: {
				userCertification: [],
				fanClubId: [],
				ticketPackageUser: [],
				vipLevel: [],
				zhiyunCardStatus: [],
				trainingStatus: []
			},
			loading:false,
			useCcertificationCheckbox: [],
			useCcertificationCheckedCities: [],
			useCcertificationIndeterminate: false,
			useCcertificationCheckAll: false,
			fanClubIdCheckbox: [],
			fanClubIdCheckedCities: [],
			fanClubIdIndeterminate: false,
			fanClubIdCheckAll: false,
			ticketPackageUserCheckbox: [],
			ticketPackageUserCheckedCities: [],
			ticketPackageUserIndeterminate: false,
			ticketPackageUserCheckAll: false,
			vipLevelCheckbox: [],
			vipLevelCheckedCities: [],
			vipLevelIndeterminate: false,
			vipLevelCheckAll: false,
			zhiyunCardStatusCheckbox: [],
			zhiyunCardStatusCheckedCities: [],
			zhiyunCardStatusIndeterminate: false,
			zhiyunCardStatusCheckAll: false,
			trainingStatusCheckbox: [],
			trainingStatusCheckedCities: [],
			trainingStatusIndeterminate: false,
			trainingStatusCheckAll: false,

			userList: [],
			infoFieldDialog: false,
			editingInfoField:false,
			infoFieldList: [
				{
					label: '姓名',
					formType: 'text',
					required: true,
					value: 'name'
				},
				{
					label: '手机号',
					formType: 'text',
					required: true,
					value: 'phone'
				},
				{
					label: '微信号',
					formType: 'text',
					required: true,
					value: 'wxAccount'
				},
				{
					label: '身份证号',
					formType: 'text',
					required: true,
					value: 'userCertificateNum'
				},
				{
					label: '邮箱',
					formType: 'text',
					required: true,
					value: 'email'
				},
				{
					label: '地址',
					formType: 'text',
					required: true,
					value: 'address'
				},
				{
					label: '性别',
					formType: 'radio',
					required: true,
					value: 'sex',
					selectList: [
						{
							label: '男',
							value: 0
						},
						{
							label: '女',
							value: 1
						}
					]
				},
				{
					label: '年龄',
					formType: 'text',
					required: true,
					value: 'age'
				},
				{
					label:'协议',
					value:'pact',
					fileList:[
						{
							file:'',
							title:''
						}
					],
					required:true
				}
			],
			infoForm: {
				label: '',
				value: '',
				formType: 'text',
				selectList: [],
				required: true
			},
			infoRules: {
				label: [
					{
						required: true,
						message: '请填写中文名称',
						trigger: 'blur'
					}
				],
				value: [
					{
						required: true,
						message: '请填写英文名称',
						trigger: 'blur'
					},
					{
						validator(rules, value, callback) {
							if ( !vm.editingInfoField && vm.infoFieldList.find(el=>el.value==value) ) {
								callback(new Error('英文名称不能与已有信息重复'));
							} else {
								callback();
							}
						}
					}
				],
				selectList: [
					{
						validator(rules, value, callback) {
							if (value.length == 0 || value.some((el) => !el.label)) {
								callback(new Error('请添加选项,并填写'));
							} else {
								callback();
							}
						}
					}
				]
			},
			ruleActivityCover: [
				{
					required: true,
					message: '请上传活动封面',
					trigger: 'blur'
				}
			],
		};
	},
	computed: {
		fanClubList() {
			let list = this.$store.state.common.fanClub;
			let arr = list?.map((value, index, array) => {
				let o = {
					value: value.id,
					text: value.fanClubName,
					fanClubRegion: value.fanClubRegion
				};
				return o;
			});
			return arr;
		}
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
	async created() {
		await this.$store.dispatch('setDefaultcolumn', specColumn);
		await this.getCommodityTypeList();
		this.useCcertificationCheckbox = useCcertificationDict.map((v) => v.value);
		this.fanClubIdCheckbox = this.fanClubList.map((v) => v.value);
		this.ticketPackageUserCheckbox = ticketPackageUserDict.map((v) => v.value);
		this.vipLevelCheckbox = vipLevelDict.map((v) => v.value);
		this.zhiyunCardStatusCheckbox = zhiyunCardStatusDict.map((v) => v.value);
		this.trainingStatusCheckbox = trainingStatusDict.map((v) => v.value);
		this.pushClubList()
	},
	methods: {
		async pushClubList(){
			let list = await this.$service.app.fanClub.list()
			const item = {
				label: '所属球迷会',
				formType: 'radio',
				required: true,
				value: 'fanClub',
				selectList: list.map(el=>({
					label:el.fanClubName,
					value:el.id
				}))
			};
			this.infoFieldList.push(item)
		},
		async userTypeChange(e) {
			console.log(e);
			if (e == 0) {
				this.ruleForm.userArgs = [];
			}
			if (e == 1) {
				await this.getUserList();
			}
		},
		async getUserList() {
			try {
				this.ruleForm.userArgs = [];
				this.loading = true;
				let res = await this.$service.app.message.transferUser();
				this.userList = res.map((value, index, array) => {
					return {
						key: Number(value.id),
						label: value.phoneNum,
						disabled: false,
						nickName: value.nickName,
						userName: value.userName
					};
				});
				this.loading = false;
				console.log(this.userList);
			} catch (error) {
				this.loading = false;
				this.$message.error(error);
			}
		},
		useCcertificationCheckAllChange(val) {
			this.userArgs.userCertification = val ? this.useCcertificationCheckbox : [];
			this.useCcertificationIndeterminate = false;
		},
		useCcertificationCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.useCcertificationCheckAll = checkedCount == this.useCcertificationCheckbox.length;
			this.useCcertificationIndeterminate = checkedCount > 0 && checkedCount < this.useCcertificationCheckbox.length;
		},
		fanClubIdCheckAllChange(val) {
			this.userArgs.fanClubId = val ? this.fanClubIdCheckbox : [];
			this.fanClubIdIndeterminate = false;
		},
		fanClubIdCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.fanClubIdCheckAll = checkedCount === this.fanClubIdCheckbox.length;
			this.fanClubIdIndeterminate = checkedCount > 0 && checkedCount < this.fanClubIdCheckbox.length;
		},
		ticketPackageUserCheckAllChange(val) {
			this.userArgs.ticketPackageUser = val ? this.ticketPackageUserCheckbox : [];
			this.ticketPackageUserIndeterminate = false;
		},
		ticketPackageUserCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.ticketPackageUserCheckAll = checkedCount === this.ticketPackageUserCheckbox.length;
			this.ticketPackageUserIndeterminate = checkedCount > 0 && checkedCount < this.ticketPackageUserCheckbox.length;
		},
		vipLevelCheckAllChange(val) {
			this.userArgs.vipLevel = val ? this.vipLevelCheckbox : [];
			this.vipLevelIndeterminate = false;
		},
		vipLevelCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.vipLevelCheckAll = checkedCount === this.vipLevelCheckbox.length;
			this.vipLevelIndeterminate = checkedCount > 0 && checkedCount < this.vipLevelCheckbox.length;
		},
		zhiyunCardStatusCheckAllChange(val) {
			this.userArgs.zhiyunCardStatus = val ? this.zhiyunCardStatusCheckbox : [];
			this.zhiyunCardStatusIndeterminate = false;
		},
		zhiyunCardStatusCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.zhiyunCardStatusCheckAll = checkedCount === this.zhiyunCardStatusCheckbox.length;
			this.zhiyunCardStatusIndeterminate = checkedCount > 0 && checkedCount < this.zhiyunCardStatusCheckbox.length;
		},
		trainingStatusCheckAllChange(val) {
			this.userArgs.trainingStatus = val ? this.trainingStatusCheckbox : [];
			this.trainingStatusIndeterminate = false;
		},
		trainingStatusCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.trainingStatusCheckAll = checkedCount === this.trainingStatusCheckbox.length;
			this.trainingStatusIndeterminate = checkedCount > 0 && checkedCount < this.trainingStatusCheckbox.length;
		},
		removeField(item){
			let i = this.infoFieldList.indexOf(item);
			this.infoFieldList.splice(i,1)
		},
		editField(item){
			this.infoForm = item;
			this.editingInfoField = item;
			this.infoFieldDialog = true
		},
		resetInfoField(formName){
			const inhert = {
				label: '',
				value: '',
				formType: 'text',
				selectList: [],
				required: true
			}
			if(!!this.editingInfoField){
				let i = this.infoFieldList.indexOf(this.infoForm);
				this.infoFieldList[i] = {  selectList:[],...this.infoForm }; 
				this.editingInfoField = inhert;
				this.infoForm = this.editingInfoField
			}else{
				this.infoForm = inhert
			}
			this.$refs[formName].resetFields();
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
			//其他信息多选
		infoFieldChange(e) {
			console.log(e);
			this.ruleForm.infoField = e;
		},
		infoFieldIndex(item){
			let index = this.ruleForm.infoField.indexOf(item.value)
			if(index >=0){
				return `${index+1}.${item.label}`
			}else{
				return item.label
			}
		},
		//获取商品分类
		async getCommodityTypeList() {
			try {
				let res = await this.$service.app.commodityType.page({
					page: 1,
					size: 999,
					commodityTypeStatus: 1
				});
				this.commodityTypeList = res.list;
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
				let { type, spec } = this.$refs['goods-spec-select'].validate();
				if (spec.sku.length < 1) {
					this.$message.error('请填写商品规格');
					return false;
				}
				if (spec.spec.length < 1) {
					this.$message.error('请填写商品规格');
					return false;
				}
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
						confirmButtonText: '确定'
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
.import-btn {
	position: absolute;
	left: 0;
	width: 70px;
	height: 40px;
	top: 0;
	opacity: 0;
	filter: alpha(opacity=0);
	cursor: pointer;
}
.editing-items {
	@apply mr-3 my-2 px-2 border-2 border-gray-300 rounded border-solid;
	cursor: grab;
} 
</style>
