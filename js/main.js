/**
 * Created by Sinderlar on 2017/2/13.
 */
'use strict';
$(function () {
    //1.图片轮播逻辑
    function  resize() {
        // console.log(111);
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth<768;
        $("#main_ad >.carousel-inner>.item").each(function (i,item) {
            // console.log(111);
            var $item = $(item);
            var imgSrc = $(item).data(isSmallScreen?'image-xs':'image-lg');
            $item.css("backgroundImage",'url("'+imgSrc+'")');
        //    需要小图的时候，尺寸等比例变化，所以小图使用img方式
            if (isSmallScreen) {
                $item.html('<img src="'+imgSrc+'" alt=""/>');
            }
            else {
                $item.empty();
            }
        });
    }
    $(window).on("resize",resize).trigger('resize');
    //1.1移动端的轮播图【公有代码】
    var $carousel = $(".carousel");
    var startX,endX;
    var offsetX = 50;
    $carousel.on('touchstart',function (e) {
        //这里的e是jQuery对象,不是原生
        startX = e.originalEvent.touches[0].clientX;
        console.log(startX);
    });
    $carousel.on('touchmove',function (e) {
        //这里的e是jQuery对象,不是原生
        endX = e.originalEvent.touches[0].clientX;
        console.log(endX);
    });
    $carousel.on('touchend',function (e) {
        //这里的e是jQuery对象,不是原生
        var distance = Math.abs(startX-endX);
        console.log(distance);
        if (distance>offsetX) {
            //记住这里是$(this)是指触发的轮播图，而不是全部 $carousel
            $(this).carousel(startX>endX?"next":"prev");
        }
    });
    //2.tooltips初始化【未完成】

    //3.横向滚动条
    var $ulContainer = $(".nav-tabs");
    console.log(111);
    var totalWidth = 30;//因为ul被加上20px
    $ulContainer.children().each(function (i, ele) {
        // console.log(ele.clientWidth);
        // console.log($(ele).width());
        totalWidth += ele.clientWidth;
        //判断是否ul宽度是否超出屏幕,超过显示横向滚动条
        if (totalWidth > $(window).width()) {
            $ulContainer
                .css("width", totalWidth)
                .parent().css("overflow-x", 'scroll');
        }
    });
    //4.新闻列表点击事件
    var $newTitle = $('.news-title');
    // $('#news .news-choice a').on("click",function () {
    $('.news-choice a').on("click",function () {
        console.log(1111);
        var $this = $(this);
        console.log($this);
        var title = $this.data("title");
        console.log(title);
        $newTitle.text(title);
    });

});