import axios from "axios";
import { Product } from "./product";

export async function createProduct(
  productName: string,
  productModel: string,
  productQuantity?: string,
  productColor?: string
): Promise<Product> {
  return (
    await axios.post<Product>(
      "/products",
      {
        name: productName,
        model: productModel,
        quantity: productQuantity,
        color: productColor,
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
