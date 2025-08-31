import Header from "./Header";

export default async function AllHeader(){
  const res = await fetch('http://127.0.0.1:8000/api/categories', {
    next: { revalidate: 60 }  // ISR: إعادة التوليد كل 60 ثانية
  });
  const response = await res.json();
 
  // إنشاء عناصر الـ Navbar مباشرة من الكاتيجوريز والمنتجات
  const navItems = response.data.map((category) => ({
   
     id:category.id_categorie,
    name: category.name_categorie, // اسم التصنيف
    // رابط التصنيف إن وجد
    dropdown: category.products.map((product) => ({
      name: product.name_product,
      href: "#", // يمكن وضع رابط المنتج هنا
    })),
  }));

return(
    <>
    <Header navItems={navItems}/>
    
    </>
)

}