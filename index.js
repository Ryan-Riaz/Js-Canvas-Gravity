const cnvs = document.querySelector(".cnvs");
const ctx = cnvs.getContext("2d");

cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;

// utility Function

const randomNumFromRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = (colors) => {
	return colors[Math.floor(Math.random() * colors.length)];
};

//   fitting the elements in window
window.addEventListener("resize", () => {
	cnvs.width = window.innerWidth;
	cnvs.height = window.innerHeight;
	// call the init function
	init();
});

window.addEventListener("click", () => {
	init();
});

// For picking random color
const colors = ["#ef5777", "#575fcf", "#4bcffa", "#34e7e4", "#0be881"];
let gravity = 0.2;
let friction = 0.98;
// Creating  Arcs via class
class Circle {
	constructor(x, y, dx, dy, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = color;
		this.startAngle = 0;
		this.endAngle = Math.PI * 2;
		this.clockWise = false;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(
			this.x,
			this.y,
			this.radius,
			this.startAngle,
			this.endAngle,
			this.clockWise
		);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
	}
	update() {
		if (this.y + this.radius + this.dy > cnvs.height) {
			this.dy = -this.dy;
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius >= cnvs.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * friction;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
}

let circles = [];

function init() {
	circles = [];

	for (let i = 0; i < 300; i++) {
		var radius = randomNumFromRange(8, 20);
		var x = randomNumFromRange(radius, cnvs.width - radius);
		var y = randomNumFromRange(0, cnvs.height - radius);
		var dx = randomNumFromRange(-3, 3);
		var dy = randomNumFromRange(-2, 2);
		circles.push(new Circle(x, y, dx, dy, radius, randomColor(colors)));
	}
}

// animate the functions
const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	// update an arc
	// c1.update();

	// update all arcs
	for (let i = 0; i < circles.length; i++) {
		const circle = circles[i];
		circle.update();
	}
};

// invoking animate function
init();
animate();
