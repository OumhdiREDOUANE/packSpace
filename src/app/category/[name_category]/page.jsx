// app/category/page.tsx (أو أي ملف jsx/tsx حسب المسار)

async function fetchProductsByCategory(name_category) {
    const res = await fetch(`http://127.0.0.1:8000/api/category/${slug}/products`, {
      cache: 'no-store', // لإلغاء التخزين المؤقت أثناء التطوير، احذف أو غيّر حسب الحاجة
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
  
    const data = await res.json();
    return data.products || [];
  }
export default function CategoryPage({params}) {
  const categories = [
    {
      title: 'Papeterie',
      slug: 'papeterie',
      image: '/Carterie_Cat_300x300.jpg',
    },
    {
      title: 'Hôtellerie / Restauration',
      slug: 'hotellerie-restauration',
      image: '/Carterie_Cat_300x300.jpg',
    },
    {
      title: 'Dépliants',
      slug: 'depliants',
      image: '/Carterie_Cat_300x300.jpg',
    },
    {
      title: 'Packaging',
      slug: 'Packaging',
      image: '/Carterie_Cat_300x300.jpg',
    },
  ];

  return (
    <div className="container mx-auto px-4 font-helveticaCondensed">
  {/* Bannière */}
  <div className="mb-8">
    <img
      src="/slide2.jpg"
      alt="Banner"
      className="w-full h-auto object-cover "
    />
  </div>

  <h6 className="text-[#006294] text-2xl text-center font-semibold my-[36px] tracking-wide">
    Carterie
  </h6>

  {/* Liste des catégories */}
  <div className="flex flex-wrap -mx-2">
    {categories.map((cat, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-6">
        <div className="flex flex-col h-full bg-white  transition overflow-hidden">
          <a href={`/category/${cat.slug}`}>
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-[225px] object-cover"
            />
          </a>
          <h3 className="text-center text-[#333] font-semibold text-lg py-6 px-2">
            <a
              href={`/category/${cat.slug}`}
              className="hover:text-[#C09200] transition-colors duration-200"
            >
              {cat.title}
            </a>
          </h3>
          <div className="flex-1 flex flex-col justify-end px-4 pb-4">
            <a
              href={`/category/${cat.slug}`}
              className="bg-[#006294] hover:bg-[#C09200] text-white text-center py-2 rounded-md font-semibold transition-colors duration-300"
            >
              Commander
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
