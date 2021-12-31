//get the canvas and options
const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector('#myRange');
const sliderValue = document.querySelector('#slider-value');

//determine size of grid
let gridSize = rangeInput.value;

makeGrid(gridSize);
sliderValue.textContent = `${rangeInput.value} x ${rangeInput.value}`;

rangeInput.oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.cssText = `background: linear-gradient(to right, #116466 0%, #116466  ${value}%, #fff ${value}%, white 100%)`
    sliderValue.textContent = `${this.value} x ${this.value}`;
    gridSize = this.value
    makeGrid(gridSize);
};


//this functions creates the grid based on the gridsize
function makeGrid(gridSize) {
    let grid = [];
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }
    
    for (let i = 1; i <= gridSize ** 2; i++) {
        //add elements to html
        grid[i] = document.createElement('div');
        grid[i].classList.add('grid-piece');
        canvas.appendChild(grid[i]);
        //adjust css to accommodate this grid size
        //500-gridSize*2 is to account for the added 1px border around each grid piece
        grid[i].style.cssText = `height: ${(500 - gridSize * 2) / gridSize}px; width: ${(500 - gridSize * 2) / gridSize}px;`;
        //add eventListener to each grid piece to look for hover.
        grid[i].addEventListener('mouseover', changeColor);
    }
}

//if there is hover turn the grid piece background color black
//this function changes the background color of something to black
function changeColor(e) {
    e.target.classList.add("filled");
}