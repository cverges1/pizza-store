import React, { useState, useEffect } from 'react';
import CreateNewPizza from '../CreatePizza';
import PizzaDeleteButton from '../DeletePizza';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    fetchPizzas();
    fetchToppings();
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

  const fetchToppings = async () => {
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

  const getToppingName = (toppingId) => {
    const topping = toppings.find(topping => topping._id === toppingId);
    return topping ? topping.toppingName : 'Topping no longer available';
  };

  return (
    <div>
      <h2>Pizzas</h2>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza._id}>
            <h4>{pizza.pizzaName}</h4>
            <ul>
            <p>{pizza.pizzaName} Toppings: </p>
              {pizza.toppings.map(toppingId => (
                <li key={toppingId}>
                  {getToppingName(toppingId)}
                </li>
              ))}
            </ul>
            <PizzaDeleteButton pizzaId={pizza._id} onDelete={fetchPizzas} />
          </li>
        ))}
      </ul>
      <CreateNewPizza updatePizzas={fetchPizzas} />
    </div>
  );
};

export default PizzaList;