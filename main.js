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
        this.movement = game.input.keyboard.createCursorKeys();
        
  
        // score init
        
        
        // player inits
        this.player_oneInit();
        this.player_twoInit();
        
        
        
        
        // player group init --- disabled as players may be handled a different way
        /*
        this.players = game.add.group();  // initialize player group
        this.players.enableBody = true;  //enables collisions
        this.players.physicsBodyType = Phaser.Physics.ARCADE;  // sets physics
        this.players.setAll('anchor.x', 0.5); // collision point change
        this.players.setAll('anchor.y', 0.5);
        this.players.collideWorldBounds = true; // disallows players to exit screen
        */
        
        
        
    },
    
    update: function() {
        this.playerInputCheck();
        
    },
    
    restartGame: function() {
        // Restarts game
        game.state.start('main')
    },
    
    
    // this function may not be used
    player_oneInit: function() {
        this.player_one = this.game.add.sprite(400, 550, 'player');
        game.physics.arcade.enable(this.player_one)
        this.player_one.anchor.setTo(0.5, 0.5);
        this.player_one.body.collideWorldBounds = true;
        this.player_oneSpeed = 100;
        this.player_oneVelocityMod = 1.17;
        this.player_oneScore = 0;
    },
    
    player_twoInit: function() {
        this.player_two = this.game.add.sprite(300, 350, 'player');
        game.physics.arcade.enable(this.player_two)
        this.player_two.anchor.setTo(0.5, 0.5);
        this.player_two.body.collideWorldBounds = true;
        this.player_twoSpeed = 100;
        this.player_twoVelocityMod = 1.17;
        this.player_twoScore = 0;
    },
    
    playerInputCheck: function() {
        // player_one inputs
        this.player_one.body.velocity.setTo((this.player_one.body.velocity.x/this.player_oneVelocityMod),(this.player_one.body.velocity.y/this.player_oneVelocityMod));  // sets player velocity to a fraction of previous velocity to reduce stutter and create smoother movement
        if (this.movement.left.isDown){
            this.player_one.body.velocity.x = -this.player_oneSpeed;
        }
        if (this.movement.right.isDown){
            this.player_one.body.velocity.x = this.player_oneSpeed;
        }
        if (this.movement.up.isDown) {
            this.player_one.body.velocity.y = -this.player_oneSpeed;
        }
        if (this.movement.down.isDown) {
            this.player_one.body.velocity.y = this.player_oneSpeed;
        }
        
        // player_two inputs
        this.player_two.body.velocity.setTo((this.player_two.body.velocity.x/this.player_twoVelocityMod),(this.player_two.body.velocity.y/this.player_twoVelocityMod));
        if (this.movement.left.isDown){
            this.player_two.body.velocity.x = -this.player_twoSpeed;
        }
        if (this.movement.right.isDown){
            this.player_two.body.velocity.x = this.player_twoSpeed;
        }
        if (this.movement.up.isDown) {
            this.player_two.body.velocity.y = -this.player_twoSpeed;
        }
        if (this.movement.down.isDown) {
            this.player_two.body.velocity.y = this.player_twoSpeed;
        }
    },
    
};

game.state.add('title', titleState);
game.state.add('main', mainState);
game.state.start('main');
