import { Player } from "../player/player_class";
import { AIPlayer } from "../player/ai_player";

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
