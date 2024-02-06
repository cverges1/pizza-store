import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreateNewPizza = ({ updatePizzas, toppings, fetchTopping }) => {
  const [open, setOpen] = useState(false);
  const [name, setPizzaName] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    // Reset the form when dialog is closed
    setPizzaName("");
    setSelectedToppings([]);
  };

  const handleCreatePizza = async () => {
    try {
      // Map the selected toppings to their IDs
      const selectedToppingIds = selectedToppings.map((toppingName) => {
        const matchingTopping = toppings.find(
          (topping) => topping.name === toppingName
        );
        return matchingTopping._id;
      });

      // Send the pizza data with topping IDs to the backend API
      const response = await fetch("/api/pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, toppings: selectedToppingIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Set error message received from backend
        return;
      }

      handleClose(); // Close the dialog after pizza is created
      updatePizzas(); // Update the Pizza List
      fetchTopping(); //Update the Toppings
    } catch (error) {
      console.error("Error creating pizza:", error);
    }
  };

  const handleChangePizzaName = (event) => {
    setPizzaName(event.target.value);
  };

  const handleChangeToppings = (event) => {
    setSelectedToppings(event.target.value);
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleOpen}
        color="success"
        startIcon={<AddIcon />}
      >
        New Pizza
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Pizza</DialogTitle>
        <DialogContent>
        {errorMessage && (
            <Box sx={{ color: "red" }}>{errorMessage}</Box>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Pizza Name"
            fullWidth
            value={name}
            onChange={handleChangePizzaName}
          />
          <FormControl fullWidth>
            <InputLabel>Select Toppings</InputLabel>
            <Select
              multiple
              value={selectedToppings}
              onChange={handleChangeToppings}
              renderValue={(selected) => selected.join(", ")}
            >
              {toppings.map((topping) => (
                <MenuItem key={topping._id} value={topping.name}>
                  {topping.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleCreatePizza}
            variant="contained"
            color="success"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateNewPizza;
