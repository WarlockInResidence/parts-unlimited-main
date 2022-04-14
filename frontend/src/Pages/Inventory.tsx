import NavBar from "../components/NavBar";
import React, { FormEvent, useEffect, useState } from "react";
import { Product } from "../product";
import InventoryDataGrid, { Mode } from "../components/InventoryDataGrid";
import { createProduct, getProducts, sendOrder } from "../productsApiClient";
import { Container } from "@mui/material";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<string>("");
  const [isOrdering, setIsOrdering] = useState<Mode>("default");
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    createProduct(productName, productQuantity).then(() => {
      getProducts().then(setProducts);
    });
    setProductName(""), setProductQuantity("");
  };

  const handleAddToOrderClick = (event: any) => {
    if (selectedRows.length) {
      sendOrder(selectedRows);
      alert("Products added to Order");
    }
  };

  const handleOrderClick = () => {
    if (isOrdering === "ordering") {
      setIsOrdering("default");
    } else {
      setIsOrdering("ordering");
    }
  };

  const handleCheckedOrder = (event: any, checked: boolean) => {
    selectedRows.push(event.row);
    setSelectedRows(selectedRows);
    console.log(selectedRows);
    event.row;
  };

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <NavBar />
      Inventory
      <Container sx={{ mx: 1, my: 1 }}>
        <form onSubmit={submitForm}>
          <br />
          <label>
            Product to add
            <input
              name="product"
              type="text"
              placeholder={"product name"}
              value={productName}
              onChange={(event) => {
                setProductName(event.currentTarget.value);
              }}
            />
            <input
              name="quantity"
              type="number"
              placeholder={"quantity"}
              value={productQuantity}
              onChange={(event) => {
                setProductQuantity(event.currentTarget.value);
              }}
            />
          </label>
          <button
            type="submit"
            data-cy="submitButton"
            disabled={!productName || productName.startsWith(" ")}
          >
            Submit
          </button>
          <span> | </span>
          <button type={"button"} onClick={handleOrderClick}>
            Order
          </button>
          <span> | </span>
          <button type="button" onClick={handleAddToOrderClick}>
            Add to Order
          </button>
        </form>
        <InventoryDataGrid
          tableData={products}
          updateData={setProducts}
          mode={isOrdering}
          checkboxSelection
          {...products}
          handleCheckboxProp={handleCheckedOrder}
        />
      </Container>
    </div>
  );
};

export default Inventory;
