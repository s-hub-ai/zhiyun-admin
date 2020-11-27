<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<el-form class="table-flters-form" label-position="right" label-width="85px" :inline="true" :model="tableFlters" size="mini">
				<el-form-item
					label="套票类型
				"
				>
					<el-select v-model="tableFlters.ticketPackageUser" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item, index) in ticketPackageUserDict" :key="index" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item
					label="球迷会
				"
				>
					<el-select v-model="tableFlters.fanClubId" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item, index) in fanClubList" :key="index" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item
					label="实名状态
				"
				>
					<el-select v-model="tableFlters.userCertification" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item, index) in useCcertificationDict" :key="index" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="会员等级
				"
				>
					<el-select v-model="tableFlters.vipLevel" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item, index) in vipLevelDict" :key="index" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item
					label="支云卡状态
				"
				>
					<el-select v-model="tableFlters.zhiyunCardStatus" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item, index) in zhiyunCardStatusDict" :key="index" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<cl-search-key placeholder="请输入用户姓名、手机号、套票号"></cl-search-key>
				</el-form-item>
			</el-form>

			<!-- 			<cl-flex1></cl-flex1> -->
			<!-- 		<el-button size="mini" type="primary">导出</el-button> -->
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '65vh' }">
				<!-- 头像 -->
				<template #column-avatar="{ scope }">
					<cl-avatar shape="square" size="medium" :src="scope.row.avatar | default_avatar" :style="{ margin: 'auto' }"> </cl-avatar>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-link type="primary" @click="editDialog(scope.row.id)">详情</el-link>
				</template>
				<!-- 可用积分 -->
				<template #column-availablePoints="{ scope }">
					<el-link type="primary" @click="$router.push({ path: 'PointsUseDetails', query: { id: scope.row.id } })">{{scope.row.availablePoints|default}}</el-link>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 新增编辑弹出框 -->
		<!-- 新增编辑弹出框 -->
		<el-dialog :title="addDialogTitle" :visible.sync="addDialogShow" @close="addDialogClose" width="1200px">
			<add-dialog ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import { ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
import addDialog from './detail';
export default {
	components: {
		addDialog
	},
	computed: {
		fanClubList() {
			let list = this.$store.state.common.fanClub;
			let arr = list?.map((value, index, array) => {
				let o = {
					value: value.id,
					text: value.fanClubName
				};
				return o;
			});
			return arr;
		}
	},
	data() {
		let _this = this;
		return {
			ticketPackageUserDict,
			useCcertificationDict,
			vipLevelDict,
			zhiyunCardStatusDict,
			tableFlters: { page: 1 }, //ticketPackageUser: -1, fanClubId: -1, userCertification: -1, vipLevel: -1 },
			addDialogShow: false,
			addDialogTitle: '',
			tableColumn: [
				{
					type: 'index',
					label: '编号',
					align: 'center',
					width: 50
				},
				{
					label: '头像',
					prop: 'avatar',
					align: 'center',
					width: 70
				},
				{
					label: '昵称',
					align: 'center',
					prop: 'nickName'
				},
				{
					label: '手机号',
					prop: 'phoneNum',
					align: 'center',
					width: 105
				},
				{
					label: '微信号',
					prop: 'weChatAccount',
					align: 'center'
				},
				{
					label: '套票类型',
					prop: 'ticketPackageUser',
					align: 'center',
					formatter(row) {
						let res;
						ticketPackageUserDict?.map((value) => {
							if (row.ticketPackageUser == value.value) {
								res = value.text;
							}
						});
						return res;
					},
					width: 90
				},
				{
					label: '套票号',
					prop: 'ticketPackageNum',
					align: 'center'
				},
				{
					label: '球迷会',
					prop: 'fanClubId',
					align: 'center',
					formatter(row) {
						let regionName = '-';
						_this.fanClubList?.map((value) => {
							if (row.fanClubId == value.value) {
								regionName = value.text;
							}
						});
						return regionName;
					}
				},
				{
					label: '实名状态',
					prop: 'userCertification',
					align: 'center',
					formatter(row) {
						let res;
						useCcertificationDict?.map((value) => {
							if (row.userCertification == value.value) {
								res = value.text;
							}
						});
						return res;
					},
					width: 90
				},
				{
					label: '姓名',
					prop: 'userName',
					align: 'center'
				},
				{ label: '可用积分', prop: 'availablePoints', align: 'center', sortable: true, width: 120 },
				{
					label: '累计积分',
					prop: 'accumulatedPoints',
					sortable: true,
					align: 'center',
					width: 120
				},
				{
					label: '积分排名',
					prop: 'pointsOrder',
					align: 'center',
					width: 100
				},
				{
					label: '会员等级',
					prop: 'vipLevel',
					fixed: 'right',
					align: 'center',
					width: 80,
					formatter(row) {
						let res;
						vipLevelDict?.map((value) => {
							if (row.vipLevel == value.value) {
								res = value.text;
							}
						});
						return res;
					}
				},
				{
					label: '支云卡状态',
					prop: 'zhiyunCardStatus',
					fixed: 'right',
					align: 'center',
					formatter(row) {
						let res;
						zhiyunCardStatusDict?.map((value) => {
							if (row.zhiyunCardStatus == value.value) {
								res = value.text;
							}
						});
						return res;
					},
					width: 90
				},
				{
					label: '操作',
					prop: 'op',
					align: 'center',
					fixed: 'right',
					width: 60
				}
			]
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.user.info).done();
			app.refresh({
				...this.tableFlters
			});
		},
		//编辑
		editDialog(id) {
			this.addDialogTitle = '基础信息';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
		},
		addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs['crud'].refresh();
		}
	}
};
</script>
<style lang="scss" scoped>
.table-flters-form {
	::v-deep .el-form-item {
		margin: 0 10px 10px 0;
	}
}
</style>
