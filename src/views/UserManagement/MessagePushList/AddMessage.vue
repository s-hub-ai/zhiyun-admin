<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<div style="max-width: 900px">
			<el-form-item label="消息标题" prop="messageTitle">
				<el-input v-model="ruleForm.messageTitle" placeholder="请输入消息标题" :maxlength="messageTitleLength" show-word-limit> </el-input>
			</el-form-item>
			<el-form-item label="消息内容" prop="messageContent">
				<el-input type="textarea" rows="5" v-model="ruleForm.messageContent" placeholder="" :maxlength="messageContentLength" show-word-limit></el-input>
			</el-form-item>
			<el-form-item class="form-item" label="推送方式" prop="pushMethod">
				<el-select v-model="ruleForm.pushMethod" placeholder="请选择" @change="pushMethodChange">
					<el-option
						v-for="item in [
							{ value: 1, text: '站内信' },
							{ value: 2, text: '短信' }
						]"
						:key="item.value"
						:label="item.text"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="form-item" label="推送时间" prop="pushTime">
				<el-date-picker v-model="ruleForm.pushTime" :picker-options="pickerOptions" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:00:00" format="yyyy-MM-dd HH:00:00">
				</el-date-picker>
			</el-form-item>
		</div>
		<p style="margin-top: 45px">选择用户</p>
		<el-divider></el-divider>
		<el-form-item label="选择用户" prop="userType">
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
		<el-form-item v-if="ruleForm.userType == 1" prop="userArgs">
			<el-transfer v-loading="loading" filterable filter-placeholder="请输入用户手机号" :titles="['用户列表', '已选用户']" v-model="ruleForm.userArgs" :data="userList">
				<span slot-scope="{ option }">{{ option.label }} - {{ option.nickName }}</span>
			</el-transfer>
		</el-form-item>
		<div v-if="ruleForm.userType == 2">
			<el-form-item label="实名状态">
				<el-checkbox :indeterminate="useCcertificationIndeterminate" v-model="useCcertificationCheckAll" @change="useCcertificationCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.userCertification" @change="useCcertificationCheckedCitiesChange">
					<el-checkbox v-for="item in useCcertificationDict" :label="item.value" :key="item.value"> {{ item.text }}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="球迷会">
				<el-checkbox :indeterminate="fanClubIdIndeterminate" v-model="fanClubIdCheckAll" @change="fanClubIdCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.fanClubId" @change="fanClubIdCheckedCitiesChange">
					<el-checkbox v-for="item in fanClubList" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="套票类型">
				<el-checkbox :indeterminate="ticketPackageUserIndeterminate" v-model="ticketPackageUserCheckAll" @change="ticketPackageUserCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.ticketPackageUser" @change="ticketPackageUserCheckedCitiesChange">
					<el-checkbox v-for="item in ticketPackageUserDict" :label="item.value" :key="item.value"> {{ item.text }}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="会员等级">
				<el-checkbox :indeterminate="vipLevelIndeterminate" v-model="vipLevelCheckAll" @change="vipLevelCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.vipLevel" @change="vipLevelCheckedCitiesChange">
					<el-checkbox v-for="item in vipLevelDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="支云卡状态">
				<el-checkbox :indeterminate="zhiyunCardStatusIndeterminate" v-model="zhiyunCardStatusCheckAll" @change="zhiyunCardStatusCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.zhiyunCardStatus" @change="zhiyunCardStatusCheckedCitiesChange">
					<el-checkbox v-for="item in zhiyunCardStatusDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</div>
		<div style="max-width: 900px; text-align: center">
			<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</div>
	</el-form>
</template>

<script>
import XLSX from 'xlsx';
import { couponTypeDict, ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
export default {
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
	data() {
		return {
			couponTypeDict,
			useCcertificationDict,
			vipLevelDict,
			ticketPackageUserDict,
			zhiyunCardStatusDict,
			pickerOptions: {
				disabledDate(time) {
					//此条为设置禁止用户选择今天之前的日期，包含今天。
					// return time.getTime() <= (Date.now());
					//此条为设置禁止用户选择今天之前的日期，不包含今天。
					return time.getTime() <= Date.now() - 24 * 60 * 60 * 1000;
				}
			},
			messageTitleLength: 50,
			messageContentLength: 800,
			ruleForm: {
				messageTitle: '',
				messageContent: '',
				pushMethod: '',
				pushTime: '',
				userArgs: [],
				userType: 0
			},
			userList: [],
			userArgs: {
				userCertification: [],
				fanClubId: [],
				ticketPackageUser: [],
				vipLevel: [],
				zhiyunCardStatus: []
			},
			rules: {
				messageTitle: [
					{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					},
					{
						min: 1,
						max: 50,
						message: '长度在 1 到 5 个字符',
						trigger: 'blur'
					}
				],
				pushMethod: [
					{
						required: true,
						message: '请选择推送方式',
						trigger: 'change'
					}
				],
				userType: [
					{
						required: true,
						message: '请选择',
						trigger: 'change'
					}
				],
				messageContent: [
					{
						required: true,
						message: '请填写消息内容',
						trigger: 'blur'
					}
				],
				userArgs: [
					{
						required: true,
						message: '请选择用户',
						trigger: 'blur'
					}
				],
				pushTime: [
					{
						required: true,
						message: '请选择推送时间',
						trigger: 'blur'
					}
				]
			},
			loading: false,
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
			zhiyunCardStatusCheckAll: false
		};
	},
	created() {
		this.useCcertificationCheckbox = useCcertificationDict.map((v) => v.value);
		this.fanClubIdCheckbox = this.fanClubList.map((v) => v.value);
		this.ticketPackageUserCheckbox = ticketPackageUserDict.map((v) => v.value);
		this.vipLevelCheckbox = vipLevelDict.map((v) => v.value);
		this.zhiyunCardStatusCheckbox = zhiyunCardStatusDict.map((v) => v.value);
	},
	methods: {
		//
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
		importXlsx(e) {
			let _this = this;
			console.log(e);
			let files = e.target.files;
			for (let i = 0; i < files.length; i++) {
				let reader = new FileReader();
				let name = files[i].name;
				reader.onload = function (e) {
					let data = e.target.result;
					let workbook = XLSX.read(data, {
						type: typeof FileReader !== 'undefined' && (FileReader.prototype || {}).readAsBinaryString ? 'binary' : 'array'
					});
					let workbookSheets = workbook.Sheets;
					for (let sheet in workbookSheets) {
						if (workbookSheets.hasOwnProperty(sheet)) {
							//	fromTo = workbookSheets[sheet]['!ref'];
							let xlsxData = XLSX.utils.sheet_to_json(workbookSheets[sheet]);
							// 结果数组
							console.log(sheet);
							console.log(xlsxData);
							let ids = [];
							xlsxData.map((value) => {
								let phone = String(value.手机号);
								console.log(phone);
								phone = phone.replace(/\s+/g, '');
								ids.push(phone);
							});
							_this.getUserIds(ids);
						}
					}
				};
				reader.readAsBinaryString(files[i]);
			}
		},
		//
		pushMethodChange(e) {
			if (e == 1) {
				this.messageTitleLength = 50;
				this.messageContentLength = 500;
			} else if (e == 2) {
				this.messageTitleLength = 15;
				this.messageContentLength = 35;
			}
		},
		//
		async getUserIds(ids) {
			try {
				let res = await this.$service.app.message.importUser({ ids });
				this.ruleForm.userArgs = res.map((value) => {
					return Number(value.id);
				});
				console.log(this.ruleForm.userArgs);
			} catch (error) {
				this.$message.error(error);
			}
		},
		//
		submitForm(formName) {
			console.log(this.ruleForm);
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						let params = {
							...this.ruleForm
						};
						if (params.userType == 2) {
							let isNull = true;
							for (const key in this.userArgs) {
								if (this.userArgs[key].length > 0) {
									isNull = false;
								}
							}
							if (isNull) {
								this.$message.error('请至少勾选一种用户分类！');
								return false;
							}
							params.userArgs = JSON.stringify(this.userArgs);
						}
						if (params.userType == 1) {
							params.userArgs = params.userArgs.toString();
						}
						if (params.userType == 0) {
							delete params.userArgs;
						}
						await this.$service.app.message.add(params);
						this.$emit('update:addDialogShow', false);
						this.$message({
							message: '创建成功',
							type: 'success'
						});
					} catch (error) {
						this.$message.error(error);
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		//用户选择下拉
		async userTypeChange(e) {
			console.log(e);
			if (e == 0) {
				this.ruleForm.userArgs = [];
			}
			if (e == 1) {
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
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.box-card {
	overflow-y: auto;
}

.form-item {
	::v-deep .el-input {
		min-width: 300px;
	}
}

::v-deep .el-transfer-panel {
	width: 300px;
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
</style>
