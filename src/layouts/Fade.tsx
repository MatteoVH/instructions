import * as React from "react";
import SketchCanvas from "./SketchCanvas";
import styled from "styled-components";

export default class Fade extends React.Component<
  {
    width: number;
    height: number;
    drawFunc: (width: number, height: number, canvasContext: any) => void;
    controlValues?: any[];
  },
  {}
> {
  render() {
    const { width, height, drawFunc, controlValues } = this.props;
    if (height > 50 && width > 50) {
      return (
        <FlexRow>
          <SketchCanvas
            width={width / 2}
            height={height}
            drawFunc={drawFunc}
            controlValues={controlValues}
          />
          <FlexColumn>
            <Fade
              width={width / 2}
              height={height / 2}
              drawFunc={drawFunc}
              controlValues={controlValues}
            />
            <Fade
              width={width / 2}
              height={height / 2}
              drawFunc={drawFunc}
              controlValues={controlValues}
            />
          </FlexColumn>
        </FlexRow>
      );
    } else {
      return (
        <SketchCanvas
          width={width}
          height={height}
          drawFunc={drawFunc}
          controlValues={controlValues}
        />
      );
    }
  }
}

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
`;
