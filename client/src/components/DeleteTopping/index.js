import React from "react";
import { Button } from "@mui/material";

const ToppingDeleteButton = ({ toppingId, onDelete }) => {
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
      onDelete(); // Call the onDelete function passed from the parent component to update the toppings list
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