// What's a game without a score?
var score = 0;

// Create an object to hold the target properties
var target = {
	radius: 0,
	speed: 0,
	x: 0, y: 0
};

// Create an object to hold the player shot properties
var shot = {
	active: false,
	radius: 0,
	speed: 250,
	x: 0, y: 0
};

// Create a function to reset the target's properties
var resetTarget = function () {
	// Set target speed
	target.speed = 150;

	// Make the target faster as the score increases
	target.speed = target.speed + score;

	// Set the target's radius (circle size)
	target.radius = 50;

	// Move the target to a random position along the X axis
	target.x = Math.random() * width;

	// Move the target just above the canvas
	target.y = -target.radius;

	// Make the target smaller as the score increases
	target.radius -= score;

	// Don't let the target get TOO small. LET'S NOT GO CRAZY
	if (target.radius < 25) {
		target.radius = 25;
	}
};

// Create a function to spawn a shot for the player
function mouseClicked() {
	// Back out if the shot is already doing its thing
	if (shot.active) { return; }

	// Center the shot on the click position
	shot.x = mouseX;
	shot.y = mouseY;

	// Activate the shot
	shot.active = true;
	shot.radius = 100;
};

// Create a function to start a new game
var resetGame = function () {
	score = 0;
	shot.active = false;

	resetTarget();
};

// Create a function to update game properties
var update = function (delta) {
	// Get the seconds that have passed so we can multiply by speed
	var seconds = delta / 1000;

	// Move the target along the X axis
	target.y += target.speed * seconds;

	// When the target leaves the canvas, start a new game
	if (target.y > height + target.radius) {
		resetGame();
	}

	// Update the shot
	if (shot.active) {
		// Decrease shot size
		shot.radius -= shot.speed * seconds;

		// Check if the shot is done shrinking
		if (shot.radius <= 0) {
			// Deactivate the shot
			shot.active = false;

			// Check if the shot is within range of the target
			var distance = dist(shot.x, shot.y, target.x, target.y);
			if (distance <= target.radius) {
				// SCORE! Good job
				// Increment player score by 1
				score++;

				resetTarget();
			}
		}
	}
};

// Create a function to draw the graphics
var render = function () {
	// Fill the whole canvas with a rectangle
	background('black');

	// Draw the target
	fill('red');
	ellipse(target.x, target.y, target.radius);

	// Draw the shot
	fill('white');
	if (shot.active) {
		ellipse(shot.x, shot.y, shot.radius);
	}

	// Render the score, fill-color already set above
	textSize(24);
	textFont("Verdana");
	textAlign(CENTER);
	text(score, width / 2, 32);
};

// Create a new game
function setup() {
	// ... but we also need graphics, so create a canvas
	createCanvas(500, 500);
	// with radial Ellipse rendering
	ellipseMode(RADIUS);

	resetTarget();
}

// Get the current time
var now = Date.now();

// Run the game
function draw() {
	// Get the time delta (how much time has passed) so we can make calculations
	var delta = Date.now() - now;

	// Update the game objects
	update(delta);

	// Draw the graphics
	render();

	// Get the new time for the next tick
	now = Date.now();
};

// Now you've made a game. Great job! LEVEL UP
// -Matt Hackett (http://matthackedit.com/)
