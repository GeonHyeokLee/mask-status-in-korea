import React, { useReducer, createContext } from "react";
import { initialGlobalState, reducer } from "./reducer";
import { TGlobalState, TGlobalDispatch } from "./types";

export const stateContext = createContext<TGlobalState | undefined>(undefined);
export const dispatchContext = createContext<TGlobalDispatch | undefined>(undefined);

export function CombineProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialGlobalState);

  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>{children}</stateContext.Provider>
    </dispatchContext.Provider>
  );
}
