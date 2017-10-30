var GuaGame = function(fps ,images, runCallBack){
  //images 是一个对象,里面是引用名字和图片路径
  //程序会在所有图片载入成功后才运行
  //actions = {alphabet:callback}, keydowns={alphabet: true or false}
  var g = {
    actions: {},
    keydowns : {},
    images: {},
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
  window.fps = 30
  var runloop = function(fps){
    // log(window.fps)
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
    //next run loop
    setTimeout(function(){
      runloop()
    }, 1000/window.fps)
  }

  var loads = []
  
  //预先载入所图片
  var names = Object.keys(images)
  for (var i = 0; i < names.length; i++) {
    let name = names[i]
    var path = images[name]
    let img = new Image()
    img.src = path
    img.onload = function(){
      //载入g.images
      g.images[name] = img
      //所有载入成功之后, 调用run
      loads.push(1)
      if (loads.length == names.length){
        g.run()
      }
    }
  }

  g.imageByName function(name){
    var img = g.images[name]
    var image = {
      w: img.width,
      h: img.height,
      image: img,
    }
    return image
  }

  g.run = function(){
    runCallBack(g)
    //开始游戏
    setTimeout(function(){
      runloop()
    }, 1000/fps)
  }


  return g
}
