import React, { useState, useEffect, useCallback } from "react";
import Map from "./Map";
import { InitialStyle } from "./initialStyles";
import styled from "styled-components";
import Loading from "./Loading";

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

  const updateStoreData = useCallback((lat: number, lng: number) => {
    setRefreshLoading(true);
    const result = fetch(
      `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${2000}`
    );
    result
      .then(res => res.json())
      .then(data => setStoreList(data.stores))
      .finally(() => {
        setTimeout(() => {
          setMapLoading(false);
          setRefreshLoading(false);
        }, 1500);
      });
  }, []);

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
      updateStoreData(data.coords.latitude, data.coords.longitude);
    },
    [updateStoreData]
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
    updateStoreData(INITIAL_COORDS.lat, INITIAL_COORDS.lng);
  }, [updateStoreData]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      successGetCurrentPosition,
      failureGetCurrentPosition
    );
  }, [failureGetCurrentPosition, successGetCurrentPosition]);

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
      />
    </Container>
  );
}

export default App;
