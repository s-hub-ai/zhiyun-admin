<template>
	<div class="system-conf">
		<el-form size="mini" label-width="150px">
			<el-tabs type="card">
				<el-tab-pane v-for="(item, index) in list" :key="index" :label="item.label">
					<component :is="item.name" />
				</el-tab-pane>
			</el-tabs>

			<el-row type="flex" class="footer">
				<el-button size="mini" type="primary" @click="save" :loading="loading"
					>保存</el-button
				>
				<el-button size="mini" @click="reset">重置</el-button>
			</el-row>
		</el-form>
	</div>
</template>

<script>
import ConfParams from "@/components/conf/params";
import Logistics from "@/components/conf/logistics";
import Sms from "@/components/conf/sms";
import Wechat from "@/components/conf/wechat";
import WechatPay from "@/components/conf/wechat-pay";
import AliPay from "@/components/conf/ali-pay";
import Oss from "@/components/conf/oss";
import Order from "@/components/conf/order";

export default {
	components: {
		ConfParams,
		Logistics,
		Sms,
		Wechat,
		WechatPay,
		AliPay,
		Oss,
		Order
	},

	provide() {
		return {
			form: this.conf
		};
	},

	data() {
		return {
			list: [
				{
					name: "logistics",
					label: "物流配置"
				},
				{
					name: "sms",
					label: "短信配置"
				},
				{
					name: "wechat",
					label: "微信配置"
				},
				{
					name: "wechat-pay",
					label: "微信支付配置"
				},
				{
					name: "ali-pay",
					label: "支付宝支付配置"
				},
				{
					name: "oss",
					label: "OSS配置"
				},
				{
					name: "order",
					label: "订单配置"
				}
			],
			conf: {
				wxOpen: {
					wxOpenAccess: {
						appid: "",
						secret: ""
					}
				},
				wxMini: {
					wxMiniAccess: {
						appid: "",
						secret: ""
					}
				},
				wxMp: {
					wxMpAccess: {
						appid: "",
						secret: ""
					}
				},
				logistics: {
					logisticsAppCode: ""
				},
				aliPay: {
					payAli: {
						appId: "",
						notifyUrl: "",
						sandbox: false,
						sinType: "RSA2"
					},
					payAliPrivate: "",
					payAliPublic: ""
				},
				wxPay: {
					payWx: {
						mchid: "",
						partnerKey: "",
						notify_url: ""
					}
				},
				order: {
					orderClose: "1",
					orderConfirm: "15"
				},
				oss: {
					ossAccessKeyId: "",
					ossAccessKeySecret: "",
					ossBucket: "",
					ossEndpoint: "",
					ossTimeout: ""
				},
				sms: {
					smsSignName: "",
					smsAccessKeyId: "",
					smsAccessSecret: "",
					smsVerifyTemplate: {
						code: "",
						template: ""
					}
				}
			},
			loading: false
		};
	},

	created() {
		this.$service.system.conf.all().then((res) => {
			try {
				res.wxPay.payWx = JSON.parse(res.wxPay.payWx);
				res.aliPay.payAli = JSON.parse(res.aliPay.payAli);
				res.wxMini.wxMiniAccess = JSON.parse(res.wxMini.wxMiniAccess);
				res.wxMp.wxMpAccess = JSON.parse(res.wxMp.wxMpAccess);
				res.wxOpen.wxOpenAccess = JSON.parse(res.wxOpen.wxOpenAccess);
				res.sms.smsVerifyTemplate = JSON.parse(res.sms.smsVerifyTemplate);
				res.sms.smsVerifyTemplate.template = JSON.stringify(
					res.sms.smsVerifyTemplate.template
				);
			} catch (e) {
				console.error(e);
			}

			Object.assign(this.conf, res);
		});
	},

	methods: {
		save() {
			this.loading = true;

			let d = _.cloneDeep(this.conf);

			d.wxPay.payWx = JSON.stringify(d.wxPay.payWx);
			d.aliPay.payAli = JSON.stringify(d.aliPay.payAli);
			d.wxMini.wxMiniAccess = JSON.stringify(d.wxMini.wxMiniAccess);
			d.wxMp.wxMpAccess = JSON.stringify(d.wxMp.wxMpAccess);
			d.wxOpen.wxOpenAccess = JSON.stringify(d.wxOpen.wxOpenAccess);

			try {
				d.sms.smsVerifyTemplate.template = JSON.parse(d.sms.smsVerifyTemplate.template);
			} catch (e) {
				d.sms.smsVerifyTemplate.template = {
					code: "验证码"
				};
			}

			d.sms.smsVerifyTemplate = JSON.stringify(d.sms.smsVerifyTemplate);

			this.$service.system.conf
				.save(d)
				.then(() => {
					this.$message.success("保存成功");
				})
				.catch((err) => {
					this.$message.error(err);
				})
				.done(() => {
					this.loading = false;
				});
		},

		reset() {
			Object.assign(this.conf, {
				wxOpen: {
					wxOpenAccess: {
						appid: "",
						secret: ""
					}
				},
				wxMini: {
					wxMiniAccess: {
						appid: "",
						secret: ""
					}
				},
				wxMp: {
					wxMpAccess: {
						appid: "",
						secret: ""
					}
				},
				logistics: {
					logisticsAppCode: ""
				},
				aliPay: {
					payAli: {
						appId: "",
						notifyUrl: "",
						sandbox: false,
						sinType: "RSA2"
					},
					payAliPrivate: "",
					payAliPublic: ""
				},
				wxPay: {
					payWx: {
						mchid: "",
						partnerKey: "",
						notify_url: ""
					}
				},
				order: {
					orderClose: "1",
					orderConfirm: "15"
				},
				oss: {
					ossAccessKeyId: "",
					ossAccessKeySecret: "",
					ossBucket: "",
					ossEndpoint: "",
					ossTimeout: ""
				},
				sms: {
					smsSignName: "",
					smsAccessKeyId: "",
					smsAccessSecret: "",
					smsVerifyTemplate: {
						code: "",
						template: ""
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.system-conf {
	background-color: #fff;

	.el-form {
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
	}

	::v-deep.el-tabs {
		height: calc(100% - 50px);

		&__content {
			height: calc(100% - 55px);
		}

		.el-tab-pane {
			height: 100%;
		}
	}

	.footer {
		padding-top: 10px;
		margin-top: 10px;
		border-top: 1px solid #eee;
	}
}
</style>
