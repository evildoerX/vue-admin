<template>
	<section>
		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="id" width="60">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getforumList } from '../../api/forum.js';
	import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					appkey: 'm1ojbb3htzfubkfezgdw0e0jig07tfcf',
					channel:'0'
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
			//获取用户列表
			getUser: function () {
				let para = {
					appkey: this.filters.appkey,
					channel: this.filters.channel
				};
				this.loading = true;
				NProgress.start();
				getforumList(para).then((res) => {
					this.users = res.data.items;
					console.log(users);
					this.loading = false;
					NProgress.done();
				});
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>

</style>