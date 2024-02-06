import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import ToppingDeleteButton from "../DeleteToppingBtn";
import ToppingUpdateButton from "../UpdateToppingsBtn";

const ToppingsList = ({ toppings, fetchPizza, fetchTopping }) => {
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
                    fetchPizza={fetchPizza}
                    onUpdate={fetchTopping}
                  />
                  <ToppingDeleteButton
                    toppingId={topping._id}
                    fetchPizza={fetchPizza}
                    onDelete={fetchTopping}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    </div>
  );
};

export default ToppingsList;
