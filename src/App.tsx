import React, { useEffect, useCallback } from "react";
import Map from "./components/Map";
import { InitialStyle } from "./styles/initialStyles";
import styled from "styled-components";
import Loading from "./components/common/Loading";
import { TSuccessGetCurrentPositionCallbackData, TUpdateStoreData } from "./types";
import { useStoreData } from "./hooks/useStoreData";
import { useSelector, useDispatch } from "./hooks/useRedux";
import { TGlobalAction } from "./modules/types";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

function App() {
  const { mapLoading } = useSelector();
  const dispatch = useDispatch();
  const { updateStoreData } = useStoreData();

  const successGetCurrentPositionProcess = useCallback(
    (
      data: TSuccessGetCurrentPositionCallbackData,
      dispatch: React.Dispatch<TGlobalAction>,
      updateStoreData: TUpdateStoreData
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
      };
    },
    []
  );

  const failureGetCurrentPositionProcess = useCallback(
    async (
      dispatch: React.Dispatch<TGlobalAction>,
      updateStoreData: TUpdateStoreData
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
          updateStoreData
        );
        successGetCurrentPosition();
      },
      async () => {
        const failureGetCurrentPosition = await failureGetCurrentPositionProcess(
          dispatch,
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
      <Map />
    </Container>
  );
}

export default React.memo(App);
