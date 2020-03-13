import React, { useState, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import Store from "./Store";
import styled from "styled-components";
import Information from "./Information";
import Notice from "./Notice";
import MyLocationButton from "./MyLocationButton";
import { GOOGLE_MAP_API } from "./dotenv";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
  const [currentZoom, setCurrentZoom] = useState<number>(15);

  const onMouseOverStore = useCallback((code: number) => {
    setCurrentHoverStore(code);
  }, []);

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
    (lat: number, lng: number) => {
      setCurrentLocation((prev: any) => ({
        ...prev,
        lat,
        lng
      }));
      setCurrentZoom(18);
      onMouseLeaveStore();
    },
    [onMouseLeaveStore, setCurrentLocation]
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
      <Container>
        <Information />
        <MyLocationButton onMoveMyLocation={onMoveMyLocation} />
        {currentZoom < 13 && <Notice />}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: GOOGLE_MAP_API
          }}
          center={currentLocation}
          zoom={currentZoom}
          onChange={onChangeMap}
          onZoomAnimationEnd={onZoomAnimationEnd}
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
