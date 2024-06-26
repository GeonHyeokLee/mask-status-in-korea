import React from "react";
import styled from "styled-components";
import { color } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { TMyLocationButtonComponentProps } from "../types";

const MyLocationButton: React.FC<TMyLocationButtonComponentProps> = ({
  myLocation,
  onMoveLocation,
}) => {
  return (
    <Container
      onClick={
        myLocation &&
        onMoveLocation &&
        (() => onMoveLocation(myLocation.lat, myLocation.lng))
      }
    >
      <FontAwesomeIcon icon={faCrosshairs} />
    </Container>
  );
};

export default MyLocationButton;

const Container = styled.div`
  width: 64px;
  display: flex;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 20px;
  @media (max-width: 1023px) {
    width: 36px;
    height: 36px;
    font-size: 11px;
    padding: 10px;
  }
  svg {
    font-size: 24px;
    color: ${color.white};
    transition: all 0.2s;
    @media (max-width: 1023px) {
      font-size: 16px;
    }
  }
`;
