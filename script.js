//get the canvas
const canvas = document.querySelector("#canvas");


//determine size of grid
let gridSize = 16;


let grid = [];
for(let i = 1; i <= gridSize**2; i++){
    //add elements to html
    grid[i] = document.createElement('div');
    grid[i].classList.add('grid-piece');
    canvas.appendChild(grid[i]);
    //adjust css to accommodate this grid size
    //500-gridSize*2 is to account for the added 1px border around each grid piece
    grid[i].style.cssText = `height: ${(500-gridSize*2)/gridSize}px; width: ${(500-gridSize*2)/gridSize}px;`;
    //add eventListener to each grid piece to look for hover.
    grid[i].addEventListener('mouseover', changeColor);
}

//if there is hover turn the grid piece background color black
//this function changes the background color of something to black
function changeColor(e) {
    e.target.classList.add("filled");
}