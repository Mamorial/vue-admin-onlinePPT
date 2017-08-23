<template>
	<div class="user-detail">
		<div class="user-detail-phone">
			<span>手机号 ：</span>
			<span>{{userMobile}}</span>
		</div>
		<div class="user-detail-phone user-detail-nickName">
			<span>昵称 ：</span>
			<span>{{userName}}</span>
		</div>
		<div class="user-detail-phone">
			<span>我的PPT模板 ： </span>
			<div class="user-detail-pptModal">
				<div class="user-detail-showModal" v-for="i in info">
					<img :src="i.imageUrl" />
					<span>{{ i.tempName }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../../main.js';
	import * as common from '../../../assets/js/public.js';
	export default({
		data() {
			return {
				id: '',
				info: [],
				userMobile: '',
				userName: ''
			}
		},
		mounted() {
			console.log(this.$route.params)
			this.id = this.$route.params.id
			this.init();

		},
		methods: {
			init: function() {
				let self = this;
				common.Ajax({
		          url:'/admin/users/' + self.id,
		          method: 'GET',
		          callback:function (data) {
		          	console.log(data)
		          	self.userMobile = data.object.mobile;
		          	self.userName = data.object.nickname;
		          	data.rows.map(function(v, i, a) {
		          		let obj = {
		          			imageUrl: '',
		          			tempName: ''
		          		}
		          		if(v.imageUrl) {
		          			obj.imageUrl = v.imageUrl;
		          		}
		          		if(v.tempName) {
		          			obj.tempName = v.tempName
		          		}
		          		self.info.push(obj)
		          	})
		          	console.log(self.info)
		          }
		        });
		}
		}
	})
</script>

<style>
	.user-detail{
		width: 80%;
		height: auto;
		margin: 100px auto;
	}
	.user-detail-phone{
		width: 100%;
		height: auto;
		overflow: hidden;
		margin: 20px;
	}
	.user-detail-phone span:nth-of-type(1){
		float: left;
		width: auto;
		margin-right: 20px;
	}
	.user-detail-pptModal{
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.user-detail-pptModal div{
		float: left;
		margin-right: 20px;
	}
	.user-detail-showModal{
		width: 150px;
		height: 180px;
		margin: 10px;
		position: relative;
		text-align: center;
	}
	.user-detail-showModal img{
		float: none;
		width: 150px;
		height: 150px;
	}
	.user-detail-showModal span{
		display: block;
		width: 100%;
	}
</style>