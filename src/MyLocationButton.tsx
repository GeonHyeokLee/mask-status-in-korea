import React from "react";
import styled from "styled-components";

type TMyLocationButtonProps = {
  onMoveMyLocation: () => void;
};

const Container = styled.div`
  position: fixed;
  top: 70px;
  left: 20px;
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
  padding: 20px;
  @media (max-width: 1023px) {
    top: 56px;
    left: 10px;
    font-size: 11px;
    padding: 10px;
  }
`;

const MyLocationButton: React.FC<TMyLocationButtonProps> = ({
  onMoveMyLocation
}) => {
  return <Container onClick={onMoveMyLocation}>내 위치 보기</Container>;
};

export default MyLocationButton;
