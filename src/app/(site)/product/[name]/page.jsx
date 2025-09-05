
import ProductSection from "./components/AllSection"



export default async function ProductPage({ params }) {
  const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";
  const { name } = await params;
let images;
  let res;
  try {
    res = await fetch(`${API_URL}/product/${encodeURIComponent(name)}`, {
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
if(product.id_product){
  let reponse;
  try {
    reponse = await fetch(`${API_URL}/images/product/${product.id_product}`, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    throw new Error(`Impossible de joindre l'API: ${error.message}`);
  }

  if (!reponse.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(`Failed to fetch images: ${reponse.status}`);
  }

   images = await reponse.json();
}else{
  images=[]
}

  return <ProductSection product={product} images={images} />;
}