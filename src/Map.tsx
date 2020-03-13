import React, { useState, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import Store from "./Store";
import styled from "styled-components";
import Information from "./Information";
import Notice from "./Notice";
import MyLocationButton from "./MyLocationButton";
import { GOOGLE_MAP_API } from "./dotenv";
import AddressBar from "./AddressBar";

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

const Map: React.FC<any> = ({
  currentLocation,
  setCurrentLocation,
  myLocation,
  storeList,
  updateStoreData,
  getStoreListLoading
}) => {
  const [currentHoverStore, setCurrentHoverStore] = useState<number>();
  const [currentClickStore, setCurrentClickStore] = useState<number>();
  const [currentZoom, setCurrentZoom] = useState<number>(16);

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
        initialEvent();
      } else {
        initialEvent(true, false);
      }
      setCurrentHoverStore(code);
    },
    [currentClickStore, initialEvent]
  );

  const onMouseLeaveStore = useCallback(() => {
    setCurrentHoverStore(-999999);
  }, []);

  const onChangeMap = useCallback(
    ({ center }: any) => {
      setCurrentLocation((prev: any) => ({
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
      setCurrentLocation((prev: any) => ({
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
      onMouseLeaveStore();
    },
    [currentClickStore, onMouseLeaveStore, setCurrentLocation]
  );

  const onMoveMyLocation = useCallback(() => {
    setCurrentLocation((prev: any) => ({
      ...prev,
      lat: myLocation?.lat,
      lng: myLocation?.lng
    }));
    setCurrentZoom(17);
    onMouseLeaveStore();
  }, [myLocation, onMouseLeaveStore, setCurrentLocation]);

  return (
    <>
      <AddressBar />
      <Information />
      <MyLocationButton onMoveMyLocation={onMoveMyLocation} />
      {currentZoom < 13 && <Notice />}
      <Container>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API }}
          center={currentLocation}
          zoom={currentZoom}
          onChange={onChangeMap}
          onZoomAnimationEnd={onZoomAnimationEnd}
          onDragEnd={() => initialEvent()}
          onClick={() => initialEvent()}
        >
          {!getStoreListLoading &&
            storeList &&
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
                onMouseLeaveStore={onMouseLeaveStore}
                onClickStore={onClickStore}
              />
            ))}
        </GoogleMapReact>
      </Container>
    </>
  );
};

export default React.memo(Map);
