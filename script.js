//get the canvas and options
const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector('#myRange');
const sliderValue = document.querySelector('#slider-value');
const clearButton = document.querySelector("#clear-canvas-button");
const eraserButton = document.querySelector("#eraser-toggle");
const colorButton = document.querySelector("#color-toggle");
const colorPicker = document.querySelector("#pen-color");
const rainbowButton = document.querySelector("#rainbow-toggle");

//clear the canvas when the button is pressed
clearButton.addEventListener("click", clearCanvas);

//Turn on toggles when button is clicked.
let erase = false;
eraserButton.addEventListener("click", checkToggles);
let color = false;
colorButton.addEventListener("click", checkToggles);
let rainbow = false;
rainbowButton.addEventListener('click', checkToggles);

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







//---------------Functions--------------------

//this functions creates the grid based on the gridsize
function makeGrid(gridSize) {
    let grid = [];
    deleteCanvas();

    if(color){
        colorToggle();
    }
    if(rainbow){
        rainbowToggle();
    }
    eraserToggle();
    if(erase){
        eraserToggle();
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
        grid[i].addEventListener('mouseover', changeColorBlack);
        grid[i].addEventListener('touchstart', changeColorBlack);
        grid[i].addEventListener('touchmove', changeColorBlack);
        
        
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
function changeColorPicked(e){
    let colorPicked = colorPicker.value;
    changeColor(e,colorPicked);
}
function changeColorRainbow(e){
    changeColor(e,`rgb(${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, 
                ${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, 
                ${Math.floor(Math.random() * (255 - 0 + 1) + 0)})`);
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

//turns on the color toggle
function colorToggle(){
    colorButton.classList.toggle("toggled");
    let tiles = document.querySelectorAll(".grid-piece");
    if(!color){
        tiles.forEach(tile => tile.addEventListener('mouseover', changeColorPicked));
    }else{
        tiles.forEach(tile => tile.removeEventListener('mouseover', changeColorPicked));
    }
    color = !color;
}

//turns on the rainbow toggle
function rainbowToggle(){
    rainbowButton.classList.toggle("toggled");
    let tiles = document.querySelectorAll(".grid-piece");
    if(!rainbow){
        tiles.forEach(tile => tile.addEventListener('mouseover', changeColorRainbow));
    }else{
        tiles.forEach(tile => tile.removeEventListener('mouseover', changeColorRainbow));
    }
    rainbow = !rainbow;
}

function checkToggles(e){
    let clicked = e.target.id;
    if(clicked == "eraser-toggle"){
        if(color){
            colorToggle();
        }
        if(rainbow){
            rainbowToggle();
        }
        eraserToggle();
    }
    if(clicked == "color-toggle"){
        if(erase){
            eraserToggle();
        }
        if(rainbow){
            rainbowToggle()
        }
        colorToggle();
    }
    if(clicked == "rainbow-toggle"){
        if(erase){
            eraserToggle();
        }
        if(color){
            colorToggle()
        }
        rainbowToggle();
    }

}