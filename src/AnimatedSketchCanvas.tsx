import { select } from "d3-selection";
import * as React from "react";

export default class AnimatedSketchCanvas extends React.Component<
  {
    width: number;
    height: number;
    drawFunc: (
      width: number,
      height: number,
      svgContainer: any,
      animationParameter: number
    ) => void;
    defaultValue: number;
  },
  {}
> {
  sketchName: string = "sketch";

  componentDidMount() {
    const svgContainer = select(`#${this.sketchName} > svg`);
    this.animate(this.props.defaultValue, svgContainer);
  }

  animate(paramValue: number, svgContainer: any) {
    requestAnimationFrame(() => {
      svgContainer.html("");
      this.props.drawFunc(
        this.props.width,
        this.props.height,
        svgContainer,
        paramValue
      );
      this.animate(paramValue + 0.001, svgContainer);
    });
  }

  render() {
    return (
      <div>
        <div id={this.sketchName} className="artboard">
          <svg width={this.props.width} height={this.props.height} />
        </div>
      </div>
    );
  }
}
