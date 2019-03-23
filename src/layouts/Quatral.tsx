import * as React from "react";
import SketchCanvas from "./SketchCanvas";
import styled from "styled-components";

export default class Quatral extends React.Component<
  {
    width: number;
    height: number;
    drawFunc: (width: number, height: number, svgContainer: any) => void;
  },
  {}
> {
  render() {
    const { width, height, drawFunc } = this.props;
    if (height > 50 && width > 50) {
      return (
        <FlexColumn>
          <FlexRow>
            <SketchCanvas
              width={width / 2}
              height={height / 2}
              drawFunc={drawFunc}
            />
            <Quatral
              width={width / 2}
              height={height / 2}
              drawFunc={drawFunc}
            />
          </FlexRow>
          <FlexRow>
            <Quatral
              width={width / 2}
              height={height / 2}
              drawFunc={drawFunc}
            />
            <Quatral
              width={width / 2}
              height={height / 2}
              drawFunc={drawFunc}
            />
          </FlexRow>
        </FlexColumn>
      );
    } else {
      return <SketchCanvas width={width} height={height} drawFunc={drawFunc} />;
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
