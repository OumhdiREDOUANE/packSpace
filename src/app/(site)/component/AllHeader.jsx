import Header from "./Header";

export default async function AllHeader(){
 const res = await fetch('http://127.0.0.1:8000/api/categories', {
  next: { revalidate: 60 }
});
const response = await res.json();
const navItems = response.data.map((category) => {
  // نبني dropdown فارغ
  let dropdown = [];
  
  // نضيف المجموعات مع منتجاتها
  category.groups.forEach((group) => {
    dropdown.push({
      name: group.name_group,
      isGroup: true,
      children: group.products.map((product) => ({
        name: product.name_product,
        href: `/product/${product.id_product}`,
      })),
    });
  });

  // نضيف المنتجات اللي ماعندهاش مجموعة
  category.products.forEach((product) => {
    dropdown.push({
      name: product.name_product,
      href: `/product/${product.id_product}`,
      isGroup: false,
    });
  });

  return {
    id: category.id_categorie,
    name: category.name_categorie,
    dropdown,
  };
});

    
 


return(
    <>
    <Header navItems={navItems}/>
    
    </>
)

}