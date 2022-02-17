class Tool {
	constructor(name, path) {
		this.name = name;
		this.path = path;
	}
}

const TOOLS = [	new Tool("Java", "./assets/java.png"),
				new Tool("Python", "./assets/python.png"),
				new Tool("NodeJS", "./assets/node.png"),
				new Tool("C++", "./assets/cpp.png"),
				new Tool("C#", "./assets/cs.jpg"),
				new Tool("HTML/CSS", "./assets/web.png"),
				new Tool("SQL", "./assets/sql.jpg")];

let current_index = 0;

function setCards() {
	let bottom_card_img = document.getElementById("bottom-card");
	let top_card_img = document.getElementById("top-card");
	let bottom_card_p = document.getElementById("bottom-card-text");
	let top_card_p = document.getElementById("top-card-text");
	top_card_img.setAttribute("src", TOOLS[current_index].path);
	bottom_card_img.setAttribute("src", TOOLS[(current_index + 1) % TOOLS.length].path);
	top_card_p.innerHTML = TOOLS[current_index].name;
	bottom_card_p.innerHTML = TOOLS[(current_index + 1) % TOOLS.length].name;
}

function nextCard() {
	current_index = (current_index + 1) % TOOLS.length;
	setCards();
}