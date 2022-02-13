const PATHS = [
	"./assets/hand_wireframes1.jpg",
	"./assets/hand_wireframes2.jpg",
	"./assets/figma_wireframes1.jpg",
	"./assets/figma_wireframes2.jpg",
	"./assets/figma_wireframes3.jpg",
	"./assets/figma_wireframes4.jpg"];



var currentSlideIndex = 0;

function setCurrentImage() {
	let center = document.getElementById("slideshow-img-center");
	let left = document.getElementById("slideshow-img-left");
	let right = document.getElementById("slideshow-img-right");
	center.setAttribute("src", PATHS[currentSlideIndex]);
	left.setAttribute("src", PATHS[(currentSlideIndex + (PATHS.length - 1)) % PATHS.length]);
	right.setAttribute("src", PATHS[(currentSlideIndex + 1) % PATHS.length]);
}

function nextSlide() {
	currentSlideIndex = (currentSlideIndex + 1) % PATHS.length;
	setCurrentImage();
}

function previousSlide() {
	currentSlideIndex = (currentSlideIndex + (PATHS.length - 1)) % PATHS.length;
	setCurrentImage();
}

function expandImage() {
	let currentImage = PATHS[currentSlideIndex];
	var newImage = document.createElement('img');
	newImage.setAttribute('src', currentImage);
	newImage.setAttribute('id', 'expanded-img');
	newImage.setAttribute('onclick', 'closeImage()');
	newImage.setAttribute('style', 'position: fixed; width: 30%; left: 35%; top: 10%;');
	var body = document.getElementById("main");
	body.appendChild(newImage);
}

function closeImage() {
	var body = document.getElementById("main");
	var expandedImage = document.getElementById("expanded-img");
	body.removeChild(expandedImage);
}