var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var titleState = {
    
    preload: function() {
        game.load.image('player', 'assets/invader.png');    
     
    },
    
    create: function() {
        this.spaceSprite = game.add.tileSprite(0,0, 800, 600, 'spacebackground')
        this.startGameButton = game.add.button(300, 220, 'easyButton', this.startGame, this);
        this.startGameButton2 = game.add.button(300, 280, 'mediumButton', this.startMediumGame, this);
        this.startGameButton3 = game.add.button(300, 340, 'hardButton', this.startHardGame, this);
        this.movement = game.input.keyboard.createCursorKeys();
        this.fireProjectile = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.player = this.game.add.sprite(400, 550, 'player');
        game.physics.arcade.enable(this.player)
        this.player.anchor.setTo(0.5, 0.5);
        // this.score = "Your Score Goes Here!"
        // this.scoreLabel = 'Points : ';
        // this.labelScore = game.add.text(20, 20, this.scoreLabel + this.score, { font: "20px Arial", fill: "#ffffff" });
        this.muteButton = game.add.button(755, 10, 'muteButton', this.muteSound, this);
        this.muteButton.alpha = .3;
        this.sound = true;
        this.textBox = game.add.text(210, 500, "This is your laser!\nPress the arrows keys to move left and right.\nPress space to shoot. (Not Yet.)", { font: "10px Arial", fill: "#ffffff" });
        this.startGameButton.onInputOver.add(this.highlightButton, this);
        this.startGameButton2.onInputOver.add(this.highlightButton2, this);
        this.startGameButton3.onInputOver.add(this.highlightButton3, this);
        this.startGameButton.onInputOut.add(this.dehighlightButton, this);
        this.startGameButton2.onInputOut.add(this.dehighlightButton2, this);
        this.startGameButton3.onInputOut.add(this.dehighlightButton3, this);
    },
    
    update: function() {
        this.spaceSprite.tilePosition.y -= 2;
        this.player.body.velocity.setTo(0,0);
        if (this.movement.left.isDown){
            this.player.body.velocity.x = -200;
        }
        else if (this.movement.right.isDown){
            this.player.body.velocity.x = 200;
        }

        
    },

};
