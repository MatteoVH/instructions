import { render } from "react-dom";
import * as React from "react";
import sketches from "./sketches/index";
import Quatral from "./layouts/Quatral";
import layouts, { Layout } from "./layouts/index";
import drawConnected from "./sketches/connected";

const width = window.innerWidth * 0.95;
const height = window.innerHeight * 0.95;

class App extends React.Component<
  {},
  {
    layout: Layout;
    drawFunc: (
      width: number,
      height: number,
      canvasContext: CanvasRenderingContext2D
    ) => void;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = { layout: Quatral, drawFunc: drawConnected };
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
        },
        index: number
      ) => {
        return (
          <button
            key={index}
            onClick={() => {
              this.setState({ drawFunc: sketch.drawFunc });
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

  render() {
    return (
      <div>
        <div>
          <h2>sketches</h2>
          <nav>
            {[
              this.renderSketches()
              // <a key={100} className="instruction-description">
              //   animated star
              // </a>
            ]}
          </nav>
        </div>
        <div>
          <h2>layouts</h2>
          <nav>{this.renderLayouts()}</nav>
        </div>
        <div className="artboard">
          <this.state.layout
            height={height}
            width={width}
            drawFunc={this.state.drawFunc}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
