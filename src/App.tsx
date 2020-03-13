/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Map from "./Map";
import { InitialStyle } from "./initialStyles";

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
  const [getStoreListLoading, setGetStoreListLoading] = useState<boolean>(
    false
  );

  const updateStoreData = (lat: number, lng: number) => {
    setGetStoreListLoading(true);
    const result = fetch(
      `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${5000}`
    );
    result
      .then(res => res.json())
      .then(data => setStoreList(data.stores))
      .finally(() => {
        setGetStoreListLoading(false);
      });
  };

  const successGetCurrentPostion = (data: any) => {
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
    updateStoreData(data.coords.latitude, data.coords.longitude);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successGetCurrentPostion);
  }, []);

  return (
    <>
      <InitialStyle />
      <Map
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        myLocation={myLocation}
        updateStoreData={updateStoreData}
        storeList={storeList}
        getStoreListLoading={getStoreListLoading}
      />
    </>
  );
}

export default React.memo(App);
