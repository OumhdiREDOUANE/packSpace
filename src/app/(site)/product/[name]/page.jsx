
import ProductSection from "./components/AllSection"



export default async function ProductPage({ params }) {
  const API_URL = process.env.API_URL || "http://127.0.0.1:8000";
  const { name } = await params;

  let res;
  try {
    res = await fetch(`${API_URL}/api/product/${encodeURIComponent(name)}`, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    throw new Error(`Impossible de joindre l'API: ${error.message}`);
  }

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const product = await res.json();
  console.log(product)

  return <ProductSection product={product} />;
}