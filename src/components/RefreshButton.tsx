import React from "react";
import styled from "styled-components";
import { color } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  padding: 20px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  @media (max-width: 1023px) {
    width: 36px;
    height: 36px;
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
