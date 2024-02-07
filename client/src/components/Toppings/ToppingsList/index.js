import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import ToppingDeleteButton from "../ToppingDeleteButton";
import ToppingUpdateButton from "../ToppingUpdateButton";

const ToppingsList = ({ toppings, fetchPizza, fetchTopping }) => {
  return (
    <div>
      {toppings.length === 0 ? (
        <Card>
          <CardHeader title="No toppings yet!" sx={{ textAlign: "center" }} />
        </Card>
      ) : (
        <Grid container spacing={2}>
          {toppings.map((topping) => (
            <Grid item xs={12} sm={6} md={4} key={topping._id}>
              <Card>
                <CardHeader title={topping.name} />
                <CardContent>
                  {topping.pizzas.length === 0 ? (
                    <Typography variant="body2">
                      Not on any pizzas yet
                    </Typography>
                  ) : (
                    <div>
                      <Typography variant="body2">Appears on:</Typography>
                      <List>
                        {topping.pizzas.map((pizza, index) => (
                          <ListItem key={index}>
                            <Typography variant="body2">{pizza}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  )}
                </CardContent>
                <CardActions>
                  <ToppingUpdateButton
                    topping={topping}
                    fetchPizza={fetchPizza}
                    onUpdate={fetchTopping}
                  />
                  <ToppingDeleteButton
                    toppingId={topping._id}
                    fetchPizza={fetchPizza}
                    onDelete={fetchTopping}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ToppingsList;
