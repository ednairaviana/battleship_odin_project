import { GameBoard } from "../gameBoard_class/gameBoard_class";
import { AIPlayer } from "./ai_player";

class Player {
  constructor(name) {
    this.name = name;
    this.board = new GameBoard();
    this.enemy = null;
    this.turn = null;
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

  playerOne.board.placeShip([1, 3], "horizontal", 2);
  playerOne.board.placeShip([2, 3], "horizontal", 3);
  playerOne.board.placeShip([3, 3], "horizontal", 3);
  playerOne.board.placeShip([4, 3], "horizontal", 4);
  playerOne.board.placeShip([5, 3], "horizontal", 5);

  playerTwo.attack();
  playerTwo.attack();
  playerTwo.attack();
  playerTwo.attack();
  playerTwo.attack();
  playerTwo.attack();
  playerTwo.attack();

  console.log(playerOne.board.square);
}

export { newGame };
