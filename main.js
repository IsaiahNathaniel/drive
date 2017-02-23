var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

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
        this.movement = game.input.keyboard.createCursorKeys();
        // this.fireProjectile = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.player = this.game.add.sprite(400, 550, 'player');
        game.physics.arcade.enable(this.player)
        this.player.anchor.setTo(0.5, 0.5);
        this.player.collideWorldBounds=true;
      
    },
    
    update: function() {
        this.player.body.velocity.setTo(0,0);
        if (this.movement.left.isDown){
            this.player.body.velocity.x = -200;
        }
        else if (this.movement.right.isDown){
            this.player.body.velocity.x = 200;
        }

        
    },

};

var mainState = {
    
    preload: function() {
        game.load.image('player', 'assets/invader.png');
        game.stage.backgroundColor = '#1b1b18';
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.movement = game.input.keyboard.createCursorKeys();
        
        this.createPlayers("player_one");
        
        // score init
        
        
        
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
        
        
    },
    
    restartGame: function() {
        // Restarts game
        game.state.start('main')
    },
    
    createPlayers: function(playerName) {
         this.playerName = this.game.add.sprite(400, 550, 'player');
         game.physics.arcade.enable(this.playerName)
         this.playerName.anchor.setTo(0.5, 0.5);
         this.playerName.collideWorldBounds=true;
        
    },
    
};

game.state.add('title', titleState);
game.state.add('main', mainState);
game.state.start('main');
