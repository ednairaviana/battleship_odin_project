class Ship {
  constructor(length) {
    this.length = length;
    this.isSunk = false;
  }

  hit() {
    this.length -= 1;
    if (this.length === 0) {
      this.isSunk = true;
    }
  }
}

export { Ship };
