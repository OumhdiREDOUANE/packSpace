// FullPage.js
import Home from './page';

// Next.js Server Component أو Client Component حسب حاجتك
export default async function FullPage() {
  // جلب البيانات من API
  const res = await fetch('http://127.0.0.1:8000/api/categories', {
    next: { revalidate: 60 }, // إعادة التحقق كل 60 ثانية
  });
  const response = await res.json();

  // تحويل البيانات لتضمين الصور والـ slug
  const categories = response.data.map((cat) => ({
    id: cat.id_categorie,
    name: cat.name_categorie,
    slug: cat.name_categorie ,
    img: cat.url, // تأكد أن API ترجع image_categorie

  }));
const resProducts = await fetch('http://127.0.0.1:8000/api/product/topProducts', {
    next: { revalidate: 60 },
  });
  if (!resProducts.ok) throw new Error(`HTTP error! status: ${resProducts.status}`);
  const responseProducts = await resProducts.json();
console.log(responseProducts)
  const topProducts = responseProducts.data.map((prod) => ({
    id: prod.id_product,
    title: prod.name_product,
    desc: prod.description_product,
    img: prod.image?.url_image ?? '', // image_resource ترجع url
    price: prod.max_prix,       // أعلى سعر للطلب
  }));

  return <Home categories={categories} products={topProducts} />;
}
