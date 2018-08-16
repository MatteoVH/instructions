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
  sketchName: string = "whirl";

  componentDidMount() {
    const svgContainer = select(`#${this.sketchName} > svg`);
    this.props.drawFunc(this.props.width, this.props.height, svgContainer);
  }

  render() {
    return (
      <div id={this.sketchName} className="artboard">
        <svg width={this.props.width} height={this.props.height} />
      </div>
    );
  }
}
