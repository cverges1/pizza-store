import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";

const ToppingUpdateButton = ({ topping, fetchPizza, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(topping.name);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdatedName("");
    setErrorMessage("");
  };
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/toppings/${topping._id}`, {
        method: "PUT", // Use PUT for updating data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName }),
      });
      if (!response.ok) {
        throw new Error("Topping Must Be Unique");
      }
      onUpdate(); // Update Topping List
      fetchPizza(); // Update Pizza List
      handleClose(); // Close the dialog after updating topping
    } catch (error) {
      console.error("Error updating topping:", error);
      setErrorMessage(error.message); // Update errorMessage state with the error message
    }
  };

  const handleChange = (event) => {
    setUpdatedName(event.target.value);
  };

  return (
    <div>
      <Button size="small" onClick={handleOpen} variant="contained">
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update {topping.name}</DialogTitle>
        <DialogContent>
          {errorMessage && <Box sx={{ color: "red" }}>{errorMessage}</Box>}
          <TextField
            autoFocus
            margin="dense"
            label="New Topping Name"
            fullWidth
            value={updatedName}
            onChange={handleChange}
          />
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

export default ToppingUpdateButton;
