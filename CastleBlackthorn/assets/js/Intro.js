CastleBlackthorn.Intro = function(game) {
    
    this.introBG;
    this.introBGM;
    
};

CastleBlackthorn.Intro.prototype = {
    
    create: function() {
        
        this.world.setBounds(0, 0, 2000, 2000);
        menuBGM.stop();
        introBG = this.add.sprite(0, 0, 'storyText');
        introBGM = this.add.audio('introBGM');
        introBGM.loopFull();
        introBG.inputEnabled = true;
        introBG.events.onInputDown.addOnce(this.startGame, this);
        
    },
    
    
    startGame: function(pointer) {
        
        introBGM.stop();
        introBG.destroy();
        this.state.start('undergroundCaves1');
        
    },
    
    update: function() {
        
        introBG.y -= 0.5;
        
        if (introBG.bottom < 0) {
            
            introBGM.stop();
            introBG.destroy();
            this.state.start('undergroundCaves1');
            
        }    
        
    }
    
    
};