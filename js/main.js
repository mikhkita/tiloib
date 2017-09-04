var progress = new KitProgress("#687734",3);
$(document).ready(function(){	
    progress.endDuration = 0.3;
    function mydevice () {
        pc = false; 
        tablet = false;
        mobile = false;
        if (myWidth>=1440) {
            pc = true;
        }
        else    if (myWidth>800) {
            tablet = true; 
        }
        else {
            mobile = true;
        }  
    } 
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        mydevice(); 
        slideoutdefine();
        slideOutClosePc();

    }
    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();
    
    // Добавление в корзину
	$("body").on("click",".b-btn-to-cart",function(){
        var url = $(this).attr("href"),
            img = null,
            name = null;

        if( $("input[name=quantity]").length ){
            url = url + "&quantity=" + $("input[name=quantity]").val();
        }

        if( $(this).parent().hasClass("b-product-card") ){
            name = $(this).parent().find("h3").text();
            img = $(this).parent().find(".b-img").attr("style");
        }else{

        }

        progress.start(1.5);
        $.ajax({
            type: "GET",
            url: url,
            success: function(msg){
                progress.end();
                var json = JSON.parse(msg);

                if( json.result == "success" ){
                    if( json.count != "0" ){
                        $(".b-btn-cart").removeAttr("onclick");
                    }else{
                        $(".b-btn-cart").attr("onclick", "return false;");
                    }
                    $(".b-cart-num").text(json.count);

                    $(".b-good-popup h4").text(name);
                    $(".b-good-popup .b-img").attr("style", img);

                    $(".b-add-cart-link").click();
                }else{
                    alert("Ошибка добавления в корзину");
                }
            }
        });
        return false;
    });

    // Поиск города
    $(".b-city-input").change(function(){
        if( $(this).val() != "" ){
            $(".b-choose-city").removeClass("disabled");
        }else{
            $(".b-choose-city").addClass("disabled");
        }
    });

    // Выбор города
    $(".b-choose-city").click(function(){
        if( $(this).hasClass("disabled") ) return false;

        var url = $(this).attr("href") + "&LOCATION=" + $(".b-city-input").val() + "&NAME=" + $(".bx-ui-sls-fake").attr("title");

        progress.start(1.5);
        $.ajax({
            type: "GET",
            url: url,
            success: function(msg){
                progress.end();
                var json = JSON.parse(msg);

                $.fancybox.close();
                if( json.result == "success" ){
                    $(".b-city-butt").text(json.city);
                }else{
                    alert("Ошибка добавления в корзину");
                }
            }
        });

        return false;
    });

    $('.b-product-slider').slick({
        dots: true,
        slidesToShow: 1,
        prevArrow: false,
        nextArrow: false,        
        infinite: true,
        adaptiveHeight: true 
    });
    if ($(".b-cart").length) {
        $( "#spinner" ).spinner({
            min: 0
        });
        //Set the start value
       $( "#spinner" ).spinner( "value", 1 );
       $(".step1").click(function(e){
            e.preventDefault();
           $(".b-ordering div").removeClass("show");
           $(".b-ordering-delivery").addClass("show");
            $(".b-ordering-process>ul>li").removeClass("current-step");
            $(".nav-step2").addClass("current-step");           
       });
       $(".step2").click(function(event){
            event.preventDefault();
           $(".b-ordering div").removeClass("show");
           $(".b-ordering-pay").addClass("show");
            $(".b-ordering-process>ul>li").removeClass("current-step");
            $(".nav-step3").addClass("current-step");           
       });       
       $(".b-ordering-delivery-back").click(function(ev){
            ev.preventDefault();
           $(".b-ordering div").removeClass("show");
           $(".b-ordering-items").addClass("show");
            $(".b-ordering-process>ul>li").removeClass("current-step");
            $(".nav-step1").addClass("current-step");           
       });  
       $(".b-ordering-process>ul>li").click(function(){
            if($(this).hasClass("current-step")){
            }
            else {
                $(".b-ordering-process>ul>li").removeClass("current-step");
                $(this).addClass("current-step");
                if ($(this).hasClass("nav-step1")){
                   $(".b-ordering div").removeClass("show");
                   $(".b-ordering-items").addClass("show"); 
                }
                else if ($(this).hasClass("nav-step2")) {
                   $(".b-ordering div").removeClass("show");
                   $(".b-ordering-delivery").addClass("show");
                }
                else if ($(this).hasClass("nav-step3")){
                    if ($(".b-ordering-delivery input:checked").length) {
                       $(".b-ordering div").removeClass("show");
                       $(".b-ordering-pay").addClass("show");
                    }
                    else {
                        $(".b-ordering-process>ul>li").removeClass("current-step");
                       $(".b-ordering div").removeClass("show");
                       $(".b-ordering-delivery").addClass("show");                        
                        $(".nav-step2").addClass("current-step");   
                        $(".b-radio").addClass("delivery-error");                       
                        //error();
                    }
                }
            }
       });
       
    }
    if ($('.b-map-cont').length) {
        var zoomm = Number($(".nav-map-city-active").attr("data-zoom"));
        var panto_lenin = new google.maps.LatLng(56.47999,84.9518);
        var panto_frunz = new google.maps.LatLng(56.4756052,84.9851);
        var panto_glav = new google.maps.LatLng(56.4748468,85.0515);
        var panto_nahim = new google.maps.LatLng(56.45486,84.976);
        var panto_mira = new google.maps.LatLng(56.516855,84.979);
        var current_city_coord = $(".nav-map-city-active").attr("data-point").split(",");
        var mapg = Number(current_city_coord[0]);
        var mapv = Number(current_city_coord[1]);
        var latlng = new google.maps.LatLng(mapg,mapv);
        var settings = {
            zoom: zoomm,
            center: latlng,
            mapTypeControl: false,
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
            navigationControl: true,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}, mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            scrollwheel: false
            };
        var map = new google.maps.Map(document.getElementById("map_canvas"), 
        settings);
        var companyLogo = new google.maps.MarkerImage('./i/map-marker-big.svg',
        //new google.maps.Size(100,130),
        null, null, new google.maps.Point(25,65),
        // new google.maps.Point(0,65),
         new google.maps.Size(50,65)
        );
            var companyPos_lenin = new google.maps.LatLng(56.47999,84.95);
            var companyPos_frunz = new google.maps.LatLng(56.4755032,84.9834);
            var companyPos_glav = new google.maps.LatLng(56.474918,85.049629);
            var companyPos_nahim = new google.maps.LatLng(56.45486,84.974);
            var companyPos_mira = new google.maps.LatLng(56.516855,84.977);


        var companyMarker_lenin = new google.maps.Marker({
            position: companyPos_lenin,
            map: map,
            icon: companyLogo,
            title:"На Ленина"
            });
        var companyMarker_frunz = new google.maps.Marker({
            position: companyPos_frunz,
            map: map,
            icon: companyLogo,
            title:"Фрунзенский рынок"
            });
        var companyMarker_glav = new google.maps.Marker({
            position: companyPos_glav,
            map: map,
            icon: companyLogo,
            title:"Главный"
            });
        var companyMarker_nahim = new google.maps.Marker({
            position: companyPos_nahim,
            map: map,
            icon: companyLogo,
            title:"Нахимова"
            });
        var companyMarker_mira = new google.maps.Marker({
            position: companyPos_mira,
            map: map,
            icon: companyLogo,
            title:"Мира"
            });
        var coords = new google.maps.LatLng(56.508041,84.98091)
        google.maps.event.addListener(companyMarker_lenin, 'click', function() {
            map.panTo(panto_lenin); 
            map.setZoom(17); 
            $('.b-map-adress').removeClass("show");
            $(".b-map-adress.lenin").addClass('show');
        });
        google.maps.event.addListener(companyMarker_frunz, 'click', function() {
            map.panTo(panto_frunz); 
            map.setZoom(17); 
            $('.b-map-adress').removeClass("show");
            $(".b-map-adress.frunz").addClass('show');
        });
        google.maps.event.addListener(companyMarker_glav, 'click', function() {
            map.panTo(panto_glav); 
            map.setZoom(17); 
            $('.b-map-adress').removeClass("show");
            $(".b-map-adress.glav").addClass('show');
        });   
        google.maps.event.addListener(companyMarker_nahim, 'click', function() {
            map.panTo(panto_nahim); 
            map.setZoom(17); 
            $('.b-map-adress').removeClass("show");
            $(".b-map-adress.nahim").addClass('show'); 
        }); 
        google.maps.event.addListener(companyMarker_mira, 'click', function() {
            map.panTo(panto_mira); 
            map.setZoom(17); 
            $('.b-map-adress').removeClass("show");
            $(".b-map-adress.mira").addClass('show'); 
        });    
        $(".b-adresses a").click(function(eve){
            eve.preventDefault();
            $(".b-adresses a").removeClass('active');
            $(this).addClass('active');
            var markerName = "companyMarker_"+$(this).attr('data-marker');
            google.maps.event.trigger(eval(markerName),"click");
        }); 
        $(".b-btn-close").click(function(close){
            close.preventDefault();
            $('.b-map-adress').removeClass("show");
        }) 
        $(".nav-map-city li").click(function(){
            $(".nav-map-city li").removeClass("nav-map-city-active");
            $(this).addClass("nav-map-city-active");
            $(".b-adresses>div").removeClass("selected");
            var dataCityId = $(this).attr("nav-id");
            $("[data-nav-id="+dataCityId+"]").addClass("selected");
            current_city_coord = $(".nav-map-city-active").attr("data-point").split(",");
            mapg = Number(current_city_coord[0]);
            mapv = Number(current_city_coord[1]);     
            var zoomm = Number($(".nav-map-city-active").attr("data-zoom"));       
            var panto_city = new google.maps.LatLng(mapg,mapv);
            map.panTo(panto_city); 
            map.setZoom(zoomm);
        });
    }
    function slideoutdefine(){
        if (mobile==true) {
            var slideout = new Slideout({
                'panel': document.getElementById('panel'),
                'menu': document.getElementById('menu'),
                'padding': 200,
                'tolerance': 70
                });
        // Toggle button
        document.querySelector('.toggle-button').addEventListener('click', function() {
          slideout.toggle(); 
        });

        function close(eve) {
          eve.preventDefault();
          slideout.close();
          slideout.disableTouch();
        }

        slideout
          .on('beforeopen', function() {
            this.panel.classList.add('panel-open');
            this.menu.classList.add('menu-active');
            slideout.enableTouch();
          })
          .on('open', function() {
            this.panel.addEventListener('click', close);
          })
          .on('beforeclose', function() {
            this.panel.classList.remove('panel-open');
            this.menu.classList.remove('menu-active');
            slideout.disableTouch();
            this.panel.removeEventListener('click', close);
          });

        }  

    }
    slideoutdefine();
    function slideOutClosePc() {
        if ($(".slideout-open").length) {
           if (mobile == false) {
                slideout.close();
            }         
        }

    }
});

if( typeof BX != "undefined" ){
    var lastWait = [];
    /* non-xhr loadings */
    BX.showWait = function (node, msg)
    {
        node = BX(node) || document.body || document.documentElement;
        msg = msg || BX.message('JS_CORE_LOADING');

        var container_id = node.id || Math.random();

        var obMsg = node.bxmsg = document.body.appendChild(BX.create('DIV', {
            props: {
                id: 'wait_' + container_id,
                className: 'bx-core-waitwindow'
            },
            text: msg
        }));

        setTimeout(BX.delegate(_adjustWait, node), 10);

        progress.start(3);
        lastWait[lastWait.length] = obMsg;
        return obMsg;
    };

    BX.closeWait = function (node, obMsg)
    {
        progress.end();
        if (node && !obMsg)
            obMsg = node.bxmsg;
        if (node && !obMsg && BX.hasClass(node, 'bx-core-waitwindow'))
            obMsg = node;
        if (node && !obMsg)
            obMsg = BX('wait_' + node.id);
        if (!obMsg)
            obMsg = lastWait.pop();

        if (obMsg && obMsg.parentNode)
        {
            for (var i = 0, len = lastWait.length; i < len; i++)
            {
                if (obMsg == lastWait[i])
                {
                    lastWait = BX.util.deleteFromArray(lastWait, i);
                    break;
                }
            }

            obMsg.parentNode.removeChild(obMsg);
            if (node)
                node.bxmsg = null;
            BX.cleanNode(obMsg, true);
        }
    };

    function _adjustWait()
    {
        if (!this.bxmsg)
            return;

        var arContainerPos = BX.pos(this),
            div_top = arContainerPos.top;

        if (div_top < BX.GetDocElement().scrollTop)
            div_top = BX.GetDocElement().scrollTop + 5;

        this.bxmsg.style.top = (div_top + 5) + 'px';

        if (this == BX.GetDocElement())
        {
            this.bxmsg.style.right = '5px';
        }
        else
        {
            this.bxmsg.style.left = (arContainerPos.right - this.bxmsg.offsetWidth - 5) + 'px';
        }
    }
}




