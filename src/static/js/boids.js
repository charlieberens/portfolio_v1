const boidSize = 2;
const boidCount = 300;

const minSpeed = 1;
const maxSpeed = 7;

const closeAvoidanceRadius = 25;
const visionRadius = 85;
const wallMargin = 100;
const elementMargin = 100;
const minCursorInfluence = 10000;
const closeAvoidanceRadiusSquared = closeAvoidanceRadius**2;
const visionRadiusSquared = visionRadius**2;

const avoidanceStrength = .02;
const alignmentStrength = .65;
const cohesionStrength = .005;
const wallAvoidStrength = .2;
const elementAvoidStrength = .25;
const cursorChaseStrength = .0005;

const showVisionRadius = false;

const canvas = document.querySelector('#boids-canvas');
const paintColor = getComputedStyle(document.body).getPropertyValue('--boids-fill');
		
let boidsRunning = true;

let width = document.getElementById('boids-header').innerWidth;
let height = document.getElementById('boids-header').innerHeight

canvas.width = width;
canvas.height = height;

let c = canvas.getContext('2d');

let boids = [];


let initField = () => {
	c.fillStyle = paintColor;
	for(let i = 0; i < boidCount; i++){
		boids.push(createBoid());
	}

	paintBoids();

	window.addEventListener('resize', () => {
		width = document.getElementById('boids-header').innerWidth;
		height = document.getElementById('boids-header').innerHeight
		canvas.width = width;
		canvas.height = height;
		c.fillStyle = paintColor;
	});
}

let createBoid = () => {
	let x = Math.random() * width;
	let y = Math.random() * height;
	let dir = Math.random() * 2 * Math.PI;
	return({x: x, y:y, dir: dir, prev_dx: Math.cos(dir), prev_dy: Math.sin(dir)});
}

let paintBoids = () => {
	for(let boid of boids){
		let x = boid.x;
		let y = boid.y;
		let dir = boid.dir;

		c.beginPath();
		c.arc(x, y, boidSize, Math.PI - dir, -dir, false);
		c.fill()

		c.beginPath();
		c.moveTo(x + boidSize * Math.sin(dir + Math.PI / 2), y + boidSize * Math.cos(dir + Math.PI / 2)) //Side 1
		c.lineTo(x + boidSize * Math.sin(dir - Math.PI / 2), y + boidSize * Math.cos(dir - Math.PI / 2)) // Side 2
		c.lineTo(x + boidSize * Math.sin(dir) * 2, y + boidSize * Math.cos(dir) * 3) //Forward
		c.lineTo(x + boidSize * Math.sin(dir + Math.PI / 2), y + boidSize * Math.cos(dir + Math.PI / 2)) //Back to Side 1
		c.fill()

		if(showVisionRadius){
			c.beginPath();
			c.arc(x, y, visionRadius, 0, Math.PI * 2, false);
			c.stroke()
		}
	}
}

let frame = () => {
	if(boidsRunning){
		setTimeout(() =>{
			requestAnimationFrame(frame)
			c.clearRect(0,0, width, height);
			updatePositions();
			updateVelocities();
			paintBoids();
		},10);
	}
}

let updatePositions = () => {
	for(let boid of boids){
		let dx = boid.prev_dx;
		let dy = boid.prev_dy;

		let avoidance_dx = 0;
		let avoidance_dy = 0;

		let center_x = 0;
		let center_y = 0;

		let avg_dx = 0;
		let avg_dy = 0;

		let nearbyBoids = 0;

		for(let otherBoid of boids){
			let x_dif = boid.x - otherBoid.x;
			let y_dif = boid.y - otherBoid.y;
			if((x_dif != 0 && y_dif !=0) && Math.abs(x_dif) < visionRadius || Math.abs(y_dif) < visionRadius){
				let squared_distance = x_dif**2+y_dif**2;
				if(squared_distance < visionRadiusSquared){ //Is in the circle
					if(squared_distance < closeAvoidanceRadiusSquared){
						avoidance_dx += x_dif;
						avoidance_dy += y_dif;
						// avoidance_dx += x_dif * (closeAvoidanceMultiplier - 1);
						// avoidance_dy += y_dif * (closeAvoidanceMultiplier - 1);
					}
					center_x += otherBoid.x;
					center_y += otherBoid.y;

					avg_dx += otherBoid.prev_dx;
					avg_dy += otherBoid.prev_dy;

					nearbyBoids += 1;
				}
			}
		}
		if(nearbyBoids){
			center_x = center_x / nearbyBoids;
			center_y = center_y / nearbyBoids;

			avg_dx = avg_dx / nearbyBoids;
			avg_dy = avg_dy / nearbyBoids;

			dx += avoidance_dx * avoidanceStrength;
			dx += (center_x - boid.x) * cohesionStrength;
			dx += (avg_dx - boid.prev_dx) * alignmentStrength;

			dy += avoidance_dy * avoidanceStrength;
			dy += (center_y - boid.y) * cohesionStrength;
			dy += (avg_dy - boid.prev_dy) * alignmentStrength;
		}

		// cursorDistanceX = mouseX - boid.x;
		// cursorDistanceY = mouseY - boid.y;

		// if(Math.abs(cursorDistanceX) > minCursorInfluence){
		// 	dx += cursorDistanceX * cursorChaseStrength
		// }
		// if(Math.abs(cursorDistanceY) > minCursorInfluence){
		// 	dy += cursorDistanceY * cursorChaseStrength
		// }

		if(boid.x < wallMargin){
			dx += wallAvoidStrength;
		}else if(boid.x > width - wallMargin){
			dx -= wallAvoidStrength;
		}
		if(boid.y < wallMargin){
			dy += wallAvoidStrength;
		}else if(boid.y > height - wallMargin){
			dy -= wallAvoidStrength;
		}

		// for(rule of avoid_rules){
		// 	// console.log(boid.x < rule.right - elementMargin && boid.x > rule.left + elementMargin && boid.y > rule.top - elementMargin && boid.y < rule.bottom + elementMargin)
		// 	if(boid.x < rule.right + elementMargin && boid.x > rule.left - elementMargin && boid.y > rule.top - elementMargin && boid.y < rule.bottom + elementMargin){
		// 		if(boid.y > rule.bottom){
		// 			dy += elementAvoidStrength;
		// 		}else{
		// 			dy -= elementAvoidStrength;
		// 		}
		// 		if(boid.x < rule.left){
		// 			dx -= elementAvoidStrength;
		// 		}else if(boid.x > rule.right){
		// 			dx += elementAvoidStrength;
		// 		}
		// 	}
		// }

		let speed = Math.sqrt(dx**2 + dy**2);

		if(speed > maxSpeed){
			dx = (dx/speed) * minSpeed;
			dy = (dy/speed) * minSpeed;
		}else if(speed < maxSpeed){
			dx = (dx/speed) * maxSpeed;
			dy = (dy/speed) * maxSpeed;
		}

		boid.x += dx;
		boid.y += dy;

		boid.dx = dx;
		boid.dy = dy;

		boid.dir = Math.atan2(dx,dy);
	}
}

let updateVelocities = () => {
	for(let boid of boids){
		boid.prev_dx = boid.dx;
		boid.prev_dy = boid.dy;
	}
}

let toggleBoids = bool => {
	boidsRunning = bool;
	if(bool){
		frame();
	}
}

initField();
frame();

