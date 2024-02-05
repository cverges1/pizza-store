import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CreateNewPizza = ({ updatePizzas }, {updateToppings}) => {
  const [open, setOpen] = useState(false);
  const [name, setPizzaName] = useState('');
  const [selectedToppings, setSelectedToppings] = useState([]);
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

  const handleOpen = async () => {
    try {
      const response = await fetch('/api/toppings');
      if (!response.ok) {
        throw new Error('Failed to fetch toppings');
      }
      const data = await response.json();
      setToppings(data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
    // Reset the form when dialog is closed
    setPizzaName('');
    setSelectedToppings([]);
  };

  const handleCreatePizza = async () => {
    try {
      // Map the selected toppings to their IDs
      const selectedToppingIds = selectedToppings.map(toppingName => {
        const matchingTopping = toppings.find(topping => topping.name === toppingName);
        return matchingTopping._id;
      });
  
      // Send the pizza data with topping IDs to the backend API
      const response = await fetch('/api/pizzas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, toppings: selectedToppingIds }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create pizza');
      }
  
      const data = await response.json();
      console.log('Pizza created:', data);
      handleClose(); // Close the dialog after pizza is created
      updatePizzas(); // Call the updatePizzas function passed from the parent
      window.location.reload(); // Reload the page to update the pizza list
    } catch (error) {
      console.error('Error creating pizza:', error);
    }
  };  

  const handleChangePizzaName = (event) => {
    setPizzaName(event.target.value);
  };

  const handleChangeToppings = (event) => {
    setSelectedToppings(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create New Pizza
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Pizza</DialogTitle>
        <DialogContent>
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
              renderValue={(selected) => selected.join(', ')}
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
          <Button onClick={handleCreatePizza} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateNewPizza;