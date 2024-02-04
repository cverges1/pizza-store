import React, { useState, useEffect } from 'react';

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
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

    fetchToppings();
  }, []);

  return (
    <div>
      <h2>Toppings</h2>
      <ul>
        {toppings.map(topping => (
          <li key={topping._id}>{topping.toppingName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToppingsList;
