import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 10px;
  right: 60px;
  width: 95px;
  height: 40px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.99);
  color: black;
  z-index: 99;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;

const MyLocationButton: React.FC<any> = ({ onMoveMyLocation }) => {
  return <Container onClick={onMoveMyLocation}>내 위치로 가기</Container>;
};

export default MyLocationButton;
