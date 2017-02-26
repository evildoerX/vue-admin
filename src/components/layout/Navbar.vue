<template>
	<el-row class="header">
		<el-col :span="20" class="logo">
				<span>Vue<i class="txt">Admin</i></span>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link userinfo-inner">
					{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: ''
			}
		},
		methods: {
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
		}
	}

</script>

<style scoped lang="scss">
	.header {
			position: absolute;
			top: 0px;
			bottom: 0px;
			width: 100%;
			height: 60px;
			line-height: 60px;
			background: #1F2D3D;
			color: #c0ccda;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				.userinfo-inner {
					color: #c0ccda;
					cursor: pointer;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				font-size: 22px;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color: #20a0ff
				}
			}
		}
</style>