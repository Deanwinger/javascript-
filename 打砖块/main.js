
    var loadlevel = function(game, n){
        n = n - 1;
        var level = levels[n];
        var blocks = [];
        for (var i = 0; i < level.length; i++) {
            var p = level[i];
            var b = Block(game, p);
            //set coordinate x, y
            blocks.push(b);
        }
        return blocks;
    };

    var blocks = [];
    var enableDebugMode = function(game, enable) {
        if (!enable) {
            return;
        }

        window.paused = false;
        window.addEventListener('keydown', function(event) {
            var k = event.key;
            if (event.key == 'p') {
                window.paused = !window.paused;
            } else if ('1234567'.includes(k)) {
                blocks = loadlevel(game, Number(k));
            }
        });
        //控制速度
        document.querySelector('#id-input-speed').addEventListener('input', function(event) {
            var input = event.target;
            // log(event, input.value)
            window.fps = Number(input.value);
        });
    };

    var _main = function() {


        var images = {
            ball: 'ball.png',
            block: 'block.png',
            paddle: 'paddle.png',
        };


        var game = GuaGame(30, images, function(g){
            var paddle = Paddle(game);
            var ball = Ball(game);
            //#1 document
            blocks = loadlevel(game, 1);

            var score = 0;
            var paused = false;
            game.registerAction('a', function() {
                paddle.moveLeft();
            });

            game.registerAction('d', function() {
                paddle.moveRight();
            });

            game.registerAction('f', function() {
                ball.fire();
            });

            game.update = function() {
                if (window.paused) {
                    return;
                }
                ball.move();
                if (paddle.collide(ball)) {
                    ball.bounceBack();
                }
                for (var i = 0; i < blocks.length; i++) {
                    var block = blocks[i];
                    if (block.collide(ball)) {
                        block.kill();
                        ball.bounceBack();
                        //更新分数
                        score += 100;
                    }
                }

            };

            //mouse event
            var enableDrag = false;
            game.canvas.addEventListener('mousedown', function(event){
                var x = event.offsetX;
                var y = event.offsetY;
                if (ball.hasPoint(x, y)){
                    enableDrag = true;
                }
            });

            game.canvas.addEventListener('mousemove', function(event){
                var x = event.offsetX;
                var y = event.offsetY;
                if (enableDrag){
                    // log(x, y, 'drag')
                    ball.x = x;
                    ball.y = y;
                }
            });

            game.canvas.addEventListener('mouseup', function(event) {
                var x = event.offsetX;
                var y = event.offsetY;
                log(x, y, 'up');
                enableDrag = false;
            });

            game.draw = function() {
                game.drawImage(paddle);
                game.drawImage(ball);
                for (var i = 0; i < blocks.length; i++) {
                    if (blocks[i].alive) {
                        game.drawImage(blocks[i]);
                    }
                }
                //draw text
                game.context.fillText('分数: ' + score, 10, 280);

            };
        });

        enableDebugMode(game, true);
    };

    _main();
