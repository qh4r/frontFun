define(['jquery'],function(){
    //$(function(){
    document.onload = (function(){
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

    $('.list2 li:even').css('color', 'green');
    $('.list2 li:first').css('color', 'orange');
    //INDEXOWANE OD 1 tak jak w ccsie
    $('.list2 li:nth-child(4)').css('color', 'orange');
    $('.list2 li:nth-last-of-type(2)').css('color', 'red');

    //INDEX 0 BASED jest ejszcze lt
    $('.list1 li:eq(2)').css('background-color', 'orange');
    $('.list1 li:gt(5)').css('background-color', 'green');
    //Wszystko co rodzenstwem oprocz wybranego
    $('p:first').siblings().css('border', '2px solid #FFFF00')

    $('p').on('click',function(){
        $(this).hide(2000);
    });


    //Wybiera drugi z wystepujacej obok siebie pary lementow
    $('p + h5').css('background-color', 'red');

    // WSZYSTKIE ELEMENTY 2 TYPU WYSTEPUJACE JAKO SYBLINGI PO 1 ELEMENCIE !!PO nim!!
    $('p ~ h5').css('color', 'green');

    $(':submit').on('click', function(e){
        e.preventDefault();
        //selector :text dziala jak [type=text]
        //:password :checkbox :submit itd tak samo
        $(':input[type=text][name!=text2]').each(function(){
            console.log($(this).attr('name')+' -> '+$(this).val())
        });

        $(':checked').each(function(){
            console.log($(this).attr('name'))
        })
    });
    $(':input').each(function(){
        console.log($(this).attr('name')+' -> '+$(this).val())
    });



    //Sa jeszcze ~= - ktory wybiera to co zawira slowo (moze byc oddzielone spacja)?
    // Dla klas troche bez sensu

    // |= - gdy uzyjemy [cos |= slowo] wybiera slowo lub slowo-cos
});
