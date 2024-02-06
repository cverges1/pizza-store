import React from 'react';
import { Typography, Card, CardContent, CardActions, Grid } from '@mui/material';
import PizzaDeleteButton from '../DeletePizzaBtn';
import PizzaUpdateButton from '../UpdatePizzasBtn';

const PizzaList = ({ pizzas, toppings, fetchPizza, fetchTopping }) => {

  return (
    <div>
      <Grid container spacing={2}>
        {pizzas.map((pizza) => (
          <Grid item xs={12} sm={6} md={4} key={pizza._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{pizza.name}</Typography>
                <Typography variant="body1">Toppings on {pizza.name}:</Typography>
                <ul>
                  {pizza.toppings.map((topping) => (
                    <li key={topping._id}>{topping.name}</li>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <PizzaUpdateButton pizza={pizza} onUpdate={fetchPizza} fetchTopping={fetchTopping} toppings={toppings} />
                <PizzaDeleteButton pizzaId={pizza._id} onDelete={fetchPizza} fetchTopping={fetchTopping}/>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PizzaList;