import axios from "axios";
import { Product } from "./product";

export async function createProduct(
  productName: string,
  productModel: string,
  productQuantity?: string
): Promise<Product> {
  return (
    await axios.post<Product>(
      "/products",
      {
        name: productName,
        model: productModel,
        quantity: productQuantity,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
  ).data;
}

export async function getProducts(): Promise<Product[]> {
  return (await axios.get<Product[]>("/products")).data;
}

export async function updateProduct(id: number, product: Product) {
  await axios.patch(`/products/${id}`, product);
}

export async function sendOrder(product: Product[]): Promise<Product> {
  return (
    await axios.post<any>("/sendorder", product, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}

export async function getOrder(): Promise<Product[]> {
  return (await axios.get<Product[]>("/sendorder")).data;
}

export async function clearOrder(): Promise<Product[]> {
  return (await axios.delete<Product[]>("/sendorder")).data;
}
