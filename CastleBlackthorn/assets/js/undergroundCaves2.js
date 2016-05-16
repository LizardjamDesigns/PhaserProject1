CastleBlackthorn.undergroundCaves2 = function(game) {
    
    this.cavesBGM;
    this.cavesBG;
    this.map;
    this.layer;
    this.cursors;
    this.player;
    this.slash;
    this.jumpTimer = 0;
    this.bg;
    this.attackTime;
    this.slashes;
    this.slash;
    this.jumping;
    this.facing;
    this.jumpTimer;
    this.jumpCounter;
    this.hasDoubleJump = 'false';
    this.attackCount = 1;
    this.timer = 10;
    this.bats;
    this.bat;
    this.slimes;
    this.slime;
    this.powerUp;
    
};

CastleBlackthorn.undergroundCaves2.prototype = {
    
    create: function() {
        
        //Static Background
        bg = this.add.image(0, 0, 'caveBG');
        bg.fixedToCamera = true;
        
        //Audio
        cavesBGM = this.add.audio('cavesBGM');
        cavesBGM.loopFull();
        
        //Level
        map = this.add.tilemap('cave02', 64, 64);

        map.addTilesetImage('caves', 'caves');
        
        map.setCollisionBetween(2, 6);
        
        layer = map.createLayer('layer1');

        layer.resizeWorld();
        
        //Create PowerUp
        powerUp = this.add.sprite(2304, 2560, 'powerUp');
        this.physics.enable(powerUp, Phaser.Physics.ARCADE);
        powerUp.body.immovable = true;
        
        //Player
        player = this.add.sprite(192, 2944, 'player');
        this.physics.enable(player, Phaser.Physics.ARCADE);
        
        this.physics.arcade.gravity.y = 750;

        player.body.bounce.y = 0.1;
        player.body.collideWorldBounds = false;
        player.body.setSize(32,64);
        player.events.onOutOfBounds.add(this.gameOver, this);
        player.checkWorldBounds = true;
        

        player.animations.add('idle', [0, 1, 2, 3], 10, true);
        player.animations.add('walkRight', [4, 5, 6, 7], 10, true);
        player.animations.add('walkLeft', [8, 9, 10, 11], 10, true);
        player.animations.add('attackRight', [15, 16, 17, 18, 19, 20], 10, false);
        player.animations.add('attackLeft', [22, 23, 24, 25, 26, 27,], 10, false);
        player.animations.add('jumpRight', [12], false);
        player.animations.add('jumpLeft', [13], false);

        this.camera.follow(player);
        
        //Enemies
        bats = this.game.add.group();
        slimes= this.game.add.group();
        this.createEnemies();
        
        //Bat Setup
        this.physics.enable(bats, Phaser.Physics.ARCADE);
        bats.setAll('scale.x', 2);
        bats.setAll('scale.y', 2);
        bats.setAll('enableBody', true);
        bats.setAll('body.allowGravity', false);
        bats.setAll('body.bounce.x', 1);
        bats.setAll('body.bounce.y', 1);
        bats.setAll('body.collideWorldBounds', true);
        bats.setAll('body.minBounceVelocity', 0);
        bats.callAll('animations.add', 'animations', 'move', [0, 1, 2], 10, true);
        bats.callAll('animations.add', 'animations', 'perch', [3], 10, true);
        bats.callAll('animations.play', 'animations', 'perch');


        //Slime Setup
        this.physics.enable(slimes, Phaser.Physics.ARCADE);
        slimes.setAll('enableBody', true);
        slimes.setAll('body.collideWorldBounds', true);
        slimes.callAll('animations.add', 'animations', 'slime', [0, 1, 2], 10, true);
        slimes.callAll('animations.add', 'animations', 'move', [0, 1, 2, 3, 4, 5, 6], 10, true);
        slimes.callAll('animations.play', 'animations', 'move');
        slimes.setAll('body.bounce.x', 1);
        slimes.setAll('body.bounce.y', 1);
        
        
        //Controls
        cursors = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.Z);
        attackButton = this.input.keyboard.addKey(Phaser.Keyboard.X);
        magicAttack = this.input.keyboard.addKey(Phaser.Keyboard.C);
         
    },
    
    
    update: function() {
        this.time++;
        
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(bats, layer);
        this.physics.arcade.collide(slimes, layer);
        this.physics.arcade.collide(powerUp, layer);
        this.physics.arcade.overlap(this.slash, bats, this.killBat, null, this);
        this.physics.arcade.overlap(this.slash, slimes, this.killSlime, null, this);
        this.physics.arcade.overlap(player, powerUp, this.gainPowerUp, null, this);
        this.physics.arcade.overlap(player, bats, this.gameOver, null, this);
        this.physics.arcade.overlap(player, slimes, this.gameOver, null, this);
        player.body.velocity.x = 0;
        
        //Player Controls
        if (player.body.onFloor()) {
            this.jumping = false;
            this.jumpCounter = 1;
            
            if (this.hasDoubleJump == 'true') {
                this.jumpCounter = 2;
            }
        }
        
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
           if (this.facing != 'left')
            {
                player.animations.play('walkLeft');
                this.facing = 'left';   
            }
            else if (this.jumping == true && !player.body.onFloor())
            {
                player.animations.stop('walkLeft');
                player.animations.play('jumpLeft');
            }
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
         if (this.facing != 'right')
            {
                player.animations.play('walkRight');
                this.facing = 'right';
            }
            else if (this.jumping == true && !player.body.onFloor() )
            {
                player.animations.stop('walkRight');
                player.animations.play('jumpRight');
            }
        }
        else
        {
            if (this.facing != 'idle')
            {
                player.animations.play('idle');
                this.facing = 'idle';
            }
        }
                
        
        if (jumpButton.isDown && this.jumpCounter > 0 && this.game.time.now > this.jumpTimer)
        {
            this.jumping = true;
            player.body.velocity.y = -475;
            this.jumpTimer = this.game.time.now + 500;
            this.jumpCounter--;
            
        }
        
        //Attack
        if (attackButton.isDown && this.facing == 'left'){
            
            player.animations.stop('walkLeft');
            player.animations.play('attackLeft');
            this.attackLeft();
            
        }
        else if (attackButton.isDown && this.facing == 'right') {
            
            player.animations.stop('walkRight');
            player.animations.play('attackRight');
            this.attackRight();
            
        }
        if(attackButton.isUp)
        {
            this.attackCount = 1;
        }

        
        //Enemy AI

            for (var i = 0, len = bats.children.length; i < len; i++) {  

                if (player.x >= bats.children[i].body.x){
                    bats.children[i].animations.play('move');
                    bats.children[i].body.velocity.y = 150;
                    bats.children[i].body.velocity.x = Math.floor((Math.random() * 200) + 1);
                }
                
            }
        
        
    },
    
    

    
    killBat: function(slash, bats) {
        if(this.slash.exists) {
            this.slash.kill();
            bats.kill();
            this.attackCount++;
        }
        else{
            this.timer--;
        }
        if(!this.slash.exists){
            this.timer = 10;
        }
    },
    
    killSlime: function(slash, slimes) {
        if(this.slash.exists) {
            this.slash.kill();
            slimes.kill();
            this.attackCount++;
        }
        else{
            this.timer--;
        }
        if(!this.slash.exists){
            this.timer = 10;
        }
    },
//TROUBLE VVV//
    attackRight: function() {

            if (this.attackCount > 0)
            {
                this.slash = this.add.sprite(player.x + 30, player.y + 26, 'slash');
                this.slash.scale.x = 2;
                this.slash.scale.y = 2;
                this.physics.enable(this.slash, Phaser.Physics.ARCADE);
                this.slash.animations.add('attack', [2], 15, true);
                this.attackCount = this.attackCount - 20;
                this.slash.animations.play('attack');
                this.slash.body.velocity.x = 250;
                this.attackTime = this.game.time.now + 2;

            }
            else
            {
                this.attackCount++;
            }
            

    },
    
    attackLeft: function() {
        
        if (this.attackCount > 0)
            {
                this.slash = this.add.sprite(player.x - 30, player.y + 26, 'slash');
                this.slash.scale.x = 2;
                this.slash.scale.y = 2;
                this.physics.enable(this.slash, Phaser.Physics.ARCADE);
                this.slash.animations.add('attack', [8], 15, true);
                this.attackCount = this.attackCount - 20;
                this.slash.animations.play('attack');
                this.slash.body.velocity.x = -250;
                this.attackTime = this.game.time.now + 2;
                
            }
            else
            {
                this.attackCount++;
            }
    
        
    },
    
    gainPowerUp: function() {
        this.hasDoubleJump = 'true';
        powerUp.kill();
    },
    
    gameOver: function() {
        player.kill();
        cavesBGM.stop();
        this.state.start('GameOver');
    },
    

    
    createEnemies: function() {
        
        
        bats.create(384, 2752, 'bat');
        bats.create(896, 2880, 'bat');
        bats.create(1536, 2048, 'bat');
        bats.create(3328, 2048, 'bat');
        bats.create(3136, 2112, 'bat');
        bats.create(4160, 2048, 'bat');
        bats.create(5504, 2112, 'bat');
        slimes.create(1280, 3072, 'slime');
        slimes.create(896, 2624, 'slime');
        slimes.create(2112, 2304, 'slime');
        slimes.create(2368, 2432, 'slime');
        slimes.create(2560, 2432, 'slime');
        slimes.create(5504, 2368, 'slime');
        slimes.create(6016, 2432, 'slime');
        
    }
    
};