import React, { useState, useEffect, useCallback } from "react";
import Map from "./components/Map";
import { InitialStyle } from "./styles/initialStyles";
import styled from "styled-components";
import Loading from "./components/common/Loading";
import { manageBoundary } from "./utils/manageBoundary";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

function App() {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const [storeList, setStoreList] = useState<any>();
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);
  const [currentZoom, setCurrentZoom] = useState<number>(16);

  const updateStoreData = useCallback(
    (lat: number, lng: number, currentZoom: number) => {
      setRefreshLoading(true);
      const result = fetch(
        `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${manageBoundary(
          currentZoom
        )}`
      );
      result
        .then(res => res.json())
        .then(data => setStoreList(data.stores))
        .finally(() => {
          setTimeout(() => {
            setRefreshLoading(false);
          }, 1000);
          setTimeout(() => {
            setMapLoading(false);
          }, 1500);
        });
    },
    []
  );

  const successGetCurrentPosition = useCallback(
    (data: any) => {
      setCurrentLocation(prev => ({
        ...prev,
        lat: data?.coords?.latitude,
        lng: data?.coords?.longitude
      }));
      setMyLocation(prev => ({
        ...prev,
        lat: data?.coords?.latitude,
        lng: data?.coords?.longitude
      }));
      updateStoreData(data.coords.latitude, data.coords.longitude, currentZoom);
    },
    [updateStoreData, currentZoom]
  );

  const failureGetCurrentPosition = useCallback(() => {
    const INITIAL_COORDS = {
      lat: 37.576333,
      lng: 126.976806
    };
    setCurrentLocation(prev => ({
      ...prev,
      lat: INITIAL_COORDS.lat,
      lng: INITIAL_COORDS.lng
    }));
    updateStoreData(INITIAL_COORDS.lat, INITIAL_COORDS.lng, currentZoom);
  }, [currentZoom, updateStoreData]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      successGetCurrentPosition,
      failureGetCurrentPosition,
      { enableHighAccuracy: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <InitialStyle />
      {mapLoading && <Loading />}
      <Map
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        myLocation={myLocation}
        updateStoreData={updateStoreData}
        storeList={storeList}
        refreshLoading={refreshLoading}
        setRefreshLoading={setRefreshLoading}
        currentZoom={currentZoom}
        setCurrentZoom={setCurrentZoom}
      />
    </Container>
  );
}

export default React.memo(App);
