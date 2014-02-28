//standart load
$( document ).ready(function() {
    /*tooltip*/
    init_tooltip();
    /*tab*/
    init_tabs();
    /*link back to top animation*/
    init_back_to_top();

    /*backgroung Config*/
    init_bgswitch();
    /*light box Config*/
    init_color_box();
    /*Slider Config*/
    init_slider();
    /*Grid Config*/
    init_grid();
});


function init_tooltip(){
    $('.tootip').tooltip();
}

function init_color_box(){
    // $(".ajax-demo").colorbox({
    //     width: 290,
    //     scrolling:false,
    //     fixed:true,
    //     height: 200,
    //     opacity:0.1
    // });
}

function init_bgswitch(){
    var bg_pattern = getCookie('bg_pattern');
    if (bg_pattern != null){
        $("body").css('background-image', 'url("'+bg_pattern+'")');
    }
}

function init_back_to_top(){
    $('#back-to-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
}

function init_slider(){
    //	Responsive layout, resizing the items
    if ($('#fluid-slider').length){
        $('#fluid-slider').carouFredSel({
            responsive: true,
            width: '100%',
            prev: '#fluid-slider-prev',
            next: '#fluid-slider-next',
            scroll: 1,
            mousewheel: true,
            swipe: {
                onMouse: true,
                onTouch: true
            },
            auto: {
                pauseOnHover: 'resume',
                timeoutDuration : 6000
            
            },
            items: {
                width: 400,
                //	height: '30%',	//	optionally resize item-height
                height: "75%",
                visible: {
                    min: 2,
                    max: 6
                }
            }
        });
    }
    
    if ($('#news-carousel').length){
        var _scroll = {
            delay: 1000,
            easing: 'linear',
            items: 1,
            duration: 0.07,
            timeoutDuration: 0,
            pauseOnHover: 'immediate'
        };
        $('#news-carousel').carouFredSel({
            width: '100%',
        
            align: false,
            items: {
                width: 'variable',
                height: 55,
                visible: 1
            },
            scroll: _scroll
        });
    }
    if ($('#carousel').length){
        $('#carousel').carouFredSel({
            width: '100%',
            responsive: true,
            items: {
                width: 300,
                height: "23%",
                visible: {
                    min: 1,
                    max: 1
                }
            },
            scroll: {
                pauseOnHover: 'resume',
                fx: 'fade',
                easing: 'linear',
                items: 1,
                duration: 1000,
                timeoutDuration: 6000
            },
            mousewheel: true,
            swipe: {
                onMouse: true,
                onTouch: true
            },
            prev: '#prev',
            next: '#next',
            pagination: {
                container: '#pager',
                deviation: 1
            }
        });
    }
    
    
    if ($('#list_images_property').length){
        $('#list_images_property').carouFredSel({
            auto: false,
            responsive: true,
            width: '100%',
            prev: '#prev2',
            next: '#next2',
            mousewheel: true,
            swipe: {
                onMouse: true,
                onTouch: true
            },
            scroll: 2,
            items: {
                width: 200,
                //	height: '30%',	//	optionally resize item-height
                visible: {
                    min: 2,
                    max: 6
                }
            }
        });
        $('#list_images_property a').click(function(){
            $('.preloader').show(0).delay(4000).fadeOut("slow");
            var bigImage = $(this).data("bigimage");
            var bigTitle = $(this).data("title");
            var bigDesc = $(this).data("desc");
            $(".big-image .desc-image h3").text(bigTitle);
            $(".big-image .desc-image p").text(bigDesc);
            $("#big-image-preview").attr('src', bigImage) 
            console.log(bigTitle);
            return false; 
        });
    }
    
}


function init_grid(){
    $(".grid-item").gridalicious({
        width: 250,
        gutter: 10,
        animate: true,
        effect: 'fadeInOnAppear'
    }); 
    
    $(".grid-galeries").gridalicious({
        width: 240,
        gutter: 10,
        animate: true,
        effect: 'fadeInOnAppear'
    });
}



function init_tabs(){
    $('.bot-tab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
}


//================================
//function SetCookie 
//================================
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}