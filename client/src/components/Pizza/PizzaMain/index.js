import React from "react";
import { Container, Card, CardHeader } from "@mui/material";
import PizzaList from "../GetPizzas";
import CreateNewPizza from "../CreatePizzaBtn";

const PizzaMain = ({ pizzas, toppings, fetchPizza, fetchTopping }) => {
  return (
    <Container>
      <Card>
        <CardHeader title="Pizzas" />
        <PizzaList
          pizzas={pizzas}
          toppings={toppings}
          fetchPizza={fetchPizza}
          fetchTopping={fetchTopping}
        />
        <CreateNewPizza
          updatePizzas={fetchPizza}
          toppings={toppings}
          fetchTopping={fetchTopping}
        />
      </Card>
    </Container>
  );
};

export default PizzaMain;
