var SceneEnd = function(game) {
    var s = {
        game: game,
    };

    s.draw = function() {
        //draw text
        game.context.fillText('game over' , 100, 100);

    };
    s.update = function() {
    };
    return s;
};
