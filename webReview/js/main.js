define(['domReady', 'jquery'],function(domReady){
    domReady(function(){
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        console.log("dziala");
    });
    $('#main').on('click', function(){
        $(this).toggleClass('bg-color');
    })
});
