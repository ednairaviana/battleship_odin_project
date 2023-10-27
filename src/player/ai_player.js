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
      console.log(this.queue)
    } else {
      const id = Math.floor(Math.random() * this.allProbabilities.length);
      coor = this.allProbabilities[id];
      delete this.allProbabilities[id];

      console.log(id)
    }

    const x = coor[0];
    const y = coor[1];

    console.log(coor);

    if (typeof this.enemy.board.square[x][y] === "object") {
      this.filterQueue(x, y);
    }

    this.enemy.board.receiveAttack([x, y]);
    return [x, y];
  }

  filterQueue(x, y) {
    const filter = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    filter.forEach((el) => {
      this.allProbabilities.forEach((prob, i) => {
        if (el[0] === prob[0] && el[1] === prob[1]) {
          this.queue.push([prob[0], prob[1]]);
          delete this.allProbabilities[i];
        }
      });
    });
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
