import { select } from "d3-selection";
import * as React from "react";

export default class SketchCanvas extends React.Component<
  {
    width: number;
    height: number;
    drawFunc: (width: number, height: number, svgContainer: any) => void;
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
    document.querySelector(`#canvas-${this.canvasId} > svg`).innerHTML = "";
    const svgContainer = select(`#canvas-${this.canvasId} > svg`);
    this.props.drawFunc(this.props.width, this.props.height, svgContainer);
  }

  render() {
    return (
      <div id={`canvas-${this.canvasId}`}>
        <svg width={this.props.width} height={this.props.height} />
      </div>
    );
  }
}
