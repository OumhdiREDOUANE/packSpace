
import Header from "./Header";

export default async function AllHeader(){
    const res = await fetch('https://fakestoreapi.com/products', {
        next: { revalidate: 60 }, // ISR: إعادة التوليد كل 60 ثانية
      });
      const data = await res.json();
      // استخراج التصنيفات الفريدة
const categories = [...new Set(data.map((product) => product.category))];

// إنشاء navItems ديناميكي حسب التصنيفات
const navItems = categories.map((category) => ({
  name: category.charAt(0).toUpperCase() + category.slice(1), // أول حرف كبير
  href: "#",
  dropdown: data
    .filter((product) => product.category === category)
    .map((product) => ({
      name: product.title,
      href: "#",
    })),
}));

return(
    <>
    <Header navItems={navItems}/>
    
    </>
)

}