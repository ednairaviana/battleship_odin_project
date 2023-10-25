class Ship {
  constructor(length) {
    this.length = length;
  }

  hit() {
    this.length -= 1;
  }

  isSunk() {
    return this.length === 0 ? true : false;
  }
}

export { Ship };
