/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import styled from "styled-components";
import { color } from "./initialStyles";

const Container = styled.div`
  position: fixed;
  width: 350px;
  bottom: 20px;
  left: 50%;
  margin-left: -150px;
  color: ${color.white};
  z-index: 99;
  font-size: 28px;
  padding: 25px 20px;
  font-weight: bold;
  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
`;

const Notice: React.FC = () => {
  return <Container>확대하면 보여요😅</Container>;
};

export default React.memo(Notice);
