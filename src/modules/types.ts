import { Dispatch } from "react";
import { TMyLocation, TCurrentLocation, TCurrentZoom } from "../types";

export type TGlobalState = {
  myLocation: TMyLocation;
  currentLocation: TCurrentLocation;
  currentZoom: TCurrentZoom;
};

export type TGlobalAction =
  | { type: "UPDATE_MY_LOCATION"; payload: TMyLocation }
  | { type: "UPDATE_CURRENT_LOCATION"; payload: TCurrentLocation }
  | { type: "UPDATE_CURRENT_ZOOM"; payload: TCurrentZoom }

export type TGlobalDispatch = Dispatch<TGlobalAction>;
