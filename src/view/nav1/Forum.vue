<template>
	<div>
				<el-tree
  :data="users"
  :props="defaultProps"
  :load="getsubUser"
  lazy
  show-checkbox
  @check-change="handleCheckChange"
  :render-content="renderContent">
</el-tree>
	</div>
</template>
<script>
	import { getforumList, getsubforumList } from '../../api/forum.js';
	import NProgress from 'nprogress';
	export default {
		data() {
			return {
				filters: {
					appkey: 'sbmi2c08nvu5ey3ni4pwxkfbkrfszthu',
					channel:'0'
				},
				loading: false,
				users: [
				],
				subusers:[],
				defaultProps: {
					children: 'children',
					label: 'name',
					id:'id'
				}
			}
		},
		methods: {
			handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
			//获取用户列表
			async getUser (){
				let para = {
					appkey: this.filters.appkey,
					channel: this.filters.channel
				};
				this.loading = true;
				NProgress.start();
				let res = await getforumList(para);
				this.users = res.data;
				this.loading = false;
				NProgress.done();
			},
			async getsubUser (){
				let para = {
					appkey: this.filters.appkey,
					channel: this.filters.channel,
					parent_id: 1
				};
				this.loading = true;
				NProgress.start();
				let res = await getsubforumList(para);
				this.subusers = res.data;
				console.log(subusers);
				this.loading = false;
				NProgress.done();
			},
		// 	async loadNode(node, resolve) {
		// 		let para = {
		// 			appkey: this.filters.appkey,
		// 			channel: this.filters.channel,
		// 			parent_id: node
		// 		};
		// 		this.loading = true;
		// 		NProgress.start();
		// 		let res = await getsubforumList(para);
		// 		var data = res.data;
		// 		this.loading = false;
		// 		NProgress.done();
		// 		resolve(data);
		// },
			renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data) }>添加子板块</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
            </span>
          </span>);
      }
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>

</style>
