import { experiments } from "webpack";
import { GameBoard } from "./gameBoard_class";

test("10x10 -> gameBoard", () => {
  const board = new GameBoard();

  expect(board.square[0][0]).toBe(0);
  expect(board.square[9][9]).toBe(0);
});

test("horizontal position grows correctly", () => {
  const board = new GameBoard();
  board.placeShip([1, 2], "horizontal", 3);

  expect(board.square[1][1]).toBe(0);
  expect(typeof board.square[1][2]).toBe("object");
  expect(typeof board.square[1][3]).toBe("object");
  expect(typeof board.square[1][4]).toBe("object");
  expect(board.square[1][5]).toBe(0);
});

test("vertical position grows correctly", () => {
  const board = new GameBoard();
  board.placeShip([1, 2], "vertical", 3);

  expect(board.square[0][2]).toBe(0);
  expect(typeof board.square[1][2]).toBe("object");
  expect(typeof board.square[2][2]).toBe("object");
  expect(typeof board.square[3][2]).toBe("object");
  expect(board.square[4][2]).toBe(0);
});

test("coordinate attacked returns 1", () => {
  const board = new GameBoard();
  board.receiveAttack([3, 4]);

  expect(board.square[3][4]).toBe(1);
});

test("receiveAttack hits a ship", () => {
  const board = new GameBoard();
  board.placeShip([3, 4], "horizontal", 3);
  board.receiveAttack([3, 4]);

  expect(board.square[3][5].length).toBe(2);
});

test("board knows when all ships are sunk", () => {
  const board = new GameBoard();
  board.placeShip([3, 4], "horizontal", 3);
  board.placeShip([4, 4], "horizontal", 3);

  board.receiveAttack([3, 4]);
  board.receiveAttack([3, 5]);
  board.receiveAttack([3, 6]);

  board.receiveAttack([4, 4]);
  board.receiveAttack([4, 5]);
  board.receiveAttack([4, 6]);

  expect(board.isAllSunk()).toBe(true);
});

test("It's out over the board", () => {
  const board = new GameBoard();

  expect(board.isOutOfTheBoard([8, 8], "horizontal", 6)).toBe(true)
});
