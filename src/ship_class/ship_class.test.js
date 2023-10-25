import { Ship } from "./ship_class";

test("changes length with hits", () => {
  const testShip = new Ship(3);

  testShip.hit();

  expect(testShip.length).toBe(2);
});

test("ship is sunk", () => {
  const testShip = new Ship(3);

  testShip.hit();
  testShip.hit();
  testShip.hit();

  expect(testShip.isSunk).toBe(true);
});
