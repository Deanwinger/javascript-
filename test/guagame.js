var GuaGame = function(fps){
  //actions = {alphabet:callback}, keydowns={alphabet: true or false}
  var g = {
    actions: {},
    keydowns : {},
  }
  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d')

  g.canvas = canvas
  g.context = context

  //draw
  g.drawImage = function(guaImage){
    g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
  }

  //events
  window.addEventListener('keydown', function(event){
      g.keydowns[event.key] = true
    })

  window.addEventListener('keyup', function(event){
      g.keydowns[event.key] = false
    })

  //
  g.registerAction = function(key, callback){
    g.actions[key] = callback
  }

  //timer

  setInterval(function(){
    //update input
    var actions = Object.keys(g.actions)
    for( var i = 0; i < actions.length; i++){
      var key = actions[i]
      if (g.keydowns[key]){
        g.actions[key]()
      }
    }
    //update
    g.update()
    //clear
    context.clearRect(0, 0, canvas.width, canvas.height)
    //draw
    g.draw()
  }, 1000/fps)

  return g
}
