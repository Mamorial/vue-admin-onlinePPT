<template>
	<div class="index-modal">
		<div class="index-modal-list">
			<ul id="modalList" v-for="item in items">
				<li @click="selectTag(item.id)" :class="item.selected?'selectedTag':'noselectedTag'">
					{{item.name}}
				</li>
			</ul>
		</div>
		<div class="index-modal-listContent">
			<table border="0" cellpadding="0" cellspacing="1">
				<thead>
					<tr>
						<td>选择</td>
						<td>缩略图</td>
						<td>上传时间</td>
						<td>上传人</td>
						<td>标签</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="con in modalContens">
						<td><!--<el-radio class="radio" :label="con.id" v-model="radio">&nbsp;</el-radio>--><el-checkbox :label="con.id" @change="checkTag(con.id)">&nbsp;</el-checkbox></td>
						<td><img :src="con.imageUrl" /></td>
						<td>{{con.createTime}}</td>
						<td>{{con.name}}</td>
						<td><el-tag v-for="tag in con.tagName" type="success">{{tag}}</el-tag></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="index-modal-button">
			<div class="textLight spaceFixedTop">
				<Paginate ref="page" :params="params" @paginateInitChange="paginateInitChange"/>
		    </div>
			<el-button @click="modalEdit">新建</el-button>
			<el-button @click="deleteBtn">删除</el-button>
		</div>
	</div>
</template>

<script>
	import router from '../../../main.js';
	import * as common from '../../../assets/js/public.js';
	export default({
		data() {
			return {
				radio: '1',
				dialogFormVisible: false,
				listId: '',
				checkTagNum: [],
				checked: false,
				tags: [],
				modalContens: [{
					src: '',
					id: 1,
					checked: false,
					date: '2017/8/4',
					user: 'zhangsan',
					tag: ['产品推广', '企业培训']
				},{
					src: '',
					id: 2,
					checked: false,
					date: '2017/8/4',
					user: 'zhangsan',
					tag: ['产品推广', '企业培训']
				}],
				form: {
			          name: ''
			        },
				items: [{
					id: null,
					name: '全部',
					selected: true
				}],
				params:{
		            url:'/admin/pptTemps/',
		            pageSize:5,
		            pageNo:1,
		         },
	         	current: 1
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			//分页
			paginateInitChange (rows,current) {   //分页
				rows.map(function(v, i, a) {
					v.selected = false;
//					console.log(v)
					let date = v.createTime;
					let tags = [];
					date = new Date(date).toLocaleString();
					v.createTime = date;
					if(typeof v.tagName === 'string') {
						tags = v.tagName.split(",");
						if(tags[tags.length - 1] == '') {
							tags.pop()
						}
						v.tagName = tags;
					}


				});
		        this.modalContens = rows;
		        console.log(this.modalContens)
		        this.current = current;
		     },
			//初始化  标签
			init: function() {
				let self = this;
				common.Ajax({
		          url:'/admin/pptTags/',
		          method: 'GET',
		          callback:function (data) {
					console.log(data)
					data.object.map(function(v, i, a) {
						v.selected = false;
						self.items.push(v);
					})
//					self.items = data.object
		          }
		        });
			},
			//选择标签  查看模板
			selectTag: function(id) {
				let self = this;
				self.items.map(function(v, i, a) {
					if(v.id === id) {
						v.selected = true
					} else {
						v.selected = false
					}

				})
				if(id) {
					self.params = {
		            url:'/admin/pptTemps/?tag=' + id,
		            pageSize:5,
		            pageNo:1,
			         }
					self.$refs.page.fetchData(self.params)
				} else {
					self.params = {
		            url:'/admin/pptTemps/',
		            pageSize:5,
		            pageNo:1,
			         }
					self.$refs.page.fetchData(self.params)
				}
			},
			//ppt模板 增加
			modalAdd: function() {
				this.dialogFormVisible = true
			},
			modalAddbtn: function() {
				this.dialogFormVisible = false
				let modalList = {};
				modalList.name = this.form.name;
				modalList.label = Date.parse(new Date());
				this.items.push(modalList)
			},
			//删除PPT模板
			deleteBtn: function() {

				let self = this;
				let checkTagNum = [];
				let id = '';
				this.modalContens.map(function(v, i, a) {
					console.log(v)
					if(v.selected) {
						console.log(v)
						checkTagNum.push(v.id);
					}
				});
				console.log(checkTagNum);
				id = checkTagNum.join();
				console.log(id)
				if(id.length === 0) {
					self.$message.error('请选择需要删除的模板');
				} else {
					self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	common.Ajax({
			          url:'/admin/pptTemps/' + id,
			          method: 'delete',
			          callback:function (data) {
						console.log(data)
						if(data.code == 100) {
							self.$refs.page.fetchData(self.params)
							self.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
						}
			          }
			        });

			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });
			        });
				}


			},
			//编辑modal
			modalEdit: function() {
				router.push('/pptModal/edit/')
			},
			checkTag: function(id) {
				console.log(id)
				this.modalContens.map(function(v, i, a) {
					if(v.id === id) {
						v.selected =! v.selected;

					}
					console.log(v)
				});

			}
		}
	})
</script>

<style>
	.index-modal{
		width: 90%;
		height: auto;
		margin: auto;
		padding: 10px;
	}
	.index-modal-listL{
		float: left;
		margin-top: 20px
	}
	.index-modal-list{
		padding-left: 20px;
		overflow: hidden;
		margin-top: 100px
	}
	.index-modal-list ul{
		width: 100%;
		height: auto;
	}
	.index-modal-list ul li {
		margin: 20px;
		float: left;
		cursor: pointer;
	}
	.index-modal-list ul li:hover{
		color: red;
	}
	.index-modal-list button{
		margin-top: 10px
	}
	.index-modal-listContent{
		width: 100%;
		height: 307px;
		overflow: hidden;
		margin-top: 20px;
		padding: 30px 0;
	}
	.index-modal-listContent table{
		width: 100%;
		height: auto;
	}
	.index-modal-listContent table tr td{
		text-align: center;
		padding: 10px;
	}
	.index-modal-listContent table tr td .el-tag{
		margin-right: 10px;
	}
	.index-modal-listContent table tbody tr td img{
		width: 100px;
		height: 50px;
	}
	.index-modal-button{
		margin-top: 20px;
		text-align: right;
		overflow: hidden;
		width: 100%;
		height: 80px;
	}
	.index-modal-button button{
		/*float: left;*/
	}
	.newInput{
		float: left;
		width: 80%;
	}
	.selectedTag {
		color: red;
	}
	.noselectedTag {
		color: #000;
	}
</style>