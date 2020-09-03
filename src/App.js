import React from 'react';
import Header from './components/header';
import ROUTES, { RenderRoutes } from "./config/routes";

function App() {
  return (
    <>
        <Header />
        <RenderRoutes routes={ROUTES} />
        </>
  );
}

export default App;
