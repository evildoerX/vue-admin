<template>
<el-row>
  <el-col :span="6">
	<el-card class="box-card" style="margin:10px">
		<div slot="header" class="clearfix">
			<span style="line-height: 36px;">用户IP</span>
		</div>
		<div class="text item">
			1000
		</div>
	</el-card>
  </el-col>
  <el-col :span="6">
	<el-card class="box-card" style="margin:10px">
		<div slot="header" class="clearfix">
			<span style="line-height: 36px;">用户PV</span>
		</div>
		<div  class="text item">
			90000
		</div>
	</el-card>
  </el-col>
  <el-col :span="6">
	<el-card class="box-card" style="margin:10px">
		<div slot="header" class="clearfix">
			<span style="line-height: 36px;">发帖量</span>
		</div>
		<div class="text item">
			3000
		</div>
	</el-card>
  </el-col>
  <el-col :span="6">
	<el-card class="box-card" style="margin:10px">
		<div slot="header" class="clearfix">
			<span style="line-height: 36px;">回帖量</span>
		</div>
		<div  class="text item">
			30000
		</div>
	</el-card>
  </el-col>
</el-row>

	
</template>

<script>
	export default {
	}

</script>

<style scoped>
.card {
	margin:10 10 10 10;
}

</style>