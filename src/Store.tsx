import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFirstAid } from "@fortawesome/free-solid-svg-icons";
import { convertRemainStatusText, convertRemainStatusColor } from "./utils";

type TStoreProps = {
  key: any;
  lat: any;
  lng: any;
  currentZoom: number;
  storeData: any;
  onCurrentHover: boolean;
  onCurrentClick: boolean;
  onMouseOverStore: (code: number) => void;
  onMouseLeaveStore: () => void;
  onClickStore: (lat: number, lng: number, code: number) => void;
};

const Container = styled.div<{ currentZoom: number; statusColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div.svgWrap {
    background-color: rgba(255, 255, 255, 0.99);
    padding: 0.7px 2px;
    border-radius: 2px;
    svg {
      font-size: ${props => (props.currentZoom >= 17 ? "30px" : "25px")};
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
  top: -225px;
  left: -30px;
  width: 200px;
  height: 200px;
  border-radius: 4px;
  background-color: rgba(25, 25, 25, 0.9);
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 13px;
  padding: 10px;
  z-index: 1;
  overflow: hidden;
  h3 {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  p {
    margin-bottom: 20px;
  }
  span {
    font-weight: bold;
    > span {
      background-color: ${props => props.statusColor};
    }
  }
  @media (max-width: 1023px) {
    width: 175px;
    height: 115px;
    top: -145px;
    left: -75px;
    font-size: 11px;
    h3 {
      font-size: 14px;
    }
    p {
      margin-bottom: 5px;
    }
  }
`;

const Store: React.FC<TStoreProps> = ({
  storeData,
  onCurrentHover,
  onCurrentClick,
  onMouseOverStore,
  onMouseLeaveStore,
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
        onMouseLeave={() => onMouseLeaveStore()}
        onPointerLeave={() => onMouseLeaveStore()}
      >
        <FontAwesomeIcon icon={faFirstAid} />
      </div>

      <h3 className="store-name">{currentZoom >= 15 && storeData.name}</h3>
      {(onCurrentHover || onCurrentClick) && (
        <StoreDetail
          statusColor={convertRemainStatusColor(storeData.remain_stat)}
        >
          <h3>{storeData.name}</h3>
          <p>{storeData.addr}</p>
          <span>
            {"재고현황: "}
            <span>{convertRemainStatusText(storeData.remain_stat)}</span>
          </span>
          {storeData.stock_at && (
            <span>{`입고시간: ${storeData.stock_at}`}</span>
          )}
        </StoreDetail>
      )}
    </Container>
  );
};

export default React.memo(Store);
