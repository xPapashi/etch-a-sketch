const DEFAULT_SIZE = 16;
const checkboxBorder = document.querySelector("#checkboxBorder");
const checkboxRGB = document.querySelector("#checkboxRGB");

checkboxBorder.onchange = toggleText;
checkboxRGB.onchange = setGridDrawColor;

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

function applyToElements(selector, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(callback);
}

function removeGrid() {
  applyToElements(".grid", (grid) => {
    grid.remove();
  });
}

function setGridDrawColor() {
  if (checkboxRGB.checked) {
    drawRandomGridColor();
  } else {
    drawOnGrid();
  }
}

function drawOnGrid() {
  applyToElements(".grid", (grid) => {
    grid.addEventListener("mouseover", () => {
      grid.classList.remove("gridRGB");
      grid.classList.add("gridBlack");
    });
  });
}

function drawRandomGridColor() {
  if (checkboxRGB.checked) {
    applyToElements(".grid", (grid) => {
      grid.addEventListener("mouseover", () => {
        if (checkboxRGB.checked) {
          grid.classList.remove('gridBlack');
          let R = Math.floor(Math.random() * 256);
          let G = Math.floor(Math.random() * 256);
          let B = Math.floor(Math.random() * 256);
          grid.style.setProperty(`--colors-r`, `${R}`);
          grid.style.setProperty(`--colors-g`, `${G}`);
          grid.style.setProperty(`--colors-b`, `${B}`);
          grid.classList.add("gridRGB");
        }
      });
    });
  }
}

function toggleText() {
  applyToElements(".grid", (grid) => {
    if (checkboxBorder.checked) {
      grid.style.border = "1px solid #000";
    } else {
      grid.style.border = "none";
    }
  });
}

function eraseGrid() {
  const button = document.querySelector('#erase');

  button.addEventListener('click', () => {
    applyToElements('.grid', (grid) => {
      grid.classList.remove('gridBlack');
      grid.classList.remove('gridRGB');
    });
  });
}

function openPopup() {
  const button = document.querySelector("#change");

  button.addEventListener("click", () => {
    let answer = prompt("Enter number of square per side of the grid: e.g. 32");

    if (answer === "" || answer === null)
      return alert("You need to enter something!");
    else if (answer > 64) return alert("You cannot enter more than 64!");
    else {
      removeGrid();
      createGrid(answer);
      setGridDrawColor();
      toggleText();
    }
  });
}

function main() {
  createGrid(DEFAULT_SIZE);
  setGridDrawColor();
  toggleText();
  openPopup();
  eraseGrid();
}

main();
