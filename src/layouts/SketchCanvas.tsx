import { select, Selection } from "d3-selection";
import * as React from "react";
import { Point } from "../util";

export default class SketchCanvas extends React.Component<
  {
    width: number;
    height: number;
    drawFunc: (
      width: number,
      height: number,
      canvasContext: CanvasRenderingContext2D
    ) => void;
  },
  {}
> {
  canvasId = Math.floor(Math.random() * 1000000);

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { width, height, drawFunc } = this.props;
    let canvasContainer = select<HTMLCanvasElement, any>(
      `#canvas-${this.canvasId}`
    );
    canvasContainer.node().innerHTML = "";
    canvasContainer = canvasContainer
      .append("canvas")
      .attr("width", width)
      .attr("height", height);
    const context = this.scaleCanvasForHighDPI(width, height, canvasContainer);
    drawFunc(width, height, context);
  }

  scaleCanvasForHighDPI(
    width: number,
    height: number,
    canvas: Selection<HTMLCanvasElement, any, HTMLElement, any>
  ): CanvasRenderingContext2D {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.attr("width", width * dpr);
    canvas.attr("height", height * dpr);
    canvas.style("width", width + "px");
    canvas.style("height", height + "px");
    var ctx = canvas.node().getContext("2d");
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
  }

  render() {
    return <div id={`canvas-${this.canvasId}`} />;
  }
}
