import * as d3 from "d3";

import { drawLines } from "./lines";
import { drawConnectedLines } from "./connectedLines";

const width = window.innerWidth;
const height = window.innerHeight;

const connectedLinesContainer: any = d3
  .select("#connected-lines")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const linesContainer: any = d3
  .select("#lines")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

drawLines(width, height, linesContainer);
drawConnectedLines(width, height, connectedLinesContainer);
