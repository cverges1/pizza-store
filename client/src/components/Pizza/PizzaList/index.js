import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import PizzaDeleteButton from "../PizzaDeleteButton";
import PizzaUpdateButton from "../PizzaUpdateButton";

const PizzaList = ({ pizzas, toppings, fetchPizza, fetchTopping }) => {
  return (
    <div>
      {pizzas.length === 0 ? (
        <Card>
        <CardHeader title="No pizzas yet!" sx={{textAlign:"center"}}/>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {pizzas.map((pizza) => (
            <Grid item xs={12} sm={6} md={4} key={pizza._id}>
              <Card>
                <CardHeader title={pizza.name} />
                <CardContent>
                  <Typography variant="body2">
                    Toppings on {pizza.name}:
                  </Typography>
                  {pizza.toppings.length === 0 ? (
                    <Typography>No Toppings</Typography>
                  ) : (
                  <ul>
                    {pizza.toppings.map((topping) => (
                      <li key={topping._id}>{topping.name}</li>
                    ))}
                  </ul>
                  )}
                </CardContent>
                <CardActions>
                  <PizzaUpdateButton
                    pizza={pizza}
                    onUpdate={fetchPizza}
                    fetchTopping={fetchTopping}
                    toppings={toppings}
                  />
                  <PizzaDeleteButton
                    pizzaId={pizza._id}
                    onDelete={fetchPizza}
                    fetchTopping={fetchTopping}
                  />
                </CardActions>
              </Card>
            </Grid>
            
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PizzaList;
