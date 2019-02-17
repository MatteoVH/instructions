import drawRandom from "./random";
import drawConnected from "./connected";
import drawDrift from "./drift";
import drawFollow from "./follow";
import drawSpeckle from "./speckle";
import drawDense from "./dense";
import drawHydra from "./hydra";
import drawRays from "./rays";
import drawSurge from "./surge";
import drawSpiral from "./whirl";
import drawSpiral2 from "./whirl2";
import drawStar from "./star";
import drawBugPath from "./bugPath";
import drawFiveCurves from "./fiveCurves";

export default [
  {
    path: "/random",
    linkName: "random",
    drawFunc: drawRandom
  },
  {
    path: "/connected",
    linkName: "connected",
    drawFunc: drawConnected
  },
  {
    path: "/drift",
    linkName: "drift",
    drawFunc: drawDrift
  },
  {
    path: "/follow",
    linkName: "follow",
    drawFunc: drawFollow
  },
  {
    path: "/speckle",
    linkName: "speckle",
    drawFunc: drawSpeckle
  },
  {
    path: "/dense",
    linkName: "dense",
    drawFunc: drawDense
  },
  {
    path: "/hydra",
    linkName: "hydra",
    drawFunc: drawHydra
  },
  {
    path: "/rays",
    linkName: "rays",
    drawFunc: drawRays
  },
  {
    path: "/surge",
    linkName: "surge",
    drawFunc: drawSurge
  },
  {
    path: "/whirl",
    linkName: "whirl",
    drawFunc: drawSpiral
  },
  {
    path: "/whirl2",
    linkName: "whirl 2",
    drawFunc: drawSpiral2
  },
  {
    path: "/star",
    linkName: "star",
    drawFunc: drawStar
  },
  {
    path: "/bug",
    linkName: "bug",
    drawFunc: drawBugPath
  },
  {
    path: "/fiveCurves",
    linkName: "fiveCurves",
    drawFunc: drawFiveCurves
  }
];
