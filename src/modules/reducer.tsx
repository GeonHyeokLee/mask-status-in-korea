import { TGlobalState, TGlobalAction } from "./types";

export const initialGlobalState: TGlobalState = {
  mapLoading: true,
  myLocation: undefined,
  currentLocation: undefined,
  currentZoom: 16,
  currentHoverStore: "",
  currentClickStore: "",
  toggleNotice: false,
  onlyAvailableStore: false
};

export function reducer(state: TGlobalState, action: TGlobalAction): TGlobalState {
  switch (action.type) {
    case "TOGGLE_MAP_LOADING":
      return { ...state, mapLoading: action.payload };
    case "UPDATE_MY_LOCATION":
      return { ...state, myLocation: action.payload };
    case "UPDATE_CURRENT_LOCATION":
      return { ...state, currentLocation: action.payload };
    case "UPDATE_CURRENT_ZOOM":
      return { ...state, currentZoom: action.payload };
    case "UPDATE_CURRENT_HOVER_STORE":
      return { ...state, currentHoverStore: action.payload };
    case "UPDATE_CURRENT_CLICK_STORE":
      return { ...state, currentClickStore: action.payload };
    case "TOGGLE_NOTICE":
      return { ...state, toggleNotice: action.payload };
    case "TOGGLE_ONLY_AVAIL_STORE":
      return { ...state, onlyAvailableStore: action.payload };
    default:
      return state;
  }
}
