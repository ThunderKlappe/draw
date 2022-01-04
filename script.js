//get the canvas and options
const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector('#myRange');
const sliderValue = document.querySelector('#slider-value');
const clearButton = document.querySelector("#clear-canvas-button");
const eraserButton = document.querySelector("#eraser-toggle");

//determine size of grid
let gridSize = rangeInput.value;

makeGrid(gridSize);
sliderValue.textContent = `${rangeInput.value} x ${rangeInput.value}`;


//change the size of the canvas based on the slider value
rangeInput.oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.cssText = `background: linear-gradient(to right, #116466 0%, #116466  ${value}%, #fff ${value}%, white 100%)`
    sliderValue.textContent = `${this.value} x ${this.value}`;
    gridSize = this.value
    makeGrid(gridSize);
};

//clear the canvas when the button is pressed
clearButton.addEventListener("click", clearCanvas);

//Turn on eraser when toggle is clicked.
let erase = false;
eraserButton.addEventListener("click", checkToggles);





//---------------Functions--------------------

//this functions creates the grid based on the gridsize
function makeGrid(gridSize) {
    let grid = [];
    deleteCanvas();

    for (let i = 1; i <= gridSize ** 2; i++) {
        //add elements to html
        grid[i] = document.createElement('div');
        grid[i].classList.add('grid-piece');
        canvas.appendChild(grid[i]);
        //adjust css to accommodate this grid size
        //500-gridSize*2 is to account for the added 1px border around each grid piece
        grid[i].style.cssText = `height: ${(500 - gridSize * 2) / gridSize}px; width: ${(500 - gridSize * 2) / gridSize}px;`;
        //add eventListener to each grid piece to look for hover.
        grid[i].addEventListener('mouseover', changeColorBlack);
    }
}

//deletes all nodes and resets canvas at current grid size.
function clearCanvas(e){
    deleteCanvas();
    makeGrid(gridSize);
}

//removes all nodes from canvas
function deleteCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }
}

//if there is hover turn the grid piece background color black
//this function changes the background color of something to black
function changeColor(e, color){
    console.log(e);
    console.log(color);
    e.target.style.backgroundColor = color;
}


//these are the functions that get added to tiles to actually call changeColor. This is
//to be able to remove the event listeners since they aren't able to be removed if
//the passthough function is anonymous
function changeColorBlack(e){
    changeColor(e, "black");
}
function changeColorWhite(e){
    changeColor(e, "white");
}

//turns on the eraser toggle
function eraserToggle(){
    eraserButton.classList.toggle("toggled");
    let tiles = document.querySelectorAll(".grid-piece");
    if(!erase){
        tiles.forEach(tile => tile.addEventListener('mouseover', changeColorWhite));
    }else{
        tiles.forEach(tile => tile.removeEventListener('mouseover', changeColorWhite));
    }
    erase = !erase;
}

function checkToggles(e){
    let clicked = e.target.id;
    console.log(clicked);
    if(clicked == "eraser-toggle"){
        eraserToggle();
    }
}