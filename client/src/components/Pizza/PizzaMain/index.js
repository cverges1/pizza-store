import React from "react";
import { Container, Typography, Box } from '@mui/material';
import PizzaList from "../GetPizzas";

const PizzaMain = () => {
  return (
    <Container>
      <Box mt={3} mb={3}>
        <Typography variant="h4" gutterBottom>
          Pizzas
        </Typography>
      </Box>
      <PizzaList />
    </Container>
  );
};

export default PizzaMain;
