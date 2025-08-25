
import Cart from "@/app/cart/cart"

import { getToken } from "@/lib/auth";
import { cookies } from "next/headers";
async function getOrders() {
 async function  getSession() {
    const Cookies = await cookies();
    const sessionId = Cookies.get("session_id")?.value||0;
    return sessionId;
  }
  

  const sessionId = await getSession()
 let res
  const Cookies = await cookies();
  const token=Cookies.get("token")?.value||0
  if(token){
       res = await fetch(`http://127.0.0.1:8000/api/cart/${sessionId}`, {
    cache: "no-store",
    credentials: "include",
    headers: token ? { "Authorization": `Bearer ${token}` } : {},  // علشان تجيب أحدث بيانات (ممكن تغيرها إلى 'force-cache' لو بغيت caching)
  });
  }else{
    res = await fetch(`http://127.0.0.1:8000/api/cart/notLogin/${sessionId}`, {
      cache: "no-store",
      credentials: "include",
        // علشان تجيب أحدث بيانات (ممكن تغيرها إلى 'force-cache' لو بغيت caching)
    });
  }
 

    
    console.log(sessionId);
    if (!res.ok) {
      const text = await res.text();
      console.error("Laravel API error:",res.status, text);
      throw new Error("Erreur lors du chargement des commandes");
    }
    const data = await res.json();
    console.log(data);
    return data
  }
  export default async function CartPage() {
    const orders = await getOrders();
    const Cookies = await cookies();
    const sessionId = Cookies.get("session_id")?.value || 0;

  return (
    <Cart  sessionId={sessionId} orders={orders}/>
  );
}
