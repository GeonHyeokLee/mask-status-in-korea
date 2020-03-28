import { Dispatch } from "react";
import { TMapLoading, TMyLocation, TCurrentLocation, TCurrentZoom, TCurrentHoverStore, TCurrentClickStore, TToggleNotice, TOnlyAvailableStore } from "../types";

export type TGlobalState = {
  mapLoading: TMapLoading;
  myLocation: TMyLocation;
  currentLocation: TCurrentLocation;
  currentZoom: TCurrentZoom;
  currentHoverStore: TCurrentHoverStore;
  currentClickStore: TCurrentClickStore;
  toggleNotice: TToggleNotice;
  onlyAvailableStore: TOnlyAvailableStore;
};

export type TGlobalAction =
  | { type: "TOGGLE_MAP_LOADING"; payload: TMapLoading }
  | { type: "UPDATE_MY_LOCATION"; payload: TMyLocation }
  | { type: "UPDATE_CURRENT_LOCATION"; payload: TCurrentLocation }
  | { type: "UPDATE_CURRENT_ZOOM"; payload: TCurrentZoom }
  | { type: "UPDATE_CURRENT_HOVER_STORE", payload: TCurrentHoverStore }
  | { type: "UPDATE_CURRENT_CLICK_STORE", payload: TCurrentClickStore }
  | { type: "TOGGLE_NOTICE", payload: TToggleNotice }
  | { type: "TOGGLE_ONLY_AVAIL_STORE", payload: TOnlyAvailableStore }

export type TGlobalDispatch = Dispatch<TGlobalAction>;
