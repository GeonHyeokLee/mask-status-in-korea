import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faFirstAid,
  // faPlusSquare,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  convertRemainStatusText,
  convertRemainStatusColor,
  convertRemainStatusBoolean
} from "../utils/convertRemainStatus";

type TStoreProps = {
  key: any;
  lat: any;
  lng: any;
  currentZoom: number;
  storeData: any;
  onCurrentHover: boolean;
  onCurrentClick: boolean;
  onMouseOverStore: (code: number) => void;
  onClickStore: (lat: number, lng: number, code: number) => void;
  initialEvent: (hover?: boolean, click?: boolean) => void;
};

const Container = styled.div<{ currentZoom: number; statusColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div.svgWrap {
    background-color: #f5f5f5;
    padding: 1.5px;
    border-radius: 100%;
    svg {
      font-size: ${props => (props.currentZoom >= 16 ? "30px" : "22.5px")};
      cursor: pointer;
      color: ${props => props.statusColor};
    }
  }
  h3.store-name {
    text-align: center;
    width: 100px;
    font-size: ${props => (props.currentZoom >= 17 ? "12px" : "10.5px")};
    font-weight: ${props => props.currentZoom >= 17 && "bold"};
  }
`;

const StoreDetail = styled.div<{ statusColor: string }>`
  position: absolute;
  top: -210px;
  left: -30px;
  width: 200px;
  height: 200px;
  border-radius: 4px;
  background-color: rgba(25, 25, 25, 0.9);
  display: flex;
  flex-direction: column;
  color: white;
  padding: 10px;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 1023px) {
    width: 200px;
    height: 180px;
    top: -190px;
    left: -80px;
    font-size: 11px;
  }
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
    @media (max-width: 1023px) {
      font-size: 14px;
    }
  }
  p {
    font-size: 12px;
    margin-bottom: 20px;
    @media (max-width: 1023px) {
      margin-bottom: 10px;
    }
  }
  span {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 1px;
    :last-of-type {
      margin-bottom: 0;
    }
    > span {
      background-color: ${props => props.statusColor};
    }
  }
`;

const Store: React.FC<TStoreProps> = ({
  storeData,
  onCurrentHover,
  onCurrentClick,
  onMouseOverStore,
  initialEvent,
  currentZoom,
  onClickStore
}) => {
  return (
    <Container
      currentZoom={currentZoom}
      statusColor={convertRemainStatusColor(storeData.remain_stat)}
    >
      <div
        className="svgWrap"
        onClick={() =>
          onClickStore(storeData.lat, storeData.lng, storeData.code)
        }
        onMouseOver={() => onMouseOverStore(storeData.code)}
        onMouseLeave={() => initialEvent(true, false)}
        onTouchEnd={() =>
          onClickStore(storeData.lat, storeData.lng, storeData.code)
        }
      >
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>

      <h3 className="store-name">
        {currentZoom > 15
          ? storeData.name
          : currentZoom === 15 &&
            convertRemainStatusBoolean(storeData.remain_stat) &&
            storeData.name}
      </h3>
      {(onCurrentHover || onCurrentClick) && (
        <StoreDetail
          statusColor={convertRemainStatusColor(storeData.remain_stat)}
        >
          <h3>{storeData.name}</h3>
          <p>{storeData.addr}</p>
          <span>
            {"재고 현황: "}
            <span>{convertRemainStatusText(storeData.remain_stat)}</span>
          </span>
          {storeData.stock_at && (
            <span>{`최근 입고 시간: ${storeData.stock_at.substring(
              2,
              16
            )}`}</span>
          )}
        </StoreDetail>
      )}
    </Container>
  );
};

export default React.memo(Store);
