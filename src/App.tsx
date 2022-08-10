import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loader from "./components/loader";
import Navbar from "./components/navbar";

import { INITIAL_APP_STATE, appContext, appReducer } from "./context";
import About from "./pages/about";
import Home from "./pages/home";

const AppLayout: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const loader = <Loader color={"#000000"} />;

  if (isLoading) {
    return loader;
  }

  return (
    <React.Suspense fallback={loader}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(appReducer, INITIAL_APP_STATE);

  return (
    <BrowserRouter>
      <appContext.Provider value={{ state, dispatch }}>
        <AppLayout isLoading={false} />
      </appContext.Provider>
    </BrowserRouter>
  );
};
