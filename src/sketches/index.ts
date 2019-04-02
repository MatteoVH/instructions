import drawRandom from "./random";
import drawConnected from "./connected";
import drawDrift from "./drift";
import drawSpeckle from "./speckle";
import drawHydra from "./hydra";
import drawRays from "./rays";
import drawYarn from "./yarn";
import drawSwirl from "./swirl";
import drawStar from "./star";
import drawBugPath from "./bugPath";
import drawFiveCurves from "./fiveCurves";
import drawTangent from "./tangent";

export default [
  {
    linkName: "random",
    drawFunc: drawRandom
  },
  {
    linkName: "connected",
    drawFunc: drawConnected
  },
  {
    linkName: "drift",
    drawFunc: drawDrift
  },
  {
    linkName: "speckle",
    drawFunc: drawSpeckle
  },
  {
    linkName: "hydra",
    drawFunc: drawHydra
  },
  {
    linkName: "rays",
    drawFunc: drawRays
  },
  {
    linkName: "yarn",
    drawFunc: drawYarn
  },
  {
    linkName: "swirl",
    drawFunc: drawSwirl
  },
  {
    linkName: "star",
    drawFunc: drawStar
  },
  {
    linkName: "bug",
    drawFunc: drawBugPath
  },
  {
    linkName: "fiveCurves",
    drawFunc: drawFiveCurves
  },
  {
    linkName: "tangent",
    drawFunc: drawTangent
  }
];
