
// document ready

$(document).ready(function() {
    $('.preloader').addClass("none");
    
    let letter = $("path#letter");
    letter.addClass("letters-animation");
    
    
    //video lightbox
    let vLightbox = $('.video-lightbox'),
    vBox = $('.video-box'),
    vBoxBtn = vBox.find('.video-box_play-button');
    
    vLightbox.hide();
    
    vBoxBtn.on('click', function(event){
        event.preventDefault();
        
        let videoHref = $(this).attr('data-url'),
        iframe = $('iframe');
        
        iframe.attr('src', videoHref);
        vLightbox.show();
    })
    
    vLightbox.on('click', function() {
        $(this).hide('fast').find('#videoplay').removeAttr('src');
    });
    
    
    
    $(document).on('keyup', function(event) {
        if ( event.which === 27 ){
            vLightbox.hide('fast').find('#videoplay').removeAttr('src');
            
        }
        
    });
    
    
    
    
    
    
    
    
    //refresh page
    $('.title, .title2').click(function() {
        location.reload();
    });
    //refresh top
    $(window).on('beforeunload', function() {
        $(window).scrollTop(0);
    });
    
    
    
    
    
    
    //layout changes
    
    function selectNavigation(content){
        
        
        let actualContentId = content.getAttribute('id'),
        menu = $('.menu'),
        selectedMenu = menu.find("."+actualContentId),
        actualBackground = $(".background_"+actualContentId),
        allBackgroun_img = $(".bg-img"),
        contentTitleRight = $(".content-title-right"),
        actual_titleRight = $("."+actualContentId+"_title-right"),
        social_icon = $(".social-network_fixed-block"),
        scrollArrow = $(".scroll_arrow");
        
        //menu selected
        main_menu_li.removeClass("selected");
        selectedMenu.addClass("selected");
        
        //content background image
        allBackgroun_img.removeClass("background-visible");
        actualBackground.addClass("background-visible");
        
        //right title
        contentTitleRight.removeClass("title-visible");
        actual_titleRight.addClass("title-visible");
        
        //scroll arrow direction
        if(actualContentId == "kontakt"){
            scrollArrow.css('-webkit-transform','rotate(180deg)');
            scrollArrow.css('-moz-transform','rotate(180deg)');
            scrollArrow.css('transform','rotate(180deg)');
            social_icon.hide();
        }
        else{
            scrollArrow.css('-webkit-transform','rotate(0deg)');
            scrollArrow.css('-moz-transform','rotate(0deg)');
            scrollArrow.css('transform','rotate(0deg)');
            social_icon.show();
        }
        
        //backgroun scale scroll
        gsap.to( actualBackground, {
            scrollTrigger: {
                trigger: "body",
                endTrigger: ".contact",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            },
            scale: "1.05"
            
        })
        
        
    }
    
    //--------------------------menu
    let main_menu = $(".menu"),
    main_menu_a = main_menu.find("a"),
    main_menu_li = main_menu.find("li");
    
    main_menu_a.on('click', function (event) {
        
        //event.preventDefault();
        
        
        var a = $(this),
        click_li = a.parent(),
        href = a.attr('href');
        
        if(click_li.is('.selected') ) {
            return;
        }
        
        click_li.addClass('selected');
        click_li.siblings('li').removeClass('selected');
        
        
    });
    
    // change section on scroll
    
    function contentHide(){
        gsap.utils.toArray("section.panel").forEach(function(section){
            
            let content = section.querySelector(".content"); 
            
            hide(content);
            
            ScrollTrigger.create({
                trigger: section,
                start: "center bottom",
                end: "center top",
                onEnter:()=> show(content)||selectNavigation(content),
                onEnterBack:()=> show(content)||selectNavigation(content),
                onLeave:()=> hide(content),
                onLeaveBack:()=> hide(content),
                scrub: false,
                once: false,
                //markers: true
            })
        })
    }
    
    //-main content changes
    
    function hide(cont){
        
        gsap.set(cont, {autoAlpha: 0});
        var newCont = $(cont);
        newCont.find('#moving-part').removeClass('animated-show').addClass('animated-hide');
        
        //gsap.to(cont, {scaleX:0.8, scaleY:0.8, opacity:0.7});
        //newCont.css({"opacity":"0", "visibility":"hidden"});
        
    }
    
    function show(cont){
        gsap.set(cont, {autoAlpha: 1});
        
        var newCont = $(cont);
        var contId = cont.getAttribute('id');
        //newCont.css({"opacity":"1", "visibility":"inherit"});
        newCont.find('#moving-part').removeClass('animated-hide').addClass('animated-show');

       if(contId == 'kto-som' ){
           gsap.from(".kto-img_inner", 1, {x: 100});
       }
       else if (contId == 'moje-prace') {
            gsap.from(".portfolio-box", 1, {x: 100});
       }
       else if (contId == 'video') {
            gsap.from(".video-box", 1, {x: 100});
       }
       else if (contId == 'kontakt') {
            gsap.from("li", 1, {x: 100});
       }
           
       //dopln delay!
    }
    
    let xPercentTitle = 80,
    xPercentTitle2 = 95; 
    
    if (window.matchMedia('(min-width: 769px)').matches) {
        document.addEventListener("DOMContentLoaded", contentHide());
    }else{
        $(".content").css({"opacity":"1", "visibility":"inherit", "position":"relative"});
        xPercentTitle = 55;
        xPercentTitle2 = 70; 
    }
    
    //scroll trigger
    gsap.registerPlugin(ScrollTrigger);
    let scene = gsap.timeline();
    let scene2 = gsap.timeline();
    
    ScrollTrigger.create({
        animation:scene,
        trigger: "body",
        start: "top top",
        end: "100% 80%",
        scrub: 3,
        // markers: true
    });
    
    
    scene.from(".title", {
        xPercent: xPercentTitle,
        yPercent: -40,
        scale: 2,
        delay: 0.1,
        ease: "power2.inOut",
        autoRound: false
    },0);
    scene.from(".title2", {
        xPercent: xPercentTitle2,
        yPercent: 20,
        scale: 2,
        ease: "power2.inOut",
        autoRound: false,
    },0);
    
    // aspect ratio calculator
    //
    let aspect_ratio_asside = 3.5,
    asside = $(".asside-menu");
    main_menu_container = $(".main-menu");
    
    function aspectRatioCalc(object, aspectRatio){
        
        jQuery(document).ready(function($) {
            object.width( object.height() / aspectRatio );
        });
        
        jQuery(window).resize(function() {
            object.width( object.height() / aspectRatio );
        });
    }
    
    aspectRatioCalc(asside, aspect_ratio_asside);
    
    aspectRatioCalc(main_menu_container, aspect_ratio_asside);
    var bottom = $(window).scrollTop() + $(window).height();
    
});
