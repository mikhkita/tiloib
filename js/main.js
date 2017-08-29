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
        var zoomm = 13;
        var panto_lenin = new google.maps.LatLng(56.47999,84.9518);
        var panto_frunz = new google.maps.LatLng(56.4756052,84.9851);
        var panto_glav = new google.maps.LatLng(56.4748468,85.0515);
        var panto_nahim = new google.maps.LatLng(56.45486,84.976);
        var panto_mira = new google.maps.LatLng(56.516855,84.979);
        var latlng = new google.maps.LatLng(56.4739817,85.0801201);
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
    }
});