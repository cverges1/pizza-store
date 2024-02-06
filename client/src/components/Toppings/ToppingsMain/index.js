import React from "react";
import { Container, Card, CardHeader } from "@mui/material";
import ToppingsList from "../GetToppings";
import CreateNewTopping from "../CreateToppingBtn";

const ToppingsMain = ({ toppings, fetchPizza, fetchTopping }) => {
  return (
    <Container>
      <Card>
        <CardHeader title="Toppings" />
        <ToppingsList toppings={toppings} fetchPizza={fetchPizza} fetchTopping={fetchTopping} />
        <CreateNewTopping updateToppings={fetchTopping} />
      </Card>
    </Container>
  );
};

export default ToppingsMain;
