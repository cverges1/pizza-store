import React, { useState, useEffect } from 'react';
import CreateNewPizza from '../CreatePizza';
import PizzaDeleteButton from '../DeletePizza';

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
      <h2>Pizzas</h2>
      {pizzas.map(pizza => (
        <div key={pizza._id}>
          <h4>{pizza.name}</h4>
          <p>{pizza.name} Pizza Toppings: </p>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping._id}>{topping.name}</li>
            ))}
          </ul>
          <PizzaDeleteButton pizzaId={pizza._id} onDelete={fetchPizzas} />
        </div>
      ))}
      <CreateNewPizza updatePizzas={fetchPizzas} />
    </div>
  );
};

export default PizzaList;