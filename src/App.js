import React from 'react';
import Drawer from './components/navbar/drawer';
import ROUTES, { RenderRoutes } from "./config/routes";

function App() {
  return (
    <>
        <Drawer />
        <RenderRoutes routes={ROUTES} />
        </>
  );
}

export default App;
