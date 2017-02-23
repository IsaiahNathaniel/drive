var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var titleState = {
    
    preload: function() {
        game.load.image('player', 'assets/invader.png');    
        game.load.image('easyButton', 'assets/easyButton.png')
    },
    
    create: function() {
        // this.spaceSprite = game.add.tileSprite(0,0, 800, 600, 'spacebackground')
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
        
        
    },
    
    create: function() {
        
        
    },
    
    update: function() {
        
        
    },
    
    restartGame: function() {
        // Restarts game
        game.state.start('main')
    },
    
};

game.state.add('title', titleState);
game.state.add('main', mainState);
game.state.start('title');
