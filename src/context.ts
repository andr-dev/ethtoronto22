import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppState {}

type AppAction = unknown;

export const appReducer: React.Reducer<AppState, AppAction> = (state) => state;

interface AppContext {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const INITIAL_APP_STATE: AppState = {};

export const appContext = React.createContext<AppContext>({
  state: INITIAL_APP_STATE,
  dispatch: () => undefined,
});
