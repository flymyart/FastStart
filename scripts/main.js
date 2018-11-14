$(document).ready(function(){

    var navHeight = $(".nav").height();
    var animEl = $(".anim");
    var navEl = $(".nav");
    var arEl = $(".arrow");
    var navHref = $(".navHref");
    var navBtn = $(".nav-btn a");
    
    var targetIndex = -1;
    var numShowSlide = 0;
    var bullet = $(".bullet");
    var bulletItems = bullet.find(".item");
    var slider = $(".slider");
    var sliderBox = slider.find(".box");
    var sliderItems = sliderBox.find(".item");
    var widthItems = sliderItems.width();

    // var widthSlider = slider.width();
    // var widthSliderBox = 3 * widthSlider;


    animEl.each(function(index){
        var top = $(this)[0].getBoundingClientRect().top;
        var bottom = $(this)[0].getBoundingClientRect().bottom;
        var height = $(this)[0].getBoundingClientRect().height;

        if( top >= 0 && height + window.innerHeight >= bottom ){
            targetIndex = index;
            animEl.eq(targetIndex).addClass("active");
        }
        
    });

    $(window).scroll(function(){ 
        var aboutTop = $("#aboutus")[0].getBoundingClientRect().top;
        var realTop = $("#realnost")[0].getBoundingClientRect().top;
        var windowHeight = $(window).height();
        var targetIndexBtn = -1;
        

        animEl.each(function(index){
            var top = $(this)[0].getBoundingClientRect().top;
            var bottom = $(this)[0].getBoundingClientRect().bottom;
            var height = $(this)[0].getBoundingClientRect().height;

            if( top >= 0 && height + window.innerHeight >= bottom ){
                targetIndex = index;
            }
            // console.log(index, top);
            animEl.eq(targetIndex).addClass("active");
        });

        if( aboutTop <= 0 ){
            navEl.css('top', '0px' );
            navEl.css('position', 'fixed');
        }else{
            navEl.css('top', aboutTop);
        }
        
        if( realTop <= windowHeight){
            arEl.css('display', 'block');
        }else{
            arEl.css('display', 'none');
        }

        navHref.each(function(index){
            var topNavHref = $(this)[0].getBoundingClientRect().top - navHeight -10;

            if( topNavHref <= 0 ){
                targetIndexBtn = index;
            }
            // console.log(index, top);
        });
        
        navBtn.removeClass('active');
        if( targetIndexBtn != -1 ){
            navBtn.eq(targetIndexBtn).addClass('active');
        }
        
    });

    navBtn.click(function(e){
        e.preventDefault();
        var navHrefAttr = $(this).attr("href");
        var targetNavHr = $(navHrefAttr);
        var widthWindow = $(window).width();

        navBtn.removeClass('active');
        $(this).addClass("active");

        $("html, body").animate({
            scrollTop: targetNavHr.offset().top - navHeight
        }, 1000);

        if( widthWindow <= 768 ){
            $(".nav-btn").css('display', 'none');
        }
    });

    $(".arrow-up").click(function(){
        var arrAttr = $(this).attr('href');
        var targetHr = $(arrAttr);

        $("html, body").animate({
            scrollTop: targetHr.offset().top
        }, 1000);
    });

    $(".nav-btn-drei").click(function(){
        var displayNav = $(".nav-btn").css('display');
        
        if( displayNav == 'none') {
            $(".nav-btn").css('top', navHeight + 'px');
            $(".nav-btn").slideDown(500);
        }else{
            $(".nav-btn").slideUp(500);
        }

    });

    bulletItems.eq(numShowSlide).css('opacity', '1');

    $(this).find(bulletItems).click(function(){
        var clickedEl = $(this);
        var indexEl = bulletItems.index(clickedEl);

        bulletItems.eq(numShowSlide).css('opacity', '0.5');
        numShowSlide = indexEl;
        sliderBox.animate({
            'left': - widthItems * numShowSlide + 'px'
        }, 500);
        bulletItems.eq(numShowSlide).css('opacity', '1');

    });

    $(window).resize(function(){
        var navDisplay = $(".nav-btn").css('display');
        var widthWindow = $(window).width();
        var widthSlider = slider.width();
        var widthSliderBox = 3 * widthSlider;
        // var widthSlRes = slider.css('width');


        if( widthWindow <= 768 ){
            $(".nav-btn").css('display', 'none');
        }else{
            $(".nav-btn").css('display', 'flex');
        }
        
        widthSlider = slider.css('width');
        widthSlider = slider.width();
        console.log(widthSlider);

        // widthSliderBox = 3 * widthSlider;
        sliderBox.css('width', widthSliderBox + 'px');
        widthItems = widthSlider;
        sliderItems.each(function(){
            sliderItems.css('width', widthSlider  + 'px');
        });
        sliderBox.css('left', - widthItems * numShowSlide  + 'px');
    });
});