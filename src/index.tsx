import { render } from "react-dom";
import * as React from "react";
import { Link, Switch, Route, MemoryRouter, Redirect } from "react-router-dom";
import SketchCanvas from "./SketchCanvas";
import sketches from "./sketches/index";

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
          <nav>{this.renderLinks()}</nav>
        </div>
        <div>
          <Switch>
            {this.renderRoutes()}
            <Redirect from="/" to="/star" />
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
