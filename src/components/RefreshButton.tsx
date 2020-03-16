import React from "react";
import styled from "styled-components";
import { color } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 64px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 20px;
  @media (max-width: 1023px) {
    width: 36px;
    font-size: 11px;
    padding: 10px;
  }
  svg {
    font-size: 24px;
    color: ${color.white};
    @media (max-width: 1023px) {
      font-size: 16px;
    }
  }
`;

const RefreshButton: React.FC<any> = ({ onRefreshStoreData, spin }) => {
  return (
    <Container onClick={onRefreshStoreData}>
      <FontAwesomeIcon icon={faSync} spin={spin} />
    </Container>
  );
};

export default RefreshButton;
