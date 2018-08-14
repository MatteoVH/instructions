import * as ReactDOM from "react-dom";
import * as React from "react";
import { Link, Switch, Route, MemoryRouter } from "react-router-dom";
import RandomLines from "./randomLines";
import ConnectedLines from "./connectedLines";
import DriftLines from "./driftLines";
import FollowLines from "./followLines";
import SpeckleLines from "./speckleLines";
import LongLines from "./denseLines";
import HydraLines from "./hydraLines";
import Rays from "./rays";
import Surge from "./surge";

const width = window.innerWidth * 0.95;
const height = width * 0.625;

ReactDOM.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>,
  document.getElementById("root")
);

function App() {
  return (
    <div>
      <div>
        <nav>
          <Link to="/" className="instruction-description">
            random lines
          </Link>
          <Link to="/connected-lines" className="instruction-description">
            connected lines
          </Link>
          <Link to="/drift-lines" className="instruction-description">
            drift lines
          </Link>
          <Link to="/follow-lines" className="instruction-description">
            follow lines
          </Link>
          <Link to="/speckle-lines" className="instruction-description">
            speckle lines
          </Link>
          <Link to="/dense-lines" className="instruction-description">
            dense lines
          </Link>
          <Link to="/hydra-lines" className="instruction-description">
            hydra lines
          </Link>
          <Link to="/rays" className="instruction-description">
            rays
          </Link>
          <Link to="/surge" className="instruction-description">
            surge
          </Link>
        </nav>
      </div>
      <div>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <RandomLines width={width} height={height} />}
          />
          <Route
            path="/connected-lines"
            render={props => <ConnectedLines width={width} height={height} />}
          />
          <Route
            path="/drift-lines"
            render={props => <DriftLines width={width} height={height} />}
          />
          <Route
            path="/follow-lines"
            render={props => <FollowLines width={width} height={height} />}
          />
          <Route
            path="/speckle-lines"
            render={props => <SpeckleLines width={width} height={height} />}
          />
          <Route
            path="/dense-lines"
            render={props => <LongLines width={width} height={height} />}
          />
          <Route
            path="/hydra-lines"
            render={props => <HydraLines width={width} height={height} />}
          />
          <Route
            path="/rays"
            render={props => <Rays width={width} height={height} />}
          />
          <Route
            path="/surge"
            render={props => <Surge width={width} height={height} />}
          />
        </Switch>
      </div>
    </div>
  );
}
