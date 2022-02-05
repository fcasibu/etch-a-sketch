const body = document.querySelector('body');
const gridContainer = document.querySelector('.container');
let gridSize = 16;
let mouseDown = false;

function createGrid() {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    gridContainer.appendChild(square);
  };
};

window.onload = createGrid();

gridContainer.addEventListener('click', () => {
  mouseDown = !mouseDown;
  const squares = document.querySelectorAll('.square');
  if (mouseDown) {
    squares.forEach(square => square.addEventListener('mouseover', changeColor));
  } else {
    squares.forEach(square => square.removeEventListener('mouseover', changeColor));
  }
});

const sliderRange = document.getElementById('slider');
const sliderLabel = document.querySelector('.slider-label');

sliderRange.addEventListener('input', function () {
  gridSize = sliderRange.value;
  document.documentElement.style.setProperty('--grid-size', gridSize);
  gridContainer.innerHTML = '';
  sliderLabel.textContent = `${gridSize} x ${gridSize}`;
  sliderLabel.classList.add('show-label');
  setTimeout(() => {
    sliderLabel.classList.remove('show-label');
  }, 400);
  createGrid();
});

const random = document.querySelector('.random');
const squareColorPicker = document.querySelector('#color-picker');

random.addEventListener('click', () => random.classList.toggle('selected'));
squareColorPicker.addEventListener('click', () => random.classList.remove('selected'));

function changeColor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  const rgb = `rgb(${r}, ${g}, ${b})`;
  if (random.classList.contains('selected')) {
    this.style.backgroundColor = rgb;
  } else {
    this.style.backgroundColor = squareColorPicker.value;
  };
};

const bgColorPicker = document.querySelector('#bg-change');
const clear = document.querySelector('.clear');

bgColorPicker.addEventListener('input', changeGridColor);
clear.addEventListener('click', changeGridColor);

function changeGridColor() {
  for (let i = 0; i < gridContainer.childNodes.length; i++) {
    gridContainer.childNodes[i].style.backgroundColor = bgColorPicker.value;
  };
};