<template>
	<div class="app-slider">
		<div class="logo">
			<a href="https://cool-admin.com/">
				<img class="c" src="@/assets/icon/logo/silder.png" v-if="!menuCollapse" />
				<img class="z" src="@/assets/icon/logo/silder-simple.png" v-else />
			</a>
		</div>

		<div class="menu" v-if="visible">
			<deep-menu></deep-menu>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
	data() {
		return {
			visible: true
		};
	},

	computed: {
		...mapGetters(["menuList", "menuCollapse", "userInfo"])
	},

	watch: {
		menuList() {
			this.visible = false;

			setTimeout(() => {
				this.visible = true;
			}, 0);
		}
	},

	components: {
		DeepMenu: {
			computed: {
				...mapGetters(["menuList", "menuCollapse"])
			},

			methods: {
				toView(url) {
					if (url != this.$route.path) {
						this.$router.push(url);
					}
				}
			},

			render() {
				const fn = (list) => {
					return list
						.filter((e) => e.isShow !== 0)
						.map((e) => {
							let html = null;

							if (e.type == 0) {
								html = (
									<el-submenu index={String(e.id)} key={e.id}>
										<template slot="title">
											<icon-svg name={e.icon}></icon-svg>
											<span slot="title">{e.name}</span>
										</template>
										{fn(e.children)}
									</el-submenu>
								);
							} else {
								html = (
									<el-menu-item index={e.path} key={e.path}>
										<icon-svg name={e.icon}></icon-svg>
										<span slot="title">{e.name}</span>
									</el-menu-item>
								);
							}

							return html;
						});
				};

				let el = fn(this.menuList);

				return (
					<el-menu
						default-active={this.$route.path}
						collapse-transition={false}
						collapse={this.menuCollapse}
						on-select={this.toView}>
						{el}
					</el-menu>
				);
			}
		}
	},

	methods: {
		...mapMutations(["COLLAPSE_MENU"])
	}
};
</script>

<style lang="scss" scoped>
.app-slider {
	height: 100%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80px;

		.c {
			height: 30px;
			width: 193px;
		}

		.z {
			height: 30px;
			width: 30px;
		}
	}

	.menu {
		overflow-y: auto;
		height: calc(100% - 120px);

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		::v-deep.el-menu {
			border-right: 0;
			background-color: $color-main;

			&-item {
				&.is-active {
					background-color: $color-primary;
				}
			}

			.el-submenu__title,
			.el-menu-item {
				&:hover {
					background-color: $color-primary;
				}
			}

			.el-submenu {
				&.is-opened {
					background-color: #2b3043;

					.el-menu {
						background-color: #2b3043;
					}
				}
			}

			.el-submenu__title,
			&-item,
			&__title {
				color: #eee;
				letter-spacing: 0.5px;
				height: 50px;
				line-height: 50px;

				.icon-svg {
					height: 15px;
					width: 15px;
					margin: 0 15px 0 5px;
					position: relative;
					top: 1px;
				}

				span {
					font-size: 12px;
					letter-spacing: 1px;
					display: inline-block;
				}
			}

			&--collapse {
				.el-submenu__title {
					.icon-svg {
						margin-left: 2px;
						height: 19px;
						width: 19px;
					}
				}
			}
		}
	}
}
</style>
