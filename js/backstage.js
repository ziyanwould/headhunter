/**
 * Created by lbx on 2018/2/24.
 */
var numbers = 0;
var self = $(this);
$(function () {

    click_s();
    click_dh();
    click_top();
    click_delete();
    area_city();
    click_judge();
    click_radio();
    click_remve();
    bind_input();
    click_clone();
    child_remove();
    click_num();
    text_change();

    $("[data-toggle='tooltip']").tooltip();/*启动提示*/
    $('.dropdown-toggle').dropdown();/*启动下拉*/


    //失去焦点
    $("[data-toggle='popover']").popover({
        trigger:"focus",    //如果设为focus 当按钮失去焦点提示层会消失，例如页面空白处单机提示层消失
        placement:"top",
        html:true,
        content:'<p style="width: 500px;">如果您的时间持续到现在，请选择：<a href="javascript:;" onclick="obclicks()">至今</a></p><p></p>'
    });
    //设置日期时间控件
    $('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });


    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm',
        autoclose: true,
        todayBtn: true,
        startView: 'year',
        minView:'year',
        maxView:'decade',
        language:  'zh-CN',
    });





    /*/情况说明/*/
    $('.exp a').click(function () {
        var m_null = "";
        $('.explain').hide();
        $('.exp_count p').html(m_null);

    });


    $(document).on("click",".pic a",function(){
        $(".pic").remove();
    });

    $('.table a').click(function () {

        var count = $(this).attr("data-val");
        var counts = $(this).attr("data-slide");
        var c_src = $(this).attr("data-page");
        var pic = $('.c_src');


        if(counts){
            var cs_length = counts.length;
        }
        if(count){
            var c_length = count.length;
        }



        if( c_length>300){

            $('.exp_count p').html(count);
            $('.exp_count h3').html("职位说明");
            $('.explain').addClass('active').show();
        }else  if( cs_length>2){
            reg = new RegExp("；","g"); //定义正则表达式
            var c1 = count.replace(reg,"；<br/>");/*遇到“；”进行换行*/
            var c2 = counts.replace(reg,"；<br/>");/*遇到“；”进行换行*/
            $val1 = $('<p>岗位职责：</p><p>'+c1+'</p>');
            $val2 = $('<p style="margin-top: 25px;">任职资格：</p><p>'+c2+'</p>');
            $(".exp_count >p").append($val1).append($val2);
            $('.exp_count h3').html("职位说明");
            $('.explain').addClass('active').show();


        }
        else {
            if(count){

                $('.exp_count p').html(count);
                $('.exp_count h3').html("情况说明");
                $('.explain').removeClass('active').show();
            }
            else if(c_src) {
                var xcy= $('<div class="pic">'
                    +'<div class="picture">'
                    +'<h2><a href="javascript:;"><span class=" glyphicon glyphicon-remove" aria-hidden="true"></span></a> </h2>'
                    + '<img src="'+c_src+'" data-toggle="magnify">'
                    + '</div>'
                    + '</div>');
                $("body").append(xcy);

                /*重新执行*/
                $('[data-toggle="magnify"]').each(function () {
                    var $mag = $(this);
                    $mag.magnify()
                })
            }

        }


    });


    /*一级菜单点击切换*/
    $('.com_left li').click(function () {
        var xu_n = $(this).index() +1;
        var xu_ns=$(this).index() +0;
        $(this).addClass('active').siblings().removeClass('active');
        $('.com_l2').hide();
        $('.zhulie').children().eq(xu_n).show();
        $('.c_t ').children().eq(xu_ns).show().siblings().hide();
        numbers = xu_ns;



    });

    /*/二级菜单点击切换*/
    $('.com_l2 dd').click(function () {

        var nx =numbers;
        var $com3 =$('.com_l3 ') ;
        var xu_n = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
//            $com3.children().siblings().hide();
        $com3.eq(nx).children().eq(xu_n).show().siblings().hide();

        /*三级菜单回位*/
        $com3.eq(nx).children().eq(xu_n).children('.exa1').eq(0).show().siblings('.exa1').hide();
//            /*active*/
        $com3.eq(nx).children().eq(xu_n).children('.top_change').children().eq(0).addClass('active').siblings().removeClass('active');

        /*清空隐藏状态时候出现的多选功能*/
        $(".count").each(function () {
            if($(this).css("display")!="block"){
                var xcd =   $(this).find('.exa1').find('.checkbox').find('.m_choice');
                xcd.html("选择");
                xcd.parent().children('.op_a,input,em') .remove();
                var fdp = $(this).find('.exa1').find('thead').find('th').eq(0);
                if( fdp.html()== "选择"){
                    fdp.remove();
                    $(this).find('.exa1').eq(0).find('tbody').children().each(function (){
                        $(this).children('td').eq(0).remove();
                    });
                }

            }
        })


    });
    /*/三级菜单点击切换*/
    $('.top_change a').click(function () {
        var xu_n = $(this).index() +1;
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().parent().children().eq(xu_n).show().siblings('.exa1').hide();

    });
    /*单选多选*/
    $('.m_choice').click(function () {
        var self = $(this)
        var xc = self.html();
        var add_c = $('<a href="javascript:;" class="op_a">批量分配</a>');
        var add_q = $(' <input type="checkbox" ><em>全选</em>');
        var far =  self.closest('.exa1');
        if(xc ==="选择"){
            self.html("取消选择");
            self.parent().append(add_c);
            self.parent().prepend(add_q);
            far.find('thead').children().prepend($('  <th>选择</th>'));
            /*判断是否存在已分配*/
            far.find('tbody').find('.btn-primary').each(function () {
                if($(this).attr("disabled")=="disabled" )
                {
                    $(this).closest('tr').prepend($('  <td> <input type="checkbox" disabled="disabled" ></td>'))
                }else {
                    $(this).closest('tr').prepend($('  <td> <input type="checkbox"  ></td>'))
                }
            })
//                  far.find('tbody').children().prepend($('  <td> <input type="checkbox" ></td>'))

        }else {
            self.html("选择");
            self.parent().children('.op_a,input,em') .remove();
            far.find('thead').find('th').eq(0).remove();
            far.find('tbody').children().each(function (){
                $(this).children('td').eq(0).remove();
            });

        }
    })

    /*全选单选*/

    $(document).on("click",".examine input[type='checkbox']",function(){
        var $p = $(this).prop('checked');
        var  x_count = $(this).closest(".exa1").find("tbody").find("input[type='checkbox'][disabled!='disabled']");
        if($p){
            x_count.prop("checked",true);
        }else {
            x_count.prop("checked",false);
        }
    });

    /*监听选中状态*/
    $(document).on("click","tbody input[type='checkbox']",function(){
        var $p = $(this).prop('checked');
        var par =$(this).closest(".exa1").find(".examine").find("input[type='checkbox']");
        if($p){
        }else {}
        par.prop('checked',false);
    });
    /*审核待审核等操作*/
    $('.btn-success').click(function () {
        var arr = [];
        arr['title'] = '审核操作';
        arr['count'] = '请对当前选中的信息进行审核操作。';
        arr['btn_left'] = '审核不通过';
        arr['btn_right'] = '审核通过';
//         arr['se_arr']=["请选择......","胡宇","苏兆明","曹福莉","鲁肃","刘备","张飞","关羽"];
        var _this = $(this);
        x_remove(_this);
        chang_info(arr);

    })
    /*二次确定*/
    $('.modal-dialog .btn-default,.modal-dialog .btn-primary').click(function () {
        var self = $(this).html();
        var xcp = $(this).data('val');
        var arr = [];
        var gdp = $(this).closest('.modal-content').find('.modal-body').find('a').html();
        var selct = $(this).closest('.modal-content').find('.modal-body').find('select');

        /*选择展开内容框*/

        if( self==="确定" || self==="取消"){




            if(gdp==="“审核通过”" && self==="确定"){
                x_remove().closest('tr').remove();
                setTimeout(function () {
                    alert_x("成功！您对信息完成审核通过操作。请在“已审核”列表查看！","alert-success",3000)
                },500)
            }else if(gdp==="“审核通过”" && self==="取消"){
                setTimeout(function () {
                    alert_x("失败！您撤销对信息完成审核通过操作。","alert-danger",3000)
                },500)
            }else  if(gdp==="“审核不通过”" && self==="确定"){
                x_remove().closest('tr').remove();
                setTimeout(function () {
                    alert_x("成功！您对信息完成审核不通过操作。请在“已审核”列表查看！","alert-info",3000)
                },500)
            }else if(gdp==="“审核不通过”" && self==="取消"){
                setTimeout(function () {
                    alert_x("失败！您撤销对信息完成审核不通过操作。","alert-warning",3000)
                },500)
            }

            /*对删除进行操作*/
            else if(gdp==="“删除”" && self==="取消"){
                setTimeout(function () {
                    alert_x("失败！您撤销对信息“删除”操作。","alert-warning",3000)
                },500)
            }else if(gdp==="“删除”" && self==="确定"){
                x_remove().closest('tr').remove();
                setTimeout(function () {
                    alert_x("成功！您对信息完成“删除”操作","alert-success",3000)
                },500)
            }

            /*分配*/
            else if(selct && self==="取消"){
                setTimeout(function () {
                    alert_x("失败！您取消分配操作。","alert-warning",3000)
                },500)
            }else if(selct.val()==="请选择......" && self==="确定"){
                setTimeout(function () {
                    alert_x("失败！您未分配人员，请重新操作！","alert-danger",3000)
                },500)
            }else if(selct.val()!=="请选择......" && self==="确定"){
                setTimeout(function () {
                    x_remove().closest('tr').children('td').eq(0).children('input').attr("disabled","disabled").prop("checked",false);
                    x_remove().closest('tr').children('td:last').html('<button type="button" class="btn btn-sm btn-primary" disabled="disabled">已分配：'+selct.val()+'</button>');
                    alert_x("成功！您已经分配给“"+selct.val()+"”。","alert-success",3000)
                },500)
            }

        }
        else {
            arr['title'] = '确定操作';
            arr['btn_left'] = '取消';
            arr['btn_right'] = '确定';

            setTimeout(function () {
                if(xcp){
                    arr['count'] = '确实要对当前选中的信息进行 <a href="javascript:;">“审核通过”</a> 的操作？';

                }else {
                    arr['count'] = '确实要对当前选中的信息进行 <a href="javascript:;">“审核不通过”</a> 的操作？';

                }
                chang_info(arr);
            } ,500)

        }





    })

    /*分配操作*/
    $('tbody .btn-primary').click(function () {
        var arr = [];
        arr['title'] = '分配操作';
        arr['count'] = '当前选中的信息分配给以下人员进行审核。';
        arr['btn_left'] = '取消';
        arr['btn_right'] = '确定';
        arr['se_arr']=["请选择......","胡宇","苏兆明","曹福莉","鲁肃","刘备","张飞","关羽"];
        var _this = $(this);
        x_remove(_this);
        chang_info(arr);
    })

});


function chang_info(arrs) {
    var xco =  $('.modal-body');
    xco.html(" ");
    $('#myModalLabel').html(arrs['title']);
    var co_title = $("<h2>"+arrs['count']+"</h2>");
    xco.append(co_title);
    $('.modal-dialog .btn-default').html(arrs['btn_left']);
    $('.modal-dialog .btn-primary').html(arrs['btn_right']);
    if(arrs['se_arr']){

        var sel = $('<select></select>');
        for (var i = 0; i <arrs['se_arr'].length; i++) {
            sel.append('<option value="'+arrs['se_arr'][i]+'">'+arrs['se_arr'][i]+'</option>')
        }
    }
    xco.append(sel);

    $('#myModal').modal({   keyboard: true});


}


/**/
function bli() {
    var par = $(this) ;
    $(".c_t .com_l3").each(function(){
        if($(this).css("display")=='block'){
            par  = $(this);
            return false;//用false结束循环
        }

    });
    return par;
}

function alert_x(a_count,a_class,time) {
    bli().prepend('<div class="alert '+a_class+'  alert-dismissable">'
        + '<button type="button" class="close" data-dismiss="alert"'
        +'aria-hidden="true">'
        +  '&times;'
        + '</button>'
        +''+a_count+''
        +'</div>');

    setTimeout(function () {
        $('.alert').remove();
    },time)
}

function x_remove($self ) {

    if($self){
        self = $self
    }else {
        return self;
    }
}

/**/
function click_s() {

    $(".dropdown-menu").on("click","a",function () {
        var xcf = $(this).html();
        var par = $(this).closest('.dropdown').find('.btn ').find('em');
        par.html(xcf);
        var _this = $(this);

        var obj=$(this).closest('.dropdown-menu').attr("class");

        if(obj.indexOf('area_f')>-1) {
            x_remove(_this);

            area_city(xcf);

            /*若已经选中则选中取消*/
            _this.closest('section').find('.i_title').find('input[type="radio"]').removeAttr('checked');

        }else if(obj.indexOf('area_c')>-1){

            var ddf = _this.closest('section').children('.dropdown').eq(0).find('em').html();

            area_city(ddf,xcf,true);
            /*若已经选中则选中取消*/
            //_this.closest('section').find('.i_title').find('input[type="radio"]').removeAttr('checked');
        }

    })
}
/**/
function click_dh() {
    $('.select .dh').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
}
/**/
function click_top() {
    $('.isTop').click(function () {
        var pd =   $(this).html();
        if(pd ==="置顶"){
            $(this).html("取消置顶").addClass('active')
        }else {
            $(this).html("置顶").removeClass('active')
        }

    })
}

/**/
function click_delete() {
    $('.isMove').click(function () {
        var arr = [];
        arr['title'] = '确认操作';
        arr['count'] = '确实要对当前选中的信息进行  <a href="javascript:;" style="color: red">“删除”</a> 的操作？';
        arr['btn_left'] = '取消';
        arr['btn_right'] = '确定';
//           arr['se_arr']=["请选择......","胡宇","苏兆明","曹福莉","鲁肃","刘备","张飞","关羽"];
        var _this = $(this);
        x_remove(_this);
        chang_info(arr);
    })
}

/**
 *
 */
function area_city(you_city,are_city,df) {


    if(you_city){
        if(df){

        }else {
            $.ajax({
                type: "post",        //type：(string)请求方式，POST或GET
                dataType: "json",    //dataType：(string)预期返回的数据类型。xml,html,json,text等
                url: "js/citys.json",  //url：(string)发送请求的地址，可以是服务器页面也可以是WebService动作。
                success: function (msg) {
                    var  json = eval(msg.provinces);
                    var strs = "";


                    for (i in  json) {

                        if (json[i].name==you_city){
                            var jsons =json[i].city;
                            for (j in  jsons) {
                                strs += '  <li><a href="#">'+jsons[j].name+'</a></li>';

                            }
                        }

                    }


                    x_remove().closest('section').find(".area_c").html("").append(strs);
                    x_remove().closest('section').children('.dropdown').eq(1).find('em').html(" - 市 -");



                }
            });
        }

    }
     if(are_city){

        $.ajax({
            type: "post",        //type：(string)请求方式，POST或GET
            dataType: "json",    //dataType：(string)预期返回的数据类型。xml,html,json,text等
            url: "js/citys.json",  //url：(string)发送请求的地址，可以是服务器页面也可以是WebService动作。
            success: function (msg) {
                var  json = eval(msg.provinces);
                var strs = "";


                for (i in  json) {

                    if (json[i].name==you_city){

                        var jsons =json[i].city;
                        for (j in  jsons) {

                        if(jsons[j].name==are_city){
                            var jsona = jsons[j].area;

                            for( h in jsona){
                                console.log(jsona[h]);
                                 strs += '  <li><a href="#">'+jsona[h]+'</a></li>';
                            }

                        }

                        }
                    }

                }


                x_remove().closest('section').find(".area_a").html("").append(strs);
                x_remove().closest('section').children('.dropdown').eq(2).find('em').html(" - 区 -");
                return false;


            }
        });
    }
    $.ajax({
        type: "post",        //type：(string)请求方式，POST或GET
        dataType: "json",    //dataType：(string)预期返回的数据类型。xml,html,json,text等
        url: "js/citys.json",  //url：(string)发送请求的地址，可以是服务器页面也可以是WebService动作。
        success: function (msg) {
          var  json = eval(msg.provinces);
            var str = "";


               for (i in  json) {
                   str += '  <li><a href="#">'+json[i].name+'</a></li>'

               }

            $(".area_f").append(str);

        }
    });

}

/*发布管理发布判断函数*/

function click_judge() {
    $('.publish').click(function () {
        /*设一个值*/

        var self = true;
        var par = $(this).closest('.issue').find('section');



       /*判断是否必选项*/
        par.each(function(){
             //console.log("初始"+self);
            var _this = $(this);
            var val=_this.find('input[type="radio"]').prop('checked');
           // console.log("val值："+val)
           if(_this.find('.i_title').find('em').length>0){
               /*判断是否存在空值，或者下拉没选*/

               if ( _this.find('input[type="text"]').val()==""){
                   //console.log("text:"+self);
                   self = false;

                  // return false;/*结束本次循环 return false; 终止所有循环*/


               }
               else if(_this.find('.form-control').val()==""){
                   //console.log(_this.html());

                   self = false;
                   //console.log("textarea变化后:"+self);
                 //  return false;/*结束所有循环*/

               }

               else {
                   /*判断是否存下拉与否 与 单选二存在一*/
                   console.log(val);
                   if(!val){
                       _this.find('.dropdown').each(function () {
                           var  xval=$(this).find('.btn').find('em').html();
                           console.log(xval);
                           console.log("索引值"+xval.indexOf("-"));
                           if(xval.indexOf("-")==0 || xval.indexOf("-")==1){

                               self = false;
                           }
                           console.log("最终："+ self)
                       });
                   }else {
                        return;
                   }

                   }



               // console.log(""+_this.find(".i_title").eq(0).html()+"<br/>"+self+"");
               // console.log('<br/>');
               }

           });

       /*得出页面是否能提交*/
       setTimeout(function () {
           if(self){
               alert_x("成功！您成功发布了简历","alert-success",3000)
           }else {
               alert_x("失败！您的表单有未填项，请检查后重新提交！","alert-danger",3000)
           }
       },200)


    })
}

/*单选按钮的可点击与社保的联动*/
function click_radio() {

    $('input[type="radio"]').click(function () {
        var _this =$(this);
        console.log($(this).attr('checked'));
        if(_this.attr('checked')){

            _this.removeAttr('checked');

        }else{
            _this.attr('checked','checked');
            /*此radio用于社保的*/
            var shebao =   _this.closest('section').find('.i_title').html();
            console.log(shebao.indexOf("社保")+shebao);
            if(shebao.indexOf("社保所在地")==0){
                _this.closest('section').children('.dropdown').eq(0).find('em').html(" - 省 -");
                _this.closest('section').children('.dropdown').eq(1).find('em').html(" - 市 -");
            }
            if(shebao.indexOf("招聘人数")==0){
                _this.closest('section').find('input').val("");

            }



        }
    });





}

/*清空内容*/
function click_remve() {
    $('.btn_remove').click(function () {
        var _this = $(this);
        var doing = _this.closest('.count').find('.table-responsive').find('tbody');
        var do_height = doing.height();
        console.log(do_height);
        doing.html("").height(do_height);
    })
}

// 至今操作
function bind_input() {
    $("[data-toggle='popover']").focus(function(){
       var _this = $(this);
       x_remove(_this);
    });
}
function obclicks() {
    x_remove().val("至今")
}
//克隆操作
function click_clone() {
    $(".issue").on("click",".btn_add",function () {
      //alert("获取到节点");
        var _this = $(this);
        var par = _this.closest('hgroup').parent();
        var num = par.children().length;
       if(num <3){
           if(num==2){
          _this.popover({
              placement:"right",    //定位方向
              trigger:"hover",
              title:"温馨提示",  //如果不需要标题就不要配置这个选项
              content:"最多可以新增两项"
          });
           }
           _work();
       }

        function _work() {
            var child = _this.closest('hgroup').clone();
            child.find('input').val(" ");
            child.find('textarea').val(" ");
            var par_add =child.find('.btn_add').parent();
            par_add.empty();
            var removex = $('<a href="javascript:;"  data-toggle="tooltip" data-placement="right" title="删除该新增信息板块"' +
                'class="remove_add"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>')
            par_add.append(removex);
            if( child.find('.dropdown').find('em').length>0){
                child.find('.dropdown').find('em').html(" - 请选择 -");
            }
            child.find('.form_datetime').datetimepicker({
                format: 'yyyy-mm',
                autoclose: true,
                todayBtn: true,
                startView: 'year',
                minView:'year',
                maxView:'decade',
                language:  'zh-CN',
            });
            child.find("[data-toggle='popover']").popover({
                trigger:"focus",    //如果设为focus 当按钮失去焦点提示层会消失，例如页面空白处单机提示层消失
                placement:"top",
                html:true,
                content:'<p style="width: 500px;">如果您的时间持续到现在，请选择：<a href="javascript:;" onclick="obclicks()">至今</a></p><p></p>'
            });
            child.find('.remove_add').tooltip();
            par.prepend(child);


        }
    })
}

//子版块自己删除
function child_remove() {

    $(".issue").on("click",".remove_add",function () {
        $(this).closest('hgroup').remove();
        $(".btn_add").popover('destroy');

    })

}

//绑定内容框
function click_num() {

    $('.hr_numx').focus(function () {


        var _this = $(this);

        _this.closest('section').find('input[type="radio"]').removeAttr('checked');
    })


}

//50字符处理
function text_change() {
   $('.change_text').on('blur keyup input',function(){
       var _this = $(this);
       var text1=_this.val().length;
       var sy   = 50 - text1
       _this.closest('section').find('i').eq(0).html(text1);
       _this.closest('section').find('i').eq(1).html(sy);
       if(text1>50){
           _this.val(_this.val().substring(0, 50))
       }
   })


}
