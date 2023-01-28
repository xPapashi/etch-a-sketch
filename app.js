const DEFAULT_SIZE = 16;

const checkbox = document.querySelector("#checkbox");
checkbox.onchange = (e) => toggleText(e);

function createGrid(size) {
  const container = document.querySelector(".container-grid");
  const total = size * size;

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < total; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid", `grid-${i + 1}`);

    container.appendChild(grid);
  }
}

function removeGrid() {
  const grids = document.querySelectorAll(".grid");

  grids.forEach((grid) => {
    grid.remove();
  });
}

function applyToElements(selector, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(callback);
}

function drawOnGrid() {
  const grids = document.querySelectorAll(".grid");

  grids.forEach((grid) => {
    grid.addEventListener("mouseover", () => {
      grid.classList.add("gridChange");
    });
  });
}

function drawRandomGridColor() {
  applyToElements('.grid', (grid) => {
    grid.addEventListener('mouseover', () => {
      let R = Math.floor(Math.random() * 256);
      let G = Math.floor(Math.random() * 256);
      let B = Math.floor(Math.random() * 256);
      grid.style['background-color'] = `rgb(${R},${G},${B})`;
    });
  });
}

function toggleText(e) {

  const grids = document.querySelectorAll(".grid");

  grids.forEach((grid) => {
    if (!e.target.checked) {
      grid.style.border = "none";
    } else {
      grid.style.border = "1px solid #000";
    }
  });
}

function openPopup() {
  const button = document.querySelector(".btnChange");

  button.addEventListener("click", () => {
    let answer = prompt("Enter number of square per side of the grid: e.g. 32");

    if (answer === "" || answer === null)
      return alert("You need to enter something!");
    else if (answer > 64) return alert("You cannot enter more than 64!");
    else {
      removeGrid();
      createGrid(answer);
      drawOnGrid();
    }
  });
}

function main() {
  createGrid(DEFAULT_SIZE);
  //drawOnGrid();
  drawRandomGridColor();
  openPopup();
  toggleText();
}

main();
