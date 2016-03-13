$(function () {
    var changeFontSize = function (element, difference) {
        //ucina tekst od 0 do 2 od konca
        // to usuwa dopisek px
        //przeksztalca na number i dodaje 2
        // dodaje px i zapisuje nowa wartosc
        element.css('font-size', Math.abs(((Number(element.css('font-size').slice(0, -2))
            + Number(difference) || 0 ) || 1)) + 'px');
    };
    //click przechwytuje tylko left click
    $('h2').on('mousedown', function (event) {
        var thisH2 = $(this);
        // 1 - lewy, 2 - srodkowy, 3 - prawy
        console.log(event.which);
        changeFontSize(thisH2, event.which < 2 ? 3 : -3);
        console.log(thisH2.css('font-size'));
    });

    //NAVBAR
    var nav = $('.main-nav');
    var navIcon = $('.mobile-nav-icon i')
    $('.mobile-nav-icon').on('click', function(){
        nav.slideToggle(200)
        //ISTNIEJE ETZZ PROPERTA
        // $().hasClass();
        navIcon.toggleClass('ion-close-round ion-navicon-round')
    });

    $(window).on('resize',function(data){
       if(this.innerWidth > 767){
           nav.show();
           navIcon.removeClass('ion-close-round');
           navIcon.addClass('ion-navicon-round');
       }
    });

    //WAYPOINTY
    var navigation = $('nav');
    $('.js--section-features').waypoint({
            handler: function (direction) {
                console.log(this.element.id + ' hit in direction: ' + direction);
                if (direction == 'up') {
                    navigation.removeClass('sticky');
                } else {
                    navigation.addClass('sticky');
                }
            },
            offset: '60px'
        }
    )

    $('.js-way-point-1').waypoint(function(direction){
        //if(direction === 'down'){
        //Wazane zeby na poczaktku ukryc tak jak na koncu pliku style.css
        // rozne dostapne na animate.css
            $('.js-way-point-1').toggleClass('animated bounceInUp');
        //}
    }, {offset: '400px'});


    //SCRLLING
    var body = $('html, body');
    var sections = {
        plans : $('.js--section-plans'),
        features: $('.js--section-features')
    };
    $('.scroll-to-plan').on('click', function(){
        body.animate({scrollTop: sections.plans.offset().top}, 1000);
    })
    $('.scroll-to-start').on('click', function(){
        body.animate({scrollTop: sections.features.offset().top}, 1000);
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});