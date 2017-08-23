window.fish = {
        /**
         * purpose：fish.loading(type)为界面添加遮罩层，Loading动画
         * notice:  type只有"addLoading"和"removeLoading"可选 依赖loaders.css
         * @params：type  String  Required "addLoading" 添加Loading动画
         * @params：type  String  Required "removeLoading" 移除Loading动画
         */
        loading: function (type) {
          var temp =
              '<main id="loading">'+
                '<div class="loading">'+
                  '<div class="loader-inner ball-spin-fade-loader">'+
                    '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
                  '</div>'+
                '</div>'+
              '</main>';
              if(type == "addLoading") {
                $(document.body).prepend(temp);
                $(document.body).css({'overflow':'hidden'});
              }
              if(type == "removeLoading") {
                if($('#loading')) {
                  $(document.body).find('#loading').remove();
                  $(document.body).removeClass('overflow');
                }
              }
        },
        /**
         * purpose：fish.notify(msg, okcb)为界面添加Alert通知替代原生的alert
         * @params：msg Required String notify弹出框的内容
         * @params：okcb Func 点击notify弹出框后调用的回调函数
         */
        notify: function (msg, okcb) {
            $('.notify').remove();
            if (!msg) {
                alert('调用notify需要传递参数，第一个是必传的内容，第二个是可选的点击知道了的回调函数');
                return false;
            }
            var html =
                '<div class="modal notify">' +
                '<div class="modalContent">' +
                '<span class="verticalMiddle">' +
                '<div>' + msg + '</div>' +
                '<div style="margin-top:20px">' +
                '<div id="notifyConfirm" class="btn blue smallBtn">知道了</div>' +
                '</div>' +
                '</span>' +
                '</div>' +
                '</div>';
            $("body").prepend(html);
            $('.notify').show();
            $('#notifyConfirm').on('click', function() {
                $('.notify').hide();
                if (okcb) {
                    okcb();
                }
            })
        },
        /**
         * purpose：fish.smallModal(msg, okcb, cancelcb)为界面添加确认通知替代原生的confirm
         * @params：msg Required String smallModal弹出框的内容
         * @params：okcb Func 点击smallModal弹出框确认按钮后调用的回调函数
         * @params：cancelcb Func 点击smallModal弹出框取消按钮后调用的回调函数
         */
        smallModal: function (msg, okcb, cancelcb) {
            $('.smallModal').remove();
            if (!msg) {
                alert('调用smallModal需要传递参数，第一个是必传的内容，第二个是可选的点击确定的回调函数');
                return false;
            }
            var html =
                '<div class="modal smallModal">' +
                '<div class="modalContent">' +
                '<span class="verticalMiddle">' +
                '<div>' + msg + '</div>' +
                '<div style="margin-top:20px">' +
                '<div id="smallModalConfirm" class="btn blue smallBtn">确认</div>' +
                '<div id="smallModalCancel" class="btn yellow smallBtn">取消</div>' +
                '</div>' +
                '</span>' +
                '</div>' +
                '</div>';
            $("body").prepend(html);
            $('.smallModal').show();
            $('#smallModalConfirm').on('click', function() {
                if (okcb) {
                    $('.smallModal').hide();
                    okcb();
                }
                $('.smallModal').hide();
            })
            $('#smallModalCancel').on('click', function() {
                if (cancelcb) {
                    $('.smallModal').hide();
                    cancelcb();
                }
                $('.smallModal').hide();
            })
        },
        /**
         * purpose：fish.inputModal(msg, nullmsg, okcb, cancelcb)为界面添加带输入框的确认小模态框
         * @params：msg String Required inputModal弹出框内的input框的placeholder属性
         * @params：nullmsg String Required 点击inputModal确认按钮后，输入框内容为空，显示给用户的消息
         * @params：okcb Func 点击inputModal弹出框确认按钮后调用的回调函数
         * @params：cancelcb Func 点击inputModal弹出框取消按钮后调用的回调函数
         */
        inputModal: function inputModal(msg, nullmsg, okcb, cancelcb) {
            $('.inputModal').remove();
            if (!nullmsg) {
                nullmsg = "文本框内容不能为空~";
            }
            // if(!msg) {
            //   alert('调用inputModal需要传递参数，第一个是必传的内容，第二个是可选的点击确定的回调函数');
            //   return false;
            // }
            var html =
                '<div class="modal inputModal">' +
                '<div class="modalContent">' +
                '<span class="verticalMiddle">' +
                '<textarea id="reason" name="name" rows="8" style="width:250px;margin-top:20px;">' + msg + '</textarea>' +
                '<div style="margin-top:-30px">' +
                '<div id="inputModalconfirm" class="btn blue smallBtn">确定</div>' +
                '<div id="inputModalCancel" class="btn yellow smallBtn">取消</div>' +
                '</div>' +
                '</span>' +
                '</div>' +
                '</div>';
            $("body").prepend(html);
            $('.inputModal').show();
            $('#inputModalconfirm').on('click', function() {
                var txt = $('#reason').val();
                if (txt == "") {
                    $('.inputModal').hide();
                    fish.notify(nullmsg, function() {
                        $('.inputModal').show()
                    });
                    return false;
                }
                if (okcb) {
                    $('.inputModal').hide();
                    okcb(txt);
                }
                $('.inputModal').hide();
            })
            $('#inputModalCancel').on('click', function() {
                var txt = $('#reason').val();
                if (cancelcb) {
                    $('.inputModal').hide();
                    cancelcb(txt);
                }
                $('.inputModal').hide();
            })
        },
        /**
       * 初始化上传图片
       * option: {
       *     imageId: 图片ID
       *     addFunc(e, data): 增加图片后触发该方法
       *     successFunc(result): 上传成功后触发该方法
       * }
       */
        initImageUpload: function(option){
            $(option.imageId).fileupload({
                autoUpload: true,
                url: "/admin/upload/image",
                dataType: 'json',
                acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i,
                add: option.addFunc,
                done: function (e, data) {
                    var result = data.result;
                    if(CODE_SUCCESS != result.code){
                        fish.notify(result.message);
                        return;
                    }
                    if(option.successFunc){
                        option.successFunc(result);
                    }
                },
                progressall: function (e, data) {
                    //进度条设置
                },
                processfail: function (e, data) {
                    fish.notify("上传的图片格式错误");
                }
            });
        },
        /**
       * 为输入框添加开始和结束时间
       * option: {
       *     startSelector: 开始时间的输入框的selector
       *     endSelector: 结束时间的输入框的selector
       * }
       */
        startEndDate: function (startSelector, endSelector) {
            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            // var startDate = "";
            // var endDate = "";
            var checkin = $(startSelector).fdatepicker({
                format: 'yyyy-mm-dd',
                // onRender: function (date) {
                //   return date.valueOf() < now.valueOf() ? 'disabled' : '';
                // }
            }).on('changeDate', function(ev) {
                console.log($(startSelector).val());
                // startDate = $(startSelector).val()
                if (ev.date.valueOf() > checkout.date.valueOf()) {
                    var newDate = new Date(ev.date);
                    newDate.setDate(newDate.getDate());
                    checkout.update(newDate);
                }
                checkin.hide();
                // $('#endDate')[0].focus();
            }).data('datepicker');
            var checkout = $(endSelector).fdatepicker({
                format: 'yyyy-mm-dd',
                onRender: function(date) {
                    return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
                }
            }).on('changeDate', function(ev) {
                console.log($(endSelector).val());
                // startDate = $(endSelector).val()
                checkout.hide();
            }).data('datepicker');
        },

        identifyCode: function identifyCode(val,cb,number) {
            // 判断是否能够点击
            if(val.hasClass('gray')) {
              return false;
            }
            // 执行函数
            if(cb) {
              if(!cb()) {
                return false;
              }
            }
            var countNum = number ? number : 60 ;
            var countdown = countNum;
            var interval = null;
            settime();
            function settime() {
                if (countdown == 0) {
                    val.html("获取验证码");
                    countdown = countNum;
                    val.removeClass('gray').addClass('green');
                    return false;
                } else {
                    val.html("重新发送" + countdown + "s");
                    val.removeClass('green').addClass('gray');
                    countdown--;
                }
                interval = setTimeout(function() {
                    settime(val);
                }, 1000)
            };
        },
        getQueryString: getQueryString,
        /**
         * 以下是验证
         */
        checkIdcard: checkIdcard,
        checkPhone: checkPhone,
        checkIsInteger: checkIsInteger, //验证正整数
        checkMoney: checkMoney,
        checkIsPercentage: checkIsPercentage,
        checkMaxInterger: checkMaxInterger,
    };
    /*
     * msg String文本框的placeholder属性
     * nullmsg String点击确定文本空白的后的提示
     */

    function checkIdcard(card) {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(card) === false) {
            fish.notify("身份证输入不合法");
            return false;
        }
        return true;
    }

    function checkPhone(mobile) {
        var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
        if (!reg.test(mobile)) {
            fish.notify("请输入正确的手机号！");
            return false;
        }
        return true;
    }

    function checkIsInteger(obj) {
        if (obj.value == "") {
            return false;
        }
        if (obj.value > 0 && obj.value % 1 === 0) {

        } else {
            fish.notify("请输入正整数！");
            obj.value = "";
        }
    }

    function checkMaxInterger(obj, maxNum) {
        if (obj.value == "") {
            return false;
        }
        if (obj.value > 0 && obj.value % 1 === 0 && obj.value <= maxNum) {

        } else {
            fish.notify("请输入大于0小于" + maxNum + "的正整数");
            obj.value = "";
        }
    }

    function checkIsPercentage(obj) {
        if (obj.value == "") {
            return false;
        }
        var reg = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
        if (!reg.test(obj.value) || obj.value < 0 || obj.value > 100) {
            fish.notify("请输入正确的百分比，最多两位小数");
            obj.value = "";
        }
    }

    //验证金额
    function checkMoney(obj) {
        if (obj.value == "") {
            return false;
        }
        var reg = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
        if (!reg.test(obj.value) || obj.value < 0) {
            fish.notify("请输入正确的金额，最多两位小数");
            obj.value = "";
        }
        if(obj.value > 999999999.99) {
          fish.notify("请输入正确的金额，整数位最多只能输入9位数字");
          obj.value = "";
        }
    }

    // 验证码
    /*val 是jquery对象*/
    /*cb 是点击获取验证码的时候执行的函数，可以在这里面请求数据*/
    /*number是秒数*/


    function getQueryString(link) {
      var obj = {};
      // console.log(link.substr(link.indexOf("?")));
      var url = link.substr(link.indexOf("?"));
      // console.log(url);
      if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
              obj[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
          }
          return obj;
      }
    };

export default fish;
