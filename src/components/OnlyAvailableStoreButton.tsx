import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { color } from "../styles/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  padding: 20px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
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
  svg.on {
    color: ${color.green};
  }
`;

const OnlyAvailableStoreButton: React.FC<{
  onlyAvailableStore: boolean;
  setOnlyAvailableStore: React.Dispatch<React.SetStateAction<boolean>>;
  setBubbleMessageStatus: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ onlyAvailableStore, setOnlyAvailableStore, setBubbleMessageStatus }) => {
  const onClickProcess = (
    onlyAvailableStore: boolean,
    setOnlyAvailableStore: React.Dispatch<React.SetStateAction<boolean>>,
    setBubbleMessageStatus: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return () => {
      setBubbleMessageStatus(false);
      setOnlyAvailableStore(!onlyAvailableStore);
    };
  };
  const onClick = onClickProcess(
    onlyAvailableStore,
    setOnlyAvailableStore,
    setBubbleMessageStatus
  );

  return (
    <Container onClick={onClick}>
      {!onlyAvailableStore && <FontAwesomeIcon icon={faToggleOff}></FontAwesomeIcon>}
      {onlyAvailableStore && (
        <FontAwesomeIcon icon={faToggleOn} className="on"></FontAwesomeIcon>
      )}
    </Container>
  );
};

export default OnlyAvailableStoreButton;
