import reqwest from 'reqwest';
import fish from './common';
export const SUCCESS_CODE = 100;
export const ERROR_NO_LOGIN = 103;
export function Ajax(option) {
  let url = option.url;
  let params = option.params;
  let callback = option.callback;
  let method = option.method;
  let contentType = option.contentType || "application/json";
  loading('addLoading');
  reqwest({
    url: url,
    method: method,
    data: params,
    contentType: contentType,
    type:'json',
    withCredentials: false,
    success: (data) => {
      loading('removeLoading');
      if(data.code == SUCCESS_CODE) {
        callback(data);
      }else if(data.code == ERROR_NO_LOGIN || !data || !data.code) {
        window.location.href="/dist/login";
      }else{
        fish.notify(data.message);
      }
    },
    error: (err) => {
      loading('removeLoading');
      console.log(err);
    }
  })
}

export function uploadFile(options) {
	var url = options.url;//请求的url
	var dom = options.dom;//form DOM节点
	var callback = options.callback;//成功的回调
	var form = new FormData(dom);
	$.ajax({
	    url:url,
	    type:"post",
	    data:form,
	    processData:false,
	    contentType:false,
	    success:function(data){
	    	console.log(data)
	        var res = JSON.parse(data);
	        if(res.code !== 100) {
	          fish.notify(res.message);
	          return false;
	        }
	        callback(res);
	    },
	    error:function(e){
	        fish.notify("错误！！");
	    }
	});

}

export function getJSON(url,params,method = 'POST') {
  var postData = (function(obj){ // 转成post需要的字符串.
      var str = "";
      for(var prop in obj){
          str += prop + "=" + obj[prop] + "&"
      }
      return str.slice(0,-1);
  })(params);
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open(method, url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    client.send(postData);
    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });
  return promise;
}

export function postAjax(url,params) {
  loading('addLoading');
  var promise = new Promise(function(resolve, reject) {
    getJSON(url,params).then((data)=>{
      loading('removeLoading');
      if(data.code != SUCCESS_CODE) {
        fish.notify(data.message);
        reject(data.message);
        return false;
      }
      resolve(data);
    })
  });
  return promise;
}

export function getQueryString() {
    var obj = {};
    var url = window.location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            obj[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
        return obj;
    }
};
export function checkPhone(mobile) {
        var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
        if (!reg.test(mobile)) {
            alert("请输入正确的手机号！");
            return false;
        }
        return true;
  }
// post表单提交
export function postcall( url, params, target){
    var tempform = document.createElement("form");
    tempform.action = url;
    tempform.method = "post";
    tempform.style.display="none"
    if(target) {
        tempform.target = target;
    }

    for (var x in params) {
        var opt = document.createElement("input");
        opt.name = x;
        opt.value = params[x];
        tempform.appendChild(opt);
    }

    var opt = document.createElement("input");
    opt.type = "submit";
    tempform.appendChild(opt);
    document.body.appendChild(tempform);
    tempform.submit();
    document.body.removeChild(tempform);
}
export function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
}

export function loading(type) {
  var temp =
  '<main id="loading">'+
    '<div class="loading">'+
      '<div class="loader-inner line-spin-fade-loader">'+
        '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
      '</div>'+
    '</div>'+
  '</main>';
  if(type == "addLoading") {
    $(document.body).prepend(temp);
  }
  if(type == "removeLoading") {
    if($('#loading')) {
      $(document.body).find('#loading').remove();
    }
  }
};

//验证账号
export function checkNickName(value) {
    var reg = /^([0-9A-Za-z]{6,20})?$/;
    if (!reg.test(value)) {
        return false;
    }
    return true;
}









//
