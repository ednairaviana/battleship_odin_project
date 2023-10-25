import { GameBoard } from "../gameBoard_class/gameBoard_class";

class AIPlayer {
  constructor() {
    this.name = "BOT";
    this.board = new GameBoard();
    this.enemy = null;
    this.turn = null;
  }

  attack() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    if (
      this.enemy.board.isEmptyCoordinate([x, y]) ||
      typeof this.enemy.board.square[x][y] === "object"
    ) {
      this.enemy.board.receiveAttack([x, y]);
    } else {
      this.attack();
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
