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

    var navigation = $('nav');
    var waypoints = $('.js--section-features').waypoint({
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
});