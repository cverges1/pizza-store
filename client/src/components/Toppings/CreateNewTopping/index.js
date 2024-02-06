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
import AddIcon from "@mui/icons-material/Add"

const CreateNewTopping = ({ updateToppings }) => {
  const [open, setOpen] = useState(false);
  const [name, setToppingName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleOpen = () => {
    setOpen(true);
    setToppingName("");
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    updateToppings();
  };

  const handleCreateTopping = async () => {
    try {
      const response = await fetch("/api/toppings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Set error message received from backend
        return;
      }

      handleClose(); // Close the dialog after topping is created
    } catch (error) {
      console.error("Error creating topping:", error);
    }
  };

  const handleChange = (event) => {
    setToppingName(event.target.value);
  };

  return (
    <Box> 
      <Button variant="contained" onClick={handleOpen} color="success" startIcon={<AddIcon />}>
        New Topping
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Topping</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Box sx={{ color: "red" }}>{errorMessage}</Box>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Topping Name"
            fullWidth
            value={name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleCreateTopping}
            variant="contained"
            color="success"          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateNewTopping;