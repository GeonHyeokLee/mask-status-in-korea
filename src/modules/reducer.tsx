import { TGlobalState, TGlobalAction } from "./types";

export const initialGlobalState: TGlobalState = {
  myLocation: undefined,
  currentLocation: undefined,
  currentZoom: 16
};

export function reducer(state: TGlobalState, action: TGlobalAction): TGlobalState {
  switch (action.type) {
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
