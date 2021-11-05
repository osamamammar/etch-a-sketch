let size = 16;
let color = '#333333';
let mode = 'oneColor';

// functions to change the default value
function changeSize(newSize) {
	size = newSize;
}

function changeColor(newColor) {
	color = newColor;
}

function changeMode(newMode) {
	mode = newMode;
}

function clearGrid() {
	gridContainer.innerHTML = '';
}

// gridContainer
const gridContainer = document.querySelector('.sketch__container--grids');

// controls
const gridSizeController = document.querySelector('#size');
const gridSizeValue = document.querySelector('.controls__grid__size--value');
const colorPicker = document.querySelector('#color');

// different modes
const oneColorMode = document.querySelector('.controls__color');
const randomColorMode = document.querySelector('.controls__random__colors--btn');
const eraserMode = document.querySelector('.controls__eraser--btn');
const clearBtn = document.querySelector('.controls__clear--btn');

// call function create grid
generateGrid(size);

function generateGrid(gridSize) {
	// clear grid
	clearGrid();
	// create grid columns and rows
	gridContainer.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
	// create div element
	for (let i = 0; i < gridSize * gridSize; i++) {
		const element = document.createElement('div');
		element.classList.add('element');
		element.addEventListener('mouseenter', fillElement);
		gridContainer.appendChild(element);
	}
}

// function to fill div element for different modes
function fillElement(e) {
	if (mode === 'oneColor') {
		e.target.style.backgroundColor = color;
	} else if (mode === 'randomColor') {
		let R = Math.floor(Math.random() * 256);
		let G = Math.floor(Math.random() * 256);
		let B = Math.floor(Math.random() * 256);
		e.target.style.backgroundColor = `rgb(${R},${G},${B})`;
	}
	// if mode === eraser
	else {
		e.target.style.backgroundColor = '#fff';
	}
}

// listen for input on controller to change display value of sketch grid
gridSizeController.addEventListener('input', (e) => {
	let value = e.target.value;
	gridSizeValue.textContent = `${value} * ${value}`;
});

// listen for change on controller to change default size and create grid system
gridSizeController.addEventListener('change', (e) => {
	let value = e.target.value;
	changeSize(value);
	generateGrid(size);
});

//listen for change color picker
colorPicker.addEventListener('change', (e) => changeColor(e.target.value));

// clear grid sketch
clearBtn.addEventListener('click', () => generateGrid(size));

// listen for btns and change ui
oneColorMode.addEventListener('click', setColorMode);
randomColorMode.addEventListener('click', setRandomMode);
eraserMode.addEventListener('click', setEraserMode);

// functions to change ui for btns
function setColorMode() {
	changeMode('oneColor');
	if (mode === 'oneColor') {
		randomColorMode.classList.remove('active');
		eraserMode.classList.remove('active');
	}
}
function setRandomMode() {
	changeMode('randomColor');
	if (mode === 'randomColor') {
		randomColorMode.classList.add('active');
		eraserMode.classList.remove('active');
	}
}
function setEraserMode() {
	changeMode('eraser');
	if (mode === 'eraser') {
		eraserMode.classList.add('active');
		randomColorMode.classList.remove('active');
	}
}
