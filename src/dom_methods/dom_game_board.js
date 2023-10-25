import { domObj } from "./dom_obj";

function renderSquares() {
  createSquares(domObj.board.first);
  createSquares(domObj.board.second);
}

function createSquares(parent) {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    parent.insertAdjacentElement("beforeend", square);
  }
}

export { renderSquares };
