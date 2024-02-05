import React from "react";
import ToppingsMain from "./components/Toppings/ToppingsMain";
import PizzaMain from "./components/Pizza/PizzaMain";
import { Typography } from "@mui/material";

function App() {
  return (
    <div>
      <header>
        <Typography sx={{ textAlign: "center", padding: "20px" }}>
          <h1>Pizza Store</h1>
        </Typography>
      </header>

      <ToppingsMain />
      <PizzaMain />
    </div>
  );
}

export default App;
