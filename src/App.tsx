import React, { useState, useEffect, useCallback } from "react";
import Map from "./components/Map";
import { InitialStyle } from "./styles/initialStyles";
import styled from "styled-components";
import Loading from "./components/common/Loading";
import { manageBoundary } from "./utils/manageBoundary";
import {
  TStoreListData,
  TSetStoreList,
  TSetMapLoading,
  TSetRefreshLoading,
  TSuccessGetCurrentPositionCallbackData,
  TSetCurrentLocation,
  TSetMyLocation,
  TUpdateStoreData,
  TCurrentLocation,
  TMyLocation,
  TMapLoading,
  TRefreshLoading,
  TCurrentZoom
} from "./types";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

function App() {
  const [currentLocation, setCurrentLocation] = useState<TCurrentLocation>();
  const [myLocation, setMyLocation] = useState<TMyLocation>();
  const [storeList, setStoreList] = useState<TStoreListData>();
  const [mapLoading, setMapLoading] = useState<TMapLoading>(true);
  const [refreshLoading, setRefreshLoading] = useState<TRefreshLoading>(false);
  const [currentZoom, setCurrentZoom] = useState<TCurrentZoom>(16);

  const updateStoreDataProcess = useCallback(
    async (
      setStoreList: TSetStoreList,
      setMapLoading: TSetMapLoading,
      setRefreshLoading: TSetRefreshLoading,
      requireBoundary: number
    ) => {
      return async (requireLat: number, requireLng: number) => {
        setRefreshLoading(true);
        const url = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${requireLat}&lng=${requireLng}&m=${requireBoundary}`;
        const result = await fetch(url);
        const resultToJson = await result.json();
        setStoreList(resultToJson.stores);

        setTimeout(() => {
          setRefreshLoading(false);
        }, 1000);

        if (mapLoading) {
          setTimeout(() => {
            setMapLoading(false);
          }, 1500);
        }
      };
    },
    [mapLoading]
  );

  const currentBoundary: number = manageBoundary(currentZoom);

  const updateStoreData: TUpdateStoreData = updateStoreDataProcess(
    setStoreList,
    setMapLoading,
    setRefreshLoading,
    currentBoundary
  );

  const successGetCurrentPositionProcess = useCallback(
    (
      data: TSuccessGetCurrentPositionCallbackData,
      setCurrentLocation: TSetCurrentLocation,
      setMyLocation: TSetMyLocation,
      updateStoreData: TUpdateStoreData
    ) => {
      return async () => {
        setCurrentLocation(prev => ({
          ...prev,
          lat: data.coords.latitude,
          lng: data.coords.longitude
        }));
        setMyLocation(prev => ({
          ...prev,
          lat: data.coords.latitude,
          lng: data.coords.longitude
        }));
        (await updateStoreData)(data.coords.latitude, data.coords.longitude);
      };
    },
    []
  );

  const failureGetCurrentPositionProcess = useCallback(
    async (
      setCurrentLocation: TSetCurrentLocation,
      setMyLocation: TSetMyLocation,
      updateStoreData: TUpdateStoreData
    ) => {
      return async () => {
        const INITIAL_COORDS = {
          lat: 37.576333,
          lng: 126.976806
        };
        setCurrentLocation(prev => ({
          ...prev,
          lat: INITIAL_COORDS.lat,
          lng: INITIAL_COORDS.lng
        }));
        setMyLocation(prev => ({
          ...prev,
          lat: INITIAL_COORDS.lat,
          lng: INITIAL_COORDS.lng
        }));
        (await updateStoreData)(INITIAL_COORDS.lat, INITIAL_COORDS.lng);
      };
    },
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      data => {
        const successGetCurrentPosition = successGetCurrentPositionProcess(
          data,
          setCurrentLocation,
          setMyLocation,
          updateStoreData
        );
        successGetCurrentPosition();
      },
      async () => {
        const failureGetCurrentPosition = await failureGetCurrentPositionProcess(
          setCurrentLocation,
          setMyLocation,
          updateStoreData
        );
        failureGetCurrentPosition();
      },
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
