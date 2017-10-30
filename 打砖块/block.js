var Block = function(game, position){
  //position是[0, 0]格式
  var p = position
  var img = game.imageByName('block')
    o.x: p[0],
    o.y: p[1],
    o.w: image.width,
    o.h: image.height,
    alive: true,
    lifes: p[2] || 1,
  }
  o.image = img.image
  o.w = img.w
  o.h = img.h
  o.kill = function() {
    o.lifes--
    if (o.lifes < 1){
      o.alive = false
    }
  }
  o.collide = function(b){
    return o.alive && (recIntersects(o, b) || recIntersects(b, o))
  }
  return o
}
