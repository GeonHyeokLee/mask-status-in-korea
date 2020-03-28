import React from "react";
import styled from "styled-components";
import { color } from "../styles/colors";
import { TNoticeComponentProps } from "../types";

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  ul {
    border-radius: 3px;
    width: 520px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.99);
    padding: 20px;
    @media (max-width: 1023px) {
      width: 280px;
      padding: 15px;
    }
    h1 {
      font-size: 24px;
      font-weight: bolder;
      margin-bottom: 50px;
      @media (max-width: 1023px) {
        font-size: 18px;
        margin-bottom: 30px;
      }
    }
    li {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      :nth-of-type(3) {
        margin-bottom: 7px;
      }
      :last-child {
        margin-bottom: 0;
      }
      > span {
        font-size: 14px;
        line-height: 1.4;
        @media (max-width: 1023px) {
          font-size: 13px;
        }
        > b {
          font-weight: bolder;
          color: ${color.green};
        }
        :last-of-type {
          b {
            color: ${color.red};
          }
        }
      }
      h3 {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 8px;
        @media (max-width: 1023px) {
          font-size: 14px;
        }
      }
      div {
        margin-bottom: 10px;
        h4 {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 2px;
          @media (max-width: 1023px) {
            font-size: 13px;
          }
        }
        span {
          font-size: 14px;
          line-height: 1.3;
          @media (max-width: 1023px) {
            font-size: 13px;
          }
        }
      }
      button {
        background-color: rgba(0, 0, 0, 0.75);
        color: ${color.white};
        font-size: 18px;
        font-weight: bold;
        padding: 10px;
        border-radius: 3px;
        cursor: pointer;
        @media (max-width: 1023px) {
          font-size: 16px;
        }
      }
    }
  }
`;

const Notice: React.FC<TNoticeComponentProps> = ({ onToggleNotice }) => {
  return (
    <Container>
      <ul>
        <h1>공지사항</h1>
        <li>
          <h3>공적 마스크 현황 (feat.코로나 싫어요)</h3>
          <span role="img" aria-label="notice">
            <b>건강보험심사평가원</b>이 제공하는 재고 현황을 토대로 갱신되요.
            현장에서의 재고 상황과 다를수 있어요.
          </span>
        </li>
        <li>
          <h3>업데이트 내역</h3>
          <div>
            <h4>버전 0.1.0</h4>
            <span>전국의 약국 마스크 재고 현황 추가</span>
          </div>
          <div>
            <h4>버전 0.2.0</h4>
            <span>모바일 지원 및 주소 검색, 내 위치로 이동, 새로고침 추가</span>
          </div>
          <div>
            <h4>버전 0.3.0</h4>
            <span>성능 최적화, 아이콘 수정, 공지사항 추가</span>
          </div>
          <div>
            <h4>버전 0.4.0</h4>
            <span>필터링 추가</span>
          </div>
        </li>
        <li>
          <span>
            Made by <b>GeonHyeok Lee</b>
          </span>
          <span>연락처: geonhyeoklee.kr@gmail.com</span>
        </li>
        <li>
          <button onClick={() => onToggleNotice(false)}>닫기</button>
        </li>
      </ul>
    </Container>
  );
};

export default React.memo(Notice);
