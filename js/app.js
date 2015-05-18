// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // initialize the position of this enemy
    this.x = 0;
    this.y = 0;
    // initialize the speed of this enemy
    this.speed = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // calculate the position of this enemy after dt time
    this.x = this.x + this.speed*dt;
    // if this enemy go out of the right of screen
    if (this.x>600) {
        // reset the enemy's position to the left of screen
        // random choice the row of this new enemy
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
    // choose the image for player
    this.sprite = 'images/char-boy.png';
    // initialize the position of player
    this.x = 202;
    this.y = 415;
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // if the player crossed the street, win. reset the player.
    if (this.y < 83) {
        alert("Congratulations. You Won!");
        this.reset();
    }
    // check whether the enemies bite the player.
    // if the player is bitten, fail. reset the player
    allEnemies.forEach(function(enemy) {
        if (Math.abs(enemy.x - player.x)<50 && enemy.y===player.y) {
            player.reset();
        }
    });
};

// Reset the player
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position based on the legal key input.
Player.prototype.handleInput = function(keyevent) {
    // if the player is at the edge of screen,
    // some inputs will not have respondence.
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
// Declare an object of a player
var player = new Player();
// Declare an array of x of legal positions of enemies
var xarr = [0, 101, 202, 303, 404];
// Declare an array of y of legal positions of enemies
var yarr = [83, 166, 249];
// Declare an empty array for all enemies
var allEnemies = [];
// Declare the number of enemies, default 5
var numEnemy = 5;
// Declare the number of enemies, set by user
var numEneInput = prompt("How many bugs do you like? default 5, max 10");
// If the user's input is an integer, set the number of enemies
if (parseInt(numEneInput)==numEneInput) {
    numEnemy = numEneInput;
    // If the input is larger than 10, set the numEnemy to 10
    if (parseInt(numEneInput) > 10){
        numEnemy = 10;
    }
}

// Generate the enemies
for (var i = 0; i < numEnemy; i++) {
    // Generate an enemy
    var en = new Enemy();
    // random set the row of this enemy
    en.x = xarr[Math.floor(Math.random() * xarr.length)];
    // random set the column of this enemy
    en.y = yarr[Math.floor(Math.random() * yarr.length)];
    // random set the speed of this enemy
    // the speed range is [50,350]
    en.speed = Math.floor(Math.random() * 300 + 50);
    // add the enemy to the enemies array
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
