define(['domReady', 'jquery'], function (domReady) {
    domReady(function () {
        //console.log(document.getElementsByTagName('html')[0].innerHTML);

        var gameboard = (function () {
            var canvas = $('#canvas')[0],
                scoreElement = $('#score')[0],
                overlay = $('#overlay')[0],
                finalScore = $('#final-score')[0],
                highScoreElement = $('#high-score')[0],
                context = this.canvas.getContext('2d'),
                width = this.canvas.width,
                direction = 'right',
                nextDirection = 'direction',
                height = this.canvas.height,
                cellWidth = 15,
                speed = 150,
                snakeArray = [],
                food = {},
                logOn = false,
                direction = "",
                score = 0,
                topScore = -1,
                gameLoop;

            checkScore(0);

            function resetScore() {
                score = 0;
            };

            function createSnake() {
                var length = 4;
                snakeArray = [];
                for (var i = length - 1; i > -1; i--) {
                    snakeArray.push({x: i, y: 0});
                }
            };

            function createFood() {
                food = {
                    x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
                    y: Math.round(Math.random() * (height - cellWidth) / cellWidth)
                }
            };

            function checkForCollision(x, y, arr) {
                if (logOn)console.log(arr, x, y);
                return arr.filter(function (elem) {

                    return (elem.x === x && elem.y === y)
                    //console.log(elem, x, y, true);

                }).length;
            }

            function checkScore() {
                scoreElement.innerHTML = score;
                if(score > topScore) {
                    topScore = score;
                    highScoreElement.innerHTML = topScore;
                }
            };

            function paint() {

                function paintCell(x, y) {
                    context.fillStyle = '#FFF';
                    context.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
                    context.strokeStyle = '#F00';
                    context.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
                };

                context.fillStyle = '#000';
                context.fillRect(0, 0, width, height);
                context.strokeStyle = '#FFF';
                context.fillRect(0, 0, width, height);

                var nx = snakeArray[0].x;
                var ny = snakeArray[0].y;

                direction = nextDirection;
                switch (direction) {
                    case "right":
                        nx++;
                        break;
                    case "left":
                        nx--;
                        break;
                    case "down":
                        ny++;
                        break;
                    case "up":
                        ny--;
                }
                if (nx === -1 || nx >= width / cellWidth ||
                    ny === -1 || ny >= height / cellWidth ||
                    checkForCollision(nx, ny, snakeArray)) {
                    clearLoop();
                    return toggleOverlay();
                }

                if (nx === food.x && ny === food.y) {
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

                for (var i = 0; i < snakeArray.length; i++) {
                    var c = snakeArray[i];
                    paintCell(c.x, c.y);
                }

                paintCell(food.x, food.y);

                checkScore(score);

            }

            function setDirection(dir) {
                nextDirection = dir;
            }

            function getDirection() {
                return direction;
            }

            function toggleLogging() {
                logOn = !logOn;
            }

            function startLoop(){
                gameLoop = setInterval(paint, speed);
            }

            function clearLoop(){
                if (gameLoop && typeof gameLoop != "undefined") clearInterval(gameLoop);
            }

            function resetHighScore(){
                topScore = 0;
                highScoreElement.innerHTML = topScore;
            }

            function toggleOverlay() {
                finalScore.innerHTML = score;
                $(overlay).toggleClass('show');
            }

            $('#reaload-btn').on('click',function(){
                toggleOverlay();
                init(board);
            });

            var board = {
                createSnake: createSnake,
                createFood: createFood,
                paint: paint,
                setDirection: setDirection,
                getDirection: getDirection,
                toggleLogging: toggleLogging,
                resetScore: resetScore,
                startLoop: startLoop,
                clearLoop: clearLoop,
                resetHighScore: resetHighScore
            };
            return board;
        })();

        function init(gameboard) {
            gameboard.createSnake();
            gameboard.createFood();
            gameboard.setDirection("right");
            gameboard.startLoop();
            gameboard.resetScore();
            gameboard.paint();
            console.log('started')
        };

        (function (gameboard) {
            $(document).on('keydown', function (e) {
                switch (e.which) {
                    case 32:
                        return gameboard.toggleLogging();
                    case 37:
                        return gameboard.getDirection() !== "right" ? gameboard.setDirection("left") : gameboard.getDirection();
                    case 38:
                        return gameboard.getDirection() !== "down" ? gameboard.setDirection("up") : gameboard.getDirection();
                    case 39:
                        return gameboard.getDirection() !== "left" ? gameboard.setDirection("right") : gameboard.getDirection();
                    case 40:
                        return gameboard.getDirection() !== "up" ? gameboard.setDirection("down") : gameboard.getDirection();
                }
            });

            $('#reset-btn').on('click',function(e){
                gameboard.resetHighScore();
                e.preventDefault();
            });
        })(gameboard);


        init(gameboard);
    });
});
