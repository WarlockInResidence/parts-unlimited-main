import React, { FormEvent, useEffect, useState } from "react";
import { createProduct, getProducts } from "./productsApiClient";
import { Container } from "@mui/material";
import { Product } from "./product";
import MyDataGrid from "./components/MyDataGrid";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productModel, setProductModel] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<string>("");
  const [productColor, setProductColor] = useState<string>("");

  const setProductNameFromInput = (event: FormEvent<HTMLInputElement>) => {
    setProductName(event.currentTarget.value);
  };

  const setProductModelFromInput = (event: FormEvent<HTMLInputElement>) => {
    setProductModel(event.currentTarget.value);
  };

  const setProductQuantityFromInput = (event: FormEvent<HTMLInputElement>) => {
    setProductQuantity(event.currentTarget.value);
  };

  const setProductColorFromInput = (event: FormEvent<HTMLInputElement>) => {
    setProductColor(event.currentTarget.value);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    createProduct(
      productName,
      productModel,
      productQuantity,
      productColor
    ).then(() => {
      getProducts().then(setProducts);
    });
    setProductName(""),
      setProductQuantity(""),
      setProductModel(""),
      setProductColor("");
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
            onChange={setProductNameFromInput}
          />
          <input
            name="model number"
            type="number"
            placeholder={"model number"}
            value={productModel}
            onChange={setProductModelFromInput}
          />
          <input
            name="quantity"
            type="number"
            placeholder={"quantity"}
            value={productQuantity}
            onChange={setProductQuantityFromInput}
          />
          <input
            name="color"
            type="text"
            placeholder={"color"}
            value={productColor}
            onChange={setProductColorFromInput}
          />
        </label>
        <button type="submit" onClick={submitForm}>
          Submit
        </button>
      </form>
      <MyDataGrid tableData={products} updateData={setProducts}></MyDataGrid>
    </Container>
  );
};

export default App;
