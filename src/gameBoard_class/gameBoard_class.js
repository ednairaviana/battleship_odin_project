import { Ship } from "../ship_class/ship_class";

class GameBoard {
  constructor() {
    this.square = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.ships = [];
  }

  isAllSunk() {
    return this.ships.every((ship) => ship.isSunk === true) ? true : false;
  }

  isOutOfTheBoard(coor, position, length) {
    const x = coor[0];
    const y = coor[1];

    if (position === "vertical") {
      return x + length < 10 ? false : true;
    } else if (position === "horizontal") {
      return y + length < 10 ? false : true;
    }
  }

  placeShip(coor, position, length) {
    if (!this.isOutOfTheBoard(coor, position, length)) {
      const ship = new Ship(length);
      const x = coor[0];
      const y = coor[1];

      if (position === "vertical") {
        for (let i = 0; i < length; i++) {
          this.square[x + i][y] = ship;
        }
      } else if (position === "horizontal") {
        for (let i = 0; i < length; i++) {
          this.square[x][y + i] = ship;
        }
      }

      this.ships.push(ship);
    }
  }

  receiveAttack(coor) {
    const x = coor[0];
    const y = coor[1];

    if (this.square !== 1 && this.square !== 2) {
      if (typeof this.square[x][y] === "object") {
        this.square[x][y].hit();
        this.square[x][y] = 2;
      } else {
        this.square[x][y] = 1;
      }
    }
  }
}

export { GameBoard };
