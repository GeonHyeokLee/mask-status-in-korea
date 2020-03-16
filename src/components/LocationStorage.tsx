import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { color } from "../styles/colors";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { getLocationData, postLocationData } from "../utils/locationStorage";

type TLocationStorageProps = {
  onMoveLocation: (lat: number, lng: number) => void;
  currentLocation:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  > div {
    display: flex;
    flex-direction: row;
    :nth-of-type(2) {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
    }
    > div {
      width: 36px;
      height: 36px;
      background-color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      margin-bottom: 7px;
      :nth-of-type(2n) {
        background-color: rgba(0, 0, 0, 0.4);
      }
      @media (max-width: 1023px) {
        width: 26px;
        height: 26px;
        padding: 8px;
        margin-bottom: 4px;
      }
      svg {
        font-size: 15px;
        color: ${color.white};
        @media (max-width: 1023px) {
          font-size: 10px;
        }
      }
    }
    > div:nth-of-type(1) {
      margin-right: 7px;
      @media (max-width: 1023px) {
        margin-right: 4px;
      }
    }
  }
`;

const Guide = styled.div`
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 95px;
  width: 200px;
  height: 70px;
  border-radius: 0px 50px 50px 50px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 15px 10px;
  @media (max-width: 1023px) {
    top: 10px;
    left: 60px;
    width: 120px;
    height: 60px;
    padding: 12px 7px;
  }
  span {
    font-size: 14px;
    line-height: 1.4;
    color: ${color.white};
    @media (max-width: 1023px) {
      font-size: 10px;
    }
  }
`;

const LocationStorage: React.FC<TLocationStorageProps> = ({
  onMoveLocation,
  currentLocation
}) => {
  const [locationData, setLocationData] = useState<
    {
      lat: number;
      lng: number;
    }[]
  >([]);
  const [guide, setGuide] = useState<boolean>(true);

  const saveNewLocationData = useCallback(
    (lat: number, lng: number) => {
      if (locationData.length <= 2) {
        const newData = [...locationData, { lat, lng }];
        postLocationData(newData);
        setLocationData(newData);
      }
    },
    [locationData]
  );

  const popLocationData = useCallback(() => {
    if (locationData) {
      const newData = locationData.filter((data, index) => {
        return index !== locationData.length - 1;
      });
      if (newData) {
        postLocationData(newData);
        setLocationData(newData);
      }
    }
  }, [locationData]);

  useEffect(() => {
    const loadData = getLocationData();
    if (loadData) {
      setLocationData(loadData);
    }
  }, []);

  return (
    <Container>
      <div>
        <div
          onClick={
            currentLocation &&
            (() =>
              saveNewLocationData(currentLocation?.lat, currentLocation.lng))
          }
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div onClick={popLocationData}>
          <FontAwesomeIcon icon={faMinus} />
        </div>
      </div>
      <div>
        {locationData &&
          locationData.map((location, index: number) => (
            <div
              key={index}
              onClick={() => onMoveLocation(location.lat, location.lng)}
            >
              <FontAwesomeIcon icon={faFlag} />
            </div>
          ))}
      </div>
      {guide && (
        <Guide onClick={() => setGuide(false)}>
          <span>최대 3개까지 위치를 저장할 수 있게 되었어요!</span>
        </Guide>
      )}
    </Container>
  );
};

export default React.memo(LocationStorage);
