define(['domReady', 'jquery','quicksand'],function(domReady, jquery, quicksand){
    domReady(function(){
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        console.log("dziala");
        //$('body').prepend('<h1>dziala</h1>');

        var items = $('#gallery li'),
            itemsByTags = {};
        itemsByTags['All'] = [];
        items.each(function(item){
            var element = $(this);
            var tags = element.data('tags').split(',');
            tags.forEach(function(tag){
                tag = tag.trim();
                itemsByTags[tag] = itemsByTags[tag] || [];
                itemsByTags[tag].push(element);
            });
            itemsByTags['All'].push(element);

            element.attr('data-id', item);


        })
        console.log(itemsByTags);




        var keys = Object.keys(itemsByTags);
        keys.forEach(function(tag){
            createList(tag, itemsByTags[tag]);
        });


        var buttons = $('#navbar a');
        buttons.on('click', function(e){
            var button = $(this);
            //buttons.removeClass('active');
            //button.addClass('active');
            button.addClass('active').siblings().removeClass('active');
            //var filter = ;
            //console.log('LIST', button.data('list'));
            //DATA LIST ODWOLUJE SIE DO ELEMENTU DATA w A deklarowanego w funkcji create list i ukrytego w pamieci
            $('#gallery').quicksand(button.data('list').find('li'));
            e.preventDefault();
        });

        $('#navbar a:first').click();

    });


    function createList(key, items){

        var ul = $('<ul>', {class: 'hidden'});

        $.each(items, function(){
            //THIS W TYM KONTEKSCIE TO LI bo LI to elementy litsy
            //console.log(this)
            $(this).clone().appendTo(ul);
        })
        ul.appendTo('#gallery');

        var a = $('<a>', {
            html: key,
            href: '#',
            data: {list: ul},

        }).appendTo('#navbar');
    }
});
