import Quatral from "./Quatral";
import SketchCanvas from "./SketchCanvas";
import Fade from "./Fade";

export type Layout = React.ComponentType<{
  height: number;
  width: number;
  drawFunc: (width: number, height: number, canvasContext: any) => void;
  controlValues?: any[];
}>;

export default [
  { name: "Full page", component: SketchCanvas },
  { name: "Quatral", component: Quatral },
  { name: "Fade", component: Fade },
];
