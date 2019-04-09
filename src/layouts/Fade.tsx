import * as React from "react";
import SketchCanvas from "./SketchCanvas";
import styled from "styled-components";

export default class Fade extends React.Component<
  {
    width: number;
    height: number;
    drawFunc: (width: number, height: number, canvasContext: any) => void;
  },
  {}
> {
  render() {
    const { width, height, drawFunc } = this.props;
    if (height > 50 && width > 50) {
      return (
        <FlexRow>
          <SketchCanvas width={width / 2} height={height} drawFunc={drawFunc} />
          <FlexColumn>
            <Fade width={width / 2} height={height / 2} drawFunc={drawFunc} />
            <Fade width={width / 2} height={height / 2} drawFunc={drawFunc} />
          </FlexColumn>
        </FlexRow>
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
