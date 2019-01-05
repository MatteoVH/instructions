import { render } from "react-dom";
import * as React from "react";
import { Link, Switch, Route, MemoryRouter, Redirect } from "react-router-dom";
import SketchCanvas from "./SketchCanvas";
import sketches from "./sketches/index";
import AnimatedSketchCanvas from "./AnimatedSketchCanvas";
import drawAnimatedStar from "./sketches/animatedStar";
import drawAudio from "./sketches/audio";

const width = window.innerWidth * 0.95;
const height = window.innerHeight * 0.95;

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
              </Link>,
              <Link key={102} to="/audio" className="instruction-description">
                audio
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
                path="/audio"
                render={props => (
                  <AnimatedSketchCanvas
                    width={width}
                    height={height}
                    drawFunc={drawAudio}
                  />
                )}
              />
            ]}
            <Redirect from="/" to="/audio" />
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
