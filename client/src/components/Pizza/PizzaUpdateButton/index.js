import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";

const PizzaUpdateButton = ({ pizza, onUpdate, fetchTopping, toppings }) => {
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(pizza.name);
  const [selectedToppings, setSelectedToppings] = useState(
    pizza.toppings.map((topping) => topping._id)
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdatedName("");
    setErrorMessage("");
  };

  // Handle update pizza logic
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/pizzas/${pizza._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName, toppings: selectedToppings }),
      });
      if (!response.ok) {
        throw new Error("Pizza Must Be Unique");
      }
      onUpdate(); // Update Pizza List
      fetchTopping(); //Update Topping List
      handleClose();
    } catch (error) {
      console.error("Error updating pizza:", error);
      setErrorMessage(error.message); // Update errorMessage state with the error message
    }
  };

  // Handle change in pizza name
  const handleChangeName = (event) => {
    setUpdatedName(event.target.value);
  };

  // Handle change in selected toppings
  const handleChangeToppings = (event) => {
    const toppingId = event.target.value;
    setSelectedToppings((prevToppings) => {
      if (prevToppings.includes(toppingId)) {
        return prevToppings.filter((id) => id !== toppingId); // Deselect topping
      } else {
        return [...prevToppings, toppingId]; // Select topping
      }
    });
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        size="small"
      >
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update {pizza.name}</DialogTitle>
        <DialogContent>
          {errorMessage && <Box sx={{ color: "red" }}>{errorMessage}</Box>}
          <TextField
            autoFocus
            margin="dense"
            label="New Pizza Name"
            fullWidth
            value={updatedName}
            onChange={handleChangeName}
          />
          <div>
            <h4>Select Toppings:</h4>
            {toppings.map((topping) => (
              <FormControlLabel
                key={topping._id}
                control={
                  <Checkbox
                    checked={selectedToppings.includes(topping._id)}
                    onChange={() =>
                      handleChangeToppings({ target: { value: topping._id } })
                    }
                  />
                }
                label={topping.name}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PizzaUpdateButton;
