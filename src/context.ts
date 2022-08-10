import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import React from "react";

interface AppState {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

type UpdateApolloClient = {
  type: AppActionType.UpdateApolloClient;
  payload: ApolloClient<NormalizedCacheObject>;
};

type AppAction = UpdateApolloClient;

export enum AppActionType {
  UpdateApolloClient,
}

export const appReducer: React.Reducer<AppState, AppAction> = (state, action) => {
  switch (action.type) {
    case AppActionType.UpdateApolloClient:
      return {
        apolloClient: action.payload,
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
