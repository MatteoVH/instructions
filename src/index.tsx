import { render } from "react-dom";
import * as React from "react";
import sketches, { ControlType, InterfaceType } from "./sketches/index";
import layouts, { Layout } from "./layouts/index";
import SketchCanvas from "./layouts/SketchCanvas";
import drawSwirlViz from "./sketches/swirlViz";
import drawScratch from "./sketches/scratch";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Controls = styled.div`
  width: 500px;
`;

const width = window.innerWidth * 0.95;
const height = window.innerHeight * 0.95;

interface Control {
  name: string;
  type: ControlType;
  interface: InterfaceType;
}

class App extends React.Component<
  {},
  {
    layout: Layout;
    drawFunc: (
      width: number,
      height: number,
      canvasContext: CanvasRenderingContext2D,
      controlValues?: any[]
    ) => void;
    controls: Control[];
    controlValues: any[];
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      layout: SketchCanvas,
      drawFunc: drawScratch,
      controls: sketches[sketches.length - 1].controls,
      controlValues: [5],
    };
  }

  renderSketches() {
    return sketches.map(
      (
        sketch: {
          path: string;
          linkName: string;
          drawFunc: (
            width: number,
            height: number,
            canvasContext: CanvasRenderingContext2D
          ) => void;
          controls: Control[];
        },
        index: number
      ) => {
        return (
          <button
            key={index}
            onClick={() => {
              this.setState({
                drawFunc: sketch.drawFunc,
                controls: sketch.controls,
              });
            }}
            className="instruction-description"
          >
            {sketch.linkName}
          </button>
        );
      }
    );
  }

  setLayout(component: any) {
    this.setState({ layout: component });
  }

  renderLayouts() {
    return layouts.map(
      (
        layout: {
          name: string;
          component: React.ElementType;
        },
        index: number
      ) => (
        <button
          key={index}
          onClick={() => this.setLayout(layout.component)}
          className="instruction-description"
        >
          {layout.name}
        </button>
      )
    );
  }

  handleControlValueChange(event: any, value: number) {
    this.setState({ controlValues: [value] });
  }

  render() {
    return (
      <div>
        <div>
          <h2>sketches</h2>
          <nav>{[this.renderSketches()]}</nav>
        </div>
        <div>
          <h2>layouts</h2>
          <nav>{this.renderLayouts()}</nav>
        </div>
        {this.state.controls?.length > 0 && (
          <ControlContainer>
            <Controls>
              {this.state.controls?.map((control) => {
                return (
                  <>
                    <div>{control.name}</div>
                    <Slider
                      defaultValue={5}
                      min={-25}
                      max={25}
                      step={1}
                      marks
                      onChange={this.handleControlValueChange.bind(this)}
                    ></Slider>
                  </>
                );
              })}
            </Controls>
          </ControlContainer>
        )}
        <div className="artboard">
          <this.state.layout
            height={height}
            width={width}
            drawFunc={this.state.drawFunc}
            controlValues={this.state.controlValues}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
