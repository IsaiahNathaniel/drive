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
		game.physics.startSystem(Phaser.Physics.NINJA);
        this.game.renderer.renderSession.roundPixels = true;
		game.physics.ninja.gravity = false;
        // player inits
        this.player_oneInit();
		this.triggerWallUpdate = 0;
		this.createWallKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.walls_Init();
        this.createWall(100, 100);
	    this.createWall(150, 150);
    
		// create wall
		
    },
    
    update: function() {
		this.playerInputCheck();
		this.checkWallPlace();
		
		game.physics.ninja.collide(this.player_one, this.walls, this.collisionDetected, null, this);
		game.physics.ninja.collide(this.walls, this.walls, null, null, this);
		
    },
    
    restartGame: function() {
        // Restarts game
        game.state.start('main');
    },
    
    walls_Init : function() {
		// walls group
        this.walls = game.add.group();
        this.walls.enableBody = true;
        this.walls.setAll("anchor.x", 0.5);
        this.walls.setAll("anchor.y", 0.5);
        this.walls.setAll("scale.x", 0.05);
        this.walls.setAll("scale.y", 0.05);
		
		// transparent wall sprite init
		this.placeWall = false;
		this.translucentWall = this.game.add.sprite(game.world.centerX, game.world.centerY, 'wall');
		game.physics.ninja.enable(this.translucentWall);
        this.translucentWall.anchor.setTo(0.5, 0.5);
        this.translucentWall.scale.setTo(0.1, 0.1);
		this.translucentWall.alpha = 0.0;
        
    },
    
    
    createWall : function(xPos, yPos) {
        newWall = this.walls.create(xPos, yPos, 'wall');
		newWall.enableBody = true;
        newWall.anchor.setTo(0.5, 0.5);
        newWall.scale.setTo(0.1, 0.1);
		newWall.outOfBoundsKill = true;
        
    },
    
   
    
    player_oneInit: function() {
        // directional keys
        this.movement = game.input.keyboard.createCursorKeys();
		this.movement.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.movement.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.movement.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.movement.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.secretSpeed = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
        this.brakeVehicle = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.player_one = this.game.add.sprite(400, 550, 'player');
        this.player_one.scale.setTo(0.06, 0.06);
        game.physics.ninja.enableAABB(this.player_one);
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
	
	collisionDetected: function() {
		this.player_one.speed = 0;
		
		
	},
	
	checkWallPlace: function() {
		if (this.createWallKey.isDown) {
			this.translucentWall.alpha = 0.5;
			this.translucentWall.x = game.input.mousePointer.x;
			this.translucentWall.y = game.input.mousePointer.y;	
			this.placeWall = true;
		}
		else {
			this.translucentWall.alpha = 0.0;
			if (this.placeWall) {
				this.createWall(game.input.mousePointer.x, game.input.mousePointer.y);
				this.placeWall = false;
			}
			
		}
		
	},
    
    checkPlayerTurn: function() {
        // left turning
        if (this.movement.left.isDown){
           if (this.player_one.leftTurnMod > 0 && (this.player_one.speed > 0.5 || this.player_one.speed < -0.5)) {
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
            if (this.player_one.rightTurnMod > 0 && (this.player_one.speed > 0.5 || this.player_one.speed < -0.5)) {
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
