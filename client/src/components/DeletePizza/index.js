import React from "react";
import { Button } from "@mui/material";

const PizzaDeleteButton = ({ pizzaId, onDelete }) => {
  const handleDeletePizza = async () => {
    try {
      const response = await fetch(`/api/pizzas/${pizzaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete pizza");
      }
      onDelete(); // Call the onDelete function passed from the parent component to update the toppings list
    } catch (error) {
      console.error("Error deleting pizza:", error);
    }
  };

  return (
    <Button onClick={handleDeletePizza} variant="contained" color="error">
      Delete Pizza
    </Button>
  );
};

export default PizzaDeleteButton;