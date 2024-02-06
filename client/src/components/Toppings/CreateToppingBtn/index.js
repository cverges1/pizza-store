import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from "@mui/material";

const CreateNewTopping = ({ updateToppings }) => {
  const [open, setOpen] = useState(false);
  const [name, setToppingName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        throw new Error("Failed to create topping");
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
      <Button variant="contained" onClick={handleOpen} fullWidth>
        Create New Topping
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Topping</DialogTitle>
        <DialogContent>
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
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateNewTopping;