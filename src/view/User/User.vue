<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column  prop="name" label="姓名"  sortable>
				</el-table-column>
				<el-table-column prop="tiezi" label="发帖数"  sortable>
				</el-table-column>
				<el-table-column prop="hf" label="回帖数"  sortable>
				</el-table-column>
				<el-table-column prop="guanzhu" label="关注圈子" sortable>
				</el-table-column>
				<el-table-column prop="haiyou" label="好友数"  sortable>
				</el-table-column>
				<el-table-column  label="操作">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">拉黑</el-button>
				</template>
			</el-table-column>
			</el-table>
		</el-col>
	</div>
</template>
<script>
	import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: [
				{
					name:'abiao',
					tiezi:'2000',
					hf:'4000',
					guanzhu:'8个圈子',
					haiyou:'16'
				},
				{
					name:'abiao1',
					tiezi:'2000',
					hf:'4000',
					guanzhu:'8个圈子',
					haiyou:'16'
				},
				{
					name:'abiao2',
					tiezi:'2000',
					hf:'4000',
					guanzhu:'8个圈子',
					haiyou:'16'
				}
				]
			}
		}
	};

</script>

<style scoped>

</style>