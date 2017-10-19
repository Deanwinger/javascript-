var Ball = function(){
  var image = imageFromPath('ball.png')
  var o = {
    image: image,
    x: 100,
    y: 100,
    speedX: 10,
    speedY: 10,
    fired: false,
  }
  o.fire = function() {
    o.fired = true
    log('fired')
  }
  o.move = function() {
    if (o.fired){
      log('move')
      if (o.x < 0 || o.x > 800){
        o.speedX = -o.speedX
      }
      if (o.y < 0 || o.y > 600){
        o.speedY = -o.speedY
      }
      o.x += o.speedX
      o.y += o.speedY
    }
  }
  o.bounceBack = function(){
    o.speedY = -o.speedY
  }
  return o
}
