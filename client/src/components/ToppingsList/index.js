import React, { useState, useEffect } from 'react';
import CreateNewTopping from '../CreateTopping';
import ToppingDeleteButton from '../DeleteTopping';

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    fetchToppings();
  }, []);

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

  return (
    <div>
      <h2>Toppings</h2>
      <ul>
        {toppings.map(topping => (
          <li key={topping._id}>
            <p>{topping.toppingName}</p>
            <ToppingDeleteButton toppingId={topping._id} onDelete={fetchToppings} />
          </li>
        ))}
      </ul>
      <CreateNewTopping updateToppings={fetchToppings} />
    </div>
  );
};

export default ToppingsList;