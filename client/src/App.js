import React from "react";
import ToppingsList from "./components/Toppings/ToppingsList";
import PizzaList from "./components/Pizza/PizzasList"
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
