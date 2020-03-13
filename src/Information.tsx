import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFirstAid } from "@fortawesome/free-solid-svg-icons";
import { color } from "./initialStyles";

const Container = styled.div`
  position: fixed;
  display: flex;
  bottom: 20px;
  left: 20px;
  border-radius: 7px;
  width: 250px;
  height: 185px;
  padding: 20px;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
  color: #eaeaea;
  flex-direction: column;
  justify-content: space-between;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      p {
        font-weight: bold;
        margin-right: 10px;
        font-size: 14px;
      }
      svg {
        font-size: 18px;
      }
    }
  }
  h3 {
    font-size: 14px;
    font-weight: bold;
  }
`;

const Information: React.FC = () => {
  return (
    <Container>
      <ul>
        <li>
          <p>100개 이상 </p>
          <FontAwesomeIcon icon={faFirstAid} color={color.green} />
        </li>
        <li>
          <p>30개 이상 100개 미만</p>
          <FontAwesomeIcon icon={faFirstAid} color={color.yellow} />
        </li>
        <li>
          <p>2개 이상 30개 미만</p>
          <FontAwesomeIcon icon={faFirstAid} color={color.red} />
        </li>
        <li>
          <p>1개 이하 또는 재고 소진</p>
          <FontAwesomeIcon icon={faFirstAid} color={color.black} />
        </li>
      </ul>
      <h3>Made by GeonHyeok Lee</h3>
    </Container>
  );
};

export default React.memo(Information);
