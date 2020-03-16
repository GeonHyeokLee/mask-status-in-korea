import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { color } from "../styles/colors";

const Container = styled.div`
  display: flex;
  border-radius: 3px;
  width: 330px;
  height: 260px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.55);
  color: #eaeaea;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  @media (max-width: 1023px) {
    padding: 10px;
    width: 250px;
    height: 175px;
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      p {
        font-weight: bold;
        font-size: 15px;
        @media (max-width: 1023px) {
          font-size: 13px;
        }
      }

      svg {
        font-size: 21px;
        @media (max-width: 1023px) {
          font-size: 17px;
        }
      }
    }
  }
  div {
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 15px;
      color: ${color.white};
      margin-bottom: 7px;
      font-weight: bolder;
      :last-child {
        margin-bottom: 0;
      }
      > b {
        color: ${color.green};
      }
      @media (max-width: 1023px) {
        font-size: 12.5px;
      }
    }
  }
`;

const Information: React.FC = () => {
  return (
    <Container>
      <ul>
        <li>
          <p>100개 이상 </p>
          <FontAwesomeIcon icon={faPlusCircle} color={color.green} />
        </li>
        <li>
          <p>30개 이상 100개 미만</p>
          <FontAwesomeIcon icon={faPlusCircle} color={color.yellow} />
        </li>
        <li>
          <p>2개 이상 30개 미만</p>
          <FontAwesomeIcon icon={faPlusCircle} color={color.red} />
        </li>
        <li>
          <p>1개 이하 또는 재고 소진</p>
          <FontAwesomeIcon icon={faPlusCircle} color={color.black} />
        </li>
      </ul>
      <div>
        <h3>
          <b>최대 2km이내</b>의 약국을 볼 수 있어요
        </h3>
        <h3>
          <span role="img" aria-label="notice">
            데스크탑, 모바일 모두 지원해요 😁
          </span>
        </h3>
      </div>
    </Container>
  );
};

export default React.memo(Information);
