define(['domReady', 'jquery'], function (domReady) {
    domReady(function () {
        //console.log(document.getElementsByTagName('html')[0].innerHTML);

        var gameboard = (function () {
            var canvas = $('#canvas')[0],
                context = this.canvas.getContext('2d'),
                width = this.canvas.width,
                direction = 'right',
                height = this.canvas.height,
                cellWidth = 15,
                speed = 150,
                snakeArray = [];

            function createSnake() {
                var length = 4;
                for (var i = length - 1; i > -1; i--)
                    snakeArray.push({x: i, y: 0});
            };

            function createFood() {
                var foot = {
                    x: Math.round(Math.random((width - cellWidth) / cellWidth)),
                    y: Math.round(Math.random((height - cellWidth) / cellWidth))
                }
            };

            function getSpeed() {
                return speed;
            }

            function paint() {

            }

            return {
                getSpeed: getSpeed,
                createSnake: createSnake,
                createFood: createFood,
                paint: paint
            }
        })();

        (function init() {
            gameboard.createSnake();
            gameboard.createFood();
            gameboard.score = 0;

            if (typeof game_loop != "undefined") clearInterval(game_loop);
            var gameLoop = setInterval(gameboard.paint, gameboard.getSpeed());
        })();
    });
});
