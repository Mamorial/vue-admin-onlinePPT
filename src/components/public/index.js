import PaginateComponent from './Paginate.vue';
import UploadImgComponent from './UploadImg.vue';
import UploadImgElseComponent from './UploadImgElse.vue';
import UploadVideoComponent from './UploadVideo.vue';
import RichTextComponent from './RichText.vue';
import UploadMutiImgComponent from './UploadMutiImg.vue';

export const Paginate = {
  install:function (Vue) {
    Vue.component('Paginate',PaginateComponent);
  }
}
export const UploadImg = {
  install:function (Vue) {
    Vue.component('UploadImg',UploadImgComponent);
  }
}
export const UploadImgElse = {
  install:function (Vue) {
    Vue.component('UploadImgElse',UploadImgElseComponent);
  }
}
export const UploadVideo = {
  install:function (Vue) {
    Vue.component('UploadVideo',UploadVideoComponent);
  }
}
export const RichText = {
  install:function (Vue) {
    Vue.component('RichText',RichTextComponent);
  }
}
export const UploadMutiImg = {
  install:function (Vue) {
    Vue.component('UploadMutiImg',UploadMutiImgComponent);
  }
}
