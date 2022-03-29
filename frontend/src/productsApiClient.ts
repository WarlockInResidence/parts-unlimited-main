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

export async function updateQuantity(id: number, product: Product) {
  console.log(product, id, "why u hate joseph????");
  await axios.patch(`/products/${id}`, product);
}
