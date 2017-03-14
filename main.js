var game = new Phaser.Game(1440, 900, Phaser.AUTO, 'gameDiv');

// title state will be worked on later
var titleState = {
    
    preload: function() {
        game.load.image('player', 'assets/car.png');    
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
        game.load.image('player', 'assets/car.png');
        game.load.image('redPlayer', 'assets/red_car.png');
        game.load.image('grayPlayer', 'assets/gray_car.png');
        game.stage.backgroundColor = '#1b1b18';
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.renderer.renderSession.roundPixels = true;
     
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
        this.player_one.scale.setTo(0.06, 0.06);
        game.physics.arcade.enable(this.player_one)
        this.player_one.anchor.setTo(0.2, 0.5);
        this.player_one.body.collideWorldBounds = true;
        this.player_one.angle = 0;
        this.player_one.speed = 45;
        this.player_one.brakingModifier = 1.3;
       
    },
    

    playerInputCheck: function() {
        // player_one inputs
       // this.player_one.body.velocity.setTo((this.player_one.body.velocity.x/this.player_one.velocityMod),(this.player_one.body.velocity.y/this.player_one.velocityMod));  // sets player velocity to a fraction of previous velocity to reduce stutter and create smoother movement
        this.player_one.body.velocity.x = (this.player_one.speed * Math.cos(this.player_one.rotation));
        this.player_one.body.velocity.y = (this.player_one.speed * Math.sin(this.player_one.rotation));
        console.log(this.player_one.rotation);
        console.log("vel.x " + this.player_one.body.velocity.x);
        console.log("vel.y " + this.player_one.body.velocity.y);
        console.log("speed " + this.player_one.speed);
        if (this.movement.left.isDown){
            /*    non-adaptive turn speed setting
            if (this.player_one.speed > 20) {
                this.player_one.rotation -= (1.8 * 0.0174533);
            }
            else if (this.player_one.speed > 10) {
                this.player_one.rotation -= (1.0 * 0.0174533);
            }
            else { this.player_one.rotation -= (0 * 0.0174533);
            }
            */
           this.player_one.rotation -= ((this.player_one.speed/100) * 0.0174533);    // it's easier to visualize rotation amount in degrees -> radians
        }
        if (this.movement.right.isDown){
            /*
            if (this.player_one.speed > 20) {
                this.player_one.rotation += (1.8 * 0.0174533);
            }
            else if (this.player_one.speed > 10) {
                this.player_one.rotation += (1.0 * 0.0174533);
            }
            else { this.player_one.rotation += (0 * 0.0174533);
            }
            */
            this.player_one.rotation += ((this.player_one.speed/10) * 0.0174533);
        }
        if (this.movement.up.isDown && this.player_one.speed < 250 ) {
            this.player_one.speed += 1;
            
        }
        if (this.movement.down.isDown && this.player_one.speed > 0) {
            this.player_one.speed -= 3;
    
        }
     
    },
    
};

game.state.add('title', titleState);
game.state.add('main', mainState);
game.state.start('main');
