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

  isEmptyCoordinate(coor) {
    const x = coor[0];
    const y = coor[1];

    if (this.square[x][y] === 0) {
      return true;
    } else {
      return false;
    }
  }

  isPossiblePlaceShip(coor, position, length) {
    const x = coor[0];
    const y = coor[1];

    if (position === "vertical") {
      for (let i = 0; i < length; i++) {
        if (x + length > 10) return false;
        if (this.square[x + i][y] !== 0) return false;
        if (!this.filterCoor(x + i, y)) return false;
      }
    } else if (position === "horizontal") {
      for (let i = 0; i < length; i++) {
        if (y + length > 10) return false;
        if (this.square[x][y + i] !== 0) return false;
        if (!this.filterCoor(x, y + i)) return false;
      }
    }

    return true;
  }

  filterCoor(x, y) {
    const filter = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    for (let i = 0; i < filter.length; i++) {
      const x = filter[i][0];
      const y = filter[i][1];

      if (x >= 0 && x < 10 && y >= 0 && y < 10) {
        if (this.square[x][y] !== 0 || typeof this.square[x][y] === "object") {
          return false;
        }
      }
    }

    return true;
  }

  placeShip(coor, position, length) {
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

  receiveAttack(coor) {
    const x = coor[0];
    const y = coor[1];

    if (typeof this.square[x][y] === "object") {
      this.square[x][y].hit();
      this.square[x][y] = 2;
      return true;
    } else {
      this.square[x][y] = 1;
      return false;
    }
  }
}

export { GameBoard };
