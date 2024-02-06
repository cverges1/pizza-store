import React from "react";
import { Button } from "@mui/material";

const PizzaDeleteButton = ({ pizzaId, onDelete, fetchTopping }) => {
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
      onDelete(); // Update the Pizza List
      fetchTopping(); //Update the Topping List
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
