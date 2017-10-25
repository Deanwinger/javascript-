    //tip one 最外层只能有函数, 不能有变量
    var loadlevel = function(n){
      n = n - 1
      var level = levels[n]
      var blocks=[]
      for (var i=0; i < level.length; i++){
        var p = level[i]
        var b = Block(p)
        //set coordinate x, y
        blocks.push(b)
      }
      return blocks
    }

    var blocks = []
    var enableDebugMode = function(enable){
      if (!enable){
        return
      }

    window.paused = false
    window.addEventListener('keydown', function(event){
      var k = event.key
      if (event.key == 'p'){
        window.paused = !window.paused
      }else if ('1234567'.includes(k)){
        blocks = loadlevel(Number(k))
        }
      })
    //控制速度
      document.querySelector('#id-input-speed').addEventListener('input', function(event) {
      var input = event.target
      // log(event, input.value)
      window.fps = Number(input.value)
      })
    }

    var _main = function() {
      enableDebugMode(true)

      var images = {
          ball: 'ball.png',
          block: 'block.png',
          paddle: 'paddle.png',
      }


      var game = GuaGame(30, images)

      var paddle = Paddle()

      var ball = Ball()
      //#1 document
      blocks = loadlevel(1)

      var score = 0
      var paused = false
      game.registerAction('a', function(){
        paddle.moveLeft()
      })

      game.registerAction('d', function(){
        paddle.moveRight()
      })

      game.registerAction('f', function(){
        ball.fire()
      })

      game.update = function(){
        if (window.paused){
          return
        }
        ball.move()
        if (paddle.collide(ball)){
          ball.bounceBack()
        }
        for (var i=0; i < blocks.length; i++){
          var block = blocks[i]
          if (block.collide(ball)){
            block.kill()
            ball.bounceBack()
            //更新分数
            score += 100
          }
        }

      }

      game.draw = function(){
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i=0; i < blocks.length; i++){
          if (blocks[i].alive){
            game.drawImage(blocks[i])
          }
        }
        //draw text
        game.context.fillText('分数: ' + score, 10, 280)
      }
    }

    _main()