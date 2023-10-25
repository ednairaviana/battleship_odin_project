import { domObj } from "./dom_obj";

function renderSquares() {
  createSquares(domObj.board.first);
  createSquares(domObj.board.second);
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

function createSquares(parent) {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    parent.insertAdjacentElement("beforeend", square);

    square.addEventListener("click", () => {
      attackAnimation(square);
    });
  }
}

export { renderSquares };
