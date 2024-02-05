import React from "react";
import { Container, Typography, Box } from '@mui/material';
import ToppingsList from "../GetToppings";

const ToppingsMain = () => {
  return (
    <Container>
      <Box mt={3} mb={3}>
        <Typography variant="h4" gutterBottom>
          Toppings
        </Typography>
      </Box>
      <ToppingsList />
    </Container>
  );
};

export default ToppingsMain;