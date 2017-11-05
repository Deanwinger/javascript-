var Scene = function(game) {
    var s = {
        game: game,
    };
    var paddle = Paddle(game);
    var ball = Ball(game);
    var score = 0;
    var blocks = loadlevel(game, 1);

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


    s.draw = function() {
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
    s.update = function() {
        if (window.paused) {
            return;
        }
        ball.move();
        if (ball.y > paddle.y){
          //跳转到游戏结束的画面
          var end = SceneEnd(game);
          game.replaceScene(end);
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.bounceBack();
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill();
                ball.bounceBack();
                // 更新分数;
                score += 100;
            }
        }
    };

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

    return s;
};
