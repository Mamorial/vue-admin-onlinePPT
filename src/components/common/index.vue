<template>
<div id="layout">
  <div class="rightContent">
    <router-view ref="chatRoom" class="view"></router-view>
  </div>
  <nav id="appvue" class="navigate">
    <header>
      <div class="nav-header-left">
        <div>{{memberVo.name}}</div>
        <!--<div>{{memberVo.userId}}</div>-->
      </div>
      <div class="nav-header-right">
        <div @click="loginout">退出</div>
      </div>
    </header>
    <div class="clear"></div>
    <ul>
      <!--  class="nav-bg-active" -->
      <li v-for="item in items">
        <a class="iconfontNav" leve='1' :id="item.id" :url="item.url">{{item.name}}<i class="icon iconfont"></i></a>
      </li>
    </ul>
  </nav>
</div>
</template>

<!-- <script src="../../assets/js/nav.js" charset="utf-8"></script> -->
<script>
import router from '../../main.js';
import navigation from '../../assets/js/data.js';
import getNavPosition from '../../assets/js/nav.js';
import * as common from '../../assets/js/public.js';
export default {
// module.exports = {
    name: 'app',
    // components: {
    //     Chat
    // },
    mounted() {
      let self = this;
				console.log(this.$route.path)
				let path = this.$route.path;
				if(path === '/') {
					self.$router.push('pptModal/modal')
				}
        common.Ajax({
          url:'/admin/menu/data',
          params:{},
          method: 'GET',
          callback:function (data) {
						console.log(data)
            self.items = data.object.menuList;
            console.log(self.items);
            self.$nextTick(function () {
              getNavPosition(router,self.items);//运行nav函数，用来定位菜单栏
            });
          }
        });
        common.Ajax({
          url:'/admin/home/userInfo',
          params:{},
          method: 'GET',
          callback:function (data) {
						console.log(data)
						if(data.code === 100) {
							self.memberVo = data.object;
							sessionStorage.user = data.object.name;
						}

          }
        });
    },
    data() {
        return {
//        items: navigation,
          items: [],
          memberVo:{}
        }
    },
    methods: {
      loginout() {
        $.get("/common/admin/logout",{},function (data) {
        	console.log(data)
  					if(data.code == 100) {
              sessionStorage.clear();
  						window.location.href = "/dist/login";
  					}else {
  						alert(data.message);
  					}
  			},'json');
      }
    }
}
</script>

<style lang="less">
@import "../../assets/less/main.less";
@import "../../assets/less/nav.less";
a {
  cursor: pointer;
}
.iconfontNav {
  font-size: .9rem;
}
</style>
