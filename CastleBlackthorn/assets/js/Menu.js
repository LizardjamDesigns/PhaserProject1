CastleBlackthorn.Menu = function(game) {
    
    this.menuBG;
    this.menuBGM;
    
};

CastleBlackthorn.Menu.prototype = {
    
    create: function() {
        
        menuBG = this.add.sprite(0, 0, 'menuBG');
        menuBG.animations.add('play', [0, 1, 2], 6, true);
        menuBGM = this.add.audio('menuBGM');
        menuBGM.loopFull();
        menuBG.inputEnabled = true;
        menuBG.events.onInputDown.addOnce(this.startIntro, this);

    },
    
    startIntro: function(pointer) {
        
        this.state.start('Intro');
        
    }
    
};