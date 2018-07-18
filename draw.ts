import * as d3 from "d3";

import { drawLines } from "./lines";
import { drawConnectedLines } from "./connectedLines";

const width = window.innerWidth;
const height = window.innerHeight;

const svgContainer: any = d3
  .select("#vis")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//drawLines(width, height, svgContainer);
drawConnectedLines(width, height, svgContainer);
