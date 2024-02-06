import React from "react";
import { Button } from "@mui/material";

const ToppingDeleteButton = ({ toppingId, fetchPizza, onDelete }) => {
  const handleDeleteTopping = async () => {
    try {
      const response = await fetch(`/api/toppings/${toppingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete topping");
      }
      fetchPizza() //Update Pizza List
      onDelete(); // Update Topping List
    } catch (error) {
      console.error("Error deleting topping:", error);
    }
  };

  return (
    <Button onClick={handleDeleteTopping} variant="contained" color="error">
      Delete Topping
    </Button>
  );
};

export default ToppingDeleteButton;