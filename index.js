const container = document.querySelector(".container");

function createGrid() {
    for (let i = 0; i < (16 * 16); i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        container.appendChild(square);
    }

    // add hover effect
    container.addEventListener("mouseover", (e) => {
        if (e.target.classList.contains("grid-square")) {
            e.target.classList.add("square-hover");
        }
    });
}

createGrid();