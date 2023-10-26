import { domObj } from "./dom_obj";

function renderSquares() {
  createSquares(domObj.board.first);
  createSquares(domObj.board.second);
}

function createSquares(parent) {
  let x = 0;
  for (let y = 0; x < 10; y++) {
    const square = document.createElement("div");

    square.classList.add("square");
    square.setAttribute("data-coordinate", `${x}, ${y}`);
    parent.insertAdjacentElement("beforeend", square);

    square.addEventListener("click", (e) => {
      console.log(e.target);
      attackAnimation(square);
    });

    if (y === 9) {
      y = -1;
      x++;
    }
  }
}

function attackAnimation(comp) {
  const mainColor = "#00229c";
  const bcgColor = "#151515";

  comp.style.pointerEvents = "none";
  comp.style.backgroundColor = "#00229c";

  setTimeout(setBcgColor, 300);
  setTimeout(setMainColor, 600);
  setTimeout(setBcgColor, 900);
  setTimeout(setMainColor, 1200);

  function setMainColor() {
    comp.style.backgroundColor = mainColor;
  }

  function setBcgColor() {
    comp.style.backgroundColor = bcgColor;
  }
}

export { renderSquares };
