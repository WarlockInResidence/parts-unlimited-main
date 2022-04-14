import NavBar from "../components/NavBar";
import { Button, Container, Snackbar } from "@mui/material";
import InventoryDataGrid from "../components/InventoryDataGrid";
import React, { useEffect, useState } from "react";
import OtherDataGrid from "../components/OtherDataGrid";
import { Product } from "../product";
import {
  clearOrder,
  getOrder,
  getProducts,
  sendOrder,
} from "../productsApiClient";

const Order = () => {
  const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);

  const handleClearOrderForm = (event: any) => {
    clearOrder().then(() => {
      setOrderedProducts([]);
    });
  };

  const handleSubmitOrderForm = (event: any) => {
    if (!orderedProducts) {
      alert("Please add something to the order form");
      return;
    }
    const currentOrder = orderedProducts.filter(
      (orderedProduct) => orderedProduct.ordering && orderedProduct.ordering > 0
    );
    let alertText = "";
    currentOrder.forEach((currentOrderProduct) => {
      alertText +=
        `\n ` + currentOrderProduct.name + " x" + currentOrderProduct.ordering;
    });
    console.log("here look here here here");
    console.log(currentOrder);
    alert(`Customer will receive ${alertText}`);
    clearOrder().then(() => {
      setOrderedProducts([]);
    });
  };

  useEffect(() => {
    getOrder().then(setOrderedProducts);
  }, []);

  return (
    <div>
      <NavBar />
      Order Form
      <Container sx={{ mx: 1, my: 1 }}>
        <label>Send Products to Customers</label>
        <span> | </span>
        <button
          type="button"
          onClick={handleClearOrderForm}
          style={{ backgroundColor: "red" }}
        >
          Clear
        </button>
        <span> | </span>
        <button type="button" onClick={handleSubmitOrderForm}>
          Submit Order
        </button>
        <OtherDataGrid
          tableData={orderedProducts}
          updateData={setOrderedProducts}
          {...orderedProducts}
        />
      </Container>
    </div>
  );
};

export default Order;
