import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { color } from "../../styles/colors";

const Container = styled.div<{ noneBackground: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.noneBackground ? "none" : "rgba(0, 0, 0, 0.5)"};
  z-index: 100;
  svg {
    font-size: 52px;
    color: ${color.white};
    @media (max-width: 1023px) {
      font-size: 32px;
    }
  }
`;

const Loading: React.FC<{ noneBackground?: boolean }> = ({
  noneBackground = false
}) => {
  return (
    <Container noneBackground={noneBackground}>
      <FontAwesomeIcon icon={faSpinner} pulse />
    </Container>
  );
};

export default React.memo(Loading);
