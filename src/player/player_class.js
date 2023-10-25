import { GameBoard } from "../gameBoard_class/gameBoard_class";
import { AIPlayer } from "./ai_player";

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

function newGame(name) {
  const playerOne = new Player(name);
  const playerTwo = new AIPlayer();

  playerOne.enemy = playerTwo;
  playerTwo.enemy = playerOne;

  playerTwo.placeAllShips();

  playerOne.attack([4, 5]);
  playerTwo.attack();

  console.log(playerOne.board.square);
  console.log(playerTwo.board.square);
}

export { newGame };
