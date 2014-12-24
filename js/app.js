// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
    this.speed = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    if (this.x>600) {
        var yarr = [83, 166, 249];
        this.x = -100;
        this.y = yarr[Math.floor(Math.random() * yarr.length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 415;
};

Player.prototype.update = function(dt) {
    if (this.y < 83) {
        this.reset();
    }
    allEnemies.forEach(function(enemy) {
        if (Math.abs(enemy.x - player.x)<50 && enemy.y===player.y) {
            player.reset();
        }
    });
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyevent) {
    if (keyevent == 'left') {
        if (player.x >= 101) {
            player.x = player.x - 101;
        }
    }
    if (keyevent == 'right') {
        if (player.x <= 303) {
            player.x = player.x + 101;
        }
    }
    if (keyevent == 'up') {
        if (player.y >= 83) {
            player.y = player.y - 83;
        }
    }
    if (keyevent == 'down') {
        if (player.y <= 332) {
            player.y = player.y + 83;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player;
var xarr = [0, 101, 202, 303, 404];
var yarr = [83, 166, 249];
var allEnemies = []
for (var i = 0; i < 5; i++) {
    var en = new Enemy;
    en.x = xarr[Math.floor(Math.random() * xarr.length)];
    en.y = yarr[Math.floor(Math.random() * yarr.length)];
    en.speed = Math.floor(Math.random() * 303 + 50);
    allEnemies.push(en);
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
