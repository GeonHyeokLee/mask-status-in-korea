import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "./useRedux";
import { TUpdateStoreData, TMapLoading, TStoreListData, TRefreshLoading } from "../types";
import { manageBoundary } from "../utils/manageBoundary";
import { TGlobalAction } from "../modules/types";

export const useStoreData = () => {
  const [stores, setStores] = useState<TStoreListData>([]);
  const [refreshLoading, setRefreshLoading] = useState<TRefreshLoading>(false);
  const { mapLoading, currentZoom } = useSelector();
  const dispatch = useDispatch();

  const updateStoreDataProcess = useCallback(
    async (
      dispatch: React.Dispatch<TGlobalAction>,
      requireBoundary: number,
      mapLoading: TMapLoading
    ) => {
      return async (requireLat: number, requireLng: number) => {
        setRefreshLoading(true);
        const url = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${requireLat}&lng=${requireLng}&m=${requireBoundary}`;
        const result = await fetch(url);
        const resultToJson = await result.json();
        setStores(resultToJson.stores);

        setTimeout(() => {
          setRefreshLoading(false);
        }, 1000);

        if (mapLoading) {
          setTimeout(() => {
            dispatch({ type: "TOGGLE_MAP_LOADING", payload: false });
          }, 1500);
        }
      };
    },
    []
  );

  const currentBoundary: number = manageBoundary(currentZoom);

  const updateStoreData: TUpdateStoreData = updateStoreDataProcess(
    dispatch,
    currentBoundary,
    mapLoading
  );

  return {
    stores,
    updateStoreData,
    refreshLoading,
    setRefreshLoading
  };
};
