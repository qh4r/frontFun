define(['domReady'],function(domReady){
    domReady(function(){
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        console.log("dziala");

        function init(name){
            var canvass = document.getElementById(name);
            return {
                canvass: canvass,
                context: canvass.getContext('2d')
            };
        };

        var static = init("myCanvas");
        var animated = init("myCanvas2");

        function draw(){
            static.context.fillStyle = "#ffff00";
            static.context.fillRect(10,10,100,100);
            static.context.fillStyle = "#ff0000";
            static.context.fillRect(40,40,100,100);
        };

        function drawAnimated(){
            var posX = 0;
            var posY = 0;
            setInterval(function(){
                posX += 1;
                posY += 1;
                animated.context.clearRect(0,0, animated.canvass.width, animated.canvass.height);
                animated.context.fillStyle = '#0000FF';
                animated.context.fillRect(posX, posY, 50, 50);
                function guard(value, offset, limit) {
                    if(value + offset > limit){
                        value = 0;
                    }
                    return value;
                }
                //pol
                animated.context.fillStyle = '#FF00FF';
                animated.context.beginPath();
                animated.context.arc(posX, 70, 24, 0, Math.PI);
                animated.context.fill();

                animated.context.fillStyle = '#FF0000';
                animated.context.beginPath();
                animated.context.arc(40, posY, 5, 0, Math.PI*2);
                animated.context.fill();

                posX = guard(posX, 50, animated.canvass.width);
                posY = guard(posY, 50, animated.canvass.height);
            }, 10);



        };

        drawAnimated();
        draw();
    });
});