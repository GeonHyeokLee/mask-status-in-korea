import { useCallback, useState } from "react";
import { useSelector } from "./useRedux";
import { TUpdateStoreData, TStoreListData, TRefreshLoading } from "../types";
import { manageBoundary } from "../utils/manageBoundary";

export const useStoreData = () => {
  const [stores, setStores] = useState<TStoreListData>([]);
  const [refreshLoading, setRefreshLoading] = useState<TRefreshLoading>(false);
  const [error, setError] = useState<any>(null);
  const { currentZoom } = useSelector();

  const updateStoreDataProcess = useCallback(async (requireBoundary: number) => {
    let repeatChecker: number = 0;
    const asyncProcess = async (requireLat: number, requireLng: number) => {
      try {
        setRefreshLoading(true);
        const url = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${requireLat}&lng=${requireLng}&m=${requireBoundary}`;
        const result = await fetch(url);
        const resultToJson = await result.json();
        setStores(resultToJson.stores);
        setTimeout(() => {
          setRefreshLoading(false);
        }, 1000);
        repeatChecker = 0;
      } catch (error) {
        setError(error);
        setRefreshLoading(false);
        if (repeatChecker < 3) {
          repeatChecker++;
          asyncProcess(requireLat, requireLng);
        } else {
          repeatChecker = 0;
        }
      }
    };

    return asyncProcess;
  }, []);

  const currentBoundary: number = manageBoundary(currentZoom);

  const updateStoreData: TUpdateStoreData = updateStoreDataProcess(currentBoundary);

  return {
    stores,
    refreshLoading,
    error,
    updateStoreData,
    setRefreshLoading,
  };
};
