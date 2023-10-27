import { domObj } from "./dom_obj";

function renderSquares(playerSquare, domBoard, color) {
  playerSquare.board.square.forEach((line, x) => {
    line.forEach((column, y) => {
      if (typeof column === "object") {
        createSquares(domBoard, x, y, true, color, playerSquare);
      } else {
        createSquares(domBoard, x, y, false, color, playerSquare);
      }
    });
  });

  domBoard.style.pointerEvents = "none";
}

function createSquares(parent, x, y, isShip, color, playerSquare) {
  const square = document.createElement("div");

  square.classList.add("square");

  if (isShip) {
    square.style.backgroundColor = color;
    square.style.boxShadow = "inset 0 0 3px white";
  }

  parent.insertAdjacentElement("beforeend", square);

  square.addEventListener("click", async () => {
    domObj.board.second.style.pointerEvents = "none";

    if (playerSquare.board.receiveAttack([x, y])) {
      await attackAnimation(square, "gray");
    } else {
      await attackAnimation(square, "gray");
    }

    if (playerSquare.board.isAllSunk()) {
      clearBoard(parent);
      console.log("game over otário");
    }

    aiAttack();

    domObj.board.second.style.pointerEvents = "auto";
  });
}

const aiAttack = async () => {
  const coor = domObj.plTwo.attack();
  const id = parseInt(`${coor[0]}${coor[1]}`);

  if (domObj.plOne.board.square[coor[0]][coor[1]] === 1) {
    await attackAnimation(domObj.board.first.childNodes[id], "#000");
  } else {
    await attackAnimation(domObj.board.first.childNodes[id], "gray");
  }
};

function gameOver(parent) {}

function clearBoard(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const attackAnimation = async (comp, color) => {
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  const mainColor = color;
  const bcgColor = "#151515";
  comp.style.pointerEvents = "none";

  setColor("gray");

  await sleep(300);
  setColor(bcgColor);

  await sleep(300);
  setColor("gray");

  await sleep(200);
  setColor(bcgColor);

  await sleep(200);
  setColor("gray");

  await sleep(100);
  setColor(bcgColor);

  await sleep(100);
  setColor("gray");

  await sleep(500);
  setColor(mainColor);

  function setColor(color) {
    comp.style.backgroundColor = color;
  }
};

export { renderSquares };
