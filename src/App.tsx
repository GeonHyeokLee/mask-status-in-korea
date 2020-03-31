import React, { useEffect, useCallback, useState } from "react";
import Map from "./components/Map";
import { InitialStyle } from "./styles/initialStyles";
import styled from "styled-components";
import Loading from "./components/common/Loading";
import { TSuccessGetCurrentPositionCallbackData, TUpdateStoreData } from "./types";
import { useStoreData } from "./hooks/useStoreData";
import { useDispatch } from "./hooks/useRedux";
import { TGlobalAction } from "./modules/types";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

function App() {
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { updateStoreData } = useStoreData();

  const successGetCurrentPositionProcess = useCallback(
    (
      data: TSuccessGetCurrentPositionCallbackData,
      dispatch: React.Dispatch<TGlobalAction>,
      updateStoreData: TUpdateStoreData,
      mapLoading: boolean,
      setMapLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      return async () => {
        dispatch({
          type: "UPDATE_CURRENT_LOCATION",
          payload: { lat: data.coords.latitude, lng: data.coords.longitude }
        });
        dispatch({
          type: "UPDATE_MY_LOCATION",
          payload: { lat: data.coords.latitude, lng: data.coords.longitude }
        });
        (await updateStoreData)(data.coords.latitude, data.coords.longitude);
        if (mapLoading) {
          setMapLoading(false);
        }
      };
    },
    []
  );

  const failureGetCurrentPositionProcess = useCallback(
    async (
      dispatch: React.Dispatch<TGlobalAction>,
      updateStoreData: TUpdateStoreData,
      mapLoading: boolean,
      setMapLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      return async () => {
        const INITIAL_COORDS = {
          lat: 37.576333,
          lng: 126.976806
        };
        dispatch({
          type: "UPDATE_CURRENT_LOCATION",
          payload: { lat: INITIAL_COORDS.lat, lng: INITIAL_COORDS.lng }
        });
        dispatch({
          type: "UPDATE_MY_LOCATION",
          payload: { lat: INITIAL_COORDS.lat, lng: INITIAL_COORDS.lng }
        });
        (await updateStoreData)(INITIAL_COORDS.lat, INITIAL_COORDS.lng);
        if (mapLoading) {
          setMapLoading(false);
        }
      };
    },
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      data => {
        const successGetCurrentPosition = successGetCurrentPositionProcess(
          data,
          dispatch,
          updateStoreData,
          mapLoading,
          setMapLoading
        );
        successGetCurrentPosition();
      },
      async () => {
        const failureGetCurrentPosition = await failureGetCurrentPositionProcess(
          dispatch,
          updateStoreData,
          mapLoading,
          setMapLoading
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
      <Map />
    </Container>
  );
}

export default React.memo(App);
