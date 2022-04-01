import React, { FormEvent, useEffect, useState } from "react";
import { createProduct, getProducts } from "./productsApiClient";
import { Container } from "@mui/material";
import { Product } from "./product";
import MyDataGrid from "./components/MyDataGrid";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<string>("");

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    createProduct(productName, productQuantity).then(() => {
      getProducts().then(setProducts);
    });
    setProductName(""), setProductQuantity("");
  };

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
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
          disabled={!productName || productName.startsWith(" ")}
          onClick={submitForm}
        >
          Submit
        </button>
      </form>
      <MyDataGrid tableData={products} updateData={setProducts}></MyDataGrid>
    </Container>
  );
};

export default App;
