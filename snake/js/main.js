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
                snakeArray = [],
                food = {},
                direction = "";

            function createSnake() {
                var length = 4;
                snakeArray = [];
                for (var i = length - 1; i > -1; i--) {
                    snakeArray.push({x: i, y: 0});
                }
            };

            function createFood() {
                food = {
                    x: Math.round(Math.random()*(width - cellWidth) / cellWidth),
                    y: Math.round(Math.random()*(height - cellWidth) / cellWidth)
                }
            };

            function getSpeed() {
                return speed;
            }

            function checkForCollision(x, y, arr) {
                arr.forEach(function(elem){
                    if(elem.x === x && elem.y === y){
                        return true;
                    }
                });
                return false;
            }

            function paint() {

                function paintCell(x, y) {
                    context.fillStyle = '#FFF';
                    context.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
                    context.strokeStyle = '#F00';
                    context.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
                };

                function checkScore(){

                };

                context.fillStyle = '#000';
                context.fillRect(0, 0, width, height);
                context.strokeStyle = '#FFF'
                context.fillRect(0, 0, width, height);

                var nx = snakeArray[0].x;
                var ny = snakeArray[0].y;

                switch (direction) {
                    case "right":
                        nx++;
                        break;
                    case "left":
                        nx--;
                        break;
                    case "up":
                        ny++;
                        break;
                    case "down":
                        ny--;
                }
                if (nx === -1 || nx === width / cellWidth ||
                    ny === -1 || ny === height / cellWidth ||
                    checkForCollision(nx, ny, snakeArray)) {
                    return init(board);
                }

                if(nx === food.x && ny === food.y){
                    var tail = {
                        x: nx, y: ny
                    };
                    score++;

                    createFood();
                    snakeArray.unshift(tail)

                } else {
                    var tail = snakeArray.pop();
                    tail.x = nx;
                    tail.y = ny;
                    snakeArray.unshift(tail)

                }

                for(var i = 0; i< snakeArray.length; i++){
                    var c = snakeArray[i];
                    paintCell(c.x, c.y);
                }

                paintCell(food.x, food.y);

                checkScore(score);

            }

            function setDirection(dir) {
                direction = dir;
            }

            var board = {
                getSpeed: getSpeed,
                createSnake: createSnake,
                createFood: createFood,
                paint: paint,
                setDirection: setDirection
            }
            return board;
        })();

        function init(gameboard) {
            gameboard.createSnake();
            gameboard.createFood();
            gameboard.setDirection("right");
            gameboard.score = 0;

            if (gameboard.gameLoop && typeof gameboard.gameLoop != "undefined") clearInterval(gameboard.gameLoop);
            gameboard.gameLoop = setInterval(gameboard.paint, gameboard.getSpeed());

            gameboard.paint();
            console.log('started')
        };

        init(gameboard);
    });
});
