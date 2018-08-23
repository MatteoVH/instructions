import { render } from "react-dom";
import * as React from "react";
import { Link, Switch, Route, MemoryRouter, Redirect } from "react-router-dom";
import SketchCanvas from "./SketchCanvas";
import sketches from "./sketches/index";
import AnimatedSketchCanvas from "./AnimatedSketchCanvas";
import drawAnimatedStar from "./sketches/animatedStar";

const width = window.innerWidth * 0.95;
const height = width * 0.625;

class App extends React.Component<{}, {}> {
  renderLinks() {
    return sketches.map(
      (
        sketch: {
          path: string;
          linkName: string;
          drawFunc: (width: number, height: number, svgContainer: any) => void;
        },
        index: number
      ) => {
        return (
          <Link
            key={index}
            to={sketch.path}
            className="instruction-description"
          >
            {sketch.linkName}
          </Link>
        );
      }
    );
  }

  renderRoutes() {
    return sketches.map(
      (
        sketch: {
          path: string;
          drawFunc: (width: number, height: number, svgContainer: any) => void;
          param?: any;
        },
        index: number
      ) => {
        return (
          <Route
            key={index}
            path={sketch.path}
            render={props => (
              <SketchCanvas
                width={width}
                height={height}
                drawFunc={sketch.drawFunc}
              />
            )}
          />
        );
      }
    );
  }

  render() {
    return (
      <div>
        <div>
          <nav>
            {[
              this.renderLinks(),
              <Link
                key={100}
                to="/animatedStar"
                className="instruction-description"
              >
                animated star
              </Link>
            ]}
          </nav>
        </div>
        <div>
          <Switch>
            {[
              this.renderRoutes(),
              <Route
                key={100}
                path="/animatedStar"
                render={props => (
                  <AnimatedSketchCanvas
                    width={width}
                    height={height}
                    drawFunc={drawAnimatedStar}
                    defaultValue={4}
                  />
                )}
              />
            ]}
            <Redirect from="/" to="/animatedStar" />
          </Switch>
        </div>
      </div>
    );
  }
}

render(
  <MemoryRouter>
    <App />
  </MemoryRouter>,
  document.getElementById("root")
);
