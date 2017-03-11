<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-cascader
  					:options="options"
					v-model="selectedOptions3">
					</el-cascader>
				</el-cascader>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="帖子标题"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<el-table-column type="expand">
					<template scope="props">
				        <el-form label-position="left" inline class="demo-table-expand" style="margin-left: 100px">
				          <el-form-item label="帖子详情">
				            <span>{{ props.row.disc }}</span>
				          </el-form-item>
				        </el-form>
				    </template>
	    		</el-table-column>
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column fixed prop="title" label="帖子标题" width="120" >
				</el-table-column>
				<el-table-column prop="auth" label="作者" width="120" >
				</el-table-column>
				<el-table-column prop="time" label="发帖时间" width="100">
				</el-table-column>
				<el-table-column prop="disc" label="帖子内容" width="180" >
				</el-table-column>
				<el-table-column prop="hfnum" label="回复数" width="120" >
				</el-table-column>
				<el-table-column prop="stage" label="状态" min-width="180" >
				</el-table-column>
				<el-table-column prop="jb" label="状态" min-width="180" >
				</el-table-column>
				<el-table-column prop="tj" label="状态" min-width="180" >
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="400">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">加精</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">置顶</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">热帖</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">拉黑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!-- 分页条 -->
		<el-col :span="24" class="toolbar">
		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage4"
		      :page-sizes="[100, 200, 300, 400]"
		      :page-size="100"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="400">
		    </el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/user';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				options: [{
		          value: 'zhinan',
		          label: '板块1',
		          children: [{
		            value: 'shejiyuanze',
		            label: '圈子1-1',
		          }, {
		            value: 'daohang',
		            label: '圈子1-2',
		          }]
		        }, {
		          value: 'zujian',
		          label: '板块2',
		          children: [{
		            value: 'basic',
		            label: '圈子2-1',
		          }, {
		            value: 'form',
		            label: '圈子2-2',
		          }, {
		            value: 'data',
		            label: '圈子2-3',
		          }, {
		            value: 'others',
		            label: '圈子2-4',
		          }]
		        }, {
		          value: 'ziyuan',
		          label: '板块3',
		          children: [{
		            value: 'axure',
		            label: '圈子3-1'
		          }, {
		            value: 'sketch',
		            label: '圈子3-2'
		          }, {
		            value: 'jiaohu',
		            label: '圈子3-3'
		          }]
		        }],
		        selectedOptions3: ['zhinan', 'shejiyuanze'],
		        props: {
		          value: 'label',
		          children: 'cities'
		        },
				currentPage4: 1,
				users: [
				{
					id:'1',
					title:'帖子标题1',	
					time:'2017.03.11',
					auth:'作者',
					disc:'这是一个10个字的帖子简述',
					hfnum:'2016',
					stage:'已审核，审核人xxx',
					jb:'举报次数',
					tj:'推荐加精'
				},
				{
					id:'2',
					title:'帖子标题2',	
					time:'2017.03.11',
					auth:'作者',
					disc:'这是一个10个字的帖子简述',
					hfnum:'2016',
					stage:'已审核，审核人xxx',
					jb:'举报次数',
					tj:'推荐加精'
				},
				{
					id:'3',
					title:'帖子标题3',	
					time:'2017.03.11',
					auth:'作者',
					disc:'这是一个10个字的帖子简述',
					hfnum:'2016',
					stage:'已审核，审核人xxx',
					jb:'举报次数',
					tj:'推荐加精'
				}
				],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			handleItemChange(val) {
		        console.log('active item:', val);
		        setTimeout(_ => {
		          if (val.indexOf('板块1') > -1 && !this.options1[0].cities.length) {
		            this.options1[0].cities = [{
		              label: '圈子 1-1',
		              label: '圈子 1-2',
		              label: '圈子 1-3'
		            }];
		          } else if (val.indexOf('板块2') > -1 && !this.options2[0].cities.length) {
		            this.options2[0].cities = [{
		              label: '圈子 2-1',
		              label: '圈子 2-2',
		              label: '圈子 2-3'
		            }];
		          } else if (val.indexOf('板块3') > -1 && !this.options3[0].cities.length) {
		            this.options3[0].cities = [{
		              label: '圈子 3-1',
		              label: '圈子 3-2',
		              label: '圈子 3-3'
		            }];
		          }
		        }, 300);
		      },
			handleSizeChange(val) {
        		console.log(`每页 ${val} 条`);
      		},
		    handleCurrentChange(val) {
		      this.currentPage = val;
		      console.log(`当前页: ${val}`);
		    },
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						NProgress.done();
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								NProgress.done();
								this.$notify({
									title: '成功',
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								NProgress.done();
								this.$notify({
									title: '成功',
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						NProgress.done();
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		}
	}

</script>

<style scoped>

</style>