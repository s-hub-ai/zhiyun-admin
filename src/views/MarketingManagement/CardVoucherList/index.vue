<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<el-form class="table-form" :inline="true" :model="tableFlters" size="mini">
				<el-form-item label="卡券类型">
					<el-select style="width: 120px" v-model="tableFlters.couponType" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option v-for="item in couponTypeDict" :key="item.value" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<cl-search-key placeholder="请输入卡券名称"></cl-search-key>
				</el-form-item>
			</el-form>

			<cl-flex1></cl-flex1>
			<el-button type="primary" size="mini" @click="addDialogShow = true">新增卡券</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<template #column-denominationalValue="{ scope }">
					<div v-if="scope.row.couponType == 0">满{{ scope.row.fullNum }}减{{ scope.row.reduceNum }}</div>
					<div v-if="scope.row.couponType == 1">立减{{ scope.row.denominationalValue }}</div>
					<div v-if="scope.row.couponType == 3">商品立减{{ scope.row.denominationalValue }}</div>
					<div v-if="scope.row.couponType == 2">{{ scope.row.costRatio }}折</div>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button type="text" @click="detailDialogShow = true">详情</el-button>
					<!-- <el-button type="text" @click="editDialog(scope.row.id)">编辑</el-button> -->
					<el-button type="text" @click="deleteFn(scope.row.id)">删除</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 新增编辑弹出框 -->
		<el-dialog title="新增消息" :visible.sync="addDialogShow" width="1000px" @close="addDialogClose">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>

		<!-- 详情弹出框 -->
		<el-dialog title="推送详情" :visible.sync="addDialogDetailShow" width="1000px" @close="detailDialogClose">
			<detail-dialog ref="detailDialog" :addDialogShow.sync="addDialogDetailShow"></detail-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './AddCardVoucher';
import detailDialog from './CardVoucherDetail';
import { couponTypeDict } from '@/dict';
export default {
	components: {
		addDialog,
		detailDialog
	},
	data() {
		return {
			couponTypeDict,
			addDialogShow: false,
			addDialogDetailShow: false,
			tableFlters: {
				couponType: -1
			},
			userList: [],
			userArgs: {
				userCertification: 0,
				userType: 0,
				fanClubId: 0,
				ticketPackageUser: 0,
				vipLevel: 0,
				zhiyunCardStatus: 0
			},
			//
			tableColumn: [
				{
					type: 'index',
					align: 'center',
					label: '编号'
				},
				{
					label: '卡券名称',
					prop: 'couponName',
					align: 'center'
				},
				{
					label: '卡券类型',
					align: 'center',
					width: 80,
					prop: 'couponType',
					formatter(row) {
						let res = '-';
						couponTypeDict.map((value, index, array) => {
							if (row.couponType == value.value) {
								res = value.text;
							}
						});
						return res;
					}
				},

				{
					label: '面值',
					prop: 'denominationalValue',
					align: 'center'
				},
				{
					label: '有效期开始时间',
					prop: 'validityPeriodStartTime',
					align: 'center'
				},
				{
					label: '有效期结束时间',
					prop: 'validityPeriodEndTime',
					align: 'center'
				},
				{
					label: '发放数量',
					prop: 'peopleNum',
					width: 80,
					align: 'center'
				},
				{
					label: '操作',
					width: 180,
					fixed: 'right',
					align: 'center',
					prop: 'op'
				}
			]
		};
	},
	methods: {
		//删除
		deleteFn(id) {
			this.$confirm('此操作将删除该优惠券, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					await this.$service.app.coupon.update({ id, isDeleted: 1 });
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.$refs['crud'].refresh();
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		//编辑
		editDialog(id) {
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.coupon).done();
			app.refresh();
		},
		addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs['crud'].refresh();
		},
		detailDialogClose() {
			this.$refs.detailDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		}
	}
};
</script>
<style scoped lang="scss">
.table-form {
	::v-deep .el-form-item {
		margin: 0 10px 0 0;
	}
}
</style>
