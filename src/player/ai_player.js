import { GameBoard } from "../gameBoard_class/gameBoard_class";

class AIPlayer {
  constructor() {
    this.name = "BOT";
    this.board = new GameBoard();
    this.enemy = null;
    this.turn = null;
  }

  attack() {
    const xAttack = Math.floor(Math.random() * 10);
    const yAttack = Math.floor(Math.random() * 10);

    if (
      this.enemy.board.isEmptyCoordinate([xAttack, yAttack]) ||
      typeof this.enemy.board.square[xAttack][yAttack] === "object"
    ) {
      this.enemy.board.receiveAttack([xAttack, yAttack]);
    } else {
      this.attack();
    }
  }

  positionAllShips() {}
}

export { AIPlayer };
