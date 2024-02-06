import React from "react";
import { Box, Typography, Container} from "@mui/material";
import ToppingsList from "../ToppingsList";
import CreateNewTopping from "../CreateNewTopping";

const ToppingsMain = ({ toppings, fetchPizza, fetchTopping }) => {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Toppings
        </Typography>
        <CreateNewTopping updateToppings={fetchTopping} />
      </Box>
      <ToppingsList
        toppings={toppings}
        fetchPizza={fetchPizza}
        fetchTopping={fetchTopping}
      />
    </Container>
  );
};

export default ToppingsMain;
