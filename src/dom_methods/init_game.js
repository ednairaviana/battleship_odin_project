import { Player } from "../player/player_class";
import { AIPlayer } from "../player/ai_player";
import { domObj } from "./dom_obj";
import { renderSquares } from "./dom_game_board";

function newGame() {
  const playerOne = new AIPlayer();
  const playerTwo = new AIPlayer();

  playerOne.enemy = playerTwo;
  playerTwo.enemy = playerOne;

  domObj.plOne = playerOne;
  domObj.plTwo = playerTwo;

  playerOne.placeAllShips();
  playerTwo.placeAllShips();

  renderSquares();
}

export { newGame };
