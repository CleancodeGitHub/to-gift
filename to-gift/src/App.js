import React from "react";
import { Route } from "react-router";
import GiftPage from "./GiftPage";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/:id" component={GiftPage} />
    </div>
  );
}

export default App;
