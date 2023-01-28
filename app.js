let removeNumBool = false;

function createGrid(rows, columns, removeNum) {
  const container = document.querySelector(".container-grid");
  const total = rows * columns;

  for (let i = 0; i < total; i++) {
    container.style.setProperty("--grid-rows", rows);
    container.style.setProperty("--grid-columns", columns);

    let grid = document.createElement("div");
    grid.classList.add("grid", `grid-${i + 1}`);
    if (!removeNum) {
        grid.innerText = `${i + 1}`;
    } else {
        grid.style.padding = '10px';
    }

    container.appendChild(grid);
  }
}

function removeGrid() {
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        grid.remove();
    });
}

function drawOnGrid() {
  const grids = document.querySelectorAll(".grid");

  grids.forEach((grid) => {
    grid.addEventListener("mouseover", () => {
    grid.classList.add('gridChange');
    });
  });
}

function toggleText() {
    const checkbox = document.querySelector('#checkbox');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            return removeNumBool = false;
        } else return removeNumBool = true;
    });
}

function openPopup() {
    const button = document.querySelector('.btnChange');

    button.addEventListener('click', () => {
        let answer = prompt("Enter number of square per side of the grid: e.g. 32");

        if (answer === "" || answer === null) return alert("You need to enter something!");
        else if (answer > 64) return alert("You cannot enter more than 64!");
        else {
            removeGrid();
            createGrid(answer, answer, removeNumBool);
            drawOnGrid();
        }
    });
}

createGrid(16, 16, toggleText());
drawOnGrid();
openPopup();
toggleText();