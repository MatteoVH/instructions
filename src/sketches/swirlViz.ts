import {
  Point,
  generateNearbyPoint,
  PolarPoint,
  polarToCartesian,
  appendLine,
  generateNumberInRange,
} from "../util";

import { underwear } from "../music/underwear";
import mp3 from "../music/this_is_how_i_wear_my_underwear.mp3";

let lastExecuteTime: number;
let startTime: number;

let points: PolarPoint[] = [];

const TIME_DILATION = 0.5;

const SPREAD_FACTOR = 10;

// controls how violent abberrations appear
const ABERRATION_FACTOR = 8;

// how quickly sounds fall off, closer to 1 sustains visualization affection longer
const ABERRATION_DAMPING_FACTOR = 0.97;

interface Op {
  t: number;
  voice: number;
  event: number;
  x: number;
  y: number;
  z: number;
  l: number;
}

const ops: Op[] = underwear.ops;

let audio: HTMLAudioElement;

let lastPos: PolarPoint = { magnitude: 0, rotation: 0 };

export default function drawSwirlViz(
  width: number,
  height: number,
  canvasContext: any,
  t = 0,
  delta = 0
): void {
  if (audio === undefined) {
    audio = new Audio(mp3);
    console.log(audio);
    audio.play();
  }

  if (lastExecuteTime === undefined) {
    lastExecuteTime = performance.now();
  }

  if (startTime === undefined) {
    startTime = performance.now();
  }

  if (t > underwear.length) {
    return;
  }

  const center: Point = [width / 2, height / 2];

  const opsToConsider = [];
  if (ops.length > 0 && ops[0] !== undefined) {
    const newOps = ops;
    while (ops[0].t < t) {
      opsToConsider.push(ops.shift());
    }
  }

  const maxAmplitude = opsToConsider.reduce((prevMax, op) => {
    return Math.max(prevMax, op.z);
  }, 0);

  const maxPan = opsToConsider.reduce((prevMax, op) => {
    return Math.abs(op.x) > Math.abs(prevMax) ? op.x : prevMax;
  }, 0);

  const newMaxAmp = Math.max(maxAmplitude, lastPos.magnitude);
  const newMaxRotation =
    Math.abs(maxPan) > Math.abs(lastPos.rotation) ? maxPan : lastPos.rotation;
  const p: PolarPoint = {
    magnitude:
      generateNumberInRange(0.9 * newMaxAmp, newMaxAmp) * ABERRATION_FACTOR,
    rotation:
      generateNumberInRange(0.9 * newMaxRotation, newMaxRotation) *
      ABERRATION_FACTOR,
  };

  const periodAdjustedAberration = 1 - (1 - ABERRATION_DAMPING_FACTOR) * delta;
  lastPos = {
    magnitude: newMaxAmp * periodAdjustedAberration,
    rotation: newMaxRotation * periodAdjustedAberration,
  };

  points = points.map((p, i) => {
    return {
      magnitude: p.magnitude + delta * TIME_DILATION * SPREAD_FACTOR,
      rotation: p.rotation + delta * TIME_DILATION * Math.PI,
    };
  });
  points = [p, ...points];

  const cartesianPoints = points.map((p) => {
    const cartesianPoint = polarToCartesian(p, center);
    const driftLimit = (0.5 * t) / 1000;
    return generateNearbyPoint(width, height, cartesianPoint, {
      posY: driftLimit,
      negY: driftLimit,
      posX: driftLimit,
      negX: driftLimit,
    });
  });

  appendLine(canvasContext, cartesianPoints);

  requestAnimationFrame((newTime) => {
    delta = newTime - lastExecuteTime;
    canvasContext.clearRect(0, 0, width, height);
    lastExecuteTime = performance.now();
    drawSwirlViz(
      width,
      height,
      canvasContext,
      (newTime - startTime) / 1000,
      delta / 1000
    );
  });
}
