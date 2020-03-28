import { Dispatch } from "react";
import { TRefreshLoading, TMapLoading, TStoreListData, TMyLocation, TCurrentLocation, TCurrentZoom } from "../types";

export type TGlobalState = {
  mapLoading: TMapLoading;
  refreshLoading: TRefreshLoading;
  storeList: TStoreListData;
  myLocation: TMyLocation;
  currentLocation: TCurrentLocation;
  currentZoom: TCurrentZoom;
};

export type TGlobalAction =
  | { type: "TOGGLE_MAP_LOADING"; payload: boolean }
  | { type: "TOGGLE_REFRESH_LOADING"; payload: boolean }
  | { type: "UPDATE_STORE_LIST"; payload: TStoreListData }
  | { type: "UPDATE_MY_LOCATION"; payload: TMyLocation }
  | { type: "UPDATE_CURRENT_LOCATION"; payload: TCurrentLocation }
  | { type: "UPDATE_CURRENT_ZOOM"; payload: TCurrentZoom }

export type TGlobalDispatch = Dispatch<TGlobalAction>;
