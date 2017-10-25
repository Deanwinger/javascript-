var Block = function(position){
  //position是[0, 0]格式
  var p = position
  var image = imageFromPath('block.png')
  var o = {
    image: image,
    x: p[0],
    y: p[1],
    w: image.width,
    h: image.height,
    alive: true,
    lifes: p[2] || 1,
  }
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
