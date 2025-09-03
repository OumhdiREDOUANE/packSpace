
import { CartOverview } from "@/components/cart-overview"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function  CartPage() {
    const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value || "";
  

  if (!token) {
    redirect("/login"); // إعادة التوجيه من السيرفر مباشرة
  }
  
  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl text-[#006294] font-bold text-center my-6 ">Mes Achat</h1>
          
        </div>
 
        <CartOverview />
      </div>
    
  )
}
