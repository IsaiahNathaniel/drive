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
        
        this.player_one = this.game.add.sprite(400, 550, 'player');
        game.physics.arcade.enable(this.player_one)
        this.player_one.anchor.setTo(0.5, 0.5);
        this.player_one.body.collideWorldBounds = true;
        this.player_one.driveAngle = 0;
        this.player_one.speed = 45;
        this.player_one.speedModifier = 45;
        this.player_one.brakingModifier = 1.3;
       
    },
    

    playerInputCheck: function() {
        // player_one inputs
       // this.player_one.body.velocity.setTo((this.player_one.body.velocity.x/this.player_one.velocityMod),(this.player_one.body.velocity.y/this.player_one.velocityMod));  // sets player velocity to a fraction of previous velocity to reduce stutter and create smoother movemeny
        this.player_one.body.velocity.x = (this.player_one.speed * Math.cos(0.0174533*this.player_one.driveAngle));
        this.player_one.body.velocity.y = (this.player_one.speed * Math.sin(0.0174533*this.player_one.driveAngle));
        console.log(this.player_one.driveAngle);
        if (this.movement.left.isDown){
           this.player_one.driveAngle -= 3;
        }
        if (this.movement.right.isDown){
            this.player_one.driveAngle += 3;
        }
        if (this.movement.up.isDown) {
            this.player_one.speed += 3;
            
        }
        if (this.movement.down.isDown) {
            this.player_one.speed -= 3;
    
        }
    },
    
};

game.state.add('title', titleState);
game.state.add('main', mainState);
game.state.start('main');
