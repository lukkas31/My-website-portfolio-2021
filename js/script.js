
// document ready

$(document).ready(function() {
    $('.preloader').addClass("none");
    
    let letter = $("path#letter");
    letter.addClass("letters-animation");
    
});

//scroll trigger
gsap.registerPlugin(ScrollTrigger);
let scene = gsap.timeline();
let scene2 = gsap.timeline();

ScrollTrigger.create({
    animation:scene,
	trigger: "body",
	start: "top top",
	end: "100% 80%",
	scrub:3,
   // markers: true
});


scene.from(".title", {
    xPercent: 65,
    yPercent: -40,
    scale: 1.9,
    delay: 0.1,
    ease: "power2.inOut",
    autoRound: false
},0);
scene.from(".title2", {
    xPercent: 80,
    yPercent: 20,
    scale: 1.9,
    ease: "power2.inOut",
    autoRound: false,
},0);

//refresh page
$('.title, .title2').click(function() {
    location.reload();
});
//refresh top
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

//-main content changes

function hide(cont){
    gsap.set(cont, {autoAlpha: 0});

    //animation
}

function show(cont){
    gsap.set(cont, {autoAlpha: 1});

    //animation
}


//layout changes

function selectNavigation(content){

    let actualContentId = content.getAttribute('id'),
        menu = $('.menu'),
        selectedMenu = menu.find("."+actualContentId),
        actualBackground = $(".background_"+actualContentId),
        allBackgroun_img = $(".bg-img"),
        contentTitleRight = $(".content-title-right"),
        actual_titleRight = $("."+actualContentId+"_title-right"),
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
    }
    else{
        scrollArrow.css('-webkit-transform','rotate(0deg)');
        scrollArrow.css('-moz-transform','rotate(0deg)');
        scrollArrow.css('transform','rotate(0deg)');
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

main_menu_a.on('click', function () {

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
/*
document.addEventListener("DOMContentLoaded", function(){

    gsap.utils.toArray("section").forEach(function(section){
        
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
});*/

function contentHide(){
    gsap.utils.toArray("section").forEach(function(section){
        
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
if (window.matchMedia('(min-width: 769px)').matches) {
    document.addEventListener("DOMContentLoaded", contentHide());
}else{
    $(".content").css({"opacity":"1", "visibility":"inherit", "position":"relative"})
}

// aspect ratio calculator
//
let aspect_ratio_asside = 3.5,
    asside = $(".asside"),
    asside2 = $(".asside2"),
    asside3 = $(".asside3"),
    asside4 = $(".asside4"),
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
aspectRatioCalc(asside2, aspect_ratio_asside);
aspectRatioCalc(asside3, aspect_ratio_asside);
aspectRatioCalc(asside4, aspect_ratio_asside);
aspectRatioCalc(main_menu_container, aspect_ratio_asside);
var bottom = $(window).scrollTop() + $(window).height();

