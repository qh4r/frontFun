define(['domReady'],function(domReady){
    domReady(function(){
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        console.log("dziala");

        var context = (function init(){
            var canvass = document.getElementById('myCanvas');
            return canvass.getContext('2d');
        })();

        function draw(){
            context.fillStyle = "#ffff00";
            context.fillRect(10,10,100,100);
            context.fillStyle = "#ff0000";
            context.fillRect(40,40,100,100);
        };

        draw();
    });
});