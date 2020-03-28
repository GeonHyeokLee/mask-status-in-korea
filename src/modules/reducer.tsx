import { TGlobalState, TGlobalAction } from "./types";

export const initialGlobalState: TGlobalState = {
  mapLoading: true,
  refreshLoading: false,
  storeList: undefined,
  myLocation: undefined,
  currentLocation: undefined,
  currentZoom: 16
};

export function reducer(state: TGlobalState, action: TGlobalAction): TGlobalState {
  switch (action.type) {
    case "TOGGLE_MAP_LOADING":
      return { ...state, mapLoading: action.payload };
    case "TOGGLE_REFRESH_LOADING":
      return { ...state, refreshLoading: action.payload };
    case "UPDATE_STORE_LIST":
      return { ...state, storeList: action.payload };
    case "UPDATE_MY_LOCATION":
      return { ...state, myLocation: action.payload };
    case "UPDATE_CURRENT_LOCATION":
      return { ...state, currentLocation: action.payload };
    case "UPDATE_CURRENT_ZOOM":
      return { ...state, currentZoom: action.payload };
    default:
      return state;
  }
}
