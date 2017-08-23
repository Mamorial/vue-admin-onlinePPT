<template lang="html">
  <el-upload
  class="avatar-uploader"
  name="fileupload"
  :action="actionUrl"
  :show-file-list="false"
  :on-success="handleAvatarScucess"
  :on-remove="handleRemove"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>

<script>
import * as common from '../../assets/js/public.js';
export default {
  data() {
    return {
      actionUrl:this.$props.action,
      imageUrl: '',
      id: '',
      type: 0,

    };
  },
  props:['action', 'idUrl'],
  mounted() {
    // console.log(this.imageUrl);
  },
  beforeDestroy() {
//  this.$store.commit('updateUploadImgUrl',"");
  },
  computed: {
//  imageUrl () {
//  	return this.imageUrl
//    return this.$store.state.uploadImgUrl
//  }
  },
  ready() {},
  attached() {},
  methods: {
  	ImgUrl: function(imageUrl) {
  		this.$emit('thisImageInfo', imageUrl, this.id, this.type);
  	},
  	handleRemove(res, file) {

  	},
    handleAvatarScucess(res, file) {
      if(res.code != 100) {
        fish.notify(res.message)
        return false;
      }
      this.imageUrl = res.object.imgUrl;
			this.ImgUrl(this.imageUrl);
//			return this.imageUrl
//    console.log(this.imageUrl);
//    this.$store.commit('updateUploadImgUrl',res.object.imgUrl);
      // this.$emit('onUpdate', this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  components: {}
};
</script>
