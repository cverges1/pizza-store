import React, { useState, useEffect } from 'react';
import CreateNewPizza from '../CreatePizza';

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

  const updatePizzas = () => {
    // Call fetchPizzas again to update the list of pizzas
    fetchPizzas();
  };

  return (
    <div>
      <h2>Pizzas</h2>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza._id}>{pizza.pizzaName}</li>
        ))}
      </ul>
      <CreateNewPizza updatePizzas={updatePizzas} />
    </div>
  );
};

export default PizzaList;
