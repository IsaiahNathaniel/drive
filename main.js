var game = new Phaser.Game(1440, 900, Phaser.AUTO, 'gameDiv');

// title state will be worked on later
var titleState = {
};

var mainState = {
    
    preload: function() {
        game.load.image('player', 'assets/car.png');
        game.load.image('redPlayer', 'assets/red_car.png');
        game.load.image('grayPlayer', 'assets/gray_car.png');
        game.load.image('wall', 'assets/wall.jpg');
        game.stage.backgroundColor = '#1b1b18';
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.renderer.renderSession.roundPixels = true;
        // player inits
        this.player_oneInit();
		this.triggerWallUpdate = 0;
		this.createWallKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.walls_Init();
        this.createWall(100, 100);
	    this.createWall(150, 150);
    
    },
    
    update: function() {
		this.playerInputCheck();
		this.checkPlayerMouse();
		
		if (this.triggerWallUpdate === 1) {
			this.translucentWall.x = game.input.mousePointer.x;
			this.translucentWall.y = game.input.mousePointer.y;
		}
		
    },
    
    restartGame: function() {
        // Restarts game
        game.state.start('main');
    },
    
    walls_Init : function() {
        walls = game.add.group();
        walls.enableBody = true;
        walls.setAll("anchor.x", 0.5);
        walls.setAll("anchor.y", 0.5);
        walls.setAll("scale.x", 0.05);
        walls.setAll("scale.y", 0.05);
        
    },
    
    
    createWall : function(xPos, yPos) {
        newWall = walls.create(xPos, yPos, 'wall');
		newWall.enableBody = true;
        newWall.anchor.setTo(0.5, 0.5);
        newWall.scale.setTo(0.1, 0.1);
        
    },
    
   
    
    player_oneInit: function() {
		// mouse events for creating obstacles
        // directional keys
        this.movement = game.input.keyboard.createCursorKeys();
        this.secretSpeed = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
        this.brakeVehicle = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.player_one = this.game.add.sprite(400, 550, 'player');
        this.player_one.scale.setTo(0.06, 0.06);
        game.physics.arcade.enable(this.player_one)
        this.player_one.anchor.setTo(0.2, 0.5);
        this.player_one.body.collideWorldBounds = true;
        this.player_one.angle = 0;
        this.player_one.speed = 45;
        this.player_one.speedLimit = 250;
        this.player_one.brakingModifier = 1.3;
        this.player_one.leftTurnMod = 0;
        this.player_one.rightTurnMod = 0;
        this.player_one.turnRate = 0.06;
        this.player_one.maxTurnRate = 1.8;
        this.player_one.brakeAbility = 3.8;
       
    },
    
// Suck dem dicks boioi(anal)
    
    playerInputCheck: function() {
		// player mouse check for making walls
		
        // player_one inputs
        this.player_one.body.velocity.x = (this.player_one.speed * Math.cos(this.player_one.rotation));
        this.player_one.body.velocity.y = (this.player_one.speed * Math.sin(this.player_one.rotation));
        this.checkPlayerTurn();
        if (this.secretSpeed.isDown) {
            this.player_one.speedLimit = 10000000;
        }
        if (this.brakeVehicle.isDown) {
            if (this.player_one.speed > 0) {
                this.player_one.speed -= this.player_one.brakeAbility;
            }
            else { this.player_one.speed += this.player_one.brakeAbility; }
        }
        
        if (this.movement.up.isDown && this.player_one.speed < this.player_one.speedLimit) {
            this.player_one.speed += 1;
        } else if (!this.movement.up.isDown && this.player_one.speed > 0) {
            this.player_one.speed -= 0.5; // if the player isnt accelerating
        }
        
        if (this.movement.down.isDown && this.player_one.speed > (this.player_one.speedLimit * -1)) {
            this.player_one.speed -= 3;
        } else if (!this.movement.down.isDown & this.player_one.speed < 0) {
            this.player_one.speed += 0.5;  
        }
        
     
    },
	
	checkPlayerMouse: function() {
		if (this.createWallKey.isDown) {
			this.triggerWallUpdate = 1;
			this.translucentWall = this.game.add.sprite(game.world.centerX, game.world.centerY, 'wall');
			this.translucentWall.exists = 1;
			game.physics.arcade.enable(this.translucentWall);
        	this.translucentWall.anchor.setTo(0.5, 0.5);
        	this.translucentWall.scale.setTo(0.1, 0.1);
			this.translucentWall.alpha = 0.5;
			
		} else if (this.translucentWall.exists) {
			this.translucentWall.destroy();
			this.translucentWall.exists = 0;
			this.triggerWallUpdate = 0;
			}
	},
    
    checkPlayerTurn: function() {
        // left turning
        if (this.movement.left.isDown){
           if (this.player_one.leftTurnMod > 0 && this.player_one.speed != 0) {
               this.player_one.rotation -= (this.player_one.leftTurnMod * 0.0174533);    // it's easier to visualize rotation amount in degrees -> radians
           }
           if (this.player_one.leftTurnMod < this.player_one.maxTurnRate) {
               this.player_one.leftTurnMod += this.player_one.turnRate;
           }
        }
        else if (this.player_one.leftTurnMod > 0) {
           this.player_one.leftTurnMod -= this.player_one.turnRate;
           this.player_one.rotation -= (this.player_one.leftTurnMod * 0.0174533);
        }
        //right turning
        if (this.movement.right.isDown){
            if (this.player_one.rightTurnMod > 0 && this.player_one.speed != 0) {
                this.player_one.rotation += (this.player_one.rightTurnMod * 0.0174533);
            }    
            if (this.player_one.rightTurnMod < this.player_one.maxTurnRate) {
               this.player_one.rightTurnMod += this.player_one.turnRate;
            }
        }
        else if (this.player_one.rightTurnMod > 0) {
            this.player_one.rightTurnMod -= this.player_one.turnRate;
            this.player_one.rotation += (this.player_one.rightTurnMod * 0.0174533);
        }
      
    },
    
};

game.state.add('main', mainState);
game.state.start('main');
