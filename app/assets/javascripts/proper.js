//standart load
$( document ).ready(function() {
    /*tooltip*/
    init_tooltip();
    /*link back to top animation*/
    init_back_to_top();

    init_grid();
});


function init_tooltip(){
    $('.tootip').tooltip();
}

function init_back_to_top(){
    $('#back-to-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
}


function init_grid(){
    $(".grid-item").gridalicious({
        width: 215,
        gutter: 20,
        animate: true,
        effect: 'fadeInOnAppear'
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