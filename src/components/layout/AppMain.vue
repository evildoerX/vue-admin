<template>
	<el-row class="container">
		<Navbar></Navbar>
		<Sidebar></Sidebar>
		<el-col :span="24" class="main">
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition>
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import Navbar from './Navbar'
import Sidebar from './Sidebar'
	export default {
		components:{
			Navbar,
			Sidebar
		}	
	}

</script>

<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.main {
			background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			.content-container {
				background: #f1f2f7;
				position: absolute;
				right: 0px;
				top: 0px;
				bottom: 0px;
				left: 200px;
				overflow-y: scroll;
				padding: 20px;
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>