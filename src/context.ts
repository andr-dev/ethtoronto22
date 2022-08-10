import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import React from "react";

interface AppState {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  lensConfig?: {
    accessToken: string;
    refreshToken: string;
  };
}

type SetLensConfig = {
  type: AppActionType.SetLensConfig;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
};

type AppAction = SetLensConfig;

export enum AppActionType {
  SetLensConfig,
}

export const appReducer: React.Reducer<AppState, AppAction> = (state, action) => {
  switch (action.type) {
    case AppActionType.SetLensConfig:
      return {
        apolloClient: state.apolloClient,
        lensConfig: action.payload,
      };
  }
};

interface AppContext {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const INITIAL_APP_STATE: AppState = {
  apolloClient: new ApolloClient({
    uri: "https://api-mumbai.lens.dev/",
    cache: new InMemoryCache(),
  }),
};

export const appContext = React.createContext<AppContext>({
  state: INITIAL_APP_STATE,
  dispatch: () => undefined,
});
