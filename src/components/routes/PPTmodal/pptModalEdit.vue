<template>
	<div class="index-view">
		<form id="modalForm" action="/admin/pptTemps/save/" enctype="multipart/form-data" method="post" target="id_iframe">
			<div class="index-view-content">
			<div class="index-view-content-top">
				<span>模板名称：</span>
				<el-input class="Name" name="name" placeholder="请输入模板名称"></el-input>
			</div>
			<div class="index-view-content-top">
				<span>文字模板：</span>
				<!--<span>选择文件</span>-->
                  <!--<input name="uploadFile" id="businessUrl1" class=" weui-uploader__input" type="file" accept="image/*" multiple="">-->
				<input type="file" name="tempUpload" />
				 <!--<el-uplo ad
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :on-change="handleChange"
				  :file-list="fileList">
				  <el-button size="small" type="primary">点击上传</el-button>
				</el-upload>-->
			</div>
			<div class="index-view-content-top">
				<span>风格模板：</span>
				<input type="file" name="styleUpload" />
                  <!--<input name="uploadFile" id="businessUrl2" class="weui-uploader__input" type="file" accept="image/*" multiple="">-->
				 <!--<el-upload
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :on-change="handleChange"
				  :file-list="fileList">
				  <el-button size="small" type="primary">点击上传</el-button>
				</el-upload>-->
			</div>
			<!--<div class="index-view-content-top index-view-content-bottom">
				<span>背景图&nbsp;&nbsp;&nbsp;</span>
				<form>
                  <input name="uploadFile" class="weui-uploader__input businessUrl1" type="file" accept="image/*" multiple="">
                </form>
				<UploadImgElse action="/admin/upload/image"/>
			</div>-->
		</div>
		<!--<div class="index-view-top">
			<span>工作汇报</span>
		</div>
		<div class="index-view-content">
			<ul v-for="item in items">
				<li>
					<el-radio class="radio" v-model="radio" :label="item.label">&nbsp;</el-radio>
					<!--<img :src="item.src" />
					<UploadImgElse action="/admin/upload/image"/>
					<span class="uploadDate">{{item.uploadDate}}</span>
				</li>
			</ul>
		</div>-->
		<div class="index-view-tags">
			<span>选择适配的标签</span>
			<div class="index-view-tagsB tagNameValueList">
				<div style="float: left;" v-for="tag in tags">
					<input  :value="tag.id" type="checkbox" />
					<span>{{tag.name}}</span>
				</div>
				<input class="ds-none" id="tag" name="tag" value="" />
				<input class="ds-none" id="tagName" name="tagName" value="" />
				<!--<el-checkbox v-for="tag in tags" @click="selectTag(tag.id)" v-model="tag.id">{{tag.name}}</el-checkbox>-->
			</div>
		</div>
		<div class="index-view-btn">
			<!--<el-button @click="submitAdd" type="submit">提交</el-button>-->
			<input class="submit" type="submit" @click="submitMsg" />
		</div>
		</form>
		<iframe id="id_iframe" name="id_iframe" style="display:none;"></iframe>
	</div>
</template>

<script>
	import * as common from '../../../assets/js/public.js';
	export default({
		data() {
			return {
				radio: '1',
				checkedCities: '',
				select_tag: [],
				select_tagName: [],
				modalName: '',
				formData: {
					name: 'af',
					tempUpload: 'af',
					styleUpload: 'afadf'
				},
				tags:[{
					id: 1,
					name: 'afdad'
				},{
					id: 2,
					name: 'asdfd'
				}],
				items: [{
					label: 1,
					id: 1,
					src: '',
					uploadDate: 'dsfasdf'
				},{
					label: 2,
					id: 2,
					src: '',
					uploadDate: 'asdfasdf'
				},{
					label: 3,
					id: 3,
					src: '',
					uploadDate: 'adfsasd'
				},],
				fileList: []

			}
		},
		mounted() {
//			this.$message.error('adffd')
			this.init();
			var value = "";
			var tags = ",";
			$(".tagNameValueList").on('change','input',function(){
				var items = $(".tagNameValueList input:checked")
//				console.log(items);
				value = "";
				tags = "";
				for (var i=0; i< items.length; i++) {
					value += $(items[i]).val() + ",";
					console.log($(items[i]).next().html());
					tags += $(items[i]).next().html() + ",";
				}
				console.log(tags);
				if(tags) {
					$("#tagName").val(',' + tags);
				} else {
					$("#tagName").val();
				}
				$("#tag").val(value);
			});

//			$("#modalForm").ajaxForm(options).submit(function(data) {
//				console.log(data)
//			})
		},

		methods: {
			//初始化
			init: function() {
				let self = this
				common.Ajax({
		          url:'/admin/pptTags/',
		          method: 'GET',
		          callback:function (data) {
					console.log(data);
					self.tags = data.object;
		          }
		        });
			},
			//选择标签
			selectTag: function(id, name) {
				console.log(this.select_tag)
				this.select_tag.push(id)
				this.select_tagName.push(name)
				console.log(this.select_tag)
			},
			//提交
			submitMsg: function() {
				let self = this;
				common.loading('addLoading')
				$("#modalForm").ajaxForm(function(data) {
					let _data = [];
					if(data) {
						_data = JSON.parse(data)
						console.log(_data);
						self.submitMsgInfo(_data);
						common.loading('removeLoading')
					} else {
						common.loading('addLoading')
					}

				})
			},
			submitMsgInfo: function(data) {
				let self = this;

				if(data.code === 100) {
					self.$message({
						type: 'success',
						message: '上传成功!'
					});
					document.getElementById("modalForm").reset();
				} else if(data.code === 101) {
					this.$message.error(data.message)
				} else {
					this.$message.error('请选择上传的文件')
				}

			}
		}
	})

</script>

<style>
	.index-view{
		width: 80%;
		height: auto;
		margin: auto;
	}
	.index-view-top{
		width: 100%;
		height: auto;
		overflow: hidden;
		border: 1px solid red;
	}
	.index-view-content{
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 10px;
	}
	.index-view-content-top:nth-of-type(1) {
		margin-top: 100px
	}
	.index-view-content-top{
		width: 100%;
		height: auto;
		overflow: hidden;
		position: relative;
		margin: 50px 0;
	}
	.index-view-content-top span{
		float: left;
		margin-right: 30px;
	}
	.index-view-content-top .Name{
		width: 70%;
		margin: 0;
		/*float: right;*/
	}
	.index-view-content-top button{
		margin: 0 0 0 100px;
	}
	.index-view-content-top button span{
		position: relative;
	}
	.index-view-content-bottom span{
		top: 90px
	}
	.index-view-content-bottom .avatar-uploader{
		margin-left: 70px;
	}
	.avatar-uploader{
		width: 180px;
		height: 180px;
		margin-left: 30px;
	}
	.index-view-tags, .index-view-tagsB{
		padding: 10px;
		margin-top: 20px
	}
	.index-view-tagsB div{
		margin-right: 10px;
	}
	.ds-none{
		display: none;
	}
	.submit{
		border: none;
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
		margin: 30px;
		border-radius: 5px;
		background: #20a0ff;
		color: #fff;
	}
	</style>