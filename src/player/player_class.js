import { GameBoard } from "../gameBoard_class/gameBoard_class";

class Player {
  constructor(name) {
    this.name = name;
    this.board = new GameBoard();
    this.enemy = null;
    this.turn = null;
  }

  attack(coor) {
    const x = coor[0];
    const y = coor[1];

    if (
      this.enemy.board.isEmptyCoordinate([x, y]) ||
      typeof this.enemy.board.square[x][y] === "object"
    ) {
      this.enemy.board.receiveAttack([x, y]);
    }
  }

  checkGameOver() {
    return this.board.isAllSunk() ? true : false;
  }
}

export { Player };
