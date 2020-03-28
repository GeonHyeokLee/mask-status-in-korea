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

  const updateStoreDataProcess = useCallback(
    async (
      setStoreList: React.Dispatch<any>,
      setMapLoading: React.Dispatch<boolean>,
      setRefreshLoading: React.Dispatch<boolean>
    ) => {
      return async (lat: number, lng: number, currentZoom: number) => {
        setRefreshLoading(true);

        const url = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${manageBoundary(
          currentZoom
        )}`;
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

  const updateStoreData = updateStoreDataProcess(
    setStoreList,
    setMapLoading,
    setRefreshLoading
  );

  const successGetCurrentPosition = useCallback(
    async (data: any) => {
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
      (await updateStoreData)(
        data.coords.latitude,
        data.coords.longitude,
        currentZoom
      );
    },
    [updateStoreData, currentZoom]
  );

  const failureGetCurrentPosition = useCallback(async () => {
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
    (await updateStoreData)(
      INITIAL_COORDS.lat,
      INITIAL_COORDS.lng,
      currentZoom
    );
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
