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
import drawAnimatedStar from "./animatedStar";
import drawAnimatedConnected from "./animatedConnected";
import drawMetropolis from "./metropolis";
import drawStrata from "./strata";
import drawArpeggio from "./arpeggio";
import drawBounce from "./bounce";
import drawSwirlViz from "./swirlViz";
import drawScratch from "./scratch";

export default [
  {
    linkName: "random",
    drawFunc: drawRandom,
  },
  {
    linkName: "animated connected",
    drawFunc: drawAnimatedConnected,
  },
  {
    linkName: "connected",
    drawFunc: drawConnected,
  },
  {
    linkName: "drift",
    drawFunc: drawDrift,
  },
  {
    linkName: "speckle",
    drawFunc: drawSpeckle,
  },
  {
    linkName: "hydra",
    drawFunc: drawHydra,
  },
  {
    linkName: "rays",
    drawFunc: drawRays,
  },
  {
    linkName: "yarn",
    drawFunc: drawYarn,
  },
  {
    linkName: "swirl",
    drawFunc: drawSwirl,
  },
  {
    linkName: "animated swirl",
    drawFunc: drawSwirlViz,
  },
  {
    linkName: "star",
    drawFunc: drawStar,
  },
  {
    linkName: "animated star",
    drawFunc: drawAnimatedStar,
  },
  {
    linkName: "bug",
    drawFunc: drawBugPath,
  },
  {
    linkName: "fiveCurves",
    drawFunc: drawFiveCurves,
  },
  {
    linkName: "tangent",
    drawFunc: drawTangent,
  },
  {
    linkName: "strata",
    drawFunc: drawStrata,
  },
  {
    linkName: "metropolis",
    drawFunc: drawMetropolis,
  },
  {
    linkName: "arpeggio",
    drawFunc: drawArpeggio,
  },
  {
    linkName: "bounce",
    drawFunc: drawBounce,
  },
  {
    linkName: "scratch",
    drawFunc: drawScratch,
  },
];
