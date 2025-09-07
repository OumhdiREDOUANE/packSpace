// app/category/page.tsx (أو أي ملف jsx/tsx حسب المسار)
import Link from 'next/link';
async function fetchProductsByCategory(name) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    const res = await fetch(`${API_BASE_URL}/api/categories/${name}`, {
     next: { revalidate: 60 } // لإلغاء التخزين المؤقت أثناء التطوير، احذف أو غيّر حسب الحاجة
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
  
    const response = await res.json();
  
    return response.data || [];
  }
export default async function CategoryPage({params}) {
 const { name } = await params;

  let products = [];
  try {
    products = await fetchProductsByCategory(name);
  } catch (error) {
    // هنا يمكنك عرض رسالة خطأ أو 404
    return <div>Erreur lors du chargement des produits</div>;
  }

  return (
  <div className="container mx-auto px-4 font-helveticaCondensed">
    <div className="mb-8">
     <img
       src="/slide2.jpg"
       alt="Banner"
       className="w-full h-auto object-cover "
       placeholder="blur"
                  blurDataURL="/placeholder.jpg"
     />
   </div>
      <h6 className="text-[#006294] text-2xl text-center font-semibold my-[36px] tracking-wide">{name=='h%C3%B4tellerie-restauration'?"Hôtellerie / Restauration":name}</h6>

      {products.length === 0 ? (
        <p>Aucun produit trouvé dans cette catégorie.</p>
      ) : (
        <div className="flex flex-wrap -mx-2">
          {products.map((prod) => (
               <div key={prod.id_product} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-6">
        <div className="flex flex-col h-full bg-white  transition overflow-hidden">
              <img
          src={name === "all" 
        ? prod.main_image ?? '/placeholder.jpg' 
        : prod.image_product?.[0]?.url_image ?? '/placeholder.jpg'}
                alt={prod.name_product}
              className="w-full h-[225px] object-cover"
              placeholder="blur"
                  blurDataURL="/placeholder.jpg"
              />
                   <h3 className="text-center text-[#333] font-semibold text-lg py-6 px-2">
                   <Link
                   href={`/product/${encodeURIComponent(prod.name_product)}`}
                   className="hover:text-[#C09200] transition-colors duration-200"
             >
                </Link>
                {prod.name_product}
                           </h3>
                           <div className="flex-1 flex flex-col justify-end px-4 pb-4">
            <Link
                href={`/product/${encodeURIComponent(prod.name_product)}`}
              className="bg-[#006294] hover:bg-[#C09200] text-white text-center py-2 rounded-md font-semibold transition-colors duration-300"
            >
              Commander
            </Link>
          </div>
          </div>
       </div>
     ))}
      
   </div>
      )}
 </div>

   );
 }

