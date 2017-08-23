//Vuex的全局公共状态
let commonState = {
   state: {
     count: 2,
     uploadImgUrl:'',
     uploadMutiImgUrl:[],
     uploadVideoUrl:'',
     notifyTeams:[],
   },
   mutations: {
     increment (state) {
       state.count++
     },
     updateUploadImgUrl(state,url) {
       state.uploadImgUrl = url
     },
     updateUploadMutiImgUrl(state,urlArr) {
       state.uploadMutiImgUrl = urlArr
     },
     updateUploadVideoUrl(state,url) {
       state.uploadVideoUrl = url
     },
     updateNotifyTeams(state,array) {
       state.notifyTeams = array
     },
     deleteNotifyTeams(state,id) {
       let array = state.notifyTeams;
       let tempArr = [];
       for (var i = 0; i < array.length; i++) {
         if(array[i].id != id) {
           tempArr.push(array[i])
         }
       }
       state.notifyTeams = tempArr;
     },
   }
};
export default commonState;
