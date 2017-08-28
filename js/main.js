$(document).ready(function(){	
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
    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);
    $('.b-product-slider').slick({
        dots: true,
        slidesToShow: 1,
        prevArrow: false,
        nextArrow: false,        
        infinite: true   
    });
    if ($(".b-cart").length) {
        $( "#spinner" ).spinner({
            min: 0
        });
        //Set the start value
       $( "#spinner" ).spinner( "value", 1 );
       $(".step1").click(function(e){
            e.preventDefault();
           $(".b-ordering-items").addClass("hide");
           $(".b-ordering-items").removeClass("show");
           $(".b-ordering-delivery").removeClass("hide");
           $(".b-ordering-delivery").addClass("show");
       });
       $(".b-ordering-delivery-back").click(function(ev){
            ev.preventDefault();
           $(".b-ordering-delivery").removeClass("show");
           $(".b-ordering-delivery").addClass("hide");
           $(".b-ordering-items").addClass("show");
           $(".b-ordering-items").removeClass("hide");
       });       
       
    }
    if ($('.b-map-cont').length) {
        $(".b-adresses a").click(function(eve){
            eve.preventDefault();
            $(".b-adresses a").removeClass('active');
            $(this).addClass('active');
        });
        var zoomm = 13;
        var panto = new google.maps.LatLng(56.507841,84.97861);
        var panto_irk = new google.maps.LatLng(56.5142726,85.0482779);
        var panto_perv = new google.maps.LatLng(56.5200287,84.9628989);
        var latlng = new google.maps.LatLng(56.5154711,85.0050281);
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
        new google.maps.Size(100,130),
        new google.maps.Point(0,0),
        new google.maps.Point(25,32),
        new google.maps.Size(50,65)
        );
            var companyPos = new google.maps.LatLng(56.507841,84.97861);
            var companyPos_irk = new google.maps.LatLng(56.5142726,85.0482779);
            var companyPos_perv = new google.maps.LatLng(56.5200287,84.9628989);

        var companyMarker = new google.maps.Marker({
            position: companyPos,
            map: map,
            icon: companyLogo,
            title:"Говорова"
            });
        var companyMarker_irk = new google.maps.Marker({
            position: companyPos_irk,
            map: map,
            icon: companyLogo,
            title:"Иркутском"
            });
        var companyMarker_perv = new google.maps.Marker({
            position: companyPos_perv,
            map: map,
            icon: companyLogo,
            title:"Первомайской"
            });

        var coords = new google.maps.LatLng(56.508041,84.98091)

        google.maps.event.addListener(companyMarker, 'click', function() {
        map.panTo(panto); 
        map.setZoom(17); 
        $('.gov').removeClass("hide");
        $('.irk').removeClass("show");
        $('.perv').removeClass("show");
        $('.gov').addClass("show");
        $('.irk').addClass("hide");
        $('.perv').addClass("hide");
        });
        google.maps.event.addListener(companyMarker_irk, 'click', function() {
        map.panTo(panto_irk); 
        map.setZoom(17); 
        $('.irk').removeClass("hide");
        $('.gov').removeClass("show");
        $('.perv').removeClass("show"); 
        $('.irk').addClass("show");
        $('.gov').addClass("hide");
        $('.perv').addClass("hide");    
        });
        google.maps.event.addListener(companyMarker_perv, 'click', function() {
        map.panTo(panto_perv); 
        map.setZoom(17); 
        $('.perv').removeClass("hide");
        $('.irk').removeClass("show");
        $('.gov').removeClass("show");  
        $('.perv').addClass("show");
        $('.irk').addClass("hide");
        $('.gov').addClass("hide"); 
        });    
    }
});