import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";
import SingleProduct from "../components/SingleProd";
import ContactCard from "../components/ContactCard";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CartButtons from "../components/Buttons";
// future devlopment
// import ImageUploadForm from "../components/ImageUploadForm";

const defaultTheme = createTheme();

export default function Categories() {
  const [state] = useStoreContext();
  const { currentCategory } = state;
  const { id } = useParams();

  // State to force a re-render if needed
  const [forceRerender, setForceRerender] = useState(false);

  // Function to handle successful image uploads
  function handleUploadSuccess(productId) {
    // Set the state to force a re-render
    setForceRerender(!forceRerender);
  }

  const { loading, error, data, refetch } = useQuery(QUERY_PRODUCTS, {
    variables: { categoryId: id },
  });

  if (loading) {
    // Initial loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching product", error);
    return <p>Error: {error.message}</p>;
  }

  const products = data.products;

  if (currentCategory === "art commissions" || products.length <= 0) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Typography sx={{ textAlign: "center" }}>
          <Card>
            <CardHeader
              title="Art Commissions"
              subheader={
                <div>
                  Have a specific idea that you would like to have made? You've
                  found the right place! Please include as many details about
                  the piece you are envisioning in your message.
                  <br />
                  Prices and wait times on commission pieces vary depending on
                  size, subject, and material.
                </div>
              }
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{
                align: "center",
              }}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
              }}
            />
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  alt="Art piece of a mother and son hiking together. Example art commission."
                  sx={{ maxHeight: 600, maxWidth: 600 }}
                  src="/images/ProductImages/mother-son.jpg"
                />
              </div>
              <ContactCard />
            </CardContent>
          </Card>
        </Typography>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderColor: "divider",
          }}
        >
          <Typography>
            <h1>{products[0].categoryID.categoryName}</h1>
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center" margin={5}>
          {products.map((product) => (
            <Grid
              key={product._id}
              item
              lg={6}
              sx={{
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                >
                  <React.Fragment key={product._id}>
                    {/* For future development w/ admin routes */}

                    {/* <ImageUploadForm
                productId={product._id}
                onUploadSuccess={() => {
                  // Call the refetch function to fetch the updated data
                  refetch();
                  // Call the handleUploadSuccess function
                  handleUploadSuccess(product._id);
                }}
              /> */}
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <SingleProduct
                        _id={product._id}
                        name={product.name}
                        images={product.images}
                        price={product.price}
                        quantity={product.quantity}
                        description={product.description}
                      />
                    </Link>
                    {product.quantity > 0 ? (
                      <CartButtons
                        _id={product._id}
                        name={product.name}
                        images={product.images}
                        price={product.price}
                        quantity={product.quantity}
                        description={product.description}
                      />
                    ) : (
                      <Typography
                        sx={{
                          textAlign: "center",
                          backgroundColor: "#666666",
                          color: "white",
                        }}
                      >
                        <h3>Product Unavailable</h3>
                      </Typography>
                    )}
                  </React.Fragment>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>
    );
  }
}
