const container = document.querySelector(".container");
const changeGridSizeButton = document.querySelector(".change-grid");
const toggleGridButton = document.querySelector(".toggle-grid");
const toggleModeButton = document.querySelector(".toggle-mode");

let isGridVisible = true;
let currentMode = "mouseover";

function createGrid(size) {
    // create square divs
    for (let i = 0; i < (size ** 2); i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        square.style.flex = `1 1 calc(100% / ${size})`;
        container.appendChild(square);
    }
}

function handleFillSquare(e) {
    if (e.target.classList.contains("grid-square")) {
        e.target.classList.add("fill-square");
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

    while (parseInt(newSize) < 0 || parseInt(newSize) > 100) {
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
    // since some of their handlers are anonymous functions
    // and because in sketch mode it doesn't really matter
    // if you can also click and drag to fill a square,
    // since it would have been filled either way.
    // its not the best approach, but it will stay like this for now.

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