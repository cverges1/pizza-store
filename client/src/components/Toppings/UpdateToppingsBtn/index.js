import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const ToppingUpdateButton = ({ topping, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [updatedName, setUpdatedName] = useState(topping.name);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                throw new Error("Failed to update topping");
            }
            onUpdate(); // Call the onUpdate function passed from the parent component to refresh the toppings list
            handleClose(); // Close the dialog after updating topping
        } catch (error) {
            console.error("Error updating topping:", error);
        }
    };

    const handleChange = (event) => {
        setUpdatedName(event.target.value);
    };

    return (
        <div>
            <Button onClick={handleOpen} variant='contained' color='info'>
                Update Topping
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update {topping.name}</DialogTitle>
                <DialogContent>
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