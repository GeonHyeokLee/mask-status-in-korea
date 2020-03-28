import React from "react";
import styled from "styled-components";
import { color } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { TNoticeButtonComponentProps } from "../types";

const Container = styled.div`
  width: 64px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 20px;
  animation: identifier 8s infinite;
  @keyframes identifier {
    0% {
      background-color: rgba(0, 0, 0, 0.7);
    }
    35% {
      background-color: rgba(0, 0, 0, 0.7);
    }
    50% {
      background-color: rgba(0, 184, 148, 1);
    }
    65% {
      background-color: rgba(0, 0, 0, 0.7);
    }
    100% {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
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

const NoticeButton: React.FC<TNoticeButtonComponentProps> = ({
  onToggleNotice
}) => {
  return (
    <Container onClick={() => onToggleNotice(true)}>
      <FontAwesomeIcon icon={faExclamation} />
    </Container>
  );
};

export default React.memo(NoticeButton);
