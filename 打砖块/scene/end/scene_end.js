class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var s = Scene(game);
            game.replaceScene(s);
        });
    }
    static new(game){
        var i = new this(game);
            return i;
    }
    draw(){
        this.game.context.fillText('game over, press r to continue...' , 100, 100);    }
}
