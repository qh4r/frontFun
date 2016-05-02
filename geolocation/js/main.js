define(['domReady', 'jquery'],function(domReady){
    domReady(function(){
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        $('#startBtn').on('click', function(){
           console.log('start');
        });

        $('#stopBtn').on('click', function(){
            console.log('stop');
        });

        console.log("dziala");
    });
});
