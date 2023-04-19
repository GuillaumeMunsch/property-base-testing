import * as jsc from "jsverify";

const manhattanDistance = (x: number, y: number) => {
  if (x !== y) return Math.abs(y - x);
  return 0;
};

it("Should test the separation when the 2 points are the same. Distance should be null", () => {
  const constantSlope = jsc.forall(jsc.integer, (x): boolean => {
    const distance = manhattanDistance(x, x);
    return distance === 0;
  });

  jsc.assert(constantSlope);
});

it("Should test the separation when the 2 points are NOT the same. Distance should NOT be null", () => {
  const constantSlope = jsc.forall(jsc.integer, jsc.integer, (x, y): boolean => {
    if (x === y) return true;
    const distance = manhattanDistance(x, y);
    return distance !== 0;
  });

  jsc.assert(constantSlope);
});

it("Should test the 'inégalité triangulaire'", () => {
  const constantSlope = jsc.forall(jsc.integer, jsc.integer, jsc.integer, (x, y, z): boolean => {
    const distanceXZ = manhattanDistance(x, z);
    const distanceXY = manhattanDistance(x, y);
    const distanceYZ = manhattanDistance(y, z);
    return distanceXZ <= distanceXY + distanceYZ;
  });

  jsc.assert(constantSlope);
});

it("Should test that a distance is calculated", () => {
  const constantSlope = jsc.forall(jsc.integer, (x): boolean => {
    const additionalValue = 5;
    const distanceXY = manhattanDistance(x, x + 5);
    return distanceXY === additionalValue;
  });

  jsc.assert(constantSlope);
});

it("Should test that a distance is calculated and symetrical", () => {
  const constantSlope = jsc.forall(jsc.integer, jsc.integer, (x, y): boolean => {
    const distanceXY = manhattanDistance(x, y);
    const distanceYX = manhattanDistance(y, x);
    return distanceXY === distanceYX;
  });

  jsc.assert(constantSlope);
});
