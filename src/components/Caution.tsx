import React from "react";
import styled from "styled-components";
import { color } from "../styles/colors";

const Container = styled.div`
  position: fixed;
  width: 300px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${color.white};
  z-index: 99;
  font-size: 28px;
  font-weight: bold;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.6);
  @media (max-width: 1023px) {
    width: 180px;
    height: 50px;
    margin-left: -90px;
    margin-top: -25px;
    font-size: 17px;
  }
`;

const Caution: React.FC = () => {
  return (
    <Container>
      <span role="img" aria-label="caution">
        확대하면 보여요😅
      </span>
    </Container>
  );
};

export default React.memo(Caution);
