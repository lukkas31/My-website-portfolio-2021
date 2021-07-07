
// document ready

$(document).ready(function() {
    $('.preloader').addClass("none");
    gsap.from(".title", 1, {opacity: 0, delay: 0.3, x: -30, ease: "back.out(1)"});
    gsap.from(".title2", 1, {opacity: 0, delay: 0.3, x: -30, ease: "back.out(1)"});
    gsap.from(".social-network .col", 1, {opacity: 0, delay: 0.1, y: -70, ease: "back.out(1)", stagger: {each: 0.15, from: "end"}});
    gsap.from(".background_scroll-anim", 2.5, { scale: "1.2", ease: "power3.out"});
    let letter = $("path#letter");

    letter.delay(300).queue(function(next){
        $(this).addClass("letters-animation");
        next();
    });
});

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

//portfolio lightbox
let pLightbox = $('.portfolio-lightbox'),
    pLightboxBtn = pLightbox.find('.p-lightbox_text_btn'),
    pBox = $('.portfolio-box');

pLightbox.hide();

pBox.on('click', function(event){
    event.preventDefault();

    var portfolioImg = $(this).find('img'),
        portfolioImgAttr = portfolioImg.attr('data-url'),
        portfolioLink = $(this).find('.portfolio-link').html(),
        portfolioText = $(this).find('.portfolio-text').html();

    //new portfolio lightbox
    pLightbox.find('img').attr('src', portfolioImgAttr);
    pLightbox.find('.p-lightbox_text_web').html(portfolioLink);
    pLightbox.find('.p-lightbox_text_desc').html(portfolioText);

    pLightbox.show(500);
    gsap.from(".p-lightbox_text_web", 1.5, {opacity: 0, delay: 0.2, x: 70, ease: "back.out(1)"});
    gsap.from(".p-lightbox_text_desc", 1.5, {opacity: 0, delay: 0.2, x: 70, ease: "back.out(1)"});
    gsap.from(".p-lightbox_text_btn", 1.5, {opacity: 0, delay: 0.2, y: 60, ease: "back.out(1)"});
    gsap.from(".portfolio-lightbox_img", 1., {opacity: 0, delay: 0.2, scale: ".9", ease: "power3.out"});
})

pLightboxBtn.on('click', function(){
    pLightbox.hide();
})

$(document).on('keyup', function(e){
    if( e.which === 27){
        pLightbox.hide();
    }
})

//refresh page
$('.title, .title2').click(function() {
    $(location).attr('href', '');
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
        contentTitleRight = $(".content-title-right"),
        actual_titleRight = $("."+actualContentId+"_title-right"),
        social_icon = $(".social-network_fixed-block"),
        scrollArrow = $(".scroll_arrow");
    
    //menu selected
    main_menu_li.removeClass("selected");
    selectedMenu.addClass("selected");
    
    //right title
    contentTitleRight.removeClass("title-visible");
    actual_titleRight.addClass("title-visible");
    
    //scroll arrow direction
    if(actualContentId == "kontakt"){
        scrollArrow.css('-webkit-transform','rotate(180deg)');
        scrollArrow.css('-moz-transform','rotate(180deg)');
        scrollArrow.css('transform','rotate(180deg)');
        social_icon.hide();
        $('.background_kontakt').show();
    }
    else{
        scrollArrow.css('-webkit-transform','rotate(0deg)');
        scrollArrow.css('-moz-transform','rotate(0deg)');
        scrollArrow.css('transform','rotate(0deg)');
        social_icon.show();
        $('.background_kontakt').hide();
    }
    
    
    
}

//main menu
let main_menu = $(".menu"),
main_menu_a = main_menu.find("a"),
main_menu_li = main_menu.find("li");

main_menu_a.on('click', function (event) {
    
    var a = $(this),
    click_li = a.parent();
    
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
        
        hideSection(content);
        
        ScrollTrigger.create({
            trigger: section,
            start: "center bottom",
            end: "center top",
            onEnter:()=> showSection(content)||selectNavigation(content),
            onEnterBack:()=> showSection(content)||selectNavigation(content),
            onLeave:()=> hideSection(content),
            onLeaveBack:()=> hideSection(content),
            scrub: false,
            once: false
        })
    })
}

//-main content changes
function hideSection(cont){
    
    gsap.set(cont, {autoAlpha: 0});
    var newCont = $(cont);
    //newCont.find('#moving-part').removeClass('animated-show').addClass('animated-hide');    
}

function showSection(cont){
    gsap.set(cont, {autoAlpha: 1});
    
    //var newCont = $(cont);
    var contId = cont.getAttribute('id');
    //newCont.find('#moving-part').removeClass('animated-hide').addClass('animated-show');
    
    if(contId == 'kto-som' ){
        gsap.from(".c-fragment2", 1, {opacity: 0, delay: 0.3, x: 40, ease: "back.out(1)"});
        gsap.from(".c-fragment1", 1.5, {opacity: 0, delay: 0.4, x: 100, ease: "back.out(1)"});
        gsap.from(".kto-text_container", 1, {opacity: 0, delay: 0.6, y: 100, ease: "back.out(1)"});
    }
    else if (contId == 'moje-prace') {
        gsap.from("#moving-port", 1, {opacity: 0, delay: 0.1, x: 100, ease: "back.out(1)", stagger : 0.1});
        gsap.from("#moving-port-footer", 1, {opacity: 0, delay: 0.6, y: 60, ease: "power3.out"});
    }
    else if (contId == 'video') {
        gsap.from("#moving-vid", 1, {opacity: 0, x: 100, ease: "back.out(1)", stagger : 0.1});
        gsap.from("#moving-vid-footer", 1, {opacity: 0, delay: 0.6, y: 60, ease: "power3.out"});
    }
    else if (contId == 'kontakt') {
        gsap.from(".contact-list_item", 1, {opacity: 0, delay: 0.1, x: 100, ease: "back.out(1)", stagger: {each: 0.15, from: "end"}});
    }
}

let xPercentTitle = 80,
    xPercentTitle2 = 95,
    secondContainer = $("#main-photo-container"); 

if (window.matchMedia('(min-width: 769px)').matches) {
    document.addEventListener("DOMContentLoaded", contentHide());
    secondContainer.removeClass('order-first');
}else{
    $(".content").css({"opacity":"1", "visibility":"inherit", "position":"relative"});
    secondContainer.addClass('order-first');
    xPercentTitle = 50; //55
    xPercentTitle2 = 55; //70
}

//backgroun scale scroll
gsap.to( (".background_scroll-anim"), {
    scrollTrigger: {
        trigger: "body",
        endTrigger: ".contact",
        start: "top top",
        end: "bottom bottom",
        scrub: 2
    },
    scale: "1.2",
    autoRound: false
    
})

//scroll trigger
gsap.registerPlugin(ScrollTrigger);
let scene = gsap.timeline();

ScrollTrigger.create({
    animation:scene,
    trigger: "body",
    start: "top top",
    end: "100% 80%",
    scrub: 3,
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