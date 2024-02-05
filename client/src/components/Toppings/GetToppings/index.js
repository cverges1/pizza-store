import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import CreateNewTopping from "../CreateToppingBtn";
import ToppingDeleteButton from "../DeleteToppingBtn";
import ToppingUpdateButton from "../UpdateToppingsBtn";

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    fetchToppings();
  }, []);

  const fetchToppings = async () => {
    try {
      const response = await fetch("/api/toppings");
      if (!response.ok) {
        throw new Error("Failed to fetch toppings");
      }
      const data = await response.json();
      setToppings(data);
    } catch (error) {
      console.error("Error fetching toppings:", error);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {toppings.map((topping) => (
          <Grid item xs={12} sm={6} md={4} key={topping._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{topping.name}</Typography>
                <Typography variant="p">
                  Pizza's that have {topping.name}:
                </Typography>
                {topping.pizzas.map((pizza, index) => (
                  <Typography key={index} variant="div">
                    <li>{pizza}</li>
                  </Typography>
                ))}
              </CardContent>
              <CardActions>
                <ToppingUpdateButton
                  topping={topping}
                  onUpdate={fetchToppings}
                />
                <ToppingDeleteButton
                  toppingId={topping._id}
                  onDelete={fetchToppings}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CreateNewTopping updateToppings={fetchToppings} />
    </div>
  );
};

export default ToppingsList;
