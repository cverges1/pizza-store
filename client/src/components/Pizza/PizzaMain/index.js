// PizzaMain.js
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import PizzaList from "../PizzaList";
import CreateNewPizza from "../CreateNewPizza";

const PizzaMain = ({ pizzas, toppings, fetchPizza, fetchTopping }) => {
  return (
    <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pb={2}
        >
          <Typography variant="h5" fontWeight="bold" mt={3}>
            Pizzas
          </Typography>
          <CreateNewPizza
            updatePizzas={fetchPizza}
            toppings={toppings}
            fetchTopping={fetchTopping}
          />
        </Box>
      <PizzaList
        pizzas={pizzas}
        toppings={toppings}
        fetchPizza={fetchPizza}
        fetchTopping={fetchTopping}
      />
    </Container>
  );
};

export default PizzaMain;
