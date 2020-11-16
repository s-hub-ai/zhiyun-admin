<template>
	<div class="conf-params">
		<div class="container">
			<el-form size="mini" label-width="150px">
				<!-- 物流 -->
				<el-divider content-position="left">物流配置</el-divider>

				<el-form-item label="appcode">
					<el-input
						v-model="form.logistics.logisticsAppCode"
						placeholder="appcode"
					></el-input>
				</el-form-item>

				<!-- 短信 -->
				<el-divider content-position="left">短信配置</el-divider>

				<el-form-item label="名称">
					<el-input v-model="form.sms.smsSignName" placeholder="请填写名称"></el-input>
				</el-form-item>
				<el-form-item label="key">
					<el-input v-model="form.sms.smsAccessKeyId" placeholder="key"></el-input>
				</el-form-item>
				<el-form-item label="secret">
					<el-input v-model="form.sms.smsAccessSecret" placeholder="secret"></el-input>
				</el-form-item>

				<el-row type="flex" :gutter="10">
					<el-col :span="12">
						<el-form-item label="模板ID">
							<el-input
								v-model="form.sms.smsVerifyTemplate.code"
								placeholder="code"
							></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="模板内容">
							<el-input
								v-model="form.sms.smsVerifyTemplate.template"
								placeholder="template"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 微信 -->
				<el-divider content-position="left">微信配置</el-divider>

				<el-form-item label="开放平台">
					<el-row type="flex" :gutter="10">
						<el-col :span="12">
							<el-input
								v-model="form.wxOpen.wxOpenAccess.appid"
								placeholder="appid"
							></el-input>
						</el-col>
						<el-col :span="12">
							<el-input
								v-model="form.wxOpen.wxOpenAccess.secret"
								placeholder="appsecret"
							></el-input>
						</el-col>
					</el-row>
				</el-form-item>

				<el-form-item label="小程序">
					<el-row type="flex" :gutter="10">
						<el-col :span="12">
							<el-input
								v-model="form.wxMini.wxMiniAccess.appid"
								placeholder="appid"
							></el-input>
						</el-col>
						<el-col :span="12">
							<el-input
								v-model="form.wxMini.wxMiniAccess.secret"
								placeholder="appsecret"
							></el-input>
						</el-col>
					</el-row>
				</el-form-item>

				<el-form-item label="公众号">
					<el-row type="flex" :gutter="10">
						<el-col :span="12">
							<el-input
								v-model="form.wxMp.wxMpAccess.appid"
								placeholder="appid"
							></el-input>
						</el-col>
						<el-col :span="12">
							<el-input
								v-model="form.wxMp.wxMpAccess.secret"
								placeholder="appsecret"
							></el-input>
						</el-col>
					</el-row>
				</el-form-item>

				<!-- 微信支付 -->
				<el-divider content-position="left">微信支付配置</el-divider>

				<el-form-item label="商务号">
					<el-input v-model="form.wxPay.payWx.mchid" placeholder="mchid"></el-input>
				</el-form-item>

				<el-form-item label="密钥">
					<el-input
						v-model="form.wxPay.payWx.partnerKey"
						placeholder="partnerKey"
					></el-input>
				</el-form-item>

				<el-form-item label="回调地址">
					<el-input
						v-model="form.wxPay.payWx.notify_url"
						placeholder="notify_url"
					></el-input>
				</el-form-item>

				<!-- 支付宝支付 -->
				<el-divider content-position="left">支付宝支付配置</el-divider>

				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="appId">
							<el-input
								v-model="form.aliPay.payAli.appId"
								placeholder="appId"
							></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="notifyUrl">
							<el-input
								v-model="form.aliPay.payAli.notifyUrl"
								placeholder="notifyUrl"
							></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="sandbox">
							<el-switch v-model="form.aliPay.payAli.sandbox"></el-switch>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="sinType">
							<el-select v-model="form.aliPay.payAli.sinType">
								<el-option value="RSA2" label="RSA2"></el-option>
								<el-option value="RSA" label="RSA"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item label="private key">
					<el-input
						v-model="form.aliPay.payAliPrivate"
						placeholder="PRIVATE KEY"
						type="textarea"
						rows="5"
					></el-input>
				</el-form-item>

				<el-form-item label="public key">
					<el-input
						v-model="form.aliPay.payAliPublic"
						placeholder="PUBLIC KEY"
						type="textarea"
						rows="5"
					></el-input>
				</el-form-item>

				<!-- OSS -->
				<el-divider content-position="left">OSS</el-divider>

				<el-form-item label="AccessKeyId">
					<el-input
						v-model="form.oss.ossAccessKeyId"
						placeholder="AccessKeyId"
					></el-input>
				</el-form-item>

				<el-form-item label="AccessKeySecret">
					<el-input
						v-model="form.oss.ossAccessKeySecret"
						placeholder="AccessKeySecret"
					></el-input>
				</el-form-item>

				<el-form-item label="Bucket">
					<el-input v-model="form.oss.ossBucket" placeholder="Bucket"></el-input>
				</el-form-item>

				<el-form-item label="Endpoint">
					<el-input v-model="form.oss.ossEndpoint" placeholder="Endpoint"></el-input>
				</el-form-item>

				<el-form-item label="Timeout">
					<el-input v-model="form.oss.ossTimeout" placeholder="Timeout"></el-input>
				</el-form-item>

				<!-- 订单 -->
				<el-divider content-position="left">订单配置</el-divider>

				<el-form-item label="确认时间（天）">
					<el-input-number
						v-model="form.order.orderConfirm"
						:min="1"
						:max="30"
					></el-input-number>
				</el-form-item>

				<el-form-item label="关闭时间（天）">
					<el-input-number
						v-model="form.order.orderClose"
						:min="1"
						:max="30"
					></el-input-number>
				</el-form-item>
			</el-form>
		</div>

		<el-row type="flex" class="footer">
			<el-button size="mini" type="primary" @click="save" :loading="loading">保存</el-button>
			<el-button size="mini" @click="reset">重置</el-button>
		</el-row>
	</div>
</template>

<script>
import _ from "lodash";

export default {
	data() {
		return {
			loading: false,
			form: {
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
			}
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

			this.form = res;
		});
	},

	methods: {
		save() {
			this.loading = true;

			let d = _.cloneDeep(this.form);

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
			this.form = {
				wxOpen: {
					appid: "",
					secret: ""
				},
				wxMini: {
					appid: "",
					secret: ""
				},
				wxMp: {
					appid: "",
					secret: ""
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
				pay: {
					payWx: "{}"
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
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.conf-params {
	height: 100%;

	.container {
		height: calc(100% - 50px);
		overflow: hidden auto;
		padding-right: 10px;
	}

	.footer {
		padding-top: 10px;
		margin-top: 10px;
		border-top: 1px solid #eee;
	}
}
</style>
