CastleBlackthorn.Preloader = function(game) {
    
    this.preloadBar = null;
    this.ready = false;
    
};

CastleBlackthorn.Preloader.prototype = {
    preload: function() {
        
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.image('storyText', './assets/images/storyText.png');
		this.load.image('caveBG', './assets/images/caveBG0.png');
		this.load.image('doubleJump', './assets/images/doubleJump.png');
        this.load.image('caves', './assets/images/cavesSpritesheet.png');
        this.load.image('powerUp', './assets/images/doubleJump.png');
        this.load.image('gameOver', './assets/images/gameOver.png');
		this.load.audio('menuBGM', './assets/audio/menuBGM.mp3');
		this.load.audio('cavesBGM', './assets/audio/cavesBGM.mp3');
		this.load.audio('introBGM', './assets/audio/introBGM.mp3');
        this.load.audio('gameOverBGM', './assets/audio/gameOverBGM.mp3');
        this.load.tilemap('cave01', './assets/tilemaps/cave01.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('cave02', './assets/tilemaps/cave02.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('cavesSS', './assets/images/cavesSpritesheet.png', 64, 64);
		this.load.spritesheet('player', './assets/images/hero.png', 34, 64);
        this.load.spritesheet('darkElf', './assets/images/darkElf.png', 46, 64);
        this.load.spritesheet('slime', './assets/images/slime.png', 32, 32);
        this.load.spritesheet('bat', './assets/images/bat.png', 16, 16);
        this.load.spritesheet('menuBG', './assets/images/title.png', 600, 450);
        this.load.spritesheet('slash', './assets/images/slash.png', 20, 10);
        this.load.spritesheet('vSlash', './assets/images/vSlash.png', 5, 10);
    },
    
    create: function() {
        
        this.preloadBar.cropEnabled = false;
        
    },
    
    update: function() {
        
        this.ready = true;
        this.state.start('Menu');
        
    }
    
};