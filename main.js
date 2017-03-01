var game = new Phaser.Game(1280, 800, Phaser.AUTO, 'gameDiv');

// title state will be worked on later
var titleState = {
    
    preload: function() {
        game.load.image('player', 'assets/invader.png');    
        game.load.image('easyButton', 'assets/easyButton.png');
        game.load.image('spacebackground', 'assets/background.png');
    },
    
    create: function() {
        this.spaceSprite = game.add.tileSprite(0,0, 800, 600, 'spacebackground')
        this.startGameButton = game.add.button(300, 220, 'easyButton', this.startGame, this);
       
      
    },
    
    update: function() {
   
    },

};

var mainState = {
    
    preload: function() {
        game.load.image('player', 'assets/invader.png');
        game.stage.backgroundColor = '#1b1b18';
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.renderer.renderSession.roundPixels = true;
        
        
  
        // score init
        
        
        // player inits
        this.player_oneInit();
        this.player_twoInit();
    },
    
    update: function() {
        this.playerInputCheck();
        
    },
    
    restartGame: function() {
        // Restarts game
        game.state.start('main')
    },
   
    
    player_oneInit: function() {
        // directional keys
        this.movement = game.input.keyboard.createCursorKeys();
        this.player_oneSpeedBoost = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
        
        this.player_one = this.game.add.sprite(400, 550, 'player');
        game.physics.arcade.enable(this.player_one)
        this.player_one.anchor.setTo(0.5, 0.5);
        this.player_one.body.collideWorldBounds = true;
        this.player_one.speed = 100;
        this.player_one.velocityMod = 1.25;
        this.player_one.score = 0;
        this.player_one.speedTimer = 0;
    },
   
    
    player_twoInit: function() {
        
        // special init for player two movement function
        this.moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.player_twoSpeedBoost = game.input.keyboard.addKey(Phaser.Keyboard.R);
        
        this.player_two = this.game.add.sprite(300, 350, 'player');
        game.physics.arcade.enable(this.player_two)
        this.player_two.anchor.setTo(0.5, 0.5);
        this.player_two.body.collideWorldBounds = true;
        this.player_two.speed = 100;
        this.player_two.velocityMod = 1.25;
        this.player_two.score = 0;
        this.player_two.speedTimer = 0;
    },
    
    playerInputCheck: function() {
        // player_one inputs
        this.player_one.body.velocity.setTo((this.player_one.body.velocity.x/this.player_one.velocityMod),(this.player_one.body.velocity.y/this.player_one.velocityMod));  // sets player velocity to a fraction of previous velocity to reduce stutter and create smoother movemeny
        if (this.movement.left.isDown){
            this.player_one.body.velocity.x = -this.player_one.speed;
        }
        if (this.movement.right.isDown){
            this.player_one.body.velocity.x = this.player_one.speed;
        }
        if (this.movement.up.isDown) {
            this.player_one.body.velocity.y = -this.player_one.speed;
        }
        if (this.movement.down.isDown) {
            this.player_one.body.velocity.y = this.player_one.speed;
        }
        if (this.player_oneSpeedBoost.isDown) {
            this.playerSpeedBoost(this.player_one);   
        }
        
        
        // player_two inputs
        this.player_two.body.velocity.setTo((this.player_two.body.velocity.x/this.player_two.velocityMod),(this.player_two.body.velocity.y/this.player_two.velocityMod));
        if (this.moveLeft.isDown){
            this.player_two.body.velocity.x = -this.player_two.speed;
        }
        if (this.moveRight.isDown){
            this.player_two.body.velocity.x = this.player_two.speed;
        }
        if (this.moveUp.isDown) {
            this.player_two.body.velocity.y = -this.player_two.speed;
        }
        if (this.moveDown.isDown) {
            this.player_two.body.velocity.y = this.player_two.speed;
        }
        if (this.player_twoSpeedBoost.isDown) {
            this.playerSpeedBoost(this.player_two);   
        }
    },
    
    playerSpeedBoost: function(player) {
        if (this.game.time.now > player.speedTimer) {
            
            player.speed = 200; // player speedboost modifier
            // place visual here and let visual revert inside setTimeout function below
            setTimeout(function(){ player.speed = 100; }, 1500);  // waits 1500 ms before reverting speed using an anonymous function
            player.speedTimer = this.game.time.now + 10000;
        }
        else {
            // play sound or maybe a visual if not available?
        }
        
    },
        
    playerRockThrow: function(player) {
      
        
    },
    
};

game.state.add('title', titleState);
game.state.add('main', mainState);
game.state.start('main');
