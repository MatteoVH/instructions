import * as d3 from "d3";

import { drawLines } from "./lines";
import { drawConnectedLines } from "./connectedLines";
import { drawDriftLines } from "./driftLines";

const width = window.innerWidth * 0.95;
const height = width * 0.625;

const linesContainer: any = d3
  .select("#lines")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const connectedLinesContainer: any = d3
  .select("#connected-lines")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const driftLinesContainer: any = d3
  .select("#drift-lines")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

drawLines(width, height, linesContainer);
drawConnectedLines(width, height, connectedLinesContainer);
drawDriftLines(width, height, driftLinesContainer);
