import { ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppState {}

type AppAction = {
  apolloClient: ApolloClient<InMemoryCache>;
};

export const appReducer: React.Reducer<AppState, AppAction> = (state) => state;

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
