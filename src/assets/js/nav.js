// import navigation from './data.js';
var nav =  function (router,navigation) {
	console.log(navigation)
    var childLength,position;//用sessionStorage来管理定位
//  childLength = navigation[0].childrenList.length;
//  if(childLength > 0) {
//    position = {id:navigation[0].node.id,hasChild:true,secondId:navigation[0].childrenList[0].node.id};
//  }else {
//
//  }
    position = {id:navigation[0].id,hasChild:false,secondId:null};

    /**
     * 初始化定位
     */
     if(!sessionStorage.position) {
       sessionStorage.position = JSON.stringify(position);
     }
     var initPositon = JSON.parse(sessionStorage.position);
     if(!initPositon.hasChild) {
      //  没有二级菜单
      $("#"+initPositon.id).parent().addClass('nav-bg-active');
      $("#"+initPositon.id).addClass('nav-color-active');
      // window.location.hash=$("#"+initPositon.id).attr("url");
     }else {
      //  有二级菜单
      $("#"+initPositon.secondId).parents('.secondNav').show();
      $("#"+initPositon.id).parent().addClass('nav-bg-active');
      $("#"+initPositon.id).addClass('ActiveX');
      $("#"+initPositon.secondId).addClass('nav-color-active');
      $("#"+initPositon.id).addClass('nav-color-active');
      // window.location.hash=$("#"+initPositon.secondId).attr("url");
     }

    /**
     *点击切换菜单
     */
    $('.navigate a').click(function () {
      var hasActiveX = $(this).hasClass('ActiveX');
      var hasColorActive = $(this).hasClass('nav-color-active');
      var leve = $(this).attr('leve');
      // 判断点击时哪层的a标签
      if(leve == 1) {//第一层标签
        $('.nav-bg-active').removeClass('nav-bg-active');
        $('.ActiveX').next("ul").hide();
        $('.ActiveX').removeClass("ActiveX");
        // 移除三级标签的内容
        $('.top-nav-left').html('<a style="color:#2a2f33">.</a>');
        // 点击没有子元素的标签has
        var hasChildL = $(this).parent().find('ul').length;
        if(hasChildL == 0) {
          $('.nav-color-active').removeClass('nav-color-active');
          $(this).addClass('nav-color-active');
          $(this).parent('li').addClass('nav-bg-active');
          // 改变hash
          window.location.hash = $(this).attr("url");
          position.id = $(this).attr("id");
          position.hasChild = false;
          sessionStorage.position = JSON.stringify(position);
        }else {
          // 有子元素的重复点击同一个a
          if(!hasActiveX) {
            $(this).parent().find('ul').show();
            $(this).addClass('ActiveX');
            $(this).parent().addClass('nav-bg-active');
          }else {
            $(this).parent().find('ul').hide();
            $(this).removeClass('ActiveX');
            $(this).parent().removeClass('nav-bg-active');
          }
        }
      }else {//第二层标签
        if(!hasColorActive) {
          $('.nav-bg-active').removeClass('nav-bg-active');
          $(this).parents('ul').parents('li').addClass('nav-bg-active');
          $('.nav-color-active').removeClass('nav-color-active');
          $(this).parents('li').find('.icon-xiajianhao').parent("a").addClass('nav-color-active')
          // $(this).parent().find('a').removeClass('nav-color-active');
          $(this).addClass('nav-color-active');
        }
        // 改变hash
        window.location.hash = $(this).attr("url");
        // ajax获取第三层菜单
        var currentId = $(this).attr("id");
        var parentName = $(this).attr("parentName");
        // fetch3Nav(currentId,parentName,'click');


        position.id = $(this).parents('.secondNav').prev("a").attr("id");
        position.hasChild = true;
        position.secondId = $(this).attr("id");
        sessionStorage.position = JSON.stringify(position);
        sessionStorage.parentName = parentName;
      }
    });
}
export default nav;
