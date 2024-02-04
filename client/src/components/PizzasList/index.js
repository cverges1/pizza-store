import React, { useState, useEffect } from 'react';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
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

    fetchPizzas();
  }, []);

  return (
    <div>
      <h2>Pizzas</h2>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza._id}>{pizza.pizzaName}</li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;