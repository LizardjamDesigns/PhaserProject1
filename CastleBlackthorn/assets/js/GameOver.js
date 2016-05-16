CastleBlackthorn.GameOver = function(game) {
    
    this.gameOverBG;
    this.gameOverBGM;
    
};

CastleBlackthorn.GameOver.prototype = {
    
    create: function() {
        
        gameOverBG = this.add.sprite(0, 0, 'gameOver');
        gameOverBGM = this.add.audio('gameOverBGM');
        gameOverBGM.loopFull();
        gameOverBG.inputEnabled = true;
        gameOverBG.events.onInputDown.addOnce(this.restart, this);

    },
    
    restart: function(pointer) {
        
        gameOverBGM.stop();
        this.state.start('Menu');
        
    }
    
};