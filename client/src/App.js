import React from "react";
import ToppingsList from "./components/ToppingsList";
import PizzaList from "./components/PizzasList";

function App() {
  return (
    <React.Fragment>
    <header><h1>Pizza Store</h1></header>
    <ToppingsList />
    <PizzaList />
    </React.Fragment>
  );
}

export default App;
