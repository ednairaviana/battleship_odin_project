import { domObj } from "./dom_obj";
import { newGame } from "./init_game";

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

  domObj.board.first.style.pointerEvents = "none";
  domObj.board.second.style.pointerEvents = "auto";

  domObj.board.first.style.opacity = "1";
  domObj.board.second.style.opacity = "1";
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

    if (domObj.plTwo.board.isAllSunk()) {
      createGameOverMessage(
        domObj.board.second,
        domObj.board.first,
        "YOU WIN!"
      );
    } else {
      aiAttack();
      domObj.board.second.style.pointerEvents = "auto";
    }
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

  if (domObj.plOne.board.isAllSunk()) {
    createGameOverMessage(domObj.board.first, domObj.board.second, "YOU LOSE!");
    renderMissingShips();
  }
};

function renderMissingShips() {
  domObj.plTwo.board.square.forEach((line, x) => {
    line.forEach((column, y) => {
      if (typeof column === "object") {
        const id = parseInt(`${x}${y}`);
        domObj.board.second.childNodes[id].style.backgroundColor = "gray";
      }
    });
  });
}

function createGameOverMessage(winBoard, loseBoard, text) {
  loseBoard.style.opacity = "0.2";
  loseBoard.style.pointerEvents = "none";

  const div = document.createElement("div");
  div.classList.add("flex-center-column", "display-msg");

  div.innerHTML = `<p>${text}!!!</p>`;

  const btn = document.createElement("div");
  btn.classList.add("btn-restart");
  btn.innerText = "NEW GAME";

  div.insertAdjacentElement("beforeend", btn);

  btn.addEventListener("click", () => {
    clearBoard(domObj.board.first);
    clearBoard(domObj.board.second);
    newGame();
  });

  winBoard.appendChild(div);
  winBoard.style.pointerEvents = "auto";
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

  await sleep(100);
  setColor("gray");

  await sleep(100);
  setColor(bcgColor);

  await sleep(100);
  setColor("gray");

  await sleep(100);
  setColor(mainColor);

  await sleep(500);

  function setColor(color) {
    comp.style.backgroundColor = color;
  }
};

export { renderSquares };
