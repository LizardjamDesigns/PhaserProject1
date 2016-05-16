var CastleBlackthorn = {};

CastleBlackthorn.Boot = function(game) {};

CastleBlackthorn.Boot.prototype = {
    
    preload: function() {
        
        this.load.image('preloadBar', './assets/images/loadBar.png');
     
    },
    
    create: function() {
        
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.input.addPointer();
        this.stage.backgroundColor = '#000000';
        this.state.start('Preloader');
    }
};