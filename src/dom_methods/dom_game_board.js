import { domObj } from "./dom_obj";

function renderSquares() {
  domObj.plOne.board.square.forEach((line, x) => {
    line.forEach((column, y) => {
      if (typeof column === "object") {
        createSquares(domObj.board.first, x, y, true, "var(--fst-main-color)");
      } else {
        createSquares(domObj.board.first, x, y, false, "var(--fst-main-color)");
      }
    });
  });

  domObj.plTwo.board.square.forEach((line, x) => {
    line.forEach((column, y) => {
      createSquares(domObj.board.second, x, y, false, "var(--scd-main-color)");
    });
  });

  domObj.board.first.pointerEvents = "none";
}

function createSquares(parent, x, y, isShip, color) {
  const square = document.createElement("div");

  square.classList.add("square");

  if (isShip) {
    square.style.backgroundColor = color;
    square.style.boxShadow = "inset 0 0 3px white";
  }

  parent.insertAdjacentElement("beforeend", square);

  square.addEventListener("click", async () => {
    domObj.board.second.style.pointerEvents = "none";

    if (domObj.plTwo.board.receiveAttack([x, y])) {
      await attackAnimation(square, color);
    } else {
      await attackAnimation(square, "#000");
    }

    aiAttack();
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

  domObj.board.second.style.pointerEvents = "auto";
};

function gameOver(parent) {
  if (playerSquare.board.isAllSunk()) {
    clearBoard(parent);
    console.log("game over otário");
  }
}

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

  await sleep(200);
  setColor(bcgColor);

  await sleep(200);
  setColor("gray");

  await sleep(200);
  setColor(bcgColor);

  await sleep(100);
  setColor("gray");

  await sleep(100);
  setColor(bcgColor);

  await sleep(100);
  setColor("gray");

  await sleep(300);
  setColor(mainColor);

  function setColor(color) {
    comp.style.backgroundColor = color;
  }
};

export { renderSquares };
