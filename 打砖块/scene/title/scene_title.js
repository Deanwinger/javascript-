// var SceneTitle = function(game) {
//     var s = {
//         game: game,
//     };
//
//     game.registerAction('k', function() {
//         var s = Scene(game);
//         game.replaceScene(s);
//     });
//
//
//     s.draw = function() {
//         //draw text
//         game.context.fillText('按k开始游戏' , 100, 100);
//
//     };
//     s.update = function() {
//     };
//     return s;
// };

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var s = Scene(game);
            game.replaceScene(s);
        });
    }
    static new(game){
        var i = new this(game);
            return i;
    }
    draw(){
        this.game.context.fillText('按k开始游戏' , 100, 100);
    }
}
