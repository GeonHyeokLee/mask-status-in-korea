import React, { useState, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import Store from "./Store";
import styled from "styled-components";
import Information from "./Information";
import Notice from "./Notice";
import MyLocationButton from "./MyLocationButton";
import { GOOGLE_MAP_API } from "./dotenv";
import AddressBar from "./AddressBar";
import { geoCode } from "./utils";
import RefreshButton from "./RefreshButton";

type TMapProps = {
  setRefreshLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshLoading: boolean;
  currentLocation:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<
      | {
          lat: number;
          lng: number;
        }
      | undefined
    >
  >;
  myLocation:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
  updateStoreData: (lat: number, lng: number) => void;
  storeList: any;
};

const UtilWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 20px;
  display: flex;
  flex-direction: column;
  z-index: 99;
  > div.util-button-wrap {
    display: flex;
    flex-direction: raw;
    > div {
      margin-right: 20px;
      :last-of-type {
        margin-right: 0;
      }
      @media (max-width: 1023px) {
        margin-right: 10px;
        :last-of-type {
          margin-right: 0;
        }
      }
    }
  }
  > div {
    margin-bottom: 20px;
    :last-of-type {
      margin-bottom: 0;
    }
    @media (max-width: 1023px) {
      margin-bottom: 10px;
      :last-of-type {
        margin-bottom: 0;
      }
    }
  }
  @media (max-width: 1023px) {
    margin: 10px;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  div.dummyContainer {
    width: 100%;
    height: 100%;
  }
`;

const Map: React.FC<TMapProps> = ({
  currentLocation,
  setCurrentLocation,
  myLocation,
  storeList,
  updateStoreData,
  refreshLoading,
  setRefreshLoading
}) => {
  const [currentHoverStore, setCurrentHoverStore] = useState<number>();
  const [currentClickStore, setCurrentClickStore] = useState<number>();
  const [currentZoom, setCurrentZoom] = useState<number>(16);
  const [address, setAddress] = useState<string>("");

  const initialEvent = useCallback(
    (hover: boolean = true, click: boolean = true) => {
      if (hover) {
        setCurrentHoverStore(-999999);
      }
      if (click) {
        setCurrentClickStore(-999999);
      }
    },
    []
  );

  const onMouseOverStore = useCallback(
    (code: number) => {
      if (code !== currentClickStore) {
        initialEvent(false);
      } else {
        initialEvent(true, false);
      }
      setCurrentHoverStore(code);
    },
    [currentClickStore, initialEvent]
  );

  const onChangeMap = useCallback(
    async ({ center }) => {
      setCurrentLocation(prev => ({
        ...prev,
        lat: center.lat,
        lng: center.lng
      }));
      updateStoreData(center.lat, center.lng);
    },
    [setCurrentLocation, updateStoreData]
  );

  const onZoomAnimationEnd = useCallback((currentZoom: number) => {
    setCurrentZoom(currentZoom);
  }, []);

  const onClickStore = useCallback(
    (lat: number, lng: number, code: number) => {
      initialEvent();
      setCurrentLocation(prev => ({
        ...prev,
        lat,
        lng
      }));
      if (currentClickStore === code) {
        setCurrentClickStore(-999999);
      } else {
        setCurrentClickStore(code);
      }
      setCurrentZoom(17);
    },
    [currentClickStore, initialEvent, setCurrentLocation]
  );

  const onMoveMyLocation = useCallback(() => {
    initialEvent();
    setCurrentLocation((prev: any) => ({
      ...prev,
      lat: myLocation?.lat,
      lng: myLocation?.lng
    }));
    setCurrentZoom(17);
  }, [initialEvent, myLocation, setCurrentLocation]);

  const onSubmitAddress = useCallback(
    async (address: string) => {
      const result = await geoCode(address);
      setCurrentLocation(prev => ({
        ...prev,
        lat: result.lat,
        lng: result.lng
      }));
      setCurrentZoom(16);
      setAddress("");
    },
    [setCurrentLocation]
  );

  const onRefreshStoreData = useCallback(() => {
    if (currentLocation) {
      updateStoreData(currentLocation.lat, currentLocation.lng);
    }
  }, [currentLocation, updateStoreData]);
  return (
    <>
      <Container>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API }}
          center={currentLocation}
          zoom={currentZoom}
          onChange={onChangeMap}
          onZoomAnimationEnd={onZoomAnimationEnd}
          onClick={() => initialEvent()}
          onDrag={() => setRefreshLoading(true)}
          onDragEnd={() => initialEvent()}
        >
          {storeList &&
            currentZoom >= 13 &&
            storeList.map((store: any) => (
              <Store
                key={store.code}
                lat={store.lat}
                lng={store.lng}
                currentZoom={currentZoom}
                storeData={store}
                onCurrentHover={store.code !== currentHoverStore ? false : true}
                onCurrentClick={store.code !== currentClickStore ? false : true}
                onMouseOverStore={onMouseOverStore}
                initialEvent={initialEvent}
                onClickStore={onClickStore}
              />
            ))}
        </GoogleMapReact>
        <Information />
        <UtilWrap>
          <AddressBar
            onSubmitAddress={onSubmitAddress}
            address={address}
            setAddress={setAddress}
          />
          <div className="util-button-wrap">
            <MyLocationButton onMoveMyLocation={onMoveMyLocation} />
            <RefreshButton
              onRefreshStoreData={onRefreshStoreData}
              spin={refreshLoading ? true : false}
            />
          </div>
        </UtilWrap>
        {currentZoom < 13 && <Notice />}
      </Container>
    </>
  );
};

export default React.memo(Map);
