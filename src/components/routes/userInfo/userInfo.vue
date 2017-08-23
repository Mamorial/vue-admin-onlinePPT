<template>
	<div class="index-info">
		<div class="index-info-search">
			<el-input placeholder="请输入电话" v-model="userPhone">
			   <el-button slot="append" @click="search" icon="search"></el-button>
			</el-input>
		</div>
		<div class="index-info-table">
			<table border="0" cellpadding="0" cellspacing="1">
				<thead>
					<tr>
						<td>手机号</td>
						<td>昵称</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in users">
						<td>{{item.mobile}}</td>
						<td>{{item.nickname}}</td>
						<td>
						<el-button type="primary" @click="userDetail(item.id)">查看详情</el-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="textLight spaceFixedTop">
			<Paginate ref="page" :params="params" @paginateInitChange="paginateInitChange"/>
        </div>
	</div>
</template>

<script>
	import router from '../../../main.js';
	import * as common from '../../../assets/js/public.js';
	export default({
		data() {
			return {
				userPhone: '',
				users: [],
				params:{
		            url:'/admin/users/',
		            pageSize:5,
		            pageNo:1,
		         },
	         	current: 1
			}
		},
		mounted() {
//			this.init()
		},
		methods: {
			//分页
			paginateInitChange (rows,current) {   //分页
		        this.users = rows;
		        this.current = current;
		     },
			//初始化
			init: function() {
				let self = this;
				common.Ajax({
		          url:'/admin/users/',
		          method: 'GET',
		          callback:function (data) {
					console.log(data);
					self.users = data.rows;
		          }
		        });
			},
			//用户详情
			userDetail: function(id) {
				router.push('/userInfo/detail/'+id)
			},
			//搜索用户
			search: function() {
				let mobile = this.userPhone;
				let self = this
				console.log(mobile)
				common.Ajax({
		          url:'/admin/users/?mobile=' + mobile,
		          method: 'GET',
		          callback:function (data) {
		          	console.log(data)
		          	if(data.code == 100) {
		          		self.users = data.rows;
		          		self.$message({
				          message: '查询成功',
				          type: 'success'
				        });
		          	}

		          }
		        })
			}
		}
	})
</script>

<style>
	.index-info{
		width: 80%;
		height: auto;
		margin: auto;
	}
	.index-info-search{
		width: 50%;
		height: auto;
		padding: 100px 0 0 100px;
		overflow: hidden;
		margin: 0;
	}
	.index-info-search input{
		float: left
	}
	.index-info-table{
		width: 100%;
		height: 350px;
		overflow: hidden;
	}
	.index-info-table table{
		width: 100%;
		margin-top: 30px;
	}
	.index-info-table table tr td{
		padding: 10px;
		text-align: center;
	}
</style>