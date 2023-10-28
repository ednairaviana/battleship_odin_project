import { GameBoard } from "../gameBoard_class/gameBoard_class";

class AIPlayer {
  constructor() {
    this.name = "BOT";
    this.board = new GameBoard();
    this.enemy = null;
    this.turn = null;
    this.queue = [];
    this.allProbabilities = this.setAllProbabilities();
  }

  setAllProbabilities() {
    const array = [];

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        array.push([x, y]);
      }
    }

    return array;
  }

  attack() {
    this.allProbabilities = this.allProbabilities.filter(function (element) {
      return element !== undefined;
    });

    let coor = null;

    if (this.queue.length > 0) {
      coor = this.queue.shift();
    } else {
      const id = Math.floor(Math.random() * this.allProbabilities.length);
      coor = this.allProbabilities[id];
      delete this.allProbabilities[id];
    }

    const x = coor[0];
    const y = coor[1];

    if (typeof this.enemy.board.square[x][y] === "object") {
      this.filterQueue(x, y);
    }

    this.enemy.board.receiveAttack([x, y]);
    return [x, y];
  }

  filterQueue(x, y) {
    this.isX(x, y);
    this.isY(x, y);
  }

  isY(x, y) {
    let boolean = false;
    const yDirection = [];

    if (this.checkValidity(x , y - 1)) yDirection.push([x, y - 1]);
    if (this.checkValidity(x , y + 1)) yDirection.push([x, y + 1]);

    yDirection.forEach((coor) => {
      if (this.itHasShip(coor[0], coor[1])) {
        boolean = true;
      }
    });

    if (boolean === true) {
      this.enqueue(yDirection);
    }
  }

  isX(x, y) {
    let boolean = false;
    const xDirection = [];

    if (this.checkValidity(x - 1, y)) xDirection.push([x - 1, y]);
    if (this.checkValidity(x + 1, y)) xDirection.push([x + 1, y]);

    xDirection.forEach((coor) => {
      if (this.itHasShip(coor[0], coor[1])) {
        boolean = true;
      }
    });

    if (boolean === true) {
      this.enqueue(xDirection);
    }
  }

  enqueue(arrayProbs) {
    arrayProbs.forEach((el) => {
      this.allProbabilities.forEach((prob, i) => {
        if (el[0] === prob[0] && el[1] === prob[1]) {
          this.queue.push([prob[0], prob[1]]);
          delete this.allProbabilities[i];
        }
      });
    });
  }

  itHasShip(x, y) {
    if (typeof this.enemy.board.square[x][y] === "object") {
      return true;
    } else {
      return false;
    }
  }

  checkValidity(x, y) {
    if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
      return true;
    } else {
      return false;
    }
  }

  placeAllShips() {
    const shipLengths = [2, 2, 3, 3, 4, 4, 5];
    let n = 0;

    while (n < shipLengths.length) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      let position = Math.floor(Math.random() * 2);

      if (position === 0) {
        position = "horizontal";
      } else {
        position = "vertical";
      }

      if (this.board.isPossiblePlaceShip([x, y], position, shipLengths[n])) {
        this.board.placeShip([x, y], position, shipLengths[n]);
        n++;
      }
    }
  }

  checkGameOver() {
    return this.board.isAllSunk() ? true : false;
  }
}

export { AIPlayer };
