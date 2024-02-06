import React, { useState, useEffect } from 'react';
import ToppingsMain from "./components/Toppings/ToppingsMain";
import PizzaMain from "./components/Pizza/PizzaMain";
import { Typography } from "@mui/material";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    fetchPizza();   // Fetch toppings once
    fetchTopping(); // Fetch toppings once
  }, []);

  const fetchPizza = async () => {
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

  const fetchTopping = async () => {
    try {
      const response = await fetch('/api/toppings');
      if (!response.ok) {
        throw new Error('Failed to fetch toppings');
      }
      const data = await response.json();
      setToppings(data);
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#64B5F6', paddingBottom: 30}}>
      <header>
        <Typography variant='h4' sx={{ textAlign: "center", padding: "20px" }}>
          <h1>Pizza Store</h1>
        </Typography>
      </header>

      <ToppingsMain toppings={toppings} fetchPizza={fetchPizza} fetchTopping={fetchTopping}/>
      <PizzaMain pizzas={pizzas} toppings={toppings} fetchPizza={fetchPizza} fetchTopping={fetchTopping}/>
    </div>
    
  );
}

export default App;
