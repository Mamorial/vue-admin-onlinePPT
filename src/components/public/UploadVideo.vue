<template lang="html">
  <div class="uploadVideo">
    <ul class="el-row">
      <li class="el-col-2 textRight uploadPic">
        <label  for="">视频</label>
      </li>
      <li class="el-col-22" >
          <ul class="el-row">
            <li v-for="item in ycVideoList" v-if="item.videoUrl" class="el-col-5" @click="selectVide(item)" @mouseover="hoverVide(item)" @mouseout="hoveroutVide(item)" :class="item.hover ? 'imageLabelHover' :''">
              <div class="imageLabelPlay">
                <i class="el-icon-caret-right "></i>
              </div>
              <i @click="deleteVide(item)" class="el-icon-close imageLabel"></i>
              <img :src="item.pictureUrl" @click="selectVide(item)"  class="avatar" :class="item.active ? 'active' :''"/>
            </li>
            <li class="el-col-5 videoUpload">
              <!-- <el-upload
                name="fileupload"
                class="avatar-uploader"
                action="/admin/upload/video"
                :show-file-list="false"
                :on-success="handleAvatarScucess"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
              <div class="qiniuUpload" id="pickfiles-container">
                  <i v-if="!isUploadQiniu" id="pickfiles" class="el-icon-plus avatar-uploader-icon"></i>
                  <el-progress v-else type="circle" :percentage="percentage" :status="percentage == 100 ? 'success' : ''"></el-progress>
               </div>
            </li>
          </ul>
      </li>
    </ul>
    <ul v-if="this.$props.hasCover" class="el-row">
      <li class="el-col-2 textRight uploadPic">
        <label  for="">示例图</label>
      </li>
      <li class="el-col-9">
        <el-upload
          class="avatar-uploader"
          name="fileupload"
          action="/admin/upload/image"
          :show-file-list="false"
          :on-success="handleImgScucess"
          :before-upload="beforeImgUpload">
          <img v-if="coverPictureUrl" :src="coverPictureUrl" class="avatarImg">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </li>
    </ul>
    <ul v-if="ycVideoList.length > 0" v-for="item in descriptionList" class="el-row">
      <li class="el-col-2 textRight">
        <label  for="">文字</label>
      </li>
      <li class="el-col-9">
        <el-input v-model="item.description"  placeholder="请输入内容"></el-input>
      </li>
      <li class="el-col-2 el-col-offset-1 textRight">
        <label for="">时间轴</label>
      </li>
      <li class="el-col-10">
        <el-time-picker
          v-model="item.descriptionStartTime"
          :picker-options="{
            selectableRange: '00:00:00 - 09:59:59'
          }"
          placeholder="选择时间范围">
        </el-time-picker>
      </li>
    </ul>
    <ul class="el-row" v-if="ycVideoList.length > 0">
      <li class="el-col-3 textRight">
        <el-tooltip class="item" effect="dark" content="添加视频文字和时间轴" placement="top">
          <i class="el-icon-plus" @click="addReduceVideoFonts(1)"></i>
         </el-tooltip>
      </li>
      <li class="el-col-1 textRight">
        <el-tooltip class="item" effect="dark" content="删除视频文字和时间轴" placement="top">
          <i class="el-icon-minus" @click="addReduceVideoFonts(0)"></i>
         </el-tooltip>
      </li>
    </ul>
  </div>
</template>
<script>
let initDate = new Date("January 01,2017 00:00:00");
import * as common from '../../assets/js/public.js';
import _ from 'underscore';
export default {
  data() {
    return {
      descriptionList:[],
      ycVideoList:[],
      VideoType:this.$props.type,
      coverPictureUrl:"",
      percentage:0,
      isUploadQiniu:false,
    };
  },
  props:['action','type','hasCover'],
  mounted() {
    /**七牛云上传**/
    let self = this;
    $.post("/admin/upload/token",{},function (data) {
      successQiniuFunc(data.uptoken);
    },'json');

    function successQiniuFunc(token) {
      var uploader = Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: 'pickfiles',
          uptoken: token,
          bucket_name: 'dddd-files',//上传到七牛云的某个文件夹
          container: 'pickfiles-container',
          drop_element: 'pickfiles-container',
          max_file_size: '1000mb',
          flash_swf_url: '/dist/assets/plupload/js/Moxie.swf',
          dragdrop: true,
          chunk_size: '4mb',
          domain: 'http://qiniu-plupload.qiniudn.com/',
          get_new_uptoken: false,
          auto_start: true,
          log_level: 5,
          init: {
              'BeforeChunkUpload':function (up,file) {
                  console.log("before chunk upload:",file.name);
              },
              'FilesAdded': function(up, files) {

              },
              'BeforeUpload': function(up, file) {
                  console.log("this is a beforeupload function from init");
                  self.isUploadQiniu = true;
              },
              'UploadProgress': function(up, file) {
                  console.log(file.percent + "%");
                  self.percentage = file.percent;
              },
              'UploadComplete': function() {
              },
              'FileUploaded': function(up, file, info) {
                let res = JSON.parse(info);
                let filePath = 'http://img.jmwenhua.cn/'+res.key;
                self.isUploadQiniu = false;
                self.percentage = 0;
                $.post("/admin/upload/handle", {videoUrl:res.key}, function(result){
                  // console.log(_.isEmpty(result));
                  let imgUrl;
                  _.isEmpty(result) ? imgUrl = "" : imgUrl = result.imgUrl;
                  self.ycVideoList.push({
                    videoUrl:filePath,
                    pictureUrl:result.imgUrl,
                    filePath:filePath,
                    coverPictureUrl:self.coverPictureUrl,
                    type:self.VideoType,
                    active:false,
                    hover:false,
                    descriptionList:[{description:"",descriptionStartTime:initDate}],
                  });
                  // 选中最新上传的视频
                  let length = self.ycVideoList.length;
                  for (var i = 0; i < length; i++) {
                    self.ycVideoList[i].active = false;
                  }
                  self.ycVideoList[length-1].active = true;
                  self.descriptionList = self.ycVideoList[length-1].descriptionList;
                },'json');
              },
              'Error': function(up, err, errTip) {

              }
          }
      });
    }
    /**七牛云上传**/
  },
  watch:{
    ycVideoList:{
      handler(curVal,oldVal) {
        // console.log(curVal);
        this.$emit('onUpdate', this.ycVideoList);
      },
      deep:true
    },
  },
  computed: {

  },
  ready() {},
  attached() {},
  methods: {
      handleImgScucess(res, file) {
        if(res.code != 100) {
          fish.notify(res.message)
          return false;
        }
        this.coverPictureUrl = res.object.imgUrl;

        let ycVideoList = this.ycVideoList;
        for (var i = 0; i < ycVideoList.length; i++) {
          //选中的视频
          if(ycVideoList[i].active) {
            this.ycVideoList[i].coverPictureUrl = res.object.imgUrl;
          }
        }
      },
      beforeImgUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        let ycVideoList = this.ycVideoList;
        if (ycVideoList.length == 0) {
          this.$message.error('请先上传视频！');
          return false;
        }
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      addReduceVideoFonts(param) {
        let ycVideoList = this.ycVideoList;
        for (var i = 0; i < ycVideoList.length; i++) {
          //选中的视频
          if(ycVideoList[i].active) {
            let descriptionList = ycVideoList[i].descriptionList;
            //文字不能少于1条
            if(descriptionList.length == 1 && !param) {
              this.$alert('已经不能再删了', '温馨提示');
              return false;
            }
            param ? descriptionList.push({description:"",descriptionStartTime:initDate}) : descriptionList.pop();
            // console.log(ycVideoList);
          }
        }
      },
      deleteVide(item) {
        let tempArr = [];
        let ycVideoList = this.ycVideoList;
        for (var i = 0; i < ycVideoList.length; i++) {
          if(ycVideoList[i].id != item.id) {
            tempArr.push(ycVideoList[i])
          }
        }
        this.ycVideoList = tempArr;
      },
      selectVide(item) {
        console.log(item);
        let ycVideoList = this.ycVideoList;
        for (var i = 0; i < ycVideoList.length; i++) {
          ycVideoList[i].active = false;
        }
        item.active = true;
        this.descriptionList = item.descriptionList;
      },
      hoverVide(item) {
        for (var i = 0; i < this.ycVideoList.length; i++) {
          this.ycVideoList[i].hover = false;
        }
        item.hover = true;
      },
      hoveroutVide(item) {
        for (var i = 0; i < this.ycVideoList.length; i++) {
          this.ycVideoList[i].hover = false;
        }
      },
  },
  components: {}
};
</script>
