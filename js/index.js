/**
 * Created by Administrator on 2017-3-2.
 */
$(function () {
    /*header数据循环页面区*/
    var random = GetRandomNum(0,info_data.length-1);
    var url_bg = 'url("'+info_data[random].top_bg+'") no-repeat top center';
    var member_info = '<div class="avatar">'+
                            '<img src="'+info_data[random].avatar+'" alt="个人头像">'+
                        '</div>'+
                        '<div class="nickname">'+info_data[random].nickname+'</div>';
    $(".top_bg").css({"background":url_bg,"background-size":"7.5rem auto"});
    $(".member_info").append(member_info);

    /*main数据循环页面区*/
    f_data = f_data.sort(randomsort);//将数组随机排序
    f_data.splice(1,f_data.length-3);
    
    function randomsort(a, b) {
        return Math.random()>.5 ? -1 : 1;
    }

    for (var i=0;i<f_data.length;i++){
        var index = i;
        var fav="";
        var attach_figure="";
        var com_content ="";
        for (var j=0;j<f_data[index].attache_src.length;j++){
            var attach_src= f_data[index].attache_src[j];
            attach_figure +='<figure>'+
                                    '<a href="'+attach_src+'">'+
                                        '<img src="'+attach_src+'" alt="附图">'+
                                    '</a>'+
                             '</figure>';
        }

        for (var k=0;k <f_data[index].fav.length;k++){
            if(f_data[index].fav.length<=1){
                fav += '<span>'+f_data[index].fav[k]+'</span>'
            }else{
                if(k==0){
                    fav = '<span>'+f_data[index].fav[0]+'</span>';
                }
                if(k <f_data[index].fav.length-1){
                    fav += '<span>'+','+ f_data[index].fav[k+1]+'</span>';
                }

            }
        }
        for (var m=0;m <f_data[index].com_content.length;m++){
            com_content +=  '<div class="comment_something">'+
                                '<span>'+f_data[index].com_content[m].name+'：'+'</span>'+
                                f_data[index].com_content[m].content+
                            '</div>';
        }

         var f_single = '<li class="f_single clearfix">'+
                            '<div class="f_aside">'+
                                '<img src="'+f_data[i].avatar_src+'" alt="朋友头像">'+
                            '</div>'+
                            '<div class="f_wrap">'+
                                '<h4>'+f_data[i].f_name+'</h4>'+
                                '<div class="f_content">'+
                                    '<div class="txt_area content_limit">'+ f_data[i].txt_area +'</div>'+
                                    '<div class="img_area clearfix">'+
                                        '<div class="my-gallery">'
                                            + attach_figure +
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="f_comment">'+
                                    '<p class="comment_top clearfix">'+
                                        '<span>'+ f_data[i].time +'</span>'+
                                        '<span>评论</span>'+
                                    '</p>'+
                                    '<div class="comment_bot">'+
                                        '<div class="fav">'+
                                            '<i class="iconfont">&#xe616;</i>'+
                                            fav +
                                        '</div>'+
                                        com_content +
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</li>';
        $(".feed_friend_list").append(f_single)
    }





    /*放大操作区*/
    var pswp = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'+
                    '<div class="pswp__bg"></div>'+
                    '<div class="pswp__scroll-wrap">'+
                        '<div class="pswp__container">'+
                            '<div class="pswp__item"></div>'+
                            '<div class="pswp__item"></div>'+
                            '<div class="pswp__item"></div>'+
                        '</div>'+
                        '<div class="pswp__ui pswp__ui--hidden">'+
                            '<div class="pswp__top-bar">'+
                                '<div class="pswp__counter"></div>'+
                                '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'+
                               /* '<button class="pswp__button pswp__button--share" title="Share"></button>'+
                                '<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>'+
                                '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>'+*/
                                '<div class="pswp__preloader">'+
                                    '<div class="pswp__preloader__icn">'+
                                        '<div class="pswp__preloader__cut">'+
                                            '<div class="pswp__preloader__donut"></div>'+
                                        '</div>'+
                                    '</div>'+
                                 '</div>'+
                            '</div>'+
                           /* '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'+
                                '<div class="pswp__share-tooltip"></div>'+
                            '</div>'+
                            '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>'+
                            '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>'+*/
                            '<div class="pswp__caption">'+
                                '<div class="pswp__caption__center"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';

    $(".img_area").each(function () {
        $(this).append(pswp);
        var self = this;
        var f_img_length = $(self).find("a").length;
        /*获取图片原始尺寸*/
        $(self).find("a").each(function () {
            var me = this;
            var imgSrc = $(this).find("img").attr("src");
            getImageWidth(imgSrc,function(w,h){
                var data_size = w*5+"x"+ h*5;
                $(me).attr("data-size",data_size);
                var data_radio = w/h;
                if(data_radio>=1){
                    $(me).find("img").addClass("active");
                }else{
                    $(me).find("img").remove("active");
                }
            });
        });

        if (f_img_length == 1) {
            $(self).find("a").css({"width":"75%","height":"5.15rem"});
        }else if(f_img_length == 2){
            $(self).find("a").css({"width":"45%","height":"1.64rem"});
        }else{
            $(self).find("a").css({"width":"28%","height":"1.64rem"});
        }
    });

    $(".content_limit").wordLimit(93);
});

function getImageWidth(url,callback){
    var img = new Image();
    img.src = url;
    // 如果图片被缓存，则直接返回缓存数据
    if(img.complete){
        callback(img.width, img.height);
    }else{
        // 完全加载完毕的事件
        img.onload = function(){
            callback(img.width, img.height);
        }
    }
}

(function($){
    $.fn.wordLimit = function(num){
        this.each(function(){
            var maxwidth = num;
            var pretext = $(this).html();
            if( $(this).text().length > maxwidth){
                $(this).text($(this).text().substring(0,maxwidth));
                $(this).html($(this).html()+'…'+'<p style="color: cornflowerblue;" class="txt_area extra_info spread">全文</p>');
                var self = this;
                $(this).find(".spread").click(function () {
                    $(self).html(pretext + '<p style="color: cornflowerblue;" class="txt_area extra_info pick_up">收起</p>');
                    var dom = self;
                    $(self).find(".pick_up").click(function () {
                        $(dom).html(pretext);
                        $(dom).wordLimit(num);
                    })
                });
            }
        });
    }
})(jQuery);

/*随机数*/
function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

