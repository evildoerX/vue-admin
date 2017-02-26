<template>
	<aside class="sidebar">
		<p class="menu-label">
      		服务或者项目名称
    	</p>
		<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
			theme="dark" unique-opened router>
			<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden" :key="">
				<el-submenu :index="index+''" v-if="!item.leaf">
					<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
					<el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden">
						{{child.name}}
					</el-menu-item>
				</el-submenu>
				<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
					<i :class="item.iconCls"></i>
					{{item.children[0].name}}
				</el-menu-item>
			</template>
		</el-menu>
	</aside>
</template>

<script>
	export default {
		methods: {
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			}
		}
	}

</script>

<style scoped lang="scss">
.sidebar {
	position: fixed;
	top: 60px;
	left: 0;
	bottom: 0;
	// padding: 20px 0 50px;
	width: 200px;
	min-width: 45px;
	max-height: 100vh;
	height: calc(100% - 50px);
	z-index: 1024 - 1;
	background: #324157;
	box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
	overflow-y: auto;
	overflow-x: hidden;
	.menu-label {
    color: #fff;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 5px;
    font-size: 14px;
  }
}
</style>