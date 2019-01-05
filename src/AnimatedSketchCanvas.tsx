import { select } from "d3-selection";
import * as React from "react";

import events from "./sketches/events2";

export default class AnimatedSketchCanvas extends React.Component<
  {
    width: number;
    height: number;
    drawFunc: (
      width: number,
      height: number,
      svgContainer: any,
      animationParameter: any
    ) => void;
  },
  {}
> {
  sketchName: string = "sketch";
  index: number = 0;

  componentDidMount() {
    const svgContainer = select(`#${this.sketchName} > svg`);
    const a = new Audio("comp.mp3");
    a.play();
    this.animate(svgContainer);
  }

  animate(svgContainer: any, count: number = 0, lengthCount: number = 0): any {
    const event = events[count];
    console.log(count, lengthCount);
    if (lengthCount >= event.length) {
      return this.animate(svgContainer, count + 1, 0);
    }
    requestAnimationFrame(() => {
      svgContainer.html("");
      this.props.drawFunc(
        this.props.width,
        this.props.height,
        svgContainer,
        event.sounds
      );
      this.animate(svgContainer, count, lengthCount + 0.017);
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
