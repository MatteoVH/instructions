import {
  appendLine,
  Point,
  generateNumberInRange,
} from "../util";

enum Side {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export default function drawBounce(
  width: number,
  height: number,
  canvasContext: CanvasRenderingContext2D
): void {
  function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.keys(anEnum)
      .map((n) => Number.parseInt(n))
      .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }

  console.log('width', width);
  console.log('height', height);

  const side = randomEnum(Side);

  let point: Point;
  let startingDirection;

  switch (side) {
    case Side.TOP:
      point = [generateNumberInRange(0, width), 0];
      startingDirection = generateNumberInRange(Math.PI, 2 * Math.PI);
    case Side.RIGHT:
      point = [width, generateNumberInRange(0, height)];
      startingDirection = generateNumberInRange(Math.PI / 2, (3 * Math.PI) / 2);
    case Side.BOTTOM:
      point = [generateNumberInRange(0, width), height];
      startingDirection = generateNumberInRange(0, Math.PI);
    case Side.LEFT:
      point = [0, generateNumberInRange(0, height)];
      startingDirection = generateNumberInRange(
        (3 / 2) * Math.PI,
        (5 / 2) * Math.PI
      );
  }

  const bounce = (point: Point, direction: number, level = 0) => {
    const getSideFromPoint = (point: Point) => {
      if (point[0] === 0) return Side.LEFT;
      if (point[0] === width) return Side.RIGHT;
      if (point[1] === 0) return Side.TOP;
      if (point[1] === height) return Side.BOTTOM;
    };

    const side = getSideFromPoint(point);
    console.log('new side determined as', Side[side]);
    const minimalDirection = direction % (2 * Math.PI);
    let newDirection;
    let theta;
    let newPoint: Point;
    let leftYIntercept;
    let bottomXIntercept;
    let rightYIntercept;
    let topXIntercept;
    let newSlope;
    let xIntercept;

    switch (side) {
      case Side.TOP:
        if (minimalDirection > Math.PI / 2) {
          console.log('going down and left');
          theta = Math.PI - minimalDirection;
          newDirection = Math.PI + theta;
          newSlope = Math.tan(newDirection);
          xIntercept = point[1] - newSlope * point[0];
          leftYIntercept = xIntercept;
          bottomXIntercept = (height - xIntercept) / newSlope;
          if (leftYIntercept > 0 && leftYIntercept < height) {
            newPoint = [0, leftYIntercept];
          } else {
            newPoint = [bottomXIntercept, height];
          }
        } else {
          console.log('going down and right');
          theta = minimalDirection;
          newDirection = 2 * Math.PI - theta;
          newSlope = Math.tan(newDirection);
          xIntercept = point[1] - newSlope * point[0];
          rightYIntercept = xIntercept + newSlope * width;
          bottomXIntercept = (height - xIntercept) / newSlope;
          if (rightYIntercept > 0 && rightYIntercept < height) {
            newPoint = [width, rightYIntercept];
          } else {
            newPoint = [bottomXIntercept, height];
          }
        }
        break;
      case Side.RIGHT:
        if (minimalDirection > (3 / 2) * Math.PI) {
          console.log('going down and left');
          theta = minimalDirection - (3 / 2) * Math.PI;
          newDirection = (3 / 2) * Math.PI + theta;
          newSlope = Math.tan(newDirection);
          xIntercept = point[1] - newSlope * point[0];
          leftYIntercept = xIntercept;
          bottomXIntercept = (height - xIntercept) / newSlope;
          if (leftYIntercept > 0 && leftYIntercept < height) {
            newPoint = [0, leftYIntercept];
          } else {
            newPoint = [bottomXIntercept, height];
          }
        } else {
          console.log('going up and left');
          theta = 3 * Math.PI / 2 - minimalDirection;
          newDirection = Math.PI / 2 + theta;
          newSlope = Math.tan(newDirection);
          xIntercept = point[1] - newSlope * point[0];
          leftYIntercept = xIntercept;
          topXIntercept = -xIntercept / newSlope;
          if (leftYIntercept > 0 && leftYIntercept < height) {
            newPoint = [0, leftYIntercept];
          } else {
            newPoint = [topXIntercept, 0];
          }
        }
        break;
      case Side.BOTTOM:
        console.log('BOTTOM');
        if (minimalDirection > (3 / 2) * Math.PI) {
          console.log('going up and right');
          theta = 2 * Math.PI - minimalDirection;
          newDirection = theta;
          newSlope = Math.tan(newDirection);
          xIntercept = point[1] - newSlope * point[0];
          rightYIntercept = xIntercept + newSlope * width;
          topXIntercept = -xIntercept / newSlope;
          console.log('bottom rightYIntercept', rightYIntercept);
          if (rightYIntercept > 0 && rightYIntercept < height) {
            newPoint = [width, rightYIntercept];
          } else {
            newPoint = [topXIntercept, 0];
          }
        } else {
          console.log('going up and left');
          theta = minimalDirection - Math.PI;
          newDirection = Math.PI - theta;
          newSlope = Math.tan(newDirection);
          xIntercept = point[1] - newSlope * point[0];
          leftYIntercept = xIntercept;
          topXIntercept = -xIntercept / newSlope;
          console.log('bottom leftYIntercept', leftYIntercept);
          if (leftYIntercept > 0 && leftYIntercept < height) {
            newPoint = [0, leftYIntercept];
          } else {
            newPoint = [topXIntercept, 0];
          }
        }
        break;
      case Side.LEFT:
        if (minimalDirection < Math.PI) {
          console.log('going up and right');
          theta = minimalDirection - Math.PI / 2;
          newDirection = Math.PI / 2 - theta;
          newSlope = Math.tan(newDirection);
          xIntercept = point[1] - newSlope * point[0];
          rightYIntercept = xIntercept + newSlope * width;
          topXIntercept = -xIntercept / newSlope;
          if (rightYIntercept > 0 && rightYIntercept < height) {
            newPoint = [width, rightYIntercept];
          } else {
            newPoint = [topXIntercept, 0];
          }
        } else {
          console.log('going down and right');
          theta = (3 / 2) * Math.PI - minimalDirection;
          newDirection = (3 / 2) * Math.PI + theta;
          newSlope = Math.tan(newDirection);
          xIntercept = point[1] - newSlope * point[0];
          rightYIntercept = newSlope * width + xIntercept;
          bottomXIntercept = (height - xIntercept) / newSlope;
          if (rightYIntercept > 0 && rightYIntercept < height) {
            newPoint = [width, rightYIntercept];
          } else {
            newPoint = [bottomXIntercept, height];
          }
        }
        break;
    }

    console.log('adding line', point, newPoint);
    appendLine(canvasContext, [point, newPoint]);

    if (level < 100) {
      bounce(newPoint, newDirection, level + 1);
    }
  };

  bounce(point, startingDirection);
}
