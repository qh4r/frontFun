define(['jquery'],function(){
    $(function(){
        console.log('all dziala');
    });

    console.log($('.group-text'))
    //DZiala AND
    $('.group-text.choice').css('background-color', '#FF0000')

    $('p.choice').css('color', '#FFFF00')
    $('p').each(function(number){
        console.log(this.innerText);
        this.innerText = 'zmiana'+number;
    });
    $('.list1 li').each(function(){
        //W TAKIM WYPADKU POTRZEBNE $ gdy uzywa sie funkcji
        //a nie odnosi do wartosci
        $(this).css('color','#00FFFF');

    });
    (function(list){
        (function(baseColor, list, counter) {
            //$(list).on('click', function () {
            setInterval(function(){
                var elem = list.pop();
                $(list).css('color',baseColor);
                $(elem).css('color','#'+(counter = counter >
                    255 ? 125 : ++counter).toString(16)+'0000');
                list.unshift(elem);
            },500);
            //});
        })($(list[0]).css('color'), Array.prototype.slice.call(list,0,list.length), 125);
    })($('.list1').children())

    //MAJACE ATRYBUT CLASS
    $('.list1 [class]').css('background-color', "#0000FF")

    //INNY LUB BRAK
    $('.list2 [class!=other-staff]').css('background-color', "#FF00FF")

    //ATRYBUT CLASS ZACZYNAAJACY SIE OD other
    $('.list1 [class^=other]').css('background-color', "#8888FF")

    //Atrybut class konczoncy sie na shit
    $('.list1 [class$=shit]').css('font-size', "200%")

    //ATRYBUT class ZAWIERA string stuff
    $('[class*=stuff]').css('font-weight', "700")

});
