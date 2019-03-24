import Quatral from "./Quatral";
import SketchCanvas from "./SketchCanvas";
import Fade from "./Fade";

export type Layout = React.ComponentType<{
  height: number;
  width: number;
  drawFunc: (width: number, height: number, svgContainer: any) => void;
}>;

export default [
  { name: "Quatral", component: Quatral },
  { name: "Full page", component: SketchCanvas },
  { name: "Fade", component: Fade }
];
