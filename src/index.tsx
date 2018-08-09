import * as ReactDOM from "react-dom";
import * as React from "react";
import { Link, Switch, Route, MemoryRouter } from "react-router-dom";
import RandomLines from "./randomLines";
import ConnectedLines from "./connectedLines";
import DriftLines from "./driftLines";
import FollowLines from "./followLines";
import SpeckleLines from "./speckleLines";

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
          <Link to="/" className="instruction-description">random lines</Link>
          <Link to="/connected-lines" className="instruction-description">connected lines</Link>
          <Link to="/drift-lines" className="instruction-description">drift lines</Link>
          <Link to="/follow-lines" className="instruction-description">follow lines</Link>
          <Link to="/speckle-lines" className="instruction-description">speckle lines</Link>
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
          </Switch>
      </div>
    </div>
  );
}
