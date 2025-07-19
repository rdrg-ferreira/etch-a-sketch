const container = document.querySelector(".container");
const changeGridSizeButton = document.querySelector(".change-grid");

function createGrid(size) {
    // create square divs
    for (let i = 0; i < (size ** 2); i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        square.style.flex = `1 1 calc(100% / ${size})`;
        container.appendChild(square);
    }
}

function addHoverEffect() {
    container.addEventListener("mouseover", (e) => {
        if (e.target.classList.contains("grid-square")) {
            e.target.classList.add("square-hover");
        }
    });
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