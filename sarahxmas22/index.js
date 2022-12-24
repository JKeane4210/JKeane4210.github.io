const RADIUS_MAX = 10;
const RADIUS_MIN = 5;
const FRACTAL_D_THETA = Math.PI / 6;
const GRAVITY = 15;
const MAX_ANGLE = Math.PI / 15;
const MIN_ANGLE = Math.PI / 40;
const fps = 30;
const FLAKES = 200;
var canvas;
var ctx;
var flakes = [];
// Color Changes
// COLORS = ["#ff00ff", "#00ffff", "#00ff00", "#0066ff", "#6600ff"];
let COLORS = ["#00ffff", "#006600", "#ff0000"];
let COLOR_CHANGE_THREDSHOLD = 200;
let colorChangeSkips = 2;

let displayedImg = null;
let imgCounter = 1;
const MAX_IMG_CHANGE_COUNTER = 7;
let imgChangeCounter = MAX_IMG_CHANGE_COUNTER;
let isFinalScreen = false;

function randAngle() {
	let sign = Math.random() > 0.5 ? 1.0 : -1.0;
	return sign * Math.random() * (MAX_ANGLE - MIN_ANGLE) + MIN_ANGLE;
}

function matmul(a, b) {
	let result = [];
	for (let i = 0; i < a.length; ++i) { // for every row of a
		result.push([]);
		for (let j = 0; j < b[0].length; ++j) { // for every column of b
			let dot = 0;
			for (let k = 0; k < a[0].length; ++k) { // create dot between
				dot += a[i][k] * b[k][j];
			}
			result[i].push(dot);
		}
	}
	return result;
}

class PointTree {
	constructor(value) {
		this.value = value;
		this.children = [];
	}
}

// 3d rotation matrix: https://math.stackexchange.com/questions/1741282/3d-calculate-new-location-of-point-after-rotation-around-origin

class Snow {
	constructor(x, y, radius, theta, psi, phi) {
		this.x = x;
		this.y = y;
		this.points = new PointTree([[0], [0], [0]]);
		this.radius = radius;
		this.rotation_mat = [[Math.cos(theta) * Math.cos(psi), Math.cos(phi) * Math.sin(psi) + Math.sin(phi) * Math.sin(theta) * Math.cos(psi), Math.sin(phi) * Math.sin(psi) - Math.cos(phi) * Math.sin(theta) * Math.cos(psi)],
							 [-Math.cos(theta) * Math.sin(psi), Math.cos(phi) * Math.cos(psi) - Math.sin(phi) * Math.sin(theta) * Math.sin(psi), Math.sin(phi) * Math.cos(psi) + Math.cos(phi) * Math.sin(theta) * Math.sin(psi)],
							 [Math.sin(theta), -Math.sin(phi) * Math.cos(theta), Math.cos(phi) * Math.cos(theta)]];
		// console.log(this.rotation_mat);
	}

	update() {
		this.y += GRAVITY * (this.radius / RADIUS_MAX); // dependent on "depth"
		if (this.y >= canvas.height) {
			this.y = 0;
		}
		this.d_theta += Math.PI / 15;
		this.draw();
	}

	draw() {
		ctx.strokeStyle = "white";
		if (this.points.children.length == 0) {
			// console.log("hi")
			for (let i = 0; i < 8; ++i) {
				let r = this.radius;
				if (i % 2 == 1) {
					r = this.radius * 3/5;
				}
				let theta = i / 4 * Math.PI;
				let x2 = this.x + r * Math.cos(theta);
				let y2 = this.y + r * Math.sin(theta);
				let t = new PointTree([[r * Math.cos(theta)], [r * Math.sin(theta)], [0]]);
				this.points.children.push(t);
				drawLine(this.x, this.y, x2, y2);
				this.drawFractal(x2, y2, theta, this.radius / 2, t);
			}
		} else {
			this.rotate(this.points);
		}
	}

	drawFractal(x, y, theta, fractal_radius, point_tree) {
		let theta1 = theta - FRACTAL_D_THETA;
		let theta2 = theta + FRACTAL_D_THETA;
		let x2 = x + fractal_radius * Math.cos(theta1);
		let y2 = y + fractal_radius * Math.sin(theta1);
		point_tree.children.push(new PointTree([[x2 - x], [y2 - y], [0]]));
		let x3 = x + fractal_radius * Math.cos(theta2);
		let y3 = y + fractal_radius * Math.sin(theta2);
		point_tree.children.push(new PointTree([[x3 - x], [y3 - y], [0]]));
		drawLine(x, y, x2, y2);
		drawLine(x, y, x3, y3);
	}

	rotate(point_tree) {
		point_tree.value = matmul(this.rotation_mat, point_tree.value);
		point_tree.children.forEach(pt => {
			this.rotate(pt);
		});
		point_tree.children.forEach(pt => {
			// console.log(point_tree.value[0][0] + " " + point_tree.value[1][0] + " " + pt.value[0][0] + " " + pt.value[1][0])
			drawLine(this.x + point_tree.value[0][0], this.y + point_tree.value[1][0], this.x + pt.value[0][0], this.y + pt.value[1][0]);
		});
	}
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
const audioCtx = new AudioContext();

//Create audio source
//Here, we use an audio file, but this could also be e.g. microphone input
const audioEle = new Audio();
audioEle.src = "SomeoneToYou_Banners.mp3"; //insert file name here
audioEle.autoplay = true;
audioEle.preload = "auto";

const audioEle2 = new Audio();
audioEle2.src = "SomeoneToYou_Banners.mp3"; //insert file name here
audioEle2.autoplay = true;
audioEle2.preload = "auto";

//Create analyser node
const analyserNode = audioCtx.createAnalyser();
analyserNode.fftSize = 256;
const bufferLength = analyserNode.frequencyBinCount;
const dataArray = new Float32Array(bufferLength);

//Set up audio node network
const audioSourceNode = audioCtx.createMediaElementSource(audioEle2); // FAILS
audioSourceNode.connect(analyserNode); // FAILS
// analyserNode.connect(audioCtx.destination);

let previous = 0;

// fade out
function fadeOut(el){
	if (el == null) return;
	// lockButtons();
  // el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .01) < 0) {
      el.style.display = "none";
      // unlockButtons();
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// fade in
function fadeIn(el, speed, callback){
	if (el == null) return;
	// lockButtons();
  el.style.opacity = 0;
  el.style.display = "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += speed) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    } else if (callback != null) {
		requestAnimationFrame(callback);
    }
  })();
}

const MAX_ROTATION = 15;
const MIN_ROTATION = -15;

function randRotation() {
	return Math.random() * (MAX_ROTATION - MIN_ROTATION) + MIN_ROTATION;
}

const FINAL_LOAD_SPEED = 0.08

function loadFirstRow(i, max) {
	let elem = document.createElement('div');
	elem.classList.add('square');
	elem.style.top = "12vh";
	elem.style.transform = "rotate(" + randRotation() + "deg)";
	elem.style.left = "" + (5 + (i - 1) * (88 / max)) + "vw";
	let img = document.createElement('img');
	img.src = document.getElementById('i' + i).getAttribute('src');
	elem.appendChild(img);
	document.body.appendChild(elem);
	if (i == max) {
		requestAnimationFrame(() => {fadeIn(img, FINAL_LOAD_SPEED, () => {loadSecondRow(13, 23);})});
	} else {
		requestAnimationFrame(() => {fadeIn(img, FINAL_LOAD_SPEED, () => loadFirstRow(i + 1, max));});
	}
	// console.log("loading" + i);
}

function loadSecondRow(i, max) {
	let elem = document.createElement('div');
	elem.classList.add('square');
	elem.style.bottom = "12vh";
	elem.style.transform = "rotate(" + randRotation() + "deg)";
	elem.style.left = "" +  (5 + (i - 13) * (88 / 11)) + "vw";
	let img = document.createElement('img');
	img.src = document.getElementById('i' + i).getAttribute('src');		;
	elem.appendChild(img);
	document.body.appendChild(elem);
	if (i == max) {
		requestAnimationFrame(() => {fadeIn(img, FINAL_LOAD_SPEED, () => loadMessage());});
	} else {
		requestAnimationFrame(() => {fadeIn(img, FINAL_LOAD_SPEED, () => loadSecondRow(i + 1, max));});
	}
	// console.log("loading" + i);
}

function loadMessage() {
	fadeIn(document.getElementById('msg'), 0.01, null);
}

// function lockButtons() {
// 	let btns = document.getElementsByTagName('button');
// 	for (let i = 0; i < btns.length; ++i) {
// 		btns[i].disabled = true;
// 	}
// 	console.log("locked");
// }

// function unlockButtons() {
// 	let btns = document.getElementsByTagName('button');
// 	for (let i = 0; i < btns.length; ++i) {
// 		btns[i].disabled = false;
// 	}
// 	console.log("unlocked");
// }

function toEnd() {
	displayFinalScreen();
}

let prevColor = null;
function getRandColor() {
	let randColor = COLORS[parseInt(Math.random() * COLORS.length)];
	while (randColor == prevColor) {
		randColor = COLORS[parseInt(Math.random() * COLORS.length)];
	}
	return randColor;
}

function displayFinalScreen() {
	// [...Array(21).keys()].forEach(v => {
	// 		fadeOut(document.getElementById("i" + (v + 1)));
	// });
	if (!isFinalScreen) {
		let imgs = document.getElementsByTagName('img');
		for (let i = 0; i < imgs.length; ++i) {
			imgs[i].style.display = 'none';
		}
		let btns = document.getElementsByTagName('button');
		for (let i = 0; i < btns.length; ++i) {
			btns[i].style.display = 'none';
		}
		isFinalScreen = true;
		COLORS = ["#006600", "#ff0000"];

		loadFirstRow(1, 12);
	}
}

function updateBackground() {
  //Get spectrum data
  analyserNode.getFloatFrequencyData(dataArray);
  let sum = dataArray.reduce((a, b) => a + b, 0);
  let delta = Math.abs(sum - previous);
  previous = sum;

  // console.log(colorChangeSkips); // colorChangeSkips: number of color changes at beginning to avoid

  if (colorChangeSkips > 0) {
  	colorChangeSkips--;
  } else if (isFinite(delta) && delta > COLOR_CHANGE_THREDSHOLD) {
  	imgChangeCounter--;
  	let randColor = getRandColor();
  	document.body.style.backgroundImage = "linear-gradient(0, white, " + randColor + ")";
  	if (imgChangeCounter == 0 && !isFinalScreen) {
  		advance();
	}
  }
}

function advance() {
	fadeOut(document.getElementById("i" + (imgCounter - 1)));
	// [...Array(imgCounter).keys()].forEach(v => {
	// 		// console.log(`removing ${v+1}`);
	// 		fadeOut(document.getElementById("i" + (v + 1)));
	// });
	// if (isFinalScreen) return;
	const currImage = document.getElementById("i" + imgCounter);
	if (currImage != null) {
		displayedImg = currImage;
  		imgCounter++;
  		// console.log("showing " + currImage.getAttribute("src"));
  		fadeIn(currImage, 0.1, null);
  		imgChangeCounter = MAX_IMG_CHANGE_COUNTER;
  	} else {
  		displayedImg = null;
  		if (!isFinalScreen) {
	  		displayFinalScreen();
	  	}
  	}
}

function init() {
	let randColor = getRandColor();
  document.body.style.backgroundImage = "linear-gradient(0, white, " + randColor + ")";	
  canvas = document.getElementById('Canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  for (let i = 0; i < FLAKES; ++i) {
  	flakes.push(new Snow(
  		canvas.width * Math.random(), 
  		canvas.height * Math.random(), 
  		Math.random() * (RADIUS_MAX - RADIUS_MIN) + RADIUS_MIN,
  		randAngle(),
  		randAngle(),
  		randAngle()));
  }
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / fps);
}

function animate() {
	updateBackground();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	flakes.forEach(flake => {
		flake.update();
	});
	setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / fps);
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath(); // Start a new path
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke(); // Render the path
}


window.addEventListener('load', init);
