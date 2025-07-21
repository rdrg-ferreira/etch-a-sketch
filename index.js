const container = document.querySelector(".container");
const changeGridSizeButton = document.querySelector(".change-grid");
const toggleGridButton = document.querySelector(".toggle-grid");
const toggleModeButton = document.querySelector(".toggle-mode");
const buttonContainer = document.querySelector(".button-container");
const root = document.querySelector(":root");

let isGridVisible = true;
let currentMode = "mouseover";
let currentColor = "black";

function createGrid(size) {
    // create square divs
    for (let i = 0; i < (size ** 2); i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        if (isGridVisible === false) square.classList.add("border-off");
        square.style.flex = `1 1 calc(100% / ${size})`;
        container.appendChild(square);
    }
}

function handleFillSquare(e) {
    if (e.target.classList.contains("grid-square")) {
        e.target.style.backgroundColor = currentColor;
    }
}

function addHoverEffect() {
    container.addEventListener("mouseover", handleFillSquare);
}

function removeHoverEffect() {
    container.removeEventListener("mouseover", handleFillSquare);
}

function changeGridSize() {
    // get new size
    let newSize = prompt("Enter the new number of squares per side for the new grid (max = 100)");

    if (newSize === null) return;

    while (isNaN(newSize) || newSize == "" || parseInt(newSize) < 0 || parseInt(newSize) > 100 ) {
        alert("That value is invalid for the grid size. Try again.");
        newSize = prompt("Enter the new number of squares per side for the new grid:");
    }

    // remove square divs
    container.textContent = "";

    // create new grid
    createGrid(newSize);
}

function toggleGrid() {
    const squares = container.querySelectorAll(".grid-square");

    isGridVisible = !isGridVisible;

    if (isGridVisible) {
        squares.forEach((square) => square.classList.remove("border-off"));
        toggleGridButton.textContent = "Toggle grid: ON";
    } else {
        squares.forEach((square) => square.classList.add("border-off"));
        toggleGridButton.textContent = "Toggle grid: OFF";
    }
}

function handleSketchMode() {
    currentMode = "mouseover";

    // we dont remove the event listeners from click mode
    // that have their handlers as anonymous functions, 
    // since in sketch mode it doesn't really matter
    // if you can also click and drag to fill a square,
    // since it would have been filled either way.
    // its not the best approach, but it will stay like this for now.
    container.removeEventListener("mouseup", removeHoverEffect);

    // add event listerners for sketch mode
    addHoverEffect();

    toggleModeButton.textContent = "Toggle mode: Sketch";
}

function handleCLickMode() {
    currentMode = "mousedown";

    // remove event listerner from sketch mode
    container.removeEventListener("mouseover", handleFillSquare);

    // prevent drag event from happening
    container.addEventListener("dragstart", (e) => e.preventDefault());

    // add event listerners for click mode
    container.addEventListener(currentMode, (e) => {
        if (e.button === 0) addHoverEffect();
    });
    container.addEventListener(currentMode, (e) => {
        if (e.button === 0) handleFillSquare(e);
    }); // this is to fill the square where we start the click and drag motion
    container.addEventListener("mouseup", removeHoverEffect);

    toggleModeButton.textContent = "Toggle mode: Click";
}

function toggleMode() {
    if (currentMode == "mouseover") {
        handleCLickMode();
    } else {
        handleSketchMode();
    }
}

function changeColor(color) {
    root.style.setProperty("--current-color", color);
    currentColor = color;
}

function clearGrid() {
    const squares = container.querySelectorAll(".grid-square");
    squares.forEach((item) => item.style.backgroundColor = "white");
}

function initSidebar() {
    // utility buttons
    let list = document.querySelectorAll(".utility");

    list.forEach((item) => {
        item.addEventListener("click", (e) => {
            if (e.target.id === "pencil") changeColor("black");
            else if (e.target.id === "eraser") changeColor("white");
            else if (e.target.id === "clear") clearGrid();
        })
    });

    // color buttons
    list = document.querySelectorAll(".color");

    list.forEach((item) => {
        item.style.backgroundColor = item.id;

        item.addEventListener("click", (e) => {
            changeColor(e.target.id);
        });
    });
}

function init() {
    createGrid(16);
    addHoverEffect();
    initSidebar();
}