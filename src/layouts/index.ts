import Quatral from "./Quatral";
import SketchCanvas from "./SketchCanvas";

export type Layout = React.ComponentType<{
  height: number;
  width: number;
  drawFunc: (width: number, height: number, svgContainer: any) => void;
}>;

export default [
  { name: "Quatral", component: Quatral },
  { name: "Full page", component: SketchCanvas }
];
