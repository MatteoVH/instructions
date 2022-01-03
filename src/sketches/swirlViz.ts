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

const ops: Op[] = underwear.ops;
const opVoiceSet = new Set();
ops.forEach((op) => {
  opVoiceSet.add(op.voice);
});
const VOICE_COUNT = opVoiceSet.size;

let lines: PolarPoint[][] = [];
// initialize lines to have an empty array for each voice
for (let i = 0; i < VOICE_COUNT; i++) {
  lines.push([]);
}

const TIME_DILATION = 0.5;

const SPREAD_FACTOR = 50;

// controls how violent abberrations appear
const ABERRATION_FACTOR = 8;

// higher numbers create higher aberrations due to amplitude changes
const MAGNITUDE_ABERRATION_FACTOR = 10;

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

let audio: HTMLAudioElement;

let lastPositions: PolarPoint[] = [];

export default function drawSwirlViz(
  width: number,
  height: number,
  canvasContext: any,
  t = 0,
  delta = 0
): void {
  if (audio === undefined) {
    audio = new Audio(mp3);
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

  const opsToConsider = new Map<number, Op[]>();
  if (ops.length > 0 && ops[0] !== undefined) {
    const newOps = ops;
    while (ops[0].t < t) {
      const op = ops.shift();
      if (opsToConsider.has(op.voice)) {
        const newOpArray = [...opsToConsider.get(op.voice), op];
        opsToConsider.set(op.voice, newOpArray);
      } else {
        opsToConsider.set(op.voice, [op]);
      }
    }
  }

  for (let i = 0; i < VOICE_COUNT; i++) {
    if (!opsToConsider.has(i) && lines[i].length === 0) {
      continue;
    }

    const opsInVoice = opsToConsider.has(i) ? opsToConsider.get(i) : [];

    const maxAmplitude = opsInVoice.reduce((prevMax, op) => {
      return Math.max(prevMax, op.z);
    }, 0);

    const maxPan = opsInVoice.reduce((prevMax, op) => {
      return Math.abs(op.x) > Math.abs(prevMax) ? op.x : prevMax;
    }, 0);

    const lastPosAmp = lastPositions[i] ? lastPositions[i].magnitude : 0;
    const lastPosRot = lastPositions[i] ? lastPositions[i].rotation : 0;
    const newMaxAmp = Math.max(maxAmplitude, lastPosAmp);
    const newMaxRotation =
      Math.abs(maxPan) > Math.abs(lastPosRot) ? maxPan : lastPosRot;

    const VOICE_COUNT_NORMALIZED_SPREAD = 0.5 * i + 1;
    const p: PolarPoint = {
      magnitude:
        generateNumberInRange(0.9 * newMaxAmp, newMaxAmp) *
        ABERRATION_FACTOR *
        MAGNITUDE_ABERRATION_FACTOR *
        VOICE_COUNT_NORMALIZED_SPREAD,
      rotation:
        generateNumberInRange(0.9 * newMaxRotation, newMaxRotation) *
        ABERRATION_FACTOR,
    };

    const periodAdjustedAberration =
      1 - (1 - ABERRATION_DAMPING_FACTOR) * delta;
    lastPositions[i] = {
      magnitude: newMaxAmp * periodAdjustedAberration,
      rotation: newMaxRotation * periodAdjustedAberration,
    };

    lines[i] = lines[i].map((p) => {
      const magnitude = p.magnitude + delta * TIME_DILATION * SPREAD_FACTOR;
      const rotation = p.rotation + delta * TIME_DILATION * Math.PI;

      if (magnitude > width / 2 && magnitude > height / 2) {
        return undefined;
      }

      return {
        magnitude,
        rotation,
      };
    });

    const firstUndefined = lines[i].indexOf(undefined);
    if (firstUndefined >= 0) {
      lines[i].splice(firstUndefined, lines[i].length - firstUndefined);
    }

    // trim points that are rendered offscreen anyway
    for (let x = lines[i].length - 1; x >= 0; x--) {
      if (lines[i][x] === undefined) {
        lines[i].pop();
      } else {
        break;
      }
    }

    lines[i] = [p, ...lines[i]];

    const cartesianPoints = lines[i].map((p) => {
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
  }

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
