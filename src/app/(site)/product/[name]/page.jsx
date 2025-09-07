import ProductSection from "./components/AllSection";
import { notFound } from "next/navigation";

// helper function to fetch data
async function fetchData(url, errorMessage) {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error(errorMessage);
    }

    return res.json();
  } catch (error) {
    throw new Error(`${errorMessage}`);
  }
}

export default async function ProductPage({ params }) {
  const API_URL = process.env.API_URL || "http://127.0.0.1:8000";
  const { name } = params;

  // fetch product
  const product = await fetchData(
    `${API_URL}/api/product/${name}`,
    "Failed to fetch product"
  );

  // fetch images only if product exists
  let images = [];
  if (product?.id_product) {
    images = await fetchData(
      `${API_URL}/api/images/product/${product.id_product}`,
      "Failed to fetch images"
    );
  }

  return <ProductSection product={product} images={images} />;
}
