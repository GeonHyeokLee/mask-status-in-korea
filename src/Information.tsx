import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFirstAid } from "@fortawesome/free-solid-svg-icons";
import { color } from "./initialStyles";

const Container = styled.div`
  position: fixed;
  display: flex;
  bottom: 0px;
  left: 0px;
  border-radius: 3px;
  width: 300px;
  height: 230px;
  margin: 20px;
  padding: 20px;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
  color: #eaeaea;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1023px) {
    padding: 10px;
    margin: 10px;
    width: 185px;
    height: 155px;
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      p {
        font-weight: bold;
        font-size: 14px;
        @media (max-width: 1023px) {
          font-size: 11px;
        }
      }
      svg {
        font-size: 18px;
        @media (max-width: 1023px) {
          font-size: 13px;
        }
      }
    }
  }
  h3 {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: bold;
    :last-child {
      margin-bottom: 0;
      font-weight: normal;
    }
    @media (max-width: 1023px) {
      font-size: 9px;
      margin-bottom: 5px;
    }
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
      <div>
        <h3>주변 1.5km 반경의 약국을 볼 수 있어요</h3>
        <h3>Made by GeonHyeok Lee</h3>
      </div>
    </Container>
  );
};

export default React.memo(Information);
