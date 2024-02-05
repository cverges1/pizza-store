import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CardActions, Grid } from '@mui/material';
import CreateNewPizza from '../CreatePizzaBtn';
import PizzaDeleteButton from '../DeletePizzaBtn';
import PizzaUpdateButton from '../UpdatePizzasBtn';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await fetch('/api/pizzas');
      if (!response.ok) {
        throw new Error('Failed to fetch pizzas');
      }
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {pizzas.map(pizza => (
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
                <PizzaUpdateButton pizza={pizza} onUpdate={fetchPizzas} />
                <PizzaDeleteButton pizzaId={pizza._id} onDelete={fetchPizzas} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CreateNewPizza updatePizzas={fetchPizzas} />
    </div>
  );
};

export default PizzaList;
